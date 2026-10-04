// Teste simples da lógica de conversão
const testQuestion = {
  type: 'mc',
  difficulty: 1,
  prompt: 'Qual figura de linguagem está em "Já te disse um milhão de vezes"?',
  options: ['Metáfora', 'Hipérbole', 'Metonímia', 'Ironia'],
  answer: 1,
  explanation: 'Hipérbole é o exagero intencional.',
  skill: 'figuras-linguagem',
  hints: ['Pense em exagero', 'Um milhão é impossível', 'Ênfase']
};

const diffMap = { 1: 'easy', 2: 'medium', 3: 'hard' };
const typeMap = { 'mc': 'multiple-choice', 'tf': 'true-false', 'fill': 'complete', 'match': 'association', 'order': 'interpretation', 'open': 'open' };

const converted = {
  type: typeMap[testQuestion.type],
  difficulty: diffMap[testQuestion.difficulty],
  content: testQuestion.prompt,
  skillReference: testQuestion.skill,
  options: testQuestion.options,
  correctAnswer: testQuestion.options[testQuestion.answer],
  explanation: testQuestion.explanation
};

console.log('✅ TESTE DE CONVERSÃO');
console.log('Questão original:', JSON.stringify(testQuestion, null, 2));
console.log('\nQuestão convertida para ExamQuestion:');
console.log(JSON.stringify(converted, null, 2));
console.log('\n✅ Conversão bem-sucedida!');
console.log('- Tipo:', converted.type, '(era', testQuestion.type, ')');
console.log('- Dificuldade:', converted.difficulty, '(era', testQuestion.difficulty, ')');
console.log('- Resposta correta:', converted.correctAnswer);
console.log('- Opções:', converted.options.length, 'opções');
