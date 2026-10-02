/** minúsculas, sem acento, sem pontuação extra — para comparar respostas e buscar assuntos */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’`´]/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

/** normaliza respostas curtas: aceita "3/4", " 3 / 4 ", "Clorofila.", "6 N" */
export function normalizeAnswer(s: string): string {
  return normalize(s).replace(/\s*\/\s*/g, '/').replace(/,/g, '.').replace(/[.!?;:]+$/, '').replace(/^(o|a|os|as) /, '').trim()
}

const STOP = new Set(['de', 'da', 'do', 'das', 'dos', 'e', 'o', 'a', 'os', 'as', 'um', 'uma', 'em', 'no', 'na', 'quero', 'estudar', 'preciso', 'me', 'explique', 'explica', 'sobre', 'aprender', 'aula', 'materia', 'como', 'que', 'eh', 'e', 'o que', 'para', 'pra', 'por', 'favor', 'entender', 'ensina', 'ensine'])

export function keywords(s: string): string[] {
  return normalize(s).replace(/[^a-z0-9º° ]/g, ' ').split(' ').filter((w) => w.length > 1 && !STOP.has(w))
}

export function shuffle<T>(arr: T[], seed = Math.random()): T[] {
  const a = [...arr]
  let s = Math.floor(seed * 2 ** 31) || 1
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) % 2 ** 31
    const j = s % (i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const todayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
