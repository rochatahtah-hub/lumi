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
        // Upload dos arquivos
        console.log('📤 Fazendo upload de arquivos...');

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
                ftpClient.mkdir(remotePath, () => {
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
                    console.log(`  ⚠️  ${relPath} (já existe)`);
                  }
                  processed++;
                  if (processed === files.length) res();
                });
              }
            });
          });
        }

        await uploadRecursive(LOCAL_DIST);

        console.log(`\n🎉 Upload concluído! ${uploaded} arquivos enviados.`);
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
    console.log('\n✅ Pronto! Acesse: https://lumiensina.app.br (limpe cache)');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Erro:', err.message);
    process.exit(1);
  });
