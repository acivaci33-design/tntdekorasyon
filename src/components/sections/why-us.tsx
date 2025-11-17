"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Sparkles, Wallet } from "lucide-react";

import { GlassCard } from "@/components/ui/glass-card";

const items = [
  {
    title: "Güvenilir Hizmet",
    description:
      "İş programını en başta netleştiriyor, söz verdiğimiz tarih ve kapsam dışında sürpriz oluşturmadan işi tamamlıyoruz.",
    icon: ShieldCheck,
  },
  {
    title: "Yüksek Kalite & Profesyonel İşçilik",
    description:
      "Ekiplerimiz kendi alanında uzman ustalardan oluşur; gizli detaylarda bile düzgün bitişler ve temiz işçiliği önceliklendiriyoruz.",
    icon: CheckCircle2,
  },
  {
    title: "Modern Tasarım Çözümleri",
    description:
      "Mekânınızın mevcut mimarisini analiz edip, tavan ve duvar çözümlerini aydınlatma ile birlikte tasarlayarak bütüncül bir görünüm sağlıyoruz.",
    icon: Sparkles,
  },
  {
    title: "Her Bütçeye Uygun Fiyatlar",
    description:
      "Aynı iş için farklı malzeme ve uygulama alternatifleri sunarak bütçenize en uygun kombinasyonu birlikte belirliyoruz.",
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
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.85, ease: [0.22, 0.61, 0.36, 1] }}
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
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: 0.75,
              ease: [0.22, 0.61, 0.36, 1],
              delay: index * 0.06,
            }}
            whileHover={{ y: -6, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <GlassCard className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 shadow-sm shadow-teal-100/70">
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
      </div>
    </motion.section>
  );
}
