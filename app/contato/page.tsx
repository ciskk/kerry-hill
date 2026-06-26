"use client";

export default function Contato() {
  return (
    // Fundo creme com margens negativas para cobrir a largura total da tela, mantendo o padrão das outras páginas
    <div className="w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] -mt-8 md:-mt-12 -mb-8 md:-mb-12 bg-[#EAE7D6] text-[#D03C7A] overflow-x-hidden min-h-screen font-sans pb-24 flex items-center justify-center">
      
      {/* Contêiner principal com largura máxima */}
      <div className="max-w-[1100px] w-full mx-auto px-4 md:px-8 pt-32 md:pt-40 pb-12 flex flex-col md:flex-row items-center md:items-stretch justify-center gap-12 md:gap-16 relative z-10">
        
        {/* =========================================
            LADO ESQUERDO: Contato e Criação de Conta
            ========================================= */}
        <div className="flex flex-col items-center text-center w-full md:w-[45%]">
          
          {/* Seção de Contato */}
          <div className="mb-10 w-full flex flex-col items-center">
            <h2 
              className="text-[4rem] md:text-[5rem] font-serif text-[#E2C337] italic leading-none mb-6"
              style={{ textShadow: "2px 2px 0px #D03C7A, -1px -1px 0px #D03C7A, 1px -1px 0px #D03C7A, -1px 1px 0px #D03C7A" }}
            >
              Contato:
            </h2>
            
            <div className="flex flex-col gap-4 text-[#D03C7A] text-xl md:text-2xl font-medium tracking-wide">
              <p>00 0000 0000</p>
              <p>reperquilson@email.com</p>
              <p>reperkelly@email.com</p>
            </div>
          </div>

          {/* Seção de Criar Conta */}
          <div className="w-full flex flex-col items-center mt-4">
            <h2 
              className="text-[3.5rem] md:text-[4.5rem] font-serif text-[#E2C337] italic leading-none mb-8"
              style={{ textShadow: "2px 2px 0px #D03C7A, -1px -1px 0px #D03C7A, 1px -1px 0px #D03C7A, -1px 1px 0px #D03C7A" }}
            >
              Crie sua conta
            </h2>
            
            <form className="flex flex-col gap-5 w-full max-w-[320px] items-center">
              <input 
                type="text" 
                placeholder="Username" 
                className="w-full h-14 rounded-full border-[3px] border-[#D03C7A] bg-transparent px-6 text-[#D03C7A] text-lg font-medium placeholder-[#D03C7A]/70 focus:outline-none focus:ring-4 focus:ring-[#D03C7A]/20 transition-all"
              />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full h-14 rounded-full border-[3px] border-[#D03C7A] bg-transparent px-6 text-[#D03C7A] text-lg font-medium placeholder-[#D03C7A]/70 focus:outline-none focus:ring-4 focus:ring-[#D03C7A]/20 transition-all"
              />
              <button 
                type="button" 
                className="mt-2 bg-[#D03C7A] text-white font-bold text-xl px-12 py-3 rounded-full hover:bg-[#b03065] hover:scale-105 transition-all shadow-md"
              >
                Criar
              </button>
            </form>
          </div>

        </div>

        {/* =========================================
            DIVISÓRIA (Linha Rosa)
            ========================================= */}
        {/* Linha Vertical (Aparece apenas no Desktop) */}
        <div className="hidden md:block w-[5px] bg-[#D03C7A] rounded-full opacity-80 self-stretch my-8"></div>
        {/* Linha Horizontal (Aparece apenas no Celular) */}
        <div className="block md:hidden h-[5px] w-[80%] bg-[#D03C7A] rounded-full opacity-80 my-4"></div>

        {/* =========================================
            LADO DIREITO: Login
            ========================================= */}
        <div className="flex flex-col items-center text-center w-full md:w-[45%] mt-4 md:mt-0">
          
          {/* Ícone de Usuário (Desenhado com SVG para ficar idêntico à referência) */}
          <div className="w-32 h-32 md:w-40 md:h-40 mb-10 relative flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-full h-full text-[#D03C7A]" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Círculo de fora */}
              <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" />
              {/* Cabeça */}
              <circle cx="12" cy="9" r="4" fill="currentColor" />
              {/* Corpo */}
              <path d="M5.5 20C5.5 16.5 8.5 14 12 14C15.5 14 18.5 16.5 18.5 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="currentColor" />
            </svg>
          </div>

          {/* Formulário de Login */}
          <form className="flex flex-col gap-6 w-full max-w-[350px] items-center">
            {/* Input 1 (Vazio na referência) */}
            <input 
              type="text" 
              className="w-full h-14 rounded-full border-[3px] border-[#D03C7A] bg-transparent px-6 text-[#D03C7A] text-lg font-medium focus:outline-none focus:ring-4 focus:ring-[#D03C7A]/20 transition-all"
            />
            {/* Input 2 (Vazio na referência) */}
            <input 
              type="password" 
              className="w-full h-14 rounded-full border-[3px] border-[#D03C7A] bg-transparent px-6 text-[#D03C7A] text-lg font-medium focus:outline-none focus:ring-4 focus:ring-[#D03C7A]/20 transition-all"
            />
            
            {/* Esqueceu a senha? */}
            <p className="text-[#D03C7A] text-sm md:text-base font-medium mt-[-10px] mb-2 hover:underline cursor-pointer">
              Forgot Password?
            </p>

            {/* Botão de Login */}
            <button 
              type="button" 
              className="bg-[#D03C7A] text-white font-extrabold text-2xl px-14 py-3 rounded-full hover:bg-[#b03065] hover:scale-105 transition-all shadow-md tracking-wide"
            >
              Login
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}