import { MASCOT, WRONG_REACTION, reactionFor, type MascotReaction } from '../../assets/lumi'
import type { Question } from '../../types'

const COPY: Record<MascotReaction, { title: string; message: string; box: string; label: string }> = {
  easy: { title: 'Parabéns! 🎉', message: 'Muito bem! Você está no caminho certo.', box: 'bg-sucesso-suave text-grafite', label: 'Questão fácil' },
  medium: { title: 'Parabéns! 🎉', message: 'Ótimo trabalho! Você conseguiu!', box: 'bg-[#E3EEFB] text-grafite', label: 'Questão média' },
  hard: { title: 'PARABÉNS! 🎉', message: 'Incrível! Essa era uma questão difícil e você conseguiu!', box: 'bg-erro-suave text-grafite', label: 'Questão difícil' },
}

interface Props {
  isCorrect: boolean
  difficulty: Question['difficulty']
  question?: Question
  explanation?: string
  /** permite forçar uma reação (ex.: pré-visualização no painel) */
  mascotReaction?: MascotReaction
}

/**
 * Feedback de ACERTO com o mascote LUMI. A reação vem da dificuldade cadastrada no exercício.
 * No ERRO: por enquanto não há reação visual do mascote (WRONG_REACTION vazia); a estrutura já está pronta para ela.
 */
export function AnswerFeedback({ isCorrect, difficulty, question, explanation, mascotReaction }: Props) {
  if (!isCorrect) return WRONG_REACTION ? <img src={WRONG_REACTION} alt="LUMI incentivando" className="mx-auto mt-3 h-24 w-auto select-none" draggable={false} /> : null
  const reaction = mascotReaction ?? reactionFor(difficulty)
  const c = COPY[reaction]
  return (
    <div className={`lumi-feedback lumi-feedback-${reaction} mt-5 overflow-hidden rounded-3xl bg-grafite shadow-lg`} role="status" aria-live="polite">
      <div className="relative flex justify-center px-4 pt-4 sm:pt-5">
        <Sparkles reaction={reaction} />
        <img src={MASCOT.reactions[reaction]} alt={`LUMI comemorando: ${c.label.toLowerCase()}`} className="lumi-mascot relative z-[1] h-36 w-auto select-none sm:h-44" draggable={false} />
      </div>
      <div className="relative -mt-2 rounded-t-3xl bg-offwhite px-5 pb-5 pt-6 text-center">
        <span className="absolute -top-5 left-1/2 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full bg-white text-xl shadow" aria-hidden>⭐</span>
        <p className="lumi-feedback-title text-2xl font-bold text-laranja-escuro">{c.title}</p>
        <p className="text-lg font-semibold">Você acertou!</p>
        <p className={`mt-3 rounded-2xl px-4 py-2.5 text-sm font-medium ${c.box}`}>{c.message}</p>
        {(explanation ?? question?.explanation) && <p className="mt-3 text-left text-grafite-3">{explanation ?? question?.explanation}</p>}
      </div>
    </div>
  )
}

/** brilhos discretos: poucos no fácil, mais no médio e no difícil */
function Sparkles({ reaction }: { reaction: MascotReaction }) {
  const n = reaction === 'easy' ? 2 : reaction === 'medium' ? 5 : 7
  const spots = [[12, 18], [84, 22], [20, 62], [78, 60], [50, 8], [8, 40], [92, 44]].slice(0, n)
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {spots.map(([x, y], i) => (
        <span key={i} className="lumi-sparkle absolute text-laranja-claro" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 120}ms` }}>✦</span>
      ))}
    </div>
  )
}
