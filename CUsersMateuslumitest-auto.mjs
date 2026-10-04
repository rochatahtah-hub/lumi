// Script para testar automaticamente

// 1. Preencher o formulário automaticamente
const subjectSelect = document.querySelectorAll('select')[0];
const gradeSelect = document.querySelectorAll('select')[1];
const contentInput = document.querySelector('input[placeholder*="Equação"]');
const addBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Adicionar'));
const submitBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Começar'));

console.log('[AUTO] Começando teste...');
console.log('[AUTO] Subject select found:', !!subjectSelect);
console.log('[AUTO] Grade select found:', !!gradeSelect);

if (subjectSelect) {
  subjectSelect.value = 'Português';
  subjectSelect.dispatchEvent(new Event('change', { bubbles: true }));
  console.log('[AUTO] Subject preenchido: Português');
}

if (gradeSelect) {
  gradeSelect.value = '8º ano';
  gradeSelect.dispatchEvent(new Event('change', { bubbles: true }));
  console.log('[AUTO] Grade preenchido: 8º ano');
}

setTimeout(() => {
  if (contentInput) {
    contentInput.value = 'Figuras de linguagem';
    contentInput.dispatchEvent(new Event('input', { bubbles: true }));
    contentInput.dispatchEvent(new Event('change', { bubbles: true }));
    console.log('[AUTO] Input preenchido');
  }
  
  setTimeout(() => {
    if (addBtn) {
      console.log('[AUTO] Clicando Adicionar...');
      addBtn.click();
    }
    
    setTimeout(() => {
      if (submitBtn) {
        console.log('[AUTO] Clicando Começar Teste...');
        submitBtn.click();
      }
    }, 500);
  }, 300);
}, 100);
