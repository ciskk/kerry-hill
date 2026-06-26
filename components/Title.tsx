import React from "react";

interface TitleProps {
  mainText: string;
  subText: string;
  variant?: "pink" | "gold"; // Flexibilidade para alternar as cores conforme a página
}

export default function Title({ mainText, subText, variant = "pink" }: TitleProps) {
  const isPink = variant === "pink";
  const mainColorClass = isPink ? "text-[#D03C7A]" : "text-[#C24984]";
  const strokeColor = isPink ? "#D03C7A" : "#C24984";

  return (
    <div className="flex flex-col relative z-20 w-full text-center md:text-left mb-10 md:mb-16 pl-0 md:pl-8 select-none">
      <h2 className={`text-[5.5rem] md:text-[7.5rem] font-bold ${mainColorClass} leading-[0.8] tracking-tighter`}>
        {mainText}
      </h2>
      <span 
        className="text-[3.5rem] md:text-[5.5rem] font-serif text-[#E2C337] italic leading-[0.8] mt-2 md:-mt-2 z-10"
        style={{ 
          textShadow: `2px 2px 0px ${strokeColor}, -1px -1px 0px ${strokeColor}, 1px -1px 0px ${strokeColor}, -1px 1px 0px ${strokeColor}` 
        }}
      >
        {subText}
      </span>
    </div>
  );
}