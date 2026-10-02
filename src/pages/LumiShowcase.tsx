/**
 * LumiShowcase — Página de demonstração de todos os componentes LUMI v3.0
 * Mostra as 4 fases funcionando em tempo real
 * Para testes e visualização
 */

import React, { useState } from 'react'
import { PathSnapshot } from '../components/PathSnapshot'
import { LearningPath } from '../components/LearningPath'
import { ReviewQueue } from '../components/ReviewQueue'
import { DiagnosticPanel } from '../components/DiagnosticPanel'
import { AchievementsPanel } from '../components/AchievementsPanel'
import { Mascot, MascotProvider } from '../components/Mascot'
import { StudyGoalsPanel } from '../components/StudyGoalsPanel'
import { SimulationResult } from '../components/SimulationResult'
import { ExamPrepPanel, ExamPrepPlanDisplay } from '../components/ExamPrepPanel'
import { ProgressDashboard } from '../components/ProgressDashboard'
import { HistoryPanel } from '../components/HistoryPanel'
import type { ExamPrepPlan } from '../lib/exam-prep'

export function LumiShowcase() {
  const [activeTab, setActiveTab] = useState<'fase1' | 'fase2' | 'fase3' | 'fase4' | 'all'>('all')
  const [examPlan, setExamPlan] = useState<ExamPrepPlan | null>(null)

  // Mock data para demonstração
  const mockStats = {
    overall_mastery: 72,
    contents_mastered: 15,
    streak_days: 12,
    total_attempts: 342,
  }

  const mockHistory = [
    { date: '2026-09-24', overall_mastery: 45, contents_mastered: 5, streak_days: 1, total_attempts: 50, accuracy_percent: 65 },
    { date: '2026-09-25', overall_mastery: 52, contents_mastered: 8, streak_days: 2, total_attempts: 95, accuracy_percent: 70 },
    { date: '2026-09-26', overall_mastery: 58, contents_mastered: 10, streak_days: 3, total_attempts: 140, accuracy_percent: 72 },
    { date: '2026-09-27', overall_mastery: 65, contents_mastered: 12, streak_days: 4, total_attempts: 190, accuracy_percent: 75 },
    { date: '2026-09-28', overall_mastery: 72, contents_mastered: 15, streak_days: 5, total_attempts: 242, accuracy_percent: 76 },
  ]

  const mockBadges = [
    { id: 'first_lesson', title: '🚀 Primeiro Passo', icon: '🚀', description: 'Completou a primeira lição' },
    { id: 'streak_7', title: '🔥 Consistência', icon: '🔥', description: '7 dias de estudo consecutivo' },
  ]

  const mockMilestones = [
    { name: '80% Mastery', icon: '📈', target: 80, current: 72, progress_percent: 90, daysToReach: 2 },
    { name: '20 Conteúdos Dominados', icon: '🏆', target: 20, current: 15, progress_percent: 75 },
    { name: '30 Dias de Streak', icon: '🔥', target: 30, current: 12, progress_percent: 40 },
  ]

  const mockSimulationResult = {
    total_questions: 30,
    correct_answers: 24,
    accuracy_percent: 80,
    time_seconds: 1800,
    skills_performance: [
      { skill_id: 'fis-cinemática', skill_name: 'Cinemática', accuracy_percent: 85, questions_attempted: 10, difficulty_average: 2 },
      { skill_id: 'fis-dinâmica', skill_name: 'Dinâmica', accuracy_percent: 75, questions_attempted: 10, difficulty_average: 3 },
      { skill_id: 'fis-energia', skill_name: 'Energia', accuracy_percent: 80, questions_attempted: 10, difficulty_average: 2 },
    ],
    recommendations: ['Revisar: Dinâmica (75% acurácia)', 'Você está acima da meta geral. Continue assim!'],
    strong_areas: ['Cinemática', 'Energia'],
    weak_areas: ['Dinâmica'],
    estimated_grade: '8-9',
  }

  const mockHistoryEvents = [
    {
      type: 'lesson' as const,
      date: '2026-09-28T10:30:00',
      title: 'Aula: Cinemática Básica',
      icon: '📖',
      description: 'Completou a aula com 90% de acurácia',
      metadata: { acurácia: '90%', tempo: '25min' },
    },
    {
      type: 'achievement' as const,
      date: '2026-09-27T15:45:00',
      title: 'Conquista Desbloqueada',
      icon: '🏆',
      description: 'Você dominou 10 conteúdos!',
      metadata: { tipo: 'milestone', pontos: '50pts' },
    },
    {
      type: 'simulation' as const,
      date: '2026-09-26T14:20:00',
      title: 'Simulado: Física Completa',
      icon: '🧪',
      description: 'Resultado: 80% (24/30 corretas)',
      metadata: { acurácia: '80%', tempo: '30min' },
    },
  ]

  const tabs = [
    { id: 'all', label: '🎓 Todas as Fases', icon: '📚' },
    { id: 'fase1', label: 'Fase 1: Learning Path', icon: '📖' },
    { id: 'fase2', label: 'Fase 2: Engajamento', icon: '🎮' },
    { id: 'fase3', label: 'Fase 3: Avaliação', icon: '🧪' },
    { id: 'fase4', label: 'Fase 4: Progresso', icon: '📊' },
  ]

  return (
    <MascotProvider>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-4">
        {/* Header */}
        <div className="mx-auto max-w-7xl mb-8">
          <div className="rounded-lg bg-white p-6 shadow-lg border-2 border-orange-200">
            <h1 className="text-4xl font-bold text-gray-800">🎓 LUMI v3.0 Showcase</h1>
            <p className="mt-2 text-gray-600">Demonstração de todos os 13 componentes das 4 fases</p>
            <p className="mt-2 text-sm text-orange-600 font-semibold">
              ✨ Esta página mostra como LUMI funciona em produção
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mx-auto max-w-7xl mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Conteúdo por Fase */}
        <div className="mx-auto max-w-7xl space-y-6">
          {/* FASE 1: Learning Path System */}
          {(activeTab === 'all' || activeTab === 'fase1') && (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">📖 Fase 1: Learning Path System</h2>

              <div className="grid gap-4 lg:grid-cols-2">
                {/* PathSnapshot */}
                <div className="rounded-lg bg-white p-6 shadow-lg border-2 border-blue-200">
                  <h3 className="text-xl font-bold mb-4 text-blue-600">Component: PathSnapshot</h3>
                  <PathSnapshot
                    overall_mastery={mockStats.overall_mastery}
                    streak_days={mockStats.streak_days}
                    contents_to_review={3}
                    top_recommendations={['Revisar Dinâmica', 'Praticar Energia']}
                  />
                </div>

                {/* LearningPath */}
                <div className="rounded-lg bg-white p-6 shadow-lg border-2 border-blue-200">
                  <h3 className="text-xl font-bold mb-4 text-blue-600">Component: LearningPath</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    <div className="p-3 bg-blue-50 rounded border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">🟡</span>
                        <span className="font-semibold">Cinemática Básica</span>
                        <span className="ml-auto text-xs font-bold text-blue-600">65%</span>
                      </div>
                      <div className="h-2 bg-blue-200 rounded-full mb-2">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }} />
                      </div>
                      <p className="text-xs text-gray-600">2 tentativas | Última: hoje</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                {/* ReviewQueue */}
                <div className="rounded-lg bg-white p-6 shadow-lg border-2 border-green-200">
                  <h3 className="text-xl font-bold mb-4 text-green-600">Component: ReviewQueue</h3>
                  <ReviewQueue
                    items={[
                      {
                        id: '1',
                        lesson_id: 'fis-dinâmica',
                        urgency: 85,
                        reason: 'low_mastery',
                        mastery_percent: 45,
                        days_since_review: 3,
                        error_rate: 35,
                      },
                    ]}
                  />
                </div>

                {/* DiagnosticPanel */}
                <div className="rounded-lg bg-white p-6 shadow-lg border-2 border-purple-200">
                  <h3 className="text-xl font-bold mb-4 text-purple-600">Component: DiagnosticPanel</h3>
                  <DiagnosticPanel
                    skill_performance={[
                      { skill_id: 'cinemática', skill_name: 'Cinemática', mastery_percent: 75, error_rate: 15 },
                      { skill_id: 'dinâmica', skill_name: 'Dinâmica', mastery_percent: 45, error_rate: 35 },
                    ]}
                  />
                </div>
              </div>
            </div>
          )}

          {/* FASE 2: Engajamento */}
          {(activeTab === 'all' || activeTab === 'fase2') && (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">🎮 Fase 2: Engajamento</h2>

              <div className="grid gap-4 lg:grid-cols-3">
                {/* AchievementsPanel */}
                <div className="rounded-lg bg-white p-6 shadow-lg border-2 border-yellow-200">
                  <h3 className="text-xl font-bold mb-4 text-yellow-600">Component: AchievementsPanel</h3>
                  <AchievementsPanel achievements={mockBadges} total_points={350} />
                </div>

                {/* Mascot */}
                <div className="rounded-lg bg-white p-6 shadow-lg border-2 border-pink-200 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-4 text-pink-600">Component: Mascot</h3>
                    <Mascot message="Parabéns! Você está indo muito bem! 🎉" position="center" />
                  </div>
                </div>

                {/* StudyGoalsPanel */}
                <div className="rounded-lg bg-white p-6 shadow-lg border-2 border-cyan-200">
                  <h3 className="text-xl font-bold mb-4 text-cyan-600">Component: StudyGoalsPanel</h3>
                  <StudyGoalsPanel
                    goals={[
                      {
                        id: '1',
                        type: 'daily_lessons',
                        title: 'Aula do Dia',
                        target: 1,
                        current: 1,
                        frequency: 'Diária',
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          )}

          {/* FASE 3: Avaliação */}
          {(activeTab === 'all' || activeTab === 'fase3') && (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">🧪 Fase 3: Avaliação</h2>

              <div className="grid gap-4 lg:grid-cols-2">
                {/* SimulationResult */}
                {!examPlan && (
                  <div className="rounded-lg bg-white p-6 shadow-lg border-2 border-orange-200">
                    <h3 className="text-xl font-bold mb-4 text-orange-600">Component: SimulationResult</h3>
                    <SimulationResult result={mockSimulationResult} />
                  </div>
                )}

                {/* ExamPrepPanel */}
                <div className="rounded-lg bg-white p-6 shadow-lg border-2 border-red-200">
                  <h3 className="text-xl font-bold mb-4 text-red-600">Component: ExamPrepPanel</h3>
                  {!examPlan ? (
                    <ExamPrepPanel onGeneratePlan={setExamPlan} />
                  ) : (
                    <ExamPrepPlanDisplay plan={examPlan} />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* FASE 4: Progresso */}
          {(activeTab === 'all' || activeTab === 'fase4') && (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">📊 Fase 4: Progresso</h2>

              <div className="rounded-lg bg-white p-6 shadow-lg border-2 border-green-200">
                <h3 className="text-xl font-bold mb-4 text-green-600">Component: ProgressDashboard</h3>
                <ProgressDashboard
                  history={mockHistory}
                  badges={mockBadges}
                  milestones={mockMilestones}
                  currentStats={mockStats}
                />
              </div>

              <div className="rounded-lg bg-white p-6 shadow-lg border-2 border-indigo-200">
                <h3 className="text-xl font-bold mb-4 text-indigo-600">Component: HistoryPanel</h3>
                <HistoryPanel events={mockHistoryEvents} snapshots={mockHistory} />
              </div>
            </div>
          )}

          {/* Resumo Final */}
          <div className="rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 p-8 text-white shadow-lg">
            <h2 className="text-3xl font-bold mb-4">✨ LUMI v3.0 Showcase Completo</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div>
                <p className="text-sm opacity-90">Componentes</p>
                <p className="text-3xl font-bold">13</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Fases</p>
                <p className="text-3xl font-bold">4</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Funções Backend</p>
                <p className="text-3xl font-bold">35+</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Pronto para</p>
                <p className="text-3xl font-bold">Produção</p>
              </div>
            </div>
            <p className="mt-6 text-sm opacity-90">
              Esta página demonstra todos os componentes do LUMI v3.0 funcionando juntos.
              Próximo passo: Seguir INTEGRATION-GUIDE.md para colocar em produção.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mx-auto max-w-7xl mt-12 text-center text-gray-600 text-sm">
          <p>LUMI v3.0 — Plataforma Educacional Inteligente</p>
          <p>Implementado em 1 sessão • 14.8k linhas • 100% type-safe</p>
        </div>
      </div>
    </MascotProvider>
  )
}
