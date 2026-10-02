// Integra ao Curso de Inglês as duas aulas que já existiam na base (Verb to be e Simple present):
// posição na trilha, vocabulário, listening, speaking e material de jogo. Conteúdo original.
import type { Lesson } from '../../types'
import { blank, dialogue, mci, v, words } from '../dsl'

export const ENGLISH_EXTRA: Record<string, Pick<Lesson, 'english' | 'games'>> = {
  'ing-verb-to-be': {
    english: {
      cefr: 'A1', unit: 'a1-u1', order: 4, area: 'grammar', focus: ['grammar', 'speaking', 'listening'],
      vocabulary: [
        v('am', 'sou / estou', 'verb', 'form of “be” used with I', 'I am a student.', 1),
        v('is', 'é / está', 'verb', 'form of “be” used with he, she and it', 'She is my friend.', 1),
        v('are', 'são / estão / é (você)', 'verb', 'form of “be” used with you, we and they', 'We are happy.', 1),
        v('student', 'estudante', 'noun', 'a person who studies', 'I\'m a student.', 1),
        v('happy', 'feliz', 'adjective', 'feeling good', 'They are happy today.', 1, { antonyms: ['sad'] }),
        v('tired', 'cansado(a)', 'adjective', 'needing rest or sleep', 'I\'m tired after school.', 2),
        v('hungry', 'com fome', 'adjective', 'wanting to eat', 'Are you hungry?', 2),
        v('teacher', 'professor(a)', 'noun', 'a person who teaches', 'She is a teacher.', 1),
      ],
      grammar: {
        name: 'Verb to be (present)', when: 'Para dizer quem alguém é, como está, onde está, idade e origem.', structure: 'I am · you/we/they are · he/she/it is',
        affirmative: ['I\'m twelve.', 'She\'s from Brazil.', 'We\'re friends.'], negative: ['I\'m not tired.', 'He isn\'t here.', 'They aren\'t late.'], interrogative: ['Are you OK?', 'Is she your sister?', 'Where are they?'],
        compare: 'Em português temos “ser” e “estar”; em inglês os dois são “be”: I am a student (sou) · I am tired (estou).',
        context: 'Preenchendo seu perfil num jogo: “I\'m Leo. I\'m 13. I\'m from Belém.”',
      },
      listening: {
        title: 'Quem é quem?', kind: 'texto', rate: 0.9,
        script: ['Hi! I\'m Nina and I\'m eleven.', 'This is my friend Omar. He\'s from Egypt.', 'We\'re in the same class.', 'Our teacher is Mr. Park. He isn\'t strict. He\'s very funny!'],
        questions: [
          mci(1, 'Quantos anos Nina tem?', ['10', '11', '12', '7'], 1, '“I\'m eleven.”'),
          mci(1, 'De onde é Omar?', ['Egypt', 'Korea', 'Brazil', 'Spain'], 0, '“He\'s from Egypt.”'),
          mci(2, 'Como é o professor?', ['Rígido', 'Engraçado', 'Cansado', 'Novo'], 1, '“He isn\'t strict. He\'s very funny!”'),
        ],
      },
      speaking: {
        situation: 'Você está se apresentando num vídeo para uma turma de outro país.', vocabulary: ['I\'m', 'from', 'years old', 'student'],
        phrases: ['I\'m …', 'I\'m … years old.', 'I\'m from …', 'I\'m a student.'], example: 'Hi! I\'m Sara. I\'m twelve years old. I\'m from Brazil and I\'m a student.',
        challenge: 'Fale 4 frases sobre você usando am/is/are.', expected: ['i\'m', 'from', 'years', 'student'],
      },
      challenge: 'Descreva três pessoas da sua turma com is/are: nome, idade e como elas estão hoje.',
    },
    games: {
      words: [{ word: 'happy', clue: 'feliz', difficulty: 1 }, { word: 'student', clue: 'estudante', difficulty: 1 }, { word: 'teacher', clue: 'professor(a)', difficulty: 1 }, { word: 'tired', clue: 'cansado', difficulty: 2 }, { word: 'hungry', clue: 'com fome', difficulty: 2 }],
      blanks: [
        blank(1, 'I ___ a student.', ['am', 'is', 'are', 'be'], 0, 'I am.'),
        blank(1, 'She ___ my sister.', ['is', 'am', 'are', 'be'], 0, 'She is.'),
        blank(2, 'We ___ from Brazil.', ['are', 'is', 'am', 'be'], 0, 'We are.'),
        blank(2, 'He ___ tired. He is fine. (negativa)', ['isn\'t', 'aren\'t', 'amn\'t', 'not'], 0, 'He isn\'t.'),
        blank(3, '___ they your cousins?', ['Are', 'Is', 'Am', 'Do'], 0, 'Pergunta: Are they…?'),
      ],
      dialogues: [
        dialogue(1, 'No intervalo', ['Ana: Are you new here?', 'Kai: Yes, I am. I\'m Kai.', 'Ana: Nice to meet you, Kai!'], 1, ['Yes, I am. I\'m Kai.', 'Yes, I is.', 'No, I amn\'t.', 'Yes, you are.'], 0, 'Resposta curta: Yes, I am.'),
        dialogue(2, 'Perguntando por alguém', ['Tom: Where is Sofia?', 'Lia: She\'s in the library.', 'Tom: Is she OK?', 'Lia: Yes, she is. She\'s just busy.'], 3, ['Yes, she is. She\'s just busy.', 'Yes, she are.', 'No, she am.', 'Yes, I am.'], 0, 'Com she: Yes, she is.'),
      ],
      sequences: [words(1, 'I am twelve years old', 'Idade: I am + número + years old.'), words(2, 'Is he your brother', 'Pergunta: Is + he + …?')],
    },
  },
  'ing-simple-present': {
    english: {
      cefr: 'A1', unit: 'a1-u3', order: 2, area: 'grammar', focus: ['grammar', 'reading', 'writing'],
      vocabulary: [
        v('wake up', 'acordar', 'phrasal verb', 'to stop sleeping', 'I wake up at 6:30.', 1),
        v('usually', 'geralmente', 'adverb', 'in most cases', 'I usually walk to school.', 2, { related: ['always', 'never', 'sometimes'] }),
        v('always', 'sempre', 'adverb', 'every time', 'She always drinks water.', 1, { antonyms: ['never'] }),
        v('never', 'nunca', 'adverb', 'at no time', 'He never eats fish.', 1, { antonyms: ['always'] }),
        v('breakfast', 'café da manhã', 'noun', 'the first meal of the day', 'I have breakfast at seven.', 1),
        v('homework', 'lição de casa', 'noun', 'school work you do at home', 'I do my homework after lunch.', 1),
        v('work', 'trabalhar', 'verb', 'to do a job', 'My dad works in a hospital.', 1),
        v('watch', 'assistir', 'verb', 'to look at something for some time', 'She watches TV at night.', 1),
      ],
      reading: {
        title: 'A day in the life of Theo', genre: 'texto pessoal',
        text: 'Theo is fourteen. He lives in Florianópolis. He wakes up at six thirty and has breakfast with his mom. He goes to school by bike. After school, he does his homework and plays volleyball on the beach. Theo doesn\'t watch TV at night — he reads comics.',
        questions: [
          mci(1, 'Como Theo vai para a escola?', ['De ônibus', 'De bicicleta', 'A pé', 'De carro'], 1, '“He goes to school by bike.”'),
          mci(2, 'O que ele faz depois da escola?', ['Assiste TV', 'Faz a lição e joga vôlei', 'Dorme', 'Trabalha'], 1, '“he does his homework and plays volleyball”.'),
          mci(3, 'O que Theo faz à noite?', ['Assiste TV', 'Lê quadrinhos', 'Joga vôlei', 'Toma café'], 1, '“He doesn\'t watch TV at night — he reads comics.”'),
        ],
      },
      writing: {
        prompt: 'Escreva sobre a rotina de alguém da sua família usando he/she (lembre do -s).', criteria: ['Pelo menos 4 ações', 'Verbos com -s/-es', 'Um advérbio de frequência'],
        model: 'My mom wakes up at 6. She always drinks coffee. She works in a bank. She goes home at 5 and usually watches the news.', keywords: ['wakes', 'works', 'goes', 'always', 'usually'], minWords: 20,
      },
      challenge: 'Conte a sua rotina de ontem? Não — de TODO dia! Diga 5 frases no simple present.',
    },
    games: {
      blanks: [
        blank(1, 'She ___ to school by bus.', ['goes', 'go', 'going', 'gos'], 0, 'She goes (-o recebe -es).'),
        blank(1, 'I ___ like coffee.', ['don\'t', 'doesn\'t', 'not', 'isn\'t'], 0, 'I don\'t.'),
        blank(2, '___ he play soccer?', ['Does', 'Do', 'Is', 'Are'], 0, 'He → Does.'),
        blank(2, 'My brother ___ his homework after lunch.', ['does', 'do', 'dos', 'doing'], 0, 'Do → does.'),
        blank(3, 'She doesn\'t ___ TV at night.', ['watch', 'watches', 'watching', 'watched'], 0, 'Depois de doesn\'t: verbo base.'),
      ],
      sequences: [words(1, 'I wake up at seven', 'Sujeito + verbo + complemento.'), words(2, 'She doesn\'t eat meat', 'Negativa: doesn\'t + verbo base.'), words(3, 'Does your father work on Saturday', 'Pergunta: Does + sujeito + verbo base.')],
    },
  },
}
