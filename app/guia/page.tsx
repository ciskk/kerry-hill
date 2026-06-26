"use client";

export default function Guia() {
  return (
    // Recolocadas as margens negativas (-mt e -mb) para cobrir as faixas negras do layout pai
    <div className="w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] -mt-8 md:-mt-12 -mb-8 md:-mb-12 bg-[#EAE7D6] text-[#C24984] overflow-x-hidden min-h-screen font-sans">
      
      {/* Contêiner principal com largura máxima para manter as proporções, padding aumentado para compensar a margem negativa */}
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
            {/* Texto cursivo com sombra dura simulando contorno */}
            <span 
              className="text-[4.5rem] md:text-[6rem] font-serif text-[#E2C337] italic leading-[0.8] ml-0 md:ml-12 mt-2 md:mt-0"
              style={{ textShadow: "2px 2px 0px #D03C7A, -1px -1px 0px #D03C7A, 1px -1px 0px #D03C7A, -1px 1px 0px #D03C7A" }}
            >
              do Criador
            </span>
            <p className="text-[#D03C7A] font-medium text-lg md:text-xl mt-6 md:mt-4 ml-0 md:ml-20 hover:scale-105 transition-transform origin-left cursor-pointer">
              clique para descobrir!
            </p>
          </div>

          {/* BLOCO 2: Cher com a caneta (Centro) - Ajustado com margens negativas para sobreposição */}
          <div className="relative w-full md:w-[30%] flex justify-center items-center z-10 mt-12 md:mt-[-2rem] md:-ml-8 md:-mr-8">
            {/* Estrela de fundo com animação de giro contínuo configurada via Tailwind arbitrário */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] z-0">
              <img 
                src="/assets/star.png" 
                alt="Estrela de fundo" 
                className="object-contain w-full h-full animate-[spin_15s_linear_infinite]"
              />
            </div>
            
            {/* Foto da Cher */}
            <div className="relative z-10 hover:scale-105 transition-transform duration-500">
              <img
                src="/assets/guia-cher-pompom.png"
                alt="Cher com caneta de pompom"
                className="w-[220px] md:w-[280px] h-auto drop-shadow-xl"
              />
            </div>
          </div>

          {/* BLOCO 3: Balões de Fala (Direita) */}
          <div className="w-full md:w-[35%] flex flex-col items-center md:items-end gap-5 z-20 mt-12 md:mt-4">
            
            {/* Balão 1 */}
            <div className="relative bg-[#F4F5EB] border border-black px-6 py-5 shadow-sm cursor-pointer hover:bg-white transition-all w-[90%] md:w-[320px]">
              <div className="absolute -left-[9px] top-1/2 -translate-y-1/2 w-4 h-4 bg-[#F4F5EB] border-l border-b border-black rotate-45"></div>
              <p className="text-black text-[1.1rem] leading-snug tracking-tight">
                Cuidados com cordeiros recém nascidos.
              </p>
            </div>

            {/* Balão 2 (Com o Cursor) */}
            <div className="relative bg-[#F4F5EB] border border-black px-6 py-5 shadow-sm cursor-pointer hover:bg-white transition-all w-[90%] md:w-[320px]">
              <div className="absolute -left-[9px] top-1/2 -translate-y-1/2 w-4 h-4 bg-[#F4F5EB] border-l border-b border-black rotate-45"></div>
              <p className="text-black text-[1.1rem] leading-snug tracking-tight">
                Como escolher um bom reprodutor?
              </p>
              
              {/* Ícone de Cursor Pixelado inserido com SVG para ficar igual à referência */}
              <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 w-10 h-10 md:w-12 md:h-12 z-30 pointer-events-none">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 0L4 16L8 12L11.5 19L14 18L10.5 11L16 11L4 0Z" fill="white" stroke="black" strokeWidth="1.5" strokeLinejoin="miter"/>
                </svg>
              </div>
            </div>

            {/* Balão 3 */}
            <div className="relative bg-[#F4F5EB] border border-black px-6 py-5 shadow-sm cursor-pointer hover:bg-white transition-all w-[90%] md:w-[320px]">
              <div className="absolute -left-[9px] top-1/2 -translate-y-1/2 w-4 h-4 bg-[#F4F5EB] border-l border-b border-black rotate-45"></div>
              <p className="text-black text-[1.1rem] leading-snug tracking-tight">
                Como identificar uma matriz produtiva?
              </p>
            </div>

          </div>

        </div>

        {/* =========================================
            PARTE INFERIOR: Fotos e Legendas
            ========================================= */}
        {/* Posicionado mais à esquerda, alinhado abaixo do título "O Guia" */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-14 w-full mt-16 md:mt-4 md:pl-8 justify-center md:justify-start relative z-30">
          
          {/* Card Foto 1 - Vacinação */}
          <div className="flex flex-col items-center gap-3 group cursor-pointer">
            <div className="w-[200px] h-[200px] md:w-[220px] md:h-[220px] rounded-[2rem] overflow-hidden group-hover:-translate-y-2 transition-transform duration-300">
              <img
                src="/assets/guia-vacina.jpg"
                alt="Guia de Vacinação"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-[#D03C7A] text-[1.35rem] font-medium tracking-tight">
              Guia de Vacinação
            </h4>
          </div>

          {/* Card Foto 2 - Lactação */}
          <div className="flex flex-col items-center gap-3 group cursor-pointer">
            <div className="w-[200px] h-[200px] md:w-[220px] md:h-[220px] rounded-[2rem] overflow-hidden group-hover:-translate-y-2 transition-transform duration-300">
              <img
                src="/assets/guia-amamentacao.jpg"
                alt="Cuidados na Lactação"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-[#D03C7A] text-[1.35rem] font-medium tracking-tight">
              Cuidados na Lactação
            </h4>
          </div>

        </div>

      </div>
    </div>
  );
}