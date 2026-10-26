import Link from "next/link";
import Estrela from "@/components/Estrela";
import Icone from "@/components/Icone";
import { linksNavegacao } from "@/data/conteudos";

export default function Footer() {
  return (
    <footer className="bg-amarelo-card border-t-2 border-rosa/20 px-4 md:px-8 py-6 text-rosa shrink-0">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        {/* Identificação do Projeto Escolar */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Estrela className="w-8 h-8 shrink-0" velocidadeGiro="lenta" />
          <div>
            <p className="font-serif italic font-bold text-lg text-rosa leading-tight">
              As Patricinhas de Kerry Hill
            </p>
            <p className="text-xs font-semibold text-rosa/80">
              Projeto escolar demonstrativo sobre ovinocultura, genética e produção de leite
            </p>
          </div>
        </div>

        {/* Links Rápidos */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-bold">
          {linksNavegacao.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:underline text-rosa/85 hover:text-rosa transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Assinatura com Ícone SVG */}
        <p className="inline-flex items-center gap-1.5 text-xs font-bold text-rosa/85">
          <span>Feito com</span>
          <Icone nome="heart" className="w-3.5 h-3.5 text-rosa" />
          <span>pelas Patricinhas de Kerry Hill</span>
        </p>
      </div>
    </footer>
  );
}
