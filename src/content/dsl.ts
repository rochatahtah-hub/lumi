// Formato compacto para escrever o acervo: menos repetição de chaves = menos erro de estrutura.
// Os ids de blocos (b1, b2…) e questões (q1, q2…) são atribuídos automaticamente pela ordem.
import type { Block, Formula, HistoryInfo, Lesson, LevelId, Question, Source, SubjectId } from '../types'

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

/** bloco de explicação com as reformulações: [muito simples, exemplo do cotidiano, passo a passo] */
export const block = (skill: string, title: string, text: string, example: string, simples: string, exemplo: string, passos: string): Omit<Block, 'id'> =>
  ({ skill, title, text, example, variants: { simples, exemplo, passos } })

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
