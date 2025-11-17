"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";

import { siteConfig } from "@/lib/site";

export function MobileContactBar() {
  const { scrollYProgress } = useScroll();
  const translateY = useTransform(scrollYProgress, [0, 0.05], [72, 0]);
  const barOpacity = useTransform(scrollYProgress, [0, 0.02, 0.08], [0, 0.85, 1]);

  return (
    <motion.div
      style={{ y: translateY, opacity: barOpacity }}
      initial={{ y: 72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
      className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-center gap-2 border-t border-white/70 bg-white/95 px-4 py-2.5 shadow-[0_-10px_30px_rgba(15,23,42,0.12)] backdrop-blur-xl md:hidden"
    >
      <motion.a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-teal-600 px-4 py-2 text-[13px] font-medium font-cta text-white shadow-sm shadow-teal-900/30 transition-colors hover:bg-teal-700"
        whileTap={{ scale: 0.96 }}
        whileHover={{ scale: 1.02 }}
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </motion.a>
      <motion.a
        href={`tel:${siteConfig.phonePrimaryRaw}`}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-4 py-2 text-[13px] font-medium font-cta text-slate-800 shadow-sm transition-colors hover:bg-slate-50"
        whileTap={{ scale: 0.96 }}
        whileHover={{ scale: 1.02 }}
      >
        <Phone className="h-4 w-4" />
        Ara
      </motion.a>
    </motion.div>
  );
}
