"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const HERO_IMAGES = [
  {
    src: "/52b9b7fd-6175-4142-bd51-b2c13d87b487.jpg",
    alt: "TNT Dekor uygulamasından modern tavan ve iç mekan görseli",
  },
  {
    src: "/hero-office-ceiling.jpg",
    alt: "Ahşap panelli modern ofis tavanı",
  },
];

export function HeroSection() {
  const [currentImage, setCurrentImage] = React.useState(0);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      className="relative -mt-4 overflow-hidden pt-16 pb-16 sm:-mt-6 sm:pt-20 sm:pb-20 lg:-mt-8 lg:pt-24 lg:pb-24 min-h-[560px]"
      aria-labelledby="hero-title"
    >
      {/* Background: 4K-friendly hero slider */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {HERO_IMAGES.map((image, index) => (
          <motion.div
            key={image.src}
            className="absolute inset-0"
            aria-hidden
            animate={{
              opacity: currentImage === index ? 1 : 0,
            }}
            transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              quality={95}
              className="object-cover object-top"
            />
            {/* Ultra light gradient veil: almost no softening, just a slight top fade */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.22),rgba(255,255,255,0.1),rgba(255,255,255,0))]" />
          </motion.div>
        ))}
      </div>
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[32px] border border-white/50 bg-white/20 px-4 py-6 shadow-[0_24px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:px-6 sm:py-7 lg:px-8 lg:py-9 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-[32px] before:border before:border-white/40 before:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),transparent_60%),radial-gradient(circle_at_bottom,rgba(15,23,42,0.2),transparent_65%)] before:opacity-65">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:items-center lg:gap-12">
            <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: [0.22, 0.61, 0.36, 1] }}
          className="space-y-7 max-w-xl lg:max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50/80 px-3 py-1 text-xs font-medium text-sky-700 shadow-sm shadow-sky-100/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Profesyonel tadilat &amp; dekorasyon çözümleri
          </div>
          <div className="space-y-4">
            <h1
              id="hero-title"
              className="text-balance text-3xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-4xl lg:text-[2.7rem] lg:leading-[1.08]"
            >
              Tadilat &amp; Dekorasyonda
              <span className="block bg-gradient-to-r from-sky-700 via-sky-900 to-slate-900 bg-clip-text text-transparent">
                Güvenin Adresi!
              </span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-slate-800 sm:text-[1.05rem]">
              Evinizi, ofisinizi ve yaşam alanlarınızı profesyonel dokunuşlarla yeniliyoruz.
              Güvenilir hizmet, yüksek kalite ve modern tasarım çözümleri tek çatı altında.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto shadow-[0_18px_45px_rgba(56,189,248,0.4)]"
            >
              <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
                WhatsApp İletişim
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full border-slate-200/90 bg-white/70 text-slate-800 backdrop-blur-md sm:w-auto"
            >
              <a href="#hizmetler">
                Hizmetlerimizi İncele
              </a>
            </Button>
          </div>
          <div className="inline-flex flex-wrap items-center gap-4 rounded-2xl bg-white/80 px-3 py-2 text-xs text-slate-700 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-full bg-emerald-50 text-[0.68rem] font-semibold text-emerald-700 shadow-sm shadow-emerald-100/70 flex items-center justify-center">
                10+
              </span>
              <span className="font-medium">yıllık deneyim</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-full bg-sky-50 text-[0.68rem] font-semibold text-sky-700 shadow-sm shadow-sky-100/70 flex items-center justify-center">
                %100
              </span>
              <span className="font-medium">müşteri memnuniyeti odağı</span>
            </div>
          </div>
            </motion.div>

            <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1], delay: 0.25 }}
          className="relative"
        >
          <div className="grid gap-4">
            <div className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur-2xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                    Uzmanlık Alanlarımız
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    Asma Tavan, Bafıl, Gergi Tavan, Alçı &amp; boya uygulamaları
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-400 text-white shadow-md shadow-sky-900/30">
                  <PhoneCall className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-500">
                Projelerinizi yerinde analiz ediyor, ihtiyacınıza özel çözümler geliştiriyoruz.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
              <div className="rounded-3xl border border-white/60 bg-white/80 px-3 py-3 shadow-[0_16px_50px_rgba(15,23,42,0.05)] backdrop-blur-2xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Kurumsal Kalite
                </p>
                <p className="mt-1 text-xs font-medium text-slate-900">
                  Otel, ofis ve konut projelerinde profesyonel uygulama.
                </p>
              </div>

              <div className="rounded-3xl border border-sky-100/80 bg-gradient-to-br from-sky-50 via-slate-50 to-amber-50 px-3 py-3 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Temiz Teslim
                </p>
                <p className="mt-1 text-xs font-medium text-slate-900">
                  Zamanında teslim, düzenli işçilik ve tertemiz çalışma alanı.
                </p>
              </div>
            </div>
          </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
