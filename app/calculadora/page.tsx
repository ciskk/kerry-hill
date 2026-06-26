"use client";

import { useState } from "react";
import Title from "@/components/Title";

export default function Calculadora() {
  const [qtdOvelhas, setQtdOvelhas] = useState("");
  const [consumoRacao, setConsumoRacao] = useState("");
  const [qtdLactacao, setQtdLactacao] = useState("");
  const [producaoLeite, setProducaoLeite] = useState("");
  
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [erro, setErro] = useState("");
  const [copiado, setCopiado] = useState(false);

  const handleCalcular = (e: React.FormEvent) => {
    e.preventDefault();
    if (qtdOvelhas && consumoRacao && qtdLactacao && producaoLeite) {
      setErro("");
      setMostrarResultados(true);
    } else {
      setErro("Por favor, preencha todos os campos para calcular!");
    }
  };

  const racaoTotal = (parseFloat(qtdOvelhas) * parseFloat(consumoRacao.replace(",", "."))).toFixed(1);
  const aguaTotal = (parseFloat(qtdOvelhas) * 5).toFixed(0);
  const leiteTotal = (parseFloat(qtdLactacao) * parseFloat(producaoLeite.replace(",", "."))).toFixed(1);

  // Função robusta de cópia de texto adaptada para iFrames e navegadores
  const handleCopiarRelatorio = () => {
    const relatorioTexto = 
`RELATÓRIO DE MANEJO KERRY HILL
----------------------------------------
Parâmetros Informados:
- Total de Ovelhas: ${qtdOvelhas} animais
- Consumo Médio de Ração: ${consumoRacao} kg/dia
- Ovelhas em Lactação: ${qtdLactacao} animais
- Produção Média de Leite: ${producaoLeite} L/dia

Estimativas Diárias Calculadas:
- Ração Total Necessária: ${racaoTotal} kg por dia
- Consumo de Água Estimado: ${aguaTotal} litros por dia
- Produção de Leite Total: ${leiteTotal} litros por dia
----------------------------------------
Gerado na Calculadora Kerry Hill!`;

    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = relatorioTexto;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    
    try {
      document.execCommand('copy');
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch (err) {
      console.error("Não foi possível copiar o relatório", err);
    }
    
    document.body.removeChild(tempTextArea);
  };

  return (
    <div className="w-full bg-[#EAE7D6] text-[#D03C7A] overflow-x-hidden min-h-screen font-sans pb-24">
      
      <style>{`
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-right {
          animation: fadeInRight 0.6s ease-out forwards;
        }
      `}</style>

      <div className="max-w-[1100px] mx-auto px-4 md:px-8 pt-20 md:pt-32">
        
        <Title mainText="Calculadoras" subText="Ração, Água e Produção" variant="pink" />

        <div className="flex flex-col md:flex-row items-stretch justify-between gap-12 w-full px-0 md:px-8">
          
          {/* LADO ESQUERDO: Formulário */}
          <div className="w-full md:w-[50%] flex flex-col relative z-20">
            <h3 className="text-[#D03C7A] text-2xl md:text-3xl font-medium mb-6 tracking-tight ml-4">
              insira as seguintes informações:
            </h3>
            
            <form onSubmit={handleCalcular} className="bg-[#E6D48A] rounded-[2.5rem] p-8 md:p-10 shadow-sm flex flex-col gap-6 relative">
              
              <div className="absolute top-1/2 -right-8 w-10 h-10 md:w-12 md:h-12 z-30 pointer-events-none animate-pulse hidden md:block">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform -rotate-45">
                  <path d="M4 0L4 16L8 12L11.5 19L14 18L10.5 11L16 11L4 0Z" fill="white" stroke="black" strokeWidth="1.5" strokeLinejoin="miter"/>
                </svg>
              </div>

              {erro && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-700 p-4 rounded-xl text-sm font-semibold">
                  {erro}
                </div>
              )}

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                <label htmlFor="qtdOvelhas" className="text-[#D03C7A] text-xl font-bold tracking-tight">Qtd. de Ovelhas:</label>
                <input 
                  id="qtdOvelhas"
                  type="number" 
                  required
                  min="0"
                  value={qtdOvelhas}
                  onChange={(e) => setQtdOvelhas(e.target.value)}
                  className="bg-transparent border-b-2 border-[#D03C7A]/40 focus:border-[#D03C7A] focus:bg-[#D03C7A]/5 focus:ring-2 focus:ring-[#D03C7A]/20 focus:outline-none rounded px-2 text-[#D03C7A] font-bold text-xl w-full md:w-24 text-center transition-all"
                  placeholder="Ex: 20"
                />
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                <label htmlFor="consumoRacao" className="text-[#D03C7A] text-xl font-bold tracking-tight">Consumo médio de ração por animal:</label>
                <div className="flex items-center w-full md:w-auto">
                  <input 
                    id="consumoRacao"
                    type="number" 
                    step="0.1"
                    required
                    min="0"
                    value={consumoRacao}
                    onChange={(e) => setConsumoRacao(e.target.value)}
                    className="bg-transparent border-b-2 border-[#D03C7A]/40 focus:border-[#D03C7A] focus:bg-[#D03C7A]/5 focus:ring-2 focus:ring-[#D03C7A]/20 focus:outline-none rounded px-2 text-[#D03C7A] font-bold text-xl w-full md:w-20 text-center transition-all"
                    placeholder="1,5"
                  />
                  <span className="text-[#D03C7A] font-bold ml-2">kg/dia</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                <label htmlFor="qtdLactacao" className="text-[#D03C7A] text-xl font-bold tracking-tight">Qtd. de Ovelhas em Lactação:</label>
                <input 
                  id="qtdLactacao"
                  type="number" 
                  required
                  min="0"
                  value={qtdLactacao}
                  onChange={(e) => setQtdLactacao(e.target.value)}
                  className="bg-transparent border-b-2 border-[#D03C7A]/40 focus:border-[#D03C7A] focus:bg-[#D03C7A]/5 focus:ring-2 focus:ring-[#D03C7A]/20 focus:outline-none rounded px-2 text-[#D03C7A] font-bold text-xl w-full md:w-24 text-center transition-all"
                  placeholder="Ex: 8"
                />
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                <label htmlFor="producaoLeite" className="text-[#D03C7A] text-xl font-bold tracking-tight">Produção média de leite por ovelha:</label>
                <div className="flex items-center w-full md:w-auto">
                  <input 
                    id="producaoLeite"
                    type="number" 
                    step="0.1"
                    required
                    min="0"
                    value={producaoLeite}
                    onChange={(e) => setProducaoLeite(e.target.value)}
                    className="bg-transparent border-b-2 border-[#D03C7A]/40 focus:border-[#D03C7A] focus:bg-[#D03C7A]/5 focus:ring-2 focus:ring-[#D03C7A]/20 focus:outline-none rounded px-2 text-[#D03C7A] font-bold text-xl w-full md:w-20 text-center transition-all"
                    placeholder="1,2"
                  />
                  <span className="text-[#D03C7A] font-bold ml-2">L/dia</span>
                </div>
              </div>

              <div className="mt-4 flex justify-center md:justify-end">
                <button 
                  type="submit"
                  className="bg-[#D03C7A] text-[#EAE7D6] font-bold text-lg px-8 py-3 rounded-full hover:bg-[#b03065] hover:scale-105 active:scale-95 transition-all shadow-md"
                >
                  Calcular
                </button>
              </div>

            </form>
          </div>

          {/* LADO DIREITO */}
          <div className="w-full md:w-[45%] flex justify-center items-center relative mt-12 md:mt-0 min-h-[400px]">
            
            {!mostrarResultados ? (
              <div className="relative flex justify-center items-center w-full h-full animate-fade-in-right">
                <div className="absolute z-0 w-[250px] h-[250px] md:w-[350px] md:h-[350px] flex justify-center items-center -mr-16 mt-10">
                  <svg viewBox="0 0 100 100" aria-hidden="true" className="w-full h-full fill-[#D03C7A] opacity-90 animate-[spin_30s_linear_infinite]">
                    <polygon points="50,0 60,35 95,20 65,45 100,65 60,60 50,100 40,60 0,65 35,45 5,20 40,35" />
                  </svg>
                </div>

                <img 
                  src="/assets/calculadora-cher.png" 
                  alt="Cher a fazer sinal de X" 
                  className="relative z-10 w-[220px] md:w-[280px] h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            ) : (
              <div 
                role="region"
                aria-live="polite"
                className="bg-[#E6D48A] rounded-[2.5rem] p-8 md:p-12 shadow-md flex flex-col items-center justify-center w-full min-h-[400px] animate-fade-in-right relative"
              >
                
                <button 
                  onClick={() => setMostrarResultados(false)}
                  className="absolute top-6 right-6 text-[#D03C7A] font-bold text-sm hover:underline opacity-80 hover:opacity-100 transition-all focus:outline-none focus:ring-2 focus:ring-[#D03C7A] rounded px-1"
                >
                  Refazer
                </button>

                <h3 className="text-[3.5rem] md:text-[4.5rem] font-serif text-[#D03C7A] italic leading-none mb-6 text-center select-none" style={{ fontFamily: "cursive" }}>
                  Resultados:
                </h3>

                <div className="flex flex-col gap-6 text-center w-full">
                  <div>
                    <p className="text-[#D03C7A] text-xl md:text-2xl font-bold tracking-tight">Ração total necessária:</p>
                    <p className="text-[#D03C7A] text-2xl md:text-3xl font-black mt-1">{racaoTotal} kg por dia.</p>
                  </div>

                  <div>
                    <p className="text-[#D03C7A] text-xl md:text-2xl font-bold tracking-tight">Quantidade de água recomendada:</p>
                    <p className="text-[#D03C7A] text-2xl md:text-3xl font-black mt-1">{aguaTotal} litros por dia.</p>
                  </div>

                  <div>
                    <p className="text-[#D03C7A] text-xl md:text-2xl font-bold tracking-tight">Produção diária total de leite:</p>
                    <p className="text-[#D03C7A] text-2xl md:text-3xl font-black mt-1">{leiteTotal} litros por dia.</p>
                  </div>
                </div>

                {/* Botão de Cópia Adicional (Fase 5) */}
                <button
                  type="button"
                  onClick={handleCopiarRelatorio}
                  className={`mt-8 px-6 py-2.5 rounded-full font-bold text-sm shadow-md transition-all flex items-center gap-2 active:scale-95
                    ${copiado 
                      ? "bg-emerald-600 text-white" 
                      : "bg-[#D03C7A] text-white hover:bg-[#b03065]"
                    }`}
                >
                  {copiado ? "Copiado! ✅" : "Copiar Relatório 📋"}
                </button>

              </div>
            )}
            
          </div>

        </div>

      </div>
    </div>
  );
}