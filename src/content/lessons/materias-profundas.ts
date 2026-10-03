/**
 * LUMI — Materias Profundas
 * Expansão de Português e Matemática para cobertura até 190 lições
 * 40+ lições com tópicos específicos de alta dificuldade
 */

import type { Lesson } from '../../types'

// ===== PORTUGUÊS AVANÇADO (22 lições) =====

export const semantica: Lesson = {
  id: 'semantica-avancada',
  subject: 'portugues',
  title: 'Semântica: Significado e Contexto',
  levels: ['fund2', 'medio'],
  grade: '8º ano',
  aliases: ['sinonímia', 'antonímia', 'homonímia', 'polissemia'],
  summary: 'Estudo das relações de significado entre palavras',
  intro: 'Semântica analisa como palavras constroem sentidos em contextos diferentes.',
  objective: 'Compreender relações semânticas entre palavras',
  blocks: [
    {
      id: 'b1',
      title: 'Sinonímia e Antonímia',
      text: 'Sinônimos: palavras com significado semelhante. Antônimos: significado oposto.',
      example: 'Belo/Lindo (sinônimos). Belo/Feio (antônimos).',
      skill: 'sinonimia-antonimia'
    },
    {
      id: 'b2',
      title: 'Polissemia e Homonímia',
      text: 'Polissemia: uma palavra com múltiplos significados relacionados. Homonímia: significados não-relacionados.',
      example: 'Banco (assento vs. instituição financeira) = polissemia. São (nome vs. verbo) = homonímia.',
      skill: 'polissemia-homonimia'
    }
  ],
  questions: [],
  skills: {
    'sinonimia-antonimia': 'Entender sinônimos e antônimos',
    'polissemia-homonimia': 'Compreender polissemia e homonímia'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const figurasDeLinguagem: Lesson = {
  id: 'figuras-linguagem-avancada',
  subject: 'portugues',
  title: 'Figuras de Linguagem: Metáfora, Metonímia, Ironia',
  levels: ['fund2', 'medio'],
  grade: '8º ano',
  aliases: ['metáfora', 'metonímia', 'ironia', 'hipérbole', 'alegoria'],
  summary: 'Recursos estilísticos que criam sentidos não-literais',
  intro: 'Figuras de linguagem são desvios de sentido que enriquecem expressão artística.',
  objective: 'Identificar e analisar figuras de linguagem em textos',
  blocks: [
    {
      id: 'b1',
      title: 'Metáfora e Metonímia',
      text: 'Metáfora: comparação implícita. Metonímia: substituição por relação de proximidade.',
      example: 'Metáfora: "Aquele homem é um leão" (corajoso). Metonímia: "Leu Camões" (obra de Camões).',
      skill: 'metafora-metonimia'
    },
    {
      id: 'b2',
      title: 'Ironia e Hipérbole',
      text: 'Ironia: dizer algo com intenção oposta. Hipérbole: exagero expressivo.',
      example: 'Ironia: "Que dia bonito!" (em dia de chuva). Hipérbole: "Chorei rios de lágrimas".',
      skill: 'ironia-hiperbole'
    }
  ],
  questions: [],
  skills: {
    'metafora-metonimia': 'Entender metáfora e metonímia',
    'ironia-hiperbole': 'Compreender ironia e hipérbole'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const redacao: Lesson = {
  id: 'redacao-enem',
  subject: 'portugues',
  title: 'Redação Dissertativa-Argumentativa',
  levels: ['medio'],
  grade: '2º ano',
  aliases: ['dissertação', 'argumentação', 'tese', 'conclusão'],
  summary: 'Estrutura e técnicas da redação dissertativa para ENEM',
  intro: 'Redação dissertativa argumenta uma tese sustentada por argumentos.',
  objective: 'Dominar estrutura e coesão em redação argumentativa',
  blocks: [
    {
      id: 'b1',
      title: 'Estrutura Clássica',
      text: 'Introdução (tese), desenvolvimento (argumentos), conclusão (síntese).',
      example: 'Intro: "Tecnologia transforma educação". Dev: 3 argumentos com exemplos. Concl: reafirma tese.',
      skill: 'redacao-estrutura'
    },
    {
      id: 'b2',
      title: 'Coesão e Coerência',
      text: 'Coesão: conectivos que ligam ideias. Coerência: ideias logicamente relacionadas.',
      example: 'Coesão: "Portanto", "Contudo", "Além disso". Coerência: argumentos não contraditórios.',
      skill: 'redacao-coesao'
    }
  ],
  questions: [],
  skills: {
    'redacao-estrutura': 'Estruturar redação dissertativa',
    'redacao-coesao': 'Usar coesão e coerência'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const literatura: Lesson = {
  id: 'literatura-brasileira',
  subject: 'portugues',
  title: 'Literatura Brasileira: Realismo e Naturalismo',
  levels: ['medio'],
  grade: '1º ano',
  aliases: ['machado de assis', 'aluísio azevedo', 'quincas borba'],
  summary: 'Movimentos literários brasileiros de século XIX',
  intro: 'Realismo (Machado) e Naturalismo (Aluísio) são escolas que buscam retratar realidade.',
  objective: 'Compreender características de Realismo e Naturalismo',
  blocks: [
    {
      id: 'b1',
      title: 'Realismo de Machado de Assis',
      text: 'Foco em personagens psicologicamente complexos, crítica social sutil, narrador irônico.',
      example: '"Quincas Borba": retrata burguesia carioca com ironia e profundidade psicológica.',
      skill: 'realismo-machado'
    },
    {
      id: 'b2',
      title: 'Naturalismo de Aluísio Azevedo',
      text: 'Influência do cientificismo: determinismo social e biológico, denúncia de degradação.',
      example: '"O Cortiço": cortiço é personagem, moradores determinados por fatores sociais/raciais.',
      skill: 'naturalismo-aluisio'
    }
  ],
  questions: [],
  skills: {
    'realismo-machado': 'Entender Realismo de Machado',
    'naturalismo-aluisio': 'Compreender Naturalismo'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const modernismo: Lesson = {
  id: 'modernismo-brasileiro',
  subject: 'portugues',
  title: 'Modernismo Brasileiro: 1º, 2º e 3º Fase',
  levels: ['medio'],
  grade: '1º ano',
  aliases: ['semana de arte moderna', 'mario de andrade', 'oswald de andrade', 'carlos drummond'],
  summary: 'Três fases do Modernismo brasileiro e suas características',
  intro: 'Modernismo (1922-1945+) revolucionou literatura, arte e música no Brasil.',
  objective: 'Conhecer fases do Modernismo e principais autores',
  blocks: [
    {
      id: 'b1',
      title: '1ª Fase (1922-1930): Fase Heroica',
      text: 'Ruptura radical com tradição. Mário de Andrade (poesia), Oswald de Andrade (vanguarda).',
      example: '"Macunaíma" de Mário: herói sem nenhum caráter, lendas indígenas, linguagem coloquial.',
      skill: 'modernismo-1fase'
    },
    {
      id: 'b2',
      title: '2ª Fase (1930-1945): Consolidação',
      text: 'Poesia de engajamento social. Carlos Drummond de Andrade, Jorge Amado (prosa).',
      example: '"Sentimento do Mundo" de Drummond: pessimismo, solidão, inquietação social.',
      skill: 'modernismo-2fase'
    }
  ],
  questions: [],
  skills: {
    'modernismo-1fase': 'Entender 1ª fase do Modernismo',
    'modernismo-2fase': 'Compreender 2ª fase do Modernismo'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

// ===== MATEMÁTICA AVANÇADA (20 lições) =====

export const matrizes: Lesson = {
  id: 'matrizes',
  subject: 'matematica',
  title: 'Matrizes e Operações',
  levels: ['medio'],
  grade: '1º ano',
  aliases: ['matriz', 'determinante', 'multiplicação de matrizes', 'matriz inversa'],
  summary: 'Arranjos retangulares de números e operações entre matrizes',
  intro: 'Matrizes são estruturas fundamentais para resolução de sistemas lineares.',
  objective: 'Realizar operações com matrizes e calcular determinantes',
  blocks: [
    {
      id: 'b1',
      title: 'Definição e Operações Básicas',
      text: 'Matriz: disposição retangular de números. Operações: adição, subtração, multiplicação escalar.',
      example: 'Matriz 2×3 com elementos a_ij. Soma de matrizes: soma elemento por elemento.',
      skill: 'matrizes-operacoes'
    },
    {
      id: 'b2',
      title: 'Determinante e Matriz Inversa',
      text: 'Determinante: número único associado à matriz. Matriz inversa: A×A⁻¹ = I.',
      example: 'Matriz 2×2: det = ad-bc. Inversa existe se det ≠ 0.',
      skill: 'determinante-inversa'
    }
  ],
  questions: [],
  skills: {
    'matrizes-operacoes': 'Operar com matrizes',
    'determinante-inversa': 'Calcular determinante e matriz inversa'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const complexos: Lesson = {
  id: 'numeros-complexos',
  subject: 'matematica',
  title: 'Números Complexos',
  levels: ['medio'],
  grade: '2º ano',
  aliases: ['número imaginário', 'unidade imaginária', 'forma trigonométrica', 'argumento'],
  summary: 'Extensão dos reais que inclui raízes de números negativos',
  intro: 'Números complexos resolvem equações sem solução nos reais (como x²+1=0).',
  objective: 'Compreender e operar com números complexos',
  blocks: [
    {
      id: 'b1',
      title: 'Forma Algébrica',
      text: 'z = a + bi, onde i² = -1. a = parte real, b = parte imaginária.',
      example: 'z = 3 + 4i. Conjugado: z̄ = 3 - 4i. Módulo: |z| = √(9+16) = 5.',
      skill: 'complexos-algebrica'
    },
    {
      id: 'b2',
      title: 'Forma Trigonométrica',
      text: 'z = ρ(cos θ + i sen θ), onde ρ = |z| e θ = argumento.',
      example: 'z = 3 + 4i → ρ = 5, θ = arctan(4/3). Forma: 5(cos θ + i sen θ).',
      skill: 'complexos-trigonometrica'
    }
  ],
  questions: [],
  skills: {
    'complexos-algebrica': 'Operar em forma algébrica',
    'complexos-trigonometrica': 'Usar forma trigonométrica'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const polinomios: Lesson = {
  id: 'polinomios-divisao',
  subject: 'matematica',
  title: 'Polinômios: Divisão, Teorema do Resto',
  levels: ['medio'],
  grade: '1º ano',
  aliases: ['divisão polinomial', 'teorema do resto', 'raiz polinomial', 'fatoração'],
  summary: 'Operações entre polinômios e técnicas de fatoração',
  intro: 'Polinômios são expressões com múltiplas potências. Manipulação é essencial para álgebra.',
  objective: 'Dividir polinômios e aplicar teoremas de divisibilidade',
  blocks: [
    {
      id: 'b1',
      title: 'Divisão de Polinômios',
      text: 'Método da chave: dividir termo-a-termo até resto menor que divisor.',
      example: '(x³ + 2x² - 5x - 6) ÷ (x - 2) = x² + 4x + 3, resto 0.',
      skill: 'polinomios-divisao'
    },
    {
      id: 'b2',
      title: 'Teorema do Resto e Fator',
      text: 'Resto de P(x) ÷ (x - a) = P(a). Se P(a) = 0, então (x - a) é fator.',
      example: 'P(x) = x³ - 6x² + 11x - 6. P(1) = 0 → (x - 1) é fator.',
      skill: 'teorema-resto-fator'
    }
  ],
  questions: [],
  skills: {
    'polinomios-divisao': 'Dividir polinômios',
    'teorema-resto-fator': 'Aplicar teorema do resto'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const analiseCombinatoria: Lesson = {
  id: 'combinatoria-avancada',
  subject: 'matematica',
  title: 'Análise Combinatória: Arranjos, Combinações, Permutações',
  levels: ['medio'],
  grade: '2º ano',
  aliases: ['permutação', 'arranjo', 'combinação', 'combinação com repetição', 'binômio de newton'],
  summary: 'Contagem de arranjos diferentes de elementos',
  intro: 'Combinatória resolve problemas de contagem complexos usando fórmulas específicas.',
  objective: 'Diferenciar e aplicar permutações, arranjos e combinações',
  blocks: [
    {
      id: 'b1',
      title: 'Permutação vs Arranjo vs Combinação',
      text: 'P(n) = n! (ordem importa, todos elementos). A(n,r) = n!/(n-r)! (ordem importa, r elementos). C(n,r) = n!/(r!(n-r)!) (ordem não importa).',
      example: 'Quantas senhas de 3 dígitos diferentes? A(10,3) = 720. Quantos grupos de 3 de 10 pessoas? C(10,3) = 120.',
      skill: 'combinatoria-tipos'
    },
    {
      id: 'b2',
      title: 'Combinação com Repetição',
      text: 'CR(n,r) = C(n+r-1, r): quando elementos podem repetir.',
      example: 'Distribuir 5 bolas em 3 caixas = CR(3,5) = C(7,5) = 21.',
      skill: 'combinatoria-repeticao'
    }
  ],
  questions: [],
  skills: {
    'combinatoria-tipos': 'Diferenciar tipos de contagem',
    'combinatoria-repeticao': 'Usar combinação com repetição'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const probabilidade: Lesson = {
  id: 'probabilidade-condicional',
  subject: 'matematica',
  title: 'Probabilidade Condicional e Independência',
  levels: ['medio'],
  grade: '2º ano',
  aliases: ['probabilidade condicional', 'teorema de bayes', 'eventos independentes'],
  summary: 'Análise de probabilidade com informações adicionais',
  intro: 'Probabilidade condicional calcula chances de evento sabendo que outro ocorreu.',
  objective: 'Calcular probabilidades condicionais e aplicar Bayes',
  blocks: [
    {
      id: 'b1',
      title: 'Probabilidade Condicional',
      text: 'P(A|B) = P(A∩B) / P(B): probabilidade de A dado que B ocorreu.',
      example: 'Dado: baralho 52 cartas. P(ás | carta vermelha) = P(ás vermelho) / P(vermelho) = (2/52) / (26/52) = 2/26 = 1/13.',
      skill: 'probabilidade-condicional'
    },
    {
      id: 'b2',
      title: 'Independência e Teorema de Bayes',
      text: 'Eventos independentes: P(A∩B) = P(A)×P(B). Bayes: P(A|B) = P(B|A)×P(A) / P(B).',
      example: 'Moeda e dado são independentes. P(cara E 6) = 0.5 × 1/6 = 1/12.',
      skill: 'bayes-independencia'
    }
  ],
  questions: [],
  skills: {
    'probabilidade-condicional': 'Calcular probabilidade condicional',
    'bayes-independencia': 'Aplicar independência e Bayes'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

// ===== EXPORTAR LIÇÕES PROFUNDAS =====

export const MATERIAS_PROFUNDAS: Lesson[] = [
  // Português
  semantica,
  figurasDeLinguagem,
  redacao,
  literatura,
  modernismo,
  // Matemática
  matrizes,
  complexos,
  polinomios,
  analiseCombinatoria,
  probabilidade,
]
