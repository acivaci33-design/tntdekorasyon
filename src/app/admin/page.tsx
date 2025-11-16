"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Lock, PlusCircle, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Project = {
  id: string;
  label: string;
  location: string;
  imageUrl?: string;
  createdAt?: string;
};

export default function AdminPage() {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [password, setPassword] = React.useState("");
  const [label, setLabel] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [authenticated, setAuthenticated] = React.useState(false);
  const [checkingPassword, setCheckingPassword] = React.useState(false);

  const [file, setFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  async function fetchProjects(adminToken?: string) {
    try {
      setLoading(true);
      const response = await fetch("/api/projects", {
        cache: "no-store",
        headers: adminToken
          ? {
              "x-admin-token": adminToken,
            }
          : undefined,
      });
      if (!response.ok) {
        throw new Error("Projeler alınamadı.");
      }
      const data = (await response.json()) as Project[];
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      setError("Projeler yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  async function handleUnlock() {
    if (!password) {
      setError("Lütfen yönetici şifresini girin.");
      return;
    }
    setCheckingPassword(true);
    setError(null);
    try {
      const response = await fetch("/api/projects", {
        method: "HEAD",
        headers: {
          "x-admin-token": password,
        },
      });
      if (!response.ok) {
        throw new Error("Şifre hatalı veya yetkisiz.");
      }
      setAuthenticated(true);
      await fetchProjects(password);
    } catch (error) {
      setAuthenticated(false);
      setProjects([]);
      setError(
        error instanceof Error ? error.message : "Şifre doğrulanamadı.",
      );
    } finally {
      setCheckingPassword(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!label || !location) {
      setError("Lütfen proje başlığı ve lokasyonu girin.");
      return;
    }
    if (!file) {
      setError("Lütfen proje görselini seçin.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      // 1) Görseli yükle
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await fetch("/api/projects/upload", {
        method: "POST",
        headers: {
          ...(password ? { "x-admin-token": password } : {}),
        },
        body: formData,
      });

      if (!uploadResponse.ok) {
        const data = (await uploadResponse.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error || "Görsel yüklenemedi.");
      }

      const uploadData = (await uploadResponse.json()) as { url: string };
      const finalImageUrl = uploadData.url;

      // 2) Projeyi kaydet
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(password ? { "x-admin-token": password } : {}),
        },
        body: JSON.stringify({ label, location, imageUrl: finalImageUrl }),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error || "Proje kaydedilemedi.");
      }
      const created = (await response.json()) as Project;
      setProjects((prev) => [created, ...prev]);
      setLabel("");
      setLocation("");
      setImageUrl("");
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Proje kaydedilemedi.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!id) return;
    setError(null);
    try {
      const response = await fetch("/api/projects", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(password ? { "x-admin-token": password } : {}),
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error || "Proje silinemedi.");
      }
      setProjects((prev) => prev.filter((project) => project.id !== id));
    } catch (error) {
      setError(error instanceof Error ? error.message : "Proje silinemedi.");
    }
  }

  return (
    <motion.section
      className="space-y-6"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            Yönetim Paneli
          </p>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Instagram Proje Kartları Yönetimi
          </h1>
          <p className="max-w-xl text-[0.8rem] leading-relaxed text-slate-600">
            Buradan ana sayfadaki Instagram bölümünde görünen proje kartlarını
            ekleyebilir, güncelleyebilir ve silebilirsiniz. Değişiklikler anında yayına alınır.
          </p>
        </div>
        <div className="space-y-2 rounded-3xl border border-slate-200/80 bg-white/80 p-3 text-[0.78rem] shadow-sm backdrop-blur-md sm:max-w-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <Lock className="h-4 w-4" />
            <span className="font-medium">Yönetici Şifresi</span>
          </div>
          <p className="text-[0.72rem] text-slate-500">
            Proje ekleme ve silme işlemleri için sunucu tarafında tanımlı
            yönetici şifresini girmeniz gerekir.
          </p>
          <Input
            type="password"
            placeholder="Yönetici şifresi"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 h-9 text-xs"
          />
          <Button
            type="button"
            size="md"
            className="mt-2 w-full text-xs"
            onClick={() => {
              void handleUnlock();
            }}
            disabled={checkingPassword}
          >
            {checkingPassword ? "Doğrulanıyor..." : "Girişi Aç"}
          </Button>
        </div>
      </div>
      {!authenticated ? (
        <div className="mt-4 rounded-3xl border border-dashed border-slate-200/80 bg-white/70 p-5 text-[0.8rem] text-slate-600 shadow-sm">
          <p className="font-semibold text-slate-900">Yönetim paneli kilitli.</p>
          <p className="mt-1 max-w-xl text-[0.75rem]">
            Proje kartlarını görüntülemek ve düzenlemek için yukarıdaki alana yönetici
            şifresini girip "Girişi Aç" butonuna tıklayın.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <motion.div
            className="space-y-4 rounded-3xl border border-white/70 bg-white/80 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur-2xl"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-900">
                  Yeni Proje Ekle
                </p>
                <p className="text-[0.75rem] text-slate-500">
                  Projenin başlığını, lokasyonunu ve isteğe bağlı olarak görsel URL&apos;sini girin.
                </p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-sm shadow-sky-500/40">
                <PlusCircle className="h-4 w-4" />
              </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-3 space-y-3 text-[0.8rem]">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700">Proje Başlığı *</label>
                  <Input
                    value={label}
                    onChange={(event) => setLabel(event.target.value)}
                    placeholder="Örn. Asma tavan uygulaması"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700">Lokasyon *</label>
                  <Input
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="Örn. Konut projesi, Ofis, Villa"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Proje Görseli *
                </label>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const selected = event.target.files?.[0] ?? null;
                    setFile(selected);
                  }}
                  className="h-11 cursor-pointer bg-white/90 text-xs file:mr-3 file:rounded-full file:border-0 file:bg-slate-900 file:px-3 file:py-1.5 file:text-[11px] file:font-medium file:text-white hover:file:bg-slate-800"
                />
                <p className="text-[0.7rem] text-slate-500">
                  Telefonunuzdan veya bilgisayarınızdan proje görselini seçin.
                </p>
              </div>
              <div className="flex items-center justify-between gap-3 pt-1">
                <Button type="submit" size="md" disabled={submitting} className="min-w-[150px]">
                  {submitting ? "Kaydediliyor..." : "Projeyi Ekle"}
                </Button>
                <p className="max-w-[220px] text-[0.7rem] text-slate-500">
                  Eklediğiniz projeler ana sayfadaki Instagram bölümünde en üstte görüntülenecektir.
                </p>
              </div>
              {error && (
                <p className="pt-1 text-[0.72rem] font-medium text-red-500">{error}</p>
              )}
            </form>
          </motion.div>

          <motion.div
            className="space-y-3 rounded-3xl border border-slate-100/90 bg-slate-50/80 p-5 text-[0.8rem] shadow-[0_18px_60px_rgba(148,163,184,0.35)]"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 }}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-900">Mevcut Projeler</p>
                <p className="text-[0.75rem] text-slate-500">
                  En güncel projeler listenin en üstünde yer alır. Silme işlemi ana sayfadan da kaldırır.
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-xs text-slate-600"
                onClick={() => {
                  if (!authenticated) return;
                  void fetchProjects(password || undefined);
                }}
              >
                Listeyi Yenile
              </Button>
            </div>
            {loading ? (
              <p className="text-[0.78rem] text-slate-500">Projeler yükleniyor...</p>
            ) : projects.length === 0 ? (
              <p className="text-[0.78rem] text-slate-500">
                Henüz kayıtlı proje bulunmuyor. Soldan yeni projeler ekleyebilirsiniz.
              </p>
            ) : (
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white/90 p-3 shadow-sm"
                  >
                    <div className="h-14 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                      {project.imageUrl ? (
                        <div
                          className="h-full w-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${project.imageUrl})` }}
                        />
                      ) : (
                        <div className="h-full w-full bg-[linear-gradient(135deg,#e5edf5,#fdf5f0)]" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-xs font-semibold text-slate-900">
                        {project.label}
                      </p>
                      <p className="text-[0.75rem] text-slate-600">{project.location}</p>
                      {project.createdAt && (
                        <p className="text-[0.7rem] text-slate-400">
                          {new Date(project.createdAt).toLocaleString("tr-TR")}
                        </p>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="ml-1 h-8 w-8 rounded-full border-red-200/80 bg-red-50/80 text-red-600 hover:bg-red-100"
                      onClick={() => {
                        void handleDelete(project.id);
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </motion.section>
  );
}
