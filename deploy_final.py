#!/usr/bin/env python3
import ftplib
from pathlib import Path

HOST = '89.117.7.178'
USER = 'u159416153.lumiensina.app.br'
PASS = 'LUMI2026Deploy#Secure'
REMOTE = '/public_html'
LOCAL = Path('dist')

print('[CONECTANDO AO HOSTINGER]')
ftp = ftplib.FTP(HOST, USER, PASS, timeout=30)

print('[ENTRANDO EM /public_html]')
ftp.cwd('/public_html')

print('[ENVIANDO ARQUIVOS]')
count = 0
for path in LOCAL.rglob('*'):
    if path.is_file():
        rel = str(path.relative_to(LOCAL))
        rel = rel.replace(chr(92), '/')

        # Criar diretórios se necessário
        dirs = rel.split('/')
        for d in dirs[:-1]:
            try:
                ftp.mkd(d)
            except:
                pass
            try:
                ftp.cwd(d)
            except:
                pass

        # Voltar para public_html
        ftp.cwd('/public_html')
        for d in dirs[:-1]:
            ftp.cwd(d)

        # Upload arquivo
        with open(path, 'rb') as fp:
            ftp.storbinary(f'STOR {dirs[-1]}', fp)

        # Voltar para public_html
        ftp.cwd('/public_html')
        count += 1
        if count % 20 == 0:
            print(f'  ... {count} arquivos')

ftp.quit()
print(f'[CONCLUIDO] {count} arquivos reenviados com sucesso')
