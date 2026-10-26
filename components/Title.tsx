import React from "react";
import TituloDuplo from "@/components/TituloDuplo";

interface TitleProps {
  mainText: string;
  subText: string;
  variant?: "pink" | "gold"; // Flexibilidade para alternar as cores conforme a página
}

export default function Title({ mainText, subText, variant = "pink" }: TitleProps) {
  const isPink = variant === "pink";
  const mainColorClass = isPink ? "text-rosa" : "text-rosa-suave";
  const strokeColor = isPink ? "#D03C7A" : "#C24984";

  return (
    <TituloDuplo
      principal={mainText}
      subtitulo={subText}
      as="h2"
      className="flex flex-col relative z-20 w-full text-center md:text-left mb-8 md:mb-14 pl-0 md:pl-8 select-none"
      tituloClassName={`text-[3.4rem] sm:text-[5rem] md:text-[7.5rem] font-bold ${mainColorClass} leading-[0.85] md:leading-[0.8] tracking-tighter`}
      subtituloClassName="text-[2.3rem] sm:text-[3.4rem] md:text-[5.5rem] font-serif text-amarelo italic leading-[0.95] md:leading-[0.8] mt-1 md:-mt-2 z-10"
      corContorno={strokeColor}
    />
  );
}
