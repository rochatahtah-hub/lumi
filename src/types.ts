export type SubjectId =
  | 'matematica' | 'portugues' | 'ciencias' | 'historia' | 'geografia' | 'ingles'
  | 'fisica' | 'quimica' | 'biologia' | 'literatura' | 'filosofia' | 'sociologia' | 'artes'

/** fund1 = 1º ao 5º ano · fund2 = 6º ao 9º ano · medio = Ensino Médio */
export type LevelId = 'fund1' | 'fund2' | 'medio'

export type ReexplainMode = 'simples' | 'exemplo' | 'outra' | 'detalhado'

export interface Block {
  id: string
  title: string
  text: string
  example?: string
  /** habilidade que este bloco ensina — liga o bloco às questões para a revisão automática */
  skill?: string
  /** reformulações prontas para o "Não entendi" quando a IA não está disponível */
  variants?: Partial<Record<ReexplainMode, string>>
}

interface QuestionBase {
  id: string
  difficulty: 1 | 2 | 3
  skill: string
  /** três níveis: pista → conceito → caminho da resolução */
  hints: [string, string, string]
  explanation: string
}

export type Question =
  | (QuestionBase & { type: 'mc'; prompt: string; options: string[]; answer: number })
  | (QuestionBase & { type: 'tf'; prompt: string; answer: boolean })
  | (QuestionBase & { type: 'fill'; prompt: string; answers: string[] })
  | (QuestionBase & { type: 'match'; prompt: string; pairs: [string, string][] })
  | (QuestionBase & { type: 'open'; prompt: string; modelAnswer: string; keywords: string[] })

export type SourceKind = 'curriculo' | 'livro' | 'material' | 'site' | 'instituicao' | 'video' | 'canal' | 'autoral' | 'ia'
export const SOURCE_KINDS: SourceKind[] = ['curriculo', 'livro', 'material', 'site', 'instituicao', 'video', 'canal', 'autoral', 'ia']

export interface Source {
  title: string
  url?: string
  author?: string
  kind: SourceKind
}

export interface Lesson {
  id: string
  subject: SubjectId
  title: string
  levels: LevelId[]
  grade: string
  /** palavras-chave e sinônimos usados na busca */
  aliases: string[]
  /** assunto e subassunto (matéria → série → assunto → subassunto) */
  topic?: string
  subtopic?: string
  /** perguntas do jeito que os alunos fazem — ajudam a busca a reconhecer o conteúdo */
  relatedQuestions?: string[]
  summary: string
  intro: string
  blocks: Block[]
  questions: Question[]
  skills: Record<string, string>
  review: string[]
  sources?: Source[]
  origin?: 'base' | 'ia' | 'colado' | 'nuvem'
  /** conteúdo pesquisado pela IA que ainda não passou pela revisão administrativa */
  unreviewed?: boolean
}
