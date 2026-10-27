import React from "react";
import Link from "next/link";
import Estrela from "@/components/Estrela";
import Icone from "@/components/Icone";

interface CardProps {
  title: string;
  children: React.ReactNode;
  hoverEffect?: boolean;
  href?: string;
  selo?: string;
}

export default function Card({
  title,
  children,
  hoverEffect = true,
  href,
  selo,
}: CardProps) {
  const cardClasses = `bg-amarelo-card rounded-[3rem] p-8 md:p-10 min-h-[280px] md:min-h-[300px] flex flex-col justify-between relative sombra-pop transition-all duration-300 border-[3px] border-rosa/15
    ${
      hoverEffect
        ? "hover:-translate-y-2 hover:border-rosa cursor-pointer group focus:outline-none focus-visible:ring-4 focus-visible:ring-rosa"
        : ""
    }
  `;

  const conteudo = (
    <>
      {selo && (
        <span className="self-start mb-3 inline-flex items-center gap-1 bg-papel text-rosa text-xs font-extrabold px-3 py-1 rounded-full border border-rosa/25 -rotate-2 shadow-xs">
          <Icone nome="sparkles" className="w-3 h-3" />
          <span>{selo}</span>
        </span>
      )}

      <div>
        <h3 className="text-3xl font-bold text-black mb-4 tracking-wide group-hover:text-rosa transition-colors">
          {title}
        </h3>
        <div className="text-black/85 text-base md:text-lg leading-relaxed font-medium font-sans antialiased">
          {children}
        </div>
      </div>

      {href && (
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-rosa group-hover:translate-x-1 transition-transform">
          <span>Explorar página</span>
          <Icone nome="arrow-right" className="w-4 h-4" />
        </span>
      )}

      {/* Estrelas decorativas padronizadas com o componente Estrela */}
      <Estrela
        ariaHidden
        velocidadeGiro="parada"
        className="w-[30px] h-[30px] absolute -left-4 top-1/2 -translate-y-1/2 opacity-70 pointer-events-none"
      />
      <Estrela
        ariaHidden
        velocidadeGiro="parada"
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
