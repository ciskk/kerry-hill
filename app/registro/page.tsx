"use client";

import { useEffect, useState } from "react";
import CursorPixel from "@/components/CursorPixel";
import Estrela from "@/components/Estrela";
import Icone from "@/components/Icone";
import TituloDuplo from "@/components/TituloDuplo";
import {
  CategoriaOvelha,
  OvelhaRegistrada,
  PelagemOvelha,
  StatusVacina,
  fotosOvelhasRegistro,
  rebanhoInicial,
} from "@/data/conteudos";

const STORAGE_KEY = "kerry_hill_rebanho_v1";

export default function Registro() {
  const [rebanho, setRebanho] = useState<OvelhaRegistrada[]>(rebanhoInicial);
  const [carregado, setCarregado] = useState(false);
  const [filtroCategoria, setFiltroCategoria] = useState<"Todas" | CategoriaOvelha>("Todas");

  // Estados do formulário de novo registro
  const [nome, setNome] = useState("");
  const [brinco, setBrinco] = useState("");
  const [categoria, setCategoria] = useState<CategoriaOvelha>("Matriz");
  const [pelagem, setPelagem] = useState<PelagemOvelha>("Pelo Ralo");
  const [pesoKg, setPesoKg] = useState("");
  const [producaoLitros, setProducaoLitros] = useState("");
  const [vacinacao, setVacinacao] = useState<StatusVacina>("Em dia");
  const [foto, setFoto] = useState(fotosOvelhasRegistro[0].src);
  const [observacao, setObservacao] = useState("");
  const [erro, setErro] = useState("");
  const [destaqueRecente, setDestaqueRecente] = useState<string | null>(null);

  // Carrega dados salvos no navegador ao iniciar
  useEffect(() => {
    try {
      const salvo = localStorage.getItem(STORAGE_KEY);
      if (salvo) {
        const parsed = JSON.parse(salvo);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRebanho(parsed);
        }
      }
    } catch (e) {
      console.error("Erro ao carregar rebanho salvo:", e);
    } finally {
      setCarregado(true);
    }
  }, []);

  // Salva alterações no navegador
  useEffect(() => {
    if (!carregado) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rebanho));
    } catch (e) {
      console.error("Erro ao salvar rebanho:", e);
    }
  }, [rebanho, carregado]);

  // Sugestão automática para o próximo número de brinco
  const proximoBrincoSugerido = `KH-${String(rebanho.length + 1).padStart(3, "0")}`;

  const handleRegistrar = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim()) {
      setErro("Informe o nome ou apelido da ovelha para registrar!");
      return;
    }

    if (!pesoKg.trim() || parseFloat(pesoKg.replace(",", ".")) <= 0) {
      setErro("Informe um peso válido maior que zero (em kg)!");
      return;
    }

    const brincoFinal = brinco.trim()
      ? brinco.trim().toUpperCase()
      : proximoBrincoSugerido;

    const leiteFinal =
      categoria === "Matriz"
        ? (parseFloat(producaoLitros.replace(",", ".")) || 0)
            .toFixed(1)
            .replace(".", ",")
        : "0,0";

    const novaOvelha: OvelhaRegistrada = {
      id: `kh-${Date.now()}`,
      brinco: brincoFinal,
      nome: nome.trim(),
      categoria,
      pelagem,
      pesoKg: pesoKg.trim().replace(".", ","),
      producaoLitros: leiteFinal,
      vacinacao,
      foto,
      observacao:
        observacao.trim() ||
        `${categoria} da linhagem ${pelagem.toLowerCase()} registrada no controle zootécnico.`,
    };

    setRebanho((prev) => [novaOvelha, ...prev]);
    setDestaqueRecente(novaOvelha.id);
    setFiltroCategoria("Todas");
    setErro("");

    // Limpa os campos principais mantendo as seleções rápidas
    setNome("");
    setBrinco("");
    setPesoKg("");
    setProducaoLitros("");
    setObservacao("");

    setTimeout(() => setDestaqueRecente(null), 2500);
  };

  const handleAlternarVacina = (id: string) => {
    setRebanho((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              vacinacao: item.vacinacao === "Em dia" ? "Pendente" : "Em dia",
            }
          : item
      )
    );
  };

  const handleRemover = (id: string) => {
    setRebanho((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRestaurarExemplos = () => {
    setRebanho(rebanhoInicial);
    setFiltroCategoria("Todas");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rebanhoInicial));
  };

  const rebanhoFiltrado =
    filtroCategoria === "Todas"
      ? rebanho
      : rebanho.filter((item) => item.categoria === filtroCategoria);

  // Indicadores rápidos do rebanho
  const totalVacinadas = rebanho.filter((o) => o.vacinacao === "Em dia").length;
  const totalLeiteDia = rebanho
    .reduce((acc, o) => acc + (parseFloat(o.producaoLitros.replace(",", ".")) || 0), 0)
    .toFixed(1)
    .replace(".", ",");

  return (
    <div className="w-full bg-creme text-rosa overflow-x-hidden min-h-screen font-sans pb-20">
      <div className="max-w-[1300px] mx-auto px-4 md:px-8 pt-10 md:pt-16">
        {/* =========================================
            CABEÇALHO: Título Duplo + Resumo do Rebanho
            ========================================= */}
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6 mb-10 md:mb-14">
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
            <div className="bg-papel border-2 border-rosa/25 rounded-2xl px-4 py-3 text-center min-w-[115px] shadow-sm">
              <p className="text-[11px] font-bold text-rosa/75 uppercase tracking-wider">
                Animais
              </p>
              <p className="text-2xl font-black text-rosa leading-tight">
                {rebanho.length}
              </p>
            </div>

            <div className="bg-papel border-2 border-rosa/25 rounded-2xl px-4 py-3 text-center min-w-[130px] shadow-sm">
              <p className="text-[11px] font-bold text-rosa/75 uppercase tracking-wider">
                Vacinação em dia
              </p>
              <p className="text-2xl font-black text-rosa leading-tight">
                {totalVacinadas}/{rebanho.length}
              </p>
            </div>

            <div className="bg-papel border-2 border-rosa/25 rounded-2xl px-4 py-3 text-center min-w-[130px] shadow-sm">
              <p className="text-[11px] font-bold text-rosa/75 uppercase tracking-wider">
                Leite Total
              </p>
              <p className="text-2xl font-black text-rosa leading-tight">
                {totalLeiteDia} L/dia
              </p>
            </div>
          </div>
        </div>

        {/* =========================================
            CONTEÚDO PRINCIPAL: Formulário + Catálogo
            ========================================= */}
        <div className="flex flex-col xl:flex-row items-start justify-between gap-10 w-full">
          {/* COLUNA ESQUERDA (40%): Formulário de Cadastro */}
          <div className="w-full xl:w-[40%] relative z-20">
            <div className="flex items-center gap-2 mb-3 ml-2">
              <Estrela className="w-6 h-6" filtroRosa />
              <h2 className="text-rosa text-xl sm:text-2xl font-bold tracking-tight">
                cadastrar nova ovelha no livro:
              </h2>
            </div>

            <form
              onSubmit={handleRegistrar}
              noValidate
              className="bg-amarelo-card rounded-[2.5rem] p-6 sm:p-8 shadow-md flex flex-col gap-5 relative border-2 border-transparent"
            >
              <CursorPixel
                className="absolute -bottom-6 -right-4 w-10 h-10 md:w-12 md:h-12 z-30 pointer-events-none animate-pulse hidden sm:block"
                svgClassName="drop-shadow-md"
              />

              {erro && (
                <div
                  role="alert"
                  className="bg-papel border-2 border-dashed border-rosa text-rosa p-3.5 rounded-2xl text-xs sm:text-sm font-bold"
                >
                  {erro}
                </div>
              )}

              {/* Nome e Nº do Brinco */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 flex flex-col gap-1">
                  <label
                    htmlFor="nomeOvelha"
                    className="text-rosa text-sm font-bold"
                  >
                    Nome / Apelido:
                  </label>
                  <input
                    id="nomeOvelha"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: Amber"
                    className="bg-papel/90 border-2 border-rosa/30 focus:border-rosa focus:outline-none rounded-xl px-3.5 py-2.5 text-rosa font-bold text-base placeholder-rosa/50 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="brincoOvelha"
                    className="text-rosa text-sm font-bold"
                  >
                    Nº do Brinco:
                  </label>
                  <input
                    id="brincoOvelha"
                    type="text"
                    value={brinco}
                    onChange={(e) => setBrinco(e.target.value)}
                    placeholder={proximoBrincoSugerido}
                    className="bg-papel/90 border-2 border-rosa/30 focus:border-rosa focus:outline-none rounded-xl px-3 py-2.5 text-rosa font-bold text-base text-center placeholder-rosa/50 transition-all uppercase"
                  />
                </div>
              </div>

              {/* Categoria */}
              <div className="flex flex-col gap-1.5">
                <span className="text-rosa text-sm font-bold">Categoria:</span>
                <div className="grid grid-cols-3 gap-2">
                  {(["Matriz", "Reprodutor", "Cordeiro(a)"] as CategoriaOvelha[]).map(
                    (cat) => {
                      const ativa = categoria === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCategoria(cat)}
                          className={`py-2 px-2 rounded-xl font-bold text-xs sm:text-sm transition-all border-2 ${
                            ativa
                              ? "bg-rosa text-white border-rosa shadow-sm scale-[1.02]"
                              : "bg-papel/80 text-rosa border-rosa/20 hover:bg-papel"
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Linhagem / Pelagem */}
              <div className="flex flex-col gap-1.5">
                <span className="text-rosa text-sm font-bold">
                  Linhagem / Pelagem:
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {(["Pelo Ralo", "Pelo Longo"] as PelagemOvelha[]).map((pel) => {
                    const ativa = pelagem === pel;
                    return (
                      <button
                        key={pel}
                        type="button"
                        onClick={() => setPelagem(pel)}
                        className={`py-2 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all border-2 ${
                          ativa
                            ? "bg-rosa text-white border-rosa shadow-sm scale-[1.02]"
                            : "bg-papel/80 text-rosa border-rosa/20 hover:bg-papel"
                        }`}
                      >
                        {pel}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Peso e Produção de Leite */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="pesoOvelha"
                    className="text-rosa text-sm font-bold"
                  >
                    Peso Corporal (kg):
                  </label>
                  <input
                    id="pesoOvelha"
                    type="number"
                    step="0.5"
                    min="1"
                    value={pesoKg}
                    onChange={(e) => setPesoKg(e.target.value)}
                    placeholder="Ex: 54"
                    className="bg-papel/90 border-2 border-rosa/30 focus:border-rosa focus:outline-none rounded-xl px-3.5 py-2 text-rosa font-bold text-base placeholder-rosa/50 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="leiteOvelha"
                    className="text-rosa text-sm font-bold"
                  >
                    Leite (L/dia):
                  </label>
                  <input
                    id="leiteOvelha"
                    type="number"
                    step="0.1"
                    min="0"
                    disabled={categoria !== "Matriz"}
                    value={categoria === "Matriz" ? producaoLitros : ""}
                    onChange={(e) => setProducaoLitros(e.target.value)}
                    placeholder={categoria === "Matriz" ? "Ex: 1,7" : "Não lactante"}
                    className="bg-papel/90 border-2 border-rosa/30 focus:border-rosa focus:outline-none rounded-xl px-3.5 py-2 text-rosa font-bold text-base placeholder-rosa/50 disabled:opacity-50 transition-all"
                  />
                </div>
              </div>

              {/* Status da Vacinação */}
              <div className="flex flex-col gap-1.5">
                <span className="text-rosa text-sm font-bold">
                  Carteira de Vacinação:
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {(["Em dia", "Pendente"] as StatusVacina[]).map((st) => {
                    const ativa = vacinacao === st;
                    return (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setVacinacao(st)}
                        className={`inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all border-2 ${
                          ativa
                            ? "bg-rosa text-white border-rosa shadow-sm scale-[1.02]"
                            : "bg-papel/80 text-rosa border-rosa/20 hover:bg-papel"
                        }`}
                      >
                        <Icone
                          nome={st === "Em dia" ? "shield-check" : "shield-alert"}
                          className="w-4 h-4"
                        />
                        <span>{st}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Seletor de Foto da Ovelha */}
              <div className="flex flex-col gap-1.5">
                <span className="text-rosa text-sm font-bold">
                  Foto para a Ficha:
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  {fotosOvelhasRegistro.map((item) => {
                    const selecionada = foto === item.src;
                    return (
                      <button
                        key={item.src}
                        type="button"
                        onClick={() => setFoto(item.src)}
                        className={`flex flex-col items-center p-1.5 rounded-2xl border-2 transition-all ${
                          selecionada
                            ? "bg-papel border-rosa ring-2 ring-rosa/25 scale-[1.03]"
                            : "bg-papel/60 border-transparent hover:border-rosa/40"
                        }`}
                      >
                        <img
                          src={item.src}
                          alt={item.rotulo}
                          className="w-full h-14 object-cover rounded-xl"
                        />
                        <span className="text-[10px] font-bold text-rosa mt-1 leading-tight text-center">
                          {item.rotulo}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Observação Opcional */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="obsOvelha"
                  className="text-rosa text-sm font-bold"
                >
                  Anotação de Manejo (opcional):
                </label>
                <input
                  id="obsOvelha"
                  type="text"
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                  placeholder="Ex: Parto duplo, filha de reprodutor premiado..."
                  className="bg-papel/90 border-2 border-rosa/30 focus:border-rosa focus:outline-none rounded-xl px-3.5 py-2 text-rosa font-medium text-sm placeholder-rosa/50 transition-all"
                />
              </div>

              <button
                type="submit"
                className="mt-1 inline-flex items-center justify-center gap-2 bg-rosa text-white font-bold text-lg py-3 px-6 rounded-full hover:bg-rosa-escuro hover:scale-[1.02] active:scale-95 transition-all shadow-md"
              >
                <Icone nome="plus" className="w-5 h-5" />
                <span>Registrar no Rebanho</span>
              </button>
            </form>
          </div>

          {/* COLUNA DIREITA (60%): Catálogo / Anuário do Rebanho */}
          <div className="w-full xl:w-[60%] flex flex-col gap-6 z-20">
            {/* Barra de Filtros e Restauração */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-papel/80 border border-rosa/15 rounded-2xl p-3 sm:p-4">
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
                      {aba === "Todas" ? `Todas (${rebanho.length})` : aba}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleRestaurarExemplos}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-rosa/80 hover:text-rosa hover:underline px-2 py-1"
              >
                <Icone nome="rotate-ccw" className="w-3.5 h-3.5" />
                <span>Restaurar exemplos</span>
              </button>
            </div>

            {/* Grade de Fichas Zootécnicas */}
            {rebanhoFiltrado.length === 0 ? (
              <div className="bg-amarelo-card rounded-[2.5rem] p-10 text-center flex flex-col items-center gap-3">
                <Estrela className="w-10 h-10" filtroRosa />
                <p className="text-rosa text-lg font-bold">
                  Nenhuma ovelha encontrada nesta categoria.
                </p>
                <p className="text-black/75 text-sm font-medium">
                  Use o formulário ao lado para cadastrar um novo animal ou troque o filtro acima!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rebanhoFiltrado.map((animal) => {
                  const ehRecente = destaqueRecente === animal.id;
                  const vacinaOk = animal.vacinacao === "Em dia";

                  return (
                    <article
                      key={animal.id}
                      className={`bg-amarelo-card rounded-[2.2rem] p-6 shadow-md flex flex-col justify-between relative transition-all duration-300 border-[3px] ${
                        ehRecente
                          ? "border-rosa ring-4 ring-rosa/25 animate-pop-up"
                          : "border-transparent hover:-translate-y-1 hover:border-rosa/40"
                      }`}
                    >
                      <div>
                        {/* Topo da Ficha: Brinco + Botão de Status de Vacina */}
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <span className="inline-flex items-center gap-1.5 bg-rosa text-white text-xs font-black px-3 py-1 rounded-full shadow-sm">
                            <Icone nome="tag" className="w-3.5 h-3.5" />
                            <span>{animal.brinco}</span>
                          </span>

                          <button
                            type="button"
                            onClick={() => handleAlternarVacina(animal.id)}
                            title="Clique para alternar o status da vacinação"
                            className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border transition-all ${
                              vacinaOk
                                ? "bg-papel text-rosa border-rosa/30 hover:bg-white"
                                : "bg-white text-rosa border-dashed border-rosa hover:bg-papel"
                            }`}
                          >
                            <Icone
                              nome={vacinaOk ? "shield-check" : "shield-alert"}
                              className="w-3.5 h-3.5"
                            />
                            <span>
                              Vacina: {animal.vacinacao}
                            </span>
                          </button>
                        </div>

                        {/* Moldura estilo recorte com pontos de ancoragem (igual à Home) */}
                        <div className="relative border-[1.5px] border-black p-1 bg-white/40 mb-4">
                          <div className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 border-[1.5px] border-black bg-white z-10"></div>
                          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 border-[1.5px] border-black bg-white z-10"></div>
                          <div className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 border-[1.5px] border-black bg-white z-10"></div>
                          <div className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 border-[1.5px] border-black bg-white z-10"></div>
                          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 border-[1.5px] border-black bg-white z-10"></div>
                          <div className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 border-[1.5px] border-black bg-white z-10"></div>

                          <img
                            src={animal.foto}
                            alt={`Ovelha ${animal.nome}`}
                            className="w-full h-44 object-cover"
                          />
                        </div>

                        {/* Nome e Categoria */}
                        <div className="flex items-baseline justify-between gap-2 mb-3">
                          <h3
                            className="text-3xl font-serif text-amarelo italic leading-none"
                            style={{
                              textShadow:
                                "1.5px 1.5px 0px #D03C7A, -1px -1px 0px #D03C7A, 1px -1px 0px #D03C7A, -1px 1px 0px #D03C7A",
                            }}
                          >
                            {animal.nome}
                          </h3>
                          <span className="text-xs font-extrabold text-rosa bg-papel/80 px-2.5 py-0.5 rounded-full border border-rosa/20">
                            {animal.categoria} • {animal.pelagem}
                          </span>
                        </div>

                        {/* Métricas Zootécnicas */}
                        <div className="grid grid-cols-2 gap-2 bg-papel/90 rounded-2xl p-3 mb-3 border border-rosa/15">
                          <div className="flex items-center gap-2">
                            <Icone nome="scale" className="w-4 h-4 text-rosa" />
                            <div>
                              <p className="text-[10px] font-bold text-black/60 leading-none">
                                Peso
                              </p>
                              <p className="text-sm font-black text-rosa">
                                {animal.pesoKg} kg
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Icone
                              nome="droplets"
                              className="w-4 h-4 text-rosa"
                            />
                            <div>
                              <p className="text-[10px] font-bold text-black/60 leading-none">
                                Produção
                              </p>
                              <p className="text-sm font-black text-rosa">
                                {animal.producaoLitros} L/dia
                              </p>
                            </div>
                          </div>
                        </div>

                        <p className="text-black/80 text-xs sm:text-sm font-medium leading-relaxed">
                          {animal.observacao}
                        </p>
                      </div>

                      {/* Rodapé da Ficha */}
                      <div className="flex justify-end items-center mt-4 pt-2 border-t border-black/10">
                        <button
                          type="button"
                          onClick={() => handleRemover(animal.id)}
                          aria-label={`Remover registro de ${animal.nome}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-rosa/75 hover:text-rosa hover:underline"
                        >
                          <Icone nome="trash-2" className="w-3.5 h-3.5" />
                          <span>Remover ficha</span>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
