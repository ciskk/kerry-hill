"use client";

import { useState } from "react";
import AnimarScroll from "@/components/AnimarScroll";
import Estrela from "@/components/Estrela";
import Icone from "@/components/Icone";
import TituloDuplo from "@/components/TituloDuplo";
import CardFichaOvelha from "@/components/registro/CardFichaOvelha";
import FormularioRegistroOvelha from "@/components/registro/FormularioRegistroOvelha";
import { CategoriaOvelha, OvelhaRegistrada } from "@/data/conteudos";
import { useRebanho } from "@/hooks/useRebanho";

export default function Registro() {
  const {
    rebanho,
    proximoBrincoSugerido,
    totalAnimais,
    totalVacinadas,
    totalLeiteDia,
    adicionarOvelha,
    alternarVacina,
    removerOvelha,
    restaurarExemplos,
  } = useRebanho();

  const [filtroCategoria, setFiltroCategoria] = useState<
    "Todas" | CategoriaOvelha
  >("Todas");
  const [buscaTexto, setBuscaTexto] = useState("");
  const [destaqueRecente, setDestaqueRecente] = useState<string | null>(null);

  const handleRegistrarNovaOvelha = (novaOvelha: OvelhaRegistrada) => {
    adicionarOvelha(novaOvelha);
    setDestaqueRecente(novaOvelha.id);
    setFiltroCategoria("Todas");
    setBuscaTexto("");
    setTimeout(() => setDestaqueRecente(null), 2500);
  };

  const handleRestaurar = () => {
    restaurarExemplos();
    setFiltroCategoria("Todas");
    setBuscaTexto("");
  };

  const rebanhoFiltrado = rebanho.filter((item) => {
    const passaCategoria =
      filtroCategoria === "Todas" || item.categoria === filtroCategoria;
    const termo = buscaTexto.trim().toLowerCase();
    const passaBusca =
      !termo ||
      item.nome.toLowerCase().includes(termo) ||
      item.brinco.toLowerCase().includes(termo) ||
      item.pelagem.toLowerCase().includes(termo);
    return passaCategoria && passaBusca;
  });

  return (
    <div className="w-full text-rosa overflow-x-hidden min-h-screen font-sans pb-14">
      <div className="max-w-[1300px] mx-auto px-4 md:px-8 pt-10 md:pt-16">
        {/* =========================================
            CABEÇALHO: Título Duplo + Resumo do Rebanho
            ========================================= */}
        <AnimarScroll
          variante="subir"
          className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6 mb-10 md:mb-14"
        >
          <TituloDuplo
            principal="Registro"
            subtitulo="do Rebanho"
            as="h1"
            className="flex flex-col relative z-20 text-center lg:text-left select-none"
            tituloClassName="text-[3.6rem] sm:text-[5rem] md:text-[7rem] font-bold text-rosa leading-[0.82] tracking-tighter"
            subtituloClassName="text-[2.6rem] sm:text-[3.6rem] md:text-[5.2rem] font-serif text-amarelo italic leading-[0.9] lg:ml-14 mt-1 md:-mt-2 z-10"
          />

          {/* Painel de Indicadores Zootécnicos */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 z-20">
            <div className="bg-papel border-2 border-rosa/25 rounded-2xl px-4 py-3 text-center min-w-[115px] sombra-pop-sm">
              <p className="text-[11px] font-bold text-rosa/75 uppercase tracking-wider">
                Animais
              </p>
              <p className="text-2xl font-black text-rosa leading-tight">
                {totalAnimais}
              </p>
            </div>

            <div className="bg-papel border-2 border-rosa/25 rounded-2xl px-4 py-3 text-center min-w-[130px] sombra-pop-sm">
              <p className="text-[11px] font-bold text-rosa/75 uppercase tracking-wider">
                Vacinação em dia
              </p>
              <p className="text-2xl font-black text-rosa leading-tight">
                {totalVacinadas}/{totalAnimais}
              </p>
            </div>

            <div className="bg-papel border-2 border-rosa/25 rounded-2xl px-4 py-3 text-center min-w-[130px] sombra-pop-sm">
              <p className="text-[11px] font-bold text-rosa/75 uppercase tracking-wider">
                Leite Total
              </p>
              <p className="text-2xl font-black text-rosa leading-tight">
                {totalLeiteDia} L/dia
              </p>
            </div>
          </div>
        </AnimarScroll>

        {/* =========================================
            CONTEÚDO PRINCIPAL: Formulário + Catálogo
            ========================================= */}
        <div className="flex flex-col xl:flex-row items-start justify-between gap-10 w-full">
          {/* COLUNA ESQUERDA (40%): Formulário Modularizado */}
          <AnimarScroll
            variante="esquerda"
            atrasoMs={100}
            className="w-full xl:w-[40%]"
          >
            <FormularioRegistroOvelha
              proximoBrincoSugerido={proximoBrincoSugerido}
              onRegistrar={handleRegistrarNovaOvelha}
            />
          </AnimarScroll>

          {/* COLUNA DIREITA (60%): Catálogo / Anuário do Rebanho */}
          <div className="w-full xl:w-[60%] flex flex-col gap-6 z-20">
            {/* Barra de Filtros, Busca e Restauração */}
            <AnimarScroll
              variante="direita"
              atrasoMs={140}
              className="flex flex-col gap-3 bg-papel/90 border-2 border-rosa/20 rounded-2xl p-3.5 sm:p-4 sombra-pop-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {(
                    ["Todas", "Matriz", "Reprodutor", "Cordeiro(a)"] as const
                  ).map((aba) => {
                    const ativa = filtroCategoria === aba;
                    return (
                      <button
                        key={aba}
                        type="button"
                        onClick={() => setFiltroCategoria(aba)}
                        className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                          ativa
                            ? "bg-rosa text-white shadow-sm"
                            : "bg-amarelo-card/60 text-rosa hover:bg-amarelo-card"
                        }`}
                      >
                        {aba === "Todas" ? `Todas (${totalAnimais})` : aba}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={handleRestaurar}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-rosa/80 hover:text-rosa hover:underline px-2 py-1"
                >
                  <Icone nome="rotate-ccw" className="w-3.5 h-3.5" />
                  <span>Restaurar exemplos</span>
                </button>
              </div>

              {/* Busca rápida por nome ou brinco */}
              <div className="relative">
                <label htmlFor="buscaRebanho" className="sr-only">
                  Buscar ovelha por nome ou brinco
                </label>
                <input
                  id="buscaRebanho"
                  type="search"
                  value={buscaTexto}
                  onChange={(e) => setBuscaTexto(e.target.value)}
                  placeholder="Filtrar por nome (ex: Cher), brinco (ex: KH-001) ou linhagem..."
                  className="w-full bg-white/90 border border-rosa/25 focus:border-rosa focus:outline-none rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold text-rosa placeholder-rosa/50 transition-all"
                />
              </div>
            </AnimarScroll>

            {/* Grade de Fichas Zootécnicas */}
            {rebanhoFiltrado.length === 0 ? (
              <AnimarScroll
                variante="escala"
                className="bg-amarelo-card rounded-[2.5rem] p-10 text-center flex flex-col items-center gap-3 sombra-pop"
              >
                <Estrela className="w-10 h-10" filtroRosa />
                <p className="text-rosa text-lg font-bold">
                  Nenhuma ovelha encontrada com esse filtro.
                </p>
                <p className="text-black/75 text-sm font-medium">
                  Use o formulário ao lado para cadastrar um novo animal ou
                  limpe a busca acima!
                </p>
              </AnimarScroll>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rebanhoFiltrado.map((animal, idx) => (
                  <AnimarScroll
                    key={animal.id}
                    variante="colagem"
                    atrasoMs={(idx % 4) * 100}
                  >
                    <CardFichaOvelha
                      animal={animal}
                      ehRecente={destaqueRecente === animal.id}
                      onAlternarVacina={alternarVacina}
                      onRemover={removerOvelha}
                    />
                  </AnimarScroll>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
