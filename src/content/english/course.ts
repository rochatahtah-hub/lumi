// Estrutura do Curso de Inglês do LUMI: NÍVEL → SEÇÃO → UNIDADE → AULAS → REVISÃO → AVALIAÇÃO DE DOMÍNIO.
// Metodologia e textos próprios do LUMI. Cada aula aponta para um conteúdo da Base Oficial (mesmo id da aula);
// as que ainda estão sendo escritas aparecem como "em produção" (a trilha mostra o caminho todo, sem inventar conteúdo).
import type { CefrLevel } from '../../types'

export interface CourseLesson { id: string; title: string }
export interface CourseUnit { id: string; title: string; subtitle: string; objective: string; lessons: CourseLesson[] }
export interface CourseSection { id: string; title: string; units: CourseUnit[] }
export interface CourseLevel { id: CefrLevel; title: string; description: string; can: string; sections: CourseSection[] }

export const COURSE: CourseLevel[] = [
  {
    id: 'A1', title: 'Iniciante', description: 'Para quem está começando do zero.',
    can: 'Se apresentar, falar de si, da família, da rotina e da casa com frases simples.',
    sections: [
      {
        id: 'a1-s1', title: 'Seção 1 · Primeiros passos',
        units: [
          {
            id: 'a1-u1', title: 'Hello, I\'m…', subtitle: 'Cumprimentos e apresentações',
            objective: 'Conseguir cumprimentar, se apresentar, dizer de onde é e fazer perguntas simples sobre outra pessoa.',
            lessons: [
              { id: 'ing-a1-greetings', title: 'Greetings and introductions' },
              { id: 'ing-a1-alphabet-numbers', title: 'Alphabet, spelling and numbers' },
              { id: 'ing-a1-countries', title: 'Countries and nationalities' },
              { id: 'ing-verb-to-be', title: 'Verb to be' },
            ],
          },
          {
            id: 'a1-u2', title: 'My people, my things', subtitle: 'Família, objetos e descrições',
            objective: 'Falar da própria família, apontar e nomear objetos e usar a, an, this, that e plurais corretamente.',
            lessons: [
              { id: 'ing-a1-family', title: 'Family and possessive adjectives' },
              { id: 'ing-a1-this-that', title: 'This, that, plurals and a/an' },
              { id: 'ing-a1-colors-adjectives', title: 'Colors and basic adjectives' },
            ],
          },
        ],
      },
      {
        id: 'a1-s2', title: 'Seção 2 · Meu dia a dia',
        units: [
          {
            id: 'a1-u3', title: 'Every day', subtitle: 'Horas, dias e rotina',
            objective: 'Dizer as horas, os dias e as datas e descrever a própria rotina no simple present.',
            lessons: [
              { id: 'ing-a1-time-days', title: 'Time, days and months' },
              { id: 'ing-simple-present', title: 'Simple present' },
              { id: 'ing-a1-daily-routine', title: 'Daily routine and frequency' },
            ],
          },
          {
            id: 'a1-u4', title: 'Home and city', subtitle: 'Casa, lugares e direções',
            objective: 'Descrever a casa e o bairro, dizer o que existe em cada lugar, pedir e dar direções e falar do que se sabe fazer.',
            lessons: [
              { id: 'ing-a1-there-is', title: 'There is / there are at home' },
              { id: 'ing-a1-can-directions', title: 'Can, imperatives and directions' },
              { id: 'ing-a1-food', title: 'Food and drinks' },
              { id: 'ing-a1-weather-hobbies', title: 'Weather and hobbies' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'A2', title: 'Básico', description: 'Para quem já entende frases simples.',
    can: 'Contar o que está acontecendo, o que aconteceu, fazer planos e comparar coisas.',
    sections: [
      {
        id: 'a2-s1', title: 'Seção 1 · Agora e antes',
        units: [
          {
            id: 'a2-u1', title: 'Right now', subtitle: 'Ações acontecendo agora',
            objective: 'Descrever o que está acontecendo no momento e diferenciar rotina (simple present) de ação em andamento (present continuous).',
            lessons: [
              { id: 'ing-a2-present-continuous', title: 'Present continuous' },
              { id: 'ing-a2-shopping', title: 'Shopping and prices' },
            ],
          },
          {
            id: 'a2-u2', title: 'Stories from the past', subtitle: 'Contar o que aconteceu',
            objective: 'Contar fatos e pequenas histórias do passado usando o simple past e o past continuous.',
            lessons: [
              { id: 'ing-a2-simple-past', title: 'Simple past' },
              { id: 'ing-a2-past-continuous', title: 'Past continuous' },
            ],
          },
        ],
      },
      {
        id: 'a2-s2', title: 'Seção 2 · Planos e comparações',
        units: [
          {
            id: 'a2-u3', title: 'Plans and predictions', subtitle: 'Futuro com will e going to',
            objective: 'Falar de planos, decisões e previsões escolhendo entre will e going to.',
            lessons: [
              { id: 'ing-a2-future', title: 'Future: will and going to' },
              { id: 'ing-a2-invitations', title: 'Invitations and preferences' },
            ],
          },
          {
            id: 'a2-u4', title: 'Better, best', subtitle: 'Comparar e quantificar',
            objective: 'Comparar pessoas, lugares e coisas e falar de quantidades com much, many, some e any.',
            lessons: [
              { id: 'ing-a2-comparatives', title: 'Comparatives and superlatives' },
              { id: 'ing-a2-quantifiers', title: 'Countable, uncountable and quantifiers' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'B1', title: 'Intermediário', description: 'Para quem já se vira em situações do dia a dia.',
    can: 'Contar experiências, levantar hipóteses, dar opiniões e entender o inglês natural do cotidiano.',
    sections: [
      {
        id: 'b1-s1', title: 'Seção 1 · Experiências e hipóteses',
        units: [
          {
            id: 'b1-u1', title: 'Have you ever…?', subtitle: 'Experiências e resultados',
            objective: 'Falar de experiências de vida e de ações que começaram no passado e continuam, escolhendo entre present perfect e simple past.',
            lessons: [
              { id: 'ing-b1-present-perfect', title: 'Present perfect' },
              { id: 'ing-b1-present-perfect-continuous', title: 'Present perfect continuous' },
            ],
          },
          {
            id: 'b1-u2', title: 'If…', subtitle: 'Condições reais e imaginárias',
            objective: 'Falar de consequências prováveis e de situações imaginárias com o first e o second conditional.',
            lessons: [
              { id: 'ing-b1-conditionals', title: 'First and second conditional' },
            ],
          },
        ],
      },
      {
        id: 'b1-s2', title: 'Seção 2 · Inglês que soa natural',
        units: [
          {
            id: 'b1-u3', title: 'Phrasal verbs in real life', subtitle: 'Verbos de duas palavras',
            objective: 'Entender e usar os phrasal verbs mais comuns pelo contexto, sem traduzir palavra por palavra.',
            lessons: [
              { id: 'ing-b1-phrasal-verbs', title: 'Everyday phrasal verbs' },
            ],
          },
          {
            id: 'b1-u4', title: 'Words that play tricks', subtitle: 'Falsos cognatos e combinações naturais',
            objective: 'Evitar as armadilhas dos falsos cognatos e combinar palavras como um falante nativo (collocations).',
            lessons: [
              { id: 'ing-b1-false-friends', title: 'False friends' },
              { id: 'ing-b1-collocations', title: 'Collocations' },
            ],
          },
        ],
      },
      {
        id: 'b1-s3', title: 'Seção 3 · Contar e conectar',
        units: [
          {
            id: 'b1-u5', title: 'Before that…', subtitle: 'Passado anterior e conectivos',
            objective: 'Organizar histórias com o past perfect e ligar ideias com linking words.',
            lessons: [
              { id: 'ing-b1-past-perfect', title: 'Past perfect' },
              { id: 'ing-b1-linking-words', title: 'Linking words' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'B2', title: 'Intermediário avançado', description: 'Para quem quer um inglês mais natural e preciso.',
    can: 'Relatar o que outras pessoas disseram, focar na ação em vez de quem a fez e entender expressões idiomáticas.',
    sections: [
      {
        id: 'b2-s1', title: 'Seção 1 · Como a informação é contada',
        units: [
          {
            id: 'b2-u1', title: 'It was made…', subtitle: 'Voz passiva',
            objective: 'Usar a voz passiva nos principais tempos para destacar a ação ou o resultado, como em notícias e textos científicos.',
            lessons: [
              { id: 'ing-b2-passive', title: 'Passive voice' },
            ],
          },
          {
            id: 'b2-u2', title: 'She said that…', subtitle: 'Discurso indireto',
            objective: 'Relatar falas, perguntas e pedidos de outras pessoas com o reported speech.',
            lessons: [
              { id: 'ing-b2-reported-speech', title: 'Reported speech' },
              { id: 'ing-b2-relative-clauses', title: 'Relative clauses' },
            ],
          },
        ],
      },
      {
        id: 'b2-s2', title: 'Seção 2 · Nuances',
        units: [
          {
            id: 'b2-u3', title: 'Piece of cake', subtitle: 'Expressões idiomáticas',
            objective: 'Reconhecer e usar idioms comuns no contexto certo, sabendo quando evitá-los.',
            lessons: [
              { id: 'ing-b2-idioms', title: 'Idioms' },
              { id: 'ing-b2-modal-perfect', title: 'Modal perfect' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'C1', title: 'Avançado', description: 'Para quem já lê e fala com segurança.',
    can: 'Levantar hipóteses sobre o passado, perceber tom, ironia e intenção e escrever textos acadêmicos.',
    sections: [
      {
        id: 'c1-s1', title: 'Seção 1 · Hipóteses e ênfase',
        units: [
          {
            id: 'c1-u1', title: 'Had I known…', subtitle: 'Condicionais avançadas',
            objective: 'Falar de passados imaginários e de suas consequências no presente com o third e o mixed conditional, incluindo a forma invertida.',
            lessons: [
              { id: 'ing-c1-conditionals', title: 'Third and mixed conditionals' },
              { id: 'ing-c1-inversion-cleft', title: 'Inversion, emphasis and cleft sentences' },
            ],
          },
        ],
      },
      {
        id: 'c1-s2', title: 'Seção 2 · Ler e escrever como especialista',
        units: [
          {
            id: 'c1-u2', title: 'Between the lines', subtitle: 'Inferência, tom e ironia',
            objective: 'Identificar o que o texto diz sem dizer: inferências, tom, ironia e a intenção do autor.',
            lessons: [
              { id: 'ing-c1-reading-between-lines', title: 'Reading between the lines' },
              { id: 'ing-c1-academic-writing', title: 'Academic and argumentative writing' },
            ],
          },
        ],
      },
    ],
  },
]

export const allUnits = (): (CourseUnit & { level: CefrLevel; section: CourseSection })[] =>
  COURSE.flatMap((lv) => lv.sections.flatMap((section) => section.units.map((u) => ({ ...u, level: lv.id, section }))))

export const unitById = (id: string) => allUnits().find((u) => u.id === id)
export const unitOfLesson = (lessonId: string) => allUnits().find((u) => u.lessons.some((l) => l.id === lessonId))
