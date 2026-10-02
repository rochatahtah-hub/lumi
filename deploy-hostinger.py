#!/usr/bin/env python3
import os
import ftplib
import sys
from pathlib import Path

# Credenciais Hostinger
FTP_HOST = "seashell-hyena-117618.hostingersite.com"
FTP_USER = "u159416153.lumiensina.app.br"
FTP_PASS = "V7!qN4@zL9#rT2$wX8mP"
FTP_PORT = 21
REMOTE_PATH = "/public_html"

# Diretório local do build
LOCAL_DIST = Path("dist")

def upload_files():
    """Upload de arquivos dist/ para Hostinger via FTP"""
    try:
        print("🔌 Conectando ao Hostinger...")
        ftp = ftplib.FTP(FTP_HOST, FTP_USER, FTP_PASS)
        ftp.set_debuglevel(0)
        print("✅ Conectado!\n")

        # Deletar arquivos antigos na pasta public_html (exceto pasta público_html)
        print("🗑️  Limpando arquivos antigos...")
        try:
            ftp.cwd(REMOTE_PATH)
            for item in ftp.nlst():
                if item not in ['.', '..']:
                    try:
                        ftp.delete(item)
                        print(f"  ❌ Deletado: {item}")
                    except:
                        try:
                            # É uma pasta, ignora
                            pass
                        except:
                            pass
        except Exception as e:
            print(f"  ⚠️  Erro ao limpar: {e}")

        # Upload de novos arquivos
        print("\n📤 Fazendo upload de arquivos...")
        uploaded = 0
        for root, dirs, files in os.walk(LOCAL_DIST):
            for file in files:
                local_file = Path(root) / file
                remote_file = str(local_file.relative_to(LOCAL_DIST)).replace("\\", "/")

                # Criar pastas se necessário
                remote_dir = "/".join(remote_file.split("/")[:-1])
                if remote_dir:
                    try:
                        ftp.cwd(f"{REMOTE_PATH}/{remote_dir}")
                    except ftplib.error_perm:
                        # Criar pasta
                        parts = remote_dir.split("/")
                        ftp.cwd(REMOTE_PATH)
                        for part in parts:
                            try:
                                ftp.mkd(part)
                            except:
                                pass
                            ftp.cwd(part)

                # Upload do arquivo
                try:
                    with open(local_file, 'rb') as f:
                        ftp.storbinary(f'STOR {file}', f)
                    uploaded += 1
                    size_kb = local_file.stat().st_size / 1024
                    print(f"  ✅ {remote_file} ({size_kb:.1f} KB)")
                except Exception as e:
                    print(f"  ❌ Erro em {remote_file}: {e}")

        print(f"\n🎉 Upload completo! {uploaded} arquivos enviados.")
        ftp.quit()
        return True

    except Exception as e:
        print(f"❌ Erro: {e}")
        return False

if __name__ == "__main__":
    if not LOCAL_DIST.exists():
        print("❌ Pasta 'dist/' não encontrada. Execute 'npm run build' primeiro.")
        sys.exit(1)

    success = upload_files()
    sys.exit(0 if success else 1)
