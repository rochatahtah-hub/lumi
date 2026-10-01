// Formato compacto para escrever o acervo: menos repetição de chaves = menos erro de estrutura.
// Os ids de blocos (b1, b2…) e questões (q1, q2…) são atribuídos automaticamente pela ordem.
import type { Block, EnglishInfo, Formula, GameBlank, GameDialogue, GameSequence, HistoryInfo, Lesson, LessonGames, LevelId, MCItem, Question, Source, SubjectId, VocabEntry } from '../types'

type Hints = [string, string, string]
type Q = Question extends infer T ? (T extends Question ? Omit<T, 'id'> : never) : never

export const mc = (difficulty: 1 | 2 | 3, skill: string, prompt: string, options: string[], answer: number, hints: Hints, explanation: string): Q =>
  ({ type: 'mc', difficulty, skill, prompt, options, answer, hints, explanation })
export const tf = (difficulty: 1 | 2 | 3, skill: string, prompt: string, answer: boolean, hints: Hints, explanation: string): Q =>
  ({ type: 'tf', difficulty, skill, prompt, answer, hints, explanation })
export const fill = (difficulty: 1 | 2 | 3, skill: string, prompt: string, answers: string[], hints: Hints, explanation: string): Q =>
  ({ type: 'fill', difficulty, skill, prompt, answers, hints, explanation })
export const match = (difficulty: 1 | 2 | 3, skill: string, prompt: string, pairs: [string, string][], hints: Hints, explanation: string): Q =>
  ({ type: 'match', difficulty, skill, prompt, pairs, hints, explanation })
export const open = (difficulty: 1 | 2 | 3, skill: string, prompt: string, modelAnswer: string, keywords: string[], hints: Hints, explanation: string): Q =>
  ({ type: 'open', difficulty, skill, prompt, modelAnswer, keywords, hints, explanation })
/** `items` na ordem correta */
export const order = (difficulty: 1 | 2 | 3, skill: string, prompt: string, items: string[], hints: Hints, explanation: string): Q =>
  ({ type: 'order', difficulty, skill, prompt, items, hints, explanation })

/** bloco de explicação com as reformulações: [muito simples, exemplo do cotidiano, passo a passo, comparando (opcional)] */
export const block = (skill: string, title: string, text: string, example: string, simples: string, exemplo: string, passos: string, compara?: string): Omit<Block, 'id'> =>
  ({ skill, title, text, example, variants: { simples, exemplo, passos, ...(compara ? { compara } : {}) } })

export const formula = (name: string, expression: string, variables: [string, string, string?][], conditions?: string): Formula =>
  ({ name, expression, variables: variables.map(([symbol, meaning, unit]) => ({ symbol, meaning, ...(unit ? { unit } : {}) })), ...(conditions ? { conditions } : {}) })

const ACCESS = '2026-09-28'
export const SRC = {
  bncc: (area: string): Source => ({ title: `Base Nacional Comum Curricular (BNCC) — ${area}`, url: 'http://basenacionalcomum.mec.gov.br/', author: 'Ministério da Educação (MEC)', kind: 'curriculo', accessedAt: ACCESS }),
  obmep: (): Source => ({ title: 'Portal da Matemática OBMEP — videoaulas e materiais do Ensino Fundamental e Médio', url: 'https://portaldaobmep.impa.br/', author: 'IMPA / OBMEP', kind: 'instituicao', accessedAt: ACCESS }),
  web: (title: string, url: string, author: string, kind: Source['kind'] = 'site'): Source => ({ title, url, author, kind, accessedAt: ACCESS }),
  autoral: (): Source => ({ title: 'Conteúdo autoral LUMI, revisado com base nas fontes listadas', author: 'Equipe LUMI', kind: 'autoral', accessedAt: ACCESS }),
}

export interface LessonInput {
  id: string
  subject: SubjectId
  title: string
  levels: LevelId[]
  grade: string
  topic: string
  subtopic: string
  aliases: string[]
  summary: string
  intro: string
  objective: string
  prerequisites?: string[]
  next?: string[]
  skills: Record<string, string>
  blocks: Omit<Block, 'id'>[]
  questions: Q[]
  review: string[]
  relatedQuestions: string[]
  equivalentQuestions: string[]
  commonDoubts?: { q: string; a: string }[]
  commonErrors?: string[]
  formulas?: Formula[]
  history?: HistoryInfo
  enem?: string
  english?: EnglishInfo
  games?: LessonGames
  sources: Source[]
}

export function lesson(input: LessonInput): Lesson {
  return {
    ...input,
    blocks: input.blocks.map((b, i) => ({ ...b, id: `b${i + 1}` })),
    questions: input.questions.map((q, i) => ({ ...q, id: `q${i + 1}` }) as Question),
    createdAt: ACCESS,
    reviewedAt: ACCESS,
  }
}

// ─────────────────────────── atalhos do Curso de Inglês ───────────────────────────
type Dif = 1 | 2 | 3
/** palavra do vocabulário: palavra, tradução, classe, definição em inglês simples, exemplo, dificuldade */
export const v = (word: string, translation: string, pos: VocabEntry['pos'], definition: string, example: string, difficulty: Dif, more: Partial<VocabEntry> = {}): VocabEntry =>
  ({ word, translation, pos, definition, example, difficulty, ...more })
/** pergunta de múltipla escolha para reading/listening/nivelamento */
export const mci = (difficulty: Dif, prompt: string, options: string[], answer: number, explanation: string, focus?: string): MCItem =>
  ({ difficulty, prompt, options, answer, explanation, ...(focus ? { focus } : {}) })
/** frase com lacuna (use ___ no lugar da resposta) */
export const blank = (difficulty: Dif, sentence: string, options: string[], answer: number, explanation: string): GameBlank =>
  ({ difficulty, sentence, options, answer, explanation })
/** frase para organizar: escreva a frase certa; as palavras viram as peças */
export const words = (difficulty: Dif, sentence: string, explanation: string, prompt = 'Organize a frase · Put the words in order'): GameSequence =>
  ({ difficulty, prompt, items: sentence.split(' '), words: true, explanation })
/** diálogo: falas "Nome: texto", índice da fala que fica em branco */
export const dialogue = (difficulty: Dif, title: string, lines: string[], gap: number, options: string[], answer: number, explanation: string): GameDialogue => ({
  difficulty, title, gap, options, answer, explanation,
  lines: lines.map((l) => { const i = l.indexOf(':'); return { who: l.slice(0, i).trim(), text: l.slice(i + 1).trim() } }),
})

/**
 * Perguntas equivalentes (como os alunos perguntam) para a busca reconhecer o conteúdo sem IA.
 * Gera variações a partir dos nomes do assunto e soma as perguntas específicas.
 */
export function eqs(names: string[], specific: string[]): string[] {
  const t = [
    'o que é {n}', 'como usar {n}', 'me explica {n}', 'quando usar {n}', 'exemplos de {n}', '{n} em inglês', 'como funciona {n}',
    'regras de {n}', 'exercícios de {n}', 'aula de {n}', 'não entendi {n}', '{n} para iniciantes', 'resumo de {n}', 'dúvida sobre {n}',
  ]
  const out = [...specific]
  for (const n of names) for (const x of t) out.push(x.replace('{n}', n))
  return [...new Map(out.map((q) => [q.toLowerCase(), q])).values()]
}

export const SRC_EN = {
  bncc: (): Source => SRC.bncc('Língua Inglesa'),
  cefr: (): Source => SRC.web('Common European Framework of Reference for Languages (CEFR) — descritores de nível', 'https://www.coe.int/en/web/common-european-framework-reference-languages', 'Council of Europe', 'instituicao'),
  britishCouncil: (): Source => SRC.web('LearnEnglish — Grammar reference', 'https://learnenglish.britishcouncil.org/grammar', 'British Council', 'instituicao'),
  cambridge: (): Source => SRC.web('Cambridge Dictionary — definições e exemplos de uso', 'https://dictionary.cambridge.org/', 'Cambridge University Press', 'instituicao'),
}
/** fontes padrão das aulas de Inglês: currículo + referência de nível + referência gramatical + dicionário + autoria LUMI */
export const enSources = (): Source[] => [SRC_EN.bncc(), SRC_EN.cefr(), SRC_EN.britishCouncil(), SRC_EN.cambridge(), SRC.autoral()]

/** perguntas equivalentes para as matérias em português (mesma ideia do eqs, sem os modelos de idioma) */
export function eqsPt(names: string[], specific: string[]): string[] {
  const t = ['o que é {n}', 'como funciona {n}', 'me explica {n}', 'resumo de {n}', 'exemplos de {n}', 'exercícios de {n}', 'não entendi {n}', 'dúvida sobre {n}', 'aula de {n}', 'para que serve {n}']
  const out = [...specific]
  for (const n of names) for (const x of t) out.push(x.replace('{n}', n))
  return [...new Map(out.map((q) => [q.toLowerCase(), q])).values()]
}

// ─────────────────────────── Espanhol, Francês e Italiano ───────────────────────────
const CEFR_SRC = (): Source => SRC.web('Common European Framework of Reference for Languages (CEFR) — descritores de nível', 'https://www.coe.int/en/web/common-european-framework-reference-languages', 'Council of Europe', 'instituicao')
export const esSources = (): Source[] => [
  CEFR_SRC(),
  SRC.web('Plan Curricular del Instituto Cervantes — Niveles de referencia para el español', 'https://cvc.cervantes.es/ensenanza/biblioteca_ele/plan_curricular/', 'Instituto Cervantes', 'instituicao'),
  SRC.web('Diccionario de la lengua española', 'https://dle.rae.es/', 'Real Academia Española (RAE) / ASALE', 'instituicao'),
  SRC.autoral(),
]
export const frSources = (): Source[] => [
  CEFR_SRC(),
  SRC.web('DELF / DALF — descritores dos níveis de francês', 'https://www.france-education-international.fr/', 'France Éducation international', 'instituicao'),
  SRC.web('Dictionnaire de français', 'https://www.larousse.fr/dictionnaires/francais', 'Larousse', 'instituicao'),
  SRC.autoral(),
]
export const itSources = (): Source[] => [
  CEFR_SRC(),
  SRC.web('Lingua italiana — consulenza e dúvidas linguísticas', 'https://accademiadellacrusca.it/', 'Accademia della Crusca', 'instituicao'),
  SRC.web('Vocabolario della lingua italiana', 'https://www.treccani.it/vocabolario/', 'Istituto della Enciclopedia Italiana (Treccani)', 'instituicao'),
  SRC.autoral(),
]

/** perguntas equivalentes para Espanhol/Francês/Italiano ("{n} em espanhol"…) */
export function eqsLang(lang: 'espanhol' | 'francês' | 'italiano', names: string[], specific: string[]): string[] {
  const t = ['o que é {n}', 'como usar {n}', 'me explica {n}', 'exemplos de {n}', '{n} em ' + lang, 'exercícios de {n}', 'aula de {n}', 'não entendi {n}', 'dúvida sobre {n}', 'resumo de {n}']
  const out = [...specific]
  for (const n of names) for (const x of t) out.push(x.replace('{n}', n))
  return [...new Map(out.map((q) => [q.toLowerCase(), q])).values()]
}
