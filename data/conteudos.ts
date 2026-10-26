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

// Balões de perguntas e fotos interativas da página O Guia do Criador (/guia)
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
  imagem: string;
  resumo: string;
  detalhes: string;
}

export const topicosFotosGuia: TopicoFotoGuia[] = [
  {
    titulo: "Guia de Vacinação",
    imagem: "/assets/guia-vacina.jpg",
    resumo: "Calendário essencial de imunização do rebanho",
    detalhes:
      "A vacinação contra clostridioses é indispensável nos ovinos: aplique a primeira dose nos cordeiros aos 60 dias de vida, com reforço após 30 dias. Nas matrizes, faça o reforço anual no terço final da gestação para transferir anticorpos pelo colostro. Mantenha também a vermifugação seletiva (método Famacha) e a vacina antirrábica conforme a região.",
  },
  {
    titulo: "Cuidados na Lactação",
    imagem: "/assets/guia-amamentacao.jpg",
    resumo: "Nutrição e saúde do úbere durante a amamentação",
    detalhes:
      "Durante a lactação, a necessidade de água e energia da ovelha dobra. Deixe água limpa e fresca sempre disponível à sombra, ofereça volumoso de alta qualidade com sal mineral específico para ovinos (baixo teor de cobre) e avalie o úbere semanalmente para prevenir a mastite e garantir o ganho de peso dos cordeiros.",
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

// Opções do quiz de Melhoramento Genético (/genetica)
export interface OpcaoQuizGenetica {
  id: "esquerda" | "direita";
  titulo: string;
  imagem: string;
  alt: string;
  textoIntroducao: string;
  caracteristicas: string[];
}

export const opcoesQuizGenetica: Record<"esquerda" | "direita", OpcaoQuizGenetica> = {
  esquerda: {
    id: "esquerda",
    titulo: "Opção A: Pelo Ralo",
    imagem: "/assets/genetica-pelo-ralo.jpg",
    alt: "Ovelha reprodutora com características de pelo ralo",
    textoIntroducao:
      "O melhoramento genético é o conjunto de técnicas utilizadas para selecionar e reproduzir os animais que possuem as melhores características, como maior produção de leite, boa fertilidade, resistência a doenças e adaptação ao clima da região.",
    caracteristicas: [
      "Produção de leite das filhas: alta",
      "Boa resistência a doenças",
      "Elevada fertilidade geral",
    ],
  },
  direita: {
    id: "direita",
    titulo: "Opção B: Pelo Longo",
    imagem: "/assets/genetica-pelo-longo.jpg",
    alt: "Ovelha reprodutora com características de pelo longo",
    textoIntroducao:
      "Ao escolher cuidadosamente os reprodutores e as matrizes, os criadores aumentam as chances de que essas qualidades sejam transmitidas para as próximas gerações. Dessa forma, o rebanho se torna mais produtivo, saudável e eficiente ao longo do tempo, contribuindo para melhores resultados na criação de ovinos.",
    caracteristicas: [
      "Muito bonito visualmente",
      "Produção de leite das filhas: média",
      "Resistência adaptativa média",
    ],
  },
};

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
    src: "/assets/genetica-pelo-ralo.jpg",
    rotulo: "Linhagem Pelo Ralo",
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
    producaoLitros: "1,8",
    vacinacao: "Em dia",
    foto: "/assets/inicio-ovelha-fofa.jpeg",
    observacao: "Matriz líder do rebanho, dócil e com parto duplo recente.",
  },
  {
    id: "kh-002",
    brinco: "KH-002",
    nome: "Dionne",
    categoria: "Matriz",
    pelagem: "Pelo Ralo",
    pesoKg: "55",
    producaoLitros: "1,6",
    vacinacao: "Em dia",
    foto: "/assets/genetica-pelo-ralo.jpg",
    observacao: "Excelente adaptação térmica ao clima do Nordeste e leite rico em sólidos.",
  },
  {
    id: "kh-003",
    brinco: "KH-003",
    nome: "Tai",
    categoria: "Cordeiro(a)",
    pelagem: "Pelo Longo",
    pesoKg: "26",
    producaoLitros: "0,0",
    vacinacao: "Pendente",
    foto: "/assets/genetica-pelo-longo.jpg",
    observacao: "Filhote em crescimento, aguardando reforço de 30 dias da vacina contra clostridioses.",
  },
];

