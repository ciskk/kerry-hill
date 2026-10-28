"use client";

import { useState } from "react";
import AnimarScroll from "@/components/AnimarScroll";
import ConfetesCanvas from "@/components/ConfetesCanvas";
import Estrela from "@/components/Estrela";
import Icone from "@/components/Icone";
import {
  CargoClubeVip,
  canaisContato,
  cargosClubeVip,
} from "@/data/conteudos";
import { useMembroClube } from "@/hooks/useMembroClube";

export default function Contato() {
  const { membroAtivo, salvarMembro, sairDoClube } = useMembroClube();

  // Estados para os campos do formulário de criação de conta
  const [regUser, setRegUser] = useState("");
  const [regPass, setRegPass] = useState("");
  const [cargoEscolhido, setCargoEscolhido] = useState<CargoClubeVip>(
    cargosClubeVip[0]
  );

  // Estados para os campos do formulário de login
  const [logUser, setLogUser] = useState("");
  const [logPass, setLogPass] = useState("");

  // Estados de feedback interativo para a apresentação
  const [avisoCadastro, setAvisoCadastro] = useState("");
  const [avisoLogin, setAvisoLogin] = useState("");
  const [mostrarDicaSenha, setMostrarDicaSenha] = useState(false);
  const [celebrarVip, setCelebrarVip] = useState(false);

  const dispararCelebracao = () => {
    setCelebrarVip(true);
    setTimeout(() => setCelebrarVip(false), 4000);
  };

  const handleCriarConta = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regUser.trim() || !regPass.trim()) {
      setAvisoCadastro(
        "Preencha o nome de usuário e uma senha para entrar no clube!"
      );
      return;
    }
    setAvisoCadastro("");
    salvarMembro({
      nome: regUser.trim(),
      tipo: "cadastro",
      cargo: cargoEscolhido,
    });
    dispararCelebracao();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logUser.trim() || !logPass.trim()) {
      setAvisoLogin("Digite seu nome de usuário e senha para acessar!");
      return;
    }
    setAvisoLogin("");
    salvarMembro({
      nome: logUser.trim(),
      tipo: "login",
      cargo: cargoEscolhido,
    });
    dispararCelebracao();
  };

  const handleTrocarCargoAtivo = (novoCargo: CargoClubeVip) => {
    setCargoEscolhido(novoCargo);
    if (membroAtivo) {
      salvarMembro({
        ...membroAtivo,
        cargo: novoCargo,
      });
    }
  };

  const handleSair = () => {
    sairDoClube();
    setRegUser("");
    setRegPass("");
    setLogUser("");
    setLogPass("");
    setMostrarDicaSenha(false);
    setCelebrarVip(false);
  };

  return (
    <div className="w-full text-rosa overflow-x-hidden min-h-screen font-sans pb-14 flex items-center justify-center relative">
      <ConfetesCanvas ativo={celebrarVip} />

      {/* Contêiner principal */}
      <div className="max-w-[1100px] w-full mx-auto px-4 md:px-8 pt-12 md:pt-20 pb-10 flex flex-col md:flex-row items-center md:items-stretch justify-center gap-12 md:gap-16 relative z-10">
        {/* =========================================
            LADO ESQUERDO: Contatos e Criação de Conta
            ========================================= */}
        <AnimarScroll
          variante="esquerda"
          className="flex flex-col items-center text-center w-full md:w-[45%]"
        >
          {/* Seção de Informações de Contato */}
          <section className="mb-10 w-full flex flex-col items-center">
            <h1 className="text-[3.6rem] md:text-[5rem] font-serif text-amarelo italic leading-none mb-6 select-none texto-contorno-rosa">
              Contato:
            </h1>

            <address className="flex flex-col gap-3.5 text-rosa text-xl md:text-2xl font-medium tracking-wide not-italic items-center">
              {canaisContato.map((item) => (
                <p
                  key={item.texto}
                  className="inline-flex items-center gap-2.5 bg-papel/90 px-4 py-1.5 rounded-full border border-rosa/20 shadow-xs hover:scale-105 transition-transform"
                >
                  <Icone nome={item.icone} className="w-5 h-5 text-rosa" />
                  <span>{item.texto}</span>
                </p>
              ))}
            </address>
          </section>

          {/* Seção para Criar Nova Conta */}
          <section className="w-full flex flex-col items-center mt-2">
            <h2 className="text-[3.2rem] md:text-[4.5rem] font-serif text-amarelo italic leading-none mb-6 select-none texto-contorno-rosa">
              Crie a sua conta
            </h2>

            <form
              onSubmit={handleCriarConta}
              noValidate
              className="flex flex-col gap-4 w-full max-w-[330px] items-center"
            >
              {avisoCadastro && (
                <div
                  role="alert"
                  className="w-full bg-papel border-2 border-dashed border-rosa text-rosa p-3 rounded-2xl text-xs font-bold"
                >
                  {avisoCadastro}
                </div>
              )}

              <label htmlFor="regUsername" className="sr-only">
                Nome de usuário para cadastro
              </label>
              <input
                id="regUsername"
                type="text"
                placeholder="Nome de Usuário"
                value={regUser}
                onChange={(e) => setRegUser(e.target.value)}
                className="w-full h-13 rounded-full border-[3px] border-rosa bg-papel/85 px-6 text-rosa text-lg font-medium placeholder-rosa/70 focus:outline-none focus:ring-4 focus:ring-rosa/30 focus:border-rosa focus:bg-white transition-all"
              />

              <label htmlFor="regPassword" className="sr-only">
                Senha para cadastro
              </label>
              <input
                id="regPassword"
                type="password"
                placeholder="Senha"
                value={regPass}
                onChange={(e) => setRegPass(e.target.value)}
                className="w-full h-13 rounded-full border-[3px] border-rosa bg-papel/85 px-6 text-rosa text-lg font-medium placeholder-rosa/70 focus:outline-none focus:ring-4 focus:ring-rosa/30 focus:border-rosa focus:bg-white transition-all"
              />

              {/* Escolha de Cargo na Carteirinha VIP */}
              <div className="w-full text-left mt-1">
                <label
                  htmlFor="regCargoVip"
                  className="block text-xs font-extrabold text-rosa uppercase tracking-wider mb-1.5 text-center"
                >
                  Seu Título no Clube VIP:
                </label>
                <select
                  id="regCargoVip"
                  value={cargoEscolhido}
                  onChange={(e) =>
                    setCargoEscolhido(e.target.value as CargoClubeVip)
                  }
                  className="w-full h-11 rounded-full border-2 border-rosa/50 bg-papel px-4 text-rosa text-sm font-bold focus:outline-none focus:border-rosa"
                >
                  {cargosClubeVip.map((cargo) => (
                    <option key={cargo} value={cargo}>
                      {cargo}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="mt-2 bg-rosa text-white font-bold text-xl px-12 py-3 rounded-full hover:bg-rosa-escuro hover:scale-105 focus:outline-none focus:ring-4 focus:ring-rosa/40 active:scale-95 transition-all shadow-md"
              >
                Criar Conta
              </button>
            </form>
          </section>
        </AnimarScroll>

        {/* Divisórias Adaptativas */}
        <div
          className="hidden md:block w-[5px] bg-rosa rounded-full opacity-80 self-stretch my-8"
          aria-hidden="true"
        />
        <div
          className="block md:hidden h-[5px] w-[80%] bg-rosa rounded-full opacity-80 my-4"
          aria-hidden="true"
        />

        {/* =========================================
            LADO DIREITO: Login ou Carteirinha VIP do Clube
            ========================================= */}
        <AnimarScroll
          variante="direita"
          atrasoMs={140}
          className="flex flex-col items-center justify-center text-center w-full md:w-[45%] mt-4 md:mt-0"
        >
          {!membroAtivo ? (
            <>
              {/* Avatar de Usuário */}
              <div
                className="w-32 h-32 md:w-40 md:h-40 mb-8 relative flex items-center justify-center"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-full h-full text-rosa"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle cx="12" cy="9" r="4" fill="currentColor" />
                  <path
                    d="M5.5 20C5.5 16.5 8.5 14 12 14C15.5 14 18.5 16.5 18.5 20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="currentColor"
                  />
                </svg>
              </div>

              <form
                onSubmit={handleLogin}
                noValidate
                className="flex flex-col gap-5 w-full max-w-[350px] items-center"
              >
                {avisoLogin && (
                  <div
                    role="alert"
                    className="w-full bg-papel border-2 border-dashed border-rosa text-rosa p-3 rounded-2xl text-xs font-bold"
                  >
                    {avisoLogin}
                  </div>
                )}

                <label htmlFor="logUsername" className="sr-only">
                  Nome de usuário para login
                </label>
                <input
                  id="logUsername"
                  type="text"
                  placeholder="Nome de Usuário"
                  value={logUser}
                  onChange={(e) => setLogUser(e.target.value)}
                  className="w-full h-14 rounded-full border-[3px] border-rosa bg-papel/85 px-6 text-rosa text-lg font-medium placeholder-rosa/70 focus:outline-none focus:ring-4 focus:ring-rosa/30 focus:border-rosa focus:bg-white transition-all"
                />

                <label htmlFor="logPassword" className="sr-only">
                  Senha para login
                </label>
                <input
                  id="logPassword"
                  type="password"
                  placeholder="Senha"
                  value={logPass}
                  onChange={(e) => setLogPass(e.target.value)}
                  className="w-full h-14 rounded-full border-[3px] border-rosa bg-papel/85 px-6 text-rosa text-lg font-medium placeholder-rosa/70 focus:outline-none focus:ring-4 focus:ring-rosa/30 focus:border-rosa focus:bg-white transition-all"
                />

                <button
                  type="button"
                  onClick={() => setMostrarDicaSenha((prev) => !prev)}
                  className="text-rosa text-sm md:text-base font-semibold mt-[-6px] mb-1 hover:underline focus:outline-none focus:ring-2 focus:ring-rosa rounded px-1 transition-all"
                >
                  Esqueceu a senha?
                </button>

                {mostrarDicaSenha && (
                  <p className="w-full bg-papel border border-rosa/30 rounded-2xl p-3 text-xs font-bold text-rosa animate-pop-up">
                    Dica das Patricinhas: como este é um clube demonstrativo,
                    você pode digitar qualquer nome e senha para gerar sua
                    carteirinha VIP!
                  </p>
                )}

                <button
                  type="submit"
                  className="bg-rosa text-white font-extrabold text-2xl px-14 py-3 rounded-full hover:bg-rosa-escuro hover:scale-105 focus:outline-none focus:ring-4 focus:ring-rosa/40 active:scale-95 transition-all shadow-md tracking-wide"
                >
                  Entrar
                </button>
              </form>
            </>
          ) : (
            /* CARTEIRINHA VIP DO CLUBE KERRY HILL (Com Reflexo Holográfico) */
            <div
              role="region"
              aria-live="polite"
              className="w-full max-w-[395px] bg-amarelo-card brilho-vip border-4 border-rosa rounded-[2.5rem] p-8 sombra-pop-forte animate-pop-up flex flex-col items-center relative"
            >
              <Estrela
                className="w-8 h-8 absolute -top-4 -right-4"
                filtroRosa
              />

              <div className="w-16 h-16 rounded-full bg-papel border-2 border-rosa flex items-center justify-center mb-4 shadow-sm">
                <Icone nome="crown" className="w-8 h-8 text-rosa" />
              </div>

              <span className="inline-flex items-center gap-1.5 bg-rosa text-white text-xs font-bold px-3.5 py-1 rounded-full mb-3">
                <Icone nome="sparkles" className="w-3.5 h-3.5" />
                <span>Clube VIP Kerry Hill • Passaporte Oficial</span>
              </span>

              <h3 className="text-3xl md:text-4xl font-serif text-amarelo italic leading-tight mb-2 texto-contorno-rosa-sm">
                {membroAtivo.tipo === "cadastro"
                  ? "Conta Criada!"
                  : "Bem-vindo(a) de volta!"}
              </h3>

              <p className="text-rosa text-xl font-black mt-0.5">
                @{membroAtivo.nome}
              </p>

              <span className="mt-1.5 inline-block bg-papel border border-rosa/30 text-rosa text-xs font-extrabold px-3.5 py-1 rounded-full">
                {membroAtivo.cargo}
              </span>

              {/* Troca rápida de cargo dentro da própria carteirinha */}
              <div className="w-full mt-4 pt-3 border-t border-rosa/20">
                <p className="text-[11px] font-bold text-rosa/80 uppercase tracking-wider mb-2">
                  Personalizar Especialidade:
                </p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {cargosClubeVip.map((cargo) => {
                    const ativo = membroAtivo.cargo === cargo;
                    return (
                      <button
                        key={cargo}
                        type="button"
                        onClick={() => handleTrocarCargoAtivo(cargo)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all ${
                          ativo
                            ? "bg-rosa text-white border-rosa"
                            : "bg-papel/80 text-rosa border-rosa/20 hover:bg-papel"
                        }`}
                      >
                        {cargo}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Código de Barras Retrô Anos 90 da Carteirinha */}
              <div className="w-full mt-4 bg-papel/90 border border-rosa/20 rounded-xl py-2 px-4 flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-rosa tracking-widest">
                  KH-VIP-1995
                </span>
                <div
                  aria-hidden="true"
                  className="flex items-center gap-[2px] h-4"
                >
                  {[2, 1, 3, 1, 2, 1, 4, 1, 2, 2, 1, 3].map((largura, i) => (
                    <span
                      key={i}
                      className="bg-rosa h-full inline-block"
                      style={{ width: `${largura * 2}px` }}
                    />
                  ))}
                </div>
              </div>

              <p className="text-black/80 text-xs sm:text-sm font-medium mt-3 leading-relaxed">
                Seu crachá VIP agora aparece no topo do site durante toda a
                apresentação!
              </p>

              <button
                type="button"
                onClick={handleSair}
                className="mt-4 inline-flex items-center gap-1.5 bg-rosa text-white font-bold text-sm px-6 py-2.5 rounded-full hover:bg-rosa-escuro active:scale-95 transition-all shadow-sm"
              >
                <Icone nome="arrow-left" className="w-4 h-4" />
                <span>Trocar de conta</span>
              </button>
            </div>
          )}
        </AnimarScroll>
      </div>
    </div>
  );
}
