# 🗄️ Migrações Supabase — LUMI v3.1

**Data:** 02-OUT-2026  
**Tabelas:** 2 novas + RLS + Índices

---

## 🚀 Como Executar

### Passo 1: Abrir Console SQL do Supabase

1. Acesse https://app.supabase.com
2. Selecione projeto **"lumi"**
3. Menu lateral → **SQL Editor**
4. Clique em **"New Query"** (botão verde)

### Passo 2: Copiar & Colar SQL

Abra o arquivo `src/lib/exam-prep-migrations.sql` e copie TODO o conteúdo.

Cole na aba SQL Editor do Supabase.

### Passo 3: Executar

Clique em **"Run"** (botão verde topo direito).

Você deve ver: **✅ Success** (sem erros)

---

## 📋 O Que Será Criado

### Tabela: `exam_prep_results`
Armazena o resultado completo de cada teste.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | BIGSERIAL | ID único |
| `user_id` | UUID | Usuário (FK auth.users) |
| `subject` | TEXT | Matéria (ex: Matemática) |
| `grade_level` | TEXT | Série (ex: 8º ano) |
| `contents` | JSONB | Lista de conteúdos `["Equação", "Porcentagem"]` |
| `total_questions` | INT | Total de questões (sempre 20) |
| `correct_answers` | INT | Respostas corretas (0-20) |
| `percentage` | FLOAT | Porcentagem (0-100) |
| `equivalent_score` | FLOAT | Nota 0-10 |
| `content_analysis` | JSONB | Análise por conteúdo |
| `exam_date` | DATE | Data da prova (opcional) |
| `created_at` | TIMESTAMP | Quando foi criado |
| `completed_at` | TIMESTAMP | Quando foi finalizado |
| `updated_at` | TIMESTAMP | Última atualização |

### Tabela: `exam_prep_answers`
Armazena cada resposta individual.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | BIGSERIAL | ID único |
| `exam_result_id` | BIGSERIAL | Referência ao resultado (FK) |
| `question_id` | TEXT | ID da questão |
| `answer` | TEXT | Resposta do usuário |
| `is_correct` | BOOLEAN | Acertou? |
| `time_spent` | INT | Segundos gastos |
| `created_at` | TIMESTAMP | Quando respondeu |

---

## 🔒 Row Level Security (RLS)

Automaticamente configurado para:
- ✅ Usuários só veem seus próprios resultados
- ✅ Usuários só podem inserir no seu user_id
- ✅ Dados protegidos por RLS

---

## 📊 Índices para Performance

Criados automaticamente para buscar rápido:
- `idx_exam_prep_results_user_id` — Buscar por usuário
- `idx_exam_prep_results_created_at` — Ordenar por data
- `idx_exam_prep_results_subject` — Filtrar por matéria
- `idx_exam_prep_answers_exam_result_id` — Buscar respostas

---

## ✅ Checklist Pós-Migração

- [ ] Executou a query sem erros
- [ ] Tabelas aparecem em "Table Editor" do Supabase
- [ ] `exam_prep_results` visível
- [ ] `exam_prep_answers` visível
- [ ] RLS habilitado em ambas

---

## 🧪 Teste Rápido (Opcional)

No SQL Editor, execute:

```sql
-- Verificar tabelas foram criadas
SELECT tablename FROM pg_tables 
WHERE tablename LIKE 'exam_prep_%';

-- Resultado esperado:
-- exam_prep_results
-- exam_prep_answers
```

---

## 🔄 Próximo Passo

Após as migrações serem executadas:

1. ✅ Testar fluxo completo em `http://localhost:5173/preparacao-prova`
2. ✅ Verificar se resultados são salvos em Supabase
3. ✅ Implementar histórico de testes (pagina que lista todos)

---

**Pronto para executar?** Abra Supabase SQL Editor e cole o arquivo! 🚀

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
