"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  const [active, setActive] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const sectionIds = ["hizmetler", "neden-biz", "referanslar", "instagram", "iletisim"];
    const elements = sectionIds
      .map((id) => ({ id, el: document.getElementById(id) as HTMLElement | null }))
      .filter((x): x is { id: string; el: HTMLElement } => x.el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target) {
          const found = elements.find((e) => e.el === visible.target);
          if (found) setActive(found.id);
        }
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    );

    elements.forEach(({ el }) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 px-3 pt-2 pb-3 md:px-4">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-[999px] border border-white/40 bg-transparent px-4 py-3.5 shadow-[0_10px_28px_rgba(15,23,42,0.10)] md:px-6 lg:px-8 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-[999px] before:border before:border-white/40 before:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.45),transparent_60%),radial-gradient(circle_at_bottom,rgba(15,23,42,0.16),transparent_65%)] before:opacity-45">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/tnt-logo.png"
            alt={siteConfig.shortName}
            width={35}
            height={35}
            className="h-[35px] w-[35px]"
            priority
          />
          <span className="font-heading text-[1rem] font-semibold tracking-[0.03em] text-slate-900 md:text-[1.08rem]">
            TNT Dekor
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-xs font-medium text-slate-600 md:flex">
          <Link
            href="#hizmetler"
            className={`transition-colors hover:text-slate-900 ${active === "hizmetler" ? "text-slate-900" : ""}`}
          >
            Hizmetler
          </Link>
          <Link
            href="#neden-biz"
            className={`transition-colors hover:text-slate-900 ${active === "neden-biz" ? "text-slate-900" : ""}`}
          >
            Neden Biz?
          </Link>
          <Link
            href="#referanslar"
            className={`transition-colors hover:text-slate-900 ${active === "referanslar" ? "text-slate-900" : ""}`}
          >
            Referanslar
          </Link>
          <Link
            href="#instagram"
            className={`transition-colors hover:text-slate-900 ${active === "instagram" ? "text-slate-900" : ""}`}
          >
            Instagram
          </Link>
          <Link
            href="#iletisim"
            className={`transition-colors hover:text-slate-900 ${active === "iletisim" ? "text-slate-900" : ""}`}
          >
            İletişim
          </Link>
          <Link
            href="/admin"
            className="rounded-full border border-slate-200/80 bg-white/80 px-3 py-1.5 text-[11px] font-semibold text-slate-800 shadow-sm shadow-slate-200/70 transition-colors hover:bg-slate-50"
          >
            Admin Giriş
          </Link>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            aria-label="Menüyü aç/kapat"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white/90 text-slate-700 shadow-sm shadow-slate-200/70 backdrop-blur-md"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
        {isOpen && (
          <div className="absolute left-0 right-0 top-full mt-3 rounded-3xl border border-slate-100 bg-white/95 px-4 py-4 text-sm text-slate-800 shadow-[0_16px_40px_rgba(15,23,42,0.16)] backdrop-blur-xl md:hidden">
            <nav className="flex flex-col gap-1.5 text-[13px]">
              <Link
                href="#hizmetler"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between rounded-full px-3 py-2 font-medium text-slate-800 hover:bg-slate-50"
              >
                <span>Hizmetler</span>
              </Link>
              <Link
                href="#neden-biz"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between rounded-full px-3 py-2 font-medium text-slate-800 hover:bg-slate-50"
              >
                <span>Neden Biz?</span>
              </Link>
              <Link
                href="#referanslar"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between rounded-full px-3 py-2 font-medium text-slate-800 hover:bg-slate-50"
              >
                <span>Referanslar</span>
              </Link>
              <Link
                href="#instagram"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between rounded-full px-3 py-2 font-medium text-slate-800 hover:bg-slate-50"
              >
                <span>Instagram</span>
              </Link>
              <Link
                href="#iletisim"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between rounded-full px-3 py-2 font-medium text-slate-800 hover:bg-slate-50"
              >
                <span>İletişim</span>
              </Link>
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="mt-2 flex items-center justify-center rounded-full bg-teal-600 px-3 py-2 font-semibold text-white shadow-sm shadow-teal-900/30 hover:bg-teal-700"
              >
                Admin Giriş
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
