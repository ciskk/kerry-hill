"use client";

import { useState } from "react";
import AnimarScroll from "@/components/AnimarScroll";
import CursorPixel from "@/components/CursorPixel";
import Estrela from "@/components/Estrela";
import Icone from "@/components/Icone";
import MolduraRecorte from "@/components/MolduraRecorte";
import TituloDuplo from "@/components/TituloDuplo";
import {
  checklistManejoGuia,
  perguntasGuia,
  topicosFotosGuia,
} from "@/data/conteudos";

export default function Guia() {
  // Estado para controlar qual balão de pergunta está expandido
  const [balaoAberto, setBalaoAberto] = useState<number | null>(0);
  // Estado para controlar qual foto inferior está expandida
  const [fotoAberta, setFotoAberta] = useState<number | null>(0);
  // Estado para o Checklist Diário de Manejo VIP
  const [itensConcluidos, setItensConcluidos] = useState<string[]>([
    "chk-1",
    "chk-2",
  ]);

  const handleToggleBalao = (index: number) => {
    setBalaoAberto(balaoAberto === index ? null : index);
  };

  const handleToggleChecklist = (id: string) => {
    setItensConcluidos((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const progressoChecklist = Math.round(
    (itensConcluidos.length / checklistManejoGuia.length) * 100
  );

  return (
    <div className="w-full text-rosa overflow-x-hidden min-h-screen font-sans">
      <div className="max-w-[1150px] mx-auto px-4 md:px-8 pt-10 md:pt-20 pb-14 space-y-16">
        {/* =========================================
            PARTE SUPERIOR: Título, Cher e Balões
            ========================================= */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between relative">
          {/* BLOCO 1: Títulos (Esquerda) */}
          <AnimarScroll
            variante="esquerda"
            className="w-full md:w-[35%] z-20"
          >
            <TituloDuplo
              principal="O Guia"
              subtitulo="do Criador"
              as="h1"
              className="flex flex-col relative w-full text-center md:text-left mt-2 md:mt-6"
              tituloClassName="text-[4.5rem] sm:text-[5.5rem] md:text-[7.5rem] font-bold text-rosa leading-[0.8] tracking-tighter"
              subtituloClassName="text-[3.4rem] sm:text-[4.5rem] md:text-[6rem] font-serif text-amarelo italic leading-[0.85] ml-0 md:ml-12 mt-1 md:mt-0 select-none"
            >
              <p className="text-rosa font-semibold text-base sm:text-lg md:text-xl mt-4 ml-0 md:ml-20 select-none">
                clique nos balões ao lado para descobrir!
              </p>
            </TituloDuplo>
          </AnimarScroll>

          {/* BLOCO 2: Cher com a caneta (Centro) */}
          <AnimarScroll
            variante="escala"
            atrasoMs={100}
            className="relative w-full md:w-[30%] flex justify-center items-center z-10 mt-8 md:mt-[-1rem] md:-ml-8 md:-mr-8"
          >
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
          </AnimarScroll>

          {/* BLOCO 3: Balões de Fala com Acordeão Interativo (CSS Grid) */}
          <AnimarScroll
            variante="direita"
            atrasoMs={180}
            className="w-full md:w-[35%] flex flex-col items-center md:items-end gap-5 z-20 mt-8 md:mt-4"
          >
            {perguntasGuia.map((item, index) => {
              const isOpen = balaoAberto === index;
              return (
                <button
                  key={item.pergunta}
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => handleToggleBalao(index)}
                  className={`relative text-left bg-papel border-[1.5px] border-black px-6 py-5 sombra-pop-sm hover:bg-white active:scale-[0.99] transition-all w-[92%] md:w-[330px] focus:outline-none focus:ring-2 focus:ring-rosa rounded-2xl ${
                    isOpen ? "border-rosa bg-white ring-2 ring-rosa/20" : ""
                  }`}
                >
                  {/* Seta indicativa apontando para a Cher no desktop */}
                  <div
                    aria-hidden="true"
                    className={`hidden md:block absolute -left-[9px] top-7 w-4 h-4 bg-papel border-l-[1.5px] border-b-[1.5px] border-black rotate-45 transition-colors ${
                      isOpen ? "border-rosa bg-white" : ""
                    }`}
                  />

                  <div className="flex justify-between items-center w-full gap-2">
                    <p
                      className={`font-bold text-[1.08rem] leading-snug tracking-tight transition-colors ${
                        isOpen ? "text-rosa" : "text-black"
                      }`}
                    >
                      {item.pergunta}
                    </p>
                    <Icone
                      nome={isOpen ? "chevron-up" : "chevron-down"}
                      className="w-5 h-5 text-rosa shrink-0"
                    />
                  </div>

                  {/* Conteúdo Expansível com CSS Grid para nunca cortar o texto */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 mt-2.5"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-black/85 text-sm border-t border-rosa/15 pt-2.5 leading-relaxed font-medium">
                        {item.resposta}
                      </p>
                    </div>
                  </div>

                  {/* Cursor visual no segundo balão para manter a referência estética */}
                  {index === 1 && (
                    <CursorPixel className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 w-10 h-10 md:w-12 md:h-12 z-30 pointer-events-none animate-pulse" />
                  )}
                </button>
              );
            })}
          </AnimarScroll>
        </div>

        {/* =========================================
            PARTE INTERMEDIÁRIA: Fotos Interativas estilo Scrapbook
            ========================================= */}
        <AnimarScroll
          variante="colagem"
          className="flex flex-col w-full md:pl-8 relative z-30"
        >
          <div className="flex flex-col sm:flex-row gap-8 md:gap-14 items-center sm:items-start justify-center md:justify-start">
            {topicosFotosGuia.map((item, idx) => {
              const selecionada = fotoAberta === idx;
              return (
                <button
                  key={item.titulo}
                  type="button"
                  onClick={() => setFotoAberta(selecionada ? null : idx)}
                  aria-expanded={selecionada}
                  className="flex flex-col items-center gap-3 group cursor-pointer focus:outline-none"
                >
                  <MolduraRecorte
                    tamanhoPonto="sm"
                    mostrarPontosLaterais={false}
                    comFitaAdesiva
                    className={`bg-papel p-2 transition-all duration-300 group-hover:-translate-y-2 ${
                      selecionada
                        ? "sombra-pop-forte -translate-y-1"
                        : "sombra-pop-sm"
                    }`}
                  >
                    <div className="w-[200px] h-[190px] md:w-[220px] md:h-[205px] overflow-hidden relative">
                      <img
                        src={item.imagem}
                        alt={item.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute bottom-2 right-2 bg-rosa text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                        {item.selo}
                      </span>
                    </div>
                  </MolduraRecorte>

                  <h2 className="text-rosa text-[1.35rem] font-bold tracking-tight group-hover:text-rosa-escuro transition-colors mt-1">
                    {item.titulo}
                  </h2>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-rosa bg-papel px-3.5 py-1 rounded-full border border-rosa/25 shadow-xs">
                    <span>
                      {selecionada ? "Ocultar dica" : "Clique para ler"}
                    </span>
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
              className="mt-7 max-w-[680px] mx-auto md:mx-0 bg-papel border-2 border-rosa rounded-[1.8rem] p-6 sombra-pop animate-pop-up relative"
            >
              <div className="flex justify-between items-start gap-4 mb-2">
                <div className="flex items-start gap-2.5">
                  <Estrela
                    ariaHidden
                    filtroRosa
                    velocidadeGiro="parada"
                    className="w-6 h-6 mt-0.5 shrink-0"
                  />
                  <div>
                    <h3 className="text-lg md:text-xl font-extrabold text-rosa">
                      {topicosFotosGuia[fotoAberta].titulo}
                    </h3>
                    <p className="text-xs font-bold text-black/60">
                      {topicosFotosGuia[fotoAberta].resumo}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFotoAberta(null)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-rosa hover:underline px-2 py-1 rounded shrink-0"
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
        </AnimarScroll>

        {/* =========================================
            NOVA SEÇÃO AO SCROLLAR: CHECKLIST DIÁRIO DO CRIADOR VIP
            ========================================= */}
        <AnimarScroll variante="subir">
          <div className="bg-papel/95 border-2 border-rosa/25 rounded-[2.5rem] p-6 sm:p-8 md:p-10 sombra-pop">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 text-center md:text-left">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-rosa text-white text-xs font-bold px-3.5 py-1 rounded-full mb-2">
                  <Icone nome="clipboard-list" className="w-3.5 h-3.5" />
                  <span>Rotina Prática na Fazenda</span>
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif text-amarelo italic texto-contorno-rosa leading-tight">
                  Checklist de Manejo das Patricinhas
                </h2>
                <p className="text-rosa text-xs sm:text-sm font-semibold mt-1">
                  Marque as tarefas abaixo para simular a rotina de cuidados do
                  rebanho:
                </p>
              </div>

              {/* Barra de Progresso do Checklist */}
              <div className="bg-amarelo-card/85 border-2 border-rosa/20 rounded-2xl px-4 py-3 min-w-[210px] text-center">
                <div className="flex items-center justify-between text-xs font-black text-rosa mb-1.5">
                  <span>Progresso do Manejo</span>
                  <span>
                    {itensConcluidos.length}/{checklistManejoGuia.length} (
                    {progressoChecklist}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-papel rounded-full overflow-hidden border border-rosa/20">
                  <div
                    className="h-full bg-rosa rounded-full transition-all duration-500"
                    style={{ width: `${progressoChecklist}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {checklistManejoGuia.map((item) => {
                const marcado = itensConcluidos.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={marcado}
                    onClick={() => handleToggleChecklist(item.id)}
                    className={`text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 cursor-pointer ${
                      marcado
                        ? "bg-amarelo-card/90 border-rosa shadow-xs"
                        : "bg-white/85 border-rosa/15 hover:border-rosa/40"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        marcado
                          ? "bg-rosa border-rosa text-white"
                          : "bg-papel border-rosa/40 text-transparent"
                      }`}
                    >
                      <Icone nome="check" className="w-3.5 h-3.5" />
                    </span>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-papel text-rosa px-2.5 py-0.5 rounded-full border border-rosa/20">
                          Turno: {item.turno}
                        </span>
                        {marcado && (
                          <span className="text-[11px] font-extrabold text-rosa">
                            Concluído ✓
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-sm sm:text-base font-bold leading-snug ${
                          marcado ? "text-rosa line-through" : "text-black"
                        }`}
                      >
                        {item.tarefa}
                      </p>
                      <p className="text-xs text-black/75 font-medium mt-1 leading-relaxed">
                        {item.detalhe}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </AnimarScroll>
      </div>
    </div>
  );
}
