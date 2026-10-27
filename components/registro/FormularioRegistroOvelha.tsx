"use client";

import { useState } from "react";
import CursorPixel from "@/components/CursorPixel";
import Estrela from "@/components/Estrela";
import Icone from "@/components/Icone";
import {
  CategoriaOvelha,
  OvelhaRegistrada,
  PelagemOvelha,
  StatusVacina,
  fotosOvelhasRegistro,
} from "@/data/conteudos";
import { formatarNumeroPtBr, lerNumeroPtBr } from "@/lib/formatadores";

interface FormularioRegistroOvelhaProps {
  proximoBrincoSugerido: string;
  onRegistrar: (novaOvelha: OvelhaRegistrada) => void;
}

export default function FormularioRegistroOvelha({
  proximoBrincoSugerido,
  onRegistrar,
}: FormularioRegistroOvelhaProps) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim()) {
      setErro("Informe o nome ou apelido da ovelha para registrar!");
      return;
    }

    const pesoNum = lerNumeroPtBr(pesoKg);
    if (!pesoKg.trim() || pesoNum <= 0) {
      setErro("Informe um peso válido maior que zero (em kg)!");
      return;
    }

    const brincoFinal = brinco.trim()
      ? brinco.trim().toUpperCase()
      : proximoBrincoSugerido;

    const leiteFinal =
      categoria === "Matriz"
        ? formatarNumeroPtBr(lerNumeroPtBr(producaoLitros), 1)
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

    onRegistrar(novaOvelha);
    setErro("");

    setNome("");
    setBrinco("");
    setPesoKg("");
    setProducaoLitros("");
    setObservacao("");
  };

  return (
    <div className="w-full relative z-20">
      <div className="flex items-center gap-2 mb-3 ml-2">
        <Estrela className="w-6 h-6" filtroRosa />
        <h2 className="text-rosa text-xl sm:text-2xl font-bold tracking-tight">
          cadastrar nova ovelha no livro:
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-amarelo-card rounded-[2.5rem] p-6 sm:p-8 sombra-pop flex flex-col gap-5 relative border-2 border-rosa/15"
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
            <label htmlFor="nomeOvelha" className="text-rosa text-sm font-bold">
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
            <label htmlFor="pesoOvelha" className="text-rosa text-sm font-bold">
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
          <label htmlFor="obsOvelha" className="text-rosa text-sm font-bold">
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
  );
}
