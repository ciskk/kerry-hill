"use client";

import { useState, useEffect, useRef } from "react";

// Definição das partículas para o efeito de confete em Canvas
interface Particula {
  x: number;
  y: number;
  tamanho: number;
  cor: string;
  velocidadeX: number;
  velocidadeY: number;
  rotacao: number;
  velocidadeRotacao: number;
}

export default function Genetica() {
  const [mostrarQuiz, setMostrarQuiz] = useState(false);
  const [transitando, setTransitando] = useState(false);
  
  // Estados do Quiz
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<"esquerda" | "direita" | null>(null);
  const [resultado, setResultado] = useState<"correto" | "incorreto" | null>(null);

  // Referência do Canvas para os confetes
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animacaoRef = useRef<number | null>(null);

  // Efeito de transição suave entre a introdução e o quiz
  const handleToggleQuiz = () => {
    setTransitando(true);
    setTimeout(() => {
      setMostrarQuiz(prev => !prev);
      setOpcaoSelecionada(null);
      setResultado(null);
      setTransitando(false);
    }, 350);
  };

  // Função que lida com a resposta do usuário
  const handleEscolha = (opcao: "esquerda" | "direita") => {
    setOpcaoSelecionada(opcao);
    if (opcao === "esquerda") {
      setResultado("correto");
    } else {
      setResultado("incorreto");
    }
  };

  // Sistema de partículas de confete de alta performance (60 FPS)
  useEffect(() => {
    if (resultado === "correto" && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Ajusta o tamanho do canvas para o tamanho da tela
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const cores = ["#D03C7A", "#E2C337", "#FFFFFF", "#F1F3E9", "#FF85B3"];
      const particulas: Particula[] = [];

      // Gera 150 confetes coloridos
      for (let i = 0; i < 150; i++) {
        particulas.push({
          x: Math.random() * canvas.width,
          y: Math.random() * -canvas.height - 20,
          tamanho: Math.random() * 8 + 6,
          cor: cores[Math.floor(Math.random() * cores.length)],
          velocidadeX: Math.random() * 4 - 2,
          velocidadeY: Math.random() * 5 + 4,
          rotacao: Math.random() * 360,
          velocidadeRotacao: Math.random() * 10 - 5
        });
      }

      const animar = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let particulasAtivas = false;

        particulas.forEach((p) => {
          p.y += p.velocidadeY;
          p.x += p.velocidadeX;
          p.rotacao += p.velocidadeRotacao;

          // Desenha o confete rotacionado
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotacao * Math.PI) / 180);
          ctx.fillStyle = p.cor;
          ctx.fillRect(-p.tamanho / 2, -p.tamanho / 2, p.tamanho, p.tamanho);
          ctx.restore();

          if (p.y < canvas.height) {
            particulasAtivas = true;
          }
        });

        if (particulasAtivas) {
          animacaoRef.current = requestAnimationFrame(animar);
        }
      };

      animar();

      // Ajusta tamanho caso mude a janela
      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (animacaoRef.current) cancelAnimationFrame(animacaoRef.current);
      };
    }
  }, [resultado]);

  return (
    <div className="w-full bg-[#EAE7D6] text-[#D03C7A] overflow-x-hidden min-h-screen font-sans pb-24 relative">
      
      {/* Canvas para a Chuva de Confetes */}
      {resultado === "correto" && (
        <canvas 
          ref={canvasRef} 
          className="fixed inset-0 w-full h-full pointer-events-none z-50"
        />
      )}

      {/* Estilos CSS Nativos adicionais */}
      <style>{`
        @keyframes popUp {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-up {
          animation: popUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.15) forwards;
        }
      `}</style>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-24 md:pt-36">
        
        {/* =========================================
            PARTE SUPERIOR: Título da Seção
            ========================================= */}
        <div className="flex flex-col items-center justify-center w-full z-20 mb-12 md:mb-16 select-none animate-[fadeIn_0.6s_ease-out_forwards]">
          <h1 className="text-[4.5rem] md:text-[7rem] font-bold text-[#D03C7A] leading-[0.8] tracking-tighter text-center">
            Melhoramento
          </h1>
          <span 
            className="text-[4.5rem] md:text-[6.5rem] font-serif text-[#E2C337] italic leading-[0.8] -mt-4 md:-mt-8 z-10 text-center"
            style={{ textShadow: "2px 2px 0px #D03C7A, -1px -1px 0px #D03C7A, 1px -1px 0px #D03C7A, -1px 1px 0px #D03C7A" }}
          >
            Genético
          </span>
        </div>

        {/* =========================================
            PARTE INFERIOR: Painel de Cards Dinâmicos
            ========================================= */}
        <div 
          className={`flex flex-col md:flex-row items-stretch justify-center gap-6 md:gap-8 w-full mt-8 transition-all duration-300
            ${transitando ? "opacity-0 translate-y-2 scale-[0.99]" : "opacity-100 translate-y-0 scale-100"}`}
        >
          
          {/* CARD DA ESQUERDA (Ovelha de Pelo Ralo / Opção Correta) */}
          <section className={`rounded-[2.5rem] p-8 md:p-10 w-full md:w-[35%] flex flex-col justify-center items-center shadow-sm min-h-[380px] transition-all duration-300
            ${mostrarQuiz 
              ? "bg-[#E6D48A] border-4 border-dashed border-[#D03C7A]/20 cursor-pointer hover:scale-105 hover:bg-[#E6D48A]/90 hover:border-solid hover:border-[#D03C7A]" 
              : "bg-[#E6D48A]/80"
            }`}
            onClick={() => mostrarQuiz && handleEscolha("esquerda")}
          >
            {!mostrarQuiz ? (
              <p className="text-[#D03C7A] text-lg md:text-[1.3rem] font-medium leading-relaxed text-center tracking-tight">
                O melhoramento genético é o conjunto de técnicas utilizadas para selecionar e reproduzir os animais que possuem as melhores características, como maior produção de leite, boa fertilidade, resistência a doenças e adaptação ao clima da região.
              </p>
            ) : (
              <div className="flex flex-col w-full text-center">
                <div className="w-full h-[220px] md:h-[260px] rounded-[2rem] overflow-hidden mb-6 shadow-md border-2 border-transparent hover:border-[#D03C7A]/40 transition-all duration-300">
                  <img 
                    src="/assets/genetica-pelo-ralo.jpg" 
                    alt="Ovelha reprodutora com características de pelo ralo" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <h4 className="text-xl font-bold mb-2">Opção A: Pelo Ralo</h4>
                <ul className="text-[#D03C7A] text-left text-sm md:text-base font-semibold leading-snug space-y-2 mx-auto">
                  <li>• Produção de leite das filhas: alta</li>
                  <li>• Boa resistência a doenças</li>
                  <li>• Elevada fertilidade geral</li>
                </ul>
              </div>
            )}
          </section>

          {/* COLUNA CENTRAL: Botão Inicial ou Pergunta e Feedbacks */}
          <div className="w-full md:w-[30%] flex flex-col justify-center items-center py-6 md:py-0">
            {!mostrarQuiz ? (
              <button 
                type="button"
                onClick={handleToggleQuiz}
                aria-label="Ativar teste interativo de melhoramento genético"
                className="relative bg-[#EAE7D6] border-[5px] md:border-[6px] border-[#E2C337] rounded-[2rem] p-8 md:p-10 text-left hover:scale-105 hover:bg-white active:scale-95 transition-all duration-300 shadow-md group w-[90%] md:w-full focus:outline-none focus:ring-4 focus:ring-[#D03C7A]/30"
              >
                <p className="text-[#D03C7A] text-[1.4rem] md:text-[1.6rem] font-bold text-center leading-snug tracking-tight">
                  Clique aqui para testar a sua experiência de melhoramento genético!
                </p>

                {/* Cursor Pixelado Decorativo */}
                <div className="absolute -bottom-8 -right-6 md:-bottom-10 md:-right-8 w-12 h-12 md:w-16 md:h-16 z-30 group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-300 pointer-events-none">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="drop-shadow-lg">
                    <path d="M4 0L4 16L8 12L11.5 19L14 18L10.5 11L16 11L4 0Z" fill="white" stroke="black" strokeWidth="1.5" strokeLinejoin="miter"/>
                  </svg>
                </div>
              </button>
            ) : (
              <div className="flex flex-col justify-center items-center w-full gap-4 text-center">
                
                {resultado === null ? (
                  <div className="animate-pulse">
                    <h3 className="text-[2.2rem] md:text-[3rem] font-bold text-[#D03C7A] leading-[1] tracking-tighter select-none">
                      Qual o melhor<br/>reprodutor<br/>para leite?
                    </h3>
                    <p className="text-xs font-semibold text-black/70 mt-4">
                      Selecione um dos cards ao lado
                    </p>
                  </div>
                ) : resultado === "correto" ? (
                  <div className="bg-[#E5CE82] border-4 border-[#D03C7A] rounded-3xl p-6 shadow-lg animate-pop-up flex flex-col items-center">
                    <h3 className="text-2xl font-black text-black leading-tight tracking-tight">
                      Acertou em cheio!
                    </h3>
                    <p className="text-sm text-black/85 font-semibold mt-3 leading-snug">
                      Excelente escolha! Para melhorar a produção, o ideal é o animal de Pelo Ralo. Ele possui excelente adaptação térmica, maior imunidade e transmite alta capacidade láctea para as gerações futuras.
                    </p>
                  </div>
                ) : (
                  <div className="bg-red-500/10 border-4 border-red-500/40 rounded-3xl p-6 shadow-md animate-pop-up flex flex-col items-center">
                    <h3 className="text-2xl font-black text-red-700 leading-tight tracking-tight">
                      Não é bem esse...
                    </h3>
                    <p className="text-sm text-red-800/85 font-semibold mt-3 leading-snug">
                      Embora o de Pelo Longo seja muito bonito visualmente, suas filhas têm apenas produção média e ele é menos resistente a doenças climáticas. Tente escolher o outro reprodutor!
                    </p>
                  </div>
                )}
                
                <button 
                  onClick={handleToggleQuiz}
                  className="text-xs font-bold text-[#D03C7A]/80 hover:text-[#D03C7A] hover:underline focus:ring-1 focus:ring-[#D03C7A] px-2 py-1 rounded transition-all mt-4"
                >
                  ← Voltar à Explicação
                </button>
              </div>
            )}
          </div>

          {/* CARD DA DIREITA (Ovelha de Pelo Longo / Opção Incorreta) */}
          <section className={`rounded-[2.5rem] p-8 md:p-10 w-full md:w-[35%] flex flex-col justify-center items-center shadow-sm min-h-[380px] transition-all duration-300
            ${mostrarQuiz 
              ? "bg-[#E6D48A] border-4 border-dashed border-[#D03C7A]/20 cursor-pointer hover:scale-105 hover:bg-[#E6D48A]/90 hover:border-solid hover:border-[#D03C7A]" 
              : "bg-[#E6D48A]/80"
            }`}
            onClick={() => mostrarQuiz && handleEscolha("direita")}
          >
            {!mostrarQuiz ? (
              <p className="text-[#D03C7A] text-lg md:text-[1.3rem] font-medium leading-relaxed text-center tracking-tight">
                Ao escolher cuidadosamente os reprodutores e as matrizes, os criadores aumentam as chances de que essas qualidades sejam transmitidas para as próximas gerações. Dessa forma, o rebanho se torna mais produtivo, saudável e eficiente ao longo do tempo, contribuindo para melhores resultados na criação de ovinos.
              </p>
            ) : (
              <div className="flex flex-col w-full text-center">
                <div className="w-full h-[220px] md:h-[260px] rounded-[2rem] overflow-hidden mb-6 shadow-md border-2 border-transparent hover:border-[#D03C7A]/40 transition-all duration-300">
                  <img 
                    src="/assets/genetica-pelo-longo.jpg" 
                    alt="Ovelha reprodutora com características de pelo longo" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <h4 className="text-xl font-bold mb-2">Opção B: Pelo Longo</h4>
                <ul className="text-[#D03C7A] text-left text-sm md:text-base font-semibold leading-snug space-y-2 mx-auto">
                  <li>• Muito bonito visualmente</li>
                  <li>• Produção de leite das filhas: média</li>
                  <li>• Resistência adaptativa média</li>
                </ul>
              </div>
            )}
          </section>

        </div>

      </div>
    </div>
  );
}