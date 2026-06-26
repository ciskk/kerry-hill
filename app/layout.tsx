"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Lista de links da barra de navegação para renderizar dinamicamente
  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/guia", label: "Guia" },
    { href: "/leite", label: "Leite" },
    { href: "/genetica", label: "Genética" },
    { href: "/calculadora", label: "Calculadora" },
    { href: "/contato", label: "Contato" },
  ];

  return (
    <html lang="pt-BR">
      <head>
        <title>As Patricinhas de Kerry Hill</title>
        <meta name="description" content="Sistema de Gestão de Ovinos e Caprinos" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#E2E4CE] min-h-screen text-[#C24984]`}
      >
        {/* BARRA DE NAVEGAÇÃO SUPERIOR (NAVBAR) */}
        <nav className="bg-[#E5CE82] px-8 py-4 flex justify-between items-center border-b-2 border-[#C24984]/20 sticky top-0 z-50 shadow-sm">
          {/* Logo Estrela */}
          <div className="flex items-center transition-transform duration-300 hover:rotate-45 cursor-pointer">
            <Image 
              src="/assets/star.png" 
              alt="Logo Estrela" 
              width={40} 
              height={40} 
              className="object-contain"
            />
          </div>

          {/* Links de Navegação com Animações Pop e Ativas */}
          <div className="flex gap-2 md:gap-4 font-bold text-lg">
            {navLinks.map((link) => {
              // Verifica se a página atual é igual ao link
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded transition-all duration-300 relative group overflow-hidden text-[#C24984]
                    ${isActive 
                      ? "bg-[#F1F3E9] shadow-inner scale-105 border border-[#C24984]/10" 
                      : "hover:bg-[#F1F3E9]/40 hover:scale-105 active:scale-95"
                    }
                  `}
                >
                  {/* Texto do Link */}
                  <span className="relative z-10">{link.label}</span>

                  {/* Linha animada que surge embaixo do texto ao passar o mouse */}
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-[3px] bg-[#C24984] transform origin-left transition-transform duration-300
                      ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                    `}
                  />
                </Link>
              );
            })}
          </div>
        </nav>

        {/* CONTEÚDO DA PÁGINA */}
        <main className="max-w-7xl mx-auto p-4 md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}