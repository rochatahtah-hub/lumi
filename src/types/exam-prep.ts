// Tipos para Preparação para Prova

export interface ExamPrepForm {
  subject: string
  gradeLevel: string
  contents: string[]
  examDate?: string
}

export interface ExamQuestion {
  id: string
  type: 'multiple-choice' | 'true-false' | 'complete' | 'association' | 'interpretation' | 'open'
  difficulty: 'easy' | 'medium' | 'hard'
  content: string
  subject: string
  gradeLevel: string
  skillReference: string
  options?: string[]
  correctAnswer: string
  explanation: string
}

export interface StudentAnswer {
  questionId: string
  answer: string
  isCorrect: boolean
  timeSpent: number
}

export interface ExamResult {
  id: string
  userId: string
  subject: string
  gradeLevel: string
  contents: string[]
  totalQuestions: number
  correctAnswers: number
  percentage: number
  equivalentScore: number
  answers: StudentAnswer[]
  contentAnalysis: ContentPerformance[]
  createdAt: string
  completedAt: string
}

export interface ContentPerformance {
  content: string
  skill: string
  correctCount: number
  totalCount: number
  percentage: number
  status: 'well-mastered' | 'needs-practice' | 'needs-review'
}

export interface ExamHistory {
  id: string
  userId: string
  subject: string
  gradeLevel: string
  percentage: number
  correctAnswers: number
  totalQuestions: number
  createdAt: string
  contentAnalysis: ContentPerformance[]
}
