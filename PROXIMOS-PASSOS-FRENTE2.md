# Próximos Passos — FRENTE 2: Preparação para Prova

**Status:** 60% completo  
**Data:** 03/10/2026  
**Continuação:** Integração com Base Oficial

---

## ✅ JÁ COMPLETO

- ✅ ExamPrepPage.tsx (fluxo form → exam → results)
- ✅ ExamPrepForm.tsx (coleta matéria, série, conteúdos, data)
- ✅ ExamSimulator.tsx (renderiza questões)
- ✅ ExamResults.tsx (mostra resultado + análise + botões)
- ✅ Tipos de questão (6 tipos: múltipla, V/F, completa, associação, interpretação, problema)
- ✅ Cálculo de resultado e ContentAnalysis
- ✅ Supabase integration (tabelas exam_prep_results, exam_prep_answers)
- ✅ Histórico de preparações (getExamHistory)

---

## ❌ O QUE FALTA

### 1. Integração com Base Oficial (CRÍTICO)

**Arquivo:** `src/lib/exam-prep-service.ts` → função `generateExamQuestions()`

**Problema atual:**
```typescript
// Linha 50-58: questões genéricas "Questão X sobre Y"
const question: ExamQuestion = {
  content: `Questão ${questionIndex + 1} sobre ${content} (nível ${difficulty})`,
  correctAnswer: 'Opção A',
  explanation: `Explicação detalhada...`
}
```

**O que fazer:**

```typescript
import { BASE_LESSONS } from '../content/index'

static generateQuestionFromLesson(
  lesson: Lesson,
  content: string,
  difficulty: 'easy' | 'medium' | 'hard',
  type: ExamQuestion['type']
): ExamQuestion {
  // Buscar lição que contém o conteúdo
  const matchedLesson = BASE_LESSONS.find(l => 
    l.title.toLowerCase().includes(content.toLowerCase()) ||
    l.description?.includes(content)
  )
  
  if (!matchedLesson) {
    return generateFallbackQuestion(content, difficulty, type)
  }
  
  // Extrair exemplos/exercícios da lição
  const { examples, exercises, explanation } = matchedLesson
  
  // Gerar questão variando tipo
  if (type === 'multiple-choice') {
    return {
      id: `q_${Date.now()}`,
      type,
      difficulty,
      content: examples[Math.random() * examples.length] || `Explique: ${content}`,
      subject: matchedLesson.subject,
      gradeLevel: matchedLesson.grade,
      skillReference: content,
      options: generateOptions(explanation, examples),
      correctAnswer: exercises[0]?.answer,
      explanation: explanation
    }
  }
  // ... outros tipos de questão
}
```

### 2. Implementar Botões de Ação (IMPORTANTE)

**Arquivo:** `src/pages/ExamPrep.tsx` → função `handleRecommendation()`

**Botão 1: review-errors**
```typescript
case 'review-errors':
  // Mostrar erros cometidos + redirecionar para lições
  const wrongAnswers = examResult?.answers.filter(a => !a.isCorrect)
  const contentWithErrors = wrongAnswers?.map(a => {
    const question = questions.find(q => q.id === a.questionId)
    return question?.skillReference
  })
  // Redirecionar para /estudar com conteúdos em erro
  navigate(`/estudar?retry=${contentWithErrors.join(',')}`)
  break
```

**Botão 2: study-difficulties**
```typescript
case 'study-difficulties':
  // Criar trilha de revisão dos conteúdos com <70% acerto
  const weakContents = examResult?.contentAnalysis
    .filter(c => c.percentage < 70)
    .map(c => c.content)
  
  // Salvar como "revisão urgente" e redirecionar
  navigate(`/revisar?urgencia=alta&conteudos=${weakContents.join(',')}`)
  break
```

**Botão 3: new-test**
```typescript
case 'new-test':
  // Já está implementado: volta ao form
  setPageState('form')
  setExamResult(null)
  break
```

**Botão 4: play-games**
```typescript
case 'play-games':
  // Filtrar jogos relacionados aos conteúdos com dificuldade
  const gamesForWeakContent = currentForm?.contents
    .filter(c => {
      const analysis = examResult?.contentAnalysis.find(a => a.content === c)
      return analysis?.percentage < 70
    })
    .flatMap(c => findGamesForContent(c))
  
  navigate(`/jogos?filter=${gamesForWeakContent.join(',')}`)
  break
```

### 3. Tabela de Perguntas Não Encontradas (IMPORTANTE)

**Arquivo:** Criar `src/lib/questions-not-found.ts`

```typescript
import { supabase } from './supabase'

export interface QuestionNotFound {
  id: string
  question: string
  subject: string
  grade: string
  probable_topic: string
  timestamp: string
  ai_response?: string
  status: 'new' | 'in_review' | 'approved'
}

export async function registerQuestionNotFound(
  question: string,
  form: ExamPrepForm
): Promise<void> {
  if (!supabase) return
  
  const { error } = await supabase
    .from('questions_not_found')
    .insert([{
      question,
      subject: form.subject,
      grade_level: form.gradeLevel,
      probable_topic: form.contents[0],
      timestamp: new Date().toISOString(),
      status: 'new'
    }])
  
  if (error) console.error('Erro ao registrar pergunta não encontrada:', error)
}
```

**Usar em:**
```typescript
// Em generateExamQuestions(), quando não encontrar conteúdo na Base
if (!matchedLesson) {
  await registerQuestionNotFound(content, form)
  // Depois usar IA como fallback
}
```

### 4. Admin: Auditoria de Cobertura (DESEJÁVEL)

**Arquivo:** Criar `src/pages/admin/Coverage.tsx`

```typescript
export default function CoveragePage() {
  const [coverage, setCoverage] = useState<CoverageReport[]>([])
  
  useEffect(() => {
    // Calcular cobertura por matéria/série
    const report = calculateCoverage(BASE_LESSONS)
    setCoverage(report)
  }, [])
  
  return (
    <div>
      {coverage.map(item => (
        <div key={item.id}>
          <h3>{item.subject} - {item.grade}</h3>
          <ProgressBar percent={item.completionPercent} />
          <ul>
            {item.units.map(unit => (
              <li key={unit.id}>
                {unit.name}: {unit.status}
                {unit.status === 'incomplete' && <span> ⚠️ Falta exercícios</span>}
                {unit.status === 'absent' && <span> 🔴 Não criado</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
```

---

## 🎯 ORDEM DE IMPLEMENTAÇÃO

### Prioridade 1 (HOJE)
- [ ] Refatorar `generateExamQuestions()` para buscar em BASE_LESSONS
- [ ] Implementar `generateQuestionFromLesson()`
- [ ] Testar geração de questões reais

### Prioridade 2 (HOJE ou amanhã)
- [ ] Implementar 4 botões de ação em `handleRecommendation()`
- [ ] Testar redirecionamentos

### Prioridade 3 (Semana)
- [ ] Criar `questions_not_found` table
- [ ] Registrar perguntas não encontradas
- [ ] Admin page para revisar

---

## 📝 Tabelas Supabase Necessárias

Criar se não existirem:

```sql
-- Resultados de preparação
CREATE TABLE exam_prep_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  subject TEXT NOT NULL,
  grade_level TEXT NOT NULL,
  contents TEXT[] NOT NULL,
  total_questions INT NOT NULL,
  correct_answers INT NOT NULL,
  percentage FLOAT NOT NULL,
  equivalent_score FLOAT NOT NULL,
  content_analysis JSONB,
  exam_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Respostas individuais
CREATE TABLE exam_prep_answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  exam_result_id UUID REFERENCES exam_prep_results(id),
  question_id TEXT NOT NULL,
  answer TEXT,
  is_correct BOOLEAN,
  time_spent INT
);

-- Perguntas não encontradas (para audit)
CREATE TABLE questions_not_found (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  subject TEXT,
  grade_level TEXT,
  probable_topic TEXT,
  timestamp TIMESTAMP DEFAULT NOW(),
  ai_response TEXT,
  status TEXT DEFAULT 'new', -- new, in_review, approved, rejected
  assigned_to UUID
);
```

---

## 🔗 Arquivos Relacionados

- `src/content/index.ts` — BASE_LESSONS (usar aqui!)
- `src/types/index.ts` — Lesson interface
- `src/lib/repo.ts` — getLesson() helper
- `src/pages/Study.tsx` — Ver como renderiza lições

---

## ✅ Checklist antes de mergear FRENTE 2

- [ ] Questões geradas são REAIS (da Base Oficial), não genéricas
- [ ] 4 botões de ação funcionam
- [ ] Histórico salva em Supabase
- [ ] Teste de ponta a ponta (form → exam → results → ação)
- [ ] Nenhuma funcionalidade existente quebrou
- [ ] PWA offline continua funcionando

---

## 🚀 Para Voltar Onde Parou

1. Leia este arquivo
2. Abra `src/lib/exam-prep-service.ts`
3. Refatore a função `generateExamQuestions()`
4. Rode o app: `npm run dev`
5. Teste fluxo completo
6. Commit quando tudo funcionar

---

**Estimado:** 3-4 horas para completar tudo  
**Prioridade:** 🟠 ALTA (impacto grande na qualidade do app)
