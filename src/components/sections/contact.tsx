"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Instagram, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/site";

export function ContactSection() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = React.useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name || !phone || !email || !message) {
      setStatus("error");
      setStatusMessage(
        "Lütfen tüm alanları eksiksiz doldurun. Adınız, telefon numaranız, e-posta adresiniz ve projenizle ilgili açıklama zorunludur.",
      );
      return;
    }
    setSubmitting(true);
    setStatus("idle");
    setStatusMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, message }),
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      setStatus("success");
      setStatusMessage(
        "Teşekkür ederiz. Talebiniz bize ulaştı, en kısa süre içerisinde size dönüş sağlayacağız.",
      );
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        "Şu anda form gönderimi sırasında teknik bir sorun oluştu. Lütfen birkaç dakika sonra tekrar deneyin veya WhatsApp/telefon üzerinden bizimle iletişime geçin.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.section
      id="iletisim"
      className="space-y-6 scroll-mt-24 sm:scroll-mt-28"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.85, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">
          İletişim
        </p>
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          Projeniz için birlikte en doğru çözümü planlayalım.
        </h2>
        <p className="max-w-md text-[0.9rem] leading-relaxed text-slate-600">
          Kısa bir telefon görüşmesi veya WhatsApp üzerinden, ihtiyacınızı analiz edip size özel bir çözüm sunalım.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <motion.div
          className="space-y-4 rounded-3xl border border-teal-100/80 bg-white/85 p-5 shadow-[0_22px_70px_rgba(15,23,42,0.10)] backdrop-blur-2xl"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ y: -4, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="space-y-1 text-[0.9rem] text-slate-600">
            <p className="font-semibold text-slate-900">{siteConfig.shortName}</p>
            <p>WhatsApp: {siteConfig.phonePrimary}</p>
            <p>Telefon: {siteConfig.phoneSecondary}</p>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <Button
              asChild
              size="md"
              className="gap-2 shadow-[0_18px_45px_rgba(13,148,136,0.45)]"
            >
              <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="md"
              className="gap-2 border-teal-100/80 bg-white/80 text-teal-800"
            >
              <a href={`tel:${siteConfig.phonePrimaryRaw}`}>
                <Phone className="h-4 w-4" />
                Direkt Ara
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="md"
              className="gap-2 text-teal-700 hover:text-teal-800"
            >
              <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer">
                <Instagram className="h-4 w-4" />
                Instagram
              </a>
            </Button>
          </div>
        </motion.div>
        <motion.div
          className="rounded-3xl border border-teal-100/90 bg-white/90 p-5 shadow-[0_22px_70px_rgba(15,23,42,0.12)]"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ y: -4, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 }}
        >
          <form onSubmit={handleSubmit} className="space-y-3 text-[0.85rem]">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-medium text-slate-700">
                  Adınız Soyadınız *
                </label>
                <Input
                  id="name"
                  name="name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Örn. Ahmet Yılmaz"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="phone" className="text-xs font-medium text-slate-700">
                  Telefon Numaranız *
                </label>
                <Input
                  id="phone"
                  name="phone"
                  required
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Örn. 05xx xxx xx xx"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-medium text-slate-700">
                E-posta Adresiniz *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Size geri dönüş yapabilmemiz için"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="message" className="text-xs font-medium text-slate-700">
                Projeniz / Talebiniz *
              </label>
              <Textarea
                id="message"
                name="message"
                required
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Kısaca projenizden ve ihtiyacınızdan bahsedin. Ölçü, lokasyon, süre gibi detaylar ekleyebilirsiniz."
              />
            </div>
            <div className="flex items-center justify-between gap-3 pt-1">
              <Button type="submit" size="md" disabled={submitting} className="min-w-[150px]">
                {submitting ? "Gönderiliyor..." : "Formu Gönder"}
              </Button>
              <p className="max-w-[220px] text-[0.75rem] text-slate-500">
                Formu gönderdikten sonra en kısa süre içerisinde sizinle iletişime geçiyoruz.
              </p>
            </div>
            {status === "success" && statusMessage && (
              <p className="pt-1 text-[0.78rem] font-medium text-teal-600">{statusMessage}</p>
            )}
            {status === "error" && statusMessage && (
              <p className="pt-1 text-[0.78rem] font-medium text-red-500">{statusMessage}</p>
            )}
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
}
