"use client";

import Link from "next/link";
import AnimarScroll from "@/components/AnimarScroll";
import Card from "@/components/Card";
import Estrela from "@/components/Estrela";
import Icone from "@/components/Icone";
import MolduraRecorte from "@/components/MolduraRecorte";
import TituloDuplo from "@/components/TituloDuplo";
import {
  destaquesHome,
  equipePatricinhas,
  ferramentasDestaqueHome,
  numerosKerryHillHome,
} from "@/data/conteudos";

export default function Home() {
  return (
    <div className="w-full text-rosa overflow-x-hidden min-h-screen pb-8">
      {/* =========================================
          SEÇÃO 1: SOBRE NÓS (TELA INICIAL)
          ========================================= */}
      <section className="min-h-[80vh] flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-8 md:py-12 relative max-w-[1300px] mx-auto w-full pt-8 md:pt-14 gap-8 md:gap-4">
        {/* BLOCO ESQUERDO: Título e Ovelha Sobrepostos com Moldura de Recorte */}
        <div className="relative flex w-full md:w-[50%] items-center justify-start mt-2 md:mt-0 min-h-[240px] sm:min-h-[320px] md:min-h-[450px]">
          <TituloDuplo
            principal="Sobre"
            subtitulo="Nós"
            as="h1"
            className="absolute z-30 left-0 md:left-4 top-1/2 -translate-y-1/2 flex flex-col pointer-events-none animate-slide-left"
            tituloClassName="text-[4.4rem] sm:text-[5.4rem] md:text-[8.5rem] font-bold text-rosa leading-[0.75] tracking-tighter drop-shadow-md"
            subtituloClassName="text-[3.2rem] sm:text-[3.8rem] md:text-[6.75rem] font-serif text-amarelo italic ml-6 sm:ml-8 md:ml-20 leading-[0.85]"
          />

          <div className="z-10 relative ml-[24%] sm:ml-[28%] md:ml-[35%] flex-shrink-0 animate-scale-up">
            <MolduraRecorte
              comFitaAdesiva
              rotacaoHover
              className="bg-papel p-2 pb-3 sombra-pop"
            >
              <img
                src="/assets/inicio-ovelha-fofa.jpeg"
                alt="Ovelha Kerry Hill fofa"
                className="object-cover w-[220px] sm:w-[270px] md:w-[375px] h-auto shadow-sm"
              />
              <div className="mt-2 flex items-center justify-between px-1">
                <span className="font-serif italic font-bold text-xs sm:text-sm text-rosa">
                  Mascote Oficial • Kerry Hill
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider bg-amarelo-card text-rosa px-2 py-0.5 rounded-full border border-rosa/20">
                  VIP #01
                </span>
              </div>
            </MolduraRecorte>
          </div>
        </div>

        {/* BLOCO DIREITO: Texto Explicativo e Cher com entrada elástica */}
        <div className="flex flex-row items-end justify-center md:justify-start relative w-full md:w-[50%] mt-4 md:mt-0">
          <div
            className="z-10 bg-papel/95 border-2 border-rosa/20 p-5 sm:p-6 md:p-7 md:pr-9 rounded-[2rem] w-[64%] sm:w-[310px] md:w-[360px] sombra-pop relative animate-scale-up"
            style={{ animationDelay: "200ms" }}
          >
            <span className="inline-flex items-center gap-1 bg-amarelo-card text-rosa text-[11px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full border border-rosa/20 mb-2">
              <Icone nome="sparkles" className="w-3 h-3" />
              <span>Clube de Ovinocultura</span>
            </span>

            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-amarelo italic leading-none texto-contorno-rosa-sm">
                Kerry Hills:
              </h2>
              <Estrela className="w-[26px] h-[26px] md:w-[30px] md:h-[30px]" />
            </div>

            <p className="text-rosa text-sm md:text-base font-semibold mb-3 md:mb-4 leading-relaxed tracking-wide font-sans antialiased">
              Somos as Patricinhas de Kerry Hill, uma equipe dedicada a explorar
              o universo das ovelhas Kerry Hill.
            </p>
            <p className="text-rosa text-xs md:text-sm leading-relaxed font-medium tracking-wide font-sans antialiased">
              Neste site, exploramos de forma criativa e informativa temas como
              o melhoramento genético e a produção de leite, mostrando como a
              ciência contribui para o desenvolvimento da ovinocultura de
              maneira leve, divertida e fácil de entender.
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
          FAIXA: KERRY HILL EM NÚMEROS (STICKERS COLECIONÁVEIS)
          ========================================= */}
      <section className="px-4 md:px-12 py-4 md:py-6 max-w-[1200px] mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {numerosKerryHillHome.map((item, idx) => (
            <AnimarScroll
              key={item.rotulo}
              variante="colagem"
              atrasoMs={idx * 100}
            >
              <div className="bg-papel/95 border-2 border-rosa/20 rounded-3xl p-4 sm:p-5 h-full flex flex-col justify-between sombra-pop-sm hover:-translate-y-1 transition-transform">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-rosa/75">
                    {item.rotulo}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-amarelo-card border border-rosa/25 flex items-center justify-center text-rosa shrink-0">
                    <Icone nome={item.icone} className="w-4 h-4" />
                  </span>
                </div>
                <p className="text-2xl font-serif italic font-bold text-amarelo texto-contorno-rosa-sm leading-tight">
                  {item.valor}
                </p>
                <p className="text-xs text-black/80 font-medium mt-1.5 leading-relaxed">
                  {item.detalhe}
                </p>
              </div>
            </AnimarScroll>
          ))}
        </div>
      </section>

      {/* =========================================
          SEÇÃO 2: NOSSOS DESTAQUES (TEMAS DO ESTUDO)
          ========================================= */}
      <section className="flex flex-col justify-center px-4 md:px-12 py-10 md:py-16 max-w-[1200px] mx-auto w-full">
        <AnimarScroll
          variante="subir"
          className="flex flex-col md:flex-row items-center justify-start gap-6 md:gap-8 mb-10 md:mb-14"
        >
          <TituloDuplo
            principal="Nossos"
            subtitulo="Destaques"
            as="h2"
            className="flex flex-col z-10 text-center md:text-left"
            tituloClassName="text-[4.2rem] sm:text-[5.5rem] md:text-[8rem] font-bold text-rosa leading-[0.8] md:leading-[0.75] tracking-tighter"
            subtituloClassName="text-[3rem] sm:text-[4rem] md:text-[6rem] font-serif text-amarelo italic md:ml-16 leading-[0.9]"
          />

          <div className="z-0 -mt-2 md:-mt-12">
            <img
              src="/assets/inicio-coracao.png"
              alt="Cher e Dionne no coração"
              className="object-contain w-[220px] sm:w-[260px] md:w-[350px] h-auto drop-shadow-xl hover:scale-105 hover:rotate-3 transition-all duration-500"
            />
          </div>
        </AnimarScroll>

        {/* Grid de Cards com efeito de surgimento em cascata */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {destaquesHome.map((item, idx) => (
            <AnimarScroll
              key={item.href}
              variante="subir"
              atrasoMs={idx * 140}
            >
              <Card title={item.titulo} href={item.href} selo={item.selo}>
                {item.descricao}
              </Card>
            </AnimarScroll>
          ))}
        </div>
      </section>

      {/* =========================================
          SEÇÃO 3: FERRAMENTAS INTERATIVAS AO VIVO
          ========================================= */}
      <section className="px-4 md:px-12 py-8 md:py-12 max-w-[1200px] mx-auto w-full">
        <AnimarScroll
          variante="escala"
          className="bg-xadrez-clueless border-2 border-rosa/30 rounded-[2.5rem] p-6 sm:p-8 md:p-10 sombra-pop"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 text-center md:text-left">
            <div>
              <span className="inline-flex items-center gap-1.5 bg-rosa text-white text-xs font-bold px-3.5 py-1 rounded-full mb-2">
                <Icone nome="sparkles" className="w-3.5 h-3.5" />
                <span>Demonstração Prática na Apresentação</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-rosa tracking-tight">
                Ferramentas Interativas do Rebanho
              </h2>
            </div>
            <Estrela className="w-10 h-10 hidden md:block" filtroRosa />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ferramentasDestaqueHome.map((ferramenta, idx) => (
              <AnimarScroll
                key={ferramenta.href}
                variante={idx === 0 ? "esquerda" : "direita"}
                atrasoMs={idx * 120}
              >
                <Link
                  href={ferramenta.href}
                  className="group bg-papel/95 hover:bg-white border-2 border-rosa/20 hover:border-rosa rounded-[2rem] p-6 sm:p-7 h-full flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 sombra-pop-sm"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="w-11 h-11 rounded-2xl bg-amarelo-card border border-rosa/25 flex items-center justify-center text-rosa shadow-xs">
                        <Icone nome={ferramenta.icone} className="w-5 h-5" />
                      </span>
                      <span className="text-xs font-extrabold text-rosa bg-amarelo-card/75 px-3 py-1 rounded-full border border-rosa/20">
                        {ferramenta.subtitulo}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-black group-hover:text-rosa transition-colors mb-2">
                      {ferramenta.titulo}
                    </h3>
                    <p className="text-black/80 text-sm sm:text-base font-medium leading-relaxed">
                      {ferramenta.descricao}
                    </p>
                  </div>

                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-black text-rosa group-hover:translate-x-1 transition-transform">
                    <span>{ferramenta.cta}</span>
                    <Icone nome="arrow-right" className="w-4 h-4" />
                  </span>
                </Link>
              </AnimarScroll>
            ))}
          </div>
        </AnimarScroll>
      </section>

      {/* =========================================
          SEÇÃO 4: NOSSA EQUIPE (FIGURINHAS DO CLUBE)
          ========================================= */}
      <section className="px-4 md:px-12 py-8 md:py-12 max-w-[1200px] mx-auto w-full">
        <AnimarScroll
          variante="subir"
          className="flex flex-col items-center text-center mb-8"
        >
          <h2 className="text-3xl sm:text-5xl font-serif text-amarelo italic texto-contorno-rosa leading-tight">
            Nosso Esquadrão Escolar
          </h2>
          <p className="text-rosa text-sm sm:text-base font-semibold mt-1">
            Quem faz o clube das Patricinhas de Kerry Hill acontecer:
          </p>
        </AnimarScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {equipePatricinhas.map((membro, idx) => (
            <AnimarScroll
              key={membro.nome}
              variante="colagem"
              atrasoMs={idx * 110}
            >
              <div className="bg-papel/95 border-2 border-rosa/20 rounded-3xl p-5 h-full flex flex-col justify-between sombra-pop-sm hover:-translate-y-1.5 hover:border-rosa transition-all">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="w-9 h-9 rounded-full bg-amarelo-card border border-rosa/30 flex items-center justify-center text-rosa">
                      <Icone nome={membro.icone} className="w-4 h-4" />
                    </span>
                    <Estrela
                      ariaHidden
                      velocidadeGiro="parada"
                      className="w-5 h-5 opacity-75"
                    />
                  </div>
                  <h3 className="text-lg font-extrabold text-rosa leading-snug">
                    {membro.nome}
                  </h3>
                  <p className="text-xs font-bold text-black/70 uppercase tracking-wider mb-2">
                    {membro.papel}
                  </p>
                  <p className="text-xs sm:text-sm text-black/80 font-medium leading-relaxed">
                    {membro.descricao}
                  </p>
                </div>
              </div>
            </AnimarScroll>
          ))}
        </div>
      </section>
    </div>
  );
}
