// Gera supabase/seed.sql a partir da base embutida, aplicando o controle de qualidade.
// Uso: npx tsx scripts/build-seed.ts
// Conteúdo que passa → OFICIAL (published). Conteúdo com erro → EM REVISÃO (in_review).
// O banco guarda a versão anterior de cada conteúdo antes de salvar a nova (nada é apagado).
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { BASE_LESSONS } from '../src/content/index'
import { qualityCheck } from '../src/lib/quality'
import { COURSE } from '../src/content/english/course'

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
// estrutura do Curso de Inglês (o mesmo arquivo que o app usa: src/content/english/course.ts) — antes das aulas
const q = (x: string) => `'${x.replace(/'/g, "''")}'`
const course: string[] = []
COURSE.forEach((lv, li) => {
  course.push(`insert into public.english_levels (id, title, description, can_do, sort) values (${q(lv.id)}, ${q(lv.title)}, ${q(lv.description)}, ${q(lv.can)}, ${li + 1}) on conflict (id) do update set title = excluded.title, description = excluded.description, can_do = excluded.can_do, sort = excluded.sort;`)
  lv.sections.forEach((sec, si) => {
    course.push(`insert into public.english_sections (id, level_id, title, sort) values (${q(sec.id)}, ${q(lv.id)}, ${q(sec.title)}, ${si + 1}) on conflict (id) do update set title = excluded.title, sort = excluded.sort;`)
    sec.units.forEach((u, ui) => {
      course.push(`insert into public.english_units (id, section_id, level_id, title, subtitle, objective, sort) values (${q(u.id)}, ${q(sec.id)}, ${q(lv.id)}, ${q(u.title)}, ${q(u.subtitle)}, ${q(u.objective)}, ${ui + 1}) on conflict (id) do update set title = excluded.title, subtitle = excluded.subtitle, objective = excluded.objective, sort = excluded.sort;`)
      course.push(`delete from public.english_unit_lessons where unit_id = ${q(u.id)};`)
      u.lessons.forEach((l, k) => course.push(`insert into public.english_unit_lessons (unit_id, position, lesson_id, title) values (${q(u.id)}, ${k + 1}, ${q(l.id)}, ${q(l.title)});`))
    })
  })
})
writeFileSync(join(import.meta.dirname, '..', 'supabase', 'seed.sql'), ['-- GERADO por scripts/build-seed.ts — não edite à mão.', ...course, ...lines, ''].join('\n'))
writeFileSync(join(import.meta.dirname, '..', 'supabase', 'quality-report.txt'), report.join('\n') + '\n')
console.log(`seed.sql: ${BASE_LESSONS.length} conteúdos · ${official} OFICIAIS · ${review} EM REVISÃO · ${warns} avisos · ${BASE_LESSONS.reduce((a, l) => a + l.questions.length, 0)} exercícios`)
