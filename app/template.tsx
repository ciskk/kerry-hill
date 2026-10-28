import React from "react";

/**
 * Template global do App Router (Next.js 16):
 * Remonta automaticamente a cada troca de rota/aba, acionando a transição
 * suave de entrada estilo revista/scrapbook e a barra luminosa superior.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex-1 flex flex-col w-full">
      {/* Barra luminosa sutil de transição de aba logo abaixo da Navbar */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-[60px] md:top-[68px] left-0 right-0 z-40 h-1 overflow-hidden"
      >
        <div className="h-full w-full bg-gradient-to-r from-rosa via-amarelo to-rosa origin-left animate-barra-rota" />
      </div>

      {/* Contêiner com transição fluida de entrada ao trocar de aba */}
      <div className="flex-1 flex flex-col w-full animate-transicao-aba">
        {children}
      </div>
    </div>
  );
}
