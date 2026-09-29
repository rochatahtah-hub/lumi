import { useEffect, useRef, useState } from 'react'
import { MASCOT } from '../../assets/lumi'

/** ritmo por tamanho de tela: travessia lenta o bastante para ser percebida, sem arrastar */
const walkMs = () => (window.innerWidth < 640 ? 9000 : window.innerWidth < 1024 ? 9500 : 10000)
const PAUSE_MS = 3000
/** trecho da travessia em que ele desacelera e acena (igual aos pontos dos keyframes no CSS) */
const WAVE_FROM = 0.4
const WAVE_TO = 0.58

/**
 * O LUMI passeando pela Home, POR TRÁS dos cards (camada entre o fundo e o conteúdo).
 * Uma única instância · só transform/opacity · sem cliques (pointer-events: none).
 * Duas poses oficiais: caminhando (mão erguida) e o tchau — com transição suave entre elas.
 * Com "reduzir movimento" ativado, não aparece.
 */
export function MascotWalker() {
  const [run, setRun] = useState<{ dir: 1 | -1; key: number; ms: number } | null>(null)
  const [waving, setWaving] = useState(false)
  const timers = useRef<number[]>([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let dir: 1 | -1 = 1
    let key = 0
    const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms))
    const cycle = () => {
      if (document.hidden) return later(cycle, PAUSE_MS) // aba escondida: não gasta nada
      const ms = walkMs()
      setRun({ dir, key: ++key, ms })
      later(() => setWaving(true), ms * WAVE_FROM)
      later(() => setWaving(false), ms * WAVE_TO)
      later(() => { setRun(null); dir = dir === 1 ? -1 : 1; later(cycle, PAUSE_MS) }, ms)
    }
    later(cycle, 1200) // entra pouco depois de abrir a tela
    return () => { timers.current.forEach(clearTimeout); timers.current = [] }
  }, [])

  if (!run) return null
  return (
    <div aria-hidden className="lumi-walker-lane pointer-events-none absolute z-0 overflow-hidden">
      <div key={run.key} className={`lumi-walker ${run.dir === 1 ? 'lumi-walk-ltr' : 'lumi-walk-rtl'}`} style={{ animationDuration: `${run.ms}ms` }}>
        <span className={`lumi-walker-shadow ${waving ? 'is-still' : ''}`} />
        <div className={`lumi-walker-bob ${waving ? 'is-still' : ''}`}>
          <div className="relative h-full" style={{ transform: run.dir === 1 ? undefined : 'scaleX(-1)' }}>
            <img src={MASCOT.home.walk} alt="" draggable={false} className={`lumi-walker-img ${waving ? 'opacity-0' : 'opacity-100'}`} />
            <img src={MASCOT.home.wave} alt="" draggable={false} className={`lumi-walker-img absolute inset-0 ${waving ? 'opacity-100 lumi-wave' : 'opacity-0'}`} />
          </div>
        </div>
      </div>
    </div>
  )
}
