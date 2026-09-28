// Gera supabase/seed.sql a partir da base embutida (src/content/lessons/*.ts).
// Uso: node scripts/build-seed.ts   (Node 24+ roda TypeScript direto)
import { readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const dir = join(import.meta.dirname, '..', 'src', 'content', 'lessons')
const { LESSON_META } = await import(pathToFileURL(join(import.meta.dirname, '..', 'src', 'content', 'meta.ts')).href)
const lessons: Record<string, unknown>[] = []
for (const file of readdirSync(dir).filter((f) => f.endsWith('.ts'))) {
  const mod = await import(pathToFileURL(join(dir, file)).href)
  for (const value of Object.values(mod)) {
    const v = value as Record<string, unknown>
    if (v && typeof v === 'object' && typeof v.id === 'string' && Array.isArray(v.questions)) lessons.push({ ...LESSON_META[v.id as string], ...v, origin: 'base' })
  }
}

const tag = '$lumi$'
const out = [
  '-- GERADO por scripts/build-seed.ts — não edite à mão.',
  '-- Publica a base inicial do LUMI (conteúdo autoral alinhado à BNCC).',
  ...lessons.map((l) => {
    const json = JSON.stringify(l)
    if (json.includes(tag)) throw new Error(`conteúdo contém ${tag}`)
    return `select public.admin_save_lesson(${tag}${json}${tag}::jsonb, 'published');`
  }),
  '',
].join('\n')
writeFileSync(join(import.meta.dirname, '..', 'supabase', 'seed.sql'), out)
console.log(`seed.sql: ${lessons.length} aulas, ${lessons.reduce((a, l) => a + (l.questions as unknown[]).length, 0)} questões`)
