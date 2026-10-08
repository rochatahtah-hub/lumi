import type { Lesson } from '../types'

interface ValidationError {
  type: 'placeholder' | 'empty' | 'incomplete'
  field: string
  message: string
}

const PLACEHOLDER_PATTERNS = [
  /^(conteúdo|content|aqui|here|texto|text|espaço|space|exemplo|example|placeholder)/i,
  /^(sua resposta|your answer|coloque|put|adicione|add|insira|insert)/i,
  /^(lorem|ipsum|dummy|test|foo|bar|baz)$/i,
  /\[.*\]/, // [conteúdo], [texto], etc
  /\{.*\}/, // {placeholder}, etc
]

export function validateLessonContent(lesson: Lesson): ValidationError[] {
  const errors: ValidationError[] = []

  // Validar título
  if (!lesson.title || lesson.title.trim().length === 0) {
    errors.push({ type: 'empty', field: 'title', message: 'Título não pode ser vazio' })
  } else if (isPlaceholder(lesson.title)) {
    errors.push({ type: 'placeholder', field: 'title', message: `Título é placeholder: "${lesson.title}"` })
  }

  // Validar summary
  if (!lesson.summary || isPlaceholder(lesson.summary)) {
    errors.push({ type: 'placeholder', field: 'summary', message: 'Summary não pode ser placeholder' })
  }

  // Validar blocos
  lesson.blocks?.forEach((block, idx) => {
    if (!block.text || isPlaceholder(block.text)) {
      errors.push({
        type: 'placeholder',
        field: `blocks[${idx}].text`,
        message: `Bloco "${block.title}" tem conteúdo vazio ou placeholder`
      })
    }
  })

  // Validar questions
  lesson.questions?.forEach((q, idx) => {
    if (q.type === 'mc') {
      if (!q.options || q.options.some(o => isPlaceholder(o))) {
        errors.push({
          type: 'placeholder',
          field: `questions[${idx}].options`,
          message: `Questão "${q.prompt}" tem opções vazias`
        })
      }
    }
  })

  // Validar review
  if (!lesson.review || lesson.review.length === 0) {
    errors.push({ type: 'empty', field: 'review', message: 'Review vazio - sem palavras-chave' })
  } else if (lesson.review.some(r => isPlaceholder(r))) {
    errors.push({ type: 'placeholder', field: 'review', message: 'Review contém placeholders' })
  }

  return errors
}

function isPlaceholder(text: string): boolean {
  return PLACEHOLDER_PATTERNS.some(pattern => pattern.test(text))
}

export function logValidationErrors(lesson: Lesson): void {
  const errors = validateLessonContent(lesson)
  if (errors.length === 0) {
    console.log(`✅ ${lesson.id}: Conteúdo validado com sucesso`)
    return
  }

  console.error(`❌ ${lesson.id}: ${errors.length} erros encontrados`)
  errors.forEach(err => {
    console.error(`  [${err.type.toUpperCase()}] ${err.field}: ${err.message}`)
  })
}
