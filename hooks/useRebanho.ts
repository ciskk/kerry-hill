"use client";

import { useEffect, useState } from "react";
import { OvelhaRegistrada, rebanhoInicial } from "@/data/conteudos";
import { formatarNumeroPtBr, lerNumeroPtBr } from "@/lib/formatadores";

const STORAGE_KEY = "kerry_hill_rebanho_v1";
const REBANHO_EVENT_NAME = "kerry-hill-rebanho-change";

/**
 * Hook compartilhado para gerenciar o livro de registro do rebanho.
 * Permite que tanto a aba /registro quanto a /calculadora acessem os animais salvos.
 */
export function useRebanho() {
  const [rebanho, setRebanho] = useState<OvelhaRegistrada[]>(rebanhoInicial);

  useEffect(() => {
    const sincronizarRebanho = () => {
      try {
        const salvo = localStorage.getItem(STORAGE_KEY);
        if (salvo) {
          const parsed = JSON.parse(salvo);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setRebanho(parsed);
            return;
          }
        }
        setRebanho(rebanhoInicial);
      } catch (e) {
        console.error("Erro ao carregar rebanho salvo:", e);
      }
    };

    sincronizarRebanho();
    window.addEventListener(REBANHO_EVENT_NAME, sincronizarRebanho);
    window.addEventListener("storage", sincronizarRebanho);

    return () => {
      window.removeEventListener(REBANHO_EVENT_NAME, sincronizarRebanho);
      window.removeEventListener("storage", sincronizarRebanho);
    };
  }, []);

  const persistirRebanho = (novaLista: OvelhaRegistrada[]) => {
    setRebanho(novaLista);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
      window.dispatchEvent(new Event(REBANHO_EVENT_NAME));
    } catch (e) {
      console.error("Erro ao salvar rebanho:", e);
    }
  };

  const proximoBrincoSugerido = `KH-${String(rebanho.length + 1).padStart(3, "0")}`;

  const adicionarOvelha = (nova: OvelhaRegistrada) => {
    persistirRebanho([nova, ...rebanho]);
  };

  const alternarVacina = (id: string) => {
    const atualizado: OvelhaRegistrada[] = rebanho.map((item) =>
      item.id === id
        ? {
            ...item,
            vacinacao: item.vacinacao === "Em dia" ? "Pendente" : "Em dia",
          }
        : item
    );
    persistirRebanho(atualizado);
  };

  const removerOvelha = (id: string) => {
    persistirRebanho(rebanho.filter((item) => item.id !== id));
  };

  const restaurarExemplos = () => {
    persistirRebanho(rebanhoInicial);
  };

  // Estatísticas zootécnicas calculadas automaticamente
  const totalAnimais = rebanho.length;
  const matrizes = rebanho.filter((o) => o.categoria === "Matriz");
  const totalMatrizes = matrizes.length;
  const totalVacinadas = rebanho.filter((o) => o.vacinacao === "Em dia").length;

  const totalLeiteDiaNumero = rebanho.reduce(
    (acc, o) => acc + lerNumeroPtBr(o.producaoLitros),
    0
  );
  const totalLeiteDia = formatarNumeroPtBr(totalLeiteDiaNumero, 1);

  const mediaLeitePorMatriz =
    totalMatrizes > 0
      ? formatarNumeroPtBr(totalLeiteDiaNumero / totalMatrizes, 1)
      : "1,6";

  return {
    rebanho,
    proximoBrincoSugerido,
    totalAnimais,
    totalMatrizes,
    totalVacinadas,
    totalLeiteDia,
    totalLeiteDiaNumero,
    mediaLeitePorMatriz,
    adicionarOvelha,
    alternarVacina,
    removerOvelha,
    restaurarExemplos,
  };
}
