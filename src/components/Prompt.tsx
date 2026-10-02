import { useEffect, useState } from 'react'
import { MASCOT } from '../assets/lumi'
import { getTodayMotivation, getGreeting } from '../lib/motivations'

interface PromptProps {
  preferredName?: string
}

export function Prompt({ preferredName = 'visitante' }: PromptProps) {
  const [greeting, setGreeting] = useState<string>('')
  const [period, setPeriod] = useState<'morning' | 'afternoon' | 'evening'>('morning')
  const [motivation, setMotivation] = useState<string>('')

  useEffect(() => {
    const g = getGreeting(preferredName)
    setGreeting(g.greeting)
    setPeriod(g.period)
    const m = getTodayMotivation()
    setMotivation(m.text)
  }, [preferredName])

  // Escolher imagem do mascote conforme período
  const mascotImage = period === 'morning' ? MASCOT.peek.wave : period === 'afternoon' ? MASCOT.peek.smile : MASCOT.peek.look

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-grafite to-grafite-2 p-5 text-offwhite">
      {/* Detalhe decorativo */}
      <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-laranja/20 blur-2xl" />

      <div className="relative z-10 flex items-start gap-4">
        {/* Mascote com expressão por período */}
        <img src={mascotImage} alt="" aria-hidden className="h-24 w-auto shrink-0 select-none" draggable={false} />

        {/* Saudação + motivação */}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold">{greeting}</h1>
          <p className="mt-3 text-sm leading-relaxed text-offwhite/85">✨ {motivation}</p>
        </div>
      </div>
    </section>
  )
}
