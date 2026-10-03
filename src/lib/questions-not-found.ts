/**
 * LUMI — Questions Not Found
 * Rastreia consultas que não encontram correspondência na Base Oficial
 * Alimenta relatório de cobertura e audit de gaps
 */

import { supabase } from './supabase'
import type { ExamPrepForm } from '../types/exam-prep'

export interface QuestionNotFound {
  id: string
  question: string
  subject: string
  grade_level: string
  probable_topic: string
  timestamp: string
  ai_response?: string
  status: 'new' | 'in_review' | 'approved'
}

/**
 * Registra uma consulta que não encontrou correspondência na Base Oficial
 * Usado em exam-prep para audit de cobertura
 */
export async function registerQuestionNotFound(
  content: string,
  form: ExamPrepForm
): Promise<void> {
  if (!supabase) {
    console.warn('Supabase não configurado. Questão não registrada:', content)
    return
  }

  try {
    const { error } = await supabase
      .from('questions_not_found')
      .insert([{
        question: content,
        subject: form.subject,
        grade_level: form.gradeLevel,
        probable_topic: form.contents[0] || 'unknown',
        timestamp: new Date().toISOString(),
        status: 'new'
      }])

    if (error) {
      console.error('Erro ao registrar pergunta não encontrada:', error)
    }
  } catch (err) {
    console.error('Erro inesperado ao registrar pergunta:', err)
  }
}

/**
 * Busca perguntas não encontradas que estão esperando revisão
 */
export async function getPendingQuestions(): Promise<QuestionNotFound[]> {
  if (!supabase) return []

  try {
    const { data, error } = await supabase
      .from('questions_not_found')
      .select('*')
      .eq('status', 'new')
      .order('timestamp', { ascending: false })

    if (error) throw error
    return data || []
  } catch (err) {
    console.error('Erro ao buscar perguntas pendentes:', err)
    return []
  }
}

/**
 * Atualiza status de pergunta (new → in_review → approved)
 */
export async function updateQuestionStatus(
  questionId: string,
  status: 'new' | 'in_review' | 'approved',
  aiResponse?: string
): Promise<void> {
  if (!supabase) return

  try {
    const updateData: Record<string, unknown> = { status }
    if (aiResponse) updateData.ai_response = aiResponse

    const { error } = await supabase
      .from('questions_not_found')
      .update(updateData)
      .eq('id', questionId)

    if (error) throw error
  } catch (err) {
    console.error('Erro ao atualizar status da pergunta:', err)
  }
}

/**
 * Calcula relatório de cobertura por matéria/série
 * Baseado em perguntas não encontradas
 */
export async function getCoverageGaps(): Promise<Record<string, number>> {
  if (!supabase) return {}

  try {
    const { data, error } = await supabase
      .from('questions_not_found')
      .select('subject, grade_level')
      .eq('status', 'new')

    if (error) throw error

    const gaps: Record<string, number> = {}
    data?.forEach((item: any) => {
      const key = `${item.subject}-${item.grade_level}`
      gaps[key] = (gaps[key] || 0) + 1
    })

    return gaps
  } catch (err) {
    console.error('Erro ao calcular gaps de cobertura:', err)
    return {}
  }
}

/**
 * Deleta questão após ser criada/aprovada na Base (limpeza)
 */
export async function deleteQuestionRecord(questionId: string): Promise<void> {
  if (!supabase) return

  try {
    const { error } = await supabase
      .from('questions_not_found')
      .delete()
      .eq('id', questionId)

    if (error) throw error
  } catch (err) {
    console.error('Erro ao deletar registro de questão:', err)
  }
}
