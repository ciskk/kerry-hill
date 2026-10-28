// ============================================================================
// DADOS E TEXTOS DO SITE - AS PATRICINHAS DE KERRY HILL
// Arquivo centralizado para facilitar a leitura e manutenção do código
// ============================================================================

export interface LinkNavegacao {
  href: string;
  label: string;
}

export const linksNavegacao: LinkNavegacao[] = [
  { href: "/", label: "Início" },
  { href: "/guia", label: "Guia" },
  { href: "/leite", label: "Leite" },
  { href: "/genetica", label: "Genética" },
  { href: "/calculadora", label: "Calculadora" },
  { href: "/registro", label: "Registro" },
  { href: "/contato", label: "Contato" },
];

// Cards de destaque exibidos na página inicial (Home)
export interface DestaqueHome {
  titulo: string;
  href: string;
  descricao: string;
  delayClass: string;
}

export const destaquesHome: DestaqueHome[] = [
  {
    titulo: "Genética",
    href: "/genetica",
    descricao:
      "Selecione os melhores animais. Aprenda como a genética pode aumentar a produtividade, a resistência e a qualidade do rebanho.",
    delayClass: "delay-100",
  },
  {
    titulo: "Produção de Leite",
    href: "/leite",
    descricao:
      "Mais leite, mais resultados. Conheça os fatores que influenciam a produção e descubra práticas para melhorar o desempenho das ovelhas.",
    delayClass: "delay-300",
  },
  {
    titulo: "Guia do Criador",
    href: "/guia",
    descricao:
      "Dicas para o dia a dia. Encontre orientações práticas sobre manejo, alimentação, reprodução e cuidados com o rebanho.",
    delayClass: "delay-500",
  },
];

// Balões de perguntas, fotos e checklist da página O Guia do Criador (/guia)
export interface PerguntaGuia {
  pergunta: string;
  resposta: string;
}

export const perguntasGuia: PerguntaGuia[] = [
  {
    pergunta: "Cuidados com cordeiros recém-nascidos.",
    resposta:
      "Garanta a mamada do colostro na primeira hora de vida para imunidade, desinfete o cordão umbilical com iodo a 10% e certifique-se de que o abrigo está limpo, seco e protegido de ventos frios.",
  },
  {
    pergunta: "Como escolher um bom reprodutor?",
    resposta:
      "Busque animais ativos com excelente conformação corporal, histórico genético comprovado de ganho de peso das gerações passadas, aprumos fortes e dentes sem problemas de mastigação.",
  },
  {
    pergunta: "Como identificar uma matriz produtiva?",
    resposta:
      "Verifique o histórico de partos fáceis e duplos, a conformação ideal do úbere (com duas tetas funcionais e flexíveis) e a boa produção de leite para amamentar os filhotes.",
  },
];

export interface TopicoFotoGuia {
  titulo: string;
  selo: string;
  imagem: string;
  resumo: string;
  detalhes: string;
}

export const topicosFotosGuia: TopicoFotoGuia[] = [
  {
    titulo: "Guia de Vacinação",
    selo: "Imunização",
    imagem: "/assets/guia-vacina.jpg",
    resumo: "Calendário essencial de imunização do rebanho",
    detalhes:
      "A vacinação contra clostridioses é indispensável nos ovinos: aplique a primeira dose nos cordeiros aos 60 dias de vida, com reforço após 30 dias. Nas matrizes, faça o reforço anual no terço final da gestação para transferir anticorpos pelo colostro. Mantenha também a vermifugação seletiva (método Famacha) e a vacina antirrábica conforme a região.",
  },
  {
    titulo: "Cuidados na Lactação",
    selo: "Amamentação",
    imagem: "/assets/guia-amamentacao.jpg",
    resumo: "Nutrição e saúde do úbere durante a amamentação",
    detalhes:
      "Durante a lactação, a necessidade de água e energia da ovelha dobra. Deixe água limpa e fresca sempre disponível à sombra, ofereça volumoso de alta qualidade com sal mineral específico para ovinos (baixo teor de cobre) e avalie o úbere semanalmente para prevenir a mastite e garantir o ganho de peso dos cordeiros.",
  },
];

export interface ItemChecklistGuia {
  id: string;
  turno: "Manhã" | "Tarde" | "Semanal";
  tarefa: string;
  detalhe: string;
}

export const checklistManejoGuia: ItemChecklistGuia[] = [
  {
    id: "chk-1",
    turno: "Manhã",
    tarefa: "Inspeção dos bebedouros à sombra e troca de água fresca",
    detalhe: "Ovelhas lactantes bebem até 10 L/dia; água quente reduz o consumo de ração.",
  },
  {
    id: "chk-2",
    turno: "Manhã",
    tarefa: "Ordenha higiênica e teste da caneca de fundo escuro",
    detalhe: "Detecta precocemente alterações no leite e previne casos de mastite no rebanho.",
  },
  {
    id: "chk-3",
    turno: "Tarde",
    tarefa: "Suplementação no cocho e reposição de sal mineral ovino",
    detalhe: "Utilizar exclusivamente sal mineral específico para ovinos (baixo teor de cobre).",
  },
  {
    id: "chk-4",
    turno: "Tarde",
    tarefa: "Recolhimento das matrizes e cordeiros ao aprisco seco",
    detalhe: "Protege contra predadores, sereno frio e umidade excessiva nos cascos.",
  },
  {
    id: "chk-5",
    turno: "Semanal",
    tarefa: "Avaliação ocular Famacha e escore de condição corporal (ECC)",
    detalhe: "Identifica anemia por verminose seletivamente sem precisar medicar todo o rebanho.",
  },
  {
    id: "chk-6",
    turno: "Semanal",
    tarefa: "Conferência dos brincos e atualização do Livro de Registro",
    detalhe: "Mantém a rastreabilidade genética e o histórico de pesagem sempre em dia.",
  },
];

// Dados das garrafas interativas da página Produção de Leite (/leite)
export interface DadoGarrafaLeite {
  percentual: string;
  rotulo: string;
  alturaBase: string;
  alturaAtiva: string;
  titulo: string;
  descricao: string;
}

export const dadosGarrafasLeite: DadoGarrafaLeite[] = [
  {
    percentual: "45%",
    rotulo: "Crescimento da produção",
    alturaBase: "h-[36%] sm:h-[32%]",
    alturaAtiva: "h-[41%] sm:h-[38%]",
    titulo: "45% de crescimento na produção nacional",
    descricao:
      "Nos últimos anos, a produção de leite de ovelha no Brasil apresentou um crescimento de aproximadamente 45%, impulsionado pelo interesse dos consumidores por produtos diferenciados e de maior valor agregado, como queijos artesanais, iogurtes e doces finos.",
  },
  {
    percentual: "70%",
    rotulo: "Beneficiado na fazenda",
    alturaBase: "h-[46%] sm:h-[44%]",
    alturaAtiva: "h-[51%] sm:h-[50%]",
    titulo: "70% do leite é processado na própria fazenda",
    descricao:
      "Cerca de 70% do leite ovino brasileiro é transformado dentro da própria propriedade em queijos maturados, ricotas e iogurtes artesanais, gerando maior renda direta para o criador e preservando o frescor do leite.",
  },
  {
    percentual: "13%",
    rotulo: "Sólidos totais no leite",
    alturaBase: "h-[30%] sm:h-[24%]",
    alturaAtiva: "h-[35%] sm:h-[29%]",
    titulo: "13% a 19% de sólidos totais no leite ovino",
    descricao:
      "O leite de ovelha tem quase o dobro de sólidos (gordura, proteínas e minerais) em comparação ao leite bovino. Na prática, bastam 4 a 5 litros de leite de ovelha para produzir 1 kg de queijo (contra 10 litros no leite de vaca).",
  },
];

export interface ComparativoNutricionalLeite {
  nutriente: string;
  ovelhaValor: string;
  vacaValor: string;
  ovelhaPct: number;
  vacaPct: number;
  vantagem: string;
}

export const comparativoLeiteOvelhaVaca: ComparativoNutricionalLeite[] = [
  {
    nutriente: "Sólidos Totais",
    ovelhaValor: "18,5%",
    vacaValor: "12,5%",
    ovelhaPct: 92,
    vacaPct: 62,
    vantagem: "+48% mais rendimento na queijaria",
  },
  {
    nutriente: "Gordura Láctea (Glóbulos Finos)",
    ovelhaValor: "7,1%",
    vacaValor: "3,7%",
    ovelhaPct: 88,
    vacaPct: 46,
    vantagem: "Mais cremosidade e fácil digestão",
  },
  {
    nutriente: "Proteína (Caseína Alta)",
    ovelhaValor: "5,8%",
    vacaValor: "3,3%",
    ovelhaPct: 85,
    vacaPct: 48,
    vantagem: "Coagulação firme e rápida para queijos finos",
  },
  {
    nutriente: "Cálcio Biodisponível",
    ovelhaValor: "195 mg/100g",
    vacaValor: "120 mg/100g",
    ovelhaPct: 95,
    vacaPct: 58,
    vantagem: "+62% mais cálcio natural por porção",
  },
];

// Cards informativos expansíveis da seção inferior da página de Leite (/leite)
export interface CardInformativoLeite {
  id: number;
  tituloLinha1: string;
  tituloLinha2: string;
  resumoTexto?: string;
  resumoItens?: string[];
  detalhes: string;
}

export const cardsInformativosLeite: CardInformativoLeite[] = [
  {
    id: 1,
    tituloLinha1: "Períodos Críticos",
    tituloLinha2: "da Lactação",
    resumoTexto: "O que fazer nas fases em que a ovelha precisa de mais nutrientes.",
    detalhes:
      "O terço inicial da lactação (primeiras 6 semanas) é a fase de pico de produção de leite. Como as ovelhas consomem menos energia do que gastam nesse período, é indispensável fornecer volumoso de altíssima qualidade e suplementar com ração concentrada para evitar a perda de peso excessiva e distúrbios como a cetose.",
  },
  {
    id: 2,
    tituloLinha1: "Indicadores que o",
    tituloLinha2: "Criador Deve Acompanhar",
    resumoItens: [
      "Produção diária",
      "Consumo de água",
      "Condição corporal",
      "Saúde da glândula mamária",
    ],
    detalhes:
      "Anote as variações diárias! Quedas repentinas de leite indicam problemas de saúde. Lembre-se que ovelhas lactantes podem beber mais de 10 litros de água por dia. Além disso, faça exames visuais regulares no úbere para identificar mastite subclínica precocemente.",
  },
  {
    id: 3,
    tituloLinha1: "Impacto do Calor",
    tituloLinha2: "na Produção",
    resumoTexto:
      "Especialmente importante para o Nordeste. Dicas para amenizar o estresse térmico.",
    detalhes:
      "O estresse por calor diminui o apetite da ovelha e pode derrubar a produção de leite em até 30%. No Nordeste brasileiro, mantenha bebedouros sempre à sombra, adicione árvores nos pastos para sombra natural e evite movimentar o rebanho nas horas mais quentes do dia.",
  },
];

// ============================================================================
// ABA GENÉTICA (/genetica) - QUIZ, GALERIA DE LINHAGENS, SIMULADOR F1 E EVOLUÇÃO
// ============================================================================

export interface AtributoGenetico {
  rotulo: string;
  nivel: number; // 0 a 100
  destaque: string;
}

export interface OpcaoQuizGenetica {
  id: "esquerda" | "direita";
  titulo: string;
  selo: string;
  genotipo: string;
  imagem: string;
  alt: string;
  textoIntroducao: string;
  caracteristicas: string[];
  atributosBarras: AtributoGenetico[];
}

export const opcoesQuizGenetica: Record<"esquerda" | "direita", OpcaoQuizGenetica> = {
  esquerda: {
    id: "esquerda",
    titulo: "Opção A: Pelo Ralo",
    selo: "Alta Performance",
    genotipo: "Linhagem Tropicalizada (RR)",
    imagem: "/assets/genetica-pelo-ralo.jpg",
    alt: "Ovelha reprodutora com características de pelo ralo",
    textoIntroducao:
      "O melhoramento genético é o conjunto de técnicas utilizadas para selecionar e reproduzir os animais que possuem as melhores características, como maior produção de leite, boa fertilidade, resistência a doenças e adaptação ao clima da região.",
    caracteristicas: [
      "Produção de leite das filhas: alta (1,8 a 2,4 L/dia)",
      "Excelente dissipação de calor e resistência a parasitas",
      "Elevada fertilidade e partos duplos frequentes",
    ],
    atributosBarras: [
      { rotulo: "Potencial Leiteiro", nivel: 92, destaque: "Alto" },
      { rotulo: "Adaptação ao Calor", nivel: 95, destaque: "Excelente" },
      { rotulo: "Resistência & Fertilidade", nivel: 90, destaque: "Elevada" },
    ],
  },
  direita: {
    id: "direita",
    titulo: "Opção B: Pelo Longo",
    selo: "Linhagem Clássica",
    genotipo: "Linhagem Lanada (ll)",
    imagem: "/assets/genetica-pelo-longo.jpg",
    alt: "Ovelha reprodutora com características de pelo longo",
    textoIntroducao:
      "Ao escolher cuidadosamente os reprodutores e as matrizes, os criadores aumentam as chances de que essas qualidades sejam transmitidas para as próximas gerações. Dessa forma, o rebanho se torna mais produtivo, saudável e eficiente ao longo do tempo, contribuindo para melhores resultados na criação de ovinos.",
    caracteristicas: [
      "Lã densa e muito bonita para climas frios",
      "Produção de leite das filhas: média sob calor",
      "Exige tosquia periódica e sombra constante",
    ],
    atributosBarras: [
      { rotulo: "Potencial Leiteiro", nivel: 58, destaque: "Médio" },
      { rotulo: "Adaptação ao Calor", nivel: 45, destaque: "Sensível" },
      { rotulo: "Estética da Lã", nivel: 95, destaque: "Exuberante" },
    ],
  },
};

export interface LinhagemGenetica {
  id: string;
  nome: string;
  apelidoClube: string;
  selo: string;
  genotipo: string;
  imagem: string;
  herdabilidade: string;
  leiteMedio: string;
  toleranciaCalor: string;
  prolificidade: string;
  resumo: string;
  explicacaoCientifica: string;
  marcadoresDna: string[];
}

export const linhagensGenetica: LinhagemGenetica[] = [
  {
    id: "kerry-pura",
    nome: "Kerry Hill Pura (Origem Galesa)",
    apelidoClube: "A Patricinha Clássica",
    selo: "Padrão Oficial da Raça",
    genotipo: "KH / KH • Dominante",
    imagem: "/assets/genetica-kerry-hill-pura.jpg",
    herdabilidade: "h² = 0,35 (Alta fidelidade racial)",
    leiteMedio: "1,7 L/dia",
    toleranciaCalor: "Moderada (Clima Ameno)",
    prolificidade: "1,75 cordeiro/parto",
    resumo:
      "Reconhecida mundialmente pelas manchas pretas simétricas nos olhos, focinho, orelhas e joelhos.",
    explicacaoCientifica:
      "Originária do condado de Powys (País de Gales), a Kerry Hill pura transmite excelente habilidade materna, docilidade extrema e leite com altíssimo teor de sólidos (proteína e gordura). Em regiões tropicais, é a base ideal para cruzamentos absorventes ou industriais.",
    marcadoresDna: [
      "Pigmentação ocular preta (proteção solar natural contra fotofobia)",
      "Úbere bem inserido e tetas simétricas",
      "Alta longevidade produtiva no rebanho",
    ],
  },
  {
    id: "pelo-ralo-tropical",
    nome: "Seleção Pelo Ralo Tropical",
    apelidoClube: "A Rainha do Nordeste",
    selo: "Adaptação Climática",
    genotipo: "RR / TC • Termotolerante",
    imagem: "/assets/genetica-pelo-ralo.jpg",
    herdabilidade: "h² = 0,42 (Pelagem & Rusticidade)",
    leiteMedio: "1,9 L/dia",
    toleranciaCalor: "Máxima (Até 38 °C sem estresse)",
    prolificidade: "1,80 cordeiro/parto",
    resumo:
      "Pelagem curta e lisa que reflete a radiação solar e elimina o custo de tosquia em regiões quentes.",
    explicacaoCientifica:
      "Animais selecionados para pelo ralo mantêm a frequência respiratória estável mesmo sob sol forte, não reduzem a ingestão de matéria seca no verão e apresentam até 65% menos infestação por ectoparasitas, destinando toda a energia da dieta para a síntese de leite.",
    marcadoresDna: [
      "Gene de pelagem curta com baixa retenção térmica",
      "Alta resistência natural a verminoses gastrintestinais",
      "Persistência de lactação mesmo na estação seca",
    ],
  },
  {
    id: "cordeiro-f1-hibrido",
    nome: "Cruzamento F1 (Vigor Híbrido)",
    apelidoClube: "A Nova Geração VIP",
    selo: "Heterose Máxima",
    genotipo: "KH × RR • Híbrido F1",
    imagem: "/assets/genetica-cordeiro-hibrido.jpg",
    herdabilidade: "Ganho de Heterose: +18% a +25%",
    leiteMedio: "2,2 L/dia (fêmeas adultas)",
    toleranciaCalor: "Alta (94% de adaptação)",
    prolificidade: "1,90 cordeiro/parto",
    resumo:
      "Combina a riqueza láctea e estética da Kerry Hill com a rusticidade tropical do Pelo Ralo.",
    explicacaoCientifica:
      "O fenômeno genético da Heterose (ou Vigor Híbrido) ocorre quando cruzamos duas linhagens distintas e complementares. Os cordeiros F1 nascem mais vigorosos, ganham peso mais rápido até o desmame e as fêmeas F1 superam a média dos próprios pais em produção de leite e fertilidade!",
    marcadoresDna: [
      "Pelagem intermediária curta com marcações Kerry Hill",
      "Maior taxa de sobrevivência neonatal (+22%)",
      "Conversão alimentar superior em pasto e cocho",
    ],
  },
  {
    id: "matriz-campeao-leite",
    nome: "Matriz Elite Dupla Aptidão",
    apelidoClube: "A Líder do Laticínio",
    selo: "Linhagem Leiteira",
    genotipo: "CSN3-BB • Kappa-Caseína B",
    imagem: "/assets/genetica-matriz-premiada.jpg",
    herdabilidade: "h² = 0,30 (Volume & Sólidos)",
    leiteMedio: "2,5 L/dia",
    toleranciaCalor: "Alta com manejo sombreado",
    prolificidade: "1,85 cordeiro/parto",
    resumo:
      "Selecionada por provas zootécnicas para máximo rendimento em queijos finos e lactação longa.",
    explicacaoCientifica:
      "Portadora do alelo B da Kappa-Caseína, proteína que torna o coágulo do leite mais firme e aumenta o rendimento queijeiro em até 12%. Possui lactação persistente de 180 a 210 dias e conformação de úbere ideal para ordenha mecânica ou manual.",
    marcadoresDna: [
      "Alelo CSN3-BB para alta concentração de caseína",
      "Capacidade torácica e digestiva ampliada",
      "Temperamento calmo na sala de ordenha",
    ],
  },
];

// Simulador Interativo de Cruzamento Genético (Pai x Mãe -> Cordeiro F1)
export interface OpcaoParenteCruzamento {
  id: string;
  nome: string;
  linhagem: string;
  genotipo: string;
  imagem: string;
  leiteBase: number;
  calorBase: number;
  rusticidadeBase: number;
  solidosBase: number;
}

export const reprodutoresCruzamento: OpcaoParenteCruzamento[] = [
  {
    id: "pai-ralo",
    nome: "Reprodutor Pelo Ralo Tropical",
    linhagem: "Pelo Ralo Adaptado",
    genotipo: "RR (Homozigoto Tropical)",
    imagem: "/assets/genetica-pelo-ralo.jpg",
    leiteBase: 88,
    calorBase: 98,
    rusticidadeBase: 95,
    solidosBase: 86,
  },
  {
    id: "pai-kerry",
    nome: "Reprodutor Kerry Hill Puro",
    linhagem: "Padrão Britânico",
    genotipo: "KH (Linhagem Galesa)",
    imagem: "/assets/genetica-kerry-hill-pura.jpg",
    leiteBase: 85,
    calorBase: 72,
    rusticidadeBase: 80,
    solidosBase: 96,
  },
  {
    id: "pai-f1",
    nome: "Reprodutor Mestiço F1 Selecionado",
    linhagem: "Composto Kerry × Pelo Ralo",
    genotipo: "KR (Heterozigoto Elite)",
    imagem: "/assets/genetica-cordeiro-hibrido.jpg",
    leiteBase: 92,
    calorBase: 91,
    rusticidadeBase: 92,
    solidosBase: 92,
  },
];

export const matrizesCruzamento: OpcaoParenteCruzamento[] = [
  {
    id: "mae-kerry",
    nome: "Matriz Kerry Hill Pura",
    linhagem: "Padrão Britânico",
    genotipo: "KH (Alta Habilidade Materna)",
    imagem: "/assets/inicio-ovelha-fofa.jpeg",
    leiteBase: 86,
    calorBase: 74,
    rusticidadeBase: 82,
    solidosBase: 96,
  },
  {
    id: "mae-premiada",
    nome: "Matriz Campeã de Lactação",
    linhagem: "Elite Leiteira Tropical",
    genotipo: "CSN3-BB (Pelo Curto)",
    imagem: "/assets/genetica-matriz-premiada.jpg",
    leiteBase: 96,
    calorBase: 90,
    rusticidadeBase: 90,
    solidosBase: 94,
  },
  {
    id: "mae-longo",
    nome: "Matriz Linhagem Pelo Longo",
    linhagem: "Clássica Lanada",
    genotipo: "ll (Lã Densa)",
    imagem: "/assets/genetica-pelo-longo.jpg",
    leiteBase: 64,
    calorBase: 48,
    rusticidadeBase: 66,
    solidosBase: 84,
  },
];

export interface ResultadoCruzamentoF1 {
  tituloNinhada: string;
  genotipoFilhote: string;
  pelagemResultante: string;
  vigorHibridoBonus: string;
  imagemFilhote: string;
  leiteFinal: number;
  calorFinal: number;
  rusticidadeFinal: number;
  solidosFinal: number;
  estimativaLitrosDia: string;
  vereditoCher: string;
}

export function calcularCruzamentoF1(
  paiId: string,
  maeId: string
): ResultadoCruzamentoF1 {
  const pai =
    reprodutoresCruzamento.find((p) => p.id === paiId) ??
    reprodutoresCruzamento[0];
  const mae =
    matrizesCruzamento.find((m) => m.id === maeId) ?? matrizesCruzamento[0];

  // Se os pais são de linhagens diferentes, aplica bônus de heterose (vigor híbrido)
  const temHeteroseAlta = pai.linhagem !== mae.linhagem;
  const bonus = temHeteroseAlta ? 7 : 2;

  const leiteFinal = Math.min(
    99,
    Math.round((pai.leiteBase + mae.leiteBase) / 2 + bonus)
  );
  const calorFinal = Math.min(
    99,
    Math.round((pai.calorBase * 0.55 + mae.calorBase * 0.45) + (temHeteroseAlta ? 5 : 0))
  );
  const rusticidadeFinal = Math.min(
    99,
    Math.round((pai.rusticidadeBase + mae.rusticidadeBase) / 2 + bonus)
  );
  const solidosFinal = Math.min(
    99,
    Math.round((pai.solidosBase + mae.solidosBase) / 2 + (temHeteroseAlta ? 4 : 1))
  );

  const litrosNum = 1.1 + (leiteFinal / 100) * 1.35;
  const estimativaLitrosDia = litrosNum.toFixed(1).replace(".", ",");

  if (pai.id === "pai-ralo" && (mae.id === "mae-kerry" || mae.id === "mae-premiada")) {
    return {
      tituloNinhada: "Cordeiro(a) F1 Gold Standard (Kerry × Pelo Ralo)",
      genotipoFilhote: "KR-F1 • Heterose Máxima (+22%)",
      pelagemResultante: "Pelo Ralo com Marcações Kerry Hill",
      vigorHibridoBonus: "+22% de Vigor Híbrido",
      imagemFilhote: "/assets/genetica-cordeiro-hibrido.jpg",
      leiteFinal,
      calorFinal,
      rusticidadeFinal,
      solidosFinal,
      estimativaLitrosDia,
      vereditoCher:
        "Aprovadíssimo pelas Patricinhas! Esse é o cruzamento dos sonhos para o Brasil: une o leite riquíssimo da Kerry Hill com a resistência térmica imbatível do Pelo Ralo!",
    };
  }

  if (mae.id === "mae-longo" && pai.id === "pai-ralo") {
    return {
      tituloNinhada: "F1 de Transição Tropical (Melhoramento de Pelagem)",
      genotipoFilhote: "Rl-F1 • Pelagem Intermediária Curta",
      pelagemResultante: "Meio-Sangue Pelo Curto (Mais Fresco)",
      vigorHibridoBonus: "+18% de Ganho Adaptativo",
      imagemFilhote: "/assets/genetica-pelo-ralo.jpg",
      leiteFinal,
      calorFinal,
      rusticidadeFinal,
      solidosFinal,
      estimativaLitrosDia,
      vereditoCher:
        "Ótimo resgate genético! Usar o reprodutor de Pelo Ralo sobre a matriz de Pelo Longo já reduz o estresse térmico das filhas logo na primeira geração (F1)!",
    };
  }

  if (pai.id === "pai-kerry" && mae.id === "mae-kerry") {
    return {
      tituloNinhada: "Linhagem Pura Prescorrida (Kerry Hill Pedigree)",
      genotipoFilhote: "KH/KH • Homozigoto Puro",
      pelagemResultante: "Lã Clássica com Manchas Pretas Simétricas",
      vigorHibridoBonus: "Fidelidade Racial 100%",
      imagemFilhote: "/assets/genetica-kerry-hill-pura.jpg",
      leiteFinal,
      calorFinal,
      rusticidadeFinal,
      solidosFinal,
      estimativaLitrosDia,
      vereditoCher:
        "Um clássico britânico! Excelente para preservar o núcleo puro da raça e produzir matrizes lindas, mas lembre-se de garantir bastante sombra e água fresca no verão!",
    };
  }

  return {
    tituloNinhada: "Geração Selecionada de Dupla Aptidão",
    genotipoFilhote: "KH-Elite • Alto Valor Genético",
    pelagemResultante:
      calorFinal >= 85 ? "Pelagem Curta Adaptada" : "Pelagem Mista Selecionada",
    vigorHibridoBonus: temHeteroseAlta ? "+16% de Vigor Híbrido" : "+8% de Consolidação",
    imagemFilhote:
      leiteFinal >= 90
        ? "/assets/genetica-matriz-premiada.jpg"
        : "/assets/genetica-cordeiro-hibrido.jpg",
    leiteFinal,
    calorFinal,
    rusticidadeFinal,
    solidosFinal,
    estimativaLitrosDia,
    vereditoCher:
      "Combinação super equilibrada! A prole herda ótimo volume de leite com alto teor de sólidos para queijos artesanais e excelente saúde de rebanho.",
  };
}

export interface EtapaEvolucaoGeracao {
  geracao: string;
  titulo: string;
  composicaoGenetica: string;
  leiteMedio: string;
  adaptacaoCalor: number;
  descricao: string;
}

export const geracoesEvolucaoGenetica: EtapaEvolucaoGeracao[] = [
  {
    geracao: "G0",
    titulo: "Rebanho Base Inicial",
    composicaoGenetica: "Matrizes sem seleção dirigida",
    leiteMedio: "0,9 L/dia",
    adaptacaoCalor: 55,
    descricao:
      "Rebanho de partida com alta variação individual, menor persistência de lactação e sensibilidade ao calor nas horas de pico.",
  },
  {
    geracao: "F1",
    titulo: "1ª Geração: Choque de Sangue & Heterose",
    composicaoGenetica: "50% Kerry Hill + 50% Pelo Ralo",
    leiteMedio: "1,6 L/dia",
    adaptacaoCalor: 84,
    descricao:
      "O cruzamento dirigido dispara o vigor híbrido: cordeiros mais pesados ao desmame, queda drástica de ectoparasitas e salto no volume de leite.",
  },
  {
    geracao: "F2",
    titulo: "2ª Geração: Seleção por Desempenho",
    composicaoGenetica: "Acasalamento das melhores matrizes F1",
    leiteMedio: "2,0 L/dia",
    adaptacaoCalor: 91,
    descricao:
      "Através do Livro de Registro, apenas as filhas das ovelhas mais leiteiras e termotolerantes permanecem como matrizes.",
  },
  {
    geracao: "Elite",
    titulo: "Rebanho Estabilizado Kerry Hill Tropical",
    composicaoGenetica: "Núcleo Genético Consolidado",
    leiteMedio: "2,4 L/dia",
    adaptacaoCalor: 96,
    descricao:
      "Rebanho altamente produtivo, adaptado ao clima brasileiro, dócil na ordenha e com leite rico em sólidos para queijaria fina!",
  },
];

// Cenários rápidos da Calculadora (/calculadora) para agilizar a apresentação
export interface CenarioCalculadora {
  id: string;
  rotulo: string;
  qtdOvelhas: string;
  consumoRacao: string;
  qtdLactacao: string;
  producaoLeite: string;
}

export const cenariosCalculadora: CenarioCalculadora[] = [
  {
    id: "pequeno",
    rotulo: "Sítio Escola (12 ovelhas)",
    qtdOvelhas: "12",
    consumoRacao: "1,4",
    qtdLactacao: "8",
    producaoLeite: "1,6",
  },
  {
    id: "medio",
    rotulo: "Fazenda Boutique (35 ovelhas)",
    qtdOvelhas: "35",
    consumoRacao: "1,6",
    qtdLactacao: "24",
    producaoLeite: "1,8",
  },
  {
    id: "intensivo",
    rotulo: "Laticínio Premium (80 ovelhas)",
    qtdOvelhas: "80",
    consumoRacao: "1,8",
    qtdLactacao: "60",
    producaoLeite: "2,1",
  },
];

// Dados da aba Registro do Rebanho (/registro)
export type CategoriaOvelha = "Matriz" | "Reprodutor" | "Cordeiro(a)";
export type PelagemOvelha = "Pelo Ralo" | "Pelo Longo";
export type StatusVacina = "Em dia" | "Pendente";

export interface OvelhaRegistrada {
  id: string;
  brinco: string;
  nome: string;
  categoria: CategoriaOvelha;
  pelagem: PelagemOvelha;
  pesoKg: string;
  producaoLitros: string;
  vacinacao: StatusVacina;
  foto: string;
  observacao: string;
}

export const fotosOvelhasRegistro = [
  {
    src: "/assets/inicio-ovelha-fofa.jpeg",
    rotulo: "Clássica Kerry Hill",
  },
  {
    src: "/assets/genetica-kerry-hill-pura.jpg",
    rotulo: "Kerry Hill Pura",
  },
  {
    src: "/assets/genetica-pelo-ralo.jpg",
    rotulo: "Linhagem Pelo Ralo",
  },
  {
    src: "/assets/genetica-cordeiro-hibrido.jpg",
    rotulo: "Cordeiro(a) F1",
  },
  {
    src: "/assets/genetica-matriz-premiada.jpg",
    rotulo: "Matriz Campeã",
  },
  {
    src: "/assets/genetica-pelo-longo.jpg",
    rotulo: "Linhagem Pelo Longo",
  },
];

export const rebanhoInicial: OvelhaRegistrada[] = [
  {
    id: "kh-001",
    brinco: "KH-001",
    nome: "Cher",
    categoria: "Matriz",
    pelagem: "Pelo Ralo",
    pesoKg: "58",
    producaoLitros: "2,1",
    vacinacao: "Em dia",
    foto: "/assets/genetica-matriz-premiada.jpg",
    observacao: "Matriz líder do rebanho, dócil e com parto duplo recente.",
  },
  {
    id: "kh-002",
    brinco: "KH-002",
    nome: "Dionne",
    categoria: "Matriz",
    pelagem: "Pelo Ralo",
    pesoKg: "55",
    producaoLitros: "1,8",
    vacinacao: "Em dia",
    foto: "/assets/genetica-pelo-ralo.jpg",
    observacao: "Excelente adaptação térmica ao clima do Nordeste e leite rico em sólidos.",
  },
  {
    id: "kh-003",
    brinco: "KH-003",
    nome: "Amber",
    categoria: "Matriz",
    pelagem: "Pelo Longo",
    pesoKg: "60",
    producaoLitros: "1,7",
    vacinacao: "Em dia",
    foto: "/assets/genetica-kerry-hill-pura.jpg",
    observacao: "Linhagem pura britânica com manchas pretas simétricas nos olhos e patas.",
  },
  {
    id: "kh-004",
    brinco: "KH-004",
    nome: "Tai",
    categoria: "Cordeiro(a)",
    pelagem: "Pelo Ralo",
    pesoKg: "28",
    producaoLitros: "0,0",
    vacinacao: "Pendente",
    foto: "/assets/genetica-cordeiro-hibrido.jpg",
    observacao: "Filhote F1 com alto vigor híbrido, aguardando reforço de 30 dias da vacina.",
  },
];
