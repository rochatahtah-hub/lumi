/**
 * DiagnosticPanel — Análise de fraquezas e forças
 * Mostra habilidades dominadas vs habilidades que precisam trabalho
 */

import React from 'react'

interface DiagnosticPanelProps {
  subject?: string
  skillsStrong: string[]
  skillsWeak: string[]
  totalErrors: number
  recommendation: string
  onTakePath?: (skillId: string) => void
  isLoading?: boolean
}

export function DiagnosticPanel({
  subject,
  skillsStrong = [],
  skillsWeak = [],
  totalErrors = 0,
  recommendation = '',
  onTakePath,
  isLoading,
}: DiagnosticPanelProps) {
  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Analisando seu desempenho...</p>
      </div>
    )
  }

  const hasData = skillsStrong.length > 0 || skillsWeak.length > 0

  if (!hasData && totalErrors === 0) {
    return (
      <div className="rounded-lg bg-gray-50 p-6 text-center">
        <p className="text-gray-600">Você ainda não tem histórico de respostas. Comece a praticar! 📝</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Cabeçalho */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">📊 Seu Desempenho</h2>
        {subject && <p className="mt-1 text-sm text-gray-500 capitalize">em {subject}</p>}
      </div>

      {/* Recomendação personalizadas */}
      {recommendation && (
        <div className="rounded-lg bg-blue-50 border-l-4 border-blue-500 p-4">
          <p className="text-sm font-semibold text-blue-900">💡 Recomendação</p>
          <p className="mt-2 text-sm text-blue-800">{recommendation}</p>
        </div>
      )}

      {/* Grid com forças e fraquezas */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Forças */}
        <div className="rounded-lg bg-green-50 p-4 border border-green-200">
          <h3 className="mb-4 flex items-center gap-2 font-semibold text-green-900">
            <span className="text-xl">✅</span> Você está indo bem em
          </h3>

          {skillsStrong.length > 0 ? (
            <ul className="space-y-2">
              {skillsStrong.map((skill) => (
                <li key={skill} className="flex items-center gap-2 text-sm text-green-700">
                  <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                  {skill}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-green-600">Pratique mais para descobrir suas forças! 💪</p>
          )}
        </div>

        {/* Fraquezas */}
        <div className="rounded-lg bg-orange-50 p-4 border border-orange-200">
          <h3 className="mb-4 flex items-center gap-2 font-semibold text-orange-900">
            <span className="text-xl">🔄</span> Vamos revisar
          </h3>

          {skillsWeak.length > 0 ? (
            <ul className="space-y-2">
              {skillsWeak.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center justify-between gap-2 text-sm text-orange-700 hover:bg-orange-100 rounded p-2 transition cursor-pointer"
                  onClick={() => onTakePath?.(skill)}
                >
                  <span className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-orange-500" />
                    {skill}
                  </span>
                  <span className="text-xs">→</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-orange-600">Nenhuma habilidade fraca detectada! Parabéns 🎉</p>
          )}
        </div>
      </div>

      {/* Estatísticas gerais */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-gray-100 p-4">
          <p className="text-xs font-semibold text-gray-600 uppercase">Erros Detectados</p>
          <p className="mt-2 text-2xl font-bold text-gray-800">{totalErrors}</p>
          <p className="mt-1 text-xs text-gray-500">últimos 7 dias</p>
        </div>

        <div className="rounded-lg bg-gray-100 p-4">
          <p className="text-xs font-semibold text-gray-600 uppercase">Forças</p>
          <p className="mt-2 text-2xl font-bold text-green-600">{skillsStrong.length}</p>
          <p className="mt-1 text-xs text-gray-500">habilidades</p>
        </div>

        <div className="rounded-lg bg-gray-100 p-4">
          <p className="text-xs font-semibold text-gray-600 uppercase">Pontos de Atenção</p>
          <p className="mt-2 text-2xl font-bold text-orange-600">{skillsWeak.length}</p>
          <p className="mt-1 text-xs text-gray-500">habilidades</p>
        </div>
      </div>

      {/* Dica */}
      {skillsWeak.length > 0 && (
        <div className="rounded-lg bg-yellow-50 p-4 border border-yellow-200">
          <p className="text-sm font-semibold text-yellow-900">💡 Dica</p>
          <p className="mt-2 text-sm text-yellow-800">
            Ao revisar conteúdos, o LUMI cria novas perguntas sobre o mesmo conceito para verificar se você
            realmente aprendeu, e não apenas memorizou.
          </p>
        </div>
      )}
    </div>
  )
}
