import type { Lesson, Question } from '../../types'

const makeEnemQuestion = (id: string, subject: string, skill: string, prompt: string, opts: string[], ans: number, exp: string): Question => ({
  id, type: 'mc', difficulty: 3, skill, prompt, options: opts, answer: ans, explanation: exp,
  hints: ['Leia com atenção', 'Procure a resposta no texto', 'Elimine alternativas erradas']
})

const ENEM_QUESTIONS: Question[] = [
  makeEnemQuestion('enem-por-001', 'portugues', 'leitura-interpretacao',
    '"A educação é a arma mais poderosa para mudar o mundo." — Nelson Mandela\n\nEsta frase ilustra a função social da educação em qual contexto?',
    ['Econômico (lucro)', 'Político-emancipatório (transformação social)', 'Militar', 'Esportivo'],
    1, 'Mandela enfatiza o poder transformador da educação como ferramenta de mudança social e emancipação.'),

  makeEnemQuestion('enem-mat-001', 'matematica', 'proporcionalidade',
    'Uma loja oferece 20% de desconto em toda a loja. Se um produto custa R$ 150, qual será o preço após o desconto?',
    ['R$ 100', 'R$ 110', 'R$ 120', 'R$ 130'],
    2, '150 × 0,80 = 120 (20% de desconto = paga 80%).'),

  makeEnemQuestion('enem-bio-001', 'biologia', 'ecologia-cadeia',
    'Em uma cadeia alimentar (plantas → gafanhotos → pássaros → gavião), se a população de gafanhotos cair drasticamente, qual será o efeito mais imediato?',
    ['Aumento de plantas', 'Diminuição de pássaros (alimento escasso)', 'Aumento de gaviões', 'Nenhum efeito'],
    1, 'Sem gafanhotos (presa), pássaros têm alimento escasso → população cai.'),

  makeEnemQuestion('enem-fis-001', 'fisica', 'mecanica-forca',
    'Um carro de 1000 kg acelera de 0 a 100 km/h em 10 segundos. Aproximadamente qual é a força resultante?',
    ['1000 N', '2777 N', '10000 N', '100000 N'],
    2, 'F=ma. a=(100 km/h÷3,6÷10s)≈2,77 m/s². F=1000×2,77≈2777 N.'),

  makeEnemQuestion('enem-qui-001', 'quimica', 'reacoes-combustao',
    'Quando gasolina queima em um motor (combustão), qual é o produto principal?',
    ['Oxigênio e monóxido', 'Dióxido de carbono e água', 'Hidrogênio puro', 'Nitrogênio'],
    1, 'Combustão de hidrocarboneto: combustível + O₂ → CO₂ + H₂O.'),

  makeEnemQuestion('enem-his-001', 'historia', 'brasil-colonial',
    'O Brasil foi colônia de Portugal por 300 anos. Qual foi a principal atividade econômica no século XVI?',
    ['Mineração', 'Agricultura (cana-de-açúcar)', 'Comércio de armas', 'Fabricação textil'],
    1, 'Século XVI: exploração de pau-brasil → cana-de-açúcar (monocultura).'),

  makeEnemQuestion('enem-geo-001', 'geografia', 'clima-regiao',
    'A Amazônia é caracterizada por clima equatorial. Qual é a consequência principal deste clima?',
    ['Poucas chuvas', 'Florestas densas (chuva alta + calor)', 'Desertos', 'Frio extremo'],
    1, 'Clima equatorial: alta precipitação + temperatura alta → floresta densa.'),

  makeEnemQuestion('enem-soc-001', 'sociologia', 'estratificacao-social',
    'Qual conceito explica que membros de uma mesma classe social tendem a ter visões similares de mundo?',
    ['Mobilidade social', 'Consciência de classe', 'Anomia', 'Socialização diferencial'],
    1, 'Consciência de classe: compartilham mesma posição → mesma perspectiva.'),

  makeEnemQuestion('enem-filo-001', 'filosofia', 'etica-moral',
    'Segundo Kant, a ação moral verdadeira é aquela feita por qual motivo?',
    ['Por ganho pessoal', 'Por dever (categórico)', 'Por medo', 'Por tradição'],
    1, 'Imperativo categórico de Kant: ação moral por dever, não por consequência.'),

  makeEnemQuestion('enem-lit-001', 'literatura', 'modernismo-brasileiro',
    'A Semana de Arte Moderna de 1922 buscava qual objetivo principal?',
    ['Restaurar tradição colonial', 'Romper com estética europeia, afirmar brasilidade', 'Voltar ao Barroco', 'Copiar Realismo'],
    1, 'Modernismo 22: inovação, nacionalismo, ruptura com passadista.'),

  makeEnemQuestion('enem-red-001', 'redacao', 'dissertacao-enem',
    'Qual estrutura é obrigatória em uma dissertação ENEM?',
    ['Introdução → corpo → conclusão', 'Poesia → prosa', 'Apenas conclusão', 'Sem introdução'],
    0, 'Dissertação: introdução (tese) + corpo (argumentos) + conclusão (síntese).'),

  makeEnemQuestion('enem-edf-001', 'edfisica', 'saude-exercicio',
    'Qual é o benefício principal do exercício aeróbico regular?',
    ['Aumentar peso', 'Fortalecer coração e pulmões', 'Diminuir metabolismo', 'Aumentar pressão arterial'],
    1, 'Aeróbico: aumenta capacidade cardiopulmonar, resistência.'),

  makeEnemQuestion('enem-art-001', 'artes', 'historia-arte-moderna',
    'Qual movimento artístico do século XX buscava representar a realidade de forma deformada e expressiva?',
    ['Impressionismo', 'Expressionismo', 'Renascença', 'Barroco'],
    1, 'Expressionismo: deformação para expressar emoção, não mimesis.'),

  // Questões adicionais (mais 12 = 25 total)
  makeEnemQuestion('enem-por-002', 'portugues', 'leitura-ironia',
    '"Ah, que felicidade morar em uma metrópole com ar puro e ruas limpas!" (dito em São Paulo durante chuva ácida)',
    ['Literal', 'Irônico (crítica ao contrário)', 'Confuso', 'Científico'],
    1, 'Ironia: diz o oposto do que pensa para criticar.'),

  makeEnemQuestion('enem-mat-002', 'matematica', 'progressoes',
    'Uma sequência: 2, 4, 8, 16, ... Qual é o padrão?',
    ['Soma +2', 'Multiplica ×2', 'Subtrai -2', 'Divide ÷2'],
    1, 'Progressão geométrica: cada termo é anterior ×2.'),

  makeEnemQuestion('enem-bio-002', 'biologia', 'genetica-mendel',
    'Se um pai tem sangue tipo AB e mãe tipo O, qual pode ser o sangue do filho?',
    ['A ou B (não O)', 'AB ou O', 'Qualquer um', 'Nenhum'],
    0, 'AB (I^A I^B) + O (ii) → A (I^A i) ou B (I^B i).'),

  makeEnemQuestion('enem-fis-002', 'fisica', 'termodinamica',
    'Por que a 2ª lei da termodinâmica diz que calor não flui de frio para quente sozinho?',
    ['Viola energia', 'Violaria ordenamento natural', 'É tecnicamente possível', 'Sem razão'],
    1, 'Lei da entropia: desordem sempre aumenta; calor flui de quente→frio.'),

  makeEnemQuestion('enem-qui-002', 'quimica', 'periodic-tendencias',
    'Na tabela periódica, o que aumenta da esquerda para a direita (um período)?',
    ['Tamanho atômico', 'Eletronegatividade', 'Raio iônico', 'Metalicidade'],
    1, 'Tendência periódica: núcleo puxa elétrons mais forte → eletronegatividade sobe.'),

  makeEnemQuestion('enem-his-002', 'historia', 'guerra-fria',
    'Qual foi o principal confronto ideológico da Guerra Fria?',
    ['Fascismo vs Comunismo', 'Capitalismo (EUA) vs Comunismo (URSS)', 'Monarquia vs República', 'Religião vs Ciência'],
    1, 'Guerra Fria: bipolarismo ideológico EUA-URSS sem conflito direto.'),

  makeEnemQuestion('enem-geo-002', 'geografia', 'desenvolvimento',
    'Qual indicador mede o desenvolvimento de um país de forma mais abrangente que PIB?',
    ['PIB per capita', 'IDH (Índice Desenvolvimento Humano)', 'População', 'Área territorial'],
    1, 'IDH: educação + renda + saúde (mais amplo que PIB).'),

  makeEnemQuestion('enem-soc-002', 'sociologia', 'cultura',
    'Qual é a definição antropológica de cultura?',
    ['Arte clássica europeia', 'Conjunto de valores, crenças, costumes de grupo', 'Música e dança', 'Educação formal'],
    1, 'Cultura: tudo que grupo aprende, compartilha, transmite (não apenas arte).'),

  makeEnemQuestion('enem-filo-002', 'filosofia', 'conhecimento',
    'Qual corrente afirma que conhecimento válido vem apenas da experiência sensorial?',
    ['Racionalismo', 'Empirismo', 'Idealismo', 'Niilismo'],
    1, 'Empirismo (Locke, Hume): sentidos são fonte do conhecimento.'),

  makeEnemQuestion('enem-lit-002', 'literatura', 'romantismo-brasil',
    'Qual tema é central no Romantismo brasileiro?',
    ['Realidade social crua', 'Natureza, emoção, nacionalismo', 'Lógica científica', 'Crítica satírica'],
    1, 'Romantismo: exaltação da natureza, emoção, brasilidade, liberdade.'),

  makeEnemQuestion('enem-red-002', 'redacao', 'proposta-enem',
    'Uma dissertação ENEM sobre tecnologia. Qual é o tipo de argumento mais forte?',
    ['Opinião pessoal', 'Dados estatísticos (concreto)', 'Intuição', 'Rumor'],
    1, 'Argumentação: dados, exemplos concretos, autoridade > opinião.'),
]

export const ENEM_AREA: Lesson[] = ENEM_QUESTIONS.map((q) => ({
  id: q.id,
  subject: q.id.split('-')[1] as any,
  grade: '3º Médio',
  title: 'Questão ENEM ' + q.id,
  levels: ['medio'],
  aliases: ['enem', 'exame'],
  summary: 'Questão contextualizada ENEM',
  intro: 'Simulado ENEM.',
  objective: 'Resolver questão estilo ENEM',
  topic: 'ENEM',
  subtopic: 'Questões',
  blocks: [{id: 'b1', title: 'Questão', text: q.prompt, example: ''}],
  questions: [q],
  skills: {[q.skill]: 'Habilidade ENEM'},
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: []
}))
