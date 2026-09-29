import type { LevelId, SubjectId } from '../types'

export interface Subject {
  id: SubjectId
  name: string
  emoji: string
  /** cor do ícone no card, como na referência (cada matéria tem seu tom) */
  color: string
  levels: LevelId[]
  suggestions: string[]
}

export const SUBJECTS: Subject[] = [
  { id: 'matematica', name: 'Matemática', emoji: '📐', color: '#3B82F6', levels: ['fund1', 'fund2', 'medio'], suggestions: ['Frações', 'Porcentagem', 'Equação do 2º grau'] },
  { id: 'portugues', name: 'Português', emoji: '📚', color: '#FF8A1F', levels: ['fund1', 'fund2', 'medio'], suggestions: ['Substantivo e adjetivo', 'Gramática', 'Interpretação de texto'] },
  { id: 'ciencias', name: 'Ciências', emoji: '🔬', color: '#22A06B', levels: ['fund1', 'fund2'], suggestions: ['Fotossíntese', 'Sistema Solar', 'Ciclo da água'] },
  { id: 'historia', name: 'História', emoji: '🏛️', color: '#8B5CF6', levels: ['fund1', 'fund2', 'medio'], suggestions: ['Revolução Francesa', 'Brasil Colônia', 'Idade Média'] },
  { id: 'geografia', name: 'Geografia', emoji: '🌎', color: '#0EA5E9', levels: ['fund1', 'fund2', 'medio'], suggestions: ['Coordenadas geográficas', 'Relevo', 'Clima'] },
  { id: 'ingles', name: 'Inglês', emoji: '🇬🇧', color: '#E5484D', levels: ['fund1', 'fund2', 'medio'], suggestions: ['Verb to be', 'Simple present', 'Vocabulário'] },
  { id: 'fisica', name: 'Física', emoji: '⚛️', color: '#6366F1', levels: ['medio'], suggestions: ['Leis de Newton', 'Velocidade média', 'Energia'] },
  { id: 'quimica', name: 'Química', emoji: '🧪', color: '#14B8A6', levels: ['medio'], suggestions: ['Tabela periódica', 'Átomo', 'Ligações químicas'] },
  { id: 'biologia', name: 'Biologia', emoji: '🧬', color: '#10B981', levels: ['medio'], suggestions: ['Célula', 'Genética', 'Ecologia'] },
  { id: 'literatura', name: 'Literatura', emoji: '📖', color: '#F59E0B', levels: ['medio'], suggestions: ['Modernismo', 'Romantismo'] },
  { id: 'filosofia', name: 'Filosofia', emoji: '🤔', color: '#A855F7', levels: ['medio'], suggestions: ['Sócrates', 'Ética'] },
  { id: 'sociologia', name: 'Sociologia', emoji: '👥', color: '#EC4899', levels: ['medio'], suggestions: ['Cidadania', 'Trabalho'] },
  { id: 'artes', name: 'Arte', emoji: '🎨', color: '#F97316', levels: ['fund1', 'fund2', 'medio'], suggestions: ['Cores primárias', 'Arte rupestre'] },
  { id: 'redacao', name: 'Redação', emoji: '✍️', color: '#0F766E', levels: ['fund2', 'medio'], suggestions: ['Estrutura da redação', 'Proposta de intervenção'] },
  { id: 'edfisica', name: 'Educação Física', emoji: '🏃', color: '#DC2626', levels: ['fund1', 'fund2', 'medio'], suggestions: ['Aquecimento', 'Regras do vôlei'] },
]

/** as 9 matérias que aparecem na tela inicial (item 7 do briefing) */
export const HOME_SUBJECTS: SubjectId[] = ['matematica', 'portugues', 'ciencias', 'historia', 'geografia', 'ingles', 'fisica', 'quimica', 'biologia']

export const subjectById = (id: string) => SUBJECTS.find((s) => s.id === id)

export const LEVELS: { id: LevelId; label: string; hint: string }[] = [
  { id: 'fund1', label: '1º ao 5º ano', hint: 'Ensino Fundamental I' },
  { id: 'fund2', label: '6º ao 9º ano', hint: 'Ensino Fundamental II' },
  { id: 'medio', label: 'Ensino Médio', hint: '1ª a 3ª série' },
]

export function levelFromAge(age: number): LevelId {
  if (age <= 10) return 'fund1'
  if (age <= 14) return 'fund2'
  return 'medio'
}
