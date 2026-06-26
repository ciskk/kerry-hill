"use client";

import { useState } from "react";

export default function Genetica() {
  // Estado para controlar se mostramos o texto inicial ou o "Quiz" das ovelhas
  const [mostrarQuiz, setMostrarQuiz] = useState(false);

  return (
    // Fundo creme espalhado por todo o ecrã com margens negativas
    <div className="w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] -mt-8 md:-mt-12 -mb-8 md:-mb-12 bg-[#EAE7D6] text-[#D03C7A] overflow-x-hidden min-h-screen font-sans pb-24">
      
      {/* Estilos para a animação de Fade In suave ao trocar de estado */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>

      {/* Contêiner principal */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-24 md:pt-36">
        
        {/* =========================================
            PARTE SUPERIOR: Título Centralizado
            ========================================= */}
        <div className="flex flex-col items-center justify-center w-full z-20 mb-12 md:mb-16">
          <h2 className="text-[4.5rem] md:text-[7rem] font-bold text-[#D03C7A] leading-[0.8] tracking-tighter text-center">
            Melhoramento
          </h2>
          {/* Texto cursivo com o mesmo sombreado rígido das outras abas */}
          <span 
            className="text-[4.5rem] md:text-[6.5rem] font-serif text-[#E2C337] italic leading-[0.8] -mt-4 md:-mt-8 z-10 text-center"
            style={{ textShadow: "2px 2px 0px #D03C7A, -1px -1px 0px #D03C7A, 1px -1px 0px #D03C7A, -1px 1px 0px #D03C7A" }}
          >
            Genético
          </span>
        </div>

        {/* =========================================
            PARTE INFERIOR: As 3 Colunas (Cards e Botão)
            ========================================= */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 md:gap-8 w-full mt-8">
          
          {/* COLUNA ESQUERDA (Card 1) */}
          <div className="bg-[#E6D48A]/80 rounded-[2.5rem] p-8 md:p-10 w-full md:w-[35%] flex flex-col justify-center items-center shadow-sm min-h-[350px]">
            {!mostrarQuiz ? (
              // Estado 1: Texto explicativo
              <p className="text-[#D03C7A] text-lg md:text-[1.3rem] font-medium leading-relaxed text-center animate-fade-in tracking-tight">
                O melhoramento genético é o conjunto de técnicas utilizadas para selecionar e reproduzir os animais que possuem as melhores características, como maior produção de leite, boa fertilidade, resistência a doenças e adaptação ao clima da região.
              </p>
            ) : (
              // Estado 2: Ovelha da Esquerda (Pelo Ralo)
              <div className="flex flex-col w-full animate-fade-in">
                <div className="w-full h-[220px] md:h-[260px] rounded-[2rem] overflow-hidden mb-6 shadow-md border-2 border-transparent hover:border-[#D03C7A]/30 transition-all">
                  <img 
                    src="/assets/genetica-pelo-ralo.jpg" 
                    alt="Ovelha com pelo ralo" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <ul className="text-[#D03C7A] text-lg md:text-[1.2rem] font-semibold leading-snug space-y-3">
                  <li>• Produção de leite das filhas: alta</li>
                  <li>• Boa resistência a doenças</li>
                  <li>• Fertilidade alta</li>
                </ul>
              </div>
            )}
          </div>

          {/* COLUNA CENTRAL (Botão Interativo ou Texto do Quiz) */}
          <div className="w-full md:w-[30%] flex justify-center items-center py-6 md:py-0">
            {!mostrarQuiz ? (
              // Estado 1: Botão Clicável
              <div 
                onClick={() => setMostrarQuiz(true)}
                className="relative bg-[#EAE7D6] border-[5px] md:border-[6px] border-[#E2C337] rounded-[2rem] p-8 md:p-10 cursor-pointer hover:scale-105 hover:bg-white transition-all duration-300 shadow-md group w-[90%] md:w-full animate-fade-in"
              >
                <p className="text-[#D03C7A] text-[1.4rem] md:text-[1.6rem] font-bold text-center leading-snug tracking-tight">
                  Clique aqui para testar sua experiência de melhoramento genético!
                </p>

                {/* Ícone de Cursor SVG igualzinho à tua referência */}
                <div className="absolute -bottom-8 -right-6 md:-bottom-10 md:-right-8 w-12 h-12 md:w-16 md:h-16 z-30 group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-300">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 0L4 16L8 12L11.5 19L14 18L10.5 11L16 11L4 0Z" fill="white" stroke="black" strokeWidth="1.5" strokeLinejoin="miter"/>
                  </svg>
                </div>
              </div>
            ) : (
              // Estado 2: Título do Quiz ("qual o melhor reprodutor?")
              <div className="flex justify-center items-center animate-fade-in w-full">
                <h3 className="text-[3rem] md:text-[4rem] font-bold text-[#D03C7A] leading-[0.9] text-center tracking-tighter cursor-default hover:scale-105 transition-transform duration-500">
                  qual o<br/>melhor<br/>reprodutor?
                </h3>
              </div>
            )}
          </div>

          {/* COLUNA DIREITA (Card 2) */}
          <div className="bg-[#E6D48A]/80 rounded-[2.5rem] p-8 md:p-10 w-full md:w-[35%] flex flex-col justify-center items-center shadow-sm min-h-[350px]">
            {!mostrarQuiz ? (
              // Estado 1: Texto explicativo
              <p className="text-[#D03C7A] text-lg md:text-[1.3rem] font-medium leading-relaxed text-center animate-fade-in tracking-tight">
                Ao escolher cuidadosamente os reprodutores e as matrizes, os criadores aumentam as chances de que essas qualidades sejam transmitidas para as próximas gerações. Dessa forma, o rebanho se torna mais produtivo, saudável e eficiente ao longo do tempo, contribuindo para melhores resultados na criação de ovinos.
              </p>
            ) : (
              // Estado 2: Ovelha da Direita (Pelo Longo)
              <div className="flex flex-col w-full animate-fade-in">
                <div className="w-full h-[220px] md:h-[260px] rounded-[2rem] overflow-hidden mb-6 shadow-md border-2 border-transparent hover:border-[#D03C7A]/30 transition-all">
                  <img 
                    src="/assets/genetica-pelo-longo.jpg" 
                    alt="Ovelha com pelo longo" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <ul className="text-[#D03C7A] text-lg md:text-[1.2rem] font-semibold leading-snug space-y-3">
                  <li>• Bonito visualmente</li>
                  <li>• Produção de leite média</li>
                  <li>• Resistência média</li>
                </ul>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}