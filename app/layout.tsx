import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SITE_URL = "https://simptomed.ru";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Simptomed — первичная оценка симптомов с ИИ",
    template: "%s",
  },
  description:
    "Опишите симптомы и получите понятную структуру: возможные причины, к какому врачу идти, когда нужна срочная помощь. На базе Claude Opus 4.7. Бесплатно и анонимно.",
  keywords: [
    "симптомы",
    "первичная оценка",
    "онлайн врач",
    "медицинский ассистент",
    "ИИ в медицине",
    "к какому врачу идти",
    "Claude Opus",
  ],
  authors: [{ name: "Simptomed" }],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: "Simptomed",
    title: "Simptomed — первичная оценка симптомов с ИИ",
    description:
      "Понятная структура вместо тревожного гугления: возможные причины, к какому врачу идти, когда нужна скорая.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simptomed — первичная оценка симптомов с ИИ",
    description: "Опишите симптомы — получите ясный ответ. Бесплатно и анонимно.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: "#3b82f6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
