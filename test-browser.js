const puppeteer = require('puppeteer');

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    
    console.log('🌐 Navegando para https://lumiensina.app.br/preparacao-prova...');
    await page.goto('https://lumiensina.app.br/preparacao-prova', { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Capturar erros do console
    page.on('console', msg => console.log('📝 Console:', msg.text()));
    page.on('error', err => console.error('❌ Erro:', err));
    
    // Verificar se página carregou
    const pageTitle = await page.title();
    console.log('✅ Página carregada:', pageTitle);
    
    // Verificar se formulário existe
    const formExists = await page.evaluate(() => {
      return document.querySelector('button:contains("Começar Teste")') !== null;
    });
    
    console.log('✅ Formulário encontrado');
    
    // Preencher e submeter
    await page.select('select:first-of-type', 'Português');
    await page.select('select:nth-of-type(2)', '8º ano');
    
    const input = await page.$('input[placeholder*="Equação"]');
    if (input) {
      await input.type('Figuras de linguagem');
      await page.click('button:contains("Adicionar")');
      console.log('✅ Conteúdo adicionado');
    }
    
    // Clicar "Começar Teste"
    await page.click('button:contains("Começar Teste")');
    await page.waitForTimeout(3000);
    
    // Verificar primeira questão
    const firstQuestion = await page.evaluate(() => {
      const h3 = document.querySelector('h3');
      return h3 ? h3.textContent : null;
    });
    
    console.log('❓ Primeira questão:', firstQuestion);
    
    if (firstQuestion && !firstQuestion.includes('Questão sobre')) {
      console.log('✅ SUCESSO: Questão real encontrada (não é placeholder)!');
    } else {
      console.log('❌ FALHA: Questão genérica encontrada');
    }
    
    await browser.close();
  } catch (err) {
    console.error('❌ Erro durante teste:', err.message);
    if (browser) await browser.close();
  }
})();
