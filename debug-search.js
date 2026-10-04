// Simular a busca
const searchContent = "Figuras de linguagem";
const searchSubject = "Portugues"; // ou "Português"?
const searchGradeLevel = "8º ano";

const contentLower = searchContent.toLowerCase(); // "figuras de linguagem"
const subjectLower = searchSubject.toLowerCase(); // "portugues"

// Lição que deveria ser encontrada
const lessonTitle = "Figuras de linguagem";
const lessonSubject = "portugues";

const titleMatch = lessonTitle.toLowerCase().includes(contentLower);
const subjectMatch = lessonSubject.toLowerCase().includes(subjectLower);

console.log('🔍 Simulando busca:');
console.log('Search:', { content: searchContent, subject: searchSubject });
console.log('Lesson:', { title: lessonTitle, subject: lessonSubject });
console.log('Matches:');
console.log('  - Title includes content?', titleMatch);
console.log('  - Subject includes search?', subjectMatch);
console.log('  - Both?', titleMatch && subjectMatch);

if (titleMatch && subjectMatch) {
  console.log('\n✅ Lição SERIA encontrada!');
} else {
  console.log('\n❌ Problema na lógica de busca!');
  console.log('Title match: ' + titleMatch);
  console.log('Subject match: ' + subjectMatch);
}
