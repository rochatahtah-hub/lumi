#!/usr/bin/env node
/**
 * Deploy LUMI via FTP (usando basic-ftp)
 * node deploy-ftp-final.cjs
 */

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
  console.log('\n🚀 DEPLOY FTP - LUMI');
  console.log('='.repeat(50));

  if (!fs.existsSync(DIST_PATH)) {
    console.log('\n❌ Pasta dist/ não encontrada!');
    console.log('Execute: npm run build\n');
    process.exit(1);
  }

  const client = new Client();

  try {
    console.log(`\n🔐 Conectando a ${FTP_CONFIG.host}:${FTP_CONFIG.port}...`);
    await client.access(FTP_CONFIG);
    console.log('✅ Conectado!\n');

    console.log('📤 Iniciando upload...\n');

    // Upload recursivo da pasta dist
    await client.uploadFromDir(DIST_PATH, REMOTE_BASE);

    console.log(`\n✅ Upload Completo!`);
    console.log('\n🧪 Teste em:');
    console.log('   https://lumiensina.app.br/');
    console.log('   https://lumiensina.app.br/preparacao-prova\n');

  } catch (err) {
    console.error('\n❌ Erro:', err.message);
    console.error(err);
  } finally {
    client.close();
  }
}

deploy();
