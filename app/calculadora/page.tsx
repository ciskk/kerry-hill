"use client";

import { useState } from "react";
import CursorPixel from "@/components/CursorPixel";
import Estrela from "@/components/Estrela";
import Title from "@/components/Title";

export default function Calculadora() {
  const [qtdOvelhas, setQtdOvelhas] = useState("");
  const [consumoRacao, setConsumoRacao] = useState("");
  const [qtdLactacao, setQtdLactacao] = useState("");
  const [producaoLeite, setProducaoLeite] = useState("");
  
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [erro, setErro] = useState("");
  const [copiado, setCopiado] = useState(false);

  const numOvelhas = parseFloat(qtdOvelhas) || 0;
  const numConsumo = parseFloat(consumoRacao.replace(",", ".")) || 0;
  const numLactacao = parseFloat(qtdLactacao) || 0;
  const numLeite = parseFloat(producaoLeite.replace(",", ".")) || 0;

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
      setErro("A quantidade de ovelhas em lactação não pode ser maior que o total do rebanho!");
      setMostrarResultados(false);
      return;
    }

    setErro("");
    setMostrarResultados(true);
  };

  // Cálculos formatados em PT-BR (vírgula decimal) e coerentes com a página de Leite
  const racaoTotal = (numOvelhas * numConsumo).toFixed(1).replace(".", ",");
  const ovelhasSecas = Math.max(0, numOvelhas - numLactacao);
  const aguaTotal = (ovelhasSecas * 5 + numLactacao * 10).toFixed(0);
  const leiteTotal = (numLactacao * numLeite).toFixed(1).replace(".", ",");

  // Cópia de relatório com Clipboard API moderna e fallback
  const handleCopiarRelatorio = async () => {
    const relatorioTexto = 
`RELATÓRIO DE MANEJO KERRY HILL
----------------------------------------
Parâmetros Informados:
- Total de Ovelhas: ${qtdOvelhas} animais
- Consumo Médio de Ração: ${consumoRacao.replace(".", ",")} kg/dia
- Ovelhas em Lactação: ${qtdLactacao} animais
- Produção Média de Leite: ${producaoLeite.replace(".", ",")} L/dia

Estimativas Diárias Calculadas:
- Ração Total Necessária: ${racaoTotal} kg por dia
- Consumo de Água Estimado: ${aguaTotal} litros por dia (5 L/ovelha + 10 L/lactante)
- Produção de Leite Total: ${leiteTotal} litros por dia
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
    <div className="w-full bg-creme text-rosa overflow-x-hidden min-h-screen font-sans pb-20">
      
      <div className="max-w-[1100px] mx-auto px-4 md:px-8 pt-10 md:pt-20">
        
        <Title mainText="Calculadoras" subText="Ração, Água e Produção" variant="pink" />

        <div className="flex flex-col md:flex-row items-stretch justify-between gap-10 md:gap-12 w-full px-0 md:px-8">
          
          {/* LADO ESQUERDO: Formulário */}
          <div className="w-full md:w-[50%] flex flex-col relative z-20">
            <h3 className="text-rosa text-xl sm:text-2xl md:text-3xl font-medium mb-4 md:mb-6 tracking-tight ml-2 md:ml-4">
              insira as seguintes informações:
            </h3>
            
            <form onSubmit={handleCalcular} noValidate className="bg-amarelo-card rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-sm flex flex-col gap-6 relative">
              
              <CursorPixel
                className="absolute top-1/2 -right-8 w-10 h-10 md:w-12 md:h-12 z-30 pointer-events-none animate-pulse hidden md:block"
                svgClassName="transform -rotate-45"
              />

              {erro && (
                <div role="alert" className="bg-papel border-2 border-dashed border-rosa text-rosa p-4 rounded-2xl text-sm font-bold">
                  {erro}
                </div>
              )}

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                <label htmlFor="qtdOvelhas" className="text-rosa text-lg md:text-xl font-bold tracking-tight">Qtd. de Ovelhas:</label>
                <input 
                  id="qtdOvelhas"
                  type="number" 
                  required
                  min="1"
                  value={qtdOvelhas}
                  onChange={(e) => setQtdOvelhas(e.target.value)}
                  className="bg-transparent border-b-2 border-rosa/40 focus:border-rosa focus:bg-rosa/5 focus:ring-2 focus:ring-rosa/20 focus:outline-none rounded px-2 text-rosa font-bold text-xl w-full md:w-24 text-center transition-all"
                  placeholder="Ex: 20"
                />
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                <label htmlFor="consumoRacao" className="text-rosa text-lg md:text-xl font-bold tracking-tight">Consumo médio de ração por animal:</label>
                <div className="flex items-center w-full md:w-auto">
                  <input 
                    id="consumoRacao"
                    type="number" 
                    step="0.1"
                    required
                    min="0.1"
                    value={consumoRacao}
                    onChange={(e) => setConsumoRacao(e.target.value)}
                    className="bg-transparent border-b-2 border-rosa/40 focus:border-rosa focus:bg-rosa/5 focus:ring-2 focus:ring-rosa/20 focus:outline-none rounded px-2 text-rosa font-bold text-xl w-full md:w-20 text-center transition-all"
                    placeholder="1,5"
                  />
                  <span className="text-rosa font-bold ml-2">kg/dia</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                <label htmlFor="qtdLactacao" className="text-rosa text-lg md:text-xl font-bold tracking-tight">Qtd. de Ovelhas em Lactação:</label>
                <input 
                  id="qtdLactacao"
                  type="number" 
                  required
                  min="0"
                  max={qtdOvelhas || undefined}
                  value={qtdLactacao}
                  onChange={(e) => setQtdLactacao(e.target.value)}
                  className="bg-transparent border-b-2 border-rosa/40 focus:border-rosa focus:bg-rosa/5 focus:ring-2 focus:ring-rosa/20 focus:outline-none rounded px-2 text-rosa font-bold text-xl w-full md:w-24 text-center transition-all"
                  placeholder="Ex: 8"
                />
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                <label htmlFor="producaoLeite" className="text-rosa text-lg md:text-xl font-bold tracking-tight">Produção média de leite por ovelha:</label>
                <div className="flex items-center w-full md:w-auto">
                  <input 
                    id="producaoLeite"
                    type="number" 
                    step="0.1"
                    required
                    min="0"
                    value={producaoLeite}
                    onChange={(e) => setProducaoLeite(e.target.value)}
                    className="bg-transparent border-b-2 border-rosa/40 focus:border-rosa focus:bg-rosa/5 focus:ring-2 focus:ring-rosa/20 focus:outline-none rounded px-2 text-rosa font-bold text-xl w-full md:w-20 text-center transition-all"
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
          </div>

          {/* LADO DIREITO */}
          <div className="w-full md:w-[45%] flex justify-center items-center relative mt-4 md:mt-0 min-h-[360px] md:min-h-[400px]">
            
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
                className="bg-amarelo-card rounded-[2.5rem] p-8 md:p-10 shadow-md flex flex-col items-center justify-center w-full min-h-[400px] animate-fade-in-right relative"
              >
                
                <button 
                  onClick={() => setMostrarResultados(false)}
                  className="absolute top-6 right-6 text-rosa font-bold text-sm hover:underline opacity-80 hover:opacity-100 transition-all focus:outline-none focus:ring-2 focus:ring-rosa rounded px-1"
                >
                  Refazer
                </button>

                <h3 
                  className="text-[3.2rem] md:text-[4.2rem] font-serif text-amarelo italic leading-none mb-6 text-center select-none"
                  style={{ textShadow: "2px 2px 0px #D03C7A, -1px -1px 0px #D03C7A, 1px -1px 0px #D03C7A, -1px 1px 0px #D03C7A" }}
                >
                  Resultados:
                </h3>

                <div className="flex flex-col gap-5 text-center w-full">
                  <div>
                    <p className="text-rosa text-lg md:text-xl font-bold tracking-tight">Ração total necessária:</p>
                    <p className="text-rosa text-2xl md:text-3xl font-black mt-0.5">{racaoTotal} kg por dia</p>
                  </div>

                  <div>
                    <p className="text-rosa text-lg md:text-xl font-bold tracking-tight">Quantidade de água recomendada:</p>
                    <p className="text-rosa text-2xl md:text-3xl font-black mt-0.5">{aguaTotal} litros por dia</p>
                    <p className="text-rosa/75 text-xs font-semibold mt-0.5">
                      (5 L por ovelha seca + 10 L por ovelha lactante)
                    </p>
                  </div>

                  <div>
                    <p className="text-rosa text-lg md:text-xl font-bold tracking-tight">Produção diária total de leite:</p>
                    <p className="text-rosa text-2xl md:text-3xl font-black mt-0.5">{leiteTotal} litros por dia</p>
                  </div>
                </div>

                {/* Botão de Cópia Adicional */}
                <button
                  type="button"
                  onClick={handleCopiarRelatorio}
                  className={`mt-7 px-6 py-2.5 rounded-full font-bold text-sm shadow-md transition-all flex items-center gap-2 active:scale-95 relative z-10
                    ${copiado 
                      ? "bg-rosa-escuro text-white ring-2 ring-rosa/40" 
                      : "bg-rosa text-white hover:bg-rosa-escuro"
                    }`}
                >
                  {copiado ? "Copiado! ✨" : "Copiar Relatório 📋"}
                </button>

                {/* Sticker da Cher acompanhando o card de resultados */}
                <img
                  src="/assets/calculadora-cher.png"
                  alt=""
                  aria-hidden="true"
                  className="w-[80px] md:w-[105px] h-auto absolute -bottom-3 -right-2 md:-right-5 drop-shadow-xl pointer-events-none select-none"
                />

              </div>
            )}
            
          </div>

        </div>

      </div>
    </div>
  );
}
