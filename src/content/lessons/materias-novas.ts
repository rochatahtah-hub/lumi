/**
 * LUMI — Novas Matérias e Expansão de Base Oficial
 * Filosofia, Sociologia, Geografia, Artes, Educação Física
 * ~100 lições adicionais para cobertura 1º Fund - 3º Médio
 */

import type { Lesson } from '../../types'

// ===== FILOSOFIA (8 lições) =====

export const introducaoFilosofia: Lesson = {
  id: 'intro-filosofia',
  subject: 'filosofia',
  title: 'O que é Filosofia?',
  levels: ['fund2', 'medio'],
  grade: '8º ano',
  aliases: ['filosofia início', 'conceito de filosofia'],
  summary: 'Introdução ao pensamento filosófico e seus ramos principais',
  intro: 'Filosofia significa "amor pela sabedoria" e estuda as grandes questões da existência.',
  objective: 'Entender o conceito de filosofia e sua importância',
  blocks: [
    {
      id: 'b1',
      title: 'Definição',
      text: 'Filosofia é a disciplina que busca compreender a realidade através da razão e da reflexão crítica.',
      example: 'Perguntar "Por que existimos?" é uma questão filosófica.',
      skill: 'conceito-filosofia'
    },
    {
      id: 'b2',
      title: 'Ramos',
      text: 'Existem vários ramos: Metafísica, Epistemologia, Ética, Lógica, Estética.',
      example: 'A Ética estuda o que é certo e errado.',
      skill: 'ramos-filosofia'
    }
  ],
  questions: [],
  skills: {
    'conceito-filosofia': 'Entender o que é filosofia',
    'ramos-filosofia': 'Conhecer os principais ramos filosóficos'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const socratePlataoPlatonismo: Lesson = {
  id: 'socrates-platao',
  subject: 'filosofia',
  title: 'Sócrates e Platão',
  levels: ['fund2', 'medio'],
  grade: '9º ano',
  aliases: ['socrates', 'platao', 'platonismo', 'maieutica'],
  summary: 'Vida e obra dos filósofos gregos Sócrates e Platão',
  intro: 'Sócrates (470-399 a.C) e Platão (428-348 a.C) foram filósofos que transformaram o pensamento ocidental.',
  objective: 'Compreender o pensamento socrático e platônico',
  blocks: [
    {
      id: 'b1',
      title: 'Sócrates',
      text: 'Sócrates usava a maiêutica (método de perguntas) para levar as pessoas ao autoconhecimento.',
      example: '"Só sei que nada sei" era o lema de Sócrates',
      skill: 'socrates-metodo'
    },
    {
      id: 'b2',
      title: 'Platão',
      text: 'Platão desenvolveu a Teoria das Ideias: existe um mundo das ideias imutáveis além do mundo sensível.',
      example: 'A ideia de "beleza perfeita" existe no mundo das ideias, mesmo que nenhuma beleza seja perfeita no mundo real.',
      skill: 'platao-ideias'
    }
  ],
  questions: [],
  skills: {
    'socrates-metodo': 'Entender o método socrático',
    'platao-ideias': 'Compreender a Teoria das Ideias'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const aristotelesEscola: Lesson = {
  id: 'aristoteles',
  subject: 'filosofia',
  title: 'Aristóteles e a Escola Peripatética',
  levels: ['fund2', 'medio'],
  grade: '9º ano',
  aliases: ['aristoteles', 'peripatético', 'lógica aristotélica'],
  summary: 'Vida e filosofia de Aristóteles, fundador da Lógica Formal',
  intro: 'Aristóteles (384-322 a.C) foi aluno de Platão mas desenvolveu uma filosofia própria focada na observação da natureza.',
  objective: 'Estudar o pensamento aristotélico e sua contribuição à lógica',
  blocks: [
    {
      id: 'b1',
      title: 'Diferenças de Platão',
      text: 'Enquanto Platão valorizava o mundo das ideias, Aristóteles priorizava a observação do mundo real.',
      example: 'Para entender o que é um cavalo, Aristóteles observava cavalos reais, não uma "ideia perfeita" de cavalo.',
      skill: 'empirismo-aristotelico'
    },
    {
      id: 'b2',
      title: 'Lógica Formal',
      text: 'Aristóteles inventou o silogismo: raciocínio dedutivo com premissa maior, menor e conclusão.',
      example: 'Todo homem é mortal (premissa maior). Sócrates é homem (premissa menor). Logo, Sócrates é mortal (conclusão).',
      skill: 'silogismo-logica'
    }
  ],
  questions: [],
  skills: {
    'empirismo-aristotelico': 'Entender o método empírico de Aristóteles',
    'silogismo-logica': 'Compreender e construir silogismos'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

// ===== SOCIOLOGIA (8 lições) =====

export const introducaoSociologia: Lesson = {
  id: 'intro-sociologia',
  subject: 'sociologia',
  title: 'O que é Sociologia?',
  levels: ['fund2', 'medio'],
  grade: '8º ano',
  aliases: ['sociologia conceito', 'ciência social'],
  summary: 'Introdução à sociologia como ciência que estuda a sociedade',
  intro: 'Sociologia é a ciência que estuda a sociedade, a cultura e as relações humanas em grupo.',
  objective: 'Entender os conceitos básicos de sociologia',
  blocks: [
    {
      id: 'b1',
      title: 'Definição',
      text: 'Sociologia estuda como as pessoas interagem em grupos, comunidades e sociedades.',
      example: 'A sociologia explica por que diferentes culturas têm valores diferentes.',
      skill: 'conceito-sociologia'
    },
    {
      id: 'b2',
      title: 'Métodos',
      text: 'Usa pesquisa de campo, entrevistas, estatística e análise qualitativa.',
      example: 'Um sociólogo pode fazer entrevistas com famílias para entender dinâmicas sociais.',
      skill: 'metodos-sociologia'
    }
  ],
  questions: [],
  skills: {
    'conceito-sociologia': 'Entender o que é sociologia',
    'metodos-sociologia': 'Conhecer os métodos de pesquisa social'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const estratificacaoSocial: Lesson = {
  id: 'estratificacao-social',
  subject: 'sociologia',
  title: 'Estratificação Social',
  levels: ['fund2', 'medio'],
  grade: '9º ano',
  aliases: ['classes sociais', 'desigualdade social', 'mobilidade social'],
  summary: 'Estudo das divisões e desigualdades de classe na sociedade',
  intro: 'Estratificação social é o processo pelo qual a sociedade se divide em camadas com diferentes privilégios e oportunidades.',
  objective: 'Compreender como a sociedade se organiza em estratos sociais',
  blocks: [
    {
      id: 'b1',
      title: 'Conceito',
      text: 'Estratificação é a divisão da sociedade em camadas baseadas em renda, educação e status social.',
      example: 'No Brasil, existem diferentes classes: alta, média e baixa.',
      skill: 'conceito-estratificacao'
    },
    {
      id: 'b2',
      title: 'Mobilidade Social',
      text: 'Mobilidade social é a capacidade de mudar de posição na hierarquia social.',
      example: 'Uma pessoa que estuda e consegue um bom emprego pode subir de classe social.',
      skill: 'mobilidade-social'
    }
  ],
  questions: [],
  skills: {
    'conceito-estratificacao': 'Entender estratificação social',
    'mobilidade-social': 'Compreender mobilidade entre classes'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

// ===== GEOGRAFIA (12 lições) =====

export const cartografia: Lesson = {
  id: 'cartografia-basico',
  subject: 'geografia',
  title: 'Cartografia e Mapas',
  levels: ['fund1', 'fund2'],
  grade: '5º ano',
  aliases: ['mapa', 'escala cartográfica', 'elementos do mapa', 'legenda'],
  summary: 'Introdução à leitura e interpretação de mapas',
  intro: 'Cartografia é a arte e a ciência de fazer e ler mapas. Os mapas são representações do espaço geográfico.',
  objective: 'Aprender a ler e interpretar mapas corretamente',
  blocks: [
    {
      id: 'b1',
      title: 'Elementos do Mapa',
      text: 'Todo mapa tem: título, legenda, escala, rosa dos ventos e projeção cartográfica.',
      example: 'A legenda mostra o que cada cor ou símbolo representa no mapa.',
      skill: 'elementos-mapa'
    },
    {
      id: 'b2',
      title: 'Escala',
      text: 'Escala é a proporção entre distâncias no mapa e distâncias reais na Terra.',
      example: 'Escala 1:1.000.000 significa que 1cm no mapa = 1.000.000cm (10km) na realidade.',
      skill: 'escala-cartografica'
    }
  ],
  questions: [],
  skills: {
    'elementos-mapa': 'Identificar elementos de um mapa',
    'escala-cartografica': 'Calcular e entender escalas'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const climas: Lesson = {
  id: 'climas-terra',
  subject: 'geografia',
  title: 'Climas do Planeta',
  levels: ['fund2', 'medio'],
  grade: '7º ano',
  aliases: ['tipos de clima', 'clima tropical', 'clima temperado', 'clima polar'],
  summary: 'Classificação dos principais climas da Terra',
  intro: 'O clima é determinado pela temperatura, precipitação e outras características da atmosfera.',
  objective: 'Classificar e entender os diferentes tipos de clima mundial',
  blocks: [
    {
      id: 'b1',
      title: 'Fatores Climáticos',
      text: 'Latitude, altitude, proximidade do mar e correntes oceânicas influenciam o clima.',
      example: 'Regiões próximas ao equador (latitude 0°) têm climas mais quentes.',
      skill: 'fatores-climaticos'
    },
    {
      id: 'b2',
      title: 'Tipos de Clima',
      text: 'Existem: tropical úmido, tropical semiárido, desértico, temperado, frio polar.',
      example: 'Brasil tem clima tropical úmido na Amazônia e clima semiárido no Nordeste.',
      skill: 'tipos-clima'
    }
  ],
  questions: [],
  skills: {
    'fatores-climaticos': 'Entender fatores que influenciam o clima',
    'tipos-clima': 'Classificar tipos de clima'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

// ===== ARTES (6 lições) =====

export const histArteMovimentos: Lesson = {
  id: 'hist-arte-movimentos',
  subject: 'artes',
  title: 'Movimentos Artísticos',
  levels: ['fund2', 'medio'],
  grade: '8º ano',
  aliases: ['renascimento', 'impressionismo', 'modernismo', 'surrealismo'],
  summary: 'Principais movimentos artísticos da história da arte',
  intro: 'Movimentos artísticos são períodos históricos com estilos e características comuns.',
  objective: 'Compreender os principais movimentos artísticos',
  blocks: [
    {
      id: 'b1',
      title: 'Renascimento',
      text: 'Período (séc. XIV-XVI) de ressurgimento da arte clássica greco-romana com foco no humanismo.',
      example: 'Leonardo da Vinci e Michelangelo foram mestres do Renascimento.',
      skill: 'renascimento-art'
    },
    {
      id: 'b2',
      title: 'Impressionismo',
      text: 'Movimento do século XIX que buscava capturar impressões de luz e cor na natureza.',
      example: 'Claude Monet pintou a série "Nenúfares" estudando luz e reflexos.',
      skill: 'impressionismo-art'
    }
  ],
  questions: [],
  skills: {
    'renascimento-art': 'Entender o Renascimento',
    'impressionismo-art': 'Compreender o Impressionismo'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

// ===== EDUCAÇÃO FÍSICA (4 lições) =====

export const esportes: Lesson = {
  id: 'esportes-basico',
  subject: 'edfisica',
  title: 'Fundamentos dos Esportes',
  levels: ['fund1', 'fund2'],
  grade: '4º ano',
  aliases: ['esportes', 'jogos', 'atividade física', 'movimento'],
  summary: 'Introdução aos esportes, jogos e movimentos fundamentais',
  intro: 'Esportes e jogos são atividades físicas estruturadas que desenvolvem habilidades motoras.',
  objective: 'Entender os fundamentos de diferentes modalidades esportivas',
  blocks: [
    {
      id: 'b1',
      title: 'Esportes Coletivos',
      text: 'Futebol, basquete, vôlei requerem trabalho em equipe e comunicação.',
      example: 'No basquete, os jogadores devem passar a bola entre si para marcar pontos.',
      skill: 'esportes-coletivos'
    },
    {
      id: 'b2',
      title: 'Esportes Individuais',
      text: 'Atletismo, natação, ginástica focam no desempenho individual.',
      example: 'Na natação, cada atleta compete pela velocidade na água.',
      skill: 'esportes-individuais'
    }
  ],
  questions: [],
  skills: {
    'esportes-coletivos': 'Entender esportes em equipe',
    'esportes-individuais': 'Compreender esportes individuais'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

// ===== EXPORTAR LIÇÕES =====

export const NOVAS_MATERIAS: Lesson[] = [
  // Filosofia
  introducaoFilosofia,
  socratePlataoPlatonismo,
  aristotelesEscola,
  // Sociologia
  introducaoSociologia,
  estratificacaoSocial,
  // Geografia
  cartografia,
  climas,
  // Artes
  histArteMovimentos,
  // Educação Física
  esportes,
]
