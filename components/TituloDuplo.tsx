import React from "react";

interface TituloDuploProps {
  principal: string;
  subtitulo: string;
  as?: "h1" | "h2";
  variante?: "rosa" | "suave";
  className?: string;
  tituloClassName?: string;
  subtituloClassName?: string;
  children?: React.ReactNode;
}

export default function TituloDuplo({
  principal,
  subtitulo,
  as: Tag = "h1",
  variante = "rosa",
  className = "flex flex-col relative z-20 select-none",
  tituloClassName,
  subtituloClassName = "text-[2.3rem] sm:text-[3.4rem] md:text-[5.5rem] font-serif text-amarelo italic leading-[0.95] md:leading-[0.8] mt-1 md:-mt-2 z-10",
  children,
}: TituloDuploProps) {
  const corPrincipal = variante === "rosa" ? "text-rosa" : "text-rosa-suave";
  const classeContorno =
    variante === "rosa" ? "texto-contorno-rosa" : "texto-contorno-suave";

  const classeTituloFinal =
    tituloClassName ??
    `text-[3.4rem] sm:text-[5rem] md:text-[7.5rem] font-bold ${corPrincipal} leading-[0.85] md:leading-[0.8] tracking-tighter`;

  return (
    <div className={className}>
      <Tag className={classeTituloFinal}>{principal}</Tag>
      <span className={`${subtituloClassName} ${classeContorno}`}>
        {subtitulo}
      </span>
      {children}
    </div>
  );
}
