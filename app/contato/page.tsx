"use client";

import { useState } from "react";

export default function Contato() {
  // Estados para as inputs do formulário de criação de conta
  const [regUser, setRegUser] = useState("");
  const [regPass, setRegPass] = useState("");

  // Estados para as inputs do formulário de login
  const [logUser, setLogUser] = useState("");
  const [logPass, setLogPass] = useState("");

  return (
    <div className="w-full bg-creme text-rosa overflow-x-hidden min-h-screen font-sans pb-20 flex items-center justify-center">
      
      {/* Contêiner principal */}
      <div className="max-w-[1100px] w-full mx-auto px-4 md:px-8 pt-12 md:pt-20 pb-12 flex flex-col md:flex-row items-center md:items-stretch justify-center gap-12 md:gap-16 relative z-10">
        
        {/* =========================================
            LADO ESQUERDO: Contatos e Criação de Conta
            ========================================= */}
        <div className="flex flex-col items-center text-center w-full md:w-[45%]">
          
          {/* Seção de Informações de Contato */}
          <section className="mb-10 w-full flex flex-col items-center">
            <h1 
              className="text-[3.6rem] md:text-[5rem] font-serif text-amarelo italic leading-none mb-6 select-none"
              style={{ textShadow: "2px 2px 0px #D03C7A, -1px -1px 0px #D03C7A, 1px -1px 0px #D03C7A, -1px 1px 0px #D03C7A" }}
            >
              Contato:
            </h1>
            
            <address className="flex flex-col gap-4 text-rosa text-xl md:text-2xl font-medium tracking-wide not-italic">
              <p>00 0000 0000</p>
              <p>reperquilson@email.com</p>
              <p>reperkelly@email.com</p>
            </address>
          </section>

          {/* Seção para Criar Nova Conta */}
          <section className="w-full flex flex-col items-center mt-4">
            <h2 
              className="text-[3.2rem] md:text-[4.5rem] font-serif text-amarelo italic leading-none mb-8 select-none"
              style={{ textShadow: "2px 2px 0px #D03C7A, -1px -1px 0px #D03C7A, 1px -1px 0px #D03C7A, -1px 1px 0px #D03C7A" }}
            >
              Crie a sua conta
            </h2>
            
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5 w-full max-w-[320px] items-center">
              
              {/* Etiquetas acessíveis apenas para leitores de tela (sr-only) */}
              <label htmlFor="regUsername" className="sr-only">Nome de usuário para cadastro</label>
              <input 
                id="regUsername"
                type="text" 
                placeholder="Nome de Usuário" 
                value={regUser}
                onChange={(e) => setRegUser(e.target.value)}
                className="w-full h-14 rounded-full border-[3px] border-rosa bg-transparent px-6 text-rosa text-lg font-medium placeholder-rosa/70 focus:outline-none focus:ring-4 focus:ring-rosa/30 focus:border-rosa focus:bg-rosa/5 transition-all"
              />

              <label htmlFor="regPassword" className="sr-only">Senha para cadastro</label>
              <input 
                id="regPassword"
                type="password" 
                placeholder="Senha" 
                value={regPass}
                onChange={(e) => setRegPass(e.target.value)}
                className="w-full h-14 rounded-full border-[3px] border-rosa bg-transparent px-6 text-rosa text-lg font-medium placeholder-rosa/70 focus:outline-none focus:ring-4 focus:ring-rosa/30 focus:border-rosa focus:bg-rosa/5 transition-all"
              />

              <button 
                type="submit" 
                className="mt-2 bg-rosa text-white font-bold text-xl px-12 py-3 rounded-full hover:bg-rosa-escuro hover:scale-105 focus:outline-none focus:ring-4 focus:ring-rosa/40 active:scale-95 transition-all shadow-md"
              >
                Criar Conta
              </button>
            </form>
          </section>

        </div>

        {/* Divisórias Adaptativas */}
        <div className="hidden md:block w-[5px] bg-rosa rounded-full opacity-80 self-stretch my-8" aria-hidden="true"></div>
        <div className="block md:hidden h-[5px] w-[80%] bg-rosa rounded-full opacity-80 my-4" aria-hidden="true"></div>

        {/* =========================================
            LADO DIREITO: Login de Usuário
            ========================================= */}
        <section className="flex flex-col items-center text-center w-full md:w-[45%] mt-4 md:mt-0">
          
          {/* Avatar com Descrição Alternativa */}
          <div className="w-32 h-32 md:w-40 md:h-40 mb-10 relative flex items-center justify-center" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="w-full h-full text-rosa" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="9" r="4" fill="currentColor" />
              <path d="M5.5 20C5.5 16.5 8.5 14 12 14C15.5 14 18.5 16.5 18.5 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="currentColor" />
            </svg>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-6 w-full max-w-[350px] items-center">
            
            <label htmlFor="logUsername" className="sr-only">Nome de usuário para login</label>
            <input 
              id="logUsername"
              type="text" 
              placeholder="Nome de Usuário"
              value={logUser}
              onChange={(e) => setLogUser(e.target.value)}
              className="w-full h-14 rounded-full border-[3px] border-rosa bg-transparent px-6 text-rosa text-lg font-medium placeholder-rosa/70 focus:outline-none focus:ring-4 focus:ring-rosa/30 focus:border-rosa focus:bg-rosa/5 transition-all"
            />

            <label htmlFor="logPassword" className="sr-only">Senha para login</label>
            <input 
              id="logPassword"
              type="password" 
              placeholder="Senha"
              value={logPass}
              onChange={(e) => setLogPass(e.target.value)}
              className="w-full h-14 rounded-full border-[3px] border-rosa bg-transparent px-6 text-rosa text-lg font-medium placeholder-rosa/70 focus:outline-none focus:ring-4 focus:ring-rosa/30 focus:border-rosa focus:bg-rosa/5 transition-all"
            />
            
            <button 
              type="button" 
              className="text-rosa text-sm md:text-base font-semibold mt-[-10px] mb-2 hover:underline focus:outline-none focus:ring-2 focus:ring-rosa rounded px-1 transition-all"
            >
              Esqueceu a senha?
            </button>

            <button 
              type="submit" 
              className="bg-rosa text-white font-extrabold text-2xl px-14 py-3 rounded-full hover:bg-rosa-escuro hover:scale-105 focus:outline-none focus:ring-4 focus:ring-rosa/40 active:scale-95 transition-all shadow-md tracking-wide"
            >
              Entrar
            </button>
          </form>

        </section>

      </div>
    </div>
  );
}