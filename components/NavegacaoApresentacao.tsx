"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AnimarScroll from "@/components/AnimarScroll";
import Estrela from "@/components/Estrela";
import Icone from "@/components/Icone";
import { linksNavegacao } from "@/data/conteudos";

/**
 * Barra sequencial "Roteiro da Apresentação" exibida no fim de cada página
 * para facilitar a passagem de tópicos durante a apresentação escolar.
 */
export default function NavegacaoApresentacao() {
  const pathname = usePathname();
  const indiceAtual = linksNavegacao.findIndex((item) => item.href === pathname);

  if (indiceAtual === -1) return null;

  const anterior = indiceAtual > 0 ? linksNavegacao[indiceAtual - 1] : null;
  const proximo =
    indiceAtual < linksNavegacao.length - 1
      ? linksNavegacao[indiceAtual + 1]
      : linksNavegacao[0];

  const voltandoAoInicio = indiceAtual === linksNavegacao.length - 1;

  return (
    <aside
      aria-label="Roteiro de navegação da apresentação escolar"
      className="w-full max-w-[1150px] mx-auto px-4 md:px-8 pb-10 pt-2"
    >
      <AnimarScroll
        variante="subir"
        className="bg-papel/95 border-2 border-rosa/25 rounded-[2rem] p-4 sm:p-5 sombra-pop-sm flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        {/* Botão Anterior */}
        <div className="w-full sm:w-auto flex justify-center sm:justify-start">
          {anterior ? (
            <Link
              href={anterior.href}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-rosa bg-amarelo-card/60 hover:bg-amarelo-card px-4 py-2 rounded-full border border-rosa/20 transition-all active:scale-95"
            >
              <Icone nome="arrow-left" className="w-4 h-4" />
              <span>Anterior: {anterior.label}</span>
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rosa/70 px-3 py-1.5">
              <Estrela className="w-4 h-4" velocidadeGiro="lenta" />
              <span>Abertura da Apresentação</span>
            </span>
          )}
        </div>

        {/* Indicador de Etapa Central */}
        <div className="flex flex-col items-center text-center">
          <span className="text-[11px] font-black uppercase tracking-wider text-rosa/70">
            Roteiro da Apresentação • Etapa {indiceAtual + 1} de{" "}
            {linksNavegacao.length}
          </span>
          <div className="flex items-center gap-1.5 mt-1.5" aria-hidden="true">
            {linksNavegacao.map((link, idx) => (
              <span
                key={link.href}
                className={`h-2 rounded-full transition-all ${
                  idx === indiceAtual
                    ? "w-6 bg-rosa"
                    : idx < indiceAtual
                    ? "w-2 bg-rosa/45"
                    : "w-2 bg-amarelo-card"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Botão Próximo Tópico */}
        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
          <Link
            href={proximo.href}
            className="inline-flex items-center gap-2.5 bg-rosa hover:bg-rosa-escuro text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-sm hover:scale-[1.03] active:scale-95 transition-all"
          >
            <div className="text-left leading-tight">
              <span className="block text-[10px] uppercase tracking-wider opacity-85">
                {voltandoAoInicio ? "Recomeçar Roteiro" : "Próximo Tópico"}
              </span>
              <span className="block font-extrabold">
                {proximo.label} — {proximo.resumoApresentacao}
              </span>
            </div>
            <Icone nome="arrow-right" className="w-4 h-4 shrink-0" />
          </Link>
        </div>
      </AnimarScroll>
    </aside>
  );
}
