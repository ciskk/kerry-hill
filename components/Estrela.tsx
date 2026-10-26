import React from "react";

interface EstrelaProps {
  className?: string;
  alt?: string;
  filtroRosa?: boolean;
  velocidadeGiro?: "lenta" | "normal" | "parada";
  ariaHidden?: boolean;
}

const FILTRO_ROSA =
  "brightness(0) saturate(100%) invert(32%) sepia(87%) saturate(1900%) hue-rotate(314deg) brightness(91%) contrast(98%)";

export default function Estrela({
  className = "w-8 h-8",
  alt = "Estrela",
  filtroRosa = false,
  velocidadeGiro = "normal",
  ariaHidden = false,
}: EstrelaProps) {
  const animacaoClass =
    velocidadeGiro === "lenta"
      ? "animate-[spin_30s_linear_infinite]"
      : velocidadeGiro === "normal"
      ? "animate-[spin_10s_linear_infinite]"
      : "";

  return (
    <img
      src="/assets/star.png"
      alt={ariaHidden ? "" : alt}
      aria-hidden={ariaHidden || undefined}
      className={`object-contain ${animacaoClass} ${className}`}
      style={filtroRosa ? { filter: FILTRO_ROSA } : undefined}
    />
  );
}
