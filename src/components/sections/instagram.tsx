"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { siteConfig } from "@/lib/site";

type Project = {
  id?: string;
  label: string;
  location: string;
  imageUrl?: string;
  createdAt?: string;
};

const mockProjects: Project[] = [
  {
    label: "Asma tavan uygulaması",
    location: "Konut projesi",
  },
  {
    label: "Ofis tadilatı",
    location: "Kurumsal müşteri",
  },
  {
    label: "Gergi tavan & aydınlatma",
    location: "Showroom",
  },
  {
    label: "Dış cephe mantolama",
    location: "Site projesi",
  },
  {
    label: "Dekoratif boya & sedef",
    location: "Villa",
  },
  {
    label: "Mesh tavan",
    location: "Ticari alan",
  },
];

export function InstagramSection() {
  const [projects, setProjects] = React.useState<Project[] | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    let active = true;
    setIsLoading(true);

    fetch("/api/projects")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("İstek başarısız.");
        }
        const data = (await response.json()) as Project[];
        if (active) {
          setProjects(Array.isArray(data) ? data : []);
        }
      })
      .catch(() => {
        if (active) {
          setProjects([]);
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const items = projects && projects.length > 0 ? projects : mockProjects;

  return (
    <motion.section
      id="instagram"
      className="space-y-6 scroll-mt-24 sm:scroll-mt-28"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            Instagram
          </p>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Projelerimizi canlı olarak takip edin.
          </h2>
          <p className="max-w-md text-[0.9rem] leading-relaxed text-slate-600">
            Güncel proje fotoğrafları, öncesi-sonrası karşılaştırmaları ve uygulama
            süreçleri için Instagram hesabımızı takip edin.
          </p>
          {isLoading && (
            <p className="text-xs text-slate-400">Projeler yükleniyor...</p>
          )}
        </div>
        <Button
          asChild
          variant="outline"
          size="md"
          className="mt-1 inline-flex items-center gap-2 border-slate-200/90 bg-white/80 text-xs text-slate-800 backdrop-blur-md"
        >
          <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer">
            <Instagram className="h-4 w-4" />
            {siteConfig.instagramHandle}
          </a>
        </Button>
      </div>
      <motion.div
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.09, delayChildren: 0.03 } },
        }}
      >
        {items.map((project, index) => (
          <motion.div
            key={project.id ?? index}
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.98 },
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
            <GlassCard className="group relative overflow-hidden p-0">
              <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0_0,rgba(56,189,248,0.18),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(251,191,36,0.2),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
                {project.imageUrl ? (
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{ backgroundImage: `url(${project.imageUrl})` }}
                  />
                ) : (
                  <div className="h-full w-full bg-[linear-gradient(135deg,#e5edf5,#fdf5f0)]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 space-y-1 p-3 text-xs text-slate-50 sm:p-4 sm:text-[0.8rem]">
                  <p className="font-semibold">{project.label}</p>
                  <p className="text-slate-200/90">{project.location}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
