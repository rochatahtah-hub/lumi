import { Atom, BookMarked, BookOpen, Brain, Dna, Dumbbell, Earth, FlaskConical, Landmark, Languages, Palette, PenLine, Pi, TestTubes, Users, type LucideIcon } from 'lucide-react'
import type { SubjectId } from '../types'
import { subjectById } from '../content/subjects'

const ICONS: Record<SubjectId, LucideIcon> = {
  matematica: Pi, portugues: BookOpen, ciencias: FlaskConical, historia: Landmark, geografia: Earth, ingles: Languages, espanhol: Languages, frances: Languages, italiano: Languages,
  fisica: Atom, quimica: TestTubes, biologia: Dna, literatura: BookMarked, filosofia: Brain, sociologia: Users, artes: Palette, redacao: PenLine, edfisica: Dumbbell,
}

/** ícone colorido da matéria dentro de um quadrado suave, como nos cards da referência */
export function SubjectIcon({ id, size = 22, box = 40 }: { id: SubjectId; size?: number; box?: number }) {
  const Icon = ICONS[id]
  const color = subjectById(id)?.color ?? '#FF8A1F'
  return (
    <span className="grid shrink-0 place-items-center rounded-xl" style={{ width: box, height: box, background: `${color}1A`, color }}>
      <Icon size={size} strokeWidth={2.2} />
    </span>
  )
}
