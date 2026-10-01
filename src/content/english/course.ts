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
        id: 'a1-s1', title: 'Módulo 1 · Primeiros passos',
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
        id: 'a1-s2', title: 'Módulo 2 · Meu dia a dia',
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
        id: 'a2-s1', title: 'Módulo 1 · Agora e antes',
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
        id: 'a2-s2', title: 'Módulo 2 · Planos e comparações',
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
    can: 'Contar experiências, dar opiniões, resolver situações de viagem, trabalho e estudo e entender o inglês natural do cotidiano.',
    sections: [
      {
        id: 'b1-s1', title: 'Módulo 1 · Everyday English',
        units: [
          {
            id: 'b1-u1', title: 'Have you ever…?', subtitle: 'Experiências e resultados',
            objective: 'Falar de experiências de vida e de ações que começaram no passado e continuam, escolhendo entre present perfect e simple past.',
            lessons: [
              { id: 'ing-b1-present-perfect', title: 'Present perfect' },
              { id: 'ing-b1-present-perfect-continuous', title: 'Present perfect continuous' },
              { id: 'ing-b1-pp-vs-past', title: 'Present perfect vs simple past' },
            ],
          },
          {
            id: 'b1-m1-u2', title: 'Plans and habits', subtitle: 'Futuro, hábitos do passado e tempo livre',
            objective: 'Falar de planos com as diferentes formas de futuro, de hábitos antigos com used to e de preferências e sentimentos.',
            lessons: [
              { id: 'ing-b1-future-forms', title: 'Future forms' },
              { id: 'ing-b1-used-to', title: 'Used to and past habits' },
              { id: 'ing-b1-feelings', title: 'Feelings and relationships' },
              { id: 'ing-b1-free-time', title: 'Free time and preferences' },
            ],
          },
          {
            id: 'b1-u3', title: 'Phrasal verbs in real life', subtitle: 'Verbos de duas palavras',
            objective: 'Entender e usar os phrasal verbs mais comuns pelo contexto, sem traduzir palavra por palavra.',
            lessons: [
              { id: 'ing-b1-phrasal-verbs', title: 'Everyday phrasal verbs' },
            ],
          },
        ],
      },
      {
        id: 'b1-s2', title: 'Módulo 2 · Communication',
        units: [
          {
            id: 'b1-m2-u1', title: 'What do you think?', subtitle: 'Opiniões, conselhos e perguntas educadas',
            objective: 'Dar e pedir opiniões, concordar e discordar com educação, dar conselhos com modais e fazer perguntas indiretas.',
            lessons: [
              { id: 'ing-b1-opinions', title: 'Giving opinions, agreeing and disagreeing' },
              { id: 'ing-b1-modals-advice', title: 'Modal verbs: advice and obligation' },
              { id: 'ing-b1-indirect-questions', title: 'Indirect and polite questions' },
              { id: 'ing-b1-clarification', title: 'Asking for clarification' },
            ],
          },
          {
            id: 'b1-u2', title: 'If…', subtitle: 'Condições reais e imaginárias',
            objective: 'Falar de consequências prováveis e de situações imaginárias com o first e o second conditional.',
            lessons: [
              { id: 'ing-b1-conditionals', title: 'First and second conditional' },
            ],
          },
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
      {
        id: 'b1-s3', title: 'Módulo 3 · Travel',
        units: [
          {
            id: 'b1-m3-u1', title: 'On the road', subtitle: 'Aeroporto, hotel, restaurante e transporte',
            objective: 'Resolver as situações mais comuns de uma viagem: check-in, hospedagem, pedidos, direções e imprevistos.',
            lessons: [
              { id: 'ing-b1-airport', title: 'At the airport' },
              { id: 'ing-b1-hotel', title: 'At the hotel' },
              { id: 'ing-b1-restaurant', title: 'At the restaurant' },
              { id: 'ing-b1-getting-around', title: 'Transportation and directions' },
              { id: 'ing-b1-travel-problems', title: 'Travel problems' },
            ],
          },
        ],
      },
      {
        id: 'b1-s4', title: 'Módulo 4 · Work and Education',
        units: [
          {
            id: 'b1-m4-u1', title: 'At work and at school', subtitle: 'Profissões, entrevistas, reuniões e estudos',
            objective: 'Falar de profissões e responsabilidades, participar de uma entrevista e de uma reunião simples e falar da vida escolar e universitária.',
            lessons: [
              { id: 'ing-b1-jobs', title: 'Jobs and responsibilities' },
              { id: 'ing-b1-job-interview', title: 'Job interviews' },
              { id: 'ing-b1-meetings', title: 'Meetings' },
              { id: 'ing-b1-school-university', title: 'School and university' },
            ],
          },
        ],
      },
      {
        id: 'b1-s5', title: 'Módulo 5 · Technology',
        units: [
          {
            id: 'b1-m5-u1', title: 'Digital life', subtitle: 'Internet, apps, aparelhos e redes sociais',
            objective: 'Falar da vida digital: aparelhos, aplicativos, internet e redes sociais, incluindo problemas técnicos.',
            lessons: [
              { id: 'ing-b1-devices-apps', title: 'Devices and apps' },
              { id: 'ing-b1-social-media', title: 'Social media and digital life' },
            ],
          },
        ],
      },
      {
        id: 'b1-s6', title: 'Módulo 6 · Society and Culture',
        units: [
          {
            id: 'b1-m6-u1', title: 'Ways of life', subtitle: 'Cultura, tradições, mídia e entretenimento',
            objective: 'Descrever tradições e estilos de vida, comparar culturas e falar de filmes, séries e música.',
            lessons: [
              { id: 'ing-b1-traditions', title: 'Culture and traditions' },
              { id: 'ing-b1-media-entertainment', title: 'Media and entertainment' },
            ],
          },
        ],
      },
      {
        id: 'b1-s7', title: 'Módulo 7 · Reading and Interpretation',
        units: [
          {
            id: 'b1-u4', title: 'Words that play tricks', subtitle: 'Falsos cognatos e combinações naturais',
            objective: 'Evitar as armadilhas dos falsos cognatos e combinar palavras como um falante nativo (collocations).',
            lessons: [
              { id: 'ing-b1-false-friends', title: 'False friends' },
              { id: 'ing-b1-collocations', title: 'Collocations' },
            ],
          },
          {
            id: 'b1-m7-u1', title: 'Read for meaning', subtitle: 'Ideia principal, inferência e referências',
            objective: 'Ler textos do cotidiano identificando a ideia principal, informações explícitas, inferências, opiniões e referências.',
            lessons: [
              { id: 'ing-b1-reading-main-idea', title: 'Main idea and details' },
              { id: 'ing-b1-reading-inference', title: 'Inference and author intention' },
            ],
          },
        ],
      },
      {
        id: 'b1-s8', title: 'Módulo 8 · Writing',
        units: [
          {
            id: 'b1-m8-u1', title: 'Write it right', subtitle: 'Mensagens, e-mails e parágrafos',
            objective: 'Escrever mensagens, e-mails e parágrafos de opinião organizados, com conectivos.',
            lessons: [
              { id: 'ing-b1-writing-emails', title: 'Messages and emails' },
              { id: 'ing-b1-writing-paragraphs', title: 'Descriptions and opinion paragraphs' },
            ],
          },
        ],
      },
      {
        id: 'b1-s9', title: 'Módulo 9 · Listening',
        units: [
          {
            id: 'b1-m9-u1', title: 'Listen up', subtitle: 'Anúncios, conversas e relatos',
            objective: 'Entender anúncios, conversas e relatos curtos do dia a dia, captando a ideia principal e detalhes.',
            lessons: [
              { id: 'ing-b1-listening-announcements', title: 'Announcements and short reports' },
              { id: 'ing-b1-listening-conversations', title: 'Everyday conversations' },
            ],
          },
        ],
      },
      {
        id: 'b1-s10', title: 'Módulo 10 · Speaking',
        units: [
          {
            id: 'b1-m10-u1', title: 'Speak up', subtitle: 'Descrever, responder e apresentar',
            objective: 'Responder perguntas, descrever pessoas e lugares, simular situações e fazer uma apresentação curta.',
            lessons: [
              { id: 'ing-b1-speaking-describing', title: 'Describing and answering' },
              { id: 'ing-b1-speaking-presentations', title: 'Short presentations' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'B2', title: 'Intermediário avançado', description: 'Para quem quer um inglês mais natural e preciso.',
    can: 'Relatar o que outras pessoas disseram, argumentar, entender textos complexos e se comunicar no trabalho e nos estudos.',
    sections: [
      {
        id: 'b2-s1', title: 'Módulo 1 · Advanced Communication',
        units: [
          {
            id: 'b2-u3', title: 'Piece of cake', subtitle: 'Expressões idiomáticas',
            objective: 'Reconhecer e usar idioms comuns no contexto certo, sabendo quando evitá-los.',
            lessons: [
              { id: 'ing-b2-idioms', title: 'Idioms' },
              { id: 'ing-b2-modal-perfect', title: 'Modal perfect' },
            ],
          },
          {
            id: 'b2-m1-u2', title: 'Say it smoothly', subtitle: 'Marcadores do discurso e suavização',
            objective: 'Organizar a fala e a escrita com discourse markers e suavizar opiniões (hedging).',
            lessons: [
              { id: 'ing-b2-discourse-markers', title: 'Discourse markers' },
              { id: 'ing-b2-hedging', title: 'Hedging and softening' },
            ],
          },
        ],
      },
      {
        id: 'b2-s2', title: 'Módulo 2 · Advanced Grammar',
        units: [
          {
            id: 'b2-u1', title: 'It was made…', subtitle: 'Voz passiva',
            objective: 'Usar a voz passiva nos principais tempos para destacar a ação ou o resultado, como em notícias e textos científicos.',
            lessons: [
              { id: 'ing-b2-passive', title: 'Passive voice' },
            ],
          },
          {
            id: 'b2-u2', title: 'She said that…', subtitle: 'Discurso indireto e orações relativas',
            objective: 'Relatar falas, perguntas e pedidos de outras pessoas com o reported speech e dar detalhes com relative clauses.',
            lessons: [
              { id: 'ing-b2-reported-speech', title: 'Reported speech' },
              { id: 'ing-b2-relative-clauses', title: 'Relative clauses' },
            ],
          },
          {
            id: 'b2-m2-u3', title: 'Fine-tuning', subtitle: 'Gerúndio, infinitivo, artigos e phrasal verbs',
            objective: 'Escolher entre gerúndio e infinitivo, usar artigos e determinantes com precisão e dominar phrasal verbs avançados.',
            lessons: [
              { id: 'ing-b2-gerunds-infinitives', title: 'Gerunds and infinitives' },
              { id: 'ing-b2-articles-determiners', title: 'Articles and determiners' },
              { id: 'ing-b2-advanced-phrasal-verbs', title: 'Advanced phrasal verbs' },
              { id: 'ing-b2-prepositions', title: 'Advanced prepositions' },
            ],
          },
        ],
      },
      {
        id: 'b2-s3', title: 'Módulo 3 · Work and Business',
        units: [{ id: 'b2-m3-u1', title: 'Business matters', subtitle: 'E-mails formais, negociação e reuniões', objective: 'Escrever e-mails profissionais, negociar e participar de reuniões com linguagem adequada.', lessons: [{ id: 'ing-b2-business-emails', title: 'Formal emails' }, { id: 'ing-b2-negotiation', title: 'Negotiating and meetings' }] }],
      },
      {
        id: 'b2-s4', title: 'Módulo 4 · Technology and Science',
        units: [{ id: 'b2-m4-u1', title: 'How it works', subtitle: 'Textos científicos e tecnológicos', objective: 'Entender e explicar processos científicos e tecnológicos.', lessons: [{ id: 'ing-b2-science', title: 'Science and technology texts' }] }],
      },
      {
        id: 'b2-s5', title: 'Módulo 5 · Environment',
        units: [{ id: 'b2-m5-u1', title: 'Our planet', subtitle: 'Clima, sustentabilidade e soluções', objective: 'Discutir problemas ambientais e propor soluções com vocabulário preciso.', lessons: [{ id: 'ing-b2-environment', title: 'Environment and sustainability' }] }],
      },
      {
        id: 'b2-s6', title: 'Módulo 6 · Society',
        units: [{ id: 'b2-m6-u1', title: 'Living together', subtitle: 'Questões sociais', objective: 'Discutir questões sociais apresentando argumentos e contra-argumentos.', lessons: [{ id: 'ing-b2-social-issues', title: 'Social issues' }] }],
      },
      {
        id: 'b2-s7', title: 'Módulo 7 · Media',
        units: [{ id: 'b2-m7-u1', title: 'In the news', subtitle: 'Notícias e checagem', objective: 'Ler notícias, identificar o enfoque do texto e checar informações.', lessons: [{ id: 'ing-b2-news-media', title: 'News and media literacy' }] }],
      },
      {
        id: 'b2-s8', title: 'Módulo 8 · Academic English',
        units: [{ id: 'b2-m8-u1', title: 'Study skills', subtitle: 'Vocabulário acadêmico', objective: 'Usar o vocabulário e as estruturas mais comuns em textos acadêmicos.', lessons: [{ id: 'ing-b2-academic-vocabulary', title: 'Academic vocabulary' }] }],
      },
      {
        id: 'b2-s9', title: 'Módulo 9 · Advanced Reading',
        units: [{ id: 'b2-m9-u1', title: 'Read critically', subtitle: 'Argumentos e pontos de vista', objective: 'Identificar tese, argumentos e pontos de vista em textos complexos.', lessons: [{ id: 'ing-b2-reading-arguments', title: 'Arguments and points of view' }] }],
      },
      {
        id: 'b2-s10', title: 'Módulo 10 · Advanced Writing',
        units: [{ id: 'b2-m10-u1', title: 'Build a text', subtitle: 'Textos estruturados', objective: 'Escrever textos estruturados com introdução, desenvolvimento e conclusão.', lessons: [{ id: 'ing-b2-essay-structure', title: 'Structured essays' }] }],
      },
      {
        id: 'b2-s11', title: 'Módulo 11 · Advanced Listening',
        units: [{ id: 'b2-m11-u1', title: 'Hear the details', subtitle: 'Entrevistas e apresentações', objective: 'Compreender entrevistas e apresentações, inclusive opiniões implícitas.', lessons: [{ id: 'ing-b2-listening-interviews', title: 'Interviews and talks' }] }],
      },
      {
        id: 'b2-s12', title: 'Módulo 12 · Speaking and Debate',
        units: [{ id: 'b2-m12-u1', title: 'Let’s debate', subtitle: 'Debate e argumentação oral', objective: 'Defender um ponto de vista, interromper com educação e responder a objeções.', lessons: [{ id: 'ing-b2-debate', title: 'Debating' }] }],
      },
    ],
  },
  {
    id: 'C1', title: 'Avançado', description: 'Para quem já lê e fala com segurança.',
    can: 'Levantar hipóteses sobre o passado, perceber tom, ironia e intenção e se comunicar com precisão em contextos acadêmicos e profissionais.',
    sections: [
      {
        id: 'c1-s1', title: 'Módulo 1 · Advanced Structures',
        units: [
          {
            id: 'c1-u1', title: 'Had I known…', subtitle: 'Condicionais avançadas, inversão e ênfase',
            objective: 'Falar de passados imaginários e de suas consequências no presente com o third e o mixed conditional, incluindo a forma invertida e as cleft sentences.',
            lessons: [
              { id: 'ing-c1-conditionals', title: 'Third and mixed conditionals' },
              { id: 'ing-c1-inversion-cleft', title: 'Inversion, emphasis and cleft sentences' },
            ],
          },
          {
            id: 'c1-m1-u2', title: 'Dense and precise', subtitle: 'Nominalização e modalidade avançada',
            objective: 'Condensar ideias com nominalização e expressar graus de certeza com modalidade avançada.',
            lessons: [
              { id: 'ing-c1-nominalization', title: 'Nominalization' },
              { id: 'ing-c1-advanced-modality', title: 'Advanced modality' },
            ],
          },
        ],
      },
      {
        id: 'c1-s2', title: 'Módulo 2 · Reading and Writing like an Expert',
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
      {
        id: 'c1-s3', title: 'Módulo 3 · Professional English',
        units: [{ id: 'c1-m3-u1', title: 'In the boardroom', subtitle: 'Apresentações e comunicação formal', objective: 'Fazer apresentações profissionais e escrever comunicações formais com o registro adequado.', lessons: [{ id: 'ing-c1-presentations', title: 'Professional presentations' }, { id: 'ing-c1-formal-communication', title: 'Formal communication' }] }],
      },
      {
        id: 'c1-s4', title: 'Módulo 4 · Argumentation',
        units: [{ id: 'c1-m4-u1', title: 'Make your case', subtitle: 'Debates e ensaios', objective: 'Construir e refutar argumentos em debates e ensaios.', lessons: [{ id: 'ing-c1-debates', title: 'Advanced debating' }, { id: 'ing-c1-essays', title: 'Argumentative essays' }] }],
      },
      {
        id: 'c1-s5', title: 'Módulo 5 · Nuance',
        units: [{ id: 'c1-m5-u1', title: 'Shades of meaning', subtitle: 'Tom, nuance e vocabulário avançado', objective: 'Escolher palavras pelo tom e pela nuance e ampliar o vocabulário avançado.', lessons: [{ id: 'ing-c1-tone-nuance', title: 'Tone and nuance' }, { id: 'ing-c1-advanced-vocabulary', title: 'Advanced vocabulary' }] }],
      },
    ],
  },
]

export const allUnits = (): (CourseUnit & { level: CefrLevel; section: CourseSection })[] =>
  COURSE.flatMap((lv) => lv.sections.flatMap((section) => section.units.map((u) => ({ ...u, level: lv.id, section }))))

export const unitById = (id: string) => allUnits().find((u) => u.id === id)
export const unitOfLesson = (lessonId: string) => allUnits().find((u) => u.lessons.some((l) => l.id === lessonId))
