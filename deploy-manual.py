#!/usr/bin/env python3
import ftplib
import os
from pathlib import Path

HOST = "89.117.7.178"
USER = "u159416153.lumiensina.app.br"
PASS = "LUMI2026Deploy#Secure"
REMOTE_PATH = "/public_html"
LOCAL_DIST = "dist"

print("\n🚀 DEPLOY MANUAL - LUMI (Python FTP)")
print("=" * 50)

try:
    print(f"\n🔐 Conectando a {HOST}...")
    ftp = ftplib.FTP(HOST, USER, PASS, timeout=30)
    ftp.set_debuglevel(0)
    print("✅ Conectado!\n")

    # Tentar limpar public_html
    print("🗑️  Limpando public_html...")
    try:
        ftp.cwd(REMOTE_PATH)
        for item in ftp.nlst():
            try:
                ftp.delete(item)
                print(f"  ✓ Deletado: {item}")
            except:
                try:
                    ftp.rmd(item)
                    print(f"  ✓ Diretório deletado: {item}")
                except Exception as e:
                    print(f"  ⚠️  Erro em {item}: {e}")
    except Exception as e:
        print(f"  ⚠️  Erro ao limpar: {e}")

    print("\n📤 Enviando arquivos...\n")

    # Upload recursivo
    uploaded = 0
    failed = 0

    for root, dirs, files in os.walk(LOCAL_DIST):
        for file in files:
            local_file = os.path.join(root, file)
            relative_path = os.path.relpath(local_file, LOCAL_DIST)
            remote_file = relative_path.replace(os.sep, '/')

            try:
                # Criar diretórios se necessário
                remote_dir = os.path.dirname(remote_file).replace(os.sep, '/')
                if remote_dir:
                    try:
                        ftp.cwd(f"{REMOTE_PATH}/{remote_dir}")
                    except:
                        # Criar diretório
                        for part in remote_dir.split('/'):
                            try:
                                ftp.cwd(part)
                            except:
                                ftp.mkd(part)
                                ftp.cwd(part)
                        ftp.cwd(REMOTE_PATH)

                # Upload arquivo
                with open(local_file, 'rb') as f:
                    ftp.storbinary(f'STOR {remote_file}', f)
                    uploaded += 1
                    if uploaded % 10 == 0:
                        print(f"  ✓ {uploaded} arquivos enviados...")
            except Exception as e:
                failed += 1
                print(f"  ✗ Erro em {remote_file}: {e}")

    ftp.quit()

    print(f"\n✅ Deploy Concluído!")
    print(f"📊 {uploaded} arquivos enviados com sucesso")
    if failed > 0:
        print(f"⚠️  {failed} erros")
    print("\n🧪 Teste em: https://lumiensina.app.br/progresso\n")

except Exception as e:
    print(f"\n❌ Erro: {e}")
    import traceback
    traceback.print_exc()
