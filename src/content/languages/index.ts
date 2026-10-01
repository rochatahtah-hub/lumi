// Registro dos idiomas do LUMI. Para adicionar um idioma novo (italiano, alemão…): criar a trilha, o nivelamento
// e as aulas com o SubjectId correspondente e acrescentar uma entrada aqui — o resto do sistema já funciona.
import type { CefrLevel, SubjectId } from '../../types'
import { COURSE, type CourseLevel } from '../english/course'
import { PLACEMENT, type PlacementItem } from '../english/placement'
import { ES_COURSE } from './es-course'
import { FR_COURSE } from './fr-course'
import { IT_COURSE } from './it-course'
import { ES_PLACEMENT, FR_PLACEMENT, IT_PLACEMENT } from './placement'

export type LangId = 'en' | 'es' | 'fr' | 'it'
export const LANG_IDS: LangId[] = ['en', 'es'] // Francês e Italiano: próxima semana após aulas criadas

export interface LanguageDef {
  id: LangId
  /** nome em português */
  name: string
  /** nome no próprio idioma */
  native: string
  flag: string
  subject: SubjectId
  /** voz e reconhecimento de fala do aparelho */
  locale: string
  tagline: string
  course: CourseLevel[]
  placement: PlacementItem[]
  /** níveis em destaque no card */
  focus: CefrLevel[]
  /** textos curtos no idioma, usados nas instruções */
  ui: { chooseAnswer: string; whatMeans: (w: string) => string; hello: string }
}

export const LANGUAGES: Record<LangId, LanguageDef> = {
  en: {
    id: 'en', name: 'Inglês', native: 'English', flag: '🇬🇧', subject: 'ingles', locale: 'en-US', tagline: 'Intermediário e avançado',
    course: COURSE, placement: PLACEMENT, focus: ['B1', 'B2', 'C1'],
    ui: { chooseAnswer: 'Choose the correct answer', whatMeans: (w) => `What does “${w}” mean?`, hello: 'Hello!' },
  },
  es: {
    id: 'es', name: 'Espanhol', native: 'Español', flag: '🇪🇸', subject: 'espanhol', locale: 'es-ES', tagline: 'Do básico ao avançado',
    course: ES_COURSE, placement: ES_PLACEMENT, focus: ['A1', 'A2', 'B1', 'B2', 'C1'],
    ui: { chooseAnswer: 'Elige la respuesta correcta', whatMeans: (w) => `¿Qué significa “${w}”?`, hello: '¡Hola!' },
  },
  fr: {
    id: 'fr', name: 'Francês', native: 'Français', flag: '🇫🇷', subject: 'frances', locale: 'fr-FR', tagline: 'Do básico ao avançado',
    course: FR_COURSE, placement: FR_PLACEMENT, focus: ['A1', 'A2', 'B1', 'B2', 'C1'],
    ui: { chooseAnswer: 'Choisissez la bonne réponse', whatMeans: (w) => `Que signifie « ${w} » ?`, hello: 'Bonjour !' },
  },
  it: {
    id: 'it', name: 'Italiano', native: 'Italiano', flag: '🇮🇹', subject: 'italiano', locale: 'it-IT', tagline: 'Do básico ao avançado',
    course: IT_COURSE, placement: IT_PLACEMENT, focus: ['A1', 'A2', 'B1', 'B2', 'C1'],
    ui: { chooseAnswer: 'Scegli la risposta giusta', whatMeans: (w) => `Che cosa significa «${w}»?`, hello: 'Ciao!' },
  },
}

export const langById = (id: string | undefined): LanguageDef | undefined => (id && id in LANGUAGES ? LANGUAGES[id as LangId] : undefined)
export const langOfSubject = (subject: string | undefined): LanguageDef | undefined => Object.values(LANGUAGES).find((l) => l.subject === subject)
export const isLanguageSubject = (subject: string | undefined) => !!langOfSubject(subject)
export const localeOfSubject = (subject: string | undefined) => langOfSubject(subject)?.locale ?? 'en-US'
