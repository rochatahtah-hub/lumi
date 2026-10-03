#!/usr/bin/env node
/**
 * Deploy LUMI via FTP
 * npm install ftp
 * node ftp-deploy.cjs
 */

const Client = require('ftp');
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

let c = new Client();
let uploadedCount = 0;
let totalFiles = 0;

function getAllFiles(dir, prefix = '') {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    const remotePath = prefix + '/' + item;

    if (stat.isDirectory()) {
      files.push(...getAllFiles(fullPath, remotePath));
    } else {
      files.push({ local: fullPath, remote: remotePath });
    }
  }

  return files;
}

async function uploadFile(ftp, localPath, remotePath) {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(localPath);
    const fileSize = fs.statSync(localPath).size;
    const fileSizeKb = (fileSize / 1024).toFixed(2);

    fs.createReadStream(localPath)
      .pipe(ftp.put((err) => {
        if (err) {
          console.log(`  ❌ ${fileName} - ERRO`);
          reject(err);
        } else {
          uploadedCount++;
          console.log(`  ✓ ${fileName}`);
          resolve();
        }
      }), remotePath);
  });
}

async function deploy() {
  console.log('\n🚀 DEPLOY FTP - LUMI');
  console.log('='.repeat(50));

  if (!fs.existsSync(DIST_PATH)) {
    console.log('\n❌ Pasta dist/ não encontrada!');
    console.log('Execute: npm run build\n');
    process.exit(1);
  }

  const files = getAllFiles(DIST_PATH);
  totalFiles = files.length;

  console.log(`\n📊 Estatísticas:`);
  console.log(`  Total de arquivos: ${totalFiles}`);

  console.log(`\n🔐 Conectando a ${FTP_CONFIG.host}:${FTP_CONFIG.port}...`);

  return new Promise((resolve, reject) => {
    c.on('ready', async () => {
      console.log('✅ Conectado!\n');
      console.log('📤 Iniciando upload...\n');

      try {
        for (const file of files) {
          const remotePath = REMOTE_BASE + file.remote;
          await uploadFile(c, file.local, remotePath);
        }

        console.log(`\n✅ Upload Completo! ${uploadedCount}/${totalFiles} arquivos`);
        console.log('\n🧪 Teste em:');
        console.log('   https://lumiensina.app.br/preparacao-prova');

        c.end();
        resolve();
      } catch (err) {
        console.error('\n❌ Erro:', err.message);
        c.end();
        reject(err);
      }
    });

    c.on('error', (err) => {
      console.error('\n❌ Erro FTP:', err.message);
      reject(err);
    });

    c.connect(FTP_CONFIG);
  });
}

deploy().catch(err => {
  process.exit(1);
});
