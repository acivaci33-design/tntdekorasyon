"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Sparkles, Wallet } from "lucide-react";

import { GlassCard } from "@/components/ui/glass-card";

const items = [
  {
    title: "Güvenilir Hizmet",
    description:
      "Söz verdiğimiz tarihte, söz verdiğimiz kalitede iş teslim ederek uzun vadeli iş ortaklıkları kuruyoruz.",
    icon: ShieldCheck,
  },
  {
    title: "Yüksek Kalite & Profesyonel İşçilik",
    description:
      "Deneyimli ekibimiz, malzeme seçiminden uygulama detaylarına kadar her aşamada titizlikle çalışır.",
    icon: CheckCircle2,
  },
  {
    title: "Modern Tasarım Çözümleri",
    description:
      "Mimari trendleri, fonksiyonellik ve estetiği bir araya getirerek çağdaş yaşam alanları oluşturuyoruz.",
    icon: Sparkles,
  },
  {
    title: "Her Bütçeye Uygun Fiyatlar",
    description:
      "Farklı bütçelere uygun, şeffaf ve sürprizsiz fiyatlandırma politikasıyla çalışıyoruz.",
    icon: Wallet,
  },
];

export function WhyUsSection() {
  return (
    <motion.section
      id="neden-biz"
      className="space-y-6 scroll-mt-24 sm:scroll-mt-28"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          Neden Biz?
        </p>
        <h2 className="max-w-xl text-balance text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          Kurumsal yaklaşım, şeffaf süreç ve uzun ömürlü çözümler.
        </h2>
        <p className="max-w-md text-[0.8rem] leading-relaxed text-slate-600">
          Projelerinizi sadece uygulamıyor, ihtiyacınıza en uygun çözümü birlikte tasarlıyoruz.
        </p>
      </div>
      <motion.div
        className="grid gap-4 md:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.09, delayChildren: 0.03 },
          },
        }}
      >
        {items.map((item) => (
          <motion.div
            key={item.title}
            variants={{
              hidden: { opacity: 0, y: 22, scale: 0.97 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: 0.45,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              },
            }}
          >
            <GlassCard className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 shadow-sm shadow-sky-100/70">
                  <item.icon className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900">
                  {item.title}
                </h3>
              </div>
              <p className="text-[0.78rem] leading-relaxed text-slate-600">
                {item.description}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
