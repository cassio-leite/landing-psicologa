import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Header } from "@/app/_components/header";
import { Footer } from "@/app/_components/footer";

const inter = Inter({
  subsets: ["latin"],
  display: "auto",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Dra. Kailaine Leite - Psicóloga",
  description: "Psicóloga clínica especializada em TCC. Atendimento online e presencial em São Paulo.",
  openGraph: {
    title: "Dra. Kailaine Leite - Psicóloga",
    description: "Psicóloga clínica especializada em TCC. Atendimento online e presencial em São Paulo.",
    url: SITE_URL,
    siteName: "Dra. Kailaine Leite - Psicóloga",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/logo.png`, // Fallback to logo until og-image.jpg is created
        width: 1200,
        height: 630,
        alt: "Dra. Kailaine Leite - Psicóloga",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Dra. Kailaine Leite - Psicóloga",
    description: "Psicóloga clínica especializada em TCC. Atendimento online e presencial em São Paulo.",
    images: [`${SITE_URL}/images/logo.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>
        <Header />
        {children}
        <Footer />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
