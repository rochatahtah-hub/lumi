# 🧠 LUMI Learning Path System — Setup Guide

## Fase 1 Completa: Database Schema + Types + API

Implementado em **30-SET-2026** para transformar LUMI em plataforma educacional adaptativa.

---

## 📋 O que foi criado

### 1. **Database Schema** (`supabase-schema-learning.sql`)
8 novas tabelas PostgreSQL no Supabase:
- `learning_paths` — trilha de cada aluno
- `content_mastery` — domínio por conteúdo
- `skill_mastery` — domínio por habilidade
- `review_queue` — fila de revisão inteligente
- `learning_diagnostics` — análise de erros
- `recommendations` — próximos passos sugeridos
- `question_attempts` — histórico de tentativas
- `achievements` — conquistas do aluno

Todas com RLS (Row Level Security) + índices para performance.

### 2. **TypeScript Types** (`src/types/learning.ts`)
Tipos completos para:
- Mastery (conteúdo + habilidade)
- Review queue com urgência
- Diagnostics
- Achievements
- View models para o frontend

### 3. **Learning API** (`src/lib/learning-api.ts`)
Funções prontas para:
- Registrar tentativas e atualizar domínio
- Adicionar à fila de revisão com urgência calculada
- Gerar diagnósticos de fraquezas/forças
- Buscar items para revisar

---

## 🚀 Como Usar

### Passo 1: Rodar o Schema no Supabase

1. Abrir **Supabase Console** → seu projeto
2. Ir em **SQL Editor** → **New Query**
3. Copiar todo o conteúdo de `supabase-schema-learning.sql`
4. Executar
5. ✅ Schema criado com RLS e índices

### Passo 2: Importar Tipos no TypeScript

```typescript
// src/pages/home.tsx ou qualquer componente
import type { ContentMastery, ReviewItem, Recommendation } from '../types/learning'
import { recordAttempt, getReviewQueue } from '../lib/learning-api'
```

### Passo 3: Usar a API ao Registrar Resposta

Quando o aluno termina uma questão:

```typescript
const handleAnswerQuestion = async (isCorrect: boolean) => {
  const mastery = await recordAttempt(
    userId,
    lesson.id,
    lesson.subject,
    question.id,
    question.skill, // ex: 'g_vel'
    isCorrect,
    timeSeconds,
    difficultyRating
  )
  
  // mastery agora contém estado atualizado
  if (mastery?.state === 'mastered') {
    showCongrats()
  } else if (mastery?.needs_review) {
    showSuggestReview()
  }
}
```

### Passo 4: Exibir Fila de Revisão

```typescript
const { data: reviewQueue } = useQuery(['review-queue', userId], async () => {
  return await getReviewQueue(userId, 5)
})

return (
  <div>
    <h2>Hora de revisar</h2>
    {reviewQueue?.map(item => (
      <ReviewCard
        key={item.id}
        lesson={item.lesson_id}
        urgency={item.urgency_score}
        reason={item.reason}
        masteryPercent={item.current_mastery_percent}
      />
    ))}
  </div>
)
```

---

## 🎯 Próximos Passos (Fase 1 continuação)

### 2. **Frontend Components**

Componentes React a criar:

1. **`LearningPath.tsx`** — Visualização da trilha
   - Cards de conteúdo com estado visual (🔵 → 🟡 → 🟠 → ✅)
   - Barra de progresso por conteúdo

2. **`ReviewQueue.tsx`** — "Hora de revisar"
   - Lista de items ordenados por urgência
   - Botão "Revisar agora"
   - Card mostrando razão (ex: "Você teve 3 erros últimamente")

3. **`DiagnosticPanel.tsx`** — Diagnóstico de dificuldades
   - "Você está indo bem em Cinemática!"
   - "Habilidades dominadas: ✅ Deslocamento, ✅ Velocidade"
   - "Vamos revisar: 🔄 Aceleração"

4. **`PathSnapshot.tsx`** — Resumo na Home
   - Progresso geral (78% de domínio)
   - Streak (🔥 5 dias)
   - Top 3 items para revisar
   - Top 3 recomendações

### 3. **Algoritmos**

Functions a implementar:

1. **Algoritmo de Domínio** (`mastery-algorithm.ts`)
   - Considerar: precisão, tentativas, dificuldade, recência
   - NOT_STARTED → LEARNING → PRACTICING → REVIEW → MASTERED

2. **Motor de Revisão** (`review-engine.ts`)
   - Calcular urgência: erros anteriores + tempo desde revisão + importância
   - Ordenar conteúdos por prioridade

3. **Diagnostic Engine** (`diagnostic-engine.ts`)
   - Padrões de erro por skill
   - Gerar recomendações automáticas

### 4. **Integração com Questões Existentes**

Após cada resposta em qualquer aula:
1. Chamar `recordAttempt()`
2. Sistema automaticamente:
   - Atualiza mastery
   - Detecta se precisa revisar
   - Gera diagnóstico
   - Cria recomendação

---

## 📊 Estrutura de Dados

### ContentMastery Fields

```
state: 'not_started' | 'learning' | 'practicing' | 'review' | 'mastered'
mastery_percent: 0-100 (média ponderada de acertos)
confidence_score: 0.0-1.0 (calibração: confiança no domínio)
review_urgency: 1-10 (1=não urgente, 10=muito urgente)
```

### ReviewQueue Razões

```
'low_mastery' → domínio < 70%
'time_since_review' → passou 1+ semana
'high_error_rate' → >40% de erros recentes
'skill_weak' → habilidade associada está fraca
'recent_failure' → falhou última tentativa
```

### Estado de Aprendizado

```
NOT_STARTED (0 tentativas)
    ↓
LEARNING (< 50% domínio)
    ↓
PRACTICING (50-80% domínio)
    ↓
REVIEW (80-95% domínio)
    ↓
MASTERED (≥ 95% domínio)
```

Se desempenho cair, volta para REVIEW automaticamente.

---

## 🔐 Segurança

- RLS ativado em todas as tabelas
- Usuários veem apenas seus próprios dados
- Queries filtram por `auth.uid()`
- Sem dados sensíveis expostos no frontend

---

## ⚡ Performance

Índices criados:

```sql
learning_paths(user_id)
content_mastery(user_id, lesson_id)
content_mastery(user_id, needs_review) WHERE needs_review = TRUE
review_queue(user_id, urgency_score DESC)
question_attempts(user_id, lesson_id)
```

Query típica de review queue retorna em <100ms.

---

## 🧪 Testing

Para testar sem frontend:

```bash
# 1. Rodar schema no Supabase
# 2. Simular tentativa via Supabase Docs:

POST /functions/v1/record-attempt
{
  "lesson_id": "fis-1med-cinemática",
  "question_id": "q1",
  "subject": "fisica",
  "skill_id": "g_vel",
  "is_correct": true,
  "time_seconds": 45
}

# 3. Verificar que content_mastery foi atualizada
# 4. Se nota < 70%, conferir se entrou em review_queue
```

---

## 📝 Checklist para Fase 1 Conclusão

- [x] Database schema criado
- [x] Types TypeScript completos
- [x] Learning API implementada
- [ ] Components React (LearningPath, ReviewQueue, Diagnostic, PathSnapshot)
- [ ] Algoritmos (Mastery, Review Engine, Diagnostic Engine)
- [ ] Integração com questões existentes
- [ ] Testes e ajustes

**Fase 1 Tempo Estimado:** 18 horas (2-3 sessões)

---

## 🚦 Próximas Fases

**Fase 2 — ENGAJAMENTO:** Mascote, conquistas, metas
**Fase 3 — AVALIAÇÃO:** Simulados, resultado por habilidade
**Fase 4 — PROGRESSO:** Painel completo, "Tenho prova"

---

**Criado:** 30-SET-2026 | **Status:** Schema + Types + API Prontos | **Próximo:** Frontend Components
