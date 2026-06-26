import React from "react";

interface CardProps {
  title: string;
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export default function Card({ title, children, hoverEffect = true }: CardProps) {
  return (
    <div className={`bg-[#E5CE82] rounded-[3rem] p-10 min-h-[300px] flex flex-col relative shadow-md transition-all duration-300
      ${hoverEffect ? "hover:-translate-y-2 cursor-pointer" : ""}
    `}>
      <h4 className="text-3xl font-bold text-black mb-4 tracking-wide">{title}</h4>
      <div className="text-black/85 text-base md:text-lg leading-relaxed font-medium font-sans antialiased">
        {children}
      </div>
      
      {/* Estrelas decorativas padronizadas e seguras de carregar */}
      <img 
        src="/assets/star.png" 
        alt="Estrela decorativa" 
        className="w-[30px] h-[30px] absolute -left-4 top-1/2 transform -translate-y-1/2 opacity-70 pointer-events-none" 
      />
      <img 
        src="/assets/star.png" 
        alt="Estrela decorativa" 
        className="w-[20px] h-[20px] absolute right-8 bottom-8 opacity-40 pointer-events-none" 
      />
    </div>
  );
}