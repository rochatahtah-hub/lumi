import { BASE_LESSONS } from '../src/content/index'
const ids = process.argv.slice(2)
for (const l of BASE_LESSONS.filter((x) => ids.some((p) => x.id.startsWith(p)))) {
  console.log(`\n## ${l.id} · ${l.title} · levels ${l.levels} · grade ${l.grade} · obj:${l.objective ? 'sim' : 'NÃO'} · eqs ${l.equivalentQuestions?.length ?? 0}`)
  console.log('skills', JSON.stringify(l.skills))
  for (const b of l.blocks as any[]) {
    const v = b.variants ?? {}
    const miss = ['simples', 'exemplo', 'passos', 'compara'].filter((k) => !v[k])
    console.log(`- ${b.id} [${b.skill}] ${b.title} | falta: ${miss.join(',') || '—'}\n  ${String(b.text).slice(0, 260)}`)
  }
}
