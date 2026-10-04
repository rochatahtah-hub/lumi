/**
 * HISTÓRIA — Lote 4 Completo
 * Fundamental I até Ensino Médio + ENEM
 * 28 aulas com progressão pedagógica
 */

import type { Lesson } from '../../types'

// ═══════════════════════════════════════════════════════════════════════════════════
// FUNDAMENTAL I (1º-5º ano) — Introdução à Consciência Histórica
// ═══════════════════════════════════════════════════════════════════════════════════

export const oQuueEHistoria: Lesson = {
  id: 'his-fund1-001',
  subject: 'História',
  grade: '1º ano',
  unit: 'Consciência Histórica',
  topic: 'O que é história',
  subtopic: 'Introdução aos estudos históricos',
  title: 'O que é História?',
  summary: 'Conceito básico de história como estudo do passado e compreensão do presente',
  objectives: [
    'Entender o significado de história',
    'Identificar fontes históricas no dia a dia',
    'Compreender que a história estuda o passado para entender o presente',
    'Reconhecer evidências históricas em objetos antigos'
  ],
  explanation: `História é a ciência que estuda o passado das pessoas, comunidades e povos.

**O que historiaadores fazem?**
- Procuram evidências do passado (objetos, fotos, documentos, construções)
- Investigam como as pessoas viviam
- Organizam e interpretam essas evidências
- Contam histórias verdadeiras sobre o que aconteceu

**Por que estudar história?**
- Entender como chegamos até aqui
- Aprender com os erros e sucessos do passado
- Compreender pessoas diferentes
- Apreciar nossa herança cultural

**Fontes históricas:**
Uma fonte histórica é qualquer coisa que nos conta sobre o passado:
- Objetos antigos (moedas, ferramentas, brinquedos)
- Documentos (cartas, livros, registros)
- Fotos e vídeos
- Histórias contadas por pessoas idosas
- Construções e monumentos
- Obras de arte`,
  simplifiedExplanation: `História conta as histórias verdadeiras de pessoas que viveram no passado.

Os historiadores procuram pistas do passado, como fotos antigas, objetos velhos e histórias contadas pelos avós. Eles usam essas pistas para descobrir como as pessoas viviam.

Estudamos história para aprender como o mundo chegou até hoje e entender por que as coisas são como são.`,
  examples: [
    'Descobrir que você tem uma moeda de 50 anos — você pode aprender sobre como era a economia naquela época',
    'Ouvir avós contarem sobre a infância deles — você aprende como era diferente de hoje',
    'Ver uma foto de uma rua antiga — você percebe que tudo mudou'
  ],
  solvedExamples: [
    {
      question: 'Se você encontrasse uma carta escrita em 1950, o que ela te contaria?',
      answer: 'A carta contaria como as pessoas pensavam, sentiam, viviam e se comunicavam em 1950. Você poderia aprender sobre suas preocupações, alegrias, costumes e valores.'
    },
    {
      question: 'Por que um edifício antigo é importante para a história?',
      answer: 'Um edifício antigo mostra como as pessoas construíam no passado, que tecnologia tinham, quais eram seus valores (arquitetura religiosa, militar, comercial), e como as cidades se desenvolveram.'
    }
  ],
  importantConcepts: [
    'Fonte histórica: qualquer evidência do passado',
    'Cronologia: ordem dos acontecimentos no tempo',
    'Contexto: circunstâncias de uma época',
    'Passado, presente, futuro: dimensões do tempo'
  ],
  keywords: ['história', 'passado', 'fonte histórica', 'historiador', 'evidência', 'cultura'],
  commonMistakes: [
    'Achar que história é só datas e nomes para memorizar (na verdade é entender processos)',
    'Pensar que história acabou no passado (história explica o presente)',
    'Confundir lenda com história verdadeira (história usa fontes verificáveis)'
  ],
  relatedQuestions: [
    'Qual é a diferença entre história e lenda?',
    'Como os historiadores sabem o que aconteceu se ninguém está vivo?',
    'Cada pessoa tem sua história?'
  ],
  difficulty: 1,
  exercises: [
    {
      question: 'O que é uma fonte histórica?',
      options: [
        'Qualquer coisa que conta sobre o passado',
        'Um livro de história',
        'Um museu',
        'Um historiador'
      ],
      answer: 0,
      explanation: 'Uma fonte histórica é qualquer evidência: objeto, documento, foto, construção que nos conta sobre o passado.'
    },
    {
      question: 'Por que estudamos história?',
      options: [
        'Para passar em testes',
        'Para entender como chegamos até aqui e aprender com o passado',
        'Porque o professor manda',
        'Nenhuma razão real'
      ],
      answer: 1,
      explanation: 'História nos ajuda a entender o presente e aprender com experiências passadas.'
    },
    {
      question: 'Qual destas NÃO é uma fonte histórica?',
      options: [
        'Uma carta de 1910',
        'Uma moeda antiga',
        'Uma história inventada sobre dinossauros',
        'Uma foto antiga de uma cidade'
      ],
      answer: 2,
      explanation: 'Uma história inventada não é uma fonte histórica porque não é evidência verdadeira do passado.'
    }
  ],
  tips: [
    'History is everywhere — procure fontes históricas no seu dia a dia',
    'Pergunte aos seus avós sobre suas vidas — são fontes históricas vivas',
    'Museus preservam muitas fontes históricas — visite quando puder',
    'Observe edifícios antigos — eles contam histórias'
  ],
  relatedContent: [
    'his-fund1-002', // Linha do tempo e cronologia
    'his-fund1-003'  // Primeiros povos
  ],
  sources: [
    'BNCC: EF01HI01 - Identificar aspectos do seu crescimento por meio de registros e lembranças',
    'Referência: O que é história? (Vainfas, R.)'
  ]
}

// TODO: Adicionar mais 27 aulas
// Estrutura:
// - Fund I (1º-5º): 6 aulas (conceitos básicos, família, comunidade, Brasil básico)
// - Fund II (6º-9º): 10 aulas (Brasil mais detalhado, mundo, civilizações, períodos)
// - Médio (1º-3º): 12 aulas (Brasil aprofundado, revoluções, ENEM)

// Exportar array para integração com index.ts
export const HISTORIA_LOTE4 = [
  oQuueEHistoria,
  // ... mais aulas
]
