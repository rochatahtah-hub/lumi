import { block, eqsPt, fill, lesson, mc, order, tf } from '../dsl'
export const movcl = lesson({
  id: 'fis-mov-cinemática', subject: 'fisica', title: 'Movimento e Cinemática', levels: ['medio'], grade: '9º ano',
  topic: 'Física', subtopic: 'Velocidade, aceleração, deslocamento',
  aliases: ['velocidade', 'aceleração', 'deslocamento', 'movimento uniforme'],
  summary: 'Entenda movimento: velocidade, aceleração.',
  intro: 'Carro a 100 km/h — o que significa?',
  objective: 'Calcular velocidade e aceleração.',
  next: [],
  skills: { vel: 'Velocidade', acel: 'Aceleração' },
  blocks: [
    block('vel', 'Velocidade', 'Velocidade = distância÷tempo. Carro 100km em 2h = 50km/h. MU: velocidade constante. MUV: aceleração.', '100km÷2h = 50km/h.', 'v = Δd/Δt.', 'Divide distância por tempo.', '1. Fórmula?'),
    block('acel', 'Aceleração', 'Aceleração = mudança velocidade÷tempo. De 0 a 100km/h em 10s. a = Δv/Δt.', '(100-0)÷10 = 10 km/h/s.', 'a = Δv/Δt.', 'Mudança velocidade.', '1. O que é aceleração?'),
  ],
  questions: [
    mc(1, 'vel', '100km em 2h=?', ['50km/h', '100km/h', '200km/h'], 0, ['Divide.'], '50km/h.'),
    tf(1, 'vel', 'MU = velocidade constante.', true, ['Movimento?'], 'Verdadeiro.'),
    fill(1, 'acel', 'a = Δv/___.', ['Δt'], ['Tempo.'], 'Δt.'),
    mc(2, 'acel', 'Aceleração 0-100 em 10s=?', ['10km/h/s', '100km/h', '90km/h'], 0, ['Muda velocidade.'], '10km/h/s.'),
    order(2, 'vel', 'Ordem.', ['Deslocamento', 'Tempo', 'Velocidade'], ['Fórmula.'], 'Deslocamento→Tempo→Velocidade.'),
  ],
  review: ['v=Δd/Δt', 'a=Δv/Δt', 'MU: velocidade constante', 'MUV: aceleração'],
  relatedQuestions: ['qual é velocidade'],
  equivalentQuestions: eqsPt(['velocidade'], ['aceleração', 'movimento']),
  commonErrors: [],
  sources: [],
})

export const leisnewton = lesson({
  id: 'fis-leis-newton', subject: 'fisica', title: 'Leis de Newton', levels: ['medio'], grade: '9º ano',
  topic: 'Física', subtopic: 'Força e movimento',
  aliases: ['leis de newton', 'força', 'massa', 'ação reação', 'F=ma'],
  summary: '3 leis que explicam movimento.',
  intro: 'Por que coisas se movem?',
  objective: 'Entender as 3 leis de Newton.',
  next: [],
  skills: { lei1: '1ª Lei', lei2: '2ª Lei', lei3: '3ª Lei' },
  blocks: [
    block('lei1', '1ª Lei: Inércia', 'Corpo em repouso continua em repouso; em movimento, continua em movimento (sem força externa).', 'Freada do ônibus: você cai pra frente (inércia).', 'Inércia = tende continuar.', 'Newton primeiro.', '1. Qual é inércia?'),
    block('lei2', '2ª Lei: F=ma', 'Força = massa × aceleração. Quanto maior massa ou aceleração, maior força.', 'F = m × a.', 'Carro pesado precisa mais força.', 'Proporção.', '1. Qual fórmula?'),
  ],
  questions: [
    mc(1, 'lei1', 'Inércia = ?', ['força', 'tendência continuar', 'parada'], 1, ['Tende?'], 'tendência continuar.'),
    tf(1, 'lei1', 'Freada → cai pra frente (inércia).', true, ['Qual lei?'], 'Verdadeiro.'),
    fill(1, 'lei2', 'F = ___ × a.', ['m'], ['Massa.'], 'm.'),
    mc(2, 'lei2', 'F=10, m=2, a=?', ['2', '5', '20'], 1, ['Divide.'], '5.'),
    order(2, 'lei2', 'Ordem F=ma.', ['Força', 'Massa', 'Aceleração'], ['Fórmula.'], 'Força→Massa→Aceleração.'),
  ],
  review: ['1ª Lei: inércia', '2ª Lei: F=ma', '3ª Lei: ação-reação', 'Força = mudança movimento'],
  relatedQuestions: ['física leis newton'],
  equivalentQuestions: eqsPt(['leis newton'], ['força massa', 'F=ma']),
  commonErrors: [],
  sources: [],
})
