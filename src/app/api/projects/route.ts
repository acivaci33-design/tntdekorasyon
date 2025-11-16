import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { createClient } from "@supabase/supabase-js";

interface Project {
  id: string;
  label: string;
  location: string;
  imageUrl: string;
  createdAt: string;
}

const projectsFilePath = path.join(process.cwd(), "data", "projects.json");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const hasSupabase = !!supabaseUrl && !!supabaseKey;

const supabase = hasSupabase && supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
      },
    })
  : null;

async function readProjects(): Promise<Project[]> {
  if (hasSupabase && supabase) {
    const { data, error } = await supabase
      .from("projects")
      .select("id, label, location, image_url, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase readProjects error", error);
      return [];
    }

    const rows = data ?? [];
    return rows.map((row: any) => ({
      id: String(row.id),
      label: String(row.label ?? ""),
      location: String(row.location ?? ""),
      imageUrl: String(row.image_url ?? ""),
      createdAt: String(row.created_at ?? ""),
    }));
  }

  try {
    const file = await fs.readFile(projectsFilePath, "utf8");
    const data = JSON.parse(file) as Project[];
    return Array.isArray(data) ? data : [];
  } catch (error: unknown) {
    return [];
  }
}

async function writeProjects(projects: Project[]): Promise<void> {
  const json = JSON.stringify(projects, null, 2);
  await fs.mkdir(path.dirname(projectsFilePath), { recursive: true });
  await fs.writeFile(projectsFilePath, json, "utf8");
}

export async function HEAD(request: Request) {
  const adminToken = process.env.ADMIN_PANEL_TOKEN;
  if (adminToken && request.headers.get("x-admin-token") !== adminToken) {
    return new NextResponse(null, { status: 401 });
  }

  return new NextResponse(null, { status: 200 });
}

export async function GET() {
  const projects = await readProjects();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const adminToken = process.env.ADMIN_PANEL_TOKEN;
  if (adminToken && request.headers.get("x-admin-token") !== adminToken) {
    return NextResponse.json({ error: "Yetkisiz istek." }, { status: 401 });
  }

  const { label, location, imageUrl } = (await request.json()) as Partial<Project>;

  if (!label || !location) {
    return NextResponse.json({ error: "Gerekli alanlar eksik." }, { status: 400 });
  }

  const newProject: Project = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 10),
    label,
    location,
    imageUrl: imageUrl || "",
    createdAt: new Date().toISOString(),
  };

  if (hasSupabase && supabase) {
    const { error } = await supabase.from("projects").insert({
      id: newProject.id,
      label: newProject.label,
      location: newProject.location,
      image_url: newProject.imageUrl,
      created_at: newProject.createdAt,
    });

    if (error) {
      console.error("Supabase POST /projects error", error);
      return NextResponse.json(
        { error: "Proje kaydedilirken bir hata oluştu." },
        { status: 500 },
      );
    }
  } else {
    const projects = await readProjects();
    const updated = [newProject, ...projects];
    await writeProjects(updated);
  }

  return NextResponse.json(newProject, { status: 201 });
}

export async function DELETE(request: Request) {
  const adminToken = process.env.ADMIN_PANEL_TOKEN;
  if (adminToken && request.headers.get("x-admin-token") !== adminToken) {
    return NextResponse.json({ error: "Yetkisiz istek." }, { status: 401 });
  }

  const { id } = (await request.json()) as { id?: string };

  if (!id) {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  if (hasSupabase && supabase) {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      console.error("Supabase DELETE /projects error", error);
      return NextResponse.json(
        { error: "Proje silinirken bir hata oluştu." },
        { status: 500 },
      );
    }
  } else {
    const projects = await readProjects();
    const updated = projects.filter((project) => project.id !== id);
    await writeProjects(updated);
  }

  return NextResponse.json({ success: true });
}
