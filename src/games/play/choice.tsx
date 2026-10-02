import { useMemo, useState, type ReactNode } from 'react'
import { Pause, Play, Turtle } from 'lucide-react'
import type { Lesson } from '../../types'
import { canSpeak, speak } from '../../lib/speech'
import { byDifficulty, gameBlanks, gameDialogues, gameQuiz } from '../content'
import { ConfirmButton, GameShell, OptionButton, PRAISE, poseFor, type GameApi } from '../GameShell'
import type { GameType } from '../registry'

type D = 1 | 2 | 3
export interface GameProps { lesson: Lesson; difficulty: D; game: GameType; onRestart: () => void }

export interface ChoiceItem {
  prompt: ReactNode
  options: string[]
  answer: number
  explanation: string
  difficulty: D
  hints?: [string, string, string]
  key?: string
  label?: string
  /** conteúdo acima da pergunta (texto de leitura, player de áudio…) */
  lead?: ReactNode
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']
const GENERIC_HINTS: [string, string, string] = ['Leia tudo com calma antes de escolher.', 'Pense na regra ou na ideia principal da aula.', 'Uma das opções que sobrou foi riscada para você.']

/** rodada de alternativas usada por Complete a Frase, Quiz, Diálogo, Listening e Reading */
export function ChoiceGame({ items, grid, ...p }: GameProps & { items: ChoiceItem[]; grid?: boolean }) {
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [wrong, setWrong] = useState<number[]>([])
  const [status, setStatus] = useState<'answering' | 'right' | 'revealed'>('answering')
  const [hidden, setHidden] = useState<number | null>(null)
  const item = items[i]
  if (!item) return null

  const hint = (lv: 1 | 2 | 3) => {
    if (lv === 3) {
      const out = item.options.findIndex((_, k) => k !== item.answer && !wrong.includes(k))
      setHidden(out)
    }
    return (item.hints ?? GENERIC_HINTS)[lv - 1]
  }

  const confirm = (api: GameApi) => {
    if (picked === null) return
    api.move()
    if (picked === item.answer) {
      if (!wrong.length) api.hit(true, { key: item.key, label: item.label })
      setStatus('right')
      api.say(`${PRAISE[item.difficulty]}\n${item.explanation}`, poseFor(item.difficulty))
    } else if (!wrong.length) {
      api.hit(false, { key: item.key, label: item.label })
      setWrong([picked])
      setPicked(null)
      api.say(`Quase! ${(item.hints ?? GENERIC_HINTS)[0]} Tente de novo.`, 'look')
    } else {
      setStatus('revealed')
      api.say(`A resposta correta é “${item.options[item.answer]}”.\n${item.explanation}`, 'look')
    }
  }
  const next = (api: GameApi) => {
    if (i + 1 >= items.length) return api.done(items.length)
    setI(i + 1); setPicked(null); setWrong([]); setStatus('answering'); setHidden(null)
    api.say('Próxima!', 'smile')
  }

  return (
    <GameShell {...p} progress={[i + 1, items.length]} hint={hint}>
      {(api) => (
        <div key={i} className="animate-rise">
          {item.lead}
          <div className="whitespace-pre-line text-lg font-medium leading-snug">{item.prompt}</div>
          <div className={`mt-4 ${grid ? 'grid grid-cols-2 gap-2' : 'grid gap-2'}`}>
            {item.options.map((o, k) => k === hidden ? null : (
              <OptionButton key={k} label={grid ? undefined : LETTERS[k]} text={o}
                disabled={status !== 'answering' || wrong.includes(k)}
                state={status !== 'answering' && k === item.answer ? 'right' : wrong.includes(k) ? 'wrong' : picked === k ? 'selected' : 'idle'}
                onClick={() => setPicked(k)} />
            ))}
          </div>
          {status === 'answering'
            ? <ConfirmButton onClick={() => confirm(api)} disabled={picked === null}>Confirmar</ConfirmButton>
            : <ConfirmButton onClick={() => next(api)}>{i + 1 >= items.length ? 'Ver resultado' : 'Continuar'}</ConfirmButton>}
        </div>
      )}
    </GameShell>
  )
}

const COUNT: Record<D, number> = { 1: 5, 2: 6, 3: 8 }

export function CompleteGame(p: GameProps) {
  const items = useMemo<ChoiceItem[]>(() => byDifficulty(gameBlanks(p.lesson), p.difficulty, COUNT[p.difficulty]).map((b) => ({
    prompt: b.sentence.replace(/_{2,}/g, '______'), options: b.options, answer: b.answer, explanation: b.explanation, difficulty: b.difficulty, hints: b.hints, key: b.key, label: b.label,
  })), [p.lesson, p.difficulty])
  return <ChoiceGame {...p} items={items} grid />
}

export function QuizGame(p: GameProps) {
  const items = useMemo<ChoiceItem[]>(() => byDifficulty(gameQuiz(p.lesson), p.difficulty, 5).map((q) => ({ ...q, prompt: q.prompt })), [p.lesson, p.difficulty])
  return <ChoiceGame {...p} items={items} />
}

export function DialogueGame(p: GameProps) {
  const items = useMemo<ChoiceItem[]>(() => byDifficulty(gameDialogues(p.lesson), p.difficulty, 4).map((d) => ({
    prompt: 'Qual fala completa a conversa? · Which line completes the dialogue?',
    lead: (
      <div className="mb-4 space-y-2">
        <p className="text-sm font-semibold text-laranja-claro">💬 {d.title}</p>
        {d.lines.map((l, k) => (
          <div key={k} className={`flex ${k % 2 ? 'justify-end' : ''}`}>
            <p className={`max-w-[85%] rounded-2xl px-3 py-2 text-[15px] ${k === d.gap ? 'border-2 border-dashed border-laranja/70 text-laranja-claro' : k % 2 ? 'bg-laranja/20' : 'bg-white/10'}`}>
              <b className="mr-1 text-offwhite/70">{l.who}:</b>{k === d.gap ? '______' : l.text}
            </p>
          </div>
        ))}
      </div>
    ),
    options: d.options, answer: d.answer, explanation: d.explanation, difficulty: d.difficulty, key: `${p.lesson.id}:${p.lesson.blocks[0]?.skill ?? 'vocab'}`, label: p.lesson.title,
  })), [p.lesson, p.difficulty])
  return <ChoiceGame {...p} items={items} />
}

export function ReadingGame(p: GameProps) {
  const r = p.lesson.english!.reading!
  const items = useMemo<ChoiceItem[]>(() => byDifficulty(r.questions, p.difficulty, 5).map((q) => ({
    ...q, key: `${p.lesson.id}:reading`, label: `Leitura: ${p.lesson.title}`,
    lead: (
      <details open className="mb-4 rounded-2xl bg-white/5 p-3">
        <summary className="cursor-pointer text-sm font-semibold text-laranja-claro">📖 {r.title} <span className="font-normal text-offwhite/60">· {r.genre}</span></summary>
        <p className="mt-2 whitespace-pre-line text-[15px] leading-relaxed text-offwhite/90">{r.text}</p>
      </details>
    ),
  })), [p.lesson, p.difficulty, r])
  return <ChoiceGame {...p} items={items} />
}

export function ListeningGame(p: GameProps) {
  const l = p.lesson.english!.listening!
  const items = useMemo<ChoiceItem[]>(() => byDifficulty(l.questions, p.difficulty, 5).map((q) => ({
    ...q, key: `${p.lesson.id}:l_listening`, label: `Listening: ${p.lesson.title}`, lead: <AudioPlayer script={l.script} rate={l.rate} audioUrl={l.audioUrl} />,
  })), [p.lesson, p.difficulty, l])
  return <ChoiceGame {...p} items={items} />
}

/** player do listening: voz do aparelho lendo o roteiro original (ou áudio licenciado), com opção mais devagar */
export function AudioPlayer({ script, rate = 0.95, audioUrl }: { script: string[]; rate?: number; audioUrl?: string }) {
  const [playing, setPlaying] = useState(false)
  const [showText, setShowText] = useState(false)
  const play = async (slow: boolean) => {
    if (audioUrl) { void new Audio(audioUrl).play(); return }
    setPlaying(true)
    await speak(script, { rate: slow ? rate * 0.7 : rate })
    setPlaying(false)
  }
  if (!canSpeak && !audioUrl) {
    return (
      <div className="mb-4 rounded-2xl bg-white/5 p-3 text-sm">
        <p>🔇 Este aparelho não tem voz disponível para o áudio. Leia o roteiro:</p>
        <p className="mt-2 whitespace-pre-line text-offwhite/90">{script.join('\n')}</p>
      </div>
    )
  }
  return (
    <div className="mb-4 rounded-2xl bg-white/5 p-3">
      <div className="flex flex-wrap gap-2">
        <button onClick={() => void play(false)} disabled={playing} className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-laranja px-4 font-semibold text-white disabled:opacity-60">{playing ? <Pause size={18} /> : <Play size={18} />} {playing ? 'Tocando…' : 'Ouvir'}</button>
        <button onClick={() => void play(true)} disabled={playing} className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-white/20 px-4 text-sm font-semibold disabled:opacity-60"><Turtle size={18} /> Mais devagar</button>
        <button onClick={() => setShowText((v) => !v)} className="min-h-11 rounded-2xl px-3 text-sm text-offwhite/70 underline-offset-2 hover:underline">{showText ? 'Esconder texto' : 'Ver o texto'}</button>
      </div>
      {showText && <p className="mt-2 whitespace-pre-line text-sm text-offwhite/80">{script.join('\n')}</p>}
    </div>
  )
}

