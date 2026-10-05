# LUMI — Plano de Melhoria dos Jogos Educacionais

**Status:** 🧩 Quebra-cabeça COMPLETO | 7 jogos aguardando implementação

---

## ✅ Jogos Completados

### 🧩 Quebra-cabeça (v2.0)
**Implementado:** Outubro 4, 2026

**Features:**
- ✅ Dificuldade progressiva (Fácil 2x2, Médio 3x3, Difícil 4x4)
- ✅ Drag-and-drop + Modo seleção alternativo
- ✅ Barra de progresso visual
- ✅ Preview de imagem (especialmente Fácil)
- ✅ Feedback animado e comemoração
- ✅ Acessível em mobile e desktop

---

## ⏳ Próximos Jogos a Melhorar

### 2️⃣ 🔎 Caça-Palavras (`wordsearch.tsx`)

**Problemas atuais:**
- Interface simples sem feedback
- Dificuldade uniforme
- Sem ajuda progressiva
- Sem animações

**Melhorias necessárias:**
- [ ] Dificuldade progressiva (tamanho da grade, palavras mais longas)
- [ ] Highlight ao encontrar palavra
- [ ] Som de feedback ao encontrar
- [ ] Dicas (revelar primeira letra, revelar orientação)
- [ ] Estatísticas (palavras encontradas/total)
- [ ] Modo: Clique-e-arraste vs. Seleção
- [ ] Comemoração ao completar

**Tempo estimado:** 2 horas

---

### 3️⃣ 🧠 Memória (`pairs.tsx`)

**Problemas atuais:**
- Apenas 2 imagens
- Sem progresso visual
- Sem feedback de acerto/erro
- Sem níveis

**Melhorias necessárias:**
- [ ] 3 níveis: Fácil (4 pares), Médio (6 pares), Difícil (8 pares)
- [ ] Animação ao virar carta
- [ ] Feedback visual ao acertar/errar
- [ ] Contador de movimentos
- [ ] Limite de tempo (opcional)
- [ ] Melhor apresentação de cartas (flip animation)
- [ ] Leaderboard de movimentos
- [ ] Som de vitória ao completar

**Tempo estimado:** 2 horas

---

### 4️⃣ 🔗 Ligue os Pares (`pairs.tsx` atual)

**Observação:** Pode estar nomeado erroneamente. Verificar se é o jogo "Ligue os pares" ou "Memória"

**Melhorias necessárias:**
- [ ] Dificuldade progressiva
- [ ] Animação ao ligar pares
- [ ] Feedback de sucesso/erro
- [ ] Progresso visual
- [ ] Dicas (destacar um par relacionado)

**Tempo estimado:** 1.5 horas

---

### 5️⃣ 🔢 Ordene a Sequência (`order.tsx`)

**Problemas atuais:**
- Interface básica
- Sem feedback durante ordenação
- Sem ajuda

**Melhorias necessárias:**
- [ ] Suporte a drag-and-drop
- [ ] Preview antes/depois (para eventos históricos, ciclos, etc.)
- [ ] Feedback ao colocar em ordem errada
- [ ] Dica: "Qual acontecimento vem primeiro?"
- [ ] Animação ao completar
- [ ] Statísticas de tentativas

**Tempo estimado:** 1.5 horas

---

### 6️⃣ ✏️ Complete a Frase

**Melhorias necessárias:**
- [ ] Dificuldade progressiva (dicas mais/menos óbvias)
- [ ] Sugestões de palavras ao digitar
- [ ] Feedback ao acertar
- [ ] Estatísticas de acertos
- [ ] Botão "Desistir" com resposta

**Tempo estimado:** 1 hora

---

### 7️⃣ 🎯 Quiz Relâmpago (`choice.tsx`)

**Melhorias necessárias:**
- [ ] Dificuldade adaptativa (ajustar questões por desempenho)
- [ ] Contador de acertos consecutivos
- [ ] Feedback imediato
- [ ] Explicação da resposta certa
- [ ] Tempo limite por questão (opcional)
- [ ] Progresso para próxima questão

**Tempo estimado:** 1.5 horas

---

### 8️⃣ 🗺️ Mapa Interativo (`map.tsx`)

**Melhorias necessárias:**
- [ ] Dificuldade progressiva (zonas maiores → menores)
- [ ] Feedback ao clicar em região correta
- [ ] Dica: mostrar vizinhos próximos
- [ ] Pontuação por precisão
- [ ] Animação ao acertar
- [ ] Tempo de resposta (bônus por rapidez)

**Tempo estimado:** 1.5 horas

---

## 📋 Checklist Geral de Melhorias

Todo jogo deve incluir:

### Interatividade
- [ ] Dificuldade progressiva (Fácil → Médio → Difícil)
- [ ] Feedback visual para acertos
- [ ] Feedback visual para erros
- [ ] Animações suaves
- [ ] Sons (opcional mas recomendado)

### Acessibilidade
- [ ] Funciona em mobile
- [ ] Funciona em desktop
- [ ] Alternativa ao drag-and-drop (quando aplicável)
- [ ] Texto claro
- [ ] Contraste adequado

### Educação
- [ ] Conectado ao conteúdo da aula
- [ ] Mostra aprendizado ao completar
- [ ] Dicas ajudam a aprender
- [ ] Feedback educativo (não apenas "errado")

### Performance
- [ ] Carrega rápido
- [ ] Funciona offline
- [ ] Smooth 60 FPS
- [ ] Funciona em navegadores antigos

---

## 🎮 Padrão de Estrutura para Cada Jogo

```
Início
  ↓
Selecionar Dificuldade (ou automático por level)
  ↓
Instruções breves
  ↓
Jogo interativo
  ├─ Feedback durante jogo
  ├─ Dicas disponíveis
  └─ Progresso visual
  ↓
Acertou? Sim → Feedback positivo + Estatísticas
  ↓
Comemoração
  └─ Mostrar aprendizado
  └─ Oferecer próximo desafio
```

---

## 📅 Timeline Recomendada

**Semana 1:**
- Quebra-cabeça (✅ COMPLETO)
- Caça-palavras
- Memória

**Semana 2:**
- Ligue os pares
- Ordene a sequência
- Complete a frase

**Semana 3:**
- Quiz relâmpago
- Mapa interativo
- Testes em mobile

---

## 🧪 Testes em Mobile

Antes de considerar um jogo "pronto", testar:

**Android (Chrome):**
- [ ] Toque funciona
- [ ] Arrastar funciona
- [ ] Sem lag
- [ ] Botões clicáveis
- [ ] Orientação retrato e paisagem

**iPhone (Safari):**
- [ ] Toque funciona
- [ ] Sem zoom involuntário
- [ ] Animações suaves
- [ ] Sem scroll desnecessário

**Desktop:**
- [ ] Mouse funciona
- [ ] Keyboard funciona
- [ ] Sem resize quebrado

---

## 📝 Notas de Implementação

### Padrão Recomendado
```tsx
// 1. Dificuldade -> Número de elementos/complexidade
const elementCount = { 1: 4, 2: 6, 3: 8 }[difficulty]

// 2. Estado do jogo
const [score, setScore] = useState(0)
const [completed, setCompleted] = useState(false)
const [hint, setHint] = useState(0)

// 3. Feedback
const [feedback, setFeedback] = useState('')
const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

// 4. Ao terminar
if (completed) {
  apiRef.current?.done(score)
  apiRef.current?.say(`Parabéns! Você aprendeu sobre ${lesson.title}`, 'medium')
}
```

---

**Status Geral:** 1/8 jogos completos (12%)  
**Próxima ação:** Iniciar melhoria de Caça-palavras  
**Última atualização:** 2026-10-04
