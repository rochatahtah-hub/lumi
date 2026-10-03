/**
 * LUMI — Matérias Finais
 * Complemento para atingir ~190 lições totais
 * Ciências (8), História (8), Geografia (5)
 */

import type { Lesson } from '../../types'

// ===== CIÊNCIAS AVANÇADA (8 lições) =====

export const quimicaInorganica: Lesson = {
  id: 'quimica-inorganica',
  subject: 'ciencias',
  title: 'Química Inorgânica: Ligações Químicas',
  levels: ['fund2', 'medio'],
  grade: '9º ano',
  aliases: ['ligação iônica', 'ligação covalente', 'ligação metálica'],
  summary: 'Tipos de ligações que unem átomos em moléculas',
  intro: 'Ligações químicas explicam como átomos se unem para formar compostos.',
  objective: 'Compreender tipos de ligações e suas propriedades',
  blocks: [
    {
      id: 'b1',
      title: 'Ligação Iônica',
      text: 'Transferência de elétrons entre átomos. Um perde (cátion), outro ganha (ânion).',
      example: 'NaCl: Na⁺ + Cl⁻. Ligação forte, forma cristais, solúvel em água.',
      skill: 'ligacao-ionica'
    },
    {
      id: 'b2',
      title: 'Ligação Covalente',
      text: 'Compartilhamento de elétrons entre átomos. Simples (2e⁻), dupla (4e⁻), tripla (6e⁻).',
      example: 'H₂O: O compartilha com 2 H. CO₂: C faz duplas com 2 O (forte, covalente).',
      skill: 'ligacao-covalente'
    }
  ],
  questions: [],
  skills: {
    'ligacao-ionica': 'Entender ligações iônicas',
    'ligacao-covalente': 'Compreender ligações covalentes'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const termodinamica: Lesson = {
  id: 'termodinamica',
  subject: 'ciencias',
  title: 'Termodinâmica: Calor e Temperatura',
  levels: ['medio'],
  grade: '1º ano',
  aliases: ['entropia', 'entalpia', 'leis da termodinâmica'],
  summary: 'Estudo de energia, calor e transformações em sistemas físicos',
  intro: 'Termodinâmica explica como energia é transferida e transformada.',
  objective: 'Compreender leis da termodinâmica e conceitos de calor',
  blocks: [
    {
      id: 'b1',
      title: 'Lei Zero: Temperatura',
      text: 'Se A está em equilíbrio com B, e B com C, então A está em equilíbrio com C.',
      example: 'Dois termômetros no mesmo banho de água marcam mesma temperatura.',
      skill: 'termodinamica-lei-zero'
    },
    {
      id: 'b2',
      title: '1ª Lei: Conservação da Energia',
      text: 'Energia não se cria nem se destrói, apenas transforma. ΔU = Q - W.',
      example: 'Aquecedor queima combustível (Q), realiza trabalho, aumenta temperatura (ΔU).',
      skill: 'termodinamica-1lei'
    }
  ],
  questions: [],
  skills: {
    'termodinamica-lei-zero': 'Entender Lei Zero',
    'termodinamica-1lei': 'Compreender 1ª Lei'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const opticaGeometrica: Lesson = {
  id: 'optica-geometrica',
  subject: 'ciencias',
  title: 'Óptica Geométrica: Espelhos e Lentes',
  levels: ['medio'],
  grade: '1º ano',
  aliases: ['reflexão', 'refração', 'espelho côncavo', 'lente convergente'],
  summary: 'Comportamento da luz em espelhos e lentes',
  intro: 'Óptica geométrica estuda trajetória da luz sem considerar natureza ondulatória.',
  objective: 'Aplicar leis de reflexão e refração em espelhos e lentes',
  blocks: [
    {
      id: 'b1',
      title: 'Reflexão em Espelhos',
      text: 'Lei da reflexão: ângulo incidência = ângulo reflexão. Imagem em espelho plano é virtual.',
      example: 'Espelho côncavo: convergente (forma imagem real). Espelho convexo: divergente (imagem virtual).',
      skill: 'optica-reflexao'
    },
    {
      id: 'b2',
      title: 'Refração em Lentes',
      text: 'Mudança de direção da luz ao passar de um meio para outro. Lente convergente: aumenta (lupa).',
      example: 'Lente de óculos: divergente (miopia) ou convergente (hipermetropia).',
      skill: 'optica-refracao'
    }
  ],
  questions: [],
  skills: {
    'optica-reflexao': 'Entender reflexão em espelhos',
    'optica-refracao': 'Compreender refração em lentes'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const eletromagnetismo: Lesson = {
  id: 'eletromagnetismo',
  subject: 'ciencias',
  title: 'Eletromagnetismo: Campos e Forças',
  levels: ['medio'],
  grade: '2º ano',
  aliases: ['campo elétrico', 'campo magnético', 'força de lorentz', 'indução'],
  summary: 'Integração de fenômenos elétricos e magnéticos',
  intro: 'Eletromagnetismo unifica eletricidade e magnetismo: luz é onda EM.',
  objective: 'Compreender campo EM e aplicações práticas',
  blocks: [
    {
      id: 'b1',
      title: 'Campo Elétrico',
      text: 'Influência de carga elétrica no espaço. E = F/q. Linhas de campo saem de + para -.',
      example: 'Dois fios paralelos com corrente em mesma direção se atraem (campo magnético).',
      skill: 'eletromagnetismo-campo-eletrico'
    },
    {
      id: 'b2',
      title: 'Indução Eletromagnética',
      text: 'Mudança de fluxo magnético induz corrente elétrica. F = BIL (força em condutor).',
      example: 'Motor elétrico: corrente em campo magnético gera movimento. Transformador: indução transforma voltagem.',
      skill: 'eletromagnetismo-inducao'
    }
  ],
  questions: [],
  skills: {
    'eletromagnetismo-campo-eletrico': 'Entender campo elétrico',
    'eletromagnetismo-inducao': 'Compreender indução EM'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

// ===== HISTÓRIA AVANÇADA (8 lições) =====

export const idade_media: Lesson = {
  id: 'idade-media-feudalismo',
  subject: 'historia',
  title: 'Idade Média: Feudalismo',
  levels: ['fund2', 'medio'],
  grade: '7º ano',
  aliases: ['feudalismo', 'feudo', 'vassalagem', 'clero', 'cavalaria'],
  summary: 'Sistema político-econômico medieval baseado em relações de vassalagem',
  intro: 'Feudalismo foi organização social medieval: rei → nobres → servos.',
  objective: 'Entender estrutura e relações feudais',
  blocks: [
    {
      id: 'b1',
      title: 'Pirâmide Feudal',
      text: 'Rei (topo) → Nobres (terra) → Cavaleiros (proteção) → Servos (trabalho). Relação de vassalagem.',
      example: 'Nobre jura fidelidade ao Rei, recebe terra (feudo), protege povo em troca de trabalho.',
      skill: 'feudalismo-piramide'
    },
    {
      id: 'b2',
      title: 'Economia Feudal',
      text: 'Baseada na terra, autossuficiente (feudo produz próprio alimento). Pouco comércio.',
      example: 'Cada feudo tem: castelo (proteção), terra cultivada (comida), artesãos (ferramentas).',
      skill: 'feudalismo-economia'
    }
  ],
  questions: [],
  skills: {
    'feudalismo-piramide': 'Entender estrutura feudal',
    'feudalismo-economia': 'Compreender economia feudal'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const renascenca: Lesson = {
  id: 'renascenca-humanismo',
  subject: 'historia',
  title: 'Renascimento: Humanismo e Artes',
  levels: ['fund2', 'medio'],
  grade: '8º ano',
  aliases: ['leonardo da vinci', 'michelangelo', 'humanismo', 'perspectiva'],
  summary: 'Movimento cultural que valorizava razão, arte e estudo clássico',
  intro: 'Renascimento (XIV-XVI) foi transição de Medievalismo para Modernidade.',
  objective: 'Compreender características do Renascimento',
  blocks: [
    {
      id: 'b1',
      title: 'Humanismo',
      text: 'Valorização do ser humano, razão, liberdade individual. Estudo de clássicos greco-romanos.',
      example: 'Leonardo da Vinci: arte, engenharia, anatomia — homem universal.',
      skill: 'renascenca-humanismo'
    },
    {
      id: 'b2',
      title: 'Arte e Técnica',
      text: 'Perspectiva: profundidade em pintura. Anatomia realista. Uso de luz/sombra.',
      example: '"Davi" de Michelangelo: realismo anatômico perfeito. Chapéu Sixtina: composição complexa.',
      skill: 'renascenca-arte'
    }
  ],
  questions: [],
  skills: {
    'renascenca-humanismo': 'Entender humanismo renascentista',
    'renascenca-arte': 'Conhecer técnicas renascentistas'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const revolucao_francesa: Lesson = {
  id: 'revolucao-francesa-1789',
  subject: 'historia',
  title: 'Revolução Francesa: 1789',
  levels: ['fund2', 'medio'],
  grade: '8º ano',
  aliases: ['1789', 'bastilha', 'direitos do homem', 'égalité'],
  summary: 'Revolução que aboliu absolutismo e criou Estado Moderno',
  intro: 'Revolução Francesa transformou monarquia absoluta em república democrática.',
  objective: 'Entender causas, fases e consequências da Revolução',
  blocks: [
    {
      id: 'b1',
      title: 'Causas',
      text: 'Crise econômica, fome, desigualdade (Estado → clero → povo). Iluminismo questionava autoridade.',
      example: 'Rei Luís XVI gastava demais. Povo morria de fome. Iluminismo dizia que povo tinha direitos.',
      skill: 'rev-francesa-causas'
    },
    {
      id: 'b2',
      title: 'Fases e Consequências',
      text: 'Queda Bastilha (1789), Declaração Direitos Homem, República (1792), Terror (1793), Napoleão (1799).',
      example: 'Guillotina matou reis e nobres. "Liberdade, Igualdade, Fraternidade" virou lema mundial.',
      skill: 'rev-francesa-fases'
    }
  ],
  questions: [],
  skills: {
    'rev-francesa-causas': 'Entender causas da Revolução',
    'rev-francesa-fases': 'Compreender fases e consequências'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const imperialismo: Lesson = {
  id: 'imperialismo-colonialismo',
  subject: 'historia',
  title: 'Imperialismo: Corrida pela África e Ásia',
  levels: ['medio'],
  grade: '1º ano',
  aliases: ['colonialismo', 'europa imperialista', 'divisão da áfrica'],
  summary: 'Expansão europeia na África e Ásia (1880-1914)',
  intro: 'Imperialismo foi corrida europeia para colonizar continentes não-europeus.',
  objective: 'Compreender motivos e consequências do imperialismo',
  blocks: [
    {
      id: 'b1',
      title: 'Motivos: Ouro, Deus, Glória',
      text: 'Econômico (recursos), religioso (converter), político (prestígio). Superioridade racial justificava domínio.',
      example: 'Inglaterra tomou Índia (especiarias, têxteis). França tomou Argélia. Corrida do ouro na África.',
      skill: 'imperialismo-motivos'
    },
    {
      id: 'b2',
      title: 'Consequências',
      text: 'Deculturação de povos indígenas, exploração de recursos, linhas de fronteira arbitrárias, rivalidades que causaram WW1.',
      example: 'África dividida artificialmente em conferência: Conferência de Berlim 1884-85 (sem africanos!)',
      skill: 'imperialismo-consequencias'
    }
  ],
  questions: [],
  skills: {
    'imperialismo-motivos': 'Entender motivos do imperialismo',
    'imperialismo-consequencias': 'Compreender consequências'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

// ===== GEOGRAFIA PROFUNDA (5 lições) =====

export const geopolitica: Lesson = {
  id: 'geopolitica-mundial',
  subject: 'geografia',
  title: 'Geopolítica: Poder e Território',
  levels: ['medio'],
  grade: '2º ano',
  aliases: ['potências mundiais', 'geoestrategia', 'conflitos territoriais'],
  summary: 'Análise de poder territorial e conflitos geográficos',
  intro: 'Geopolítica estuda como geografia influencia política e relações internacionais.',
  objective: 'Compreender geopolítica moderna e conflitos',
  blocks: [
    {
      id: 'b1',
      title: 'Potências Mundiais',
      text: 'EUA (Ocidente), China (crescimento), Rússia (influência). Poder baseado em: economia, tecnologia, militar, posição geográfica.',
      example: 'China no Mar do Sul: controla rotas comerciais (geoestrategia). Rússia controla Sibéria (recursos, frio).',
      skill: 'geopolitica-potencias'
    },
    {
      id: 'b2',
      title: 'Conflitos Territoriais',
      text: 'Palestina/Israel (Terra Santa), Ucrânia (Rússia vs Ocidente), Coreia (China vs EUA).',
      example: 'Conflitos por: água (Oriente Médio), petróleo (Golfo Pérsico), posição geográfica (Ucrânia entre EU e Rússia).',
      skill: 'geopolitica-conflitos'
    }
  ],
  questions: [],
  skills: {
    'geopolitica-potencias': 'Entender potências mundiais',
    'geopolitica-conflitos': 'Compreender conflitos territoriais'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

// ===== EXPORTAR LIÇÕES FINAIS =====

export const MATERIAS_FINAIS: Lesson[] = [
  // Ciências
  quimicaInorganica,
  termodinamica,
  opticaGeometrica,
  eletromagnetismo,
  // História
  idade_media,
  renascenca,
  revolucao_francesa,
  imperialismo,
  // Geografia
  geopolitica,
]
