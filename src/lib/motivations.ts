/** Banco de frases motivacionais diárias — uma por dia, muda no dia seguinte */

export const DAILY_MOTIVATIONS = [
  '🌱 Cada novo aprendizado é uma sementinha crescendo dentro de você.',
  '✨ Um pouquinho de estudo hoje pode transformar o seu amanhã.',
  '🌷 Aprender também é descobrir coisas novas sobre o mundo e sobre você.',
  '💛 Você não precisa ser perfeito. Só precisa continuar tentando.',
  '🌟 Cada erro pode ensinar algo novo. Continue.',
  '☀️ Seu esforço de hoje merece um pouquinho de orgulho.',
  '🌈 Aprender no seu ritmo também é aprender.',
  '🧡 Você está construindo seu conhecimento, uma descoberta de cada vez.',
  '🌻 Tenha paciência com você. Todo aprendizado começa com uma primeira tentativa.',
  '✨ Hoje é um ótimo dia para descobrir alguma coisa nova.',
  '🐣 Pequenos passos também levam a grandes conquistas.',
  '🌙 Você fez o seu melhor hoje. Isso também é progresso.',
  '💫 Curiosidade é o melhor amigo do aprendizado.',
  '🎨 Cada coisa que você aprende é uma cor a mais no seu arco-íris.',
  '🌊 Como uma onda que segue o ritmo do mar, você segue o seu próprio ritmo.',
  '🌸 Florescer leva tempo. Você está no caminho certo.',
  '🔥 O que você estuda hoje será seu superpoder amanhã.',
  '🎯 Foco em um aprendizado de cada vez. Isso é sabedoria.',
  '🌺 Você é capaz de mais do que pensa. Confie em você.',
  '💎 Cada pequeno aprendizado é uma joia no seu tesouro pessoal.',
  '🦋 Transformação começa com um pequeno passo. Você já deu!',
  '🌅 Um novo dia é uma nova chance de aprender algo incrível.',
  '🎪 Divertir-se aprendendo é a melhor forma de aprender.',
  '🌻 A paciência é a água que faz a semente do conhecimento crescer.',
  '✨ Você é mais brilhante a cada novo aprendizado.',
]

export function getTodayMotivation(): { text: string; index: number } {
  const today = new Date()
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
  const index = dayOfYear % DAILY_MOTIVATIONS.length
  return { text: DAILY_MOTIVATIONS[index], index }
}

/** Frase de saudação baseada no horário local */
export function getGreeting(preferredName?: string): { greeting: string; period: 'morning' | 'afternoon' | 'evening' } {
  const hour = new Date().getHours()
  const hasName = preferredName && preferredName.trim() && preferredName !== 'visitante' && preferredName !== 'você'

  let greeting: string
  let period: 'morning' | 'afternoon' | 'evening'

  if (hour >= 5 && hour < 12) {
    greeting = hasName ? `☀️ Bom dia, ${preferredName}!` : '☀️ Bom dia!'
    period = 'morning'
  } else if (hour >= 12 && hour < 18) {
    greeting = hasName ? `🌤️ Boa tarde, ${preferredName}!` : '🌤️ Boa tarde!'
    period = 'afternoon'
  } else {
    greeting = hasName ? `🌙 Boa noite, ${preferredName}!` : '🌙 Boa noite!'
    period = 'evening'
  }

  return { greeting, period }
}
