/**
 * ExamPrepPanel — "Tenho Prova" feature
 * Gera plano de preparação para prova em tempo real
 */

import React, { useState } from 'react'
import { generateExamPrepPlan } from '../lib/exam-prep'
import type { ExamPrepPlan } from '../lib/exam-prep'

interface ExamPrepPanelProps {
  onGeneratePlan: (plan: ExamPrepPlan) => void
  isLoading?: boolean
}

export function ExamPrepPanel({ onGeneratePlan, isLoading }: ExamPrepPanelProps) {
  const [step, setStep] = useState<'input' | 'generating' | 'ready'>('input')
  const [formData, setFormData] = useState({
    subject: '',
    content: '',
    examDate: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.subject || !formData.examDate) {
      alert('Preencha matéria e data da prova')
      return
    }

    setStep('generating')

    // Simular geração (em produção, isso vem da API)
    setTimeout(() => {
      const plan = generateExamPrepPlan(
        formData.examDate,
        formData.subject,
        formData.content || `Prova de ${formData.subject}`,
        {
          contentMastery: [],
          diagnostics: [],
          lessons: [],
        }
      )

      onGeneratePlan(plan)
      setStep('ready')
    }, 1500)
  }

  if (step === 'ready') {
    return null // Componente pai vai exibir o plano
  }

  return (
    <div className="space-y-6 p-6">
      {step === 'input' && (
        <>
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">📝 Tenho Prova!</h2>
            <p className="mt-2 text-gray-600">Vamos criar um plano de preparação personalizado</p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Matéria */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">📚 Qual matéria?</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="mt-2 w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none"
              >
                <option value="">Escolha uma matéria...</option>
                <option value="Matemática">Matemática</option>
                <option value="Português">Português</option>
                <option value="Física">Física</option>
                <option value="Química">Química</option>
                <option value="Biologia">Biologia</option>
                <option value="História">História</option>
                <option value="Geografia">Geografia</option>
                <option value="Inglês">Inglês</option>
              </select>
            </div>

            {/* Conteúdo específico */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">🎯 Conteúdo (opcional)</label>
              <input
                type="text"
                placeholder="Ex: Equações do 2º grau, Fotossíntese..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="mt-2 w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none"
              />
            </div>

            {/* Data da prova */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">📅 Quando é a prova?</label>
              <input
                type="datetime-local"
                value={formData.examDate}
                onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                className="mt-2 w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none"
              />
              <p className="mt-1 text-xs text-gray-500">Isso vai determinar o plano</p>
            </div>

            {/* Botão */}
            <button
              type="submit"
              disabled={isLoading || !formData.subject || !formData.examDate}
              className="w-full rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 px-4 py-3 font-semibold text-white transition hover:from-orange-500 hover:to-orange-600 disabled:opacity-50"
            >
              🚀 Gerar Plano
            </button>
          </form>

          {/* Tips */}
          <div className="rounded-lg bg-yellow-50 p-4 border border-yellow-200">
            <p className="text-sm font-semibold text-yellow-900">💡 Dica</p>
            <p className="mt-2 text-sm text-yellow-800">
              Quanto mais específico for sobre o conteúdo, melhor será o plano personalizado.
            </p>
          </div>
        </>
      )}

      {step === 'generating' && (
        <div className="text-center py-12">
          <div className="inline-block">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" />
          </div>
          <p className="mt-4 text-lg font-semibold text-gray-800">Gerando plano personalizado...</p>
          <p className="mt-2 text-sm text-gray-600">Isso só leva alguns segundos</p>
        </div>
      )}
    </div>
  )
}

/**
 * ExamPrepPlanDisplay — Mostra o plano gerado
 */
interface ExamPrepPlanDisplayProps {
  plan: ExamPrepPlan
  onStartPhase?: (phaseNumber: number) => void
}

export function ExamPrepPlanDisplay({ plan, onStartPhase }: ExamPrepPlanDisplayProps) {
  const hoursStr = Math.floor(plan.hoursAvailable)
  const minutesStr = Math.round((plan.hoursAvailable % 1) * 60)

  const urgencyColors = {
    critical: 'bg-red-50 border-red-200',
    high: 'bg-orange-50 border-orange-200',
    medium: 'bg-blue-50 border-blue-200',
    low: 'bg-green-50 border-green-200',
  }

  const urgencyLabels = {
    critical: '🔴 Crítico (< 2h)',
    high: '🟠 Alto (< 6h)',
    medium: '🟡 Médio (< 24h)',
    low: '🟢 Baixo (> 24h)',
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className={`rounded-lg border-2 p-6 ${urgencyColors[plan.urgency]}`}>
        <h2 className="text-2xl font-bold text-gray-800">📋 Seu Plano de Estudo</h2>
        <p className="mt-1 text-sm text-gray-600">{plan.subject} • {plan.content}</p>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs text-gray-600 uppercase">Urgência</p>
            <p className="mt-1 font-bold text-gray-800">{urgencyLabels[plan.urgency]}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 uppercase">Tempo Disponível</p>
            <p className="mt-1 font-bold text-gray-800">
              {hoursStr}h {minutesStr}m
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 uppercase">Taxa de Sucesso Estimada</p>
            <p className="mt-1 text-2xl font-bold text-orange-600">{plan.estimatedSuccessRate}%</p>
          </div>
        </div>
      </div>

      {/* Fases */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800">🎯 Fases de Estudo</h3>

        {plan.phases.map((phase) => (
          <div key={phase.phase} className="rounded-lg border-2 border-gray-200 bg-white p-4 hover:border-orange-300 transition">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
                    {phase.phase}
                  </span>
                  <h4 className="font-semibold text-gray-800">{phase.name}</h4>
                </div>
                <p className="text-sm text-gray-600">{phase.description}</p>

                {/* Atividades */}
                <div className="mt-3 space-y-1 pl-10">
                  {phase.activities.map((activity, i) => (
                    <div key={i} className="text-xs text-gray-600">
                      <span className="font-semibold">{activity.type === 'review' && '📖'}</span>
                      <span className="font-semibold">{activity.type === 'practice' && '✏️'}</span>
                      <span className="font-semibold">{activity.type === 'simulate' && '🧪'}</span>
                      <span className="font-semibold">{activity.type === 'memorize' && '🧠'}</span>
                      <span className="font-semibold">{activity.type === 'rest' && '😴'}</span>
                      <span className="ml-1">{activity.title} ({activity.duration_minutes}m)</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botão */}
              <button
                onClick={() => onStartPhase?.(phase.phase)}
                className="whitespace-nowrap rounded bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Começar →
              </button>
            </div>

            {/* Duração total */}
            <div className="mt-3 border-t border-gray-200 pt-2 text-xs text-gray-600">
              ⏱️ {phase.duration_minutes} minutos
            </div>
          </div>
        ))}
      </div>

      {/* Resumo */}
      <div className="rounded-lg bg-green-50 border border-green-200 p-4">
        <p className="text-sm font-semibold text-green-900">✨ Seu Sucesso!</p>
        <p className="mt-2 text-sm text-green-800">
          Se você seguir este plano, sua chance de sucesso é aproximadamente <strong>{plan.estimatedSuccessRate}%</strong>.
          Boa sorte! 🍀
        </p>
      </div>
    </div>
  )
}
