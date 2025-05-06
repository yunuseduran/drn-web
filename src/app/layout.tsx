import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DRN Moda Tekstil | Kurumsal Web Sitesi",
  description: "DRN Moda Tekstil, 25 yıllık tecrübesiyle global tekstil sektöründe öncü bir kuruluştur. Kalite, yenilikçilik ve sürdürülebilirlik ilkelerimizle hizmet veriyoruz.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
