"use client";

import { useState } from "react";
import AnimarScroll from "@/components/AnimarScroll";
import ConfetesCanvas from "@/components/ConfetesCanvas";
import CursorPixel from "@/components/CursorPixel";
import Estrela from "@/components/Estrela";
import Icone from "@/components/Icone";
import MolduraRecorte from "@/components/MolduraRecorte";
import TituloDuplo from "@/components/TituloDuplo";
import {
  calcularCruzamentoF1,
  geracoesEvolucaoGenetica,
  linhagensGenetica,
  matrizesCruzamento,
  opcoesQuizGenetica,
  reprodutoresCruzamento,
} from "@/data/conteudos";

export default function Genetica() {
  const [mostrarQuiz, setMostrarQuiz] = useState(false);
  const [transitando, setTransitando] = useState(false);

  // Estados do Quiz Super Trunfo
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<
    "esquerda" | "direita" | null
  >(null);
  const [resultado, setResultado] = useState<"correto" | "incorreto" | null>(
    null
  );

  // Estado da Galeria de Linhagens (Seção 2)
  const [linhagemAtivaId, setLinhagemAtivaId] = useState<string>(
    linhagensGenetica[0].id
  );

  // Estados do Laboratório de Cruzamento F1 (Seção 3)
  const [paiId, setPaiId] = useState<string>(reprodutoresCruzamento[0].id);
  const [maeId, setMaeId] = useState<string>(matrizesCruzamento[0].id);

  const linhagemAtiva =
    linhagensGenetica.find((item) => item.id === linhagemAtivaId) ??
    linhagensGenetica[0];

  const resultadoF1 = calcularCruzamentoF1(paiId, maeId);

  // Efeito de transição suave entre a introdução e o quiz
  const handleToggleQuiz = () => {
    setTransitando(true);
    setTimeout(() => {
      setMostrarQuiz((prev) => !prev);
      setOpcaoSelecionada(null);
      setResultado(null);
      setTransitando(false);
    }, 300);
  };

  // Função que lida com a resposta do usuário
  const handleEscolha = (opcao: "esquerda" | "direita") => {
    setOpcaoSelecionada(opcao);
    setResultado(opcao === "esquerda" ? "correto" : "incorreto");
  };

  // Renderiza o card lateral (esquerda ou direita) do Desafio Super Trunfo
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
        className={`rounded-[2.5rem] p-6 sm:p-7 md:p-8 w-full md:w-[37%] flex flex-col justify-between items-center sombra-pop min-h-[380px] md:min-h-[430px] transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-rosa ${
          mostrarQuiz
            ? selecionada
              ? "bg-amarelo-card border-4 border-solid border-rosa ring-4 ring-rosa/25 scale-[1.02] cursor-pointer"
              : "bg-amarelo-card border-4 border-dashed border-rosa/35 cursor-pointer hover:scale-[1.02] hover:border-solid hover:border-rosa"
            : "bg-amarelo-card border-2 border-rosa/15"
        }`}
      >
        {!mostrarQuiz ? (
          <div className="flex flex-col items-center justify-between h-full w-full gap-4">
            <span className="inline-flex items-center gap-1.5 bg-papel text-rosa text-xs font-extrabold px-3.5 py-1 rounded-full border border-rosa/25 shadow-xs">
              <Icone nome="sparkles" className="w-3.5 h-3.5" />
              <span>{dados.genotipo}</span>
            </span>

            <MolduraRecorte
              tamanhoPonto="sm"
              mostrarPontosLaterais={false}
              comFitaAdesiva
              className="bg-papel p-1.5 w-full max-w-[260px]"
            >
              <img
                src={dados.imagem}
                alt={dados.alt}
                className="w-full h-36 sm:h-40 object-cover"
              />
            </MolduraRecorte>

            <p className="text-rosa text-sm sm:text-base md:text-[1.06rem] font-semibold leading-relaxed text-center tracking-tight">
              {dados.textoIntroducao}
            </p>
          </div>
        ) : (
          <div className="flex flex-col w-full text-center">
            <div className="relative w-full h-[200px] md:h-[225px] rounded-[1.8rem] overflow-hidden mb-4 shadow-md border-2 border-rosa/20">
              <img
                src={dados.imagem}
                alt={dados.alt}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 bg-papel/95 text-rosa text-[11px] font-extrabold px-3 py-1 rounded-full border border-rosa/25 shadow-xs">
                {dados.selo}
              </span>
              <span className="absolute bottom-2.5 right-2.5 bg-rosa text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                {dados.genotipo}
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 mb-3">
              <h2 className="text-xl font-bold text-black">{dados.titulo}</h2>
              {selecionada && (
                <span className="inline-flex items-center gap-1 bg-rosa text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                  <span>Escolhida</span>
                  {lado === "esquerda" && (
                    <Icone nome="sparkles" className="w-3.5 h-3.5" />
                  )}
                </span>
              )}
            </div>

            {/* Barras de atributos estilo Super Trunfo Zootécnico */}
            <div className="bg-papel/90 rounded-2xl p-3.5 mb-3 border border-rosa/15 space-y-2.5 text-left">
              {dados.atributosBarras.map((attr) => (
                <div key={attr.rotulo}>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-black/80">{attr.rotulo}</span>
                    <span className="text-rosa font-extrabold">
                      {attr.destaque} ({attr.nivel}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-creme rounded-full overflow-hidden">
                    <div
                      className="h-full bg-rosa rounded-full transition-all duration-700"
                      style={{ width: `${attr.nivel}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <ul className="text-rosa text-left text-xs md:text-sm font-semibold leading-snug space-y-1 mx-auto">
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
    <div className="w-full text-rosa overflow-x-hidden min-h-screen font-sans pb-14 relative">
      {/* Chuva de Confetes Isolada em Componente */}
      <ConfetesCanvas ativo={resultado === "correto"} />

      <div className="max-w-[1250px] mx-auto px-4 md:px-8 pt-10 md:pt-16 space-y-16 md:space-y-24">
        {/* =========================================
            SEÇÃO 1: TÍTULO + DESAFIO SUPER TRUNFO
            ========================================= */}
        <section>
          <AnimarScroll variante="subir">
            <TituloDuplo
              principal="Melhoramento"
              subtitulo="Genético"
              as="h1"
              className="flex flex-col items-center justify-center w-full z-20 mb-4 md:mb-6 select-none"
              tituloClassName="text-[3.1rem] sm:text-[4.5rem] md:text-[7rem] font-bold text-rosa leading-[0.85] md:leading-[0.8] tracking-tighter text-center"
              subtituloClassName="text-[3rem] sm:text-[4.5rem] md:text-[6.5rem] font-serif text-amarelo italic leading-[0.85] -mt-2 md:-mt-6 z-10 text-center"
            />
            <p className="text-center text-rosa font-semibold text-sm sm:text-base max-w-[680px] mx-auto mb-8 md:mb-12">
              Compare as linhagens, teste suas escolhas no Super Trunfo
              Zootécnico e simule cruzamentos reais abaixo!
            </p>
          </AnimarScroll>

          <AnimarScroll
            variante="escala"
            atrasoMs={120}
            className={`flex flex-col md:flex-row items-stretch justify-center gap-6 md:gap-8 w-full transition-all duration-300 ${
              transitando
                ? "opacity-0 translate-y-2 scale-[0.99]"
                : "opacity-100 translate-y-0 scale-100"
            }`}
          >
            {/* CARD DA ESQUERDA (Ovelha de Pelo Ralo / Opção Correta) */}
            {renderCardLateral("esquerda")}

            {/* COLUNA CENTRAL: Botão Inicial ou Pergunta e Feedbacks */}
            <div className="w-full md:w-[26%] flex flex-col justify-center items-center py-4 md:py-0">
              {!mostrarQuiz ? (
                <button
                  type="button"
                  onClick={handleToggleQuiz}
                  aria-label="Ativar teste interativo de melhoramento genético"
                  className="relative bg-papel border-[5px] md:border-[6px] border-amarelo rounded-[2rem] p-7 md:p-9 text-left hover:scale-105 hover:bg-white active:scale-95 transition-all duration-300 sombra-pop group w-[92%] md:w-full focus:outline-none focus:ring-4 focus:ring-rosa/30"
                >
                  <span className="flex items-center justify-center gap-1 text-[11px] font-black uppercase tracking-wider text-rosa bg-amarelo-card/80 px-3 py-1 rounded-full mb-3 border border-rosa/20">
                    <Icone nome="sparkles" className="w-3.5 h-3.5" />
                    <span>Super Trunfo Ovino</span>
                  </span>
                  <p className="text-rosa text-[1.3rem] md:text-[1.45rem] font-bold text-center leading-snug tracking-tight">
                    Clique aqui para testar a sua experiência de melhoramento
                    genético!
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
                      <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-rosa leading-[1.02] tracking-tighter select-none">
                        Qual o melhor
                        <br />
                        reprodutor
                        <br />
                        para leite no
                        <br />
                        clima quente?
                      </h2>
                      <p className="text-xs font-bold text-black/70 mt-4 bg-papel px-3 py-1.5 rounded-full border border-rosa/20">
                        Compare as barras e clique em um card ao lado
                      </p>
                    </div>
                  ) : resultado === "correto" ? (
                    <div className="bg-amarelo-card border-4 border-rosa rounded-3xl p-6 sombra-pop-forte animate-pop-up flex flex-col items-center">
                      <h3 className="inline-flex items-center gap-1.5 text-2xl font-black text-black leading-tight tracking-tight">
                        <span>Acertou em cheio!</span>
                        <Icone nome="sparkles" className="w-6 h-6 text-rosa" />
                      </h3>
                      <p className="text-sm text-black/85 font-semibold mt-3 leading-snug">
                        Excelente escolha! Para melhorar a produção em clima
                        tropical, o ideal é o animal de Pelo Ralo. Ele possui
                        adaptação térmica superior, maior imunidade e transmite
                        alta capacidade láctea para as gerações futuras.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-papel border-4 border-dashed border-rosa rounded-3xl p-6 sombra-pop animate-pop-up flex flex-col items-center">
                      <img
                        src="/assets/calculadora-cher.png"
                        alt="Cher fazendo sinal de X"
                        className="w-16 h-auto mb-2 drop-shadow-md"
                      />
                      <h3 className="text-2xl font-black text-rosa leading-tight tracking-tight">
                        Não é bem esse...
                      </h3>
                      <p className="text-sm text-black/85 font-semibold mt-2.5 leading-snug">
                        Embora o de Pelo Longo seja muito bonito visualmente,
                        suas filhas sofrem mais com o calor e têm produção média
                        em regiões quentes. Tente escolher o outro reprodutor!
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleToggleQuiz}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-rosa/80 hover:text-rosa hover:underline focus:ring-1 focus:ring-rosa px-2 py-1 rounded transition-all mt-2"
                  >
                    <Icone nome="arrow-left" className="w-3.5 h-3.5" />
                    <span>Voltar à Explicação</span>
                  </button>
                </div>
              )}
            </div>

            {/* CARD DA DIREITA (Ovelha de Pelo Longo / Opção Incorreta) */}
            {renderCardLateral("direita")}
          </AnimarScroll>
        </section>

        {/* =========================================
            SEÇÃO 2: GALERIA DE LINHAGENS & PADRÃO RACIAL (NOVAS FOTOS!)
            ========================================= */}
        <section className="pt-4">
          <AnimarScroll
            variante="subir"
            className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 text-center md:text-left"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 bg-rosa text-white text-xs font-bold px-3.5 py-1 rounded-full mb-2">
                <Icone nome="crown" className="w-3.5 h-3.5" />
                <span>Álbum Genético Oficial • Novas Fotos</span>
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-amarelo italic texto-contorno-rosa leading-tight">
                Galeria de Linhagens & DNA
              </h2>
              <p className="text-rosa text-sm sm:text-base font-semibold mt-1">
                Clique em cada ovelha para inspecionar o padrão racial,
                herdabilidade e marcadores genéticos:
              </p>
            </div>
            <Estrela
              className="w-11 h-11 hidden md:block"
              filtroRosa
              velocidadeGiro="lenta"
            />
          </AnimarScroll>

          {/* Miniaturas Estilo Polaroid / Scrapbook das 4 Ovelhas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {linhagensGenetica.map((item, idx) => {
              const ativa = item.id === linhagemAtiva.id;
              return (
                <AnimarScroll
                  key={item.id}
                  variante="colagem"
                  atrasoMs={idx * 110}
                >
                  <button
                    type="button"
                    onClick={() => setLinhagemAtivaId(item.id)}
                    aria-pressed={ativa}
                    className={`w-full h-full text-left rounded-[2rem] p-4 transition-all duration-300 flex flex-col justify-between cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-rosa ${
                      ativa
                        ? "bg-papel border-4 border-rosa sombra-pop-forte -translate-y-1.5"
                        : "bg-amarelo-card/85 hover:bg-amarelo-card border-2 border-rosa/20 sombra-pop-sm hover:-translate-y-1"
                    }`}
                  >
                    <div>
                      <MolduraRecorte
                        tamanhoPonto="sm"
                        mostrarPontosLaterais={false}
                        comFitaAdesiva={ativa}
                        className="bg-white p-1.5 mb-3.5"
                      >
                        <div className="relative w-full h-44 overflow-hidden">
                          <img
                            src={item.imagem}
                            alt={item.nome}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <span className="absolute bottom-2 left-2 bg-rosa text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                            {item.selo}
                          </span>
                        </div>
                      </MolduraRecorte>

                      <span className="text-[11px] font-extrabold text-rosa/80 uppercase tracking-wider block">
                        {item.apelidoClube}
                      </span>
                      <h3 className="text-lg font-extrabold text-black leading-snug mt-0.5">
                        {item.nome}
                      </h3>
                      <p className="text-xs text-black/75 font-medium mt-1.5 leading-relaxed">
                        {item.resumo}
                      </p>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-rosa/15 flex items-center justify-between">
                      <span className="text-[11px] font-black text-rosa bg-papel px-2.5 py-0.5 rounded-full border border-rosa/20">
                        {item.genotipo}
                      </span>
                      <span className="text-xs font-extrabold text-rosa inline-flex items-center gap-1">
                        <span>{ativa ? "Em exibição" : "Ver DNA"}</span>
                        <Icone nome="arrow-right" className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </button>
                </AnimarScroll>
              );
            })}
          </div>

          {/* Painel de Raio-X Genético da Linhagem Selecionada */}
          <AnimarScroll variante="escala">
            <div
              key={linhagemAtiva.id}
              role="region"
              aria-live="polite"
              className="bg-papel border-3 border-rosa rounded-[2.5rem] p-6 sm:p-8 md:p-10 sombra-pop animate-pop-up"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Foto Ampliada com Moldura Scrapbook */}
                <div className="w-full lg:w-[38%] flex justify-center">
                  <MolduraRecorte
                    comFitaAdesiva
                    rotacaoHover
                    className="bg-amarelo-card/40 p-2 sombra-pop-sm max-w-[360px] w-full"
                  >
                    <img
                      src={linhagemAtiva.imagem}
                      alt={linhagemAtiva.nome}
                      className="w-full h-[250px] sm:h-[280px] object-cover"
                    />
                  </MolduraRecorte>
                </div>

                {/* Dados Científicos e Marcadores de DNA */}
                <div className="w-full lg:w-[62%] flex flex-col gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-amarelo-card text-rosa text-xs font-black px-3.5 py-1 rounded-full border border-rosa/25">
                      <Icone nome="sparkles" className="w-3.5 h-3.5" />
                      <span>
                        Ficha de DNA • {linhagemAtiva.genotipo}
                      </span>
                    </span>
                    <span className="text-xs font-extrabold text-rosa bg-rosa/10 px-3 py-1 rounded-full border border-rosa/20">
                      {linhagemAtiva.herdabilidade}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-rosa leading-tight">
                      {linhagemAtiva.nome}
                    </h3>
                    <p className="text-black/85 text-sm sm:text-base font-medium leading-relaxed mt-2">
                      {linhagemAtiva.explicacaoCientifica}
                    </p>
                  </div>

                  {/* Métricas Rápidas da Linhagem */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-amarelo-card/65 border border-rosa/20 rounded-2xl p-3.5">
                      <p className="text-[11px] font-bold text-black/65 uppercase tracking-wider">
                        Produção Média
                      </p>
                      <p className="text-lg font-black text-rosa mt-0.5">
                        {linhagemAtiva.leiteMedio}
                      </p>
                    </div>
                    <div className="bg-amarelo-card/65 border border-rosa/20 rounded-2xl p-3.5">
                      <p className="text-[11px] font-bold text-black/65 uppercase tracking-wider">
                        Tolerância ao Calor
                      </p>
                      <p className="text-sm sm:text-base font-black text-rosa mt-0.5">
                        {linhagemAtiva.toleranciaCalor}
                      </p>
                    </div>
                    <div className="bg-amarelo-card/65 border border-rosa/20 rounded-2xl p-3.5">
                      <p className="text-[11px] font-bold text-black/65 uppercase tracking-wider">
                        Prolificidade
                      </p>
                      <p className="text-sm sm:text-base font-black text-rosa mt-0.5">
                        {linhagemAtiva.prolificidade}
                      </p>
                    </div>
                  </div>

                  {/* Lista de Marcadores */}
                  <div className="bg-creme/60 rounded-2xl p-4 border border-rosa/15">
                    <p className="text-xs font-extrabold text-rosa uppercase tracking-wider mb-2">
                      Destaques Genéticos Transmissíveis às Filhas:
                    </p>
                    <ul className="grid grid-cols-1 gap-1.5 text-xs sm:text-sm font-semibold text-black/85">
                      {linhagemAtiva.marcadoresDna.map((marcador) => (
                        <li
                          key={marcador}
                          className="inline-flex items-center gap-2"
                        >
                          <Icone
                            nome="check"
                            className="w-4 h-4 text-rosa shrink-0"
                          />
                          <span>{marcador}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </AnimarScroll>
        </section>

        {/* =========================================
            SEÇÃO 3: LABORATÓRIO DE CRUZAMENTO GENÉTICO (SIMULADOR F1)
            ========================================= */}
        <section className="pt-2">
          <AnimarScroll variante="subir">
            <div className="bg-xadrez-clueless border-3 border-rosa/30 rounded-[2.8rem] p-6 sm:p-8 md:p-10 sombra-pop">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 text-center md:text-left">
                <div>
                  <span className="inline-flex items-center gap-1.5 bg-rosa text-white text-xs font-bold px-3.5 py-1 rounded-full mb-2">
                    <Icone nome="sparkles" className="w-3.5 h-3.5" />
                    <span>Simulador Interativo ao Vivo • Heterose F1</span>
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-amarelo italic texto-contorno-rosa leading-tight">
                    Laboratório de Cruzamento Genético
                  </h2>
                  <p className="text-black/85 text-sm sm:text-base font-semibold mt-1">
                    Escolha o Reprodutor (Pai) e a Matriz (Mãe) para simular o
                    Vigor Híbrido e o desempenho dos cordeiros F1:
                  </p>
                </div>
                <Estrela className="w-12 h-12 hidden md:block" filtroRosa />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* COLUNA 1: Escolha do Pai (Reprodutor) + Mãe (Matriz) */}
                <div className="lg:col-span-5 flex flex-col gap-5">
                  {/* Seletor do Pai */}
                  <div className="bg-papel/95 border-2 border-rosa/25 rounded-3xl p-5 sombra-pop-sm">
                    <p className="text-xs font-black uppercase tracking-wider text-rosa mb-3 flex items-center gap-1.5">
                      <Icone nome="crown" className="w-4 h-4" />
                      <span>1. Escolha o Reprodutor (Pai):</span>
                    </p>
                    <div className="flex flex-col gap-2.5">
                      {reprodutoresCruzamento.map((pai) => {
                        const selecionado = pai.id === paiId;
                        return (
                          <button
                            key={pai.id}
                            type="button"
                            onClick={() => setPaiId(pai.id)}
                            className={`flex items-center gap-3 p-2.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                              selecionado
                                ? "bg-amarelo-card border-rosa shadow-xs scale-[1.01]"
                                : "bg-white/80 border-rosa/15 hover:border-rosa/40"
                            }`}
                          >
                            <img
                              src={pai.imagem}
                              alt={pai.nome}
                              className="w-13 h-13 rounded-xl object-cover border border-rosa/25 shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-extrabold text-black truncate">
                                {pai.nome}
                              </p>
                              <p className="text-[11px] font-bold text-rosa">
                                {pai.genotipo}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Seletor da Mãe */}
                  <div className="bg-papel/95 border-2 border-rosa/25 rounded-3xl p-5 sombra-pop-sm">
                    <p className="text-xs font-black uppercase tracking-wider text-rosa mb-3 flex items-center gap-1.5">
                      <Icone nome="heart" className="w-4 h-4" />
                      <span>2. Escolha a Matriz (Mãe):</span>
                    </p>
                    <div className="flex flex-col gap-2.5">
                      {matrizesCruzamento.map((mae) => {
                        const selecionada = mae.id === maeId;
                        return (
                          <button
                            key={mae.id}
                            type="button"
                            onClick={() => setMaeId(mae.id)}
                            className={`flex items-center gap-3 p-2.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                              selecionada
                                ? "bg-amarelo-card border-rosa shadow-xs scale-[1.01]"
                                : "bg-white/80 border-rosa/15 hover:border-rosa/40"
                            }`}
                          >
                            <img
                              src={mae.imagem}
                              alt={mae.nome}
                              className="w-13 h-13 rounded-xl object-cover border border-rosa/25 shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-extrabold text-black truncate">
                                {mae.nome}
                              </p>
                              <p className="text-[11px] font-bold text-rosa">
                                {mae.genotipo}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* COLUNA 2: Resultado da Prole F1 */}
                <div className="lg:col-span-7 flex">
                  <div
                    key={`${paiId}-${maeId}`}
                    role="region"
                    aria-live="polite"
                    className="bg-papel border-3 border-rosa rounded-[2.2rem] p-6 sm:p-7 sombra-pop-forte w-full flex flex-col justify-between animate-pop-up"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 bg-rosa text-white text-xs font-black px-3.5 py-1 rounded-full">
                          <Icone nome="sparkles" className="w-3.5 h-3.5" />
                          <span>Projeção da Ninhada (Geração F1)</span>
                        </span>
                        <span className="bg-amarelo-card text-rosa text-xs font-extrabold px-3 py-1 rounded-full border border-rosa/25">
                          {resultadoF1.vigorHibridoBonus}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-5 mb-5">
                        <MolduraRecorte
                          tamanhoPonto="sm"
                          mostrarPontosLaterais={false}
                          comFitaAdesiva
                          className="bg-white p-1.5 shrink-0"
                        >
                          <img
                            src={resultadoF1.imagemFilhote}
                            alt={resultadoF1.tituloNinhada}
                            className="w-40 h-36 object-cover"
                          />
                        </MolduraRecorte>

                        <div className="text-center sm:text-left">
                          <span className="text-xs font-black text-rosa uppercase tracking-wider">
                            {resultadoF1.genotipoFilhote}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-black text-black leading-tight mt-0.5">
                            {resultadoF1.tituloNinhada}
                          </h3>
                          <p className="text-xs sm:text-sm font-bold text-rosa mt-1">
                            Pelagem esperada: {resultadoF1.pelagemResultante}
                          </p>
                          <div className="mt-2.5 inline-flex items-center gap-2 bg-amarelo-card/85 px-3.5 py-1.5 rounded-xl border border-rosa/20">
                            <Icone
                              nome="droplets"
                              className="w-4 h-4 text-rosa"
                            />
                            <span className="text-xs font-extrabold text-black">
                              Potencial das Fêmeas:{" "}
                              <strong className="text-rosa text-sm">
                                ~{resultadoF1.estimativaLitrosDia} L/dia
                              </strong>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Barras de Desempenho Calculadas para a Prole F1 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-creme/65 rounded-2xl p-4 border border-rosa/15 mb-4">
                        {[
                          {
                            rotulo: "Potencial Leiteiro F1",
                            valor: resultadoF1.leiteFinal,
                          },
                          {
                            rotulo: "Tolerância ao Calor (Nordeste)",
                            valor: resultadoF1.calorFinal,
                          },
                          {
                            rotulo: "Rusticidade & Imunidade",
                            valor: resultadoF1.rusticidadeFinal,
                          },
                          {
                            rotulo: "Sólidos p/ Queijo Fino",
                            valor: resultadoF1.solidosFinal,
                          },
                        ].map((metrica) => (
                          <div key={metrica.rotulo}>
                            <div className="flex justify-between text-xs font-bold mb-1">
                              <span className="text-black/80">
                                {metrica.rotulo}
                              </span>
                              <span className="text-rosa font-black">
                                {metrica.valor}%
                              </span>
                            </div>
                            <div className="w-full h-2.5 bg-papel rounded-full overflow-hidden border border-rosa/15">
                              <div
                                className="h-full bg-rosa rounded-full transition-all duration-700"
                                style={{ width: `${metrica.valor}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Veredito Zootécnico da Cher */}
                    <div className="bg-amarelo-card/75 border-2 border-rosa/25 rounded-2xl p-3.5 flex items-center gap-3">
                      <img
                        src="/assets/inicio-cher.png"
                        alt="Cher"
                        className="w-12 h-12 object-contain shrink-0 drop-shadow-sm"
                      />
                      <p className="text-xs sm:text-sm font-semibold text-black/90 leading-snug">
                        <strong className="text-rosa font-extrabold">
                          Veredito das Patricinhas:{" "}
                        </strong>
                        {resultadoF1.vereditoCher}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimarScroll>
        </section>

        {/* =========================================
            SEÇÃO 4: EVOLUÇÃO POR GERAÇÕES (G0 -> F1 -> F2 -> ELITE)
            ========================================= */}
        <section className="pt-2">
          <AnimarScroll
            variante="subir"
            className="flex flex-col items-center text-center mb-10"
          >
            <span className="inline-flex items-center gap-1.5 bg-papel text-rosa text-xs font-extrabold px-3.5 py-1 rounded-full border border-rosa/25 mb-2 shadow-xs">
              <Icone nome="scale" className="w-3.5 h-3.5" />
              <span>Progresso Genético Acumulado</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-amarelo italic texto-contorno-rosa leading-tight">
              Evolução do Rebanho por Gerações
            </h2>
            <p className="text-rosa text-sm sm:text-base font-semibold mt-1 max-w-[650px]">
              Veja como a seleção contínua transforma o rebanho ao longo de 4
              etapas zootécnicas:
            </p>
          </AnimarScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {geracoesEvolucaoGenetica.map((etapa, idx) => (
              <AnimarScroll
                key={etapa.geracao}
                variante="subir"
                atrasoMs={idx * 120}
              >
                <div className="bg-papel/95 border-2 border-rosa/25 rounded-[2rem] p-6 h-full flex flex-col justify-between sombra-pop-sm hover:-translate-y-1.5 transition-transform">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="bg-rosa text-white text-sm font-black px-3.5 py-1 rounded-full shadow-xs">
                        Geração {etapa.geracao}
                      </span>
                      <span className="text-xs font-black text-rosa bg-amarelo-card px-3 py-1 rounded-full border border-rosa/20">
                        {etapa.leiteMedio}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-black leading-snug">
                      {etapa.titulo}
                    </h3>
                    <p className="text-[11px] font-bold text-rosa uppercase tracking-wider mt-1 mb-2.5">
                      {etapa.composicaoGenetica}
                    </p>
                    <p className="text-xs sm:text-sm text-black/80 font-medium leading-relaxed">
                      {etapa.descricao}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-rosa/15">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-black/75">Adaptação Térmica</span>
                      <span className="text-rosa font-black">
                        {etapa.adaptacaoCalor}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-creme rounded-full overflow-hidden">
                      <div
                        className="h-full bg-rosa rounded-full"
                        style={{ width: `${etapa.adaptacaoCalor}%` }}
                      />
                    </div>
                  </div>
                </div>
              </AnimarScroll>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
