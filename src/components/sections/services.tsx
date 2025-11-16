"use client";

import { motion } from "framer-motion";
import {
  PanelsTopLeft,
  SquareDashedBottomCode,
  Layers,
  Palette,
  Sparkles,
  Brush,
  Building2,
} from "lucide-react";

import { GlassCard } from "@/components/ui/glass-card";

const services = [
  {
    title: "Asma Tavan Sistemleri",
    description: "Modern, estetik ve fonksiyonel tavan çözümleri ile mekânlarınıza derinlik katıyoruz.",
    icon: PanelsTopLeft,
  },
  {
    title: "Bafıl Tavan",
    description: "Akustik performansı güçlendiren, mimariyi öne çıkaran bafıl tavan uygulamaları.",
    icon: SquareDashedBottomCode,
  },
  {
    title: "Gergi Tavan",
    description: "Işıklı ve özel tasarım gergi tavanlarla mekânlarınıza benzersiz bir atmosfer kazandırıyoruz.",
    icon: Layers,
  },
  {
    title: "Mesh Tavan",
    description: "Endüstriyel ve modern görünümü birleştiren mesh tavan sistemleri.",
    icon: Building2,
  },
  {
    title: "Lambiri Tavan",
    description: "Sıcak ve doğal bir atmosfer için lambiri tavan kaplama çözümleri.",
    icon: Sparkles,
  },
  {
    title: "Taş Yünü Uygulamaları",
    description: "Isı ve ses yalıtımında yüksek performans sunan taş yünü tavan ve duvar uygulamaları.",
    icon: Layers,
  },
  {
    title: "Alçı Dekor",
    description: "Kartonsan alçıpan bölme, niş, spot ve dekoratif çözümler.",
    icon: Brush,
  },
  {
    title: "Dekoratif Boya",
    description: "Mekan karakterini güçlendiren, özel efektli dekoratif boya uygulamaları.",
    icon: Palette,
  },
  {
    title: "Grenli Boya",
    description: "Dayanıklı, dokulu yüzeyler için grenli dış ve iç cephe boya çözümleri.",
    icon: Palette,
  },
  {
    title: "Sedef Boya",
    description: "Işığa göre ton değiştiren, sofistike sedef boya uygulamaları.",
    icon: Sparkles,
  },
  {
    title: "Dış Cephe Mantolama",
    description: "Enerji verimliliğini artıran profesyonel ısı yalıtım sistemleri.",
    icon: Building2,
  },
  {
    title: "Yalı Baskı",
    description: "Bina cephelerinde doğal taş ve ahşap görünümlü yalı baskı çözümleri.",
    icon: Building2,
  },
  {
    title: "Tadilat & Dekorasyon Genel Hizmetler",
    description: "Anahtar teslim tadilat, ince işçilik ve komple dekorasyon çözümleri.",
    icon: Sparkles,
  },
];

export function ServicesSection() {
  return (
    <motion.section
      id="hizmetler"
      className="space-y-6 scroll-mt-24 sm:scroll-mt-28"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          Hizmetlerimiz
        </p>
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <h2 className="max-w-xl text-balance text-xl font-semibold tracking-tight text-slate-900 sm:text-[1.5rem]">
            Kurumsal projelerden yaşam alanlarına, uçtan uca tadilat ve dekorasyon çözümleri.
          </h2>
          <p className="max-w-sm text-[0.95rem] leading-relaxed text-slate-600 sm:text-[1rem]">
            Her proje için mimari yapınıza, bütçenize ve kullanım alışkanlıklarınıza özel sistemler tasarlıyoruz.
          </p>
        </div>
      </div>
      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.08,
              delayChildren: 0.02,
            },
          },
        }}
      >
        {services.map((service) => (
          <motion.div
            key={service.title}
            variants={{
              hidden: { opacity: 0, y: 24, scale: 0.97 },
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
                  <service.icon className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900">
                  {service.title}
                </h3>
              </div>
              <p className="text-[0.85rem] leading-relaxed text-slate-600">
                {service.description}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
