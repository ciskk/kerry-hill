"use client";

import { useState } from "react";
import AnimarScroll from "@/components/AnimarScroll";
import CursorPixel from "@/components/CursorPixel";
import Estrela from "@/components/Estrela";
import Icone from "@/components/Icone";
import TituloDuplo from "@/components/TituloDuplo";
import { CenarioCalculadora, cenariosCalculadora } from "@/data/conteudos";
import { useRebanho } from "@/hooks/useRebanho";
import { formatarNumeroPtBr, lerNumeroPtBr } from "@/lib/formatadores";

export default function Calculadora() {
  const { totalAnimais, totalMatrizes, mediaLeitePorMatriz } = useRebanho();

  const [qtdOvelhas, setQtdOvelhas] = useState("");
  const [consumoRacao, setConsumoRacao] = useState("");
  const [qtdLactacao, setQtdLactacao] = useState("");
  const [producaoLeite, setProducaoLeite] = useState("");
  const [periodo, setPeriodo] = useState<"dia" | "mes">("dia");

  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [erro, setErro] = useState("");
  const [copiado, setCopiado] = useState(false);

  const numOvelhas = lerNumeroPtBr(qtdOvelhas);
  const numConsumo = lerNumeroPtBr(consumoRacao);
  const numLactacao = lerNumeroPtBr(qtdLactacao);
  const numLeite = lerNumeroPtBr(producaoLeite);

  // Aplica um cenário pronto com 1 clique para agilizar a apresentação
  const handleAplicarCenario = (cenario: CenarioCalculadora) => {
    setQtdOvelhas(cenario.qtdOvelhas);
    setConsumoRacao(cenario.consumoRacao.replace(",", "."));
    setQtdLactacao(cenario.qtdLactacao);
    setProducaoLeite(cenario.producaoLeite.replace(",", "."));
    setErro("");
    setMostrarResultados(true);
  };

  // Importa os dados reais cadastrados na aba /registro
  const handleImportarRebanho = () => {
    const ovelhas = String(Math.max(1, totalAnimais));
    const lactantes = String(totalMatrizes);
    const leiteMedio = mediaLeitePorMatriz.replace(",", ".");
    setQtdOvelhas(ovelhas);
    setConsumoRacao("1.5");
    setQtdLactacao(lactantes);
    setProducaoLeite(leiteMedio);
    setErro("");
    setMostrarResultados(true);
  };

  const handleCalcular = (e: React.FormEvent) => {
    e.preventDefault();

    if (!qtdOvelhas || !consumoRacao || qtdLactacao === "" || !producaoLeite) {
      setErro("Por favor, preencha todos os campos para calcular!");
      setMostrarResultados(false);
      return;
    }

    if (numOvelhas <= 0 || numConsumo <= 0 || numLactacao < 0 || numLeite < 0) {
      setErro("Insira valores maiores que zero para o rebanho e o consumo!");
      setMostrarResultados(false);
      return;
    }

    if (numLactacao > numOvelhas) {
      setErro(
        "A quantidade de ovelhas em lactação não pode ser maior que o total do rebanho!"
      );
      setMostrarResultados(false);
      return;
    }

    setErro("");
    setMostrarResultados(true);
  };

  // Multiplicador de período (1 dia vs 30 dias)
  const fatorPeriodo = periodo === "dia" ? 1 : 30;
  const sufixoPeriodo = periodo === "dia" ? "por dia" : "por mês (30d)";

  // Cálculos formatados em PT-BR e conectados à página de Leite (4,5 L = 1 kg de queijo)
  const racaoTotal = formatarNumeroPtBr(
    numOvelhas * numConsumo * fatorPeriodo,
    1
  );
  const ovelhasSecas = Math.max(0, numOvelhas - numLactacao);
  const aguaTotal = formatarNumeroPtBr(
    (ovelhasSecas * 5 + numLactacao * 10) * fatorPeriodo,
    0
  );
  const leiteTotalNumero = numLactacao * numLeite * fatorPeriodo;
  const leiteTotal = formatarNumeroPtBr(leiteTotalNumero, 1);
  const queijoEstimadoKg = formatarNumeroPtBr(leiteTotalNumero / 4.5, 1);
  const pctLactantes =
    numOvelhas > 0 ? Math.round((numLactacao / numOvelhas) * 100) : 0;

  const handleCopiarRelatorio = async () => {
    const relatorioTexto = `RELATÓRIO DE MANEJO KERRY HILL (${
      periodo === "dia" ? "DIÁRIO" : "MENSAL - 30 DIAS"
    })
----------------------------------------
Parâmetros Informados:
- Total de Ovelhas: ${qtdOvelhas} animais (${pctLactantes}% em lactação)
- Consumo Médio de Ração: ${consumoRacao.replace(".", ",")} kg/dia
- Ovelhas em Lactação: ${qtdLactacao} animais
- Produção Média de Leite: ${producaoLeite.replace(".", ",")} L/dia

Estimativas Calculadas (${sufixoPeriodo}):
- Ração Total Necessária: ${racaoTotal} kg ${sufixoPeriodo}
- Consumo de Água Estimado: ${aguaTotal} litros ${sufixoPeriodo} (5 L/seca + 10 L/lactante)
- Produção de Leite Total: ${leiteTotal} litros ${sufixoPeriodo}
- Rendimento em Queijo Fino: ~${queijoEstimadoKg} kg ${sufixoPeriodo} (4,5 L/kg)
----------------------------------------
Gerado na Calculadora Kerry Hill!`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(relatorioTexto);
      } else {
        const tempTextArea = document.createElement("textarea");
        tempTextArea.value = relatorioTexto;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand("copy");
        document.body.removeChild(tempTextArea);
      }
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch (err) {
      console.error("Não foi possível copiar o relatório", err);
    }
  };

  return (
    <div className="w-full text-rosa overflow-x-hidden min-h-screen font-sans pb-14">
      <div className="max-w-[1100px] mx-auto px-4 md:px-8 pt-10 md:pt-20">
        <AnimarScroll variante="subir">
          <TituloDuplo
            principal="Calculadoras"
            subtitulo="Ração, Água e Produção"
            as="h1"
            className="flex flex-col relative z-20 w-full text-center md:text-left mb-8 md:mb-10 pl-0 md:pl-8 select-none"
          />
        </AnimarScroll>

        {/* Barra de Preenchimento Rápido para Apresentação */}
        <AnimarScroll variante="escala" atrasoMs={80}>
          <div className="bg-papel/95 border-2 border-rosa/20 rounded-2xl p-3.5 sm:p-4 mb-8 mx-0 md:mx-8 sombra-pop-sm flex flex-wrap items-center justify-between gap-2.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-rosa uppercase tracking-wider">
              <Icone nome="sparkles" className="w-4 h-4" />
              <span>Preenchimento Rápido:</span>
            </span>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleImportarRebanho}
                className="inline-flex items-center gap-1.5 bg-rosa text-white text-xs font-bold px-3.5 py-1.5 rounded-full hover:bg-rosa-escuro active:scale-95 transition-all shadow-xs"
              >
                <Icone nome="tag" className="w-3.5 h-3.5" />
                <span>Usar Meu Rebanho ({totalAnimais} animais)</span>
              </button>

              {cenariosCalculadora.map((cenario) => (
                <button
                  key={cenario.id}
                  type="button"
                  onClick={() => handleAplicarCenario(cenario)}
                  className="bg-amarelo-card/75 hover:bg-amarelo-card text-rosa border border-rosa/20 text-xs font-bold px-3 py-1.5 rounded-full transition-all active:scale-95"
                >
                  {cenario.rotulo}
                </button>
              ))}
            </div>
          </div>
        </AnimarScroll>

        <div className="flex flex-col md:flex-row items-stretch justify-between gap-10 md:gap-12 w-full px-0 md:px-8">
          {/* LADO ESQUERDO: Formulário */}
          <AnimarScroll
            variante="esquerda"
            atrasoMs={140}
            className="w-full md:w-[50%] flex flex-col relative z-20"
          >
            <h2 className="text-rosa text-xl sm:text-2xl md:text-3xl font-medium mb-4 md:mb-6 tracking-tight ml-2 md:ml-4">
              insira as seguintes informações:
            </h2>

            <form
              onSubmit={handleCalcular}
              noValidate
              className="bg-amarelo-card rounded-[2.5rem] p-6 sm:p-8 md:p-10 sombra-pop border-2 border-rosa/15 flex flex-col gap-6 relative"
            >
              <CursorPixel
                className="absolute top-1/2 -right-8 w-10 h-10 md:w-12 md:h-12 z-30 pointer-events-none animate-pulse hidden md:block"
                svgClassName="transform -rotate-45"
              />

              {erro && (
                <div
                  role="alert"
                  className="bg-papel border-2 border-dashed border-rosa text-rosa p-4 rounded-2xl text-sm font-bold"
                >
                  {erro}
                </div>
              )}

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                <label
                  htmlFor="qtdOvelhas"
                  className="text-rosa text-lg md:text-xl font-bold tracking-tight"
                >
                  Qtd. de Ovelhas:
                </label>
                <input
                  id="qtdOvelhas"
                  type="number"
                  required
                  min="1"
                  value={qtdOvelhas}
                  onChange={(e) => setQtdOvelhas(e.target.value)}
                  className="bg-papel/80 border-b-2 border-rosa/40 focus:border-rosa focus:bg-white focus:ring-2 focus:ring-rosa/20 focus:outline-none rounded-lg px-2 py-1 text-rosa font-bold text-xl w-full md:w-24 text-center transition-all"
                  placeholder="Ex: 20"
                />
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                <label
                  htmlFor="consumoRacao"
                  className="text-rosa text-lg md:text-xl font-bold tracking-tight"
                >
                  Consumo médio de ração por animal:
                </label>
                <div className="flex items-center w-full md:w-auto">
                  <input
                    id="consumoRacao"
                    type="number"
                    step="0.1"
                    required
                    min="0.1"
                    value={consumoRacao}
                    onChange={(e) => setConsumoRacao(e.target.value)}
                    className="bg-papel/80 border-b-2 border-rosa/40 focus:border-rosa focus:bg-white focus:ring-2 focus:ring-rosa/20 focus:outline-none rounded-lg px-2 py-1 text-rosa font-bold text-xl w-full md:w-20 text-center transition-all"
                    placeholder="1,5"
                  />
                  <span className="text-rosa font-bold ml-2">kg/dia</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                <label
                  htmlFor="qtdLactacao"
                  className="text-rosa text-lg md:text-xl font-bold tracking-tight"
                >
                  Qtd. de Ovelhas em Lactação:
                </label>
                <input
                  id="qtdLactacao"
                  type="number"
                  required
                  min="0"
                  max={qtdOvelhas || undefined}
                  value={qtdLactacao}
                  onChange={(e) => setQtdLactacao(e.target.value)}
                  className="bg-papel/80 border-b-2 border-rosa/40 focus:border-rosa focus:bg-white focus:ring-2 focus:ring-rosa/20 focus:outline-none rounded-lg px-2 py-1 text-rosa font-bold text-xl w-full md:w-24 text-center transition-all"
                  placeholder="Ex: 8"
                />
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                <label
                  htmlFor="producaoLeite"
                  className="text-rosa text-lg md:text-xl font-bold tracking-tight"
                >
                  Produção média de leite por ovelha:
                </label>
                <div className="flex items-center w-full md:w-auto">
                  <input
                    id="producaoLeite"
                    type="number"
                    step="0.1"
                    required
                    min="0"
                    value={producaoLeite}
                    onChange={(e) => setProducaoLeite(e.target.value)}
                    className="bg-papel/80 border-b-2 border-rosa/40 focus:border-rosa focus:bg-white focus:ring-2 focus:ring-rosa/20 focus:outline-none rounded-lg px-2 py-1 text-rosa font-bold text-xl w-full md:w-20 text-center transition-all"
                    placeholder="1,2"
                  />
                  <span className="text-rosa font-bold ml-2">L/dia</span>
                </div>
              </div>

              <div className="mt-4 flex justify-center md:justify-end">
                <button
                  type="submit"
                  className="bg-rosa text-creme font-bold text-lg px-8 py-3 rounded-full hover:bg-rosa-escuro hover:scale-105 active:scale-95 transition-all shadow-md"
                >
                  Calcular
                </button>
              </div>
            </form>
          </AnimarScroll>

          {/* LADO DIREITO: Cher ou Resultados */}
          <AnimarScroll
            variante="direita"
            atrasoMs={200}
            className="w-full md:w-[45%] flex justify-center items-center relative mt-4 md:mt-0 min-h-[360px] md:min-h-[400px]"
          >
            {!mostrarResultados ? (
              <div className="relative flex justify-center items-center w-full h-full animate-fade-in-right">
                <div className="absolute z-0 w-[230px] h-[230px] md:w-[350px] md:h-[350px] flex justify-center items-center -mr-4 md:-mr-16 mt-8 pointer-events-none">
                  <Estrela
                    ariaHidden
                    filtroRosa
                    velocidadeGiro="lenta"
                    className="w-full h-full opacity-90"
                  />
                </div>

                <img
                  src="/assets/calculadora-cher.png"
                  alt="Cher fazendo sinal de X"
                  className="relative z-10 w-[210px] md:w-[280px] h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            ) : (
              <div
                role="region"
                aria-live="polite"
                className="bg-amarelo-card border-2 border-rosa/25 rounded-[2.5rem] p-6 sm:p-8 sombra-pop flex flex-col items-center justify-center w-full min-h-[440px] animate-fade-in-right relative"
              >
                <div className="flex items-center justify-between w-full mb-3">
                  {/* Alternador Diário vs Mensal */}
                  <div className="inline-flex bg-papel/90 p-1 rounded-full border border-rosa/20">
                    {(["dia", "mes"] as const).map((op) => {
                      const ativo = periodo === op;
                      return (
                        <button
                          key={op}
                          type="button"
                          onClick={() => setPeriodo(op)}
                          className={`px-3 py-1 rounded-full text-xs font-extrabold transition-all ${
                            ativo
                              ? "bg-rosa text-white shadow-xs"
                              : "text-rosa hover:bg-white/60"
                          }`}
                        >
                          {op === "dia" ? "Por Dia" : "Por Mês (30d)"}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => setMostrarResultados(false)}
                    className="text-rosa font-bold text-xs sm:text-sm hover:underline opacity-85 hover:opacity-100 transition-all focus:outline-none focus:ring-2 focus:ring-rosa rounded px-1"
                  >
                    Refazer
                  </button>
                </div>

                <h3 className="text-[2.8rem] md:text-[3.6rem] font-serif text-amarelo italic leading-none mb-4 text-center select-none texto-contorno-rosa">
                  Resultados:
                </h3>

                {/* Barra Visual de Proporção do Rebanho */}
                <div className="w-full bg-papel/85 rounded-2xl p-3 mb-4 border border-rosa/15">
                  <div className="flex justify-between text-[11px] font-extrabold text-rosa mb-1">
                    <span>Lactantes: {numLactacao} ({pctLactantes}%)</span>
                    <span>Secas: {ovelhasSecas} ({100 - pctLactantes}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-creme rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-rosa transition-all duration-500"
                      style={{ width: `${pctLactantes}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3.5 text-center w-full">
                  <div>
                    <p className="text-rosa text-sm md:text-base font-bold tracking-tight">
                      Ração total necessária:
                    </p>
                    <p className="text-rosa text-2xl md:text-3xl font-black">
                      {racaoTotal} kg {sufixoPeriodo}
                    </p>
                  </div>

                  <div>
                    <p className="text-rosa text-sm md:text-base font-bold tracking-tight">
                      Quantidade de água recomendada:
                    </p>
                    <p className="text-rosa text-2xl md:text-3xl font-black">
                      {aguaTotal} litros {sufixoPeriodo}
                    </p>
                    <p className="text-rosa/75 text-xs font-semibold">
                      (5 L por ovelha seca + 10 L por ovelha lactante)
                    </p>
                  </div>

                  <div>
                    <p className="text-rosa text-sm md:text-base font-bold tracking-tight">
                      Produção total de leite:
                    </p>
                    <p className="text-rosa text-2xl md:text-3xl font-black">
                      {leiteTotal} litros {sufixoPeriodo}
                    </p>
                  </div>

                  {/* Rendimento em Queijo Artesanal conectado à página de Leite */}
                  <div className="bg-papel/90 border border-rosa/20 rounded-2xl p-3 mt-0.5">
                    <p className="text-xs font-extrabold text-rosa uppercase tracking-wider">
                      Potencial em Queijo Ovino Artesanal:
                    </p>
                    <p className="text-xl font-black text-rosa mt-0.5">
                      ~{queijoEstimadoKg} kg de queijo {sufixoPeriodo}
                    </p>
                    <p className="text-[11px] font-semibold text-black/65">
                      Alto teor de sólidos: apenas ~4,5 L por kg de queijo!
                    </p>
                  </div>
                </div>

                {/* Botão de Cópia Adicional */}
                <button
                  type="button"
                  onClick={handleCopiarRelatorio}
                  className={`mt-5 px-6 py-2.5 rounded-full font-bold text-sm shadow-md transition-all flex items-center gap-2 active:scale-95 relative z-10
                    ${
                      copiado
                        ? "bg-rosa-escuro text-white ring-2 ring-rosa/40"
                        : "bg-rosa text-white hover:bg-rosa-escuro"
                    }`}
                >
                  <span>{copiado ? "Copiado!" : "Copiar Relatório"}</span>
                  <Icone
                    nome={copiado ? "check" : "clipboard-list"}
                    className="w-4 h-4"
                  />
                </button>

                {/* Sticker da Cher acompanhando o card de resultados */}
                <img
                  src="/assets/calculadora-cher.png"
                  alt=""
                  aria-hidden="true"
                  className="w-[75px] md:w-[95px] h-auto absolute -bottom-3 -right-2 md:-right-4 drop-shadow-xl pointer-events-none select-none"
                />
              </div>
            )}
          </AnimarScroll>
        </div>
      </div>
    </div>
  );
}
