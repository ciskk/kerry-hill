"use client";

import { useState } from "react";
import CursorPixel from "@/components/CursorPixel";
import Estrela from "@/components/Estrela";
import Icone from "@/components/Icone";
import TituloDuplo from "@/components/TituloDuplo";
import { perguntasGuia, topicosFotosGuia } from "@/data/conteudos";

export default function Guia() {
  // Estado para controlar qual balão de pergunta está expandido
  const [balaoAberto, setBalaoAberto] = useState<number | null>(null);
  // Estado para controlar qual foto inferior está expandida
  const [fotoAberta, setFotoAberta] = useState<number | null>(null);

  const handleToggleBalao = (index: number) => {
    setBalaoAberto(balaoAberto === index ? null : index);
  };

  return (
    <div className="w-full bg-creme text-rosa overflow-x-hidden min-h-screen font-sans">
      <div className="max-w-[1100px] mx-auto px-4 md:px-8 pt-10 md:pt-20 pb-20">
        {/* =========================================
            PARTE SUPERIOR: Título, Cher e Balões
            ========================================= */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between relative">
          {/* BLOCO 1: Títulos (Esquerda) */}
          <TituloDuplo
            principal="O Guia"
            subtitulo="do Criador"
            as="h1"
            className="flex flex-col relative z-20 w-full md:w-[35%] text-center md:text-left mt-2 md:mt-6"
            tituloClassName="text-[4.5rem] sm:text-[5.5rem] md:text-[7.5rem] font-bold text-rosa leading-[0.8] tracking-tighter"
            subtituloClassName="text-[3.4rem] sm:text-[4.5rem] md:text-[6rem] font-serif text-amarelo italic leading-[0.85] ml-0 md:ml-12 mt-1 md:mt-0 select-none"
          >
            <p className="text-rosa font-medium text-base sm:text-lg md:text-xl mt-4 ml-0 md:ml-20 select-none">
              clique nos balões ao lado para descobrir!
            </p>
          </TituloDuplo>

          {/* BLOCO 2: Cher com a caneta (Centro) */}
          <div className="relative w-full md:w-[30%] flex justify-center items-center z-10 mt-8 md:mt-[-1rem] md:-ml-8 md:-mr-8">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[400px] md:h-[400px] z-0 pointer-events-none">
              <Estrela
                alt="Estrela de fundo"
                velocidadeGiro="lenta"
                className="w-full h-full opacity-70"
              />
            </div>

            <div className="relative z-10 hover:scale-105 transition-transform duration-500">
              <img
                src="/assets/guia-cher-pompom.png"
                alt="Cher com caneta de pompom"
                className="w-[210px] md:w-[280px] h-auto drop-shadow-xl"
              />
            </div>
          </div>

          {/* BLOCO 3: Balões de Fala com Acordeão Interativo */}
          <div className="w-full md:w-[35%] flex flex-col items-center md:items-end gap-5 z-20 mt-8 md:mt-4">
            {perguntasGuia.map((item, index) => {
              const isOpen = balaoAberto === index;
              return (
                <button
                  key={item.pergunta}
                  type="button"
                  onClick={() => handleToggleBalao(index)}
                  className={`relative text-left bg-papel border border-black px-6 py-5 shadow-sm hover:bg-white active:scale-[0.99] transition-all w-[92%] md:w-[320px] focus:outline-none focus:ring-2 focus:ring-rosa rounded-md ${
                    isOpen ? "border-rosa bg-white ring-2 ring-rosa/20" : ""
                  }`}
                >
                  {/* Seta indicativa no canto do balão */}
                  <div
                    className={`absolute -left-[9px] top-7 w-4 h-4 bg-papel border-l border-b border-black rotate-45 transition-colors ${
                      isOpen ? "border-rosa bg-white" : ""
                    }`}
                  ></div>

                  <div className="flex justify-between items-center w-full gap-2">
                    <p
                      className={`font-bold text-[1.1rem] leading-snug tracking-tight transition-colors ${
                        isOpen ? "text-rosa" : "text-black"
                      }`}
                    >
                      {item.pergunta}
                    </p>
                    <Icone
                      nome={isOpen ? "chevron-up" : "chevron-down"}
                      className="w-5 h-5 text-rosa"
                    />
                  </div>

                  {/* Conteúdo Expansível com Transição de Altura */}
                  <div
                    className={`overflow-hidden transition-all duration-300 mt-2 ${
                      isOpen ? "max-h-[160px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-black/80 text-sm mt-2 border-t border-rosa/10 pt-2 leading-relaxed">
                      {item.resposta}
                    </p>
                  </div>

                  {/* Cursor visual no segundo balão para manter a referência estética */}
                  {index === 1 && (
                    <CursorPixel className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 w-10 h-10 md:w-12 md:h-12 z-30 pointer-events-none animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================
            PARTE INFERIOR: Fotos Interativas e Legendas
            ========================================= */}
        <div className="flex flex-col w-full mt-14 md:mt-4 md:pl-8 relative z-30">
          <div className="flex flex-col sm:flex-row gap-8 md:gap-14 items-center sm:items-start justify-center md:justify-start">
            {topicosFotosGuia.map((item, idx) => {
              const selecionada = fotoAberta === idx;
              return (
                <button
                  key={item.titulo}
                  type="button"
                  onClick={() => setFotoAberta(selecionada ? null : idx)}
                  aria-expanded={selecionada}
                  className="flex flex-col items-center gap-2.5 group cursor-pointer focus:outline-none"
                >
                  <div
                    className={`w-[200px] h-[200px] md:w-[220px] md:h-[220px] rounded-[2rem] overflow-hidden group-hover:-translate-y-2 transition-all duration-300 shadow-sm group-hover:shadow-md border-4 ${
                      selecionada
                        ? "border-rosa ring-4 ring-rosa/20 -translate-y-1"
                        : "border-transparent group-focus-visible:border-rosa"
                    }`}
                  >
                    <img
                      src={item.imagem}
                      alt={item.titulo}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-rosa text-[1.35rem] font-bold tracking-tight group-hover:text-rosa-escuro transition-colors">
                    {item.titulo}
                  </h4>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-rosa/75 bg-papel px-3 py-1 rounded-full border border-rosa/20">
                    <span>{selecionada ? "Fechar dica" : "Clique para ler"}</span>
                    <Icone
                      nome={selecionada ? "chevron-up" : "chevron-down"}
                      className="w-3.5 h-3.5"
                    />
                  </span>
                </button>
              );
            })}
          </div>

          {fotoAberta !== null && (
            <div
              role="region"
              aria-live="polite"
              className="mt-6 max-w-[620px] mx-auto md:mx-0 bg-papel border-2 border-rosa rounded-2xl p-6 shadow-md animate-pop-up relative"
            >
              <div className="flex justify-between items-start gap-4 mb-2">
                <div>
                  <h5 className="text-lg md:text-xl font-bold text-rosa">
                    {topicosFotosGuia[fotoAberta].titulo}
                  </h5>
                  <p className="text-xs font-semibold text-black/60">
                    {topicosFotosGuia[fotoAberta].resumo}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFotoAberta(null)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-rosa hover:underline px-2 py-1 rounded"
                >
                  <span>Fechar</span>
                  <Icone nome="x" className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-black/85 text-sm md:text-base leading-relaxed font-medium border-t border-rosa/15 pt-3 mt-2">
                {topicosFotosGuia[fotoAberta].detalhes}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
