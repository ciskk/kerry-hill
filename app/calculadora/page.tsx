"use client";

import { useState } from "react";

export default function Calculadora() {
  // Estados para armazenar os valores inseridos pelo utilizador
  const [qtdOvelhas, setQtdOvelhas] = useState("");
  const [consumoRacao, setConsumoRacao] = useState("");
  const [qtdLactacao, setQtdLactacao] = useState("");
  const [producaoLeite, setProducaoLeite] = useState("");

  // Estado para controlar a transição entre a imagem da Cher e os Resultados
  const [mostrarResultados, setMostrarResultados] = useState(false);

  // Função para lidar com o cálculo (impede a página de recarregar e mostra a secção direita)
  const handleCalcular = (e: React.FormEvent) => {
    e.preventDefault();
    if (qtdOvelhas && consumoRacao && qtdLactacao && producaoLeite) {
      setMostrarResultados(true);
    } else {
      alert("Por favor, preencha todos os campos para calcular!");
    }
  };

  // Fórmulas matemáticas baseadas nos teus exemplos
  const racaoTotal = (parseFloat(qtdOvelhas) * parseFloat(consumoRacao.replace(",", "."))).toFixed(1);
  const aguaTotal = (parseFloat(qtdOvelhas) * 5).toFixed(0); // Assumindo média de 5L por ovelha/dia
  const leiteTotal = (parseFloat(qtdLactacao) * parseFloat(producaoLeite.replace(",", "."))).toFixed(1);

  return (
    // Fundo creme com margens negativas para cobrir a largura total do ecrã
    <div className="w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] -mt-8 md:-mt-12 -mb-8 md:-mb-12 bg-[#EAE7D6] text-[#D03C7A] overflow-x-hidden min-h-screen font-sans pb-24">
      
      {/* Estilos para a animação de Fade In suave ao trocar de estado */}
      <style>{`
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-right {
          animation: fadeInRight 0.6s ease-out forwards;
        }
      `}</style>

      {/* Contêiner principal com a mesma largura e alinhamentos das outras páginas */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-8 pt-20 md:pt-32">
        
        {/* =========================================
            CABEÇALHO: Título da Calculadora
            ========================================= */}
        <div className="flex flex-col relative z-20 w-full text-center md:text-left mb-10 md:mb-16 pl-0 md:pl-8">
          <h2 className="text-[5.5rem] md:text-[7.5rem] font-bold text-[#D03C7A] leading-[0.8] tracking-tighter">
            Calculadoras
          </h2>
          <span 
            className="text-[3.5rem] md:text-[5.5rem] font-serif text-[#E2C337] italic leading-[0.8] ml-0 md:ml-0 mt-2 md:-mt-2 z-10"
            style={{ textShadow: "2px 2px 0px #D03C7A, -1px -1px 0px #D03C7A, 1px -1px 0px #D03C7A, -1px 1px 0px #D03C7A" }}
          >
            Ração, Água e Produção
          </span>
        </div>

        {/* =========================================
            CORPO: Formulário (Esquerda) e Resultados/Cher (Direita)
            ========================================= */}
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-12 w-full px-0 md:px-8">
          
          {/* LADO ESQUERDO: Formulário de Inserção de Dados */}
          <div className="w-full md:w-[50%] flex flex-col relative z-20">
            <h3 className="text-[#D03C7A] text-2xl md:text-3xl font-medium mb-6 tracking-tight ml-4">
              insira as seguintes informações:
            </h3>
            
            <form onSubmit={handleCalcular} className="bg-[#E6D48A] rounded-[2.5rem] p-8 md:p-10 shadow-sm flex flex-col gap-6 relative">
              
              {/* Ícone de Cursor SVG a apontar para o formulário */}
              <div className="absolute top-1/2 -right-8 w-10 h-10 md:w-12 md:h-12 z-30 pointer-events-none animate-pulse hidden md:block">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform -rotate-45">
                  <path d="M4 0L4 16L8 12L11.5 19L14 18L10.5 11L16 11L4 0Z" fill="white" stroke="black" strokeWidth="1.5" strokeLinejoin="miter"/>
                </svg>
              </div>

              {/* Campo 1 */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                <label className="text-[#D03C7A] text-xl font-bold tracking-tight">Qtd. de Ovelhas:</label>
                <input 
                  type="number" 
                  required
                  min="0"
                  value={qtdOvelhas}
                  onChange={(e) => setQtdOvelhas(e.target.value)}
                  className="bg-transparent border-b-2 border-[#D03C7A]/40 focus:border-[#D03C7A] outline-none text-[#D03C7A] font-bold text-xl w-full md:w-24 text-center transition-colors"
                  placeholder="Ex: 20"
                />
              </div>

              {/* Campo 2 */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                <label className="text-[#D03C7A] text-xl font-bold tracking-tight">Consumo médio de ração por animal:</label>
                <div className="flex items-center w-full md:w-auto">
                  <input 
                    type="number" 
                    step="0.1"
                    required
                    min="0"
                    value={consumoRacao}
                    onChange={(e) => setConsumoRacao(e.target.value)}
                    className="bg-transparent border-b-2 border-[#D03C7A]/40 focus:border-[#D03C7A] outline-none text-[#D03C7A] font-bold text-xl w-full md:w-20 text-center transition-colors"
                    placeholder="1,5"
                  />
                  <span className="text-[#D03C7A] font-bold ml-2">kg/dia</span>
                </div>
              </div>

              {/* Campo 3 */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                <label className="text-[#D03C7A] text-xl font-bold tracking-tight">Qtd. de Ovelhas em Lactação:</label>
                <input 
                  type="number" 
                  required
                  min="0"
                  value={qtdLactacao}
                  onChange={(e) => setQtdLactacao(e.target.value)}
                  className="bg-transparent border-b-2 border-[#D03C7A]/40 focus:border-[#D03C7A] outline-none text-[#D03C7A] font-bold text-xl w-full md:w-24 text-center transition-colors"
                  placeholder="Ex: 8"
                />
              </div>

              {/* Campo 4 */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                <label className="text-[#D03C7A] text-xl font-bold tracking-tight">Produção média de leite por ovelha:</label>
                <div className="flex items-center w-full md:w-auto">
                  <input 
                    type="number" 
                    step="0.1"
                    required
                    min="0"
                    value={producaoLeite}
                    onChange={(e) => setProducaoLeite(e.target.value)}
                    className="bg-transparent border-b-2 border-[#D03C7A]/40 focus:border-[#D03C7A] outline-none text-[#D03C7A] font-bold text-xl w-full md:w-20 text-center transition-colors"
                    placeholder="1,2"
                  />
                  <span className="text-[#D03C7A] font-bold ml-2">L/dia</span>
                </div>
              </div>

              {/* Botão de Calcular */}
              <div className="mt-4 flex justify-center md:justify-end">
                <button 
                  type="submit"
                  className="bg-[#D03C7A] text-[#EAE7D6] font-bold text-lg px-8 py-3 rounded-full hover:bg-[#b03065] hover:scale-105 transition-all shadow-md"
                >
                  Calcular
                </button>
              </div>

            </form>
          </div>

          {/* LADO DIREITO: Imagem da Cher (Estado 1) ou Resultados (Estado 2) */}
          <div className="w-full md:w-[45%] flex justify-center items-center relative mt-12 md:mt-0 min-h-[400px]">
            
            {!mostrarResultados ? (
              // ESTADO INICIAL: Cher com o "X" e o fundo estrela rosa
              <div className="relative flex justify-center items-center w-full h-full animate-fade-in-right">
                
                {/* Estrela Rosa de Fundo (SVG afiado como na referência) */}
                <div className="absolute z-0 w-[250px] h-[250px] md:w-[350px] md:h-[350px] flex justify-center items-center -mr-16 mt-10">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-[#D03C7A] opacity-90 animate-[spin_30s_linear_infinite]">
                    <polygon points="50,0 60,35 95,20 65,45 100,65 60,60 50,100 40,60 0,65 35,45 5,20 40,35" />
                  </svg>
                </div>

                {/* Imagem da Cher */}
                <img 
                  src="/assets/calculadora-cher.png" 
                  alt="Cher a fazer sinal de X" 
                  className="relative z-10 w-[220px] md:w-[280px] h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            ) : (
              // ESTADO RESULTADOS: Cartão amarelo com os cálculos
              <div className="bg-[#E6D48A] rounded-[2.5rem] p-8 md:p-12 shadow-md flex flex-col items-center justify-center w-full min-h-[400px] animate-fade-in-right relative">
                
                {/* Botão Voltar (Pequeno ícone para refazer o cálculo) */}
                <button 
                  onClick={() => setMostrarResultados(false)}
                  className="absolute top-6 right-6 text-[#D03C7A] font-bold text-sm hover:underline opacity-60 hover:opacity-100"
                >
                  Refazer
                </button>

                <h3 className="text-[3.5rem] md:text-[4.5rem] font-serif text-[#D03C7A] italic leading-none mb-8 text-center" style={{ fontFamily: "cursive" }}>
                  Resultados:
                </h3>

                <div className="flex flex-col gap-8 text-center">
                  <div>
                    <p className="text-[#D03C7A] text-xl md:text-2xl font-bold tracking-tight">Quantidade total de ração</p>
                    <p className="text-[#D03C7A] text-xl md:text-2xl font-bold tracking-tight">necessária:</p>
                    <p className="text-[#D03C7A] text-2xl md:text-3xl font-bold mt-1">{racaoTotal} kg por dia.</p>
                  </div>

                  <div>
                    <p className="text-[#D03C7A] text-xl md:text-2xl font-bold tracking-tight">Quantidade estimada de água:</p>
                    <p className="text-[#D03C7A] text-2xl md:text-3xl font-bold mt-1">{aguaTotal} litros por dia.</p>
                  </div>

                  <div>
                    <p className="text-[#D03C7A] text-xl md:text-2xl font-bold tracking-tight">Produção total de leite:</p>
                    <p className="text-[#D03C7A] text-2xl md:text-3xl font-bold mt-1">{leiteTotal} litros por dia.</p>
                  </div>
                </div>

              </div>
            )}
            
          </div>

        </div>

      </div>
    </div>
  );
}
