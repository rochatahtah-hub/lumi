// Trilha de Italiano do LUMI: NÍVEL → MÓDULO → UNIDADE → AULAS. Estrutura e textos próprios do LUMI.
// Pronúncia desde a primeira aula (c/ch, g/gh, gl, gn, sc, z, consoantes duplas). Aulas sem conteúdo aparecem como "em produção".
import type { CourseLevel } from '../english/course'

export const IT_COURSE: CourseLevel[] = [
  {
    id: 'A1', title: 'Iniciante', description: 'Para quem está começando do zero.',
    can: 'Cumprimentar, se apresentar, falar de família, casa, comida, rotina e lugares da cidade, com atenção à pronúncia.',
    sections: [
      {
        id: 'it-a1-s1', title: 'Modulo 1 · Primi passi',
        units: [
          {
            id: 'it-a1-u1', title: 'Ciao! Piacere!', subtitle: 'Cumprimentos, apresentações e pronúncia',
            objective: 'Cumprimentar de modo formal e informal, se apresentar com essere e chiamarsi e reconhecer os sons próprios do italiano.',
            lessons: [
              { id: 'ita-a1-saluti', title: 'Saluti e presentazioni' },
              { id: 'ita-a1-pronuncia', title: 'I suoni dell’italiano' },
              { id: 'ita-a1-essere-avere', title: 'Essere e avere' },
              { id: 'ita-a1-numeri', title: 'L’alfabeto e i numeri' },
            ],
          },
        ],
      },
      {
        id: 'it-a1-s2', title: 'Modulo 2 · La vita di tutti i giorni',
        units: [
          {
            id: 'it-a1-u2', title: 'La mia famiglia, la mia casa', subtitle: 'Família, casa, artigos, gênero e plural',
            objective: 'Falar da família e da casa usando artigos, gênero, plural, possessivos e cores.',
            lessons: [
              { id: 'ita-a1-famiglia', title: 'La famiglia e i possessivi' },
              { id: 'ita-a1-articoli', title: 'Articoli, genere e plurale' },
              { id: 'ita-a1-casa-colori', title: 'La casa e i colori' },
            ],
          },
          {
            id: 'it-a1-u3', title: 'La mia giornata', subtitle: 'Horas, datas, rotina e comida',
            objective: 'Dizer horas, dias, meses e datas, descrever a rotina no presente com negação e perguntas e falar de comida e bebida.',
            lessons: [
              { id: 'ita-a1-ore-date', title: 'Le ore, i giorni e le date' },
              { id: 'ita-a1-presente', title: 'Il presente dei verbi regolari' },
              { id: 'ita-a1-cibo', title: 'Cibo e bevande' },
            ],
          },
        ],
      },
      {
        id: 'it-a1-s3', title: 'Modulo 3 · In città',
        units: [
          {
            id: 'it-a1-u4', title: 'Dov’è…?', subtitle: 'Lugares, preposições, profissões e compras',
            objective: 'Localizar lugares com preposições e suas contrações, falar de profissões e hobbies e fazer compras simples com os verbos modais.',
            lessons: [
              { id: 'ita-a1-luoghi-preposizioni', title: 'Luoghi e preposizioni articolate' },
              { id: 'ita-a1-professioni-hobby', title: 'Professioni e hobby' },
              { id: 'ita-a1-modali-acquisti', title: 'Verbi modali e acquisti' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'A2', title: 'Básico', description: 'Para quem já entende frases simples.',
    can: 'Contar o que fez, falar de planos, viajar, ir ao restaurante e ao hotel e conversar sobre saúde, trabalho e lazer.',
    sections: [
      {
        id: 'it-a2-s1', title: 'Modulo 1 · In viaggio',
        units: [{ id: 'it-a2-u1', title: 'Buon viaggio!', subtitle: 'Viagem, hotel, restaurante e transporte', objective: 'Resolver situações de viagem: transporte, hotel e restaurante.', lessons: [{ id: 'ita-a2-viaggi', title: 'Viaggi e trasporti' }, { id: 'ita-a2-albergo', title: 'In albergo' }, { id: 'ita-a2-ristorante', title: 'Al ristorante' }] }],
      },
      {
        id: 'it-a2-s2', title: 'Modulo 2 · Raccontare',
        units: [
          { id: 'it-a2-u2', title: 'Ieri e domani', subtitle: 'Passato prossimo, imperfetto e futuro', objective: 'Contar fatos passados, descrever hábitos antigos e falar do futuro.', lessons: [{ id: 'ita-a2-passato-prossimo', title: 'Il passato prossimo' }, { id: 'ita-a2-imperfetto', title: 'L’imperfetto' }, { id: 'ita-a2-futuro', title: 'Il futuro semplice' }] },
          { id: 'it-a2-u3', title: 'Più o meno', subtitle: 'Pronomes, comparativos e reflexivos', objective: 'Usar pronomes diretos, indiretos e reflexivos e fazer comparações.', lessons: [{ id: 'ita-a2-pronomi', title: 'Pronomi diretti e indiretti' }, { id: 'ita-a2-riflessivi', title: 'Verbi riflessivi' }, { id: 'ita-a2-comparativi', title: 'Comparativi e superlativi' }] },
        ],
      },
      {
        id: 'it-a2-s3', title: 'Modulo 3 · Vita quotidiana',
        units: [{ id: 'it-a2-u4', title: 'Lavoro e tempo libero', subtitle: 'Saúde, trabalho, estudos e relações', objective: 'Falar de saúde, trabalho, estudos, relações e lazer.', lessons: [{ id: 'ita-a2-salute', title: 'La salute' }, { id: 'ita-a2-lavoro-studio', title: 'Lavoro e studio' }, { id: 'ita-a2-tempo-libero', title: 'Tempo libero e relazioni' }] }],
      },
    ],
  },
  {
    id: 'B1', title: 'Intermediário', description: 'Para quem já se vira em situações do dia a dia.',
    can: 'Conversar com independência, dar opiniões, contar experiências e falar de cultura italiana, trabalho e sociedade.',
    sections: [
      {
        id: 'it-b1-s1', title: 'Modulo 1 · Esperienze e opinioni',
        units: [{ id: 'it-b1-u1', title: 'Secondo me…', subtitle: 'Opiniões, experiências e conectores', objective: 'Dar opiniões e contar experiências escolhendo entre passato prossimo e imperfetto.', lessons: [{ id: 'ita-b1-opinioni', title: 'Esprimere opinioni' }, { id: 'ita-b1-prossimo-imperfetto', title: 'Passato prossimo e imperfetto' }, { id: 'ita-b1-connettivi', title: 'I connettivi' }] }],
      },
      {
        id: 'it-b1-s2', title: 'Modulo 2 · Grammatica in contesto',
        units: [{ id: 'it-b1-u2', title: 'Se avessi tempo…', subtitle: 'Condizionale, congiuntivo e período hipotético', objective: 'Expressar desejos, hipóteses e opiniões com condizionale e congiuntivo e relatar falas.', lessons: [{ id: 'ita-b1-condizionale', title: 'Il condizionale' }, { id: 'ita-b1-congiuntivo', title: 'Introduzione al congiuntivo' }, { id: 'ita-b1-periodo-ipotetico', title: 'Il periodo ipotetico' }, { id: 'ita-b1-pronomi-combinati', title: 'Pronomi combinati' }, { id: 'ita-b1-discorso-indiretto', title: 'Il discorso indiretto' }, { id: 'ita-b1-passivo-relative', title: 'Passivo e frasi relative' }] }],
      },
      {
        id: 'it-b1-s3', title: 'Modulo 3 · Cultura e società',
        units: [{ id: 'it-b1-u3', title: 'L’Italia di oggi', subtitle: 'Cultura, mídia, tecnologia e ambiente', objective: 'Falar de cultura italiana, alimentação, mídia, tecnologia e meio ambiente.', lessons: [{ id: 'ita-b1-cultura', title: 'La cultura italiana' }, { id: 'ita-b1-media-tecnologia', title: 'Media e tecnologia' }, { id: 'ita-b1-ambiente', title: 'L’ambiente' }, { id: 'ita-b1-espressioni', title: 'Espressioni idiomatiche' }] }],
      },
    ],
  },
  {
    id: 'B2', title: 'Intermediário avançado', description: 'Para quem quer um italiano mais natural e preciso.',
    can: 'Debater atualidades, se comunicar no trabalho e nos negócios e entender cinema, literatura e mídia.',
    sections: [
      {
        id: 'it-b2-s1', title: 'Modulo 1 · Dibattere',
        units: [{ id: 'it-b2-u1', title: 'Il dibattito', subtitle: 'Debate, cidadania e comunicação profissional', objective: 'Argumentar sobre sociedade e cidadania e usar o registro profissional.', lessons: [{ id: 'ita-b2-dibattito', title: 'Il dibattito' }, { id: 'ita-b2-cittadinanza', title: 'Società e cittadinanza' }, { id: 'ita-b2-comunicazione-professionale', title: 'Comunicazione professionale' }] }],
      },
      {
        id: 'it-b2-s2', title: 'Modulo 2 · Grammatica avanzata',
        units: [{ id: 'it-b2-u2', title: 'Che io sappia…', subtitle: 'Congiuntivo, concordância de tempos e impessoal', objective: 'Usar o congiuntivo, a concordância de tempos, as formas impessoais e conectores avançados.', lessons: [{ id: 'ita-b2-congiuntivo', title: 'Il congiuntivo in tutti i tempi' }, { id: 'ita-b2-concordanza', title: 'La concordanza dei tempi' }, { id: 'ita-b2-impersonale', title: 'Le forme impersonali' }, { id: 'ita-b2-connettivi', title: 'Connettivi avanzati' }] }],
      },
      {
        id: 'it-b2-s3', title: 'Modulo 3 · Cultura e attualità',
        units: [{ id: 'it-b2-u3', title: 'Cinema, libri e notizie', subtitle: 'Literatura, cinema, economia e ciência', objective: 'Interpretar cinema, literatura e notícias e discutir economia, ciência e negócios.', lessons: [{ id: 'ita-b2-cinema-letteratura', title: 'Cinema e letteratura' }, { id: 'ita-b2-economia-scienza', title: 'Economia e scienza' }, { id: 'ita-b2-collocazioni', title: 'Collocazioni e sfumature' }] }],
      },
    ],
  },
  {
    id: 'C1', title: 'Avançado', description: 'Para quem já lê e fala com segurança.',
    can: 'Argumentar com precisão, analisar textos literários e jornalísticos e se comunicar em contextos acadêmicos e profissionais.',
    sections: [
      {
        id: 'it-c1-s1', title: 'Modulo 1 · Italiano accademico e professionale',
        units: [{ id: 'it-c1-u1', title: 'Con precisione', subtitle: 'Escrita acadêmica, apresentações e argumentação', objective: 'Escrever, apresentar e argumentar com registro acadêmico e profissional.', lessons: [{ id: 'ita-c1-scrittura-accademica', title: 'La scrittura accademica' }, { id: 'ita-c1-presentazioni', title: 'Presentazioni' }, { id: 'ita-c1-argomentazione', title: 'L’argomentazione' }] }],
      },
      {
        id: 'it-c1-s2', title: 'Modulo 2 · Interpretare',
        units: [{ id: 'it-c1-u2', title: 'Tra le righe', subtitle: 'Literatura, jornalismo, ironia e registro', objective: 'Analisar textos literários e jornalísticos percebendo ironia, intenção, linguagem figurada e registro.', lessons: [{ id: 'ita-c1-testi-complessi', title: 'Testi letterari e giornalistici' }, { id: 'ita-c1-ironia-registro', title: 'Ironia, intenzione e registro' }, { id: 'ita-c1-nominalizzazione', title: 'Nominalizzazione ed enfasi' }] }],
      },
    ],
  },
]
