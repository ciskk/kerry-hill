"use client";

import { useState } from "react";

export default function Guia() {
  // Estado para controlar qual balão de pergunta está expandido (Accordion da Fase 5)
  const [balaoAberto, setBalaoAberto] = useState<number | null>(null);

  const perguntasGuia = [
    {
      pergunta: "Cuidados com cordeiros recém nascidos.",
      resposta: "Garanta a mamada do colostro na primeira hora de vida para imunidade, desinfete o cordão umbilical com iodo a 10% e certifique-se de que o abrigo está limpo, seco e protegido de ventos frios."
    },
    {
      pergunta: "Como escolher um bom reprodutor?",
      resposta: "Busque animais ativos com excelente conformação corporal, histórico genético comprovado de ganho de peso das gerações passadas, aprumos fortes e dentes sem problemas de mastigação."
    },
    {
      pergunta: "Como identificar uma matriz produtiva?",
      resposta: "Verifique o histórico de partos fáceis e duplos, a conformação ideal do úbere (com duas tetas funcionais e flexíveis) e a boa produção de leite para amamentar os filhotes."
    }
  ];

  const handleToggleBalao = (index: number) => {
    setBalaoAberto(balaoAberto === index ? null : index);
  };

  return (
    <div className="w-full bg-[#EAE7D6] text-[#C24984] overflow-x-hidden min-h-screen font-sans">
      
      <div className="max-w-[1100px] mx-auto px-4 md:px-8 pt-20 md:pt-32 pb-28">
        
        {/* =========================================
            PARTE SUPERIOR: Título, Cher e Balões
            ========================================= */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between relative">
          
          {/* BLOCO 1: Títulos (Esquerda) */}
          <div className="flex flex-col relative z-20 w-full md:w-[35%] text-center md:text-left mt-4 md:mt-8">
            <h2 className="text-[6rem] md:text-[7.5rem] font-bold text-[#D03C7A] leading-[0.8] tracking-tighter">
              O Guia
            </h2>
            <span 
              className="text-[4.5rem] md:text-[6rem] font-serif text-[#E2C337] italic leading-[0.8] ml-0 md:ml-12 mt-2 md:mt-0 select-none"
              style={{ textShadow: "2px 2px 0px #D03C7A, -1px -1px 0px #D03C7A, 1px -1px 0px #D03C7A, -1px 1px 0px #D03C7A" }}
            >
              do Criador
            </span>
            <p className="text-[#D03C7A] font-medium text-lg md:text-xl mt-6 md:mt-4 ml-0 md:ml-20 hover:scale-105 transition-all origin-left cursor-pointer select-none">
              clique nos balões ao lado para descobrir!
            </p>
          </div>

          {/* BLOCO 2: Cher com a caneta (Centro) */}
          <div className="relative w-full md:w-[30%] flex justify-center items-center z-10 mt-12 md:mt-[-2rem] md:-ml-8 md:-mr-8">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] z-0">
              <img 
                src="/assets/star.png" 
                alt="Estrela de fundo" 
                className="object-contain w-full h-full animate-[spin_30s_linear_infinite] opacity-70"
              />
            </div>
            
            <div className="relative z-10 hover:scale-105 transition-transform duration-500">
              <img
                src="/assets/guia-cher-pompom.png"
                alt="Cher com caneta de pompom"
                className="w-[220px] md:w-[280px] h-auto drop-shadow-xl"
              />
            </div>
          </div>

          {/* BLOCO 3: Balões de Fala com Acordeão Interativo (Fase 5) */}
          <div className="w-full md:w-[35%] flex flex-col items-center md:items-end gap-5 z-20 mt-12 md:mt-4">
            
            {perguntasGuia.map((item, index) => {
              const isOpen = balaoAberto === index;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleToggleBalao(index)}
                  className={`relative text-left bg-[#F4F5EB] border border-black px-6 py-5 shadow-sm hover:bg-white active:scale-[0.99] transition-all w-[90%] md:w-[320px] focus:outline-none focus:ring-2 focus:ring-[#D03C7A] rounded-md
                    ${isOpen ? "border-[#D03C7A] bg-white ring-2 ring-[#D03C7A]/20" : ""}`}
                >
                  {/* Seta indicativa no canto do balão */}
                  <div className={`absolute -left-[9px] top-7 w-4 h-4 bg-[#F4F5EB] border-l border-b border-black rotate-45 transition-colors
                    ${isOpen ? "border-[#D03C7A] bg-white" : ""}`}></div>
                  
                  <div className="flex justify-between items-center w-full gap-2">
                    <p className={`font-bold text-[1.1rem] leading-snug tracking-tight transition-colors ${isOpen ? "text-[#D03C7A]" : "text-black"}`}>
                      {item.pergunta}
                    </p>
                    <span className="text-[#D03C7A] font-bold shrink-0">{isOpen ? "▲" : "▼"}</span>
                  </div>

                  {/* Conteúdo Expansível com Transição de Altura */}
                  <div className={`overflow-hidden transition-all duration-300 mt-2
                    ${isOpen ? "max-h-[140px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="text-black/80 text-sm mt-2 border-t border-[#D03C7A]/10 pt-2 leading-relaxed">
                      {item.resposta}
                    </p>
                  </div>
                  
                  {/* Adicionando cursor visual apenas no segundo balão para manter compatibilidade com a referência */}
                  {index === 1 && (
                    <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 w-10 h-10 md:w-12 h-12 z-30 pointer-events-none animate-pulse">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 0L4 16L8 12L11.5 19L14 18L10.5 11L16 11L4 0Z" fill="white" stroke="black" strokeWidth="1.5" strokeLinejoin="miter"/>
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}

          </div>

        </div>

        {/* =========================================
            PARTE INFERIOR: Fotos e Legendas
            ========================================= */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-14 w-full mt-16 md:mt-4 md:pl-8 justify-center md:justify-start relative z-30">
          
          {/* Card Foto 1 - Vacinação */}
          <div className="flex flex-col items-center gap-3 group cursor-pointer">
            <div className="w-[200px] h-[200px] md:w-[220px] md:h-[220px] rounded-[2rem] overflow-hidden group-hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-md">
              <img
                src="/assets/guia-vacina.jpg"
                alt="Guia de Vacinação"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-[#D03C7A] text-[1.35rem] font-medium tracking-tight group-hover:text-[#b03065] transition-colors">
              Guia de Vacinação
            </h4>
          </div>

          {/* Card Foto 2 - Lactação */}
          <div className="flex flex-col items-center gap-3 group cursor-pointer">
            <div className="w-[200px] h-[200px] md:w-[220px] md:h-[220px] rounded-[2rem] overflow-hidden group-hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-md">
              <img
                src="/assets/guia-amamentacao.jpg"
                alt="Cuidados na Lactação"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-[#D03C7A] text-[1.35rem] font-medium tracking-tight group-hover:text-[#b03065] transition-colors">
              Cuidados na Lactação
            </h4>
          </div>

        </div>

      </div>
    </div>
  );
}