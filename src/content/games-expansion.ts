export const GAMES_EXPANSION = {
  // Quiz content: Matemática Fund I
  'mat-fund1-001': {
    quiz: {
      questions: [
        { prompt: 'Qual é 5 + 3?', options: ['7', '8', '9', '6'], correct: 1 },
        { prompt: '10 - 4 = ?', options: ['5', '6', '7', '8'], correct: 0 },
        { prompt: '2 × 6 = ?', options: ['10', '12', '14', '8'], correct: 1 },
      ],
      timeLimit: 120,
    },
  },

  // Memory game: Estados da Matéria
  'cie-fund1-004': {
    memory: {
      pairs: [
        { id: 'sólido', label: 'Sólido', image: '❄️', hint: 'Gelo é...' },
        { id: 'liquido', label: 'Líquido', image: '💧', hint: 'Água é...' },
        { id: 'gasoso', label: 'Gasoso', image: '☁️', hint: 'Ar é...' },
        { id: 'plasma', label: 'Plasma', image: '⚡', hint: 'Raio é...' },
        { id: 'def-solido', label: 'Forma própria', image: '📦', hint: 'Propriedade do sólido' },
        { id: 'def-liquido', label: 'Flui', image: '🌊', hint: 'Propriedade do líquido' },
        { id: 'def-gasoso', label: 'Sem forma', image: '🌬️', hint: 'Propriedade do gás' },
        { id: 'def-plasma', label: 'Ionizado', image: '💥', hint: 'Propriedade do plasma' },
      ],
      difficulty: 2,
    },
  },

  // Matching: Elementos químicos
  'qui-medio-003': {
    matching: {
      pairs: [
        { left: 'Carbono', right: 'C', hint: 'Símbolo carbono' },
        { left: 'Oxigênio', right: 'O', hint: 'Símbolo oxigênio' },
        { left: 'Nitrogênio', right: 'N', hint: 'Símbolo nitrogênio' },
        { left: 'Hidrogênio', right: 'H', hint: 'Símbolo hidrogênio' },
        { left: 'Cloro', right: 'Cl', hint: 'Símbolo cloro' },
        { left: 'Enxofre', right: 'S', hint: 'Símbolo enxofre' },
      ],
      timeLimit: 180,
    },
  },

  // Hangman: Historia
  'his-fund2-003': {
    hangman: {
      words: [
        { word: 'COLONIA', hint: 'Brasil foi uma ___ de Portugal' },
        { word: 'INDEPENDENCIA', hint: 'Brasil conquistou ___ em 1822' },
        { word: 'ESCRAVIDAO', hint: 'Sistema terrível que durou 300 anos no Brasil' },
        { word: 'IMPERIO', hint: 'Pedro II foi um ___ do Brasil' },
      ],
      difficulty: 2,
    },
  },

  // Trivia: Geografia
  'geo-fund2-001': {
    trivia: {
      facts: [
        {
          statement: 'O Brasil é o maior país da América do Sul',
          true: true,
          explanation: 'Sim, 8,5 milhões km² é maior que Argentina',
        },
        {
          statement: 'A Amazônia produz 20% do oxigênio mundial',
          true: true,
          explanation: 'Floresta tropical é pulmão do planeta',
        },
        {
          statement: 'São Paulo é a capital do Brasil',
          true: false,
          explanation: 'Brasília é a capital, São Paulo é maior cidade',
        },
        {
          statement: 'O Rio Amazonas é o mais longo do mundo',
          true: false,
          explanation: 'Rio Nilo é o mais longo; Amazonas é o mais volumoso',
        },
      ],
      timeLimit: 240,
    },
  },

  // Fill-in-the-blanks: Português
  'por-gramatica-001': {
    fillblanks: {
      sentences: [
        {
          sentence: 'O _____ é uma parte fundamental da oração.',
          options: ['sujeito', 'verbo', 'adjetivo', 'preposição'],
          answer: 0,
          hint: 'Aquele que executa a ação',
        },
        {
          sentence: 'A _____ conecta palavras ou orações.',
          options: ['conjunção', 'substantivo', 'advérbio', 'artigo'],
          answer: 0,
          hint: 'E, ou, mas são exemplos',
        },
      ],
    },
  },

  // Ordering: Biologia
  'bio-fund2-002': {
    ordering: {
      items: [
        { text: 'Célula', order: 1, category: 'Complexidade crescente' },
        { text: 'Órgão', order: 3, category: 'Complexidade crescente' },
        { text: 'Organismo', order: 5, category: 'Complexidade crescente' },
        { text: 'Tecido', order: 2, category: 'Complexidade crescente' },
        { text: 'Sistema', order: 4, category: 'Complexidade crescente' },
      ],
      hint: 'Do menor ao maior nível de organização',
    },
  },

  // Drag & Drop: Literatura
  'lit-002': {
    dragdrop: {
      categories: [
        {
          name: 'Figuras de Linguagem',
          items: [
            { id: 'met', label: 'Metáfora', example: '"Teu sorriso é sol"' },
            { id: 'sim', label: 'Símile', example: '"Puro como a neve"' },
            { id: 'hip', label: 'Hipérbole', example: '"Morri de medo"' },
          ],
        },
        {
          name: 'Géneros',
          items: [
            { id: 'rom', label: 'Romance', example: 'Narrativa longa de ficção' },
            { id: 'con', label: 'Conto', example: 'Narrativa curta focada' },
            { id: 'poe', label: 'Poesia', example: 'Verso e rima' },
          ],
        },
      ],
    },
  },

  // Timeline: História
  'his-lote4-001': {
    timeline: {
      events: [
        { year: 1500, event: 'Descobrimento do Brasil (Cabral)', importance: 1 },
        { year: 1822, event: 'Independência do Brasil', importance: 1 },
        { year: 1888, event: 'Abolição da Escravidão', importance: 2 },
        { year: 1889, event: 'Proclamação da República', importance: 1 },
        { year: 1964, event: 'Golpe Militar', importance: 2 },
        { year: 1985, event: 'Redemocratização', importance: 1 },
      ],
      scale: 'century',
    },
  },
}
