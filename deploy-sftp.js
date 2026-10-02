#!/usr/bin/env node

/**
 * Script de Deploy para Hostinger via SFTP
 * Mais confiavel que FTP
 * Uso: node deploy-sftp.js <sftp_password>
 */

import fs from 'fs';
import path from 'path';
import Client from 'ssh2-sftp-client';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SFTP_HOST = 'seashell-hyena-117618.hostingersite.com';
const SFTP_USER = 'u159416153.lumiensina.app.br';
const SFTP_PORT = 22;
const REMOTE_DIR = '/public_html';
const LOCAL_DIR = path.join(__dirname, 'dist');

const SFTP_PASS = process.argv[2];

if (!SFTP_PASS) {
  console.error('Erro: Senha SFTP nao fornecida');
  console.error('Uso: node deploy-sftp.js <sftp_password>');
  process.exit(1);
}

if (!fs.existsSync(LOCAL_DIR)) {
  console.error(`Erro: Diretorio ${LOCAL_DIR} nao existe`);
  console.error('Execute: npm run build');
  process.exit(1);
}

const sftp = new Client();

async function uploadDirectory(remoteDir, localDir) {
  const files = fs.readdirSync(localDir);
  let uploaded = 0;
  let failed = 0;

  for (const file of files) {
    const localPath = path.join(localDir, file);
    const remotePath = `${remoteDir}/${file}`;

    const stats = fs.statSync(localPath);

    if (stats.isDirectory()) {
      try {
        await sftp.mkdir(remotePath, true);
      } catch (err) {
        if (!err.message.includes('exists')) {
          console.error(`Erro ao criar pasta ${remotePath}:`, err.message);
          failed++;
          continue;
        }
      }
      const { u, f } = await uploadDirectory(remotePath, localPath);
      uploaded += u;
      failed += f;
    } else {
      try {
        await sftp.fastPut(localPath, remotePath);
        console.log(`✓ ${path.relative(LOCAL_DIR, localPath).replace(/\\/g, '/')}`);
        uploaded++;
      } catch (err) {
        console.error(`✗ Erro: ${path.relative(LOCAL_DIR, localPath)} - ${err.message}`);
        failed++;
      }
    }
  }

  return { u: uploaded, f: failed };
}

async function deploy() {
  try {
    console.log('============================================================');
    console.log('DEPLOY SFTP - LUMI para Hostinger');
    console.log('============================================================');
    console.log('');

    console.log(`Conectando a ${SFTP_HOST}:${SFTP_PORT}...`);
    await sftp.connect({
      host: SFTP_HOST,
      port: SFTP_PORT,
      username: SFTP_USER,
      password: SFTP_PASS,
      readyTimeout: 30000
    });

    console.log(`Conectado como ${SFTP_USER}`);
    console.log('');
    console.log('Enviando arquivos...');
    console.log('');

    const { u, f } = await uploadDirectory(REMOTE_DIR, LOCAL_DIR);

    await sftp.end();

    console.log('');
    console.log('============================================================');
    console.log(`Deploy concluido! ${u} enviados, ${f} erros`);
    console.log('============================================================');
    console.log('');
    console.log('Aguarde 1-2 minutos para o servidor processar...');
    console.log('Acesse: https://lumiensina.app.br');
    console.log('Recarregue (Ctrl+F5 para limpar cache)');

  } catch (err) {
    console.error('Erro durante deploy:', err.message);
    try {
      await sftp.end();
    } catch (e) {}
    process.exit(1);
  }
}

deploy();
