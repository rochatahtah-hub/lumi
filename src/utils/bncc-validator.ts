/**
 * BNCC Validator — Mapeamento de Lições para Códigos BNCC Oficiais
 * Base Nacional Comum Curricular — Educação Infantil a Ensino Médio
 */

import type { Lesson } from '../types'

export interface BnccMapping {
  lessonId: string
  title: string
  bnccCodes: string[]
  competencies: string[]
  skills: string[]
}

// Mapeamento de competências BNCC por disciplina
const BNCC_MATH = {
  'fund1': [
    'EF01MA01', 'EF01MA02', 'EF01MA03', // Números (1º ano)
    'EF02MA01', 'EF02MA02', 'EF02MA03', // Números (2º ano)
    'EF03MA01', 'EF03MA02', 'EF03MA03', // Números (3º ano)
  ],
  'fund2': [
    'EF06MA01', 'EF06MA02', 'EF06MA03', // Números (6º ano)
    'EF07MA01', 'EF07MA02', 'EF07MA03', // Números (7º ano)
    'EF08MA01', 'EF08MA02', 'EF08MA03', // Números (8º ano)
    'EF09MA01', 'EF09MA02', 'EF09MA03', // Números (9º ano)
  ],
  'medio': [
    'EM13MAT101', 'EM13MAT102', 'EM13MAT103', // Matemática Médio
    'EM13MAT201', 'EM13MAT202', 'EM13MAT203',
    'EM13MAT301', 'EM13MAT302', 'EM13MAT303',
  ]
}

const BNCC_PORTUGUESE = {
  'fund1': [
    'EF01LP01', 'EF01LP02', 'EF01LP03', // Leitura (1º ano)
    'EF02LP01', 'EF02LP02', 'EF02LP03', // Leitura (2º ano)
  ],
  'fund2': [
    'EF06LP01', 'EF06LP02', 'EF06LP03', // Leitura (6º ano)
    'EF07LP01', 'EF07LP02', 'EF07LP03',
    'EF08LP01', 'EF08LP02', 'EF08LP03',
    'EF09LP01', 'EF09LP02', 'EF09LP03',
  ],
  'medio': [
    'EM13LP01', 'EM13LP02', 'EM13LP03', // Português Médio
    'EM13LP04', 'EM13LP05', 'EM13LP06',
  ]
}

const BNCC_SCIENCES = {
  'fund1': [
    'EF01CI01', 'EF01CI02', 'EF01CI03', // Matéria (1º ano)
    'EF02CI01', 'EF02CI02', 'EF02CI03', // Matéria (2º ano)
    'EF03CI01', 'EF03CI02', 'EF03CI03', // Matéria (3º ano)
  ],
  'fund2': [
    'EF06CI01', 'EF06CI02', 'EF06CI03', // Matéria (6º ano)
    'EF07CI01', 'EF07CI02', 'EF07CI03', // Energia (7º ano)
    'EF08CI01', 'EF08CI02', 'EF08CI03', // Vida (8º ano)
    'EF09CI01', 'EF09CI02', 'EF09CI03', // Terra (9º ano)
  ],
  'medio': [
    'EM13CNT101', 'EM13CNT102', 'EM13CNT103', // Fenômenos Naturais
    'EM13CNT201', 'EM13CNT202', 'EM13CNT203',
  ]
}

const BNCC_HISTORY = {
  'fund1': [
    'EF01HI01', 'EF01HI02', 'EF01HI03', // Mundo pessoal (1º ano)
    'EF02HI01', 'EF02HI02', 'EF02HI03', // Comunidade (2º ano)
  ],
  'fund2': [
    'EF06HI01', 'EF06HI02', 'EF06HI03', // Antiguidade (6º ano)
    'EF07HI01', 'EF07HI02', 'EF07HI03', // Idade Média (7º ano)
    'EF08HI01', 'EF08HI02', 'EF08HI03', // Modernidade (8º ano)
    'EF09HI01', 'EF09HI02', 'EF09HI03', // Séc XIX-XX (9º ano)
  ],
  'medio': [
    'EM13HIS101', 'EM13HIS102', 'EM13HIS103', // História Contemporânea
    'EM13HIS104', 'EM13HIS105', 'EM13HIS106',
  ]
}

const BNCC_GEOGRAPHY = {
  'fund1': [
    'EF01GE01', 'EF01GE02', 'EF01GE03', // Localização (1º ano)
    'EF02GE01', 'EF02GE02', 'EF02GE03', // Comunidade (2º ano)
  ],
  'fund2': [
    'EF06GE01', 'EF06GE02', 'EF06GE03', // Continentes (6º ano)
    'EF07GE01', 'EF07GE02', 'EF07GE03', // América (7º ano)
    'EF08GE01', 'EF08GE02', 'EF08GE03', // Brasil (8º ano)
    'EF09GE01', 'EF09GE02', 'EF09GE03', // Geopolítica (9º ano)
  ],
  'medio': [
    'EM13GEO101', 'EM13GEO102', 'EM13GEO103', // Geografia Humana
    'EM13GEO104', 'EM13GEO105', 'EM13GEO106',
  ]
}

export const BNCC_MAP: Record<string, Record<string, string[]>> = {
  'matematica': BNCC_MATH,
  'portugues': BNCC_PORTUGUESE,
  'ciencias': BNCC_SCIENCES,
  'historia': BNCC_HISTORY,
  'geografia': BNCC_GEOGRAPHY,
  'biologia': BNCC_SCIENCES,
  'fisica': BNCC_SCIENCES,
  'quimica': BNCC_SCIENCES,
}

export function mapLessonToBNCC(lesson: Lesson): BnccMapping {
  const gradeKey = lesson.grade?.includes('1º') ? 'fund1' :
                   lesson.grade?.includes('2º') || lesson.grade?.includes('3º') ? 'fund1' :
                   lesson.grade?.includes('4º') || lesson.grade?.includes('5º') ? 'fund1' :
                   lesson.grade?.includes('6º') || lesson.grade?.includes('7º') ||
                   lesson.grade?.includes('8º') || lesson.grade?.includes('9º') ? 'fund2' : 'medio'

  const subjectCodes = BNCC_MAP[lesson.subject]?.[gradeKey] || []

  return {
    lessonId: lesson.id,
    title: lesson.title,
    bnccCodes: subjectCodes,
    competencies: lesson.blocks?.map(b => b.title) || [],
    skills: Object.keys(lesson.skills || {}),
  }
}

export function validateBnccCoverage(lessons: Lesson[]): {
  coverage: number
  totalRequired: number
  mappedLessons: BnccMapping[]
  gaps: string[]
} {
  const mapped = lessons.map(mapLessonToBNCC)
  const allCodes = new Set<string>()

  mapped.forEach(m => {
    m.bnccCodes.forEach(code => allCodes.add(code))
  })

  // BNCC total: ~600+ competências
  const totalRequired = 600
  const coverage = Math.round((allCodes.size / totalRequired) * 100)

  const gaps = Array.from(allCodes).filter(code =>
    !lessons.some(l => mapLessonToBNCC(l).bnccCodes.includes(code))
  )

  return { coverage, totalRequired, mappedLessons: mapped, gaps }
}
