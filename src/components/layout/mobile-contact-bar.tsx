"use client";

import { MessageCircle, Phone } from "lucide-react";

import { siteConfig } from "@/lib/site";

export function MobileContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-center gap-2 border-t border-white/70 bg-white/90 px-4 py-2.5 shadow-[0_-8px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl md:hidden">
      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-[13px] font-medium text-white shadow-sm shadow-emerald-900/30 transition hover:bg-emerald-600"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>
      <a
        href={`tel:${siteConfig.phonePrimaryRaw}`}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-4 py-2 text-[13px] font-medium text-slate-800 shadow-sm transition hover:bg-white"
      >
        <Phone className="h-4 w-4" />
        Ara
      </a>
    </div>
  );
}
