import React from "react";

interface MolduraRecorteProps {
  children: React.ReactNode;
  className?: string;
  tamanhoPonto?: "sm" | "md";
  mostrarPontosLaterais?: boolean;
  comFitaAdesiva?: boolean;
  rotacaoHover?: boolean;
}

/**
 * Moldura estética de edição/recorte de revista (estilo Photoshop / Scrapbook anos 90)
 * com quadradinhos brancos de ancoragem nos cantos e opção de fita adesiva (washi tape).
 */
export default function MolduraRecorte({
  children,
  className = "",
  tamanhoPonto = "md",
  mostrarPontosLaterais = true,
  comFitaAdesiva = false,
  rotacaoHover = false,
}: MolduraRecorteProps) {
  const dimensaoPonto =
    tamanhoPonto === "sm"
      ? "w-2.5 h-2.5 border-[1.5px] border-black bg-white z-20"
      : "w-3 h-3 border-[1.5px] border-black bg-white z-20";

  return (
    <div
      className={`relative border-[1.5px] border-black p-1 transition-transform duration-500 ${
        rotacaoHover ? "hover:rotate-2" : ""
      } ${className}`}
    >
      {/* Fita adesiva decorativa (Washi Tape) estilo colagem */}
      {comFitaAdesiva && (
        <div
          aria-hidden="true"
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 -rotate-2 w-24 h-6 bg-amarelo-card/85 border border-rosa/30 shadow-xs z-30 pointer-events-none"
        />
      )}

      {/* Pontos de ancoragem superiores */}
      <div aria-hidden="true" className={`absolute -top-1.5 -left-1.5 ${dimensaoPonto}`} />
      <div
        aria-hidden="true"
        className={`absolute -top-1.5 left-1/2 -translate-x-1/2 ${dimensaoPonto}`}
      />
      <div aria-hidden="true" className={`absolute -top-1.5 -right-1.5 ${dimensaoPonto}`} />

      {/* Pontos de ancoragem laterais */}
      {mostrarPontosLaterais && (
        <>
          <div
            aria-hidden="true"
            className={`absolute top-1/2 -left-1.5 -translate-y-1/2 ${dimensaoPonto}`}
          />
          <div
            aria-hidden="true"
            className={`absolute top-1/2 -right-1.5 -translate-y-1/2 ${dimensaoPonto}`}
          />
        </>
      )}

      {/* Pontos de ancoragem inferiores */}
      <div aria-hidden="true" className={`absolute -bottom-1.5 -left-1.5 ${dimensaoPonto}`} />
      <div
        aria-hidden="true"
        className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 ${dimensaoPonto}`}
      />
      <div aria-hidden="true" className={`absolute -bottom-1.5 -right-1.5 ${dimensaoPonto}`} />

      {children}
    </div>
  );
}
