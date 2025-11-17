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
    description:
      "Işık, akustik ve estetiği dengeleyen asma tavan çözümleriyle tavanı mekânın mimarisine uyumlu hale getiriyoruz.",
    icon: PanelsTopLeft,
  },
  {
    title: "Bafıl Tavan",
    description:
      "Özellikle açık ofis ve yüksek hacimli alanlarda hem akustiği iyileştiren hem de mimariyi öne çıkaran bafıl tavan uygulamaları.",
    icon: SquareDashedBottomCode,
  },
  {
    title: "Gergi Tavan",
    description:
      "Işıklı ve özel tasarım gergi tavanlarla mekânınıza marka kimliğinize uygun, dikkat çeken bir odak noktası kazandırıyoruz.",
    icon: Layers,
  },
  {
    title: "Mesh Tavan",
    description:
      "AVM, otopark ve endüstriyel alanlarda tesisatları gizlerken, modern ve geçirgen bir tavan görünümü sağlar.",
    icon: Building2,
  },
  {
    title: "Lambiri Tavan",
    description:
      "Ahşap dokusuyla mekâna sıcaklık katan, tavanı daha doğal ve samimi hissettiren lambiri uygulamaları.",
    icon: Sparkles,
  },
  {
    title: "Taş Yünü Uygulamaları",
    description:
      "Ofis, toplantı odası ve yaşam alanlarında ses ve ısı konforunu artıran taş yünü tavan ve duvar sistemleri.",
    icon: Layers,
  },
  {
    title: "Alçı Dekor",
    description:
      "Bölme duvar, niş, spot kanalı ve dekoratif detaylarla planınıza uygun, temiz hatlara sahip alçıpan çözümleri.",
    icon: Brush,
  },
  {
    title: "Dekoratif Boya",
    description:
      "Düz bir boya yüzeyi yerine mekânın karakterini güçlendiren doku ve efektlerle özel dekoratif boya uygulamaları.",
    icon: Palette,
  },
  {
    title: "Grenli Boya",
    description:
      "Dış cephe ve yoğun kullanılan iç yüzeylerde dayanıklılığı ve dokuyu bir arada sunan grenli boya çözümleri.",
    icon: Palette,
  },
  {
    title: "Sedef Boya",
    description:
      "Işığa göre ton değiştiren, duvarlara zarif ve canlı bir derinlik katan sedef efekt uygulamaları.",
    icon: Sparkles,
  },
  {
    title: "Dış Cephe Mantolama",
    description:
      "Mevsim koşullarına uygun malzeme seçimiyle binanızın ısı kaybını azaltan, uzun ömürlü mantolama uygulamaları.",
    icon: Building2,
  },
  {
    title: "Yalı Baskı",
    description:
      "Doğal taş veya ahşap görünümünü, bakım gerektirmeyen dış cephe kaplamalarıyla cepheye taşıyan yalı baskı uygulamaları.",
    icon: Building2,
  },
  {
    title: "Tadilat & Dekorasyon Genel Hizmetler",
    description:
      "Keşiften teslimata kadar tüm ince işleri tek elden yönettiğimiz, anahtar teslim tadilat ve dekorasyon hizmetleri.",
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
      transition={{ duration: 0.85, ease: [0.22, 0.61, 0.36, 1] }}
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 22, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 0.61, 0.36, 1],
              delay: index * 0.04,
            }}
            whileHover={{ y: -6, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <GlassCard className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 shadow-sm shadow-teal-100/70">
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
      </div>
    </motion.section>
  );
}
