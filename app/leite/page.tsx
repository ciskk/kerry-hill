"use client";

import { useEffect, useRef, useState } from "react";

export default function Leite() {
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const [cardsVisiveis, setCardsVisiveis] = useState(false);
  
  // Estado para controlar qual dos três cards inferiores está aberto/expandido
  const [cardAberto, setCardAberto] = useState<number | null>(null);

  useEffect(() => {
    // Observador para ativar a animação de opacidade dos cards ao entrar na tela
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisiveis(true);
        }
      },
      { threshold: 0.15 }
    );

    if (cardsRef.current) {
      observer.observe(cardsRef.current);
    }

    return () => {
      if (cardsRef.current) observer.unobserve(cardsRef.current);
    };
  }, []);

  return (
    <div className="w-full bg-[#EAE7D6] text-[#D03C7A] overflow-x-hidden min-h-screen font-sans pb-32 pt-24 md:pt-36">
      
      {/* Contêiner Principal - Limitando a largura para telas muito grandes e centralizando */}
      <div className="max-w-[1300px] w-full mx-auto px-6 md:px-12">
        
        {/* =========================================
            SECÇÃO SUPERIOR: Título, Espelho e Garrafas
            ========================================= */}
        <div className="flex flex-col xl:flex-row justify-between items-start gap-12 xl:gap-8 relative w-full">
          
          {/* BLOCO ESQUERDO (45%): Título + Espelho */}
          <div className="flex flex-col relative w-full xl:w-[45%] z-20">
            
            {/* Título (Tamanhos reajustados para ficarem mais proporcionais) */}
            <div className="relative z-30 flex flex-col pt-4 md:pt-8">
              <h2 className="text-[3.8rem] md:text-[5.2rem] lg:text-[6rem] font-black text-[#D03C7A] leading-[0.8] tracking-tighter">
                Produção
              </h2>
              <span 
                className="absolute top-[65%] md:top-[70%] left-[25%] md:left-[35%] text-[2.8rem] md:text-[4rem] lg:text-[5rem] font-serif text-[#E2C337] italic leading-none z-10"
                style={{ textShadow: "2px 2px 0px #D03C7A, -2px -2px 0px #D03C7A, 2px -2px 0px #D03C7A, -2px 2px 0px #D03C7A" }}
              >
                de Leite
              </span>
            </div>

            {/* Espelho (Tamanho reduzido e margens reorganizadas) */}
            <div className="relative mt-12 md:mt-8 ml-0 md:ml-12 flex justify-center md:justify-start z-20 w-full max-w-[260px] md:max-w-[340px]">
              {/* Estrela de Fundo */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] z-0 pointer-events-none">
                <img 
                  src="/assets/star.png" 
                  alt="Estrela Decorativa" 
                  className="object-contain w-full h-full opacity-90 animate-[spin_30s_linear_infinite]"
                  style={{ filter: "brightness(0) saturate(100%) invert(32%) sepia(87%) saturate(1900%) hue-rotate(314deg) brightness(91%) contrast(98%)" }}
                />
              </div>
              
              <img
                src="/assets/leite-espelho.png"
                alt="As meninas no espelho"
                className="w-full h-auto drop-shadow-2xl relative z-10 hover:-translate-y-2 transition-transform duration-500"
              />
            </div>
          </div>

          {/* BLOCO DIREITO (55%): Garrafas */}
          <div className="flex flex-row justify-center xl:justify-end items-end gap-4 md:gap-8 w-full xl:w-[55%] z-10 h-[450px] md:h-[600px] mt-12 xl:mt-0">
            
            {/* GARRAFA 1: Interativa (45%) */}
            <div className="relative group w-[110px] md:w-[170px] lg:w-[200px] h-full cursor-pointer flex flex-col justify-end">
              <img 
                src="/assets/leite-frasco.png" 
                alt="Garrafa de Leite" 
                className="absolute inset-0 w-full h-full object-contain object-bottom drop-shadow-lg z-0 pointer-events-none"
              />
              
              {/* Rótulo Branco Animado (O "Leite" contido no frasco) */}
              <div className="absolute bottom-[9%] left-[14%] right-[14%] bg-white/95 rounded-t-sm rounded-b-[1.2rem] md:rounded-b-[1.8rem] z-10 overflow-hidden shadow-inner flex items-center justify-center
                              h-[22%] group-hover:h-[48%] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                
                {/* Estado 1: Fechado (Some no hover) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 transition-all duration-300 opacity-100 group-hover:opacity-0 group-hover:scale-90 text-center">
                  <h3 className="text-[2rem] md:text-[3.2rem] font-black text-[#D03C7A] leading-none">45%</h3>
                  <p className="text-[#D03C7A] text-[8px] md:text-[10px] font-bold mt-1 leading-tight">
                    Crescimento da <br className="hidden md:block"/>produção
                  </p>
                </div>

                {/* Estado 2: Aberto (Aparece no hover) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 md:p-4 transition-all duration-300 opacity-0 scale-110 group-hover:opacity-100 group-hover:scale-100 text-center">
                  <img src="/assets/star.png" alt="Estrela" className="w-4 h-4 md:w-6 md:h-6 mb-1 md:mb-2 animate-pulse" 
                       style={{ filter: "brightness(0) saturate(100%) invert(32%) sepia(87%) saturate(1900%) hue-rotate(314deg) brightness(91%) contrast(98%)" }}/>
                  <p className="text-[#D03C7A] text-[7px] md:text-[9.5px] font-semibold leading-snug">
                    Nos últimos anos, a produção de leite de ovelha no Brasil apresentou um crescimento de aproximadamente 45%, impulsionado pelo aumento do interesse dos consumidores por produtos diferenciados e de maior valor agregado, como queijos artesanais, iogurtes e outros derivados.
                  </p>
                </div>
              </div>
            </div>

            {/* GARRAFA 2: Estática (70%) */}
            <div className="relative w-[110px] md:w-[170px] lg:w-[200px] h-[95%] xl:h-full flex flex-col justify-end">
              <img 
                src="/assets/leite-frasco.png" 
                alt="Garrafa de Leite" 
                className="absolute inset-0 w-full h-full object-contain object-bottom drop-shadow-lg z-0 pointer-events-none"
              />
              <div className="absolute bottom-[9%] left-[14%] right-[14%] bg-white/95 rounded-t-sm rounded-b-[1.2rem] md:rounded-b-[1.8rem] z-10 h-[22%] flex flex-col items-center justify-center p-2 text-center shadow-inner">
                <h3 className="text-[2rem] md:text-[3.2rem] font-black text-[#D03C7A] leading-none">70%</h3>
                <p className="text-[#D03C7A] text-[8px] md:text-[10px] font-bold mt-1 md:mt-2 leading-tight">
                  Do leite ovino no Brasil é processado na própria propriedade.
                </p>
              </div>
            </div>

            {/* GARRAFA 3: Estática (13%) */}
            <div className="relative w-[110px] md:w-[170px] lg:w-[200px] h-[90%] xl:h-full flex flex-col justify-end">
              <img 
                src="/assets/leite-frasco.png" 
                alt="Garrafa de Leite" 
                className="absolute inset-0 w-full h-full object-contain object-bottom drop-shadow-lg z-0 pointer-events-none"
              />
              <div className="absolute bottom-[9%] left-[14%] right-[14%] bg-white/95 rounded-t-sm rounded-b-[1.2rem] md:rounded-b-[1.8rem] z-10 h-[22%] flex flex-col items-center justify-center p-2 text-center shadow-inner">
                <h3 className="text-[2rem] md:text-[3.2rem] font-black text-[#D03C7A] leading-none">13%</h3>
                <p className="text-[#D03C7A] text-[8px] md:text-[10px] font-bold mt-1 md:mt-2 leading-tight">
                  Teor médio de sólidos no leite de ovelha.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* =========================================
            SECÇÃO INFERIOR: Cards Amarelos Interativos
            ========================================= */}
        <div 
          ref={cardsRef}
          className={`flex flex-col md:flex-row justify-between items-start md:items-stretch gap-6 md:gap-4 w-full mt-24 xl:mt-32 transition-opacity duration-1000 ease-in-out relative z-30
            ${cardsVisiveis ? 'opacity-100' : 'opacity-0'}`}
        >
          
          {/* Card 1 */}
          <div 
            onClick={() => setCardAberto(cardAberto === 1 ? null : 1)}
            className={`bg-[#E2C337] rounded-[2.5rem] p-8 md:p-10 pb-12 flex-1 w-full relative hover:-translate-y-2 transition-all duration-300 cursor-pointer select-none border-[3px]
              ${cardAberto === 1 ? 'border-[#D03C7A]' : 'border-transparent'}`}
          >
            <h4 className="text-[1.4rem] md:text-[1.8rem] font-bold text-black mb-4 leading-[1.1] tracking-tight">
              Períodos Críticos <br/> da Lactação
            </h4>
            <p className="text-black/80 text-sm md:text-base leading-relaxed font-medium">
              O que fazer nas fases em que a ovelha precisa de mais nutrientes.
            </p>
            
            {/* Informações detalhadas exibidas ao clicar */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${cardAberto === 1 ? 'max-h-[300px] opacity-100 mt-4 pt-4 border-t border-black/10' : 'max-h-0 opacity-0'}`}>
              <p className="text-black text-sm md:text-base leading-relaxed font-semibold">
                O terço inicial da lactação (primeiras 6 semanas) é a fase de pico de produção de leite. Como as ovelhas consomem menos energia do que gastam nesse período, é indispensável fornecer volumoso de altíssima qualidade e suplementar com ração concentrada para evitar a perda de peso excessiva e distúrbios como a cetose.
              </p>
            </div>
            
            <span className="absolute bottom-3 right-6 text-[10px] md:text-xs font-bold text-black/50">
              {cardAberto === 1 ? "Clique para fechar ▲" : "Clique para ler mais ▼"}
            </span>
          </div>

          {/* Estrela Separadora 1 */}
          <div className="hidden md:flex items-center justify-center w-12 shrink-0">
            <img src="/assets/star.png" alt="Estrela" className="w-8 h-8 md:w-10 md:h-10 animate-[spin_10s_linear_infinite]" 
                 style={{ filter: "brightness(0) saturate(100%) invert(32%) sepia(87%) saturate(1900%) hue-rotate(314deg) brightness(91%) contrast(98%)" }}/>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => setCardAberto(cardAberto === 2 ? null : 2)}
            className={`bg-[#E2C337] rounded-[2.5rem] p-8 md:p-10 pb-12 flex-1 w-full relative hover:-translate-y-2 transition-all duration-300 cursor-pointer select-none border-[3px]
              ${cardAberto === 2 ? 'border-[#D03C7A]' : 'border-transparent'}`}
          >
            <h4 className="text-[1.4rem] md:text-[1.8rem] font-bold text-black mb-4 leading-[1.1] tracking-tight">
              Indicadores que o <br/> Criador Deve Acompanhar
            </h4>
            <ul className="text-black/80 text-sm md:text-base leading-relaxed font-medium list-disc pl-5 space-y-1">
              <li>Produção diária</li>
              <li>Consumo de água</li>
              <li>Condição corporal</li>
              <li>Saúde da glândula mamária</li>
            </ul>

            {/* Informações detalhadas exibidas ao clicar */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${cardAberto === 2 ? 'max-h-[300px] opacity-100 mt-4 pt-4 border-t border-black/10' : 'max-h-0 opacity-0'}`}>
              <p className="text-black text-sm md:text-base leading-relaxed font-semibold">
                Anote as variações diárias! Quedas repentinas de leite indicam problemas de saúde. Lembre-se que ovelhas lactantes podem beber mais de 10 litros de água por dia. Além disso, faça exames visuais regulares no úbere para identificar mastite subclínica precocemente.
              </p>
            </div>

            <span className="absolute bottom-3 right-6 text-[10px] md:text-xs font-bold text-black/50">
              {cardAberto === 2 ? "Clique para fechar ▲" : "Clique para ler mais ▼"}
            </span>
          </div>

          {/* Estrela Separadora 2 */}
          <div className="hidden md:flex items-center justify-center w-12 shrink-0">
            <img src="/assets/star.png" alt="Estrela" className="w-8 h-8 md:w-10 md:h-10 animate-[spin_10s_linear_infinite]"
                 style={{ filter: "brightness(0) saturate(100%) invert(32%) sepia(87%) saturate(1900%) hue-rotate(314deg) brightness(91%) contrast(98%)" }} />
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => setCardAberto(cardAberto === 3 ? null : 3)}
            className={`bg-[#E2C337] rounded-[2.5rem] p-8 md:p-10 pb-12 flex-1 w-full relative hover:-translate-y-2 transition-all duration-300 cursor-pointer select-none border-[3px]
              ${cardAberto === 3 ? 'border-[#D03C7A]' : 'border-transparent'}`}
          >
            <h4 className="text-[1.4rem] md:text-[1.8rem] font-bold text-black mb-4 leading-[1.1] tracking-tight">
              Impacto do Calor <br/> na Produção
            </h4>
            <p className="text-black/80 text-sm md:text-base leading-relaxed font-medium">
              Especialmente importante para o Nordeste. Dicas para amenizar o estresse térmico.
            </p>

            {/* Informações detalhadas exibidas ao clicar */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${cardAberto === 3 ? 'max-h-[300px] opacity-100 mt-4 pt-4 border-t border-black/10' : 'max-h-0 opacity-0'}`}>
              <p className="text-black text-sm md:text-base leading-relaxed font-semibold">
                O estresse por calor diminui o apetite da ovelha e pode derrubar a produção de leite em até 30%. No Nordeste brasileiro, mantenha bebedouros sempre à sombra, adicione árvores nos pastos para sombra natural e evite movimentar o rebanho nas horas mais quentes do dia.
              </p>
            </div>

            <span className="absolute bottom-3 right-6 text-[10px] md:text-xs font-bold text-black/50">
              {cardAberto === 3 ? "Clique para fechar ▲" : "Clique para ler mais ▼"}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}