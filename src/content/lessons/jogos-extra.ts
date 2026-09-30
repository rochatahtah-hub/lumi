// Material de jogo para aulas de outras matérias (os exercícios da aula também alimentam os jogos).
// Mapas usam fronteiras ATUAIS (dados Natural Earth / IBGE); fatos alinhados ao conteúdo das aulas.
import type { LessonGames } from '../../types'

export const GAME_EXTRA: Record<string, LessonGames> = {
  'his-revolucao-francesa': {
    words: [
      { word: 'Bastilha', clue: 'prisão tomada em 14/07/1789', difficulty: 1 },
      { word: 'clero', clue: 'Primeiro Estado', difficulty: 1 },
      { word: 'nobreza', clue: 'Segundo Estado', difficulty: 1 },
      { word: 'burguesia', clue: 'liderou o Terceiro Estado', difficulty: 2 },
      { word: 'liberdade', clue: 'primeira palavra do lema', difficulty: 1 },
      { word: 'igualdade', clue: 'segunda palavra do lema', difficulty: 1 },
      { word: 'Napoleão', clue: 'assumiu o poder em 1799', difficulty: 2 },
      { word: 'república', clue: 'proclamada em 1792', difficulty: 3 },
    ],
    sequences: [{
      prompt: 'Coloque os acontecimentos da Revolução Francesa em ordem cronológica.', difficulty: 2,
      items: ['Convocação dos Estados Gerais (maio de 1789)', 'Queda da Bastilha (14 de julho de 1789)', 'Declaração dos Direitos do Homem e do Cidadão (agosto de 1789)', 'Proclamação da República (1792)', 'Napoleão chega ao poder (1799)'],
      explanation: 'Estados Gerais → Bastilha → Declaração → República → Napoleão.',
    }],
    map: {
      map: 'europa', prompt: 'A Revolução Francesa e países envolvidos nas guerras contra a França revolucionária (fronteiras atuais).',
      targets: [
        { id: 'France', label: 'França', clue: 'onde começou a revolução, em 1789', difficulty: 1 },
        { id: 'Austria', label: 'Áustria', clue: 'terra natal da rainha Maria Antonieta', difficulty: 2 },
        { id: 'United Kingdom', label: 'Reino Unido', clue: 'monarquia insular que integrou as coalizões contra a França', difficulty: 2 },
        { id: 'Spain', label: 'Espanha', clue: 'vizinha ao sul, integrou a Primeira Coalizão', difficulty: 3 },
      ],
    },
  },
  'his-segunda-guerra': {
    sequences: [{
      prompt: 'Coloque os acontecimentos da Segunda Guerra Mundial em ordem.', difficulty: 2,
      items: ['Alemanha invade a Polônia (setembro de 1939)', 'Ataque japonês a Pearl Harbor (dezembro de 1941)', 'Derrota alemã em Stalingrado (fevereiro de 1943)', 'Dia D, desembarque na Normandia (junho de 1944)', 'Rendição da Alemanha (maio de 1945)', 'Rendição do Japão (setembro de 1945)'],
      explanation: '1939 Polônia → 1941 Pearl Harbor → 1943 Stalingrado → 1944 Dia D → maio/1945 Alemanha → set/1945 Japão.',
    }],
    map: {
      map: 'mundo', prompt: 'Principais países do Eixo e dos Aliados (fronteiras atuais).',
      targets: [
        { id: 'Germany', label: 'Alemanha', clue: 'país do Eixo que invadiu a Polônia em 1939', difficulty: 1 },
        { id: 'Italy', label: 'Itália', clue: 'país do Eixo onde lutou a FEB brasileira', difficulty: 1 },
        { id: 'Japan', label: 'Japão', clue: 'país do Eixo que atacou Pearl Harbor', difficulty: 1 },
        { id: 'United Kingdom', label: 'Reino Unido', clue: 'Aliado europeu que resistiu aos bombardeios alemães', difficulty: 2 },
        { id: 'United States of America', label: 'Estados Unidos', clue: 'Aliado que entrou na guerra após Pearl Harbor', difficulty: 2 },
        { id: 'Russia', label: 'Rússia (antiga União Soviética)', clue: 'onde aconteceu a Batalha de Stalingrado', difficulty: 2 },
        { id: 'Brazil', label: 'Brasil', clue: 'enviou a FEB para lutar na Itália', difficulty: 1 },
        { id: 'Poland', label: 'Polônia', clue: 'invadida em 1939, início da guerra', difficulty: 3 },
      ],
    },
  },
  'geo-regioes-brasil': {
    words: [
      { word: 'Norte', clue: 'a maior região', difficulty: 1 },
      { word: 'Nordeste', clue: 'a região com mais estados (9)', difficulty: 1 },
      { word: 'Sudeste', clue: 'a região mais populosa', difficulty: 1 },
      { word: 'Sul', clue: 'a menor região, com 3 estados', difficulty: 1 },
      { word: 'Brasília', clue: 'capital federal', difficulty: 2 },
      { word: 'Manaus', clue: 'capital do Amazonas', difficulty: 2 },
      { word: 'Salvador', clue: 'capital da Bahia', difficulty: 2 },
      { word: 'Curitiba', clue: 'capital do Paraná', difficulty: 3 },
    ],
    map: {
      map: 'brasil', prompt: 'Regiões, estados e capitais do Brasil (divisão do IBGE).',
      groups: {
        Norte: ['AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO'],
        Nordeste: ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'],
        'Centro-Oeste': ['DF', 'GO', 'MT', 'MS'],
        Sudeste: ['ES', 'MG', 'RJ', 'SP'],
        Sul: ['PR', 'RS', 'SC'],
      },
      targets: [
        { id: 'Norte', label: 'Região Norte', clue: 'a maior região, com grande parte da Floresta Amazônica', difficulty: 1 },
        { id: 'Nordeste', label: 'Região Nordeste', clue: 'a região com mais estados: nove', difficulty: 1 },
        { id: 'Centro-Oeste', label: 'Região Centro-Oeste', clue: 'onde fica o Distrito Federal', difficulty: 1 },
        { id: 'Sudeste', label: 'Região Sudeste', clue: 'a região mais populosa', difficulty: 1 },
        { id: 'Sul', label: 'Região Sul', clue: 'a menor região, com três estados', difficulty: 1 },
        { id: 'BA', label: 'Bahia', clue: 'o estado cuja capital é Salvador', difficulty: 2 },
        { id: 'AM', label: 'Amazonas', clue: 'o estado cuja capital é Manaus', difficulty: 2 },
        { id: 'MG', label: 'Minas Gerais', clue: 'o estado cuja capital é Belo Horizonte', difficulty: 2 },
        { id: 'RS', label: 'Rio Grande do Sul', clue: 'o estado cuja capital é Porto Alegre', difficulty: 2 },
        { id: 'PE', label: 'Pernambuco', clue: 'o estado cuja capital é Recife', difficulty: 3 },
        { id: 'PA', label: 'Pará', clue: 'o estado cuja capital é Belém', difficulty: 3 },
        { id: 'SC', label: 'Santa Catarina', clue: 'o estado cuja capital é Florianópolis', difficulty: 3 },
        { id: 'GO', label: 'Goiás', clue: 'o estado cuja capital é Goiânia', difficulty: 3 },
      ],
    },
  },
  'geo-biomas-brasileiros': {
    words: [
      { word: 'Amazônia', clue: 'maior floresta tropical do mundo', difficulty: 1 },
      { word: 'Cerrado', clue: 'savana brasileira', difficulty: 1 },
      { word: 'Caatinga', clue: 'bioma exclusivo do Brasil, clima semiárido', difficulty: 2 },
      { word: 'Pantanal', clue: 'maior planície alagável', difficulty: 1 },
      { word: 'Pampa', clue: 'campos do Sul do Brasil', difficulty: 2 },
    ],
  },
  'cie-sistema-solar': {
    words: [
      { word: 'Mercúrio', clue: 'o planeta mais perto do Sol', difficulty: 1 },
      { word: 'Vênus', clue: 'segundo planeta', difficulty: 1 },
      { word: 'Terra', clue: 'o nosso planeta', difficulty: 1 },
      { word: 'Marte', clue: 'o planeta vermelho', difficulty: 1 },
      { word: 'Júpiter', clue: 'o maior planeta', difficulty: 2 },
      { word: 'Saturno', clue: 'famoso pelos anéis', difficulty: 2 },
      { word: 'Urano', clue: 'sétimo planeta', difficulty: 3 },
      { word: 'Netuno', clue: 'o planeta mais distante do Sol', difficulty: 3 },
    ],
    sequences: [{
      prompt: 'Coloque os planetas em ordem de distância do Sol.', difficulty: 2,
      items: ['Mercúrio', 'Vênus', 'Terra', 'Marte', 'Júpiter', 'Saturno', 'Urano', 'Netuno'],
      explanation: 'Mercúrio, Vênus, Terra, Marte, Júpiter, Saturno, Urano e Netuno.',
    }],
  },
}
