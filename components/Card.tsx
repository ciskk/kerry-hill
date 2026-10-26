import React from "react";
import Link from "next/link";

interface CardProps {
  title: string;
  children: React.ReactNode;
  hoverEffect?: boolean;
  href?: string;
}

export default function Card({ title, children, hoverEffect = true, href }: CardProps) {
  const cardClasses = `bg-amarelo-card rounded-[3rem] p-8 md:p-10 min-h-[280px] md:min-h-[300px] flex flex-col justify-between relative shadow-md transition-all duration-300 border-[3px] border-transparent
    ${hoverEffect ? "hover:-translate-y-2 hover:border-rosa/40 cursor-pointer group focus:outline-none focus-visible:ring-4 focus-visible:ring-rosa" : ""}
  `;

  const conteudo = (
    <>
      <div>
        <h4 className="text-3xl font-bold text-black mb-4 tracking-wide group-hover:text-rosa transition-colors">
          {title}
        </h4>
        <div className="text-black/85 text-base md:text-lg leading-relaxed font-medium font-sans antialiased">
          {children}
        </div>
      </div>

      {href && (
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-rosa group-hover:translate-x-1 transition-transform">
          Explorar página <span aria-hidden="true">→</span>
        </span>
      )}
      
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
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cardClasses}>
        {conteudo}
      </Link>
    );
  }

  return <div className={cardClasses}>{conteudo}</div>;
}
