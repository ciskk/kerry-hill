"use client";

import { useEffect, useRef, useState } from "react";
import Card from "@/components/Card";

export default function Home() {
  const destaquesRef = useRef<HTMLDivElement>(null);
  const [destaquesVisivel, setDestaquesVisivel] = useState(false);

  // Monitoriza o scroll do utilizador para ativar as animações de entrada dos Destaques
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDestaquesVisivel(true);
        }
      },
      { threshold: 0.15 }
    );

    if (destaquesRef.current) {
      observer.observe(destaquesRef.current);
    }

    return () => {
      if (destaquesRef.current) {
        observer.unobserve(destaquesRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full bg-creme text-rosa overflow-x-hidden min-h-screen pb-12">
      
      {/* =========================================
          SEÇÃO 1: SOBRE NÓS (TELA INICIAL)
          ========================================= */}
      <section className="min-h-[82vh] flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-8 md:py-12 relative max-w-[1300px] mx-auto w-full pt-8 md:pt-16 gap-8 md:gap-4">
        
        {/* BLOCO ESQUERDO: Título e Ovelha Sobrepostos com animações de entrada coordenadas */}
        <div className="relative flex w-full md:w-[50%] items-center justify-start mt-2 md:mt-0 min-h-[240px] sm:min-h-[320px] md:min-h-[450px]">
          
          <div className="absolute z-30 left-0 md:left-4 top-1/2 -translate-y-1/2 flex flex-col pointer-events-none animate-slide-left">
            <h1 className="text-[4.4rem] sm:text-[5.4rem] md:text-[8.5rem] font-bold text-rosa leading-[0.75] tracking-tighter drop-shadow-md">
              Sobre
            </h1>
            <span 
              className="text-[3.2rem] sm:text-[3.8rem] md:text-[6.75rem] font-serif text-amarelo italic ml-6 sm:ml-8 md:ml-20 leading-[0.85]"
              style={{ textShadow: "2px 2px 0px #D03C7A, -1px -1px 0px #D03C7A, 1px -1px 0px #D03C7A, -1px 1px 0px #D03C7A" }}
            >
              Nós
            </span>
          </div>

          <div className="z-10 relative ml-[24%] sm:ml-[28%] md:ml-[35%] flex-shrink-0 animate-scale-up">
            <div className="relative border-[1.5px] border-black p-1 bg-transparent hover:rotate-2 transition-transform duration-500">
              {/* Pontos de ancoragem para simulação de corte de imagem */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-[1.5px] border-black bg-white z-20"></div>
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 border-[1.5px] border-black bg-white z-20"></div>
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-[1.5px] border-black bg-white z-20"></div>
              <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 border-[1.5px] border-black bg-white z-20"></div>
              <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 border-[1.5px] border-black bg-white z-20"></div>
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-[1.5px] border-black bg-white z-20"></div>
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 border-[1.5px] border-black bg-white z-20"></div>
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-[1.5px] border-black bg-white z-20"></div>
              
              <img
                src="/assets/inicio-ovelha-fofa.jpeg"
                alt="Ovelha Kerry Hill fofa"
                className="object-cover w-[220px] sm:w-[270px] md:w-[380px] h-auto shadow-lg"
              />
            </div>
          </div>

        </div>

        {/* BLOCO DIREITO: Texto Explicativo e Cher com entrada elástica */}
        <div className="flex flex-row items-end justify-center md:justify-start relative w-full md:w-[50%] mt-4 md:mt-0">
          
          <div className="z-10 bg-papel/90 border border-rosa/10 p-5 sm:p-6 md:p-7 md:pr-9 rounded-2xl w-[64%] sm:w-[300px] md:w-[350px] shadow-sm relative animate-scale-up" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <h2 
                className="text-3xl sm:text-4xl md:text-5xl font-serif text-amarelo italic leading-none"
                style={{ textShadow: "1.5px 1.5px 0px #D03C7A, -1px -1px 0px #D03C7A, 1px -1px 0px #D03C7A, -1px 1px 0px #D03C7A" }}
              >
                Kerry Hills:
              </h2>
              <img src="/assets/star.png" alt="Estrela" className="w-[26px] h-[26px] md:w-[30px] md:h-[30px] object-contain animate-[spin_10s_linear_infinite]" />
            </div>
            
            <p className="text-rosa text-sm md:text-base font-semibold mb-3 md:mb-4 leading-relaxed tracking-wide font-sans antialiased">
              Somos as Patricinhas de Kerry Hill, uma equipe dedicada a explorar o universo das ovelhas Kerry Hill.
            </p>
            <p className="text-rosa text-xs md:text-sm leading-relaxed font-medium tracking-wide font-sans antialiased">
              Neste site, exploramos de forma criativa e informativa temas como o melhoramento genético e a produção de leite, mostrando como a ciência contribui para o desenvolvimento da ovinocultura. O nosso objetivo é apresentar estas informações de maneira leve, divertida e fácil de entender.
            </p>
          </div>

          <div className="z-20 pointer-events-none -ml-[18px] sm:-ml-[24px] md:-ml-[34px] -mb-4 md:-mb-12 flex-shrink-0 animate-slide-right-bounce">
            <img
              src="/assets/inicio-cher.png"
              alt="Cher piscando o olho"
              className="object-contain w-[165px] sm:w-[230px] md:w-[375px] h-auto drop-shadow-2xl"
            />
          </div>
        </div>

      </section>

      {/* =========================================
          SEÇÃO 2: NOSSOS DESTAQUES (APARECE NO SCROLL)
          ========================================= */}
      <section 
        ref={destaquesRef}
        className="flex flex-col justify-center px-4 md:px-12 py-12 md:py-20 max-w-[1200px] mx-auto w-full"
      >
        
        <div className={`flex flex-col md:flex-row items-center justify-start gap-6 md:gap-8 mb-12 md:mb-16 transition-all duration-1000 ease-out transform
          ${destaquesVisivel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
        >
          <div className="flex flex-col z-10 text-center md:text-left">
            <h2 className="text-[4.2rem] sm:text-[5.5rem] md:text-[8rem] font-bold text-rosa leading-[0.8] md:leading-[0.75] tracking-tighter">
              Nossos
            </h2>
            <span 
              className="text-[3rem] sm:text-[4rem] md:text-[6rem] font-serif text-amarelo italic md:ml-16 leading-[0.9]"
              style={{ textShadow: "2px 2px 0px #D03C7A, -1px -1px 0px #D03C7A, 1px -1px 0px #D03C7A, -1px 1px 0px #D03C7A" }}
            >
              Destaques
            </span>
          </div>
          
          <div className="z-0 -mt-2 md:-mt-12">
            <img
              src="/assets/inicio-coracao.png"
              alt="Cher e Dionne no coração"
              className="object-contain w-[220px] sm:w-[260px] md:w-[350px] h-auto drop-shadow-xl hover:scale-105 hover:rotate-3 transition-all duration-500"
            />
          </div>
        </div>

        {/* Grid de Cards Amarelos com efeito de surgimento em cascata (Staggered Reveal) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          
          <div className={`transition-all duration-700 ease-out transform delay-100
            ${destaquesVisivel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <Card title="Genética" href="/genetica">
              Selecione os melhores animais. Aprenda como a genética pode aumentar a produtividade, a resistência e a qualidade do rebanho.
            </Card>
          </div>

          <div className={`transition-all duration-700 ease-out transform delay-300
            ${destaquesVisivel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <Card title="Produção de Leite" href="/leite">
              Mais leite, mais resultados. Conheça os fatores que influenciam a produção e descubra práticas para melhorar o desempenho das ovelhas.
            </Card>
          </div>

          <div className={`transition-all duration-700 ease-out transform delay-500
            ${destaquesVisivel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <Card title="Guia do Criador" href="/guia">
              Dicas para o dia a dia. Encontre orientações práticas sobre manejo, alimentação, reprodução e cuidados com o rebanho.
            </Card>
          </div>

        </div>

      </section>

    </div>
  );
}