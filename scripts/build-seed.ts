// Gera supabase/seed.sql a partir da base embutida, aplicando o controle de qualidade.
// Uso: npx tsx scripts/build-seed.ts
// Conteúdo que passa → OFICIAL (published). Conteúdo com erro → EM REVISÃO (in_review).
// O banco guarda a versão anterior de cada conteúdo antes de salvar a nova (nada é apagado).
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { BASE_LESSONS } from '../src/content/index'
import { qualityCheck } from '../src/lib/quality'

const tag = '$lumi$'
const report: string[] = []
let official = 0, review = 0, warns = 0
const lines = BASE_LESSONS.map((l) => {
  const q = qualityCheck(l, BASE_LESSONS)
  const status = q.ok ? 'published' : 'in_review'
  q.ok ? official++ : review++
  warns += q.warnings.length
  if (!q.ok || q.warnings.length) report.push(`${q.ok ? 'OFICIAL ' : 'REVISÃO '} ${l.id}${q.errors.map((e) => `\n   ✗ ${e}`).join('')}${q.warnings.map((w) => `\n   · ${w}`).join('')}`)
  const { status: _s, origin: _o, ...rest } = l
  void _s; void _o
  const json = JSON.stringify({ ...rest, origin: 'base' })
  if (json.includes(tag)) throw new Error(`conteúdo contém ${tag}`)
  return `select public.admin_save_lesson(${tag}${json}${tag}::jsonb, '${status}');`
})
writeFileSync(join(import.meta.dirname, '..', 'supabase', 'seed.sql'), ['-- GERADO por scripts/build-seed.ts — não edite à mão.', ...lines, ''].join('\n'))
writeFileSync(join(import.meta.dirname, '..', 'supabase', 'quality-report.txt'), report.join('\n') + '\n')
console.log(`seed.sql: ${BASE_LESSONS.length} conteúdos · ${official} OFICIAIS · ${review} EM REVISÃO · ${warns} avisos · ${BASE_LESSONS.reduce((a, l) => a + l.questions.length, 0)} exercícios`)
