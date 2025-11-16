import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseBucket = process.env.SUPABASE_STORAGE_BUCKET || "project-images";
const hasSupabase = !!supabaseUrl && !!supabaseKey;

const supabase = hasSupabase && supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
      },
    })
  : null;

export async function POST(request: Request) {
  const adminToken = process.env.ADMIN_PANEL_TOKEN;
  if (adminToken && request.headers.get("x-admin-token") !== adminToken) {
    return NextResponse.json({ error: "Yetkisiz istek." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Geçerli bir görsel dosyası gönderilmedi." }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Yalnızca görsel dosyaları yüklenebilir." }, { status: 400 });
  }

  const maxSizeBytes = 7 * 1024 * 1024; // ~7MB
  if (file.size > maxSizeBytes) {
    return NextResponse.json({ error: "Görsel boyutu çok büyük. Lütfen daha küçük bir dosya yükleyin." }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const ext = file.name.split(".").pop() || "jpg";
  const uniqueName = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}.${ext}`;

  // Önce Supabase Storage varsa oraya yüklemeyi dene, hata olursa local fallback kullan
  if (hasSupabase && supabase) {
    const bucket = supabaseBucket;
    const storagePath = `admin-uploads/${uniqueName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(storagePath, buffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });

    if (!uploadError) {
      const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath);
      const publicUrl = data.publicUrl;
      return NextResponse.json({ url: publicUrl });
    }

    console.error("Supabase upload error, local fallback kullanılacak", uploadError);
  }

  const uploadDir = path.join(process.cwd(), "public", "project-images");
  await fs.mkdir(uploadDir, { recursive: true });
  const filePath = path.join(uploadDir, uniqueName);
  await fs.writeFile(filePath, buffer);

  const publicUrl = `/project-images/${uniqueName}`;
  return NextResponse.json({ url: publicUrl });
}
