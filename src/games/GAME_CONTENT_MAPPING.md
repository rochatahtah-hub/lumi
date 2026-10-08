# Sistema de Conteúdo para Jogos

## Estrutura de Dados

Cada jogo está vinculado ao conteúdo por:

### GameProps
```typescript
interface GameProps {
  lesson: Lesson          // Aula atual
  difficulty: 1 | 2 | 3   // Fácil, Médio, Difícil
  game: GameType          // Tipo do jogo
}
```

### Lesson → Game Mapping
```typescript
lesson.games: {
  quebra?: { map?: string }
  caca?: { words?: string[] }
  memoria?: { pairs?: [string, string][] }
  ligue?: { pairs?: [string, string][] }
  ordem?: { items?: string[] }
}
```

## Como Conteúdo Flui para Jogos

1. **Questões** (`lesson.questions`) → insumo para Memória, Ligue, Quiz
2. **Blocos** (`lesson.blocks`) → base para texto em jogos
3. **Review** (`lesson.review`) → palavras para caça-palavras
4. **Exemplos** (`lesson.blocks[].example`) → visuais para quebra-cabeça

## Mapeamento Automático

```typescript
// Memória: usa questions como pares
const pairs = lesson.questions?.slice(0, difficulty)
pairs.map(q => ({ front: q.prompt, back: q.options[q.answer] }))

// Ligue: conecta concept → definition
const connections = lesson.blocks?.map(b => ({
  left: b.title,
  right: b.text
}))

// Caça-palavras: palavras do review
const words = lesson.review?.slice(0, difficulty * 3)

// Quebra-cabeça: ilustração + tópico
const illustration = educationalIllustration(lesson.topic, lesson.subject, lesson.id)
```

## Validação de Conteúdo

- ✅ Cada questão tem `prompt + options + answer`
- ✅ Cada bloco tem `title + text`
- ✅ Review tem mínimo 5 palavras
- ✅ Tópico corresponde a uma matéria válida

## Próximos Passos

- [ ] Validador automático de conteúdo por jogo
- [ ] Dashboard de cobertura (qual jogo tem dados para qual aula)
- [ ] Geração de fallbacks quando faltam dados
