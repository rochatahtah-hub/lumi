#!/usr/bin/env node

/**
 * Script de Deploy para Hostinger via FTP
 * Uso: node deploy.js <ftp_password>
 */

import fs from 'fs';
import path from 'path';
import ftpClient from 'ftp';
import { promisify } from 'util';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FTP_HOST = 'seashell-hyena-117618.hostingersite.com';
const FTP_USER = 'u159416153.lumiensina.app.br';
const FTP_PORT = 21;
const REMOTE_DIR = 'public_html';
const LOCAL_DIR = path.join(__dirname, 'dist');

// Obter senha do argumento
const FTP_PASS = process.argv[2];

if (!FTP_PASS) {
  console.error('Erro: Senha FTP nao fornecida');
  console.error('Uso: node deploy.js <ftp_password>');
  process.exit(1);
}

if (!fs.existsSync(LOCAL_DIR)) {
  console.error(`Erro: Diretorio ${LOCAL_DIR} nao existe`);
  console.error('Execute: npm run build');
  process.exit(1);
}

const client = new ftpClient();

async function uploadDirectory(remoteDir, localDir) {
  const files = fs.readdirSync(localDir);

  for (const file of files) {
    const localPath = path.join(localDir, file);
    const remotePath = `${remoteDir}/${file}`.replace(/\\/g, '/');

    const stats = fs.statSync(localPath);

    if (stats.isDirectory()) {
      try {
        await promisify(client.mkdir.bind(client))(remotePath, true);
        await uploadDirectory(remotePath, localPath);
      } catch (err) {
        if (!err.message.includes('exists')) {
          console.error(`Erro ao criar pasta ${remotePath}:`, err.message);
        }
        await uploadDirectory(remotePath, localPath);
      }
    } else {
      try {
        const stream = fs.createReadStream(localPath);
        await promisify(client.put.bind(client))(stream, remotePath);
        console.log(`✓ ${path.relative(LOCAL_DIR, localPath).replace(/\\/g, '/')}`);
      } catch (err) {
        console.error(`✗ Erro ao fazer upload de ${remotePath}:`, err.message);
      }
    }
  }
}

async function deploy() {
  return new Promise((resolve, reject) => {
    console.log('============================================================');
    console.log('DEPLOY FTP - LUMI para Hostinger');
    console.log('============================================================');
    console.log('');

    client.on('ready', async () => {
      try {
        console.log(`Conectado ao servidor: ${FTP_HOST}`);
        console.log(`Usuario: ${FTP_USER}`);
        console.log('');
        console.log('Enviando arquivos...');
        console.log('');

        // Navegar para diretorio remoto
        await promisify(client.cwd.bind(client))(REMOTE_DIR);

        // Fazer upload recursivo
        await uploadDirectory(REMOTE_DIR, LOCAL_DIR);

        console.log('');
        console.log('============================================================');
        console.log('Deploy concluido com sucesso!');
        console.log('============================================================');
        console.log('');
        console.log('Aguarde 1-2 minutos para o servidor processar...');
        console.log('Acesse: https://lumiensina.app.br');
        console.log('Recarregue (Ctrl+F5 para limpar cache)');

        client.end();
        resolve();
      } catch (err) {
        console.error('Erro durante deploy:', err.message);
        client.end();
        reject(err);
      }
    });

    client.on('error', (err) => {
      console.error('Erro FTP:', err.message);
      reject(err);
    });

    client.on('close', () => {
      console.log('');
      console.log('Conexao FTP fechada');
    });

    console.log(`Conectando a ${FTP_HOST}...`);
    client.connect({
      host: FTP_HOST,
      port: FTP_PORT,
      user: FTP_USER,
      password: FTP_PASS
    });
  });
}

deploy()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
