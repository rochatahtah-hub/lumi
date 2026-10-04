import type { Lesson, SubjectId } from '../../types'

const makeLesson = (id: string, subject: SubjectId, title: string, summary: string): Lesson => ({
  id, subject, grade: '8º-3º Médio', title, levels: ['fund2', 'medio'], aliases: [title.toLowerCase()],
  summary, intro: summary, objective: 'Aprender ' + title, topic: 'Geral', subtopic: 'Base',
  blocks: [{id: 'b1', title, text: summary + '. Fundamental para entender mundo.', example: 'Aplicação prática.'}],
  questions: [{id: 'q1', type: 'mc', difficulty: 1, skill: id, prompt: 'O que é ' + title + '?',
    options: [summary, 'Nada relacionado', 'Tipo de comida', 'Idioma'], answer: 0, explanation: summary + '.',
    hints: ['Dica 1: Definiçã', 'Dica 2: Importante', 'Dica 3: Estude']}],
  skills: {[id]: 'Entender ' + title}, review: [], commonDoubts: [], commonErrors: [],
  prerequisites: [], next: []
})

export const FILOSOFIA_LOTE9: Lesson[] = [
  makeLesson('filo-001', 'filosofia', 'Epistemologia', 'Estudo do conhecimento: como sabemos o que sabemos'),
  makeLesson('filo-002', 'filosofia', 'Ética', 'Estudo do certo e errado, moralidade e virtude'),
  makeLesson('filo-003', 'filosofia', 'Lógica', 'Estudo do raciocínio válido e argumento correto'),
  makeLesson('filo-004', 'filosofia', 'Metafísica', 'Estudo da realidade, existência e natureza'),
  makeLesson('filo-005', 'filosofia', 'Estética', 'Estudo da beleza, arte e experiência estética'),
  makeLesson('filo-006', 'filosofia', 'Filosofia Política', 'Estudo do poder, justiça e sociedade'),
  makeLesson('filo-007', 'filosofia', 'Filosofia da Mente', 'Estudo da consciência e pensamento'),
  makeLesson('filo-008', 'filosofia', 'Existencialismo', 'Filosofia de liberdade, angústia e significado'),
]

export const SOCIOLOGIA_LOTE10: Lesson[] = [
  makeLesson('soc-001', 'sociologia', 'O que é Sociologia', 'Estudo científico da sociedade e comportamento social'),
  makeLesson('soc-002', 'sociologia', 'Cultura', 'Valores, normas, costumes compartilhados por grupo'),
  makeLesson('soc-003', 'sociologia', 'Instituições Sociais', 'Família, educação, religião, governo estruturam sociedade'),
  makeLesson('soc-004', 'sociologia', 'Estratificação Social', 'Classe, raça, gênero: desigualdade estrutural'),
  makeLesson('soc-005', 'sociologia', 'Socialização', 'Processo de aprender normas e valores da sociedade'),
  makeLesson('soc-006', 'sociologia', 'Deviance e Conformidade', 'Por que alguns quebram regras, maioria segue'),
  makeLesson('soc-007', 'sociologia', 'Mudança Social', 'Como sociedade evolui e transforma'),
  makeLesson('soc-008', 'sociologia', 'Globalização', 'Mundo cada vez mais conectado, inter-dependente'),
]

export const REDACAO_LOTE12: Lesson[] = [
  makeLesson('red-001', 'redacao', 'Elementos da Redação', 'Coerência, coesão, clareza, objetividade'),
  makeLesson('red-002', 'redacao', 'Tipos de Texto', 'Narrativo, descritivo, expositivo, argumentativo'),
  makeLesson('red-003', 'redacao', 'Narração', 'Contar uma história com começo, meio, fim'),
  makeLesson('red-004', 'redacao', 'Descrição', 'Detalhar características de pessoas, lugares, coisas'),
  makeLesson('red-005', 'redacao', 'Exposição', 'Explicar conceitos, informar, instruir'),
  makeLesson('red-006', 'redacao', 'Argumentação', 'Convencer com razões e evidências'),
  makeLesson('red-007', 'redacao', 'Dissertação ENEM', 'Argumentativa sobre tema contemporâneo'),
  makeLesson('red-008', 'redacao', 'Estrutura de Parágrafos', 'Tópico, desenvolvimento, conclusão'),
  makeLesson('red-009', 'redacao', 'Coesão Textual', 'Conectar ideias com conectivos apropriados'),
  makeLesson('red-010', 'redacao', 'Coerência Textual', 'Manter lógica e consistência de ideias'),
]

export const ARTES_LOTE13: Lesson[] = [
  makeLesson('art-001', 'artes', 'História da Arte', 'Evolução da arte de pré-história ao moderno'),
  makeLesson('art-002', 'artes', 'Pintura', 'Técnicas, estilos, mestres da pintura'),
  makeLesson('art-003', 'artes', 'Escultura', 'Forma, volume, espaço em três dimensões'),
  makeLesson('art-004', 'artes', 'Arquitetura', 'Estrutura, design, construção de espaços'),
  makeLesson('art-005', 'artes', 'Arte Moderna', 'Cubismo, Surrealismo, Abstracionismo'),
  makeLesson('art-006', 'artes', 'Arte Contemporânea', 'Instalação, digital, conceitual'),
  makeLesson('art-007', 'artes', 'Arte Africana', 'Máscaras, esculturas, influência global'),
  makeLesson('art-008', 'artes', 'Arte Indígena Brasileira', 'Artesanato, pintura, significado cultural'),
]

export const EDFISICA_LOTE14: Lesson[] = [
  makeLesson('edf-001', 'edfisica', 'Sistemas do Corpo Humano', 'Cardíaco, respiratório, muscular, nervoso'),
  makeLesson('edf-002', 'edfisica', 'Treinamento Aeróbico', 'Corrida, natação, ciclismo para coração'),
  makeLesson('edf-003', 'edfisica', 'Treinamento Anaeróbico', 'Musculação, velocidade, força explosiva'),
  makeLesson('edf-004', 'edfisica', 'Flexibilidade e Alongamento', 'Amplitude de movimento, lesão prevenção'),
  makeLesson('edf-005', 'edfisica', 'Nutrição para Atletas', 'Carboidratos, proteínas, hidratação'),
  makeLesson('edf-006', 'edfisica', 'Saúde Mental e Exercício', 'Depressão, ansiedade, benefício mental'),
  makeLesson('edf-007', 'edfisica', 'Lesões Esportivas', 'Prevenção e reabilitação'),
  makeLesson('edf-008', 'edfisica', 'Esportes Coletivos', 'Futebol, vôlei, basquete, trabalho em time'),
]

export const LITERATURA_LOTE15: Lesson[] = [
  makeLesson('lit-001', 'literatura', 'Gêneros Literários', 'Prosa, poesia, drama, épico'),
  makeLesson('lit-002', 'literatura', 'Romantismo', 'Século XIX, emoção, liberdade, natureza'),
  makeLesson('lit-003', 'literatura', 'Realismo', 'Observação crítica, denúncia social'),
  makeLesson('lit-004', 'literatura', 'Modernismo Brasileiro', 'Semana 22, inovação, brasilidade'),
  makeLesson('lit-005', 'literatura', 'Poesia', 'Verso, rima, métrica, figuras de linguagem'),
  makeLesson('lit-006', 'literatura', 'Romance', 'Narrativa longa, personagens, conflito'),
  makeLesson('lit-007', 'literatura', 'Conto', 'Narrativa curta, foco, desfecho impactante'),
  makeLesson('lit-008', 'literatura', 'Autores Brasileiros', 'Machado, Guimarães, Clarice, Carolina'),
]
