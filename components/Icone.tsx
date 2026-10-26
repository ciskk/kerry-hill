import React from "react";

export type NomeIcone =
  | "sparkles"
  | "clipboard-list"
  | "check"
  | "chevron-down"
  | "chevron-up"
  | "x"
  | "arrow-right"
  | "arrow-left"
  | "menu"
  | "phone"
  | "mail"
  | "crown"
  | "heart"
  | "tag"
  | "shield-check"
  | "shield-alert"
  | "plus"
  | "trash-2"
  | "rotate-ccw"
  | "scale"
  | "droplets";

interface IconeProps {
  nome: NomeIcone;
  className?: string;
  label?: string;
}

/**
 * Renderiza um ícone SVG baixado na pasta /public/assets/icons/
 * usando máscara CSS para herdar automaticamente a cor do texto (currentColor).
 */
export default function Icone({
  nome,
  className = "w-4 h-4",
  label,
}: IconeProps) {
  const url = `/assets/icons/${nome}.svg`;

  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`inline-block shrink-0 bg-current align-middle ${className}`}
      style={{
        maskImage: `url(${url})`,
        WebkitMaskImage: `url(${url})`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
