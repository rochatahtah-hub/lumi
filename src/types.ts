export type SubjectId =
  | 'matematica' | 'portugues' | 'ciencias' | 'historia' | 'geografia' | 'ingles' | 'espanhol' | 'frances' | 'italiano'
  | 'fisica' | 'quimica' | 'biologia' | 'literatura' | 'filosofia' | 'sociologia' | 'artes'
  | 'redacao' | 'edfisica'

/** fund1 = 1º ao 5º ano · fund2 = 6º ao 9º ano · medio = Ensino Médio */
export type LevelId = 'fund1' | 'fund2' | 'medio'

/**
 * Reformulações pedagógicas usadas no "Não entendi":
 * simples = muito simples · exemplo = exemplo do cotidiano · passos = passo a passo · compara = comparando com algo parecido
 * (outra/detalhado ficam para o conteúdo que já as tinha)
 */
export type ReexplainMode = 'simples' | 'exemplo' | 'passos' | 'compara' | 'outra' | 'detalhado'

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
  /** dados próprios do curso de Inglês (nível, unidade, vocabulário, gramática, reading, listening, speaking, writing) */
  english?: EnglishInfo
  /** material dos jogos que não sai direto dos exercícios (palavras, pares, sequências, frases, mapa) */
  games?: LessonGames
}

// ─────────────────────────── curso de Inglês ───────────────────────────
export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1'
export const CEFR_LEVELS: CefrLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1']
/** as seis habilidades acompanhadas no painel de Inglês */
export type EnglishSkill = 'reading' | 'writing' | 'listening' | 'speaking' | 'vocabulary' | 'grammar'

export interface VocabEntry {
  word: string
  translation: string
  /** definição em inglês simples */
  definition: string
  example: string
  /** pronúncia aproximada (guia de leitura, não IPA) */
  pronunciation?: string
  pos: 'noun' | 'verb' | 'adjective' | 'adverb' | 'pronoun' | 'preposition' | 'phrase' | 'phrasal verb' | 'idiom' | 'conjunction' | 'determiner' | 'number' | 'interjection'
  topic?: string
  synonyms?: string[]
  antonyms?: string[]
  collocations?: string[]
  related?: string[]
  difficulty: 1 | 2 | 3
}

export interface GrammarInfo {
  name: string
  when: string
  structure: string
  affirmative: string[]
  negative: string[]
  interrogative: string[]
  /** comparação com estruturas parecidas */
  compare?: string
  /** exemplo dentro de uma situação real */
  context?: string
}

export interface MCItem { prompt: string; options: string[]; answer: number; explanation: string; difficulty: 1 | 2 | 3; focus?: string }

export interface ReadingActivity { title: string; genre: string; text: string; questions: MCItem[] }
/** roteiro original do LUMI; o áudio é gerado pela voz do aparelho (ou um arquivo licenciado em audioUrl) */
export interface ListeningActivity { title: string; kind: 'palavras' | 'frase' | 'dialogo' | 'texto'; script: string[]; rate?: number; audioUrl?: string; questions: MCItem[] }
export interface SpeakingActivity { situation: string; vocabulary: string[]; phrases: string[]; example: string; challenge: string; /** palavras que se espera ouvir (conferidas quando há microfone) */ expected: string[] }
export interface WritingActivity { prompt: string; criteria: string[]; model: string; keywords: string[]; minWords: number }

export interface EnglishInfo {
  cefr: CefrLevel
  unit: string
  /** posição da aula dentro da unidade */
  order: number
  area: 'vocabulary' | 'grammar' | 'reading' | 'listening' | 'speaking' | 'writing' | 'pronunciation' | 'review'
  focus: EnglishSkill[]
  vocabulary?: VocabEntry[]
  grammar?: GrammarInfo
  reading?: ReadingActivity
  listening?: ListeningActivity
  speaking?: SpeakingActivity
  writing?: WritingActivity
  /** mini desafio do fim da aula */
  challenge?: string
  tips?: string[]
}

// ─────────────────────────── jogos ───────────────────────────
export interface GameWord { word: string; clue: string; difficulty: 1 | 2 | 3 }
export interface GamePair { a: string; b: string; difficulty: 1 | 2 | 3; /** o lado A pode ser lido em voz alta (inglês) */ speak?: boolean }
/** sequência na ordem correta; words = organizar as palavras de uma frase */
export interface GameSequence { prompt: string; items: string[]; difficulty: 1 | 2 | 3; words?: boolean; explanation: string }
export interface GameBlank { sentence: string; options: string[]; answer: number; explanation: string; difficulty: 1 | 2 | 3 }
export interface GameDialogue { title: string; lines: { who: string; text: string }[]; /** índice da fala que fica em branco */ gap: number; options: string[]; answer: number; explanation: string; difficulty: 1 | 2 | 3 }
export type MapId = 'mundo' | 'europa' | 'america-sul' | 'brasil'
export interface MapTarget { id: string; label: string; clue?: string; difficulty: 1 | 2 | 3 }
export interface GameMap { map: MapId; prompt: string; targets: MapTarget[]; /** agrupamento opcional (ex.: estados → regiões) */ groups?: Record<string, string[]> }
export interface LessonGames {
  words?: GameWord[]
  pairs?: GamePair[]
  sequences?: GameSequence[]
  blanks?: GameBlank[]
  dialogues?: GameDialogue[]
  map?: GameMap
}
