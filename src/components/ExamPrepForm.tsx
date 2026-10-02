import React, { useState } from 'react'
import type { ExamPrepForm } from '../types/exam-prep'

interface ExamPrepFormProps {
  onSubmit: (form: ExamPrepForm) => void
  isLoading?: boolean
}

export default function ExamPrepFormComponent({ onSubmit, isLoading = false }: ExamPrepFormProps) {
  const [form, setForm] = useState<ExamPrepForm>({
    subject: '',
    gradeLevel: '',
    contents: [],
    examDate: ''
  })

  const [contentInput, setContentInput] = useState('')

  const subjects = [
    'Português',
    'Matemática',
    'História',
    'Geografia',
    'Ciências',
    'Inglês',
    'Educação Física',
    'Arte'
  ]

  const grades = ['6º ano', '7º ano', '8º ano', '9º ano', 'Ensino Médio']

  const addContent = () => {
    if (contentInput.trim() && !form.contents.includes(contentInput.trim())) {
      setForm({
        ...form,
        contents: [...form.contents, contentInput.trim()]
      })
      setContentInput('')
    }
  }

  const removeContent = (content: string) => {
    setForm({
      ...form,
      contents: form.contents.filter(c => c !== content)
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.subject && form.gradeLevel && form.contents.length > 0) {
      onSubmit(form)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📝 Preparação para a Prova</h1>
        <p className="text-gray-600 mb-8">Teste seus conhecimentos e descubra o que precisa revisar</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Matéria */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📚 Matéria
            </label>
            <select
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Selecione uma matéria</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          {/* Série/Ano */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🎓 Série/Ano
            </label>
            <select
              value={form.gradeLevel}
              onChange={(e) => setForm({ ...form, gradeLevel: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Selecione sua série</option>
              {grades.map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>

          {/* Conteúdos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📖 Conteúdos que serão cobrados
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={contentInput}
                onChange={(e) => setContentInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addContent())}
                placeholder="Ex: Equação do 1º grau"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={addContent}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Adicionar
              </button>
            </div>

            {form.contents.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {form.contents.map(content => (
                  <div
                    key={content}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    {content}
                    <button
                      type="button"
                      onClick={() => removeContent(content)}
                      className="font-bold hover:text-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {form.contents.length === 0 && (
              <p className="text-sm text-gray-500">Adicione pelo menos um conteúdo</p>
            )}
          </div>

          {/* Data da Prova */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📅 Data da prova (opcional)
            </label>
            <input
              type="date"
              value={form.examDate || ''}
              onChange={(e) => setForm({ ...form, examDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !form.subject || !form.gradeLevel || form.contents.length === 0}
            className="w-full px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Preparando seu teste...' : '🚀 Começar Teste'}
          </button>
        </form>
      </div>
    </div>
  )
}
