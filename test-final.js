(async () => {
  console.log('[TEST] Iniciando teste final...');
  
  // Preencher selects via JavaScript direto
  const selects = document.querySelectorAll('select');
  if (selects.length >= 2) {
    selects[0].value = 'Português';
    selects[0].dispatchEvent(new Event('change', { bubbles: true }));
    selects[1].value = '8º ano';
    selects[1].dispatchEvent(new Event('change', { bubbles: true }));
    console.log('[TEST] Selects preenchidos');
  }
  
  // Preencher input
  const inputs = Array.from(document.querySelectorAll('input[type="text"]'));
  if (inputs.length > 0) {
    inputs[0].value = 'Figuras de linguagem';
    inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
    console.log('[TEST] Input preenchido');
  }
  
  // Aguardar e clicar
  await new Promise(r => setTimeout(r, 500));
  const addBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Adicionar'));
  if (addBtn) addBtn.click();
  
  await new Promise(r => setTimeout(r, 500));
  const submitBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Começar'));
  if (submitBtn) submitBtn.click();
  
  console.log('[TEST] Form submetido. Aguardando...');
})();
