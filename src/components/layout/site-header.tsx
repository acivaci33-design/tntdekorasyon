"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  const [active, setActive] = React.useState<string>("");

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
        <Link href="/" className="flex items-center gap-1.5">
          <Image
            src="/tnt-logo.png"
            alt={siteConfig.shortName}
            width={45}
            height={45}
            className="h-[45px] w-[45px]"
            priority
          />
          <span className="text-sm font-semibold tracking-tight text-slate-900 md:text-base">
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
        </nav>
        <div className="flex items-center gap-2" />
      </div>
    </header>
  );
}
