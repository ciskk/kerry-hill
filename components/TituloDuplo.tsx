import React from "react";

interface TituloDuploProps {
  principal: string;
  subtitulo: string;
  as?: "h1" | "h2";
  className?: string;
  tituloClassName?: string;
  subtituloClassName?: string;
  corContorno?: string;
  children?: React.ReactNode;
}

export default function TituloDuplo({
  principal,
  subtitulo,
  as: Tag = "h1",
  className = "flex flex-col relative z-20 select-none",
  tituloClassName = "text-[3.4rem] sm:text-[5rem] md:text-[7.5rem] font-bold text-rosa leading-[0.85] md:leading-[0.8] tracking-tighter",
  subtituloClassName = "text-[2.3rem] sm:text-[3.4rem] md:text-[5.5rem] font-serif text-amarelo italic leading-[0.95] md:leading-[0.8] mt-1 md:-mt-2 z-10",
  corContorno = "#D03C7A",
  children,
}: TituloDuploProps) {
  return (
    <div className={className}>
      <Tag className={tituloClassName}>{principal}</Tag>
      <span
        className={subtituloClassName}
        style={{
          textShadow: `2px 2px 0px ${corContorno}, -1px -1px 0px ${corContorno}, 1px -1px 0px ${corContorno}, -1px 1px 0px ${corContorno}`,
        }}
      >
        {subtitulo}
      </span>
      {children}
    </div>
  );
}
