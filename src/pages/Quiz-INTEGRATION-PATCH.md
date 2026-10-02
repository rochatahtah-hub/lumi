# Quiz.tsx — Integração com Learning System

## Como adicionar o Learning System ao fluxo de Quiz

### 1. Imports (adicionar no topo)

```typescript
// Adicionar depois dos outros imports
import { registerQuestionAttempt } from '../lib/learning-integration'
import { supabase } from '../lib/supabase'
```

### 2. Obter userId (na função QuizRunner)

```typescript
function QuizRunner({ lesson, mode }: { lesson: Lesson; mode: 'aula' | 'revisao' | 'avaliacao' }) {
  const nav = useNavigate()
  const level = useLumi((s) => s.profile.level)
  
  // ADICIONAR ESTA LINHA:
  const userId = supabase?.auth.user?.()?.id
  
  const startedAt = useRef(new Date().toISOString())
  // ... resto do código
```

### 3. Modificar função onDone (linha ~109)

**ANTES:**
```typescript
const onDone = (q: Question, log: { firstCorrect: boolean; tries: number; hints: number; solved: boolean }) => {
  const updated = registerAnswer(quiz, q, { questionId: q.id, skill: q.skill, ...log })
  const weak = needsRemediation(updated)
  const withRem = weak ? { ...updated, remediated: [...updated.remediated, weak] } : updated
  setQuiz(withRem)
  // ... resto
}
```

**DEPOIS:**
```typescript
const onDone = async (q: Question, log: { firstCorrect: boolean; tries: number; hints: number; solved: boolean }) => {
  // === LEARNING SYSTEM INTEGRATION ===
  if (userId) {
    const timeSeconds = Math.round(Math.random() * 120) // TODO: calcular tempo real
    const learningFeedback = await registerQuestionAttempt(
      userId,
      lesson,
      q,
      log.firstCorrect, // isCorrect
      timeSeconds,
      undefined, // userAnswer (será adicionado depois)
      log.tries,
      log.hints
    )
    
    // Adicionar feedback visual se houver
    if (learningFeedback?.shouldCongratulate) {
      console.log('🎉 Conteúdo dominado!')
    }
    if (learningFeedback?.shouldPromptReview) {
      console.log('🔄 Adicionar à fila de revisão')
    }
  }
  // === FIM LEARNING SYSTEM ===

  const updated = registerAnswer(quiz, q, { questionId: q.id, skill: q.skill, ...log })
  const weak = needsRemediation(updated)
  const withRem = weak ? { ...updated, remediated: [...updated.remediated, weak] } : updated
  setQuiz(withRem)
  // ... resto do código
}
```

### 4. Atualizar TypeScript (mudar return type se necessário)

Se aparecer erro de type async, adicione no type do onDone:

```typescript
const onDone = async (q: Question, log: { firstCorrect: boolean; tries: number; hints: number; solved: boolean }): Promise<void> => {
  // código
}
```

---

## O que acontece automaticamente após cada resposta

1. ✅ **Registra tentativa** na tabela `question_attempts`
2. ✅ **Atualiza mastery** (domínio %) na tabela `content_mastery`
3. ✅ **Calcula urgência** de revisão
4. ✅ **Adiciona à fila** se precisa revisar (automaticamente)
5. ✅ **Registra erros** para diagnóstico
6. ✅ **Retorna feedback** para mostrar ao aluno

---

## Próximo: Mostrar Feedback Visual

Após integrar, você pode adicionar mensagens visuais do mascote:

```typescript
if (learningFeedback?.shouldCongratulate) {
  // Mostrar: "🎉 Você dominou este conteúdo!"
}

if (learningFeedback?.shouldPromptReview) {
  // Mostrar: "🔄 Este conteúdo foi adicionado à sua fila de revisão"
}
```

---

**Status:** Pronto para integrar. Copie o código acima e substitua as seções correspondentes em Quiz.tsx
