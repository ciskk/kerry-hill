// ============================================================================
// UTILITÁRIOS DE FORMATAÇÃO NUMÉRICA (PT-BR)
// Centraliza a conversão entre strings com vírgula decimal e números
// ============================================================================

/**
 * Converte uma string numérica em formato brasileiro (ex: "1,8" ou "1.8")
 * para um número ponto flutuante seguro. Retorna 0 caso inválido.
 */
export function lerNumeroPtBr(valor: string | number): number {
  if (typeof valor === "number") {
    return Number.isFinite(valor) ? valor : 0;
  }
  if (!valor || typeof valor !== "string") return 0;
  const limpo = valor.trim().replace(",", ".");
  const numero = parseFloat(limpo);
  return Number.isFinite(numero) ? numero : 0;
}

/**
 * Formata um número para exibição no padrão brasileiro com vírgula decimal.
 */
export function formatarNumeroPtBr(valor: number, casasDecimais = 1): string {
  const seguro = Number.isFinite(valor) ? valor : 0;
  return seguro.toFixed(casasDecimais).replace(".", ",");
}
