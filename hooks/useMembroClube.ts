"use client";

import { useEffect, useState } from "react";
import { CargoClubeVip, cargosClubeVip } from "@/data/conteudos";

export interface MembroClubeVip {
  nome: string;
  tipo: "cadastro" | "login";
  cargo: CargoClubeVip;
}

const CLUBE_STORAGE_KEY = "kerry_hill_clube_vip_v1";
const CLUBE_EVENT_NAME = "kerry-hill-clube-vip-change";

/**
 * Gerencia o membro ativo do Clube VIP Kerry Hill e sincroniza em tempo real
 * entre a página /contato e o crachá na Navbar.
 */
export function useMembroClube() {
  const [membroAtivo, setMembroAtivo] = useState<MembroClubeVip | null>(null);

  useEffect(() => {
    const carregarMembro = () => {
      try {
        const salvo = localStorage.getItem(CLUBE_STORAGE_KEY);
        if (salvo) {
          const parsed = JSON.parse(salvo);
          if (parsed && typeof parsed.nome === "string") {
            setMembroAtivo({
              nome: parsed.nome,
              tipo: parsed.tipo === "login" ? "login" : "cadastro",
              cargo: parsed.cargo || cargosClubeVip[0],
            });
            return;
          }
        }
        setMembroAtivo(null);
      } catch {
        setMembroAtivo(null);
      }
    };

    carregarMembro();
    window.addEventListener(CLUBE_EVENT_NAME, carregarMembro);
    window.addEventListener("storage", carregarMembro);

    return () => {
      window.removeEventListener(CLUBE_EVENT_NAME, carregarMembro);
      window.removeEventListener("storage", carregarMembro);
    };
  }, []);

  const salvarMembro = (novoMembro: MembroClubeVip) => {
    setMembroAtivo(novoMembro);
    try {
      localStorage.setItem(CLUBE_STORAGE_KEY, JSON.stringify(novoMembro));
      window.dispatchEvent(new Event(CLUBE_EVENT_NAME));
    } catch (e) {
      console.error("Erro ao salvar membro do clube:", e);
    }
  };

  const sairDoClube = () => {
    setMembroAtivo(null);
    try {
      localStorage.removeItem(CLUBE_STORAGE_KEY);
      window.dispatchEvent(new Event(CLUBE_EVENT_NAME));
    } catch (e) {
      console.error("Erro ao remover membro do clube:", e);
    }
  };

  return {
    membroAtivo,
    salvarMembro,
    sairDoClube,
  };
}
