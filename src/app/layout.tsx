import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileContactBar } from "@/components/layout/mobile-contact-bar";
import { siteConfig } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TNT DEKOR – Asma Tavan & Tadilat Dekorasyon Sistemleri",
  description:
    "Evinizi, ofisinizi ve yaşam alanlarınızı profesyonel dokunuşlarla yeniliyoruz. Güvenilir hizmet, yüksek kalite ve modern tasarım çözümleri tek çatı altında.",
  metadataBase: new URL("https://tntdekor.com"),
  openGraph: {
    title: "TNT DEKOR – Asma Tavan & Tadilat Dekorasyon Sistemleri",
    description:
      "Evinizi, ofisinizi ve yaşam alanlarınızı profesyonel dokunuşlarla yeniliyoruz. Güvenilir hizmet, yüksek kalite ve modern tasarım çözümleri tek çatı altında.",
    url: "https://tntdekor.com",
    siteName: "TNT DEKOR",
    type: "website",
    locale: "tr_TR",
  },
  alternates: {
    canonical: "https://tntdekor.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.02),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.03),_transparent_60%)]">
          <SiteHeader />
          {/* JSON-LD: Organization */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: siteConfig.shortName,
                url: siteConfig.url,
                sameAs: [siteConfig.instagram],
                contactPoint: [
                  {
                    "@type": "ContactPoint",
                    telephone: siteConfig.phonePrimaryRaw,
                    contactType: "customer service",
                    areaServed: "TR",
                    availableLanguage: ["tr", "en"],
                  },
                ],
              }),
            }}
          />
          <main className="mx-auto max-w-6xl px-4 pb-12 pt-8 md:px-6 lg:px-8 lg:pb-16 lg:pt-12">
            {children}
          </main>
          <SiteFooter />
        </div>
        <MobileContactBar />
      </body>
    </html>
  );
}
