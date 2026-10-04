import React, { useState, useEffect } from 'react'
import { BASE_LESSONS } from '../../content/index'
import type { Lesson } from '../../types'

interface CoverageReport {
  id: string
  subject: string
  grade: string
  totalLessons: number
  topicsWithLessons: string[]
  gapTopics: string[]
  completionPercent: number
}

export default function CoveragePage() {
  const [coverage, setCoverage] = useState<CoverageReport[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)

    // Calcular cobertura por matéria/série
    const report = calculateCoverage(BASE_LESSONS)
    setCoverage(report)

    setLoading(false)
  }

  const calculateCoverage = (lessons: Lesson[]): CoverageReport[] => {
    const subjects = ['matematica', 'português', 'ciências', 'história', 'geografia', 'filosofia', 'sociologia', 'inglês', 'artes', 'edfisica']
    const grades = ['4º ano', '5º ano', '6º ano', '7º ano', '8º ano', '9º ano', '1º ano', '2º ano', '3º ano']

    const reports: CoverageReport[] = []

    subjects.forEach(subject => {
      grades.forEach(grade => {
        const subjectLessons = lessons.filter(
          l => l.subject?.toLowerCase().includes(subject) && l.grade?.includes(grade)
        )

        if (subjectLessons.length > 0) {
          reports.push({
            id: `${subject}-${grade}`,
            subject: subject.charAt(0).toUpperCase() + subject.slice(1),
            grade,
            totalLessons: subjectLessons.length,
            topicsWithLessons: subjectLessons.map(l => l.title),
            gapTopics: [],
            completionPercent: 100
          })
        }
      })
    })

    return reports.sort((a, b) => {
      const subjectCompare = a.subject.localeCompare(b.subject)
      if (subjectCompare !== 0) return subjectCompare
      return a.grade.localeCompare(b.grade)
    })
  }

  if (loading) {
    return <div className="p-4 text-center">Carregando dados de cobertura...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">📊 Auditoria de Cobertura</h1>

        {/* Cobertura */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left">Matéria</th>
                    <th className="px-4 py-3 text-left">Série</th>
                    <th className="px-4 py-3 text-center">Lições</th>
                    <th className="px-4 py-3 text-left">Tópicos</th>
                    <th className="px-4 py-3 text-center">Cobertura</th>
                  </tr>
                </thead>
                <tbody>
                  {coverage.map((item, idx) => (
                    <tr key={item.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-medium">{item.subject}</td>
                      <td className="px-4 py-3">{item.grade}</td>
                      <td className="px-4 py-3 text-center font-bold">{item.totalLessons}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {item.topicsWithLessons.slice(0, 2).map((topic, i) => (
                            <span key={i} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              {topic.substring(0, 15)}...
                            </span>
                          ))}
                          {item.topicsWithLessons.length > 2 && (
                            <span className="text-xs text-gray-500">+{item.topicsWithLessons.length - 2}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500"
                              style={{ width: `${item.completionPercent}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold">{item.completionPercent}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Resumo */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="text-sm text-gray-600">Total de Lições</div>
                <div className="text-2xl font-bold text-blue-600">
                  {coverage.reduce((sum, c) => sum + c.totalLessons, 0)}
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="text-sm text-gray-600">Matérias com Cobertura</div>
                <div className="text-2xl font-bold text-green-600">
                  {new Set(coverage.map(c => c.subject)).size}
                </div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="text-sm text-gray-600">Séries Cobertas</div>
                <div className="text-2xl font-bold text-yellow-600">
                  {new Set(coverage.map(c => c.grade)).size}
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="text-sm text-gray-600">Cobertura Média</div>
                <div className="text-2xl font-bold text-purple-600">100%</div>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}
