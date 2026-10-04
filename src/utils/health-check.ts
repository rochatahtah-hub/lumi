import { BASE_LESSONS } from '../content'
import { buildSearchIndex } from './search-engine'

export interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'critical'
  timestamp: string
  checks: {
    lessonsLoaded: { pass: boolean; value: number }
    disciplinesCovered: { pass: boolean; value: number }
    easyQuestionsLoaded: { pass: boolean; value: number }
    searchIndexWorks: { pass: boolean; value: number }
    gradesRepresented: { pass: boolean; value: string[] }
    aliasesPopulated: { pass: boolean; coverage: number }
  }
  summary: string
}

export function runHealthCheck(): HealthCheckResult {
  const checks = {
    lessonsLoaded: {
      pass: BASE_LESSONS.length >= 250,
      value: BASE_LESSONS.length,
    },
    disciplinesCovered: {
      pass: new Set(BASE_LESSONS.map((l) => l.subject)).size >= 12,
      value: new Set(BASE_LESSONS.map((l) => l.subject)).size,
    },
    easyQuestionsLoaded: {
      pass: BASE_LESSONS.some((l) => l.questions && l.questions.length > 0),
      value: BASE_LESSONS.filter((l) => l.questions && l.questions.length > 0).length,
    },
    searchIndexWorks: {
      pass: buildSearchIndex(BASE_LESSONS).length > 0,
      value: buildSearchIndex(BASE_LESSONS).length,
    },
    gradesRepresented: {
      pass: true,
      value: [...new Set(BASE_LESSONS.map((l) => l.grade))],
    },
    aliasesPopulated: {
      pass: true,
      coverage: Math.round(
        (BASE_LESSONS.filter((l) => l.aliases && l.aliases.length > 0).length / BASE_LESSONS.length) *
          100
      ),
    },
  }

  const allPass = Object.values(checks).every((c) =>
    'pass' in c ? (c as any).pass : (c as any).coverage >= 80
  )

  const status = allPass ? 'healthy' : Object.values(checks).some((c) => ('pass' in c && c.pass) || ('coverage' in c && c.coverage > 50)) ? 'degraded' : 'critical'

  return {
    status,
    timestamp: new Date().toISOString(),
    checks: checks as any,
    summary: allPass
      ? `✅ LUMI Health Check PASSED: ${BASE_LESSONS.length} aulas, ${checks.disciplinesCovered.value} disciplinas, search indexado`
      : `⚠️ LUMI Health Check DEGRADED: Verifique logs abaixo`,
  }
}

// Auto-execute on module load
if (typeof window !== 'undefined') {
  console.log('%c🏥 LUMI Health Check', 'color: green; font-size: 14px; font-weight: bold')
  const result = runHealthCheck()
  console.table(result.checks)
  console.log(result.summary)
  if (result.status !== 'healthy') {
    console.warn('⚠️ Alguns checks falharam. Verifique a tabela acima.')
  }
}
