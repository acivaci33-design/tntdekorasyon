import { MessageCircle } from "lucide-react";

import { siteConfig } from "@/lib/site";

export function WhatsappFab() {
  return (
    <a
      href={siteConfig.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile iletişime geç"
      className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-900/30 transition hover:-translate-y-0.5 hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:bottom-6 md:right-6"
    >
      <MessageCircle className="h-5 w-5" />
    </a>
  );
}
