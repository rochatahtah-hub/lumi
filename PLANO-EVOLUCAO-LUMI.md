# PLANO DE EVOLUÇÃO DO LUMI — Estratégia de Implementação

**Data:** 03/10/2026  
**Versão:** v3.2 (Evolution)  
**Objetivo:** Evoluir o LUMI preservando tudo que funciona

---

## 📊 Situação Atual

### ✅ Já Implementado

| Feature | Status | Arquivos |
|---------|--------|----------|
| **Preparação para Prova** | ✅ 70% completo | exam-prep.ts, exam-prep.service.ts, ExamPrepPage.tsx |
| **Saudação Home** | ❌ Incompleto | Home.tsx (usa `preferredName` mas saudação está genérica) |
| **Base Oficial** | ✅ Parcial | content/index.ts (Fundamental I-II + Médio, mas incompleta) |

### 📚 Base de Lições Atual

**Matérias cobertas:**
- ✅ Matemática (Fundamental I/II, Médio)
- ✅ Português (Gramática, Texto)
- ✅ Ciências (Fundamental I/II)
- ✅ História (Parcial)
- ✅ Inglês (A1, A2, B1, B2/C1)
- ⚠️ Biologia (Parcial)
- ⚠️ Química (Parcial)
- ⚠️ Física (Parcial)
- ❌ Geografia (Ausente)
- ❌ Filosofia (Ausente)
- ❌ Sociologia (Ausente)

**Total de lições:** ~70 lições estruturadas

---

## 🚀 3 FRENTES DE TRABALHO

### FRENTE 1: 👋 SAUDAÇÃO CORRIGIDA (Tempo: 30 min)

**Status:** ❌ Incompleto  
**Prioridade:** 🔴 ALTA (simples + impacto imediato)

#### Tarefas

- [ ] **1.1** Verificar código atual de saudação em Home.tsx
- [ ] **1.2** Implementar detecção de horário (05:00-11:59, 12:00-17:59, 18:00-04:59)
- [ ] **1.3** Corrigir saudação sem cadastro (Bom dia! / Boa tarde! / Boa noite!)
- [ ] **1.4** Corrigir saudação com `preferred_name` (Bom dia, Renata!)
- [ ] **1.5** Testar em diferentes horários
- [ ] **1.6** Commit e deploy

**Resultado:** Home.tsx com saudação dinâmica por horário

---

### FRENTE 2: 📝 PREPARAÇÃO PARA A PROVA (Tempo: 2-3 horas)

**Status:** ✅ 70% completo  
**Prioridade:** 🟠 MÉDIA (já existe, precisa ajustar)

#### O que JÁ existe

- ✅ ExamPrepPage.tsx (fluxo form → exam → results)
- ✅ ExamPrepForm (coleta matéria, série, conteúdos, data)
- ✅ ExamSimulator (renderiza questões)
- ✅ ExamResults (mostra resultado)
- ✅ ExamPrepService (lógica de geração e cálculo)
- ✅ Tipos definidos (ExamQuestion, ExamResult, etc.)

#### O que FALTA

- [ ] **2.1** Variação de tipos de questão (atualmente gera aleatoriamente)
- [ ] **2.2** Considerar difficulty ao gerar questões
- [ ] **2.3** Integração com Base Oficial (buscar questões da base, não IA)
- [ ] **2.4** ContentAnalysis mais detalhado (🟢 bem dominado, 🟡 precisa praticar, 🟠 revisão)
- [ ] **2.5** Botão "Revisar meus erros" (redirecionar para lição)
- [ ] **2.6** Botão "Fazer outro teste" (gerar novas questões)
- [ ] **2.7** Botão "Revisar jogando" (filtrar jogos por conteúdo)
- [ ] **2.8** Histórico de preparações (tabela no BD)
- [ ] **2.9** Disclaimer: "Este resultado é uma referência, não uma previsão"
- [ ] **2.10** Salvar resultado em Supabase (exam_results)

**Resultado:** Funcionalidade 100% completa e integrada

---

### FRENTE 3: 📚 BASE OFICIAL EXPANDIDA (Tempo: 5-8 horas)

**Status:** ✅ Parcial (~40% cobertura esperada)  
**Prioridade:** 🟡 ALTA (maior impacto educacional)

#### 3.1 AUDITORIA DA BASE ATUAL

- [ ] **3.1.1** Listar todas as lições em content/index.ts
- [ ] **3.1.2** Verificar cobertura por série
- [ ] **3.1.3** Identificar lacunas por matéria
- [ ] **3.1.4** Contar exercícios/exemplos por lição

**Estrutura esperada após auditoria:**

```
Fundamental I (1º-5º ano)
├── Português
├── Matemática
├── Ciências
├── História/Geografia
└── Arte/Educação Física

Fundamental II (6º-9º ano)
├── Português
├── Matemática
├── Ciências (Biologia, Química)
├── Física
├── História
├── Geografia
└── Artes

Ensino Médio (1º-3º ano)
├── Português
├── Matemática
├── Biologia
├── Química
├── Física
├── História
├── Geografia
├── Filosofia
├── Sociologia
├── Inglês Escolar
└── Educação Física
```

#### 3.2 ESTRUTURA DE CONTEÚDOS

Cada matéria precisa ter:

```typescript
interface SubjectStructure {
  subject: string                    // "Matemática"
  icon: string                      // "🔢"
  grades: {
    gradeLevel: string              // "6º ano"
    units: {
      unitName: string              // "Frações"
      topics: {
        topicName: string            // "Conceito de fração"
        subtopics: {
          subtopicName: string       // "Numerador e denominador"
          content: {
            objective: string        // Objetivo de aprendizado
            explanation: string      // Explicação clara
            simplifiedExplanation: string  // Para iniciantes
            examples: string[]       // Exemplos variados
            commonMistakes: string[] // Erros frequentes
            keywords: string[]       // Palavras-chave
            relatedQuestions: string[]  // Perguntas variadas
            exercises: Exercise[]    // Exercícios
            difficulty: 'easy' | 'medium' | 'hard'
          }
        }
      }
    }
  }
}
```

#### 3.3 CRIAR LIÇÕES POR MATÉRIA

**Português:**
- [ ] **3.3.1** Gramática (classes, sintaxe, concordância, crase) — 15 lições
- [ ] **3.3.2** Texto (interpretação, figuras, gêneros, coesão) — 12 lições
- [ ] **3.3.3** Literatura (movimentos, autores, obras) — 10 lições
- [ ] **3.3.4** Redação (tipos, técnicas, argumentação) — 8 lições

**Matemática:**
- [ ] **3.3.5** Fundamental I (números, operações, medidas) — 12 lições
- [ ] **3.3.6** Fundamental II (álgebra, geometria, estatística) — 20 lições
- [ ] **3.3.7** Ensino Médio (funções, trigonometria, cálculo) — 18 lições

**Ciências/Natureza:**
- [ ] **3.3.8** Biologia (celula, genética, ecologia) — 12 lições
- [ ] **3.3.9** Química (átomos, reações, estequiometria) — 12 lições
- [ ] **3.3.10** Física (cinemática, dinâmica, termologia) — 15 lições

**Humanas:**
- [ ] **3.3.11** História (do Brasil e mundo) — 18 lições
- [ ] **3.3.12** Geografia (mapas, climas, população) — 12 lições
- [ ] **3.3.13** Filosofia (pensadores, conceitos) — 8 lições
- [ ] **3.3.14** Sociologia (estrutura social, cultura) — 8 lições

**Inglês Escolar (1º Fundamental ao 3º Médio):**
- [ ] **3.3.15** Vocabulário básico (alfabeto, cores, números) — 8 lições
- [ ] **3.3.16** Gramática (present, past, future) — 15 lições
- [ ] **3.3.17** Leitura (textos simples → complexos) — 12 lições

**Total esperado:** ~190 lições estruturadas

#### 3.4 INTEGRAÇÃO COM PREPARAÇÃO PARA PROVA

Preparação para Prova usa Base Oficial:

```
Aluno escolhe matéria/série/conteúdos
     ↓
Sistema busca lições relacionadas
     ↓
Extrai questões existentes (com variações)
     ↓
Se não encontrar questões = registra para criação
     ↓
Fallback: IA gera questão (com registro)
```

#### 3.5 PERGUNTAS NÃO ENCONTRADAS

Criar tabela `questions_not_found`:

```typescript
interface QuestionNotFound {
  id: string
  question: string
  subject: string
  grade: string
  probable_topic: string
  timestamp: string
  ai_response?: string
  status: 'new' | 'in_review' | 'approved' | 'rejected'
  assigned_to?: string
}
```

Admin pode:
- [ ] Ver perguntas não encontradas
- [ ] Revisar resposta da IA
- [ ] Aprovar → adicionar à Base Oficial
- [ ] Rejeitar → marcar como fora do escopo

#### 3.6 AUDITORIA DE COBERTURA (Admin)

Criar página em /admin/coverage:

```
Matéria: Matemática
├── 6º ano
│   ├── Frações [✅ Completo]
│   ├── Decimais [🟡 Incompleto - falta exercícios]
│   └── Porcentagem [🔴 Ausente]
├── 7º ano
│   └── ...
```

---

## 📋 CHECKLIST DE IMPLEMENTAÇÃO

### FASE 1: PREPARAÇÃO (1 dia)
- [ ] Ler prompt MESTRE completo
- [ ] Auditar código atual
- [ ] Criar estrutura de pasta para novas lições
- [ ] Planejar banco de dados (Supabase)

### FASE 2: FRENTE 1 (Saudação) — 30 min
- [ ] Corrigir Home.tsx
- [ ] Testar saudação por horário
- [ ] Commit

### FASE 3: FRENTE 2 (Prep Prova) — 2-3 horas
- [ ] Completar integração com Base Oficial
- [ ] Adicionar ContentAnalysis detalhado
- [ ] Implementar botões pós-resultado
- [ ] Testar fluxo completo

### FASE 4: FRENTE 3 (Base) — 5-8 horas
- [ ] Criar lições estruturadas (em paralelo)
- [ ] Integrar com Preparação para Prova
- [ ] Tabela de perguntas não encontradas
- [ ] Admin/coverage auditoria

### FASE 5: TESTES E REFINAMENTO
- [ ] Testar Preparação para Prova
- [ ] Testar Base Oficial (buscar conteúdo)
- [ ] Testar saudação em diferentes horários
- [ ] PWA offline (funciona?)
- [ ] Hostinger (deploy teste)

---

## 🎯 ESCOPO EXECUTIVO

### NÃO FAÇA

❌ Remover funcionalidades existentes  
❌ Alterar identidade visual  
❌ Recriar LUMI do zero  
❌ Quebrar Supabase  
❌ Criar categorias vazias  
❌ Adicionar servidor Node.js

### FAÇA

✅ Corrigir saudação (simples)  
✅ Completar Prep Prova ( 70% → 100%)  
✅ Expandir Base Oficial (40% → 80%+)  
✅ Integrar tudo  
✅ Testar antes de mergear  

---

## 📦 ENTREGAS POR FASE

| Fase | Entrega | Data |
|------|---------|------|
| **1** | Plano aprovado | Hoje |
| **2** | Saudação corrigida | +30 min |
| **3** | Prep Prova 100% | +3 horas |
| **4** | Base expandida 80% | +8 horas |
| **5** | Testes completos | +4 horas |

**Total estimado:** ~16 horas (2 dias)

---

## 🚀 PRÓXIMAS AÇÕES

1. **Agora:** Revisar este plano
2. **Próximo:** Começar FRENTE 1 (saudação)
3. **Depois:** FRENTE 2 (prep prova)
4. **Paralelo:** FRENTE 3 (base)

---

**Status:** 📋 Plano pronto para execução  
**Aprovação:** ⏳ Aguardando seu OK
