import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NavegacaoApresentacao from "@/components/NavegacaoApresentacao";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const serifTitulo = Playfair_Display({
  variable: "--font-serif-titulo",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "As Patricinhas de Kerry Hill",
    template: "%s | As Patricinhas de Kerry Hill",
  },
  description:
    "Guia interativo sobre criação, genética e produção de leite de ovelhas Kerry Hill",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${serifTitulo.variable}`}
    >
      <body className="font-sans antialiased bg-creme bg-textura-scrapbook min-h-screen flex flex-col text-rosa">
        {/* BARRA DE NAVEGAÇÃO SUPERIOR (NAVBAR) */}
        <Navbar />

        {/* CONTEÚDO DA PÁGINA */}
        <main className="flex-1 w-full flex flex-col">{children}</main>

        {/* ROTEIRO SEQUENCIAL PARA APRESENTAÇÃO ESCOLAR */}
        <NavegacaoApresentacao />

        {/* RODAPÉ DO PROJETO ESCOLAR */}
        <Footer />
      </body>
    </html>
  );
}
