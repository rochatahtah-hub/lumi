import { useMemo } from 'react'
import { BASE_LESSONS } from '../content'

interface SubjectStats {
  subject: string
  total: number
  byGrade: Record<string, number>
  coverage: number
}

export function CoverageDashboard() {
  const stats = useMemo(() => {
    const grouped: Record<string, SubjectStats> = {}

    BASE_LESSONS.forEach((lesson) => {
      if (!grouped[lesson.subject]) {
        grouped[lesson.subject] = {
          subject: lesson.subject,
          total: 0,
          byGrade: {},
          coverage: 0,
        }
      }

      const stats = grouped[lesson.subject]
      stats.total++
      stats.byGrade[lesson.grade] = (stats.byGrade[lesson.grade] || 0) + 1
    })

    // Calculate coverage percentages
    const targetAulas = {
      matematica: 80,
      portugues: 70,
      ciencias: 60,
      historia: 40,
      geografia: 30,
      biologia: 25,
      fisica: 20,
      quimica: 20,
      literatura: 20,
      filosofia: 15,
      sociologia: 15,
      artes: 15,
      redacao: 15,
      edfisica: 15,
      ingles: 50,
      total: 485,
    } as Record<string, number>

    Object.values(grouped).forEach((s) => {
      const target = targetAulas[s.subject] || 20
      s.coverage = Math.round((s.total / target) * 100)
    })

    return grouped
  }, [])

  const totalLessons = BASE_LESSONS.length
  const targetTotal = 485
  const totalCoverage = Math.round((totalLessons / targetTotal) * 100)

  const subjects = Object.values(stats).sort((a, b) => b.total - a.total)
  const gaps = subjects.filter((s) => s.coverage < 80)

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">📊 Dashboard de Cobertura LUMI</h1>
      <p className="text-slate-600 mb-6">Análise completa da base educacional</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500 shadow">
          <div className="text-sm font-semibold text-slate-600">Total de Aulas</div>
          <div className="text-3xl font-bold text-blue-600">{totalLessons}</div>
          <div className="text-xs text-slate-500">Meta: {targetTotal}</div>
        </div>

        <div className="bg-white rounded-lg p-4 border-l-4 border-green-500 shadow">
          <div className="text-sm font-semibold text-slate-600">Cobertura Geral</div>
          <div className="text-3xl font-bold text-green-600">{totalCoverage}%</div>
          <div className="text-xs text-slate-500">{totalLessons}/{targetTotal}</div>
        </div>

        <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500 shadow">
          <div className="text-sm font-semibold text-slate-600">Disciplinas</div>
          <div className="text-3xl font-bold text-purple-600">{subjects.length}</div>
          <div className="text-xs text-slate-500">Áreas de conhecimento</div>
        </div>

        <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500 shadow">
          <div className="text-sm font-semibold text-slate-600">Gaps Identificados</div>
          <div className="text-3xl font-bold text-orange-600">{gaps.length}</div>
          <div className="text-xs text-slate-500">Áreas &lt;80% cobertura</div>
        </div>
      </div>

      {/* Coverage by Subject */}
      <div className="bg-white rounded-lg p-6 shadow mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Cobertura por Disciplina</h2>
        <div className="space-y-3">
          {subjects.map((s) => (
            <div key={s.subject}>
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-slate-700 capitalize">{s.subject}</span>
                <span className="text-sm font-bold text-slate-600">{s.total} aulas ({s.coverage}%)</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    s.coverage >= 100 ? 'bg-green-500' : s.coverage >= 80 ? 'bg-blue-500' : 'bg-orange-500'
                  }`}
                  style={{ width: `${Math.min(s.coverage, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gaps Alert */}
      {gaps.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-orange-900 mb-3">⚠️ Áreas com cobertura baixa (&lt;80%)</h3>
          <div className="space-y-2">
            {gaps.map((s) => (
              <div key={s.subject} className="flex items-center justify-between bg-white p-3 rounded border border-orange-100">
                <span className="capitalize font-semibold text-slate-700">{s.subject}</span>
                <span className="text-orange-600 font-bold">{s.coverage}% — Faltam {Math.ceil((100 - s.coverage) / 100 * 20)} aulas</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Breakdown by Grade */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Distribuição por Nível</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { level: 'Fund I (1º-5º)', key: 'fund1' },
            { level: 'Fund II (6º-9º)', key: 'fund2' },
            { level: 'Médio (1º-3º)', key: 'medio' },
          ].map(({ level, key }) => {
            const count = BASE_LESSONS.filter((l) => l.levels?.includes(key as any)).length
            return (
              <div key={key} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded p-4 border border-slate-200">
                <div className="font-semibold text-slate-700 mb-2">{level}</div>
                <div className="text-2xl font-bold text-slate-900">{count}</div>
                <div className="text-xs text-slate-500 mt-1">aulas</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded text-sm text-slate-700">
        <p>
          <strong>Recomendação:</strong> Foco nas disciplinas com &lt;80% de cobertura. Meta: 485 aulas para BNCC completo + ENEM.
        </p>
      </div>
    </div>
  )
}
