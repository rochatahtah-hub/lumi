const { Client } = require('basic-ftp');
const fs = require('fs');
const path = require('path');

const FTP_CONFIG = {
  host: '89.117.7.178',
  port: 21,
  user: 'u159416153.lumiensina.app.br',
  password: 'LUMI2026Deploy#Secure'
};

const DIST_PATH = path.join(__dirname, 'dist');
const REMOTE_BASE = '/public_html';

async function deploy() {
  console.log('\n🚀 DEPLOY CLEAN - LUMI (DELETE + REENVIAR)');
  console.log('='.repeat(50));

  const client = new Client();

  try {
    console.log(`\n🔐 Conectando a ${FTP_CONFIG.host}:${FTP_CONFIG.port}...`);
    await client.access(FTP_CONFIG);
    console.log('✅ Conectado!\n');

    console.log('🗑️  Deletando arquivos antigos em public_html...');
    await client.clearWorkingDir();
    console.log('✅ Pasta limpa!\n');

    console.log('📤 Enviando novo build...\n');
    await client.uploadFromDir(DIST_PATH, REMOTE_BASE);

    console.log(`\n✅ Deploy Completo!`);
    console.log('\n🧪 Teste em: https://lumiensina.app.br/\n');

  } catch (err) {
    console.error('\n❌ Erro:', err.message);
    console.error(err);
  } finally {
    client.close();
  }
}

deploy();
