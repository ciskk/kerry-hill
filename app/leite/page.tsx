"use client";

import { useEffect, useRef, useState } from "react";
import CardExpansivel from "@/components/CardExpansivel";
import Estrela from "@/components/Estrela";
import Icone from "@/components/Icone";
import TituloDuplo from "@/components/TituloDuplo";
import { dadosGarrafasLeite } from "@/data/conteudos";

export default function Leite() {
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const [cardsVisiveis, setCardsVisiveis] = useState(false);

  // Estado para controlar qual dos três cards inferiores está aberto/expandido
  const [cardAberto, setCardAberto] = useState<number | null>(null);
  // Estado para controlar qual garrafa está selecionada (começa na primeira para mostrar o detalhe)
  const [garrafaAtiva, setGarrafaAtiva] = useState<number | null>(0);

  // Função para alternar o card aberto (abre se fechado, fecha se aberto ou se outro for clicado)
  const alternarCard = (id: number) => {
    setCardAberto((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const currentCardsRef = cardsRef.current;
    // Observador para ativar a animação de opacidade dos cards ao entrar na tela
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisiveis(true);
        }
      },
      { threshold: 0.15 }
    );

    if (currentCardsRef) {
      observer.observe(currentCardsRef);
    }

    return () => {
      if (currentCardsRef) observer.unobserve(currentCardsRef);
    };
  }, []);

  return (
    <div className="w-full bg-creme text-rosa overflow-x-hidden min-h-screen font-sans pb-24 pt-10 md:pt-20">
      {/* Contêiner Principal - Limitando a largura para telas muito grandes e centralizando */}
      <div className="max-w-[1300px] w-full mx-auto px-6 md:px-12">
        {/* =========================================
            SEÇÃO SUPERIOR: Título, Espelho e Garrafas
            ========================================= */}
        <div className="flex flex-col xl:flex-row justify-between items-center xl:items-start gap-8 xl:gap-8 relative w-full">
          {/* BLOCO ESQUERDO (45%): Título + Espelho */}
          <div className="flex flex-col items-center xl:items-start relative w-full xl:w-[45%] z-20">
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
          </div>

          {/* BLOCO DIREITO (55%): Garrafas Interativas + Balão Explicativo */}
          <div className="flex flex-col items-center xl:items-end w-full xl:w-[55%] z-10 mt-2 xl:mt-0">
            <p className="inline-flex items-center gap-1.5 text-rosa text-xs md:text-sm font-bold mb-2 select-none">
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
                      selecionada ? "-translate-y-2 scale-[1.03]" : "hover:-translate-y-1"
                    }`}
                  >
                    <img
                      src="/assets/leite-frasco.png"
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-contain object-bottom drop-shadow-lg z-0 pointer-events-none"
                    />

                    {/* Nível do "Leite" branco proporcional à porcentagem */}
                    <div
                      className={`absolute bottom-[9%] left-[13%] right-[13%] sm:left-[14%] sm:right-[14%] bg-white/95 rounded-t-md rounded-b-[1.2rem] md:rounded-b-[1.8rem] z-10 overflow-hidden shadow-inner flex flex-col items-center justify-center p-1 sm:p-2 text-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] border-2 ${
                        selecionada
                          ? `${garrafa.alturaAtiva} border-rosa ring-4 ring-rosa/20`
                          : `${garrafa.alturaBase} border-transparent group-hover:border-rosa/40`
                      }`}
                    >
                      <h3 className="text-[1.45rem] sm:text-[2.2rem] md:text-[3rem] font-black text-rosa leading-none">
                        {garrafa.percentual}
                      </h3>
                      <p className="text-rosa text-[9.5px] sm:text-xs md:text-[13px] font-bold mt-0.5 sm:mt-1 leading-tight">
                        {garrafa.rotulo}
                      </p>
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
                className="mt-5 w-full max-w-[640px] bg-papel border-2 border-rosa rounded-2xl p-5 md:p-6 shadow-md animate-pop-up text-left"
              >
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <div className="flex items-center gap-2">
                    <Estrela
                      ariaHidden
                      filtroRosa
                      velocidadeGiro="parada"
                      className="w-5 h-5"
                    />
                    <h4 className="text-base md:text-lg font-extrabold text-rosa">
                      {dadosGarrafasLeite[garrafaAtiva].titulo}
                    </h4>
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
          </div>
        </div>

        {/* =========================================
            SEÇÃO INFERIOR: Cards Amarelos Interativos
            ========================================= */}
        <div
          ref={cardsRef}
          className={`flex flex-col md:flex-row justify-between items-start md:items-stretch gap-6 md:gap-4 w-full mt-16 xl:mt-24 transition-opacity duration-1000 ease-in-out relative z-30 ${
            cardsVisiveis ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Card 1 */}
          <CardExpansivel
            titulo={
              <>
                Períodos Críticos <br /> da Lactação
              </>
            }
            resumo={
              <p className="text-black/80 text-sm md:text-base leading-relaxed font-medium">
                O que fazer nas fases em que a ovelha precisa de mais nutrientes.
              </p>
            }
            aberto={cardAberto === 1}
            onAlternar={() => alternarCard(1)}
          >
            <p className="text-black text-sm md:text-base leading-relaxed font-semibold">
              O terço inicial da lactação (primeiras 6 semanas) é a fase de pico de produção de leite. Como as ovelhas consomem menos energia do que gastam nesse período, é indispensável fornecer volumoso de altíssima qualidade e suplementar com ração concentrada para evitar a perda de peso excessiva e distúrbios como a cetose.
            </p>
          </CardExpansivel>

          {/* Estrela Separadora 1 */}
          <div className="hidden md:flex items-center justify-center w-12 shrink-0">
            <Estrela filtroRosa className="w-8 h-8 md:w-10 md:h-10" />
          </div>

          {/* Card 2 */}
          <CardExpansivel
            titulo={
              <>
                Indicadores que o <br /> Criador Deve Acompanhar
              </>
            }
            resumo={
              <ul className="text-black/80 text-sm md:text-base leading-relaxed font-medium list-disc pl-5 space-y-1">
                <li>Produção diária</li>
                <li>Consumo de água</li>
                <li>Condição corporal</li>
                <li>Saúde da glândula mamária</li>
              </ul>
            }
            aberto={cardAberto === 2}
            onAlternar={() => alternarCard(2)}
          >
            <p className="text-black text-sm md:text-base leading-relaxed font-semibold">
              Anote as variações diárias! Quedas repentinas de leite indicam problemas de saúde. Lembre-se que ovelhas lactantes podem beber mais de 10 litros de água por dia. Além disso, faça exames visuais regulares no úbere para identificar mastite subclínica precocemente.
            </p>
          </CardExpansivel>

          {/* Estrela Separadora 2 */}
          <div className="hidden md:flex items-center justify-center w-12 shrink-0">
            <Estrela filtroRosa className="w-8 h-8 md:w-10 md:h-10" />
          </div>

          {/* Card 3 */}
          <CardExpansivel
            titulo={
              <>
                Impacto do Calor <br /> na Produção
              </>
            }
            resumo={
              <p className="text-black/80 text-sm md:text-base leading-relaxed font-medium">
                Especialmente importante para o Nordeste. Dicas para amenizar o estresse térmico.
              </p>
            }
            aberto={cardAberto === 3}
            onAlternar={() => alternarCard(3)}
          >
            <p className="text-black text-sm md:text-base leading-relaxed font-semibold">
              O estresse por calor diminui o apetite da ovelha e pode derrubar a produção de leite em até 30%. No Nordeste brasileiro, mantenha bebedouros sempre à sombra, adicione árvores nos pastos para sombra natural e evite movimentar o rebanho nas horas mais quentes do dia.
            </p>
          </CardExpansivel>
        </div>
      </div>
    </div>
  );
}
