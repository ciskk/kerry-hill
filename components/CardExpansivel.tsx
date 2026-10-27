"use client";

import { ReactNode, useId } from "react";
import Icone from "@/components/Icone";

export interface CardExpansivelProps {
  titulo: ReactNode;
  resumo: ReactNode;
  children: ReactNode;
  aberto: boolean;
  onAlternar: () => void;
}

export default function CardExpansivel({
  titulo,
  resumo,
  children,
  aberto,
  onAlternar,
}: CardExpansivelProps) {
  const contentId = useId();

  return (
    <button
      type="button"
      aria-expanded={aberto}
      aria-controls={contentId}
      onClick={onAlternar}
      className={`text-left bg-amarelo-card rounded-[2.5rem] p-8 md:p-10 pb-12 flex-1 w-full relative hover:-translate-y-2 transition-all duration-300 cursor-pointer select-none border-[3px] sombra-pop focus:outline-none focus-visible:ring-4 focus-visible:ring-rosa focus-visible:ring-offset-2 ${
        aberto ? "border-rosa ring-2 ring-rosa/20" : "border-rosa/15 hover:border-rosa/50"
      }`}
    >
      <h3 className="text-[1.4rem] md:text-[1.8rem] font-bold text-black mb-4 leading-[1.1] tracking-tight">
        {titulo}
      </h3>

      <div className="text-black/80 text-sm md:text-base leading-relaxed font-medium">
        {resumo}
      </div>

      {/* Transição suave de altura usando CSS Grid para nunca cortar o conteúdo */}
      <div
        id={contentId}
        className={`grid transition-all duration-500 ease-in-out ${
          aberto
            ? "grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-black/10"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>

      <span className="absolute bottom-3.5 right-6 inline-flex items-center gap-1 text-[11px] md:text-xs font-bold text-rosa/80">
        <span>{aberto ? "Clique para fechar" : "Clique para ler mais"}</span>
        <Icone
          nome={aberto ? "chevron-up" : "chevron-down"}
          className="w-3.5 h-3.5"
        />
      </span>
    </button>
  );
}
