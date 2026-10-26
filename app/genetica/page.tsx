"use client";

import { useState, useEffect, useRef } from "react";
import CursorPixel from "@/components/CursorPixel";
import Icone from "@/components/Icone";
import TituloDuplo from "@/components/TituloDuplo";
import { opcoesQuizGenetica } from "@/data/conteudos";

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
      setMostrarQuiz((prev) => !prev);
      setOpcaoSelecionada(null);
      setResultado(null);
      setTransitando(false);
    }, 350);
  };

  // Função que lida com a resposta do usuário
  const handleEscolha = (opcao: "esquerda" | "direita") => {
    setOpcaoSelecionada(opcao);
    setResultado(opcao === "esquerda" ? "correto" : "incorreto");
  };

  // Sistema de partículas de confete (60 FPS)
  useEffect(() => {
    if (resultado === "correto" && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const cores = ["#D03C7A", "#E2C337", "#FFFFFF", "#F1F3E9", "#FF85B3"];
      const particulas: Particula[] = [];

      for (let i = 0; i < 150; i++) {
        particulas.push({
          x: Math.random() * canvas.width,
          y: Math.random() * -canvas.height - 20,
          tamanho: Math.random() * 8 + 6,
          cor: cores[Math.floor(Math.random() * cores.length)],
          velocidadeX: Math.random() * 4 - 2,
          velocidadeY: Math.random() * 5 + 4,
          rotacao: Math.random() * 360,
          velocidadeRotacao: Math.random() * 10 - 5,
        });
      }

      const animar = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let particulasAtivas = false;

        particulas.forEach((p) => {
          p.y += p.velocidadeY;
          p.x += p.velocidadeX;
          p.rotacao += p.velocidadeRotacao;

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

  // Renderiza o card lateral (esquerda ou direita) evitando repetição de JSX
  const renderCardLateral = (lado: "esquerda" | "direita") => {
    const dados = opcoesQuizGenetica[lado];
    const selecionada = opcaoSelecionada === lado;

    return (
      <section
        role={mostrarQuiz ? "button" : undefined}
        tabIndex={mostrarQuiz ? 0 : undefined}
        aria-pressed={mostrarQuiz ? selecionada : undefined}
        onClick={() => mostrarQuiz && handleEscolha(lado)}
        onKeyDown={(e) => {
          if (mostrarQuiz && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            handleEscolha(lado);
          }
        }}
        className={`rounded-[2.5rem] p-8 md:p-10 w-full md:w-[35%] flex flex-col justify-center items-center shadow-sm min-h-[360px] md:min-h-[380px] transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-rosa ${
          mostrarQuiz
            ? selecionada
              ? "bg-amarelo-card border-4 border-solid border-rosa ring-4 ring-rosa/25 scale-[1.02] cursor-pointer"
              : "bg-amarelo-card border-4 border-dashed border-rosa/25 cursor-pointer hover:scale-[1.02] hover:border-solid hover:border-rosa"
            : "bg-amarelo-card"
        }`}
      >
        {!mostrarQuiz ? (
          <p className="text-rosa text-lg md:text-[1.3rem] font-medium leading-relaxed text-center tracking-tight">
            {dados.textoIntroducao}
          </p>
        ) : (
          <div className="flex flex-col w-full text-center">
            <div className="w-full h-[220px] md:h-[260px] rounded-[2rem] overflow-hidden mb-5 shadow-md border-2 border-transparent transition-all duration-300">
              <img
                src={dados.imagem}
                alt={dados.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <h4 className="text-xl font-bold text-black">{dados.titulo}</h4>
              {selecionada && (
                <span className="inline-flex items-center gap-1 bg-rosa text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                  <span>Escolhida</span>
                  {lado === "esquerda" && (
                    <Icone nome="sparkles" className="w-3.5 h-3.5" />
                  )}
                </span>
              )}
            </div>
            <ul className="text-rosa text-left text-sm md:text-base font-semibold leading-snug space-y-2 mx-auto">
              {dados.caracteristicas.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="w-full bg-creme text-rosa overflow-x-hidden min-h-screen font-sans pb-20 relative">
      {/* Canvas para a Chuva de Confetes */}
      {resultado === "correto" && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 w-full h-full pointer-events-none z-50"
        />
      )}

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-10 md:pt-20">
        {/* =========================================
            PARTE SUPERIOR: Título da Seção
            ========================================= */}
        <TituloDuplo
          principal="Melhoramento"
          subtitulo="Genético"
          as="h1"
          className="flex flex-col items-center justify-center w-full z-20 mb-8 md:mb-14 select-none animate-fade-in"
          tituloClassName="text-[3.1rem] sm:text-[4.5rem] md:text-[7rem] font-bold text-rosa leading-[0.85] md:leading-[0.8] tracking-tighter text-center"
          subtituloClassName="text-[3rem] sm:text-[4.5rem] md:text-[6.5rem] font-serif text-amarelo italic leading-[0.85] -mt-2 md:-mt-6 z-10 text-center"
        />

        {/* =========================================
            PARTE INFERIOR: Painel de Cards Dinâmicos
            ========================================= */}
        <div
          className={`flex flex-col md:flex-row items-stretch justify-center gap-6 md:gap-8 w-full mt-6 transition-all duration-300 ${
            transitando
              ? "opacity-0 translate-y-2 scale-[0.99]"
              : "opacity-100 translate-y-0 scale-100"
          }`}
        >
          {/* CARD DA ESQUERDA (Ovelha de Pelo Ralo / Opção Correta) */}
          {renderCardLateral("esquerda")}

          {/* COLUNA CENTRAL: Botão Inicial ou Pergunta e Feedbacks */}
          <div className="w-full md:w-[30%] flex flex-col justify-center items-center py-6 md:py-0">
            {!mostrarQuiz ? (
              <button
                type="button"
                onClick={handleToggleQuiz}
                aria-label="Ativar teste interativo de melhoramento genético"
                className="relative bg-creme border-[5px] md:border-[6px] border-amarelo rounded-[2rem] p-8 md:p-10 text-left hover:scale-105 hover:bg-white active:scale-95 transition-all duration-300 shadow-md group w-[90%] md:w-full focus:outline-none focus:ring-4 focus:ring-rosa/30"
              >
                <p className="text-rosa text-[1.4rem] md:text-[1.6rem] font-bold text-center leading-snug tracking-tight">
                  Clique aqui para testar a sua experiência de melhoramento genético!
                </p>

                {/* Cursor Pixelado Decorativo */}
                <CursorPixel
                  className="absolute -bottom-8 -right-6 md:-bottom-10 md:-right-8 w-12 h-12 md:w-16 md:h-16 z-30 group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-300 pointer-events-none"
                  svgClassName="drop-shadow-lg"
                />
              </button>
            ) : (
              <div className="flex flex-col justify-center items-center w-full gap-4 text-center">
                {resultado === null ? (
                  <div className="animate-pulse">
                    <h3 className="text-[2.2rem] md:text-[3rem] font-bold text-rosa leading-[1] tracking-tighter select-none">
                      Qual o melhor
                      <br />
                      reprodutor
                      <br />
                      para leite?
                    </h3>
                    <p className="text-xs font-semibold text-black/70 mt-4">
                      Selecione um dos cards ao lado
                    </p>
                  </div>
                ) : resultado === "correto" ? (
                  <div className="bg-amarelo-card border-4 border-rosa rounded-3xl p-6 shadow-lg animate-pop-up flex flex-col items-center">
                    <h3 className="inline-flex items-center gap-1.5 text-2xl font-black text-black leading-tight tracking-tight">
                      <span>Acertou em cheio!</span>
                      <Icone nome="sparkles" className="w-6 h-6 text-rosa" />
                    </h3>
                    <p className="text-sm text-black/85 font-semibold mt-3 leading-snug">
                      Excelente escolha! Para melhorar a produção, o ideal é o animal de Pelo Ralo. Ele possui excelente adaptação térmica, maior imunidade e transmite alta capacidade láctea para as gerações futuras.
                    </p>
                  </div>
                ) : (
                  <div className="bg-papel border-4 border-dashed border-rosa rounded-3xl p-6 shadow-md animate-pop-up flex flex-col items-center">
                    <img
                      src="/assets/calculadora-cher.png"
                      alt="Cher fazendo sinal de X"
                      className="w-16 h-auto mb-2 drop-shadow-md"
                    />
                    <h3 className="text-2xl font-black text-rosa leading-tight tracking-tight">
                      Não é bem esse...
                    </h3>
                    <p className="text-sm text-black/85 font-semibold mt-2.5 leading-snug">
                      Embora o de Pelo Longo seja muito bonito visualmente, suas filhas têm apenas produção média e ele é menos resistente ao calor. Tente escolher o outro reprodutor!
                    </p>
                  </div>
                )}

                <button
                  onClick={handleToggleQuiz}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-rosa/80 hover:text-rosa hover:underline focus:ring-1 focus:ring-rosa px-2 py-1 rounded transition-all mt-3"
                >
                  <Icone nome="arrow-left" className="w-3.5 h-3.5" />
                  <span>Voltar à Explicação</span>
                </button>
              </div>
            )}
          </div>

          {/* CARD DA DIREITA (Ovelha de Pelo Longo / Opção Incorreta) */}
          {renderCardLateral("direita")}
        </div>
      </div>
    </div>
  );
}
