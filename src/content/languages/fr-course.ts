// Trilha de Francês do LUMI: NÍVEL → MÓDULO → UNIDADE → AULAS. Estrutura e textos próprios do LUMI.
// A pronúncia é trabalhada desde a primeira aula. Aulas sem conteúdo aparecem como "em produção".
import type { CourseLevel } from '../english/course'

export const FR_COURSE: CourseLevel[] = [
  {
    id: 'A1', title: 'Iniciante', description: 'Para quem está começando do zero.',
    can: 'Cumprimentar, se apresentar, falar de família, casa, comida e rotina, com atenção à pronúncia.',
    sections: [
      {
        id: 'fr-a1-s1', title: 'Module 1 · Premiers pas',
        units: [
          {
            id: 'fr-a1-u1', title: 'Bonjour !', subtitle: 'Cumprimentos, apresentações e pronúncia',
            objective: 'Cumprimentar com tu e vous, se apresentar com être e s’appeler, soletrar e contar, reconhecendo os sons próprios do francês.',
            lessons: [
              { id: 'fra-a1-salutations', title: 'Salutations et présentations' },
              { id: 'fra-a1-prononciation', title: 'Les sons du français' },
              { id: 'fra-a1-etre-avoir', title: 'Être et avoir' },
              { id: 'fra-a1-nombres', title: 'L’alphabet et les nombres' },
            ],
          },
        ],
      },
      {
        id: 'fr-a1-s2', title: 'Module 2 · La vie de tous les jours',
        units: [
          {
            id: 'fr-a1-u2', title: 'Ma famille, ma maison', subtitle: 'Família, casa, cores, artigos e plural',
            objective: 'Falar da família e da casa usando artigos, gênero, plural e cores.',
            lessons: [
              { id: 'fra-a1-famille', title: 'La famille et les possessifs' },
              { id: 'fra-a1-articles', title: 'Articles, genre et pluriel' },
              { id: 'fra-a1-maison-couleurs', title: 'La maison et les couleurs' },
            ],
          },
          {
            id: 'fr-a1-u3', title: 'Ma journée', subtitle: 'Datas, comida, escola e rotina',
            objective: 'Dizer dias, meses e datas, falar de comida e descrever a rotina no presente, inclusive na negativa.',
            lessons: [
              { id: 'fra-a1-jours-mois', title: 'Jours, mois et dates' },
              { id: 'fra-a1-present-negation', title: 'Le présent et la négation' },
              { id: 'fra-a1-nourriture', title: 'La nourriture' },
              { id: 'fra-a1-aller-faire', title: 'Aller, faire et la routine' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'A2', title: 'Básico', description: 'Para quem já entende frases simples.',
    can: 'Contar o que fez, falar de planos, fazer compras, ir ao restaurante e conversar sobre lazer e saúde.',
    sections: [
      {
        id: 'fr-a2-s1', title: 'Module 1 · Sortir et voyager',
        units: [
          { id: 'fr-a2-u1', title: 'En ville', subtitle: 'Viagem, compras e restaurante', objective: 'Viajar, fazer compras e pedir no restaurante.', lessons: [{ id: 'fra-a2-voyage', title: 'Le voyage' }, { id: 'fra-a2-achats', title: 'Faire des achats' }, { id: 'fra-a2-restaurant', title: 'Au restaurant' }] },
        ],
      },
      {
        id: 'fr-a2-s2', title: 'Module 2 · Raconter',
        units: [
          { id: 'fr-a2-u2', title: 'Hier et demain', subtitle: 'Passé composé, imparfait e futur', objective: 'Contar fatos passados e falar do futuro.', lessons: [{ id: 'fra-a2-passe-compose', title: 'Le passé composé' }, { id: 'fra-a2-imparfait', title: 'L’imparfait' }, { id: 'fra-a2-futur', title: 'Le futur' }] },
          { id: 'fr-a2-u3', title: 'Plus ou moins', subtitle: 'Comparações, pronomes e verbos pronominais', objective: 'Comparar, usar pronomes e verbos pronominais e ligar ideias.', lessons: [{ id: 'fra-a2-comparatif', title: 'Comparatif et superlatif' }, { id: 'fra-a2-pronoms', title: 'Les pronoms' }, { id: 'fra-a2-pronominaux', title: 'Les verbes pronominaux' }] },
        ],
      },
      {
        id: 'fr-a2-s3', title: 'Module 3 · Travail, loisirs et santé',
        units: [{ id: 'fr-a2-u4', title: 'Au quotidien', subtitle: 'Trabalho, lazer e saúde', objective: 'Falar de trabalho, lazer e saúde em conversas do dia a dia.', lessons: [{ id: 'fra-a2-travail', title: 'Le travail' }, { id: 'fra-a2-loisirs', title: 'Les loisirs' }, { id: 'fra-a2-sante', title: 'La santé' }] }],
      },
    ],
  },
  {
    id: 'B1', title: 'Intermediário', description: 'Para quem já se vira em situações do dia a dia.',
    can: 'Dar opiniões, contar experiências, levantar hipóteses e falar de cultura, trabalho e educação.',
    sections: [
      {
        id: 'fr-b1-s1', title: 'Module 1 · Opinions et expériences',
        units: [{ id: 'fr-b1-u1', title: 'À mon avis…', subtitle: 'Opiniões, experiências e conectores', objective: 'Dar opiniões e contar experiências ligando as ideias com conectores.', lessons: [{ id: 'fra-b1-opinions', title: 'Donner son opinion' }, { id: 'fra-b1-temps', title: 'Les temps du passé' }, { id: 'fra-b1-connecteurs', title: 'Les connecteurs' }] }],
      },
      {
        id: 'fr-b1-s2', title: 'Module 2 · Grammaire en contexte',
        units: [{ id: 'fr-b1-u2', title: 'Si j’avais…', subtitle: 'Conditionnel, subjonctif e relativos', objective: 'Expressar hipóteses, desejos e necessidade e relatar falas.', lessons: [{ id: 'fra-b1-conditionnel', title: 'Le conditionnel' }, { id: 'fra-b1-subjonctif', title: 'Introduction au subjonctif' }, { id: 'fra-b1-relatifs', title: 'Les pronoms relatifs' }, { id: 'fra-b1-discours-indirect', title: 'Le discours indirect' }, { id: 'fra-b1-passif', title: 'La voix passive' }] }],
      },
      {
        id: 'fr-b1-s3', title: 'Module 3 · Culture, travail et société',
        units: [{ id: 'fr-b1-u3', title: 'Le monde francophone', subtitle: 'Cultura, viagem, trabalho e educação', objective: 'Falar de cultura francófona, viagem, trabalho, educação e sociedade.', lessons: [{ id: 'fra-b1-francophonie', title: 'La francophonie' }, { id: 'fra-b1-travail-etudes', title: 'Travail et études' }, { id: 'fra-b1-societe', title: 'La société' }] }],
      },
    ],
  },
  {
    id: 'B2', title: 'Intermediário avançado', description: 'Para quem quer um francês mais natural e preciso.',
    can: 'Debater, se comunicar no trabalho e na universidade e entender a mídia e expressões idiomáticas.',
    sections: [
      {
        id: 'fr-b2-s1', title: 'Module 1 · Débattre et convaincre',
        units: [{ id: 'fr-b2-u1', title: 'Le débat', subtitle: 'Debate, francês profissional e acadêmico', objective: 'Argumentar em debates e usar o registro profissional e acadêmico.', lessons: [{ id: 'fra-b2-debat', title: 'Le débat' }, { id: 'fra-b2-professionnel', title: 'Le français professionnel' }, { id: 'fra-b2-academique', title: 'Le français académique' }] }],
      },
      {
        id: 'fr-b2-s2', title: 'Module 2 · Nuances',
        units: [{ id: 'fr-b2-u2', title: 'Entre les mots', subtitle: 'Estruturas avançadas, expressões e conectores', objective: 'Usar estruturas avançadas, expressões idiomáticas e conectores com nuance.', lessons: [{ id: 'fra-b2-structures', title: 'Structures avancées' }, { id: 'fra-b2-expressions', title: 'Expressions idiomatiques' }, { id: 'fra-b2-connecteurs', title: 'Connecteurs avancés' }] }],
      },
      {
        id: 'fr-b2-s3', title: 'Module 3 · Médias, science et société',
        units: [{ id: 'fr-b2-u3', title: 'L’actualité', subtitle: 'Mídia, ciência e tecnologia', objective: 'Interpretar notícias e discutir ciência, tecnologia e sociedade.', lessons: [{ id: 'fra-b2-medias', title: 'Les médias' }, { id: 'fra-b2-sciences', title: 'Sciences et technologies' }] }],
      },
    ],
  },
  {
    id: 'C1', title: 'Avançado', description: 'Para quem já lê e fala com segurança.',
    can: 'Argumentar com precisão, perceber nuances e escrever textos acadêmicos e profissionais em linguagem formal.',
    sections: [
      {
        id: 'fr-c1-s1', title: 'Module 1 · Expression avancée',
        units: [{ id: 'fr-c1-u1', title: 'Avec précision', subtitle: 'Escrita, apresentações e argumentação', objective: 'Escrever, apresentar e argumentar em francês acadêmico e profissional.', lessons: [{ id: 'fra-c1-ecrit', title: 'L’écrit académique' }, { id: 'fra-c1-presentations', title: 'Les présentations' }, { id: 'fra-c1-argumentation', title: 'L’argumentation' }] }],
      },
      {
        id: 'fr-c1-s2', title: 'Module 2 · Interpréter',
        units: [{ id: 'fr-c1-u2', title: 'Lire entre les lignes', subtitle: 'Textos complexos, registro formal e nuances', objective: 'Interpretar textos complexos e dominar a linguagem formal e suas nuances.', lessons: [{ id: 'fra-c1-textes', title: 'Textes complexes' }, { id: 'fra-c1-registre', title: 'Le registre formel' }] }],
      },
    ],
  },
]
