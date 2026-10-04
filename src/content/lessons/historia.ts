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

// ═══════════════════════════════════════════════════════════════════════════════════
// AULAS 2-6: FUNDAMENTAL I (resto)
// ═══════════════════════════════════════════════════════════════════════════════════

export const linhaTempoECronologia: Lesson = {
  id: 'his-fund1-002',
  subject: 'História',
  grade: '2º ano',
  unit: 'Consciência Histórica',
  topic: 'Tempo e Sequência',
  title: 'Linha do Tempo e Cronologia',
  summary: 'Compreender sequência de eventos: antes, durante, depois; passado, presente',
  objectives: [
    'Entender conceito de cronologia (ordem de eventos)',
    'Criar linhas do tempo simples',
    'Distinguir antes/depois e passado/presente',
    'Ordenar fatos em sequência temporal'
  ],
  explanation: `Uma **cronologia** é uma sequência ordenada de eventos no tempo.

Quando estudamos história, precisamos entender QUANDO as coisas aconteceram e em QUE ORDEM.

**Exemplos de cronologia:**
- Sua vida: nascimento → 1º ano → 2º ano → hoje
- História Brasil: 1500 (Cabral) → 1822 (Independência) → 1889 (República) → hoje

**Linha do tempo:**
É uma representação visual de eventos em ordem. Parece assim:

```
1500 --- 1822 --- 1889 --- 1930 --- 1985 --- 2024
 |        |        |        |        |        |
Cabral   Indep.   República Vargas  Democr. Hoje
```

**Por que é importante?**
- Entender que eventos têm ordem lógica
- Ver transformações ao longo do tempo
- Compreender causa e efeito histórico
- Situar-se no tempo presente`,
  simplifiedExplanation: `Uma cronologia coloca os eventos em ordem: o que aconteceu primeiro, depois, por último.

Imagine sua vida: você nasceu primeiro, depois aprendeu a andar, depois começou a escola. Isso é uma cronologia.

História também tem ordem: Portugal descobriu o Brasil em 1500, o Brasil ficou independente em 1822, virou república em 1889.`,
  examples: [
    'Minha vida: nasci → aprendi a falar → entrei na escola → estou no 2º ano',
    'História do Brasil: Índios viviam aqui → chegaram portugueses → escravidão → independência',
    'Tecnologia: computador → internet → celular → internet móvel'
  ],
  solvedExamples: [
    {
      question: 'Coloque em ordem: República (1889), Cabral (1500), Independência (1822)',
      answer: '1500 (Cabral) → 1822 (Independência) → 1889 (República)'
    }
  ],
  importantConcepts: [
    'Cronologia: sequência de eventos no tempo',
    'Antes: evento que ocorreu primeiro',
    'Depois: evento que ocorreu posteriormente',
    'Passado: o que já aconteceu',
    'Presente: agora'
  ],
  keywords: ['cronologia', 'linha do tempo', 'antes', 'depois', 'ordem', 'sequência'],
  commonMistakes: [
    'Confundir ordem de eventos',
    'Pensar que todos os eventos da mesma "época" têm mesma data exata',
    'Não considerar que eventos podem ter durado anos'
  ],
  difficulty: 1,
  exercises: [
    {
      question: 'Em uma cronologia, o que vem PRIMEIRO?',
      options: [
        'O evento mais recente',
        'O evento mais antigo',
        'O evento mais importante',
        'Qualquer evento'
      ],
      answer: 1,
      explanation: 'Em cronologia, colocamos os eventos em ordem: do mais antigo para o mais recente.'
    }
  ],
  relatedContent: ['his-fund1-003'],
  sources: ['BNCC: EF01HI02']
}

export const minhaFamiliaEHistoria: Lesson = {
  id: 'his-fund1-003',
  subject: 'História',
  grade: '1º ano',
  unit: 'Identidade e Origem',
  topic: 'Família',
  title: 'Minha Família e Minha História',
  summary: 'Reconhecer que cada pessoa e família tem uma história própria e ancestrais',
  objectives: [
    'Identificar membros da família (pais, avós, tios)',
    'Entender conceito de ancestrais',
    'Valorizar tradições familiares',
    'Compreender própria história pessoal'
  ],
  explanation: `Cada pessoa tem uma história. Você não começou do zero — você é resultado de uma longa cadeia de pessoas: seus pais, avós, bisavós, etc.

**Árvore genealógica** é um diagrama que mostra sua família.

Você tem:
- Pais (pai e mãe)
- Avós (4: avó/avô materno e paterno)
- Bisavós (8)
- E assim vai...

**Por que estudar sua história?**
- Entender de onde você vem
- Valorizar suas raízes culturais
- Apreciar sacrifícios e lutas de ancestrais
- Reconhecer tradições (comidas, festas, sotaque)

**Documentos familiares:**
Certidão de nascimento, casamento, fotografias antigas, cartas, bíblia da família — tudo isso conta história.`,
  simplifiedExplanation: `Você tem uma história. Seus pais tiveram pais (seus avós), e eles tiveram pais também.

Cada pessoa da sua família tem sua própria história. Juntas formam SUA história.

Você pode desenhar uma árvore genealógica: você no tronco, seus pais nos galhos, seus avós em galhos maiores.`,
  examples: [
    'Meu avó nasceu em outro país e imigrou para o Brasil',
    'Minha avó sabe receitas de comida que sua mãe ensinou',
    'Minha família tem tradição de celebrar o Natal de um jeito especial'
  ],
  difficulty: 1,
  exercises: [
    {
      question: 'Os pais de sua mãe são:',
      options: [
        'Seus tios',
        'Seus primos',
        'Seus avós',
        'Seus bisavós'
      ],
      answer: 2,
      explanation: 'Os pais de sua mãe (ou pai) são seus avós.'
    }
  ],
  relatedContent: ['his-fund1-004'],
  sources: ['BNCC: EF01HI03']
}

export const minhaComundadeOntemEHoje: Lesson = {
  id: 'his-fund1-004',
  subject: 'História',
  grade: '3º ano',
  unit: 'Comunidade',
  topic: 'Transformação Local',
  title: 'Minha Comunidade — Ontem e Hoje',
  summary: 'Perceber transformações na comunidade local comparando passado e presente',
  objectives: [
    'Identificar mudanças na comunidade',
    'Coletar fotos/depoimentos do passado',
    'Compreender progresso local',
    'Apreciar história do bairro/cidade'
  ],
  explanation: `Sua comunidade (bairro, cidade) mudou muito ao longo do tempo.

**Como era antes?**
- Ruas de terra (agora asfaltadas)
- Casarões antigos (agora prédios)
- Poucos carros (agora congestionado)
- Comércios antigos (agora shoppings)

**Como descobrir essas mudanças?**
1. Pergunte aos avós "como era aqui?"
2. Procure fotos antigas
3. Visite museus locais
4. Leia jornais antigos na biblioteca

**Por que isso importa?**
- Entender que tudo muda
- Apreciar progresso
- Valorizar memória coletiva
- Reconhecer que futuro tb será diferente`,
  difficulty: 2,
  exercises: [
    {
      question: 'Como você poderia descobrir como era sua comunidade há 50 anos?',
      options: [
        'Perguntando para pessoas idosas',
        'Procurando fotos antigas',
        'Lendo jornais da época',
        'Todas as alternativas acima'
      ],
      answer: 3,
      explanation: 'Todas são fontes históricas que nos contam sobre o passado.'
    }
  ],
  relatedContent: ['his-fund1-005'],
  sources: ['BNCC: EF03HI07']
}

export const osPrimeirosPovosDoBrasil: Lesson = {
  id: 'his-fund1-005',
  subject: 'História',
  grade: '4º ano',
  unit: 'Brasil Pré-Colonial',
  topic: 'Povos Indígenas',
  title: 'Os Primeiros Povos do Brasil',
  summary: 'Conhecer os povos indígenas que habitavam o Brasil antes da chegada dos portugueses',
  objectives: [
    'Reconhecer diversidade indígena (tribos diferentes)',
    'Entender como viviam (habitat, alimentação, arte)',
    'Valorizar cultura indígena',
    'Compreender que Brasil não era vazio'
  ],
  explanation: `Antes dos portugueses chegarem (1500), o Brasil era habitado por **povos indígenas**.

**Quem eram?**
Diferentes etnias: Tupis, Guaranis, Aimorés, Tamoios, etc. Cada uma com língua, costumes, territórios próprios.

**Como viviam?**
- Construíam ocas (casas de palha/madeira)
- Caçavam, pescavam, cultivavam mandioca
- Faziam cerâmica e tecelagem
- Tinham religião, festas, arte (pinturas corporais, plumas)
- Conviviam com natureza

**Legado indígena no Brasil:**
- Palavras: jaguar, canoa, xucro, piranha
- Comidas: mandioca, milho, cacau, açaí
- Técnicas: rede para dormir, canoa
- Conhecimento: plantas medicinais

**Tragédia da colonização:**
Quando portugueses chegaram, índios sofreram escravidão, doenças, morte. Muitos povos foram exterminados.`,
  difficulty: 2,
  exercises: [
    {
      question: 'O que é uma oca?',
      options: [
        'Um ritual indígena',
        'Uma habitação indígena',
        'Uma arma indígena',
        'Uma língua indígena'
      ],
      answer: 1,
      explanation: 'Oca é a casa que povos indígenas construíam com madeira e palha.'
    }
  ],
  relatedContent: ['his-fund1-006'],
  sources: ['BNCC: EF04HI01']
}

export const chegadaDosPortugueses: Lesson = {
  id: 'his-fund1-006',
  subject: 'História',
  grade: '4º ano',
  unit: 'Brasil Colonial',
  topic: 'Descobrimento',
  title: 'Chegada dos Portugueses (1500)',
  summary: 'Compreender contexto da Expansão Marítima e chegada de Cabral ao Brasil',
  objectives: [
    'Conhecer Expansão Marítima portuguesa',
    'Entender motivos da chegada (busca por ouro e especiarias)',
    'Compreender choque de culturas',
    'Situar 1500 historicamente'
  ],
  explanation: `No final de 1400 e início de 1500, Portugal estava em **Expansão Marítima** — exploradores portugueses navegavam mundo afora em busca de ouro, especiarias (pimenta, cravo) e rotas comerciais.

**Quem era Cabral?**
Pedro Álvares Cabral (1467-1520), navegador português, comandava uma frota a caminho da Índia. Por tempestade, desviou para o Brasil (1500).

**Encontro de culturas:**
- Portugueses: europeus, cristãos, com navios, armas
- Indígenas: povos originários, sem escrita, viviam em harmonia com natureza

**O que Portugal fez?**
1. Reconheceu terra como posse portuguesa (Tratado Tordesilhas)
2. Começou colonização (1534 — Capitanias Hereditárias)
3. Escravizou índios
4. Trouxe africanos escravizados
5. Implantou língua portuguesa, religião católica

**Consequência:**
Brasil se tornou colônia portuguesa por 322 anos (1500-1822).`,
  difficulty: 2,
  exercises: [
    {
      question: 'Em que ano Cabral chegou ao Brasil?',
      options: ['1400', '1500', '1600', '1700'],
      answer: 1,
      explanation: 'Pedro Álvares Cabral chegou ao Brasil em 1500.'
    }
  ],
  relatedContent: ['his-fund2-007'],
  sources: ['BNCC: EF04HI02']
}

// ═══════════════════════════════════════════════════════════════════════════════════
// AULAS 7-16: FUNDAMENTAL II (selecionadas)
// ═══════════════════════════════════════════════════════════════════════════════════

export const brasilColonialEscravidao: Lesson = {
  id: 'his-fund2-007',
  subject: 'História',
  grade: '6º ano',
  unit: 'Brasil Colonial',
  topic: 'Escravidão',
  title: 'Brasil Colonial — Escravidão Africana',
  summary: 'Compreender tráfico negreiro, vida do escravo, resistência e quilombos',
  objectives: [
    'Entender tráfico negreiro e escravidão',
    'Aprender sobre Palmares e resistência',
    'Refletir sobre injustiça e legado',
    'Apreciar contribuições africanas'
  ],
  explanation: `Quando portugueses colonizaram Brasil, precisavam de **mão de obra** para trabalhar em plantações de açúcar.

Primeiro escravizaram indígenas. Mas indígenas morriam de doenças, eram poucos, conheciam a terra. Então portugueses trouxeram africanos escravizados.

**Tráfico negreiro:**
Navios europeus iam para África, compravam/capturavam pessoas, as acorrentavam nos porões. Muitos morriam na travessia.

**Vida do escravo:**
- Trabalho brutal (12+ horas/dia)
- Açoites, punições, morte
- Sem direitos, propriedade do senhor
- Famílias separadas

**Resistência:**
Escravos fugiam e criavam **quilombos** (comunidades livres). O maior: **Palmares** (séc XVII), liderado por **Zumbi**. Durou quase 100 anos antes de ser destruído.

**Legado africano:**
Música, culinária, danças (samba, frevo), religião (candomblé), idioma (palavras como "samba", "berimbau").

**Quando terminou?**
Escravidão foi abolida em 1888 — mas a desigualdade permanece.`,
  difficulty: 3,
  exercises: [
    {
      question: 'Quilombo era:',
      options: [
        'Uma plantação de açúcar',
        'Uma comunidade de escravos fugidos',
        'Um navio negreiro',
        'Um castigo para escravos'
      ],
      answer: 1,
      explanation: 'Quilombo era uma comunidade formada por escravos que conseguiam fugir.'
    }
  ],
  relatedContent: ['his-fund2-008', 'his-fund2-009'],
  sources: ['BNCC: EF06HI08']
}

export const revolucaoFrancesa: Lesson = {
  id: 'his-fund2-008',
  subject: 'História',
  grade: '8º ano',
  unit: 'História Mundial',
  topic: 'Revoluções',
  title: 'Revolução Francesa (1789) — Liberdade, Igualdade, Fraternidade',
  summary: 'Compreender maior revolução social: causas, fases, impacto mundial',
  objectives: [
    'Entender causas (crise econômica, desigualdade)',
    'Conhecer fases (Assembleia, Terror, Napoleão)',
    'Apreciar conceitos revolucionários',
    'Conectar com mundo moderno'
  ],
  explanation: `A **Revolução Francesa (1789)** foi um ponto de virada na história mundial. Transformou completamente a forma de pensar sobre direitos e governo.

**Causas:**
- Rei Luís XVI: extravagante, gastava demais
- Povo: faminto, pagava impostos altos
- Burguesia: rica mas sem poder político
- Iluminismo: ideias de Rousseau, Voltaire sobre direitos

**Fases:**
1. **Assembleia Nacional (1789):** nobres + burguesia + povo votam
   - Declaram Direitos Humanos
   - Acabam com feudalismo
   - Criam constituição

2. **Terror (1793-1794):** Robespierre
   - Guilhotina mata milhares
   - Perseguição a nobres, burguesia moderada, religiosos
   - Regime de medo

3. **Napoleão (1799-1815):**
   - Toma poder
   - Cria Código Civil (leis justas)
   - Conquista Europa
   - Cai em 1815

**Impacto:**
- Direitos Humanos se tornam conceito universal
- Nacionalismo emerge
- Monarquia absoluta cai (gradualmente)
- Inspiração para revoluções mundo afora
- Brasil sente influência (Inconfidência Mineira, 1792)

**Lema revolucionário:**
"Liberdade, Igualdade, Fraternidade"`,
  difficulty: 3,
  exercises: [
    {
      question: 'Qual foi o principal impacto da Revolução Francesa?',
      options: [
        'Derrotar Napoleão',
        'Estabelecer direitos humanos universais',
        'Criar a monarquia constitucional',
        'Expandir o império francês'
      ],
      answer: 1,
      explanation: 'A Revolução Francesa estabeleceu conceitos de direitos humanos que influenciam até hoje.'
    }
  ],
  relatedContent: ['his-fund2-009'],
  sources: ['BNCC: EF08HI27']
}

export const segundaGuerraMundial: Lesson = {
  id: 'his-medio-009',
  subject: 'História',
  grade: '2º ano Médio',
  unit: 'História Contemporânea',
  topic: 'Conflito Mundial',
  title: 'Segunda Guerra Mundial (1939-1945)',
  summary: 'Maior conflito da história: causas, combatentes, Holocausto, consequências',
  objectives: [
    'Entender ascensão do nazifascismo',
    'Conhecer principais eventos e potências',
    'Compreender Holocausto',
    'Apreciar importância de democracia'
  ],
  explanation: `A **Segunda Guerra Mundial (1939-1945)** foi o maior conflito da história. Envolveu 70+ países. Matou 70+ milhões.

**Causas:**
- Humilhação alemã pós-WWI (Tratado Versalhes)
- Crise econômica (1929)
- Ascensão Hitler e nazismo
- Expansionismo italiano e japonês
- Falha da Liga das Nações

**Combatentes principais:**
- **Eixo:** Alemanha (Hitler), Itália (Mussolini), Japão
- **Aliados:** Grã-Bretanha, União Soviética, EUA (1941+), China

**Eventos-chave:**
- 1939: Alemanha invade Polônia
- 1941: Hitler invade URSS
- 1941: Japão ataca Pearl Harbor (EUA entra)
- 1944: Desembarque na Normandia (D-Day)
- 1945: Bombas em Hiroshima/Nagasaki
- 1945: Rendição da Alemanha (maio) e Japão (setembro)

**Holocausto:**
Genocídio de 6 milhões de judeus pelos nazistas. Também: 5 milhões de não-judeus (roma, deficientes, prisioneiros). Maior atrocidade do século XX.

**Brasil:**
Enviou tropas (FEB) ao lado dos Aliados.

**Consequência:**
- Criação ONU (1945)
- Divisão Berlim (Guerra Fria)
- Ascensão EUA e URSS
- Direitos Humanos como prioridade
- Descolonização da Ásia/África`,
  difficulty: 4,
  exercises: [
    {
      question: 'Qual foi o principal motivo de Hitler iniciar a Segunda Guerra?',
      options: [
        'Vingar a Primeira Guerra',
        'Conquistar lebensraum (espaço vital) e expandir império',
        'Defender a Alemanha de invasão',
        'Ajudar seus aliados'
      ],
      answer: 1,
      explanation: 'Hitler buscava expandir o "espaço vital" para o povo germânico, conquistando terras a leste.'
    }
  ],
  relatedContent: ['his-medio-010'],
  sources: ['BNCC: EF09HI29']
}

export const guerraFria: Lesson = {
  id: 'his-medio-010',
  subject: 'História',
  grade: '3º ano Médio',
  unit: 'História Contemporânea',
  topic: 'Bipolarismo',
  title: 'Guerra Fria (1947-1991) — Capitalismo vs Comunismo',
  summary: 'Compreender 44 anos de tensão EUA-URSS que moldaram o mundo moderno',
  objectives: [
    'Entender divisão ideológica Leste-Oeste',
    'Conhecer conflitos proxy (Coreia, Vietnã)',
    'Apreciar corrida nuclear e espacial',
    'Compreender queda da URSS'
  ],
  explanation: `Após WWII, mundo se dividiu: **EUA (capitalismo)** vs **URSS (comunismo)**. Não havia guerra direta, mas tensão extrema por 44 anos.

**Por que "fria"?**
- Não havia combate direto EUA-URSS
- Havia ameaça nuclear (MAD: Mutual Assured Destruction)
- Conflitos indiretos em países terceiros

**Características:**
- Corrida nuclear (arsenal crescente)
- Corrida espacial (Sputnik 1957, Lua 1969)
- Divisão Berlim: Muro (1961-1989)
- Dois blocos: OTAN (Oeste) vs Pacto de Varsóvia (Leste)

**Conflitos proxy:**
- Guerra Coreia (1950-1953): 2 milhões de mortes
- Crise de Mísseis em Cuba (1962): quase Guerra Nuclear
- Guerra Vietnã (1955-1975): 3 milhões de mortes
- Invasão Afeganistão (1979-1989)

**Corrida Espacial:**
- Soviéticos: Sputnik (1957), Gagarin orbita Terra (1961)
- EUA: Apollo 11 pousa na Lua (1969)
- Símbolo de superioridade tecnológica

**Fim:**
- URSS economicamente exaurida
- Gorbachev tenta reformas (Glasnost, Perestroika)
- Queda Muro de Berlim (1989)
- Colapso URSS (1991)
- Mundo unipolar (EUA como superpotência)

**Brasil:**
Ditadura militar (1964-1985) era alinhada ao bloco Ocidental.`,
  difficulty: 4,
  exercises: [
    {
      question: 'Por que a Guerra Fria era "fria"?',
      options: [
        'Porque nunca houve conflito real',
        'Porque EUA e URSS não tinham conflitos',
        'Porque não havia guerra direta entre as superpotências, apenas tensão',
        'Porque aconteceu em países frios'
      ],
      answer: 2,
      explanation: 'Guerra Fria era chamada assim porque não havia combate direto entre EUA e URSS, apenas confronto ideológico e conflitos indiretos.'
    }
  ],
  relatedContent: ['his-medio-011'],
  sources: ['BNCC: EF09HI31']
}

export const ditaduraMilitarBrasileira: Lesson = {
  id: 'his-medio-011',
  subject: 'História',
  grade: '3º ano Médio',
  unit: 'História do Brasil Contemporâneo',
  topic: 'Ditadura (1964-1985)',
  title: 'Ditadura Militar Brasileira (1964-1985)',
  summary: 'Período sombrio de 21 anos: golpe, repressão, anistia, redemocratização',
  objectives: [
    'Entender contexto de golpe (1964)',
    'Conhecer repressão, AI-5, tortura',
    'Apreciar resistência (estudantes, guerrilha)',
    'Compreender redemocratização'
  ],
  explanation: `Em 31 de março de 1964, militares deram golpe contra presidente João Goulart ("Jango"). Instalaram ditadura por 21 anos.

**Por que golpe?**
- Jango era visto como esquerdista
- Reforma de base (agrária, educacional) assustava elite
- Guerra Fria: EUA apoiava golpe (vs comunismo)
- Medo de revolução

**Fases:**
1. **Castelo Branco (1964-67):** repressão moderada
2. **Costa e Silva (1967-69):** recrudescimento
3. **Médici (1969-74):** "anos de chumbo" — máxima repressão
4. **Geisel (1974-79):** "abertura lenta"
5. **Figueiredo (1979-85):** transição democrática

**Instrumentos de repressão:**
- AI-5 (1968): censura total, sem direito de manifestação
- DOPS/SNI: polícia política, espionagem
- Tortura sistemática
- Desaparecimento de ativistas
- Censura de mídia, música, cinema

**Resistência:**
- Estudantes (manifestações 1968)
- Guerrilha urbana (ALN, MR-8)
- Trabalhadores (greves)
- Igreja (lado humanitário)

**Anistia (1979):**
Lei que perdoava presos políticos e exilados. Mas também perdoava torturadores — controvertido.

**Redemocratização:**
- Eleições indiretas (1980)
- Abertura (1981)
- Diretas Já (1984): movimento por eleição direta
- Tancredo Neves eleito (morre sem assumir)
- Sarney assume
- Constituição 1988

**Legado:**
- Trauma nacional
- Nunca houve julgamento de torturadores (à diferença de outros países)
- Repressão institucionalizada
- Criação Comissão Verdade (2012)`,
  difficulty: 4,
  exercises: [
    {
      question: 'O AI-5 foi:',
      options: [
        'Uma lei de proteção de direitos',
        'Um ato que suspendeu direitos democráticos e promoveu censura total',
        'Uma constituição democrática',
        'Um acordo com EUA'
      ],
      answer: 1,
      explanation: 'AI-5 (Ato Institucional #5, 1968) foi o instrumento que permitiu máxima repressão durante a ditadura.'
    }
  ],
  relatedContent: ['his-medio-012'],
  sources: ['BNCC: EF09HI36']
}

// Exportar array para integração com index.ts
export const HISTORIA_LOTE4 = [
  oQuueEHistoria,
  linhaTempoECronologia,
  minhaFamiliaEHistoria,
  minhaComundadeOntemEHoje,
  osPrimeirosPovosDoBrasil,
  chegadaDosPortugueses,
  brasilColonialEscravidao,
  revolucaoFrancesa,
  segundaGuerraMundial,
  guerraFria,
  ditaduraMilitarBrasileira,
  // TODO: Adicionar 17 aulas restantes (Fund II completo + Médio)
]
