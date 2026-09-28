import type { Lesson, SubjectId } from '../types'
import { SYNONYMS } from '../content/meta'
import { normalize } from './text'

export interface Match { lesson: Lesson; score: number; via: 'nome' | 'pergunta' | 'palavras' }

const STOP = new Set(('a o e de da do das dos em no na nos nas um uma uns umas que se por para pra com sem como qual quais quem onde quando porque por que ' +
  'eu voce me te seu sua seus suas meu minha isso esse essa este esta ser foi era sao esta estao tem ter ha consegue conseguem pode podem ' +
  'quero queria preciso gostaria estudar aprender entender saber explique explica explicar ensina ensine ensinar fale falar sobre aula materia assunto conteudo ' +
  'favor ajuda ajude mim algo coisa coisas acontece acontecem significa funciona serve servem existe existem ao aos as os e ja mais muito bem la aqui ai ' +
  'afinal entao tipo vez sempre nunca ou nem mas tambem so ainda').split(' '))

/** palavra → forma comparável: minúscula, sem acento, com sinônimo aplicado e "radical" curto */
export function stem(word: string): string {
  const w = SYNONYMS[word] ?? word
  return w.length >= 6 ? w.slice(0, 5) : w.replace(/(oes|aes|es|s)$/, '')
}

export function terms(text: string): string[] {
  return normalize(text)
    .replace(/[^a-z0-9º° ]/g, ' ')
    .split(' ')
    .filter((w) => w.length > 1 && !STOP.has(w))
    .map(stem)
}

interface Indexed { lesson: Lesson; names: string[]; questions: string[][]; bag: Map<string, number> }
const cache = new WeakMap<Lesson, Indexed>()

function index(lesson: Lesson): Indexed {
  const hit = cache.get(lesson)
  if (hit) return hit
  const names = [lesson.title, lesson.subtopic ?? '', ...lesson.aliases].filter(Boolean).map(normalize)
  const questions = (lesson.relatedQuestions ?? []).map(terms)
  const bag = new Map<string, number>()
  const add = (text: string, weight: number) => { for (const t of terms(text)) bag.set(t, Math.max(bag.get(t) ?? 0, weight)) }
  add([lesson.title, lesson.subtopic ?? '', ...lesson.aliases].join(' '), 1)
  add((lesson.relatedQuestions ?? []).join(' '), 0.9)
  add([lesson.topic ?? '', lesson.summary, ...lesson.blocks.map((b) => b.title), ...Object.values(lesson.skills)].join(' '), 0.6)
  const out = { lesson, names, questions, bag }
  cache.set(lesson, out)
  return out
}

/**
 * Encontra na base o conteúdo que responde à pergunta do aluno.
 * Não depende da frase exata: compara nomes e sinônimos, perguntas relacionadas
 * e palavras-chave (com radicais e sinônimos), tolerando pequenos erros de digitação.
 */
export function findLessons(query: string, lessons: Lesson[], subject?: SubjectId): Match[] {
  const q = normalize(query).replace(/[?!.,;:]+/g, ' ').replace(/\s+/g, ' ').trim()
  const qTerms = [...new Set(terms(query))]
  if (!q) return []
  const out: Match[] = []
  for (const lesson of lessons) {
    if (subject && lesson.subject !== subject) continue
    const ix = index(lesson)
    let best: Match | null = null
    const consider = (score: number, via: Match['via']) => { if (!best || score > best.score) best = { lesson, score, via } }

    for (const name of ix.names) {
      if (q === name) consider(100, 'nome')
      else if (name.length >= 4 && ` ${q} `.includes(` ${name} `)) consider(85, 'nome')
      else if (q.length >= 4 && name.includes(q)) consider(75, 'nome')
      else if (qTerms.length <= 3 && name.length >= 5 && q.length >= 5 && typo(q, name)) consider(80, 'nome')
    }
    if (qTerms.length) {
      // pergunta parecida com uma das perguntas relacionadas cadastradas
      for (const rq of ix.questions) {
        if (rq.length < 2) continue
        const common = qTerms.filter((t) => rq.includes(t)).length
        const score = Math.round((common / Math.max(qTerms.length, rq.length * 0.75)) * 100)
        if (common >= 2) consider(Math.min(95, score), 'pergunta')
      }
      // cobertura das palavras da pergunta pelo vocabulário do conteúdo
      let covered = 0
      for (const t of qTerms) covered += ix.bag.get(t) ?? fuzzyBag(t, ix.bag)
      const coverage = covered / qTerms.length
      if (coverage > 0) consider(Math.round(coverage * (qTerms.length >= 2 ? 80 : 70)), 'palavras')
    }
    if (best && (best as Match).score >= 30) out.push(best)
  }
  return out.sort((a, b) => b.score - a.score)
}

function fuzzyBag(t: string, bag: Map<string, number>): number {
  if (t.length < 5) return 0
  for (const [k, w] of bag) if (k.length >= 5 && levenshtein(t, k) <= 1) return w * 0.8
  return 0
}

function typo(a: string, b: string): boolean {
  return levenshtein(a, b) <= (Math.max(a.length, b.length) > 8 ? 2 : 1)
}

function levenshtein(a: string, b: string): number {
  if (Math.abs(a.length - b.length) > 3) return 99
  const dp = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0]
    dp[0] = i
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j]
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1))
      prev = tmp
    }
  }
  return dp[b.length]
}
