"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { linksNavegacao } from "@/data/conteudos";

export default function Navbar() {
  const pathname = usePathname();
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <nav className="bg-amarelo-card px-4 md:px-8 py-3.5 md:py-4 border-b-2 border-rosa/20 sticky top-0 z-50 shadow-sm shrink-0">
      <div className="flex justify-between items-center w-full">
        {/* Logo Estrela Clicável */}
        <Link
          href="/"
          onClick={() => setMenuAberto(false)}
          aria-label="Voltar para a página inicial"
          className="flex items-center gap-2.5 group shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-rosa rounded-lg p-1"
        >
          <Image
            src="/assets/star.png"
            alt="Logo Estrela"
            width={40}
            height={40}
            className="object-contain w-9 h-9 md:w-10 md:h-10 transition-transform duration-300 group-hover:rotate-45"
          />
          <span className="md:hidden font-serif italic font-bold text-xl text-rosa tracking-tight">
            Kerry Hill
          </span>
        </Link>

        {/* Botão de Menu Mobile (Visível apenas em telas pequenas) */}
        <button
          type="button"
          onClick={() => setMenuAberto((prev) => !prev)}
          aria-expanded={menuAberto}
          aria-label={menuAberto ? "Fechar menu de navegação" : "Abrir menu de navegação"}
          className="md:hidden flex items-center gap-2 bg-papel-nav/90 hover:bg-papel-nav text-rosa font-bold text-sm px-3.5 py-2 rounded-full border border-rosa/20 shadow-sm active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-rosa"
        >
          <span>{menuAberto ? "Fechar" : "Menu"}</span>
          <span
            className={`inline-block transition-transform duration-300 text-base leading-none ${
              menuAberto ? "rotate-45" : "rotate-0"
            }`}
          >
            ✦
          </span>
        </button>

        {/* Links de Navegação Desktop com Animações Pop e Ativas */}
        <div className="hidden md:flex gap-2 lg:gap-4 font-bold text-lg">
          {linksNavegacao.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded transition-all duration-300 relative group overflow-hidden text-rosa
                  ${
                    isActive
                      ? "bg-papel-nav shadow-inner scale-105 border border-rosa/10"
                      : "hover:bg-papel-nav/40 hover:scale-105 active:scale-95"
                  }
                `}
              >
                <span className="relative z-10">{link.label}</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-[3px] bg-rosa transform origin-left transition-transform duration-300
                    ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                  `}
                />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Painel de Links Mobile (Dropdown expansível) */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuAberto
            ? "max-h-[320px] opacity-100 mt-3 pt-3 border-t border-rosa/15"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="grid grid-cols-2 gap-2 pb-1">
          {linksNavegacao.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuAberto(false)}
                className={`px-4 py-2.5 rounded-xl font-bold text-base text-center transition-all ${
                  isActive
                    ? "bg-papel-nav text-rosa shadow-inner border border-rosa/20"
                    : "bg-papel-nav/40 text-rosa hover:bg-papel-nav/80 active:scale-95"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
