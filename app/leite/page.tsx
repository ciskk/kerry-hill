"use client";

import { Fragment, useState } from "react";
import AnimarScroll from "@/components/AnimarScroll";
import CardExpansivel from "@/components/CardExpansivel";
import Estrela from "@/components/Estrela";
import Icone from "@/components/Icone";
import TituloDuplo from "@/components/TituloDuplo";
import {
  cardsInformativosLeite,
  comparativoLeiteOvelhaVaca,
  dadosGarrafasLeite,
} from "@/data/conteudos";

export default function Leite() {
  // Estado para controlar qual dos três cards inferiores está aberto/expandido
  const [cardAberto, setCardAberto] = useState<number | null>(null);
  // Estado para controlar qual garrafa está selecionada (começa na primeira para mostrar o detalhe)
  const [garrafaAtiva, setGarrafaAtiva] = useState<number | null>(0);

  const alternarCard = (id: number) => {
    setCardAberto((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full text-rosa overflow-x-hidden min-h-screen font-sans pb-14 pt-10 md:pt-20">
      {/* Contêiner Principal */}
      <div className="max-w-[1300px] w-full mx-auto px-6 md:px-12 space-y-16 xl:space-y-24">
        {/* =========================================
            SEÇÃO SUPERIOR: Título, Espelho e Garrafas
            ========================================= */}
        <div className="flex flex-col xl:flex-row justify-between items-center xl:items-start gap-8 xl:gap-8 relative w-full">
          {/* BLOCO ESQUERDO (45%): Título + Espelho */}
          <AnimarScroll
            variante="esquerda"
            className="flex flex-col items-center xl:items-start relative w-full xl:w-[45%] z-20"
          >
            <TituloDuplo
              principal="Produção"
              subtitulo="de Leite"
              as="h1"
              className="relative z-30 flex flex-col pt-2 md:pt-4 text-center xl:text-left select-none"
              tituloClassName="text-[3.6rem] sm:text-[4.6rem] md:text-[5.5rem] lg:text-[6.2rem] font-black text-rosa leading-[0.85] tracking-tighter"
              subtituloClassName="text-[2.8rem] sm:text-[3.6rem] md:text-[4.4rem] lg:text-[5rem] font-serif text-amarelo italic leading-[0.85] ml-6 sm:ml-12 xl:ml-24 mt-1 md:mt-0 z-10"
            />

            {/* Espelho com Estrela Giratória de Fundo */}
            <div className="relative mt-6 md:mt-6 ml-0 xl:ml-12 flex justify-center xl:justify-start z-20 w-full max-w-[250px] md:max-w-[330px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[125%] h-[125%] md:w-[140%] md:h-[140%] z-0 pointer-events-none">
                <Estrela
                  alt="Estrela Decorativa"
                  filtroRosa
                  velocidadeGiro="lenta"
                  className="w-full h-full opacity-90"
                />
              </div>

              <img
                src="/assets/leite-espelho.png"
                alt="As meninas no espelho"
                className="w-full h-auto drop-shadow-2xl relative z-10 hover:-translate-y-2 transition-transform duration-500"
              />
            </div>
          </AnimarScroll>

          {/* BLOCO DIREITO (55%): Garrafas Interativas + Balão Explicativo */}
          <AnimarScroll
            variante="direita"
            atrasoMs={140}
            className="flex flex-col items-center xl:items-end w-full xl:w-[55%] z-10 mt-2 xl:mt-0"
          >
            <p className="inline-flex items-center gap-1.5 bg-papel px-3.5 py-1 rounded-full border border-rosa/20 text-rosa text-xs md:text-sm font-bold mb-2 select-none shadow-xs">
              <span>clique em cada garrafa para comparar os dados</span>
              <Icone nome="sparkles" className="w-4 h-4" />
            </p>

            <div className="flex flex-row justify-center xl:justify-end items-end gap-3 sm:gap-5 md:gap-8 w-full h-[300px] sm:h-[380px] md:h-[490px] lg:h-[530px]">
              {dadosGarrafasLeite.map((garrafa, idx) => {
                const selecionada = garrafaAtiva === idx;
                return (
                  <button
                    key={garrafa.percentual}
                    type="button"
                    onClick={() => setGarrafaAtiva(selecionada ? null : idx)}
                    aria-expanded={selecionada}
                    aria-label={`${garrafa.percentual} - ${garrafa.rotulo}`}
                    className={`relative group w-[108px] sm:w-[135px] md:w-[170px] lg:w-[195px] h-full cursor-pointer flex flex-col justify-end transition-transform duration-300 focus:outline-none ${
                      selecionada
                        ? "-translate-y-2 scale-[1.03]"
                        : "hover:-translate-y-1"
                    }`}
                  >
                    <img
                      src="/assets/leite-frasco.png"
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-contain object-bottom drop-shadow-lg z-0 pointer-events-none"
                    />

                    {/* Nível do "Leite" branco proporcional à porcentagem com acabamento de espuma */}
                    <div
                      className={`absolute bottom-[9%] left-[13%] right-[13%] sm:left-[14%] sm:right-[14%] bg-white/95 rounded-t-xl rounded-b-[1.2rem] md:rounded-b-[1.8rem] z-10 overflow-hidden shadow-inner flex flex-col items-center justify-center p-1 sm:p-2 text-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] border-2 ${
                        selecionada
                          ? `${garrafa.alturaAtiva} border-rosa ring-4 ring-rosa/20`
                          : `${garrafa.alturaBase} border-rosa/15 group-hover:border-rosa/50`
                      }`}
                    >
                      {/* Ondinha superior simulando a superfície do leite */}
                      <div
                        aria-hidden="true"
                        className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-rosa/10 via-amarelo-card/45 to-rosa/10"
                      />

                      <span className="text-[1.45rem] sm:text-[2.2rem] md:text-[3rem] font-black text-rosa leading-none">
                        {garrafa.percentual}
                      </span>
                      <span className="text-rosa text-[9.5px] sm:text-xs md:text-[13px] font-bold mt-0.5 sm:mt-1 leading-tight">
                        {garrafa.rotulo}
                      </span>
                      <span className="inline-flex items-center gap-0.5 text-[8.5px] sm:text-[10px] md:text-[11px] font-bold text-rosa/75 mt-0.5 sm:mt-1">
                        <Icone
                          nome={selecionada ? "chevron-up" : "chevron-down"}
                          className="w-3 h-3"
                        />
                        <span>{selecionada ? "aberto" : "ler"}</span>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Balão de Explicação Legível da Garrafa Selecionada */}
            {garrafaAtiva !== null && (
              <div
                role="region"
                aria-live="polite"
                className="mt-5 w-full max-w-[640px] bg-papel border-2 border-rosa rounded-2xl p-5 md:p-6 sombra-pop animate-pop-up text-left"
              >
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <div className="flex items-center gap-2">
                    <Estrela
                      ariaHidden
                      filtroRosa
                      velocidadeGiro="parada"
                      className="w-5 h-5"
                    />
                    <h2 className="text-base md:text-lg font-extrabold text-rosa">
                      {dadosGarrafasLeite[garrafaAtiva].titulo}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setGarrafaAtiva(null)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-rosa hover:underline px-2 py-0.5 rounded shrink-0"
                  >
                    <span>Fechar</span>
                    <Icone nome="x" className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-black/85 text-sm md:text-base leading-relaxed font-medium">
                  {dadosGarrafasLeite[garrafaAtiva].descricao}
                </p>
              </div>
            )}
          </AnimarScroll>
        </div>

        {/* =========================================
            NOVA SEÇÃO VISUAL: LEITE DE OVELHA VS. LEITE DE VACA
            ========================================= */}
        <AnimarScroll variante="escala">
          <div className="bg-papel/95 border-2 border-rosa/25 rounded-[2.5rem] p-6 sm:p-8 md:p-10 sombra-pop">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 text-center md:text-left">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-rosa text-white text-xs font-bold px-3.5 py-1 rounded-full mb-2">
                  <Icone nome="droplets" className="w-3.5 h-3.5" />
                  <span>Superioridade Nutricional & Queijeira</span>
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif text-amarelo italic texto-contorno-rosa leading-tight">
                  Leite de Ovelha vs. Leite de Vaca
                </h2>
                <p className="text-rosa text-xs sm:text-sm font-semibold mt-1">
                  Veja por que apenas 4,5 litros de leite ovino produzem 1 kg de
                  queijo artesanal:
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-extrabold">
                <span className="inline-flex items-center gap-1.5 text-rosa">
                  <span className="w-3.5 h-3.5 rounded-full bg-rosa inline-block" />
                  <span>Leite de Ovelha Kerry Hill</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-black/65">
                  <span className="w-3.5 h-3.5 rounded-full bg-amarelo-card border border-rosa/30 inline-block" />
                  <span>Leite Bovino</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {comparativoLeiteOvelhaVaca.map((item) => (
                <div
                  key={item.nutriente}
                  className="bg-creme/55 border border-rosa/20 rounded-2xl p-4 sm:p-5"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h3 className="text-base sm:text-lg font-extrabold text-black">
                      {item.nutriente}
                    </h3>
                    <span className="text-[11px] font-black text-rosa bg-papel px-2.5 py-0.5 rounded-full border border-rosa/20">
                      {item.vantagem}
                    </span>
                  </div>

                  {/* Barra Ovelha */}
                  <div className="mb-2.5">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-rosa font-extrabold">
                        Ovelha Kerry Hill
                      </span>
                      <span className="text-rosa font-black">
                        {item.ovelhaValor}
                      </span>
                    </div>
                    <div className="w-full h-3 bg-papel rounded-full overflow-hidden border border-rosa/20">
                      <div
                        className="h-full bg-rosa rounded-full"
                        style={{ width: `${item.ovelhaPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Barra Vaca */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-black/65">Vaca Comum</span>
                      <span className="text-black/75">{item.vacaValor}</span>
                    </div>
                    <div className="w-full h-2.5 bg-papel rounded-full overflow-hidden border border-rosa/15">
                      <div
                        className="h-full bg-amarelo-card rounded-full"
                        style={{ width: `${item.vacaPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimarScroll>

        {/* =========================================
            SEÇÃO INFERIOR: Cards Amarelos Interativos em Cascata
            ========================================= */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-stretch gap-6 md:gap-4 w-full relative z-30">
          {cardsInformativosLeite.map((card, index) => (
            <Fragment key={card.id}>
              {index > 0 && (
                <div className="hidden md:flex items-center justify-center w-12 shrink-0">
                  <Estrela filtroRosa className="w-8 h-8 md:w-10 md:h-10" />
                </div>
              )}

              <AnimarScroll
                variante="colagem"
                atrasoMs={index * 140}
                className="flex-1 w-full flex"
              >
                <CardExpansivel
                  titulo={
                    <>
                      {card.tituloLinha1} <br /> {card.tituloLinha2}
                    </>
                  }
                  resumo={
                    card.resumoItens ? (
                      <ul className="text-black/80 text-sm md:text-base leading-relaxed font-medium list-disc pl-5 space-y-1">
                        {card.resumoItens.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-black/80 text-sm md:text-base leading-relaxed font-medium">
                        {card.resumoTexto}
                      </p>
                    )
                  }
                  aberto={cardAberto === card.id}
                  onAlternar={() => alternarCard(card.id)}
                >
                  <p className="text-black text-sm md:text-base leading-relaxed font-semibold">
                    {card.detalhes}
                  </p>
                </CardExpansivel>
              </AnimarScroll>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
