import { NextResponse } from "next/server";
import { Resend } from "resend";

import { siteConfig } from "@/lib/site";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    if (!name || !message) {
      return NextResponse.json(
        { error: "Gerekli alanlar eksik." },
        { status: 400 },
      );
    }

    await resend.emails.send({
      from: "TNT DEKOR <onboarding@resend.dev>",
      to: [siteConfig.emailTo],
      replyTo: email || undefined,
      subject: "TNT DEKOR web sitesi - Yeni iletişim formu",
      text: `Yeni bir iletişim formu alındı.\n\nİsim: ${name}\nTelefon: ${phone || "-"}\nE-posta: ${email || "-"}\n\nMesaj:\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "E-posta gönderilirken bir hata oluştu." },
      { status: 500 },
    );
  }
}
