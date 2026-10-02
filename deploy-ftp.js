const FTP = require('ftp');
const fs = require('fs');
const path = require('path');

const FTP_CONFIG = {
  host: 'seashell-hyena-117618.hostingersite.com',
  user: 'u159416153.lumiensina.app.br',
  password: 'V7!qN4@zL9#rT2$wX8mP',
  port: 21
};

const REMOTE_PATH = '/public_html';
const LOCAL_DIST = 'dist';

async function uploadFiles() {
  const ftpClient = new FTP();
  let uploaded = 0;

  return new Promise((resolve, reject) => {
    ftpClient.on('error', (err) => {
      console.error('❌ Erro FTP:', err);
      reject(err);
    });

    ftpClient.on('ready', async () => {
      console.log('✅ Conectado ao Hostinger!\n');

      try {
        // Limpar arquivos antigos
        console.log('🗑️  Limpando arquivos antigos...');
        await new Promise((resolve, reject) => {
          ftpClient.list(REMOTE_PATH, (err, list) => {
            if (err) {
              console.log('  ⚠️  Nenhum arquivo para deletar');
              return resolve();
            }

            let deleteCount = 0;
            list.forEach(file => {
              if (file.name !== '.' && file.name !== '..') {
                ftpClient.delete(`${REMOTE_PATH}/${file.name}`, (err) => {
                  if (!err) {
                    console.log(`  ✅ Deletado: ${file.name}`);
                    deleteCount++;
                  }
                  if (deleteCount === list.length - 1) resolve();
                });
              }
            });

            if (list.length <= 2) resolve();
          });
        });

        // Upload dos arquivos
        console.log('\n📤 Fazendo upload de arquivos...');

        function uploadRecursive(dir) {
          return new Promise((res) => {
            const files = fs.readdirSync(dir);
            let processed = 0;

            if (files.length === 0) return res();

            files.forEach(file => {
              const filePath = path.join(dir, file);
              const relPath = path.relative(LOCAL_DIST, filePath).replace(/\\/g, '/');
              const remotePath = `${REMOTE_PATH}/${relPath}`;

              const stat = fs.statSync(filePath);

              if (stat.isDirectory()) {
                // Criar pasta
                ftpClient.mkdir(remotePath, (err) => {
                  uploadRecursive(filePath).then(() => {
                    processed++;
                    if (processed === files.length) res();
                  });
                });
              } else {
                // Upload arquivo
                ftpClient.put(filePath, remotePath, (err) => {
                  if (!err) {
                    const sizeKb = (stat.size / 1024).toFixed(1);
                    console.log(`  ✅ ${relPath} (${sizeKb} KB)`);
                    uploaded++;
                  } else {
                    console.log(`  ❌ Erro em ${relPath}: ${err.message}`);
                  }
                  processed++;
                  if (processed === files.length) res();
                });
              }
            });
          });
        }

        await uploadRecursive(LOCAL_DIST);

        console.log(`\n🎉 Upload completo! ${uploaded} arquivos enviados.`);
        ftpClient.end();
        resolve();

      } catch (err) {
        console.error('❌ Erro:', err);
        ftpClient.end();
        reject(err);
      }
    });

    console.log('🔌 Conectando ao Hostinger...');
    ftpClient.connect(FTP_CONFIG);
  });
}

uploadFiles()
  .then(() => {
    console.log('\n✅ Deploy concluído! Site será atualizado em segundos.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Deploy falhou:', err.message);
    process.exit(1);
  });
