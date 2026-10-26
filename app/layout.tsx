"use client";

import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
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

const serifTitulo = Playfair_Display({
  variable: "--font-serif-titulo",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "600", "700"],
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
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${serifTitulo.variable}`}
    >
      <head>
        <title>As Patricinhas de Kerry Hill</title>
        <meta name="description" content="Guia interativo sobre criação, genética e produção de leite de ovelhas Kerry Hill" />
      </head>
      <body
        className="font-sans antialiased bg-creme min-h-screen flex flex-col text-rosa"
      >
        {/* BARRA DE NAVEGAÇÃO SUPERIOR (NAVBAR) */}
        <nav className="bg-amarelo-card px-8 py-4 flex justify-between items-center border-b-2 border-rosa/20 sticky top-0 z-50 shadow-sm shrink-0">
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
                  className={`px-4 py-2 rounded transition-all duration-300 relative group overflow-hidden text-rosa
                    ${isActive 
                      ? "bg-papel-nav shadow-inner scale-105 border border-rosa/10" 
                      : "hover:bg-papel-nav/40 hover:scale-105 active:scale-95"
                    }
                  `}
                >
                  {/* Texto do Link */}
                  <span className="relative z-10">{link.label}</span>

                  {/* Linha animada que surge embaixo do texto ao passar o mouse */}
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-[3px] bg-rosa transform origin-left transition-transform duration-300
                      ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                    `}
                  />
                </Link>
              );
            })}
          </div>
        </nav>

        {/* CONTEÚDO DA PÁGINA */}
        {/* Correção: O flex-1 distribui o tamanho perfeitamente e elimina de vez a barra de rolagem dupla */}
        <main className="flex-1 w-full flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}