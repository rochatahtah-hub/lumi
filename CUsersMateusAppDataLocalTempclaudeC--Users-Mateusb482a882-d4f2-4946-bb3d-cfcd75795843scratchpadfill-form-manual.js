// Preencher dropdowns via JavaScript direto
const selects = document.querySelectorAll('select');
console.log('[FILL] Total de selects:', selects.length);

if (selects.length >= 2) {
  // Primeiro select = Subject
  selects[0].value = 'Português';
  selects[0].dispatchEvent(new Event('change', { bubbles: true }));
  selects[0].dispatchEvent(new Event('input', { bubbles: true }));
  console.log('[FILL] Subject definido para:', selects[0].value);

  // Segundo select = Grade
  selects[1].value = '8º ano';
  selects[1].dispatchEvent(new Event('change', { bubbles: true }));
  selects[1].dispatchEvent(new Event('input', { bubbles: true }));
  console.log('[FILL] Grade definido para:', selects[1].value);
}

// Preencher input de conteúdo
const inputs = document.querySelectorAll('input[type="text"]');
if (inputs.length > 0) {
  const contentInput = inputs[0];
  contentInput.value = 'Figuras de linguagem';
  contentInput.dispatchEvent(new Event('input', { bubbles: true }));
  contentInput.dispatchEvent(new Event('change', { bubbles: true }));
  console.log('[FILL] Content input preenchido');
}

// Clicar Adicionar após 500ms
setTimeout(() => {
  const addBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Adicionar'));
  if (addBtn) {
    console.log('[FILL] Clicando Adicionar...');
    addBtn.click();
  }
}, 500);

// Clicar Começar Teste após 1s
setTimeout(() => {
  const submitBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Começar'));
  if (submitBtn && !submitBtn.disabled) {
    console.log('[FILL] Clicando Começar Teste...');
    submitBtn.click();
  }
}, 1000);
