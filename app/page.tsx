"use client"; // Precisamos disso para a animação de scroll funcionar

import { useEffect, useRef, useState } from "react";

export default function Home() {
  // Configuração da animação de transição suave
  const destaquesRef = useRef(null);
  const [destaquesVisivel, setDestaquesVisivel] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Quando 15% da secção 2 aparecer na tela, ativa a animação
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
      if (destaquesRef.current) observer.unobserve(destaquesRef.current);
    };
  }, []);

  return (
    // TRUQUE DEFINITIVO: -mt-8 e -mb-8 anulam qualquer padding que venha do layout principal, 
    // matando as bordas pretas em cima e embaixo!
    <div className="w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] -mt-4 md:-mt-8 -mb-4 md:-mb-8 bg-[#E2E4CE] text-[#C24984] overflow-x-hidden min-h-screen pb-12">
      
      {/* =========================================
          SECÇÃO 1: SOBRE NÓS (TELA INICIAL)
          ========================================= */}
      <section className="min-h-[90vh] flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-12 relative max-w-[1300px] mx-auto w-full pt-16 md:pt-24 gap-12 md:gap-4">
        
        {/* BLOCO ESQUERDO: Título e Ovelha Sobrepostos (Ocupando aprox. 50% da tela) */}
        <div className="relative flex w-full md:w-[50%] items-center justify-start mt-8 md:mt-0 min-h-[350px] md:min-h-[450px]">
          
          {/* Título Gigante "Sobre Nós" - Posicionamento absoluto flutuando à esquerda */}
          <div className="absolute z-30 left-0 md:left-4 top-1/2 -translate-y-1/2 flex flex-col pointer-events-none">
            <h2 className="text-[5.4rem] md:text-[8.5rem] font-bold text-[#C24984] leading-[0.75] tracking-tighter drop-shadow-md">
              Sobre
            </h2>
            <span className="text-[3.6rem] md:text-[6.75rem] font-serif text-[#E5CE82] italic drop-shadow-[2px_2px_0px_#C24984] ml-8 md:ml-20">
              Nós
            </span>
          </div>

          {/* Foto da Ovelha - Deslocada para a direita usando margin-left para permitir a sobreposição */}
          <div className="z-10 relative ml-[25%] md:ml-[35%] flex-shrink-0">
            <div className="relative border-[1.5px] border-black p-1 bg-transparent">
              {/* Quadradinhos falsos simulando a ferramenta de corte */}
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
                className="object-cover w-[220px] md:w-[380px] h-auto shadow-lg"
              />
            </div>
          </div>

        </div>

        {/* BLOCO DIREITO: Texto Explicativo e Cher GIGANTE (Ocupando aprox. 50% da tela) */}
        <div className="flex flex-row items-end justify-center md:justify-start relative w-full md:w-[50%] mt-12 md:mt-0">
          
          {/* Caixa de Texto: Limitada em tamanho para não atrapalhar a Cher */}
          <div className="z-10 bg-[#E2E4CE]/90 p-6 md:p-7 rounded-xl w-[260px] md:w-[320px] shadow-sm relative">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-4xl md:text-5xl font-serif text-[#E5CE82] italic drop-shadow-[1.5px_1.5px_0px_#C24984]">
                Kerry Hills:
              </h3>
              <img src="/assets/star.png" alt="Estrela" className="w-[30px] h-[30px] object-contain animate-spin-slow" />
            </div>
            
            {/* TEXTOS ATUALIZADOS: Mais modernos, com melhor espaçamento e fonte mais limpa */}
            <p className="text-[#C24984] text-sm md:text-base font-semibold mb-4 leading-relaxed tracking-wide font-sans antialiased">
              Somos as Patricinhas de Kerry Hill, uma equipa dedicada a explorar o universo das ovelhas Kerry Hill.
            </p>
            <p className="text-[#C24984] text-xs md:text-sm leading-relaxed font-medium tracking-wide font-sans antialiased">
              Neste site, exploramos de forma criativa e informativa temas como o melhoramento genético e a produção de leite, mostrando como a ciência contribui para o desenvolvimento da ovinocultura. O nosso objetivo é apresentar estas informações de maneira leve, divertida e fácil de entender.
            </p>
          </div>

          {/* Cher: Graças ao espaço livre, aumentamos significativamente a largura e altura dela! */}
          <div className="z-20 pointer-events-none -ml-[22px] md:-ml-[38px] -mb-8 md:-mb-16 flex-shrink-0">
            <img
              src="/assets/inicio-cher.png"
              alt="Cher a piscar o olho"
              className="object-contain w-[240px] md:w-[390px] h-auto drop-shadow-2xl"
            />
          </div>
        </div>

      </section>

      {/* =========================================
          SECÇÃO 2: NOSSOS DESTAQUES (APARECE NO SCROLL)
          ========================================= */}
      <section 
        ref={destaquesRef}
        className={`min-h-screen flex flex-col justify-center px-4 md:px-12 py-20 max-w-[1200px] mx-auto w-full transition-all duration-1000 ease-out transform
          ${destaquesVisivel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'}`}
      >
        
        {/* Título e Coração */}
        <div className="flex flex-col md:flex-row items-center justify-start gap-8 mb-16">
          <div className="flex flex-col z-10 text-center md:text-left">
            <h2 className="text-[6rem] md:text-[8rem] font-bold text-[#C24984] leading-[0.75] tracking-tighter">
              Nossos
            </h2>
            <span className="text-[4rem] md:text-[6rem] font-serif text-[#E5CE82] italic drop-shadow-[2px_2px_0px_#C24984] md:ml-16">
              Destaques
            </span>
          </div>
          
          <div className="z-0 -mt-4 md:-mt-12">
            <img
              src="/assets/inicio-coracao.png"
              alt="Cher e Dionne no coração"
              className="object-contain w-[250px] md:w-[350px] h-auto drop-shadow-xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Grid de Cards Amarelos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          
          {/* Card 1 */}
          <div className="bg-[#E5CE82] rounded-[3rem] p-10 min-h-[300px] flex flex-col relative shadow-md hover:-translate-y-2 transition-transform duration-300">
            <h4 className="text-3xl font-bold text-black mb-4 tracking-wide">Genética</h4>
            <p className="text-black/85 text-base md:text-lg leading-relaxed font-medium font-sans antialiased">
              Selecione os melhores animais. Aprenda como a genética pode aumentar a produtividade, a resistência e a qualidade do rebanho.
            </p>
            <img src="/assets/star.png" alt="Estrela" className="w-[30px] h-[30px] absolute -left-4 top-1/2 transform -translate-y-1/2 opacity-70" />
            <img src="/assets/star.png" alt="Estrela" className="w-[20px] h-[20px] absolute right-8 bottom-8 opacity-40" />
          </div>

          {/* Card 2 */}
          <div className="bg-[#E5CE82] rounded-[3rem] p-10 min-h-[300px] flex flex-col relative shadow-md hover:-translate-y-2 transition-transform duration-300">
            <h4 className="text-3xl font-bold text-black mb-4 tracking-wide">Produção de Leite</h4>
            <p className="text-black/85 text-base md:text-lg leading-relaxed font-medium font-sans antialiased">
              Mais leite, mais resultados. Conheça os fatores que influenciam a produção e descubra práticas para melhorar o desempenho das ovelhas.
            </p>
            <img src="/assets/star.png" alt="Estrela" className="w-[30px] h-[30px] absolute -left-4 top-1/2 transform -translate-y-1/2 opacity-70" />
            <img src="/assets/star.png" alt="Estrela" className="w-[20px] h-[20px] absolute right-8 bottom-8 opacity-40" />
          </div>

          {/* Card 3 */}
          <div className="bg-[#E5CE82] rounded-[3rem] p-10 min-h-[300px] flex flex-col relative shadow-md hover:-translate-y-2 transition-transform duration-300">
            <h4 className="text-3xl font-bold text-black mb-4 tracking-wide">Guia do Criador</h4>
            <p className="text-black/85 text-base md:text-lg leading-relaxed font-medium font-sans antialiased">
              Dicas para o dia a dia. Encontre orientações práticas sobre maneio, alimentação, reprodução e cuidados com o rebanho.
            </p>
            <img src="/assets/star.png" alt="Estrela" className="w-[30px] h-[30px] absolute -left-4 top-1/2 transform -translate-y-1/2 opacity-70" />
            <img src="/assets/star.png" alt="Estrela" className="w-[20px] h-[20px] absolute right-8 bottom-8 opacity-40" />
          </div>

        </div>

      </section>

    </div>
  );
}