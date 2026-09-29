export type SubjectId =
  | 'matematica' | 'portugues' | 'ciencias' | 'historia' | 'geografia' | 'ingles'
  | 'fisica' | 'quimica' | 'biologia' | 'literatura' | 'filosofia' | 'sociologia' | 'artes'
  | 'redacao' | 'edfisica'

/** fund1 = 1º ao 5º ano · fund2 = 6º ao 9º ano · medio = Ensino Médio */
export type LevelId = 'fund1' | 'fund2' | 'medio'

/**
 * Reformulações pedagógicas usadas no "Não entendi":
 * simples = muito simples · exemplo = exemplo do cotidiano · passos = passo a passo
 * (outra/detalhado ficam para o conteúdo que já as tinha)
 */
export type ReexplainMode = 'simples' | 'exemplo' | 'passos' | 'outra' | 'detalhado'

export interface Block {
  id: string
  title: string
  text: string
  example?: string
  /** habilidade que este bloco ensina — liga o bloco às questões para a revisão automática */
  skill?: string
  /** reformulações prontas para o "Não entendi" (a base responde sem IA) */
  variants?: Partial<Record<ReexplainMode, string>>
}

interface QuestionBase {
  id: string
  difficulty: 1 | 2 | 3
  skill: string
  /** três níveis: pista → conceito → caminho da resolução */
  hints: [string, string, string]
  /** por que a resposta correta está correta */
  explanation: string
}

export type Question =
  | (QuestionBase & { type: 'mc'; prompt: string; options: string[]; answer: number })
  | (QuestionBase & { type: 'tf'; prompt: string; answer: boolean })
  | (QuestionBase & { type: 'fill'; prompt: string; answers: string[] })
  | (QuestionBase & { type: 'match'; prompt: string; pairs: [string, string][] })
  | (QuestionBase & { type: 'open'; prompt: string; modelAnswer: string; keywords: string[] })
  /** ordenar acontecimentos/etapas: `items` já está na ordem correta; o app embaralha */
  | (QuestionBase & { type: 'order'; prompt: string; items: string[] })

export type SourceKind = 'curriculo' | 'livro' | 'material' | 'site' | 'instituicao' | 'video' | 'canal' | 'autoral' | 'ia'
export const SOURCE_KINDS: SourceKind[] = ['curriculo', 'livro', 'material', 'site', 'instituicao', 'video', 'canal', 'autoral', 'ia']

export interface Source {
  title: string
  url?: string
  /** instituição ou autor */
  author?: string
  kind: SourceKind
  /** data de acesso (AAAA-MM-DD) */
  accessedAt?: string
}

/** fórmula com o significado de cada variável e quando ela vale */
export interface Formula {
  name: string
  expression: string
  variables: { symbol: string; meaning: string; unit?: string }[]
  conditions?: string
}

/** dados próprios de História */
export interface HistoryInfo {
  period: string
  timeline: { date: string; event: string }[]
  people?: { name: string; role: string }[]
  causes?: string[]
  consequences?: string[]
  /** interpretações acadêmicas diferentes — nunca apresentadas como fato único */
  interpretations?: string[]
  place?: string
}

export type LessonStatus = 'draft' | 'in_review' | 'published' | 'archived'

export interface Lesson {
  id: string
  subject: SubjectId
  title: string
  levels: LevelId[]
  /** ano/série, ex.: "6º ano" */
  grade: string
  /** palavras-chave e sinônimos usados na busca */
  aliases: string[]
  /** assunto e subassunto (matéria → série → assunto → subassunto) */
  topic?: string
  subtopic?: string
  /** perguntas do jeito que os alunos fazem — ajudam a busca a reconhecer o conteúdo */
  relatedQuestions?: string[]
  /** outras formas de perguntar a mesma coisa (intenções diferentes) */
  equivalentQuestions?: string[]
  summary: string
  intro: string
  /** o que o aluno deve ser capaz de fazer depois do conteúdo */
  objective?: string
  /** ids de conteúdos que ajudam a entender este (pré-requisitos) e o que vem depois */
  prerequisites?: string[]
  next?: string[]
  blocks: Block[]
  questions: Question[]
  skills: Record<string, string>
  review: string[]
  formulas?: Formula[]
  commonDoubts?: { q: string; a: string }[]
  commonErrors?: string[]
  history?: HistoryInfo
  /** relação com o ENEM/vestibulares, quando houver */
  enem?: string
  sources?: Source[]
  origin?: 'base' | 'ia' | 'colado' | 'nuvem'
  /** conteúdo pesquisado pela IA que ainda não passou pela revisão administrativa */
  unreviewed?: boolean
  status?: LessonStatus
  version?: number
  createdAt?: string
  reviewedAt?: string
}
