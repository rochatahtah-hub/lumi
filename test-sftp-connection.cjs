// Test SFTP Connection with different username formats
const { Client } = require('ssh2');
const fs = require('fs');

const HOST = '89.117.7.178';
const PORT = 65002;
const PASS = 'V7!qR2#nL9@xT4$kP8%z';

// Try different username formats
const usernames = [
  'u159416153.lumiensina.app.br',  // Full format
  'u159416153',                      // Short format
  'u159416153@89.117.7.178',        // With host
];

async function testConnection(username) {
  return new Promise((resolve) => {
    const conn = new Client();
    console.log(`\n🔄 Testando username: ${username}`);

    conn.on('ready', () => {
      console.log(`✅ CONECTADO com: ${username}`);
      conn.sftp((err, sftp) => {
        if (err) {
          console.log(`❌ SFTP erro: ${err.message}`);
          conn.end();
          resolve(false);
        } else {
          console.log(`✅ SFTP sessão aberta`);
          sftp.readdir('/public_html', (err, list) => {
            if (err) {
              console.log(`❌ Erro ao listar: ${err.message}`);
            } else {
              console.log(`✅ Arquivos em /public_html:`);
              list.slice(0, 5).forEach(f => console.log(`   - ${f.filename}`));
            }
            conn.end();
            resolve(true);
          });
        }
      });
    });

    conn.on('error', (err) => {
      console.log(`❌ Erro de conexão: ${err.message}`);
      resolve(false);
    });

    conn.connect({
      host: HOST,
      port: PORT,
      username: username,
      password: PASS,
      algorithms: {
        serverHostKey: ['ssh-rsa', 'ssh-dss'],
      },
      readyTimeout: 10000,
    });

    setTimeout(() => {
      conn.end();
      resolve(false);
    }, 8000);
  });
}

async function main() {
  console.log('🚀 Testando conexões SFTP...\n');
  console.log(`Host: ${HOST}:${PORT}`);
  console.log(`Senha: ${PASS.substring(0, 3)}...${PASS.substring(-3)}\n`);

  for (const username of usernames) {
    const success = await testConnection(username);
    if (success) {
      console.log(`\n✅ USERNAME CORRETO: ${username}`);
      process.exit(0);
    }
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log('\n❌ Nenhum username funcionou. Verificar credenciais com Hostinger.');
  process.exit(1);
}

main();
