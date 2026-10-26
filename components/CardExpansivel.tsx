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
    <div
      role="button"
      tabIndex={0}
      aria-expanded={aberto}
      aria-controls={contentId}
      onClick={onAlternar}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onAlternar();
        }
      }}
      className={`bg-amarelo-card rounded-[2.5rem] p-8 md:p-10 pb-12 flex-1 w-full relative hover:-translate-y-2 transition-all duration-300 cursor-pointer select-none border-[3px] shadow-md focus:outline-none focus-visible:ring-4 focus-visible:ring-rosa focus-visible:ring-offset-2 ${
        aberto ? "border-rosa" : "border-transparent"
      }`}
    >
      <h4 className="text-[1.4rem] md:text-[1.8rem] font-bold text-black mb-4 leading-[1.1] tracking-tight">
        {titulo}
      </h4>

      <div className="text-black/80 text-sm md:text-base leading-relaxed font-medium">
        {resumo}
      </div>

      {/* Informações detalhadas exibidas ao clicar */}
      <div
        id={contentId}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          aberto
            ? "max-h-[500px] opacity-100 mt-4 pt-4 border-t border-black/10"
            : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>

      <span className="absolute bottom-3 right-6 inline-flex items-center gap-1 text-[10px] md:text-xs font-bold text-black/50">
        <span>{aberto ? "Clique para fechar" : "Clique para ler mais"}</span>
        <Icone nome={aberto ? "chevron-up" : "chevron-down"} className="w-3.5 h-3.5" />
      </span>
    </div>
  );
}
