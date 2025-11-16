"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import { GlassCard } from "@/components/ui/glass-card";

const testimonials = [
  {
    quote:
      "İş programına birebir uyuldu, şantiye her gün temiz bırakıldı. Asma tavan ve boya sonrası ev bambaşka oldu.",
    author: "E. Yılmaz",
    role: "Kadıköy - Konut Tadilatı",
  },
  {
    quote:
      "Teklif aşamasından teslimata kadar her adımda bilgilendirildik. Ekstra isteklerimizi bile makul sürede çözdüler.",
    author: "M. Demir",
    role: "Ümraniye - Ofis Yenileme",
  },
  {
    quote:
      "Gergi tavan ve aydınlatma ile mağazamızın algısı tamamen değişti. Müşterilerimizden de olumlu geri dönüşler alıyoruz.",
    author: "S. Karaca",
    role: "Ataşehir - Mağaza Uygulaması",
  },
  {
    quote:
      "Ekip zamanında geldi, plana sadık kaldı ve iş bitiminde evi tertemiz teslim etti. Gönül rahatlığıyla tavsiye ederim.",
    author: "H. Aksoy",
    role: "Maltepe - 3+1 Daire",
  },
  {
    quote:
      "Tavan tasarımı ve spot yerleşimleri için detaylı çalışma yaptılar. Uygulama ile çizimler birebir tuttu.",
    author: "D. Korkmaz",
    role: "Çekmeköy - Villa Projesi",
  },
  {
    quote:
      "Teklifte ne konuştuysak sözleşmede de aynı şekilde yer aldı, ekstra maliyet sürprizi yaşamadık.",
    author: "B. Çetin",
    role: "Üsküdar - Daire Tadilatı",
  },
  {
    quote:
      "WhatsApp üzerinden süreci adım adım fotoğraflarla paylaştılar, şehir dışında olmamıza rağmen her şeyi takip edebildik.",
    author: "N. Arslan",
    role: "Pendik - Yazlık Ev",
  },
  {
    quote:
      "Ses yalıtımı ve bölme duvar uygulamaları sayesinde ofisteki gürültü ciddi ölçüde azaldı, çalışanlardan olumlu geri bildirim alıyoruz.",
    author: "K. Ergin",
    role: "Kozyatağı - Ofis Düzenleme",
  },
];

export function TestimonialsSection() {
  const items = [...testimonials, ...testimonials];

  return (
    <motion.section
      id="referanslar"
      className="space-y-6 scroll-mt-24 sm:scroll-mt-28"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Referanslar</p>
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          Müşterilerimiz neler söylüyor?
        </h2>
        <p className="max-w-md text-[0.85rem] leading-relaxed text-slate-600">
          Uzun ömürlü çözümler ve şeffaf süreçlerimizle güvene dayalı iş birlikleri kuruyoruz.
        </p>
      </div>
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-6"
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity, repeatType: "loop" }}
        >
          {items.map((t, i) => (
            <GlassCard
              key={i}
              className="flex h-full min-w-[260px] max-w-[320px] flex-col gap-3 sm:min-w-[300px]"
            >
              <div className="flex items-center gap-2 text-sky-700">
                <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-sky-50 shadow-sm shadow-sky-100/70">
                  <Quote className="h-4 w-4" />
                </div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">Müşteri Yorumu</p>
              </div>
              <p className="text-[0.9rem] leading-relaxed text-slate-700">“{t.quote}”</p>
              <div className="mt-1 text-[0.8rem]">
                <p className="font-semibold text-slate-900">{t.author}</p>
                <p className="text-slate-500">{t.role}</p>
              </div>
            </GlassCard>
          ))}
        </motion.div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />
      </div>
    </motion.section>
  );
}
