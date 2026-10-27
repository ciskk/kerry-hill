"use client";

import React from "react";
import { useVisibilidadeScroll } from "@/hooks/useVisibilidadeScroll";

export type VarianteScroll =
  | "subir"
  | "esquerda"
  | "direita"
  | "escala"
  | "colagem";

interface AnimarScrollProps {
  children: React.ReactNode;
  variante?: VarianteScroll;
  atrasoMs?: number;
  duracaoMs?: number;
  threshold?: number;
  className?: string;
  as?: "div" | "section" | "article";
}

const CLASSES_OCULTO: Record<VarianteScroll, string> = {
  subir: "opacity-0 translate-y-10 scale-[0.98]",
  esquerda: "opacity-0 -translate-x-10",
  direita: "opacity-0 translate-x-10",
  escala: "opacity-0 scale-90",
  colagem: "opacity-0 translate-y-8 -rotate-2 scale-95",
};

const CLASSES_VISIVEL: Record<VarianteScroll, string> = {
  subir: "opacity-100 translate-y-0 scale-100",
  esquerda: "opacity-100 translate-x-0",
  direita: "opacity-100 translate-x-0",
  escala: "opacity-100 scale-100",
  colagem: "opacity-100 translate-y-0 rotate-0 scale-100",
};

/**
 * Wrapper reutilizável para animar elementos suavemente conforme entram na tela durante o scroll.
 */
export default function AnimarScroll({
  children,
  variante = "subir",
  atrasoMs = 0,
  duracaoMs = 750,
  threshold = 0.12,
  className = "",
  as: Tag = "div",
}: AnimarScrollProps) {
  const { ref, visivel } = useVisibilidadeScroll<HTMLDivElement>(threshold);

  return (
    <Tag
      ref={ref}
      style={{
        transitionDelay: `${atrasoMs}ms`,
        transitionDuration: `${duracaoMs}ms`,
      }}
      className={`transition-all ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
        visivel ? CLASSES_VISIVEL[variante] : CLASSES_OCULTO[variante]
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
