"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";

import { GlassCard } from "@/components/ui/glass-card";

const testimonials = [
  {
    quote:
      "Verilen tarihlere uyuldu, her gün iş bitiminde ev toparlandı. Asma tavan ve boya sonrası ev gerçekten bambaşka bir hale geldi.",
    author: "E. Yılmaz",
    role: "Mersin - Mezitli Konut Tadilatı",
  },
  {
    quote:
      "Tekliften uygulamaya kadar her adımı WhatsApp üzerinden paylaştılar. Aklımıza takılan her soruya aynı gün içinde dönüş yaptılar.",
    author: "M. Demir",
    role: "Mersin - Yenişehir Ofis Yenileme",
  },
  {
    quote:
      "Gergi tavan ve aydınlatma uygulamasından sonra mağazanın havası ciddi anlamda değişti. Müşterilerimizden de sık sık güzel yorumlar alıyoruz.",
    author: "S. Karaca",
    role: "Mersin - Tarsus Mağaza Uygulaması",
  },
  {
    quote:
      "Ekip sabah saat kaç dediyse o saatte kapıdaydı, plana sadık kaldılar ve iş bitiminde evi toparlayıp öyle teslim ettiler. Gönül rahatlığıyla tavsiye ederim.",
    author: "H. Aksoy",
    role: "Mersin - Erdemli 3+1 Daire",
  },
  {
    quote:
      "Tavan tasarımı ve spotların yerleşimi için önce detaylı bir çizim yaptılar, uygulama da birebir o çizime uygun ilerledi. Sonuç tam hayal ettiğimiz gibiydi.",
    author: "D. Korkmaz",
    role: "Mersin - Silifke Villa Projesi",
  },
  {
    quote:
      "Teklifte ne konuştuysak sözleşmede de birebir aynı şekilde yer aldı. İş bitiminde ekstra bir maliyet veya sürprizle karşılaşmadık.",
    author: "B. Çetin",
    role: "Mersin - Toroslar Daire Tadilatı",
  },
  {
    quote:
      "Tadilat sürecini WhatsApp üzerinden fotoğraf ve videolarla adım adım gönderdiler. Şehir dışında olmamıza rağmen her şeyi yakından takip edebildik.",
    author: "N. Arslan",
    role: "Mersin - Çeşmeli Yazlık Ev",
  },
  {
    quote:
      "Ses yalıtımı ve bölme duvar uygulamasından sonra ofisteki gürültü fark edilir şekilde azaldı. Çalışanlardan da konforla ilgili çok olumlu geri dönüşler alıyoruz.",
    author: "K. Ergin",
    role: "Mersin - Akdeniz Ofis Düzenleme",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    if (isHovered) return;
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, [isHovered]);

  const current = testimonials[activeIndex];

  return (
    <motion.section
      id="referanslar"
      className="space-y-6 scroll-mt-24 sm:scroll-mt-28"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.85, ease: [0.22, 0.61, 0.36, 1] }}
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
      <div
        className="relative mt-2 flex flex-col items-center gap-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
            className="w-full max-w-xl"
          >
            <GlassCard className="flex h-full flex-col gap-3">
              <div className="flex items-center gap-2 text-teal-700">
                <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-teal-50 shadow-sm shadow-teal-100/70">
                  <Quote className="h-4 w-4" />
                </div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                  Müşteri Yorumu
                </p>
              </div>
              <p className="text-[0.9rem] leading-relaxed text-slate-700">“{current.quote}”</p>
              <div className="mt-1 text-[0.8rem]">
                <p className="font-semibold text-slate-900">{current.author}</p>
                <p className="text-slate-500">{current.role}</p>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center gap-2">
          {testimonials.map((_, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive ? "w-5 bg-teal-600" : "w-2.5 bg-slate-200"
                }`}
              >
                <span className="sr-only">{index + 1}. müşteri yorumu</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
