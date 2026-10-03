#!/usr/bin/env node

/**
 * Script Deploy SFTP - LUMI
 * Uso: npm install ssh2 && node deploy-sftp.js
 */

const fs = require('fs');
const path = require('path');
const { Client } = require('ssh2');

const config = {
  host: '89.117.7.178',
  port: 65002,
  username: 'u159416153.lumiensina.app.br',
  password: 'V7!qR2#nL9@xT4$kP8%z'
};

const LOCAL_PATH = './dist';
const REMOTE_PATH = '/public_html';

console.log('\n🚀 Deploy SFTP - LUMI\n');
console.log(`Conectando a ${config.host}:${config.port}...\n`);

const conn = new Client();

conn.on('ready', () => {
  console.log('✅ Conectado!\n📦 Fazendo upload...\n');
  
  conn.sftp((err, sftp) => {
    if (err) {
      console.error('❌ Erro SFTP:', err);
      conn.end();
      return;
    }

    // Upload recursivo simples
    const uploadFiles = (dir, remoteDir, callback) => {
      fs.readdir(dir, (err, files) => {
        if (err) return callback(err);
        
        let pending = files.length;
        let uploaded = 0;

        files.forEach(file => {
          const local = path.join(dir, file);
          const remote = `${remoteDir}/${file}`;

          fs.stat(local, (err, stat) => {
            if (err) {
              pending--;
              if (pending === 0) callback(null, uploaded);
              return;
            }

            if (stat.isDirectory()) {
              sftp.mkdir(remote, () => {
                uploadFiles(local, remote, (err, count) => {
                  uploaded += count || 0;
                  pending--;
                  if (pending === 0) callback(null, uploaded);
                });
              });
            } else {
              sftp.fastPut(local, remote, (err) => {
                if (!err) {
                  console.log(`✓ ${file}`);
                  uploaded++;
                }
                pending--;
                if (pending === 0) callback(null, uploaded);
              });
            }
          });
        });

        if (pending === 0) callback(null, 0);
      });
    };

    uploadFiles(LOCAL_PATH, REMOTE_PATH, (err, count) => {
      if (err) {
        console.error('❌ Erro:', err);
      } else {
        console.log(`\n✅ Upload concluído! ${count} arquivos\n`);
        console.log('🎉 Deploy pronto!\n');
        console.log('👉 https://lumiensina.app.br/preparacao-prova\n');
      }
      conn.end();
    });
  });
}).on('error', (err) => {
  console.error('❌ Erro de conexão:', err.message);
  process.exit(1);
}).connect(config);
