import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/20 bg-white/5 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_-18px_45px_rgba(15,23,42,0.16)] relative overflow-hidden before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_0_0,rgba(56,189,248,0.18),transparent_55%),radial-gradient(circle_at_100%_0,rgba(251,191,36,0.22),transparent_55%)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 pt-6 pb-24 text-xs text-slate-500 md:flex-row md:items-center md:justify-between md:px-6 md:py-6 md:pb-6 lg:px-8">
        <div className="space-y-1">
          <p className="font-medium text-slate-600">{siteConfig.shortName}</p>
          <p className="text-[11px]">
            {new Date().getFullYear()} {siteConfig.shortName}. Tüm hakları saklıdır.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-3">
            <Link href="#hizmetler" className="transition-colors hover:text-slate-800">
              Hizmetler
            </Link>
            <Link href="#iletisim" className="transition-colors hover:text-slate-800">
              İletişim
            </Link>
          </div>
          <div className="h-3 w-px bg-slate-300/70" />
          <div className="flex gap-3">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-slate-800"
            >
              Instagram
            </a>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-slate-800"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
