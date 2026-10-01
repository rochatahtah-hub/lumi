// Trilha de Espanhol do LUMI: NÍVEL → MÓDULO → UNIDADE → AULAS. Estrutura e textos próprios do LUMI.
// Aulas sem conteúdo na Base Oficial aparecem como "em produção" (a trilha mostra o caminho, sem inventar conteúdo).
import type { CourseLevel } from '../english/course'

export const ES_COURSE: CourseLevel[] = [
  {
    id: 'A1', title: 'Iniciante', description: 'Para quem está começando do zero.',
    can: 'Cumprimentar, se apresentar, falar da família, da casa e da rotina e fazer perguntas simples.',
    sections: [
      {
        id: 'es-a1-s1', title: 'Módulo 1 · Primeros pasos',
        units: [
          {
            id: 'es-a1-u1', title: '¡Hola! ¿Qué tal?', subtitle: 'Cumprimentos e apresentações',
            objective: 'Cumprimentar em situações formais e informais, se apresentar com llamarse e ser e dizer de onde é.',
            lessons: [
              { id: 'esp-a1-saludos', title: 'Saludos y presentaciones' },
              { id: 'esp-a1-ser-llamarse', title: 'Ser y llamarse' },
              { id: 'esp-a1-alfabeto-numeros', title: 'El alfabeto y los números' },
              { id: 'esp-a1-paises', title: 'Países y nacionalidades' },
            ],
          },
        ],
      },
      {
        id: 'es-a1-s2', title: 'Módulo 2 · La vida cotidiana',
        units: [
          {
            id: 'es-a1-u2', title: 'Mi familia y mi casa', subtitle: 'Família, casa, artigos e gênero',
            objective: 'Falar da família e da casa usando artigos, gênero, número e o verbo tener.',
            lessons: [
              { id: 'esp-a1-familia-tener', title: 'La familia y el verbo tener' },
              { id: 'esp-a1-articulos-genero', title: 'Artículos, género y número' },
              { id: 'esp-a1-casa-estar', title: 'La casa y el verbo estar' },
            ],
          },
          {
            id: 'es-a1-u3', title: 'Mi día', subtitle: 'Rotina, escola e trabalho no presente',
            objective: 'Descrever a rotina com verbos regulares no presente e falar de escola e trabalho.',
            lessons: [
              { id: 'esp-a1-presente-regular', title: 'Presente de indicativo' },
              { id: 'esp-a1-rutina', title: 'La rutina diaria' },
            ],
          },
        ],
      },
      {
        id: 'es-a1-s3', title: 'Módulo 3 · Comunicación básica',
        units: [
          {
            id: 'es-a1-u4', title: '¿Dónde está…?', subtitle: 'Perguntas, pedidos e direções',
            objective: 'Fazer perguntas com os interrogativos, pedir coisas com educação e pedir e entender direções simples.',
            lessons: [
              { id: 'esp-a1-preguntas', title: 'Preguntas y respuestas' },
              { id: 'esp-a1-direcciones', title: 'Pedir y dar direcciones' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'A2', title: 'Básico', description: 'Para quem já entende frases simples.',
    can: 'Contar o que fez, fazer planos, comprar, pedir comida e falar de saúde e lazer.',
    sections: [
      {
        id: 'es-a2-s1', title: 'Módulo 1 · De viaje y de compras',
        units: [
          { id: 'es-a2-u1', title: 'De compras', subtitle: 'Compras, comida e comparações', objective: 'Comprar, perguntar preços, pedir comida e comparar produtos.', lessons: [{ id: 'esp-a2-compras', title: 'De compras' }, { id: 'esp-a2-restaurante', title: 'En el restaurante' }, { id: 'esp-a2-comparativos', title: 'Comparativos y superlativos' }] },
          { id: 'es-a2-u2', title: 'Nos vamos', subtitle: 'Viagem e transporte', objective: 'Organizar uma viagem e usar o transporte.', lessons: [{ id: 'esp-a2-viajes', title: 'Viajes y transporte' }] },
        ],
      },
      {
        id: 'es-a2-s2', title: 'Módulo 2 · Mi pasado y mis planes',
        units: [
          { id: 'es-a2-u3', title: '¿Qué hiciste?', subtitle: 'Tempos do passado', objective: 'Contar experiências com o pretérito perfecto, o indefinido e o imperfecto.', lessons: [{ id: 'esp-a2-preterito-perfecto', title: 'Pretérito perfecto' }, { id: 'esp-a2-indefinido', title: 'Pretérito indefinido' }, { id: 'esp-a2-imperfecto', title: 'Pretérito imperfecto' }] },
          { id: 'es-a2-u4', title: 'Mañana voy a…', subtitle: 'Futuro e perífrases', objective: 'Falar de planos com ir a + infinitivo e o futuro simples.', lessons: [{ id: 'esp-a2-futuro', title: 'Futuro y perífrasis' }] },
        ],
      },
      {
        id: 'es-a2-s3', title: 'Módulo 3 · Salud y tiempo libre',
        units: [
          { id: 'es-a2-u5', title: 'Me duele…', subtitle: 'Saúde, hobbies e verbos reflexivos', objective: 'Falar de saúde, hobbies e rotina com verbos reflexivos e pronomes.', lessons: [{ id: 'esp-a2-salud', title: 'La salud' }, { id: 'esp-a2-reflexivos', title: 'Verbos reflexivos' }, { id: 'esp-a2-pronombres', title: 'Pronombres de objeto' }, { id: 'esp-a2-aficiones', title: 'Aficiones y tiempo libre' }] },
        ],
      },
    ],
  },
  {
    id: 'B1', title: 'Intermediário', description: 'Para quem já se vira em situações do dia a dia.',
    can: 'Dar opiniões, contar experiências com detalhes, levantar hipóteses e falar de trabalho, estudos e cultura.',
    sections: [
      {
        id: 'es-b1-s1', title: 'Módulo 1 · Conversación y opiniones',
        units: [{ id: 'es-b1-u1', title: 'Yo creo que…', subtitle: 'Opiniões e conectores', objective: 'Expressar e justificar opiniões com conectores.', lessons: [{ id: 'esp-b1-opiniones', title: 'Dar opiniones' }, { id: 'esp-b1-conectores', title: 'Conectores' }] }],
      },
      {
        id: 'es-b1-s2', title: 'Módulo 2 · Gramática en contexto',
        units: [{ id: 'es-b1-u2', title: 'Ojalá…', subtitle: 'Subjuntivo, condicional e relativas', objective: 'Expressar desejos e hipóteses com o subjuntivo e o condicional e unir ideias com orações relativas.', lessons: [{ id: 'esp-b1-contraste-pasados', title: 'Contraste de pasados' }, { id: 'esp-b1-subjuntivo', title: 'Introducción al subjuntivo' }, { id: 'esp-b1-condicional', title: 'El condicional' }, { id: 'esp-b1-relativas', title: 'Oraciones relativas' }, { id: 'esp-b1-estilo-indirecto', title: 'Estilo indirecto' }, { id: 'esp-b1-pasiva', title: 'La voz pasiva' }] }],
      },
      {
        id: 'es-b1-s3', title: 'Módulo 3 · Trabajo, estudios y sociedad',
        units: [{ id: 'es-b1-u3', title: 'En el trabajo', subtitle: 'Trabalho, educação, cultura e mídia', objective: 'Falar de trabalho, estudos, cultura e mídia.', lessons: [{ id: 'esp-b1-trabajo', title: 'El trabajo' }, { id: 'esp-b1-educacion', title: 'La educación' }, { id: 'esp-b1-cultura', title: 'Cultura hispánica' }, { id: 'esp-b1-medios', title: 'Los medios de comunicación' }] }],
      },
    ],
  },
  {
    id: 'B2', title: 'Intermediário avançado', description: 'Para quem quer um espanhol mais natural e preciso.',
    can: 'Debater, se comunicar no trabalho e nos estudos, entender expressões idiomáticas e evitar falsos cognatos.',
    sections: [
      {
        id: 'es-b2-s1', title: 'Módulo 1 · Debate y comunicación profesional',
        units: [{ id: 'es-b2-u1', title: 'Debatir', subtitle: 'Argumentação e registro profissional', objective: 'Argumentar em debates e se comunicar em contexto profissional e acadêmico.', lessons: [{ id: 'esp-b2-debates', title: 'Debates' }, { id: 'esp-b2-profesional', title: 'Comunicación profesional' }, { id: 'esp-b2-academico', title: 'Contextos académicos' }] }],
      },
      {
        id: 'es-b2-s2', title: 'Módulo 2 · Gramática avanzada',
        units: [{ id: 'es-b2-u2', title: 'Si hubiera sabido…', subtitle: 'Subjuntivo, condicionais e perífrases', objective: 'Usar o subjuntivo em todos os contextos, as condicionais e as perífrases verbais.', lessons: [{ id: 'esp-b2-subjuntivo', title: 'Subjuntivo avanzado' }, { id: 'esp-b2-condicionales', title: 'Oraciones condicionales' }, { id: 'esp-b2-perifrasis', title: 'Perífrasis verbales' }, { id: 'esp-b2-conectores', title: 'Conectores avanzados' }] }],
      },
      {
        id: 'es-b2-s3', title: 'Módulo 3 · Matices del idioma',
        units: [{ id: 'es-b2-u3', title: 'No es lo que parece', subtitle: 'Falsos cognatos, expressões e colocações', objective: 'Evitar falsos cognatos com o português e usar expressões idiomáticas e colocações.', lessons: [{ id: 'esp-b2-falsos-amigos', title: 'Falsos amigos' }, { id: 'esp-b2-expresiones', title: 'Expresiones idiomáticas' }, { id: 'esp-b2-colocaciones', title: 'Colocaciones' }] }],
      },
      {
        id: 'es-b2-s4', title: 'Módulo 4 · Sociedad, ciencia y medio ambiente',
        units: [{ id: 'es-b2-u4', title: 'El mundo de hoy', subtitle: 'Ciência, tecnologia e ambiente', objective: 'Discutir ciência, tecnologia, sociedade e meio ambiente.', lessons: [{ id: 'esp-b2-ciencia-tecnologia', title: 'Ciencia y tecnología' }, { id: 'esp-b2-medio-ambiente', title: 'Medio ambiente' }] }],
      },
    ],
  },
  {
    id: 'C1', title: 'Avançado', description: 'Para quem já lê e fala com segurança.',
    can: 'Argumentar, perceber ironia, intenção e nuances e escrever textos acadêmicos e profissionais.',
    sections: [
      {
        id: 'es-c1-s1', title: 'Módulo 1 · Español académico y profesional',
        units: [{ id: 'es-c1-u1', title: 'Con precisión', subtitle: 'Escrita acadêmica, apresentações e argumentação', objective: 'Escrever e apresentar com registro acadêmico e profissional e construir argumentos.', lessons: [{ id: 'esp-c1-escritura-academica', title: 'Escritura académica' }, { id: 'esp-c1-presentaciones', title: 'Presentaciones' }, { id: 'esp-c1-argumentacion', title: 'Argumentación' }] }],
      },
      {
        id: 'es-c1-s2', title: 'Módulo 2 · Leer entre líneas',
        units: [{ id: 'es-c1-u2', title: 'Lo que no se dice', subtitle: 'Ironia, intenção e nuances', objective: 'Interpretar textos complexos percebendo ironia, intenção e nuances.', lessons: [{ id: 'esp-c1-ironia-intencion', title: 'Ironía e intención' }, { id: 'esp-c1-textos-complejos', title: 'Textos complejos' }] }],
      },
    ],
  },
]
