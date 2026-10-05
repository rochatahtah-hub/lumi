import type { Block, Lesson, LevelId, Question, SubjectId } from '../types'
import { findLessons } from './matcher'
import { normalize, shuffle } from './text'

const STOP = new Set(('a o e é de da do das dos em no na nos nas um uma uns umas que se por para com sem como mais menos muito muita seu sua seus suas ele ela eles elas isso esse essa este esta são ser foi era também quando onde qual quais sobre entre até pelo pela pelos pelas cada outro outra outros outras mesmo mesma pode podem ainda assim porque então todo toda todos todas grande forma parte tipo você vocês nós têm tem ter há sendo estão está estava fazer feito vez vezes depois antes muitos muitas maior menor apenas desde durante através exemplo').split(' ').map(normalize))

function sentences(text: string): string[] {
  return text.replace(/\s+/g, ' ').split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÂÊÔÃÕÇ0-9"“(])/).map((s) => s.trim()).filter((s) => s.split(' ').length >= 5)
}

function keyTerms(text: string, n = 8): string[] {
  const freq = new Map<string, { word: string; count: number }>()
  for (const raw of text.match(/[A-Za-zÀ-ÿ]{5,}/g) ?? []) {
    const k = normalize(raw)
    if (STOP.has(k)) continue
    const cur = freq.get(k)
    freq.set(k, { word: cur?.word ?? raw.toLowerCase(), count: (cur?.count ?? 0) + 1 })
  }
  return [...freq.values()].sort((a, b) => b.count - a.count || b.word.length - a.word.length).slice(0, n).map((x) => x.word)
}

/** palavras típicas de cada matéria — usadas quando o texto não bate com nenhuma aula da base */
const SUBJECT_HINTS: Record<SubjectId, string[]> = {
  matematica: ['numero', 'equacao', 'fracao', 'soma', 'multiplica', 'divisao', 'calculo', 'porcentagem', 'geometria', 'angulo', 'area', 'funcao', 'grafico'],
  portugues: ['verbo', 'substantivo', 'adjetivo', 'frase', 'oracao', 'sujeito', 'predicado', 'gramatica', 'pronome', 'acentuacao', 'texto', 'narrador'],
  ciencias: ['planta', 'animal', 'corpo', 'agua', 'ar', 'solo', 'energia', 'ambiente', 'sistema', 'orgao', 'vida'],
  historia: ['seculo', 'revolucao', 'guerra', 'imperio', 'rei', 'colonia', 'independencia', 'povos', 'sociedade', 'governo', 'escravidao', 'republica', 'industrial'],
  geografia: ['relevo', 'clima', 'populacao', 'continente', 'territorio', 'mapa', 'regiao', 'cidade', 'latitude', 'rio', 'vegetacao', 'economia'],
  ingles: ['the', 'is', 'are', 'you', 'verb', 'english', 'what', 'my'],
  espanhol: ['el', 'los', 'una', 'usted', 'hola', 'gracias', 'espanol', 'verbo', 'estar', 'tengo', 'muy'],
  frances: ['le', 'les', 'une', 'vous', 'bonjour', 'merci', 'francais', 'est', 'avoir', 'tres', 'nous'],
  italiano: ['il', 'gli', 'una', 'ciao', 'grazie', 'italiano', 'sono', 'essere', 'avere', 'molto', 'perché'],
  fisica: ['forca', 'velocidade', 'aceleracao', 'massa', 'movimento', 'energia', 'newton', 'onda', 'eletrica', 'temperatura'],
  quimica: ['atomo', 'molecula', 'elemento', 'reacao', 'substancia', 'ligacao', 'eletron', 'acido', 'mistura', 'tabela'],
  biologia: ['celula', 'gene', 'dna', 'organismo', 'especie', 'evolucao', 'tecido', 'proteina', 'ecossistema'],
  literatura: ['poema', 'poeta', 'romance', 'autor', 'obra', 'modernismo', 'romantismo', 'verso'],
  filosofia: ['filosofo', 'etica', 'razao', 'socrates', 'platao', 'aristoteles', 'conhecimento'],
  sociologia: ['sociedade', 'cultura', 'trabalho', 'cidadania', 'desigualdade', 'classe', 'social'],
  artes: ['arte', 'pintura', 'cor', 'escultura', 'musica', 'artista', 'desenho'],
  redacao: ['redacao', 'tese', 'argumento', 'argumentos', 'conectivo', 'dissertativo', 'paragrafo', 'intervencao', 'coesao', 'coerencia'],
  edfisica: ['esporte', 'exercicio', 'atividade', 'corpo', 'futebol', 'volei', 'basquete', 'aquecimento', 'alongamento', 'jogo'],
  atualidades: ['climatica', 'aquecimento', 'global', 'politica', 'economia', 'tecnologia', 'sustentabilidade', 'saude', 'social', 'midia', 'atual', 'noticia'],
}

function detectSubject(text: string): SubjectId | undefined {
  const words = normalize(text).split(/[^a-z0-9]+/)
  let best: [SubjectId, number] | undefined
  for (const [subject, hints] of Object.entries(SUBJECT_HINTS) as [SubjectId, string[]][]) {
    const score = words.filter((w) => hints.some((h) => w === h || (h.length >= 5 && w.startsWith(h)))).length
    if (score >= 2 && (!best || score > best[1])) best = [subject, score]
  }
  return best?.[0]
}

/** nome do assunto: expressão com maiúsculas mais repetida ("Revolução Industrial"), senão o termo-chave */
function topicName(text: string, terms: string[]): string {
  const counts = new Map<string, number>()
  for (const m of text.matchAll(/(?:[A-ZÁÉÍÓÚÂÊÔÃÕÇ][a-zà-ÿ]{2,}\s){1,3}[A-ZÁÉÍÓÚÂÊÔÃÕÇ][a-zà-ÿ]{2,}/g)) counts.set(m[0], (counts.get(m[0]) ?? 0) + 1)
  const top = [...counts].sort((a, b) => b[1] - a[1])[0]
  return top ? top[0] : capitalize(terms[0] ?? 'conteúdo')
}

const firstWords = (s: string, n = 6) => { const w = s.split(/\s+/); return w.slice(0, n).join(' ').replace(/[,.;:]$/, '') + (w.length > n ? '…' : '') }

export interface PastedResult { lesson: Lesson; related?: Lesson; detectedSubject?: SubjectId }

/**
 * Estudo de conteúdo colado sem IA: organiza o texto em blocos, resume pelas frases
 * mais centrais e cria questões de completar a partir dos termos-chave do próprio texto.
 * Nada é inventado — tudo sai do material do aluno.
 */
export function studyPastedLocally(text: string, allLessons: Lesson[], level?: LevelId): PastedResult | { error: string } {
  const clean = text.trim()
  const sents = sentences(clean)
  if (clean.length < 120 || sents.length < 3) return { error: 'Cole um trecho um pouco maior (pelo menos 3 frases completas) para eu conseguir organizar o conteúdo.' }

  const related = findLessons(clean.slice(0, 3000), allLessons)[0]?.lesson
  const terms = keyTerms(clean)
  const score = (s: string) => terms.reduce((acc, t) => acc + (normalize(s).includes(normalize(t)) ? 1 : 0), 0)
  const summary = [...sents].sort((a, b) => score(b) - score(a)).slice(0, 3).sort((a, b) => sents.indexOf(a) - sents.indexOf(b))

  const paragraphs = clean.split(/\n\s*\n/).map((p) => p.trim()).filter((p) => p.length > 40)
  const chunks = paragraphs.length >= 2 ? paragraphs : chunk(sents, 3).map((c) => c.join(' '))
  const blocks: Block[] = chunks.slice(0, 6).map((p, i) => {
    return { id: `b${i + 1}`, title: `Parte ${i + 1}: ${firstWords(p)}`, text: p.length > 900 ? p.slice(0, 900) + '…' : p, skill: 'conteudo' }
  })

  const questions: Question[] = []
  const used = new Set<string>()
  for (const term of terms) {
    const re = new RegExp(`(^|[^A-Za-zÀ-ÿ])${escapeRe(term)}(?=[^A-Za-zÀ-ÿ]|$)`, 'i')
    const s = sents.find((x) => !used.has(x) && re.test(x))
    if (!s) continue
    used.add(s)
    const blanked = s.replace(re, '$1______')
    const hints: [string, string, string] = [
      `A palavra começa com "${term[0].toUpperCase()}".`,
      `Ela tem ${term.length} letras e aparece mais de uma vez no seu texto.`,
      `Procure no seu material a frase que começa com: "${s.slice(0, 50)}…"`,
    ]
    const others = terms.filter((t) => t !== term)
    if (questions.length % 2 === 0 && others.length >= 3) {
      const options = shuffle([term, ...others.slice(0, 3)])
      questions.push({ id: `q${questions.length + 1}`, type: 'mc', difficulty: 1, skill: 'conteudo', prompt: `Qual palavra completa a frase?\n\n"${blanked}"`, options, answer: options.indexOf(term), hints, explanation: `A frase original do seu material é: "${s}"` })
    } else {
      questions.push({ id: `q${questions.length + 1}`, type: 'fill', difficulty: 2, skill: 'conteudo', prompt: `Complete com a palavra do seu texto:\n\n"${blanked}"`, answers: [term], hints, explanation: `A frase original do seu material é: "${s}"` })
    }
    if (questions.length >= 8) break
  }
  if (questions.length < 3) return { error: 'Não consegui criar exercícios suficientes com esse trecho. Tente colar um texto mais completo sobre o assunto.' }

  const detected = related?.subject ?? detectSubject(clean)
  const title = `Meu material: ${related?.title ?? topicName(clean, terms)}`
  return {
    related,
    detectedSubject: detected,
    lesson: {
      id: `colado-${Date.now()}`, subject: detected ?? 'portugues', title, levels: level ? [level] : ['fund2'], grade: '', aliases: [],
      summary: summary.join(' '), intro: 'Organizei o seu material em partes curtas. Leia com calma e depois vamos praticar.',
      blocks, questions, skills: { conteudo: 'Conteúdo do seu material' }, review: summary, origin: 'colado',
      sources: [{ title: 'Material enviado pelo aluno', kind: 'autoral' }],
    },
  }
}

const chunk = <T,>(a: T[], n: number) => Array.from({ length: Math.ceil(a.length / n) }, (_, i) => a.slice(i * n, i * n + n))
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
