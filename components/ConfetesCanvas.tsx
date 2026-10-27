"use client";

import { useEffect, useRef } from "react";

interface Particula {
  x: number;
  y: number;
  tamanho: number;
  cor: string;
  velocidadeX: number;
  velocidadeY: number;
  rotacao: number;
  velocidadeRotacao: number;
}

interface ConfetesCanvasProps {
  ativo: boolean;
}

/**
 * Chuva de confetes em Canvas (60 FPS) nas cores da identidade visual das Patricinhas.
 */
export default function ConfetesCanvas({ ativo }: ConfetesCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animacaoRef = useRef<number | null>(null);

  useEffect(() => {
    if (!ativo || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cores = ["#D03C7A", "#E2C337", "#FFFFFF", "#F1F3E9", "#FF85B3"];
    const particulas: Particula[] = [];

    for (let i = 0; i < 150; i++) {
      particulas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height - 20,
        tamanho: Math.random() * 8 + 6,
        cor: cores[Math.floor(Math.random() * cores.length)],
        velocidadeX: Math.random() * 4 - 2,
        velocidadeY: Math.random() * 5 + 4,
        rotacao: Math.random() * 360,
        velocidadeRotacao: Math.random() * 10 - 5,
      });
    }

    const animar = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let particulasAtivas = false;

      particulas.forEach((p) => {
        p.y += p.velocidadeY;
        p.x += p.velocidadeX;
        p.rotacao += p.velocidadeRotacao;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotacao * Math.PI) / 180);
        ctx.fillStyle = p.cor;
        ctx.fillRect(-p.tamanho / 2, -p.tamanho / 2, p.tamanho, p.tamanho);
        ctx.restore();

        if (p.y < canvas.height) {
          particulasAtivas = true;
        }
      });

      if (particulasAtivas) {
        animacaoRef.current = requestAnimationFrame(animar);
      }
    };

    animar();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animacaoRef.current) cancelAnimationFrame(animacaoRef.current);
    };
  }, [ativo]);

  if (!ativo) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-50"
    />
  );
}
