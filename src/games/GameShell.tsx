import { isLanguageSubject } from '../content/languages'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowLeft, Lightbulb, RotateCcw, Timer } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { MASCOT } from '../assets/lumi'
import { evaluateAchievements, type Achievement } from '../lib/achievements'
import { bilingual, studentEnglishLevel } from '../lib/english'
import { recordGame } from '../lib/store'
import type { Lesson } from '../types'
import { DIFFICULTY_LABEL, type GameType } from './registry'

export type MascotPose = 'look' | 'smile' | 'wave' | 'easy' | 'medium' | 'hard'
const POSE_IMG: Record<MascotPose, string> = {
  look: MASCOT.peek.look, smile: MASCOT.peek.smile, wave: MASCOT.peek.wave,
  easy: MASCOT.reactions.easy, medium: MASCOT.reactions.medium, hard: MASCOT.reactions.hard,
}
/** reação do mascote ao acerto, pela dificuldade cadastrada (fácil 👍, média mãos para cima, difícil surpresa) */
export const poseFor = (d: 1 | 2 | 3): MascotPose => (d === 3 ? 'hard' : d === 2 ? 'medium' : 'easy')
export const PRAISE: Record<1 | 2 | 3, string> = {
  1: 'Parabéns! 🎉 Muito bem! Você está no caminho certo.',
  2: 'Parabéns! Ótimo trabalho! Você conseguiu!',
  3: 'Parabéns! Incrível! Essa era difícil e você conseguiu!',
}

export interface GameApi {
  /** registra um acerto/erro (com a habilidade da aula para alimentar a revisão) */
  hit: (ok: boolean, meta?: { key?: string; label?: string; word?: string; difficulty?: 1 | 2 | 3 }) => void
  move: () => void
  say: (text: string, pose?: MascotPose) => void
  done: (total: number) => void
  /** true na primeira vez que o nível de dica é pedido (para o jogo agir: destacar, revelar…) */
  hintLevel: number
}

interface Props {
  game: GameType
  lesson: Lesson
  difficulty: 1 | 2 | 3
  progress?: [number, number]
  /** texto de cada dica (1 leve → 3 mais direta); sem função, o botão de dica some */
  hint?: (level: 1 | 2 | 3) => string | undefined
  children: (api: GameApi) => ReactNode
  onRestart: () => void
}

interface Finish { correct: number; wrong: number; hints: number; moves: number; ms: number; total: number; points: number; unlocked: Achievement[] }

export function GameShell({ game, lesson, difficulty, progress, hint, children, onRestart }: Props) {
  const nav = useNavigate()
  const started = useRef(Date.now())
  const startedIso = useRef(new Date().toISOString())
  const [now, setNow] = useState(Date.now())
  const [bubble, setBubble] = useState<{ text: string; pose: MascotPose }>(() => {
    const how = lesson.subject === 'ingles' ? bilingual(studentEnglishLevel(), game.howPt, game.howEn) : { main: game.howPt }
    return { text: how.sub ? `${how.main}\n${how.sub}` : how.main, pose: 'look' }
  })
  const [hintLevel, setHintLevel] = useState(0)
  const [finish, setFinish] = useState<Finish | null>(null)
  const stats = useRef({ correct: 0, wrong: 0, hints: 0, moves: 0 })
  const skillHits = useRef<{ key: string; label: string; right: boolean }[]>([])
  const words = useRef<{ word: string; right: boolean }[]>([])
  const ended = useRef(false)

  useEffect(() => {
    if (finish) return
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [finish])

  const api: GameApi = {
    hit: (ok, meta) => {
      stats.current[ok ? 'correct' : 'wrong']++
      if (meta?.key) skillHits.current.push({ key: meta.key, label: meta.label ?? meta.key, right: ok })
      if (meta?.word && isLanguageSubject(lesson.subject)) words.current.push({ word: meta.word, right: ok })
    },
    move: () => { stats.current.moves++ },
    say: (text, pose = 'look') => setBubble({ text, pose }),
    done: (total) => {
      if (ended.current) return // nunca registra a mesma partida duas vezes
      ended.current = true
      const ms = Date.now() - started.current
      const s = stats.current
      const points = recordGame({
        game: game.id, lessonId: lesson.id, subject: lesson.subject, difficulty, startedAt: startedIso.current, finishedAt: new Date().toISOString(),
        ms, correct: s.correct, wrong: s.wrong, hints: s.hints, moves: s.moves, total, completed: true,
      }, skillHits.current, words.current)
      setFinish({ ...s, ms, total, points, unlocked: evaluateAchievements() })
    },
    hintLevel,
  }

  const askHint = () => {
    if (!hint || hintLevel >= 3) return
    const lv = (hintLevel + 1) as 1 | 2 | 3
    const text = hint(lv)
    stats.current.hints++
    setHintLevel(lv)
    if (text) setBubble({ text: `Dica ${lv}: ${text}`, pose: 'look' })
  }

  const secs = Math.floor(((finish ? finish.ms : now - started.current)) / 1000)
  const clock = `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`
  const back = () => (history.length > 1 ? nav(-1) : nav('/jogos'))

  // Escala de dificuldade progressiva
  const getNextDifficulty = (): 1 | 2 | 3 => {
    if (!finish) return difficulty
    const total = finish.correct + finish.wrong
    if (total === 0) return difficulty
    const accuracy = (finish.correct / total) * 100

    // Se >80% de acerto e não é nível máximo, sugerir próximo nível
    if (accuracy > 80 && difficulty < 3) return (difficulty + 1) as 1 | 2 | 3
    // Se <60% de acerto e não é nível mínimo, sugerir nível anterior
    if (accuracy < 60 && difficulty > 1) return (difficulty - 1) as 1 | 2 | 3
    return difficulty
  }

  return (
    <div className="min-h-dvh bg-grafite pb-10 text-offwhite">
      <div aria-hidden className="pointer-events-none fixed -right-24 top-10 h-56 w-56 rounded-full bg-laranja/15 blur-3xl" />
      <header className="safe-top relative mx-auto flex max-w-2xl items-center gap-2 px-3">
        <button onClick={back} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 hover:bg-white/10" aria-label="Voltar"><ArrowLeft size={20} /></button>
        <p className="flex flex-1 items-center justify-center gap-1.5 font-semibold tabular-nums"><Timer size={18} className="text-laranja" /> {clock}</p>
        <p className="w-11 text-right text-sm font-semibold tabular-nums text-offwhite/80">{progress ? `${Math.min(progress[0], progress[1])}/${progress[1]}` : ''}</p>
      </header>

      <main className="relative mx-auto max-w-2xl px-4">
        <div className="mt-2 flex items-center gap-3">
          <span className="text-3xl" aria-hidden>{game.emoji}</span>
          <div className="min-w-0">
            <h1 className="text-xl font-bold leading-tight">{game.name}</h1>
            <p className="truncate text-sm text-offwhite/70">{lesson.title} · {DIFFICULTY_LABEL[difficulty]}</p>
          </div>
        </div>

        {finish ? (
          <FinishCard f={finish} difficulty={difficulty} nextDifficulty={getNextDifficulty()} onRestart={onRestart} onOther={() => nav(`/jogos?aula=${lesson.id}`)} onLesson={() => nav(lesson.origin === 'base' || lesson.origin === 'nuvem' ? `/aula/${lesson.id}` : '/')} />
        ) : (
          <>
            <section className="lumi-game-card mt-4 rounded-3xl border border-white/10 bg-grafite-2 p-3 sm:p-4">{children(api)}</section>
            <div className="mt-4 flex items-end gap-2">
              <img src={POSE_IMG[bubble.pose]} alt="" aria-hidden className="h-24 w-auto shrink-0 select-none drop-shadow-[0_6px_12px_rgba(0,0,0,.5)] sm:h-28" draggable={false} />
              <p role="status" aria-live="polite" className="relative mb-3 flex-1 whitespace-pre-line rounded-2xl rounded-bl-sm bg-offwhite px-4 py-3 text-sm font-medium text-grafite shadow-lg">{bubble.text}</p>
            </div>
            {hint && (
              <button onClick={askHint} disabled={hintLevel >= 3} className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-2xl border border-laranja/50 px-4 text-sm font-semibold text-laranja-claro disabled:opacity-40">
                <Lightbulb size={18} /> {hintLevel >= 3 ? 'Sem mais dicas' : `Dica ${hintLevel + 1} de 3`}
              </button>
            )}
          </>
        )}
      </main>
    </div>
  )
}

function FinishCard({ f, difficulty, nextDifficulty, onRestart, onOther, onLesson }: { f: Finish; difficulty: 1 | 2 | 3; nextDifficulty: 1 | 2 | 3; onRestart: () => void; onOther: () => void; onLesson: () => void }) {
  const acc = f.correct + f.wrong ? Math.round((100 * f.correct) / (f.correct + f.wrong)) : 100
  const difficultyAdvice = nextDifficulty > difficulty ? 'Que tal tentar o nível seguinte?' : nextDifficulty < difficulty ? 'Que tal praticar mais neste nível?' : ''
  const secs = Math.round(f.ms / 1000)
  return (
    <section className="animate-rise mt-4 overflow-hidden rounded-3xl border border-white/10 bg-grafite-2 text-center">
      <div className="relative flex justify-center pt-5">
        <span aria-hidden className="lumi-sparkle absolute left-[22%] top-6 text-xl">✨</span>
        <span aria-hidden className="lumi-sparkle absolute right-[22%] top-10 text-lg">⭐</span>
        <img src={MASCOT.reactions[difficulty === 1 ? 'medium' : 'hard']} alt="LUMI comemorando" className="lumi-mascot h-40 w-auto select-none" draggable={false} />
      </div>
      <div className="bg-offwhite px-5 pb-6 pt-5 text-grafite">
        <p className="text-2xl font-bold text-laranja-escuro">🎉 Você conseguiu!</p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
          <Stat label="Acertos" value={`${f.correct}`} />
          <Stat label="Aproveitamento" value={`${acc}%`} />
          <Stat label="Tempo" value={`${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`} />
        </div>
        <p className="mt-3 text-sm text-cinza-texto">{f.moves} {f.moves === 1 ? 'tentativa' : 'tentativas'} · {f.wrong} {f.wrong === 1 ? 'erro' : 'erros'} · {f.hints} {f.hints === 1 ? 'dica' : 'dicas'} · <b className="text-laranja-escuro">+{f.points} pontos</b></p>
        {difficultyAdvice && <p className="mt-2 text-xs text-laranja-escuro font-semibold">💡 {difficultyAdvice}</p>}
        {f.unlocked.length > 0 && (
          <div className="mt-3 rounded-2xl bg-laranja-suave p-3 text-left">
            <p className="font-semibold">🏆 Nova conquista!</p>
            {f.unlocked.map((a) => <p key={a.id}>{a.icon} {a.title}</p>)}
          </div>
        )}
        <div className="mt-5 grid gap-2">
          <button onClick={onRestart} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-laranja font-semibold text-white"><RotateCcw size={18} /> Jogar de novo</button>
          <button onClick={onOther} className="min-h-12 rounded-2xl border-2 border-laranja font-semibold text-laranja-escuro">Outro jogo deste conteúdo</button>
          <button onClick={onLesson} className="min-h-12 rounded-2xl font-semibold text-grafite hover:bg-cinza/60">Voltar à aula</button>
        </div>
      </div>
    </section>
  )
}

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl bg-white p-2 shadow-sm"><p className="text-lg font-bold">{value}</p><p className="text-xs text-cinza-texto">{label}</p></div>
)

/** botões de alternativa no estilo da referência (escuro com borda; selecionado = laranja) */
export function OptionButton({ label, text, state, onClick, disabled }: { label?: string; text: string; state?: 'idle' | 'selected' | 'right' | 'wrong'; onClick: () => void; disabled?: boolean }) {
  const st = state ?? 'idle'
  const cls = {
    idle: 'border-white/15 bg-grafite hover:border-laranja/60',
    selected: 'border-laranja bg-laranja/15 shadow-[0_0_18px_rgba(255,138,31,.25)]',
    right: 'border-sucesso bg-sucesso/20',
    wrong: 'border-erro/70 bg-erro/10',
  }[st]
  return (
    <button onClick={onClick} disabled={disabled} className={`flex min-h-12 w-full items-center gap-3 rounded-2xl border-2 px-3 py-2.5 text-left text-[15px] transition ${cls}`}>
      {label && <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold ${st === 'selected' ? 'bg-laranja text-white' : 'bg-white/10'}`}>{label}</span>}
      <span className="flex-1">{text}</span>
    </button>
  )
}

export const ConfirmButton = ({ children, onClick, disabled }: { children: ReactNode; onClick: () => void; disabled?: boolean }) => (
  <button onClick={onClick} disabled={disabled} className="mt-4 min-h-12 w-full rounded-2xl bg-gradient-to-r from-laranja to-laranja-claro font-semibold text-white shadow-[0_6px_20px_rgba(255,138,31,.35)] transition active:scale-[.98] disabled:opacity-40">
    {children}
  </button>
)
