#!/usr/bin/env python3
"""
Script para fazer upload automático dos arquivos LUMI para Hostinger via FTP
"""

import ftplib
import os
import sys
from pathlib import Path

# Configurações FTP
FTP_HOST = "seashell-hyena-117618.hostingersite.com"
FTP_USER = "u159416153.lumiensina.app.br"
FTP_PASS = input("Digite a senha FTP: ") if len(sys.argv) < 2 else sys.argv[1]
FTP_PORT = 21
REMOTE_DIR = "public_html"
LOCAL_DIR = r"C:\Users\Mateus\lumi\dist"

def upload_files():
    """Faz upload de todos os arquivos de dist/ para Hostinger"""

    try:
        print(f"🔗 Conectando ao servidor FTP: {FTP_HOST}...")
        ftp = ftplib.FTP(FTP_HOST, FTP_USER, FTP_PASS, timeout=30)
        print("✅ Conectado com sucesso!")

        # Mudar para diretório remoto
        ftp.cwd(REMOTE_DIR)
        print(f"📁 Navegado para: /{REMOTE_DIR}")

        # Listar arquivos existentes
        print("\n📋 Arquivos existentes no servidor:")
        arquivos_remotos = ftp.nlst()
        for arquivo in arquivos_remotos[:10]:
            print(f"  - {arquivo}")
        if len(arquivos_remotos) > 10:
            print(f"  ... e mais {len(arquivos_remotos) - 10} arquivos")

        # Deletar arquivos antigos (exceto pastas importantes)
        print("\n🗑️ Deletando arquivos antigos...")
        for arquivo in arquivos_remotos:
            if arquivo not in ['.', '..', '.htaccess']:
                try:
                    ftp.delete(arquivo)
                    print(f"  ✓ Deletado: {arquivo}")
                except ftplib.all_errors as e:
                    # Pode ser pasta, tenta remover pasta
                    try:
                        ftp.rmd(arquivo)
                        print(f"  ✓ Removida pasta: {arquivo}")
                    except:
                        pass

        # Fazer upload dos novos arquivos
        print("\n📤 Iniciando upload dos arquivos...")
        total_files = 0
        uploaded_files = 0

        for root, dirs, files in os.walk(LOCAL_DIR):
            for file in files:
                total_files += 1
                local_file_path = os.path.join(root, file)
                relative_path = os.path.relpath(local_file_path, LOCAL_DIR)
                remote_path = relative_path.replace("\\", "/")

                # Criar diretórios remotos se necessário
                remote_dir_path = os.path.dirname(remote_path).replace("\\", "/")
                if remote_dir_path:
                    try:
                        ftp.mkd(remote_dir_path)
                    except ftplib.error_perm:
                        pass  # Diretório já existe

                # Upload do arquivo
                try:
                    with open(local_file_path, 'rb') as f:
                        ftp.storbinary(f'STOR {remote_path}', f)
                    uploaded_files += 1
                    print(f"  ✓ {remote_path}")
                except Exception as e:
                    print(f"  ✗ Erro ao fazer upload de {remote_path}: {e}")

        print(f"\n✅ Upload concluído!")
        print(f"📊 Total: {uploaded_files}/{total_files} arquivos enviados")

        # Fechar conexão
        ftp.quit()
        print("\n🎉 Desconectado do servidor FTP")
        print("\n⏱️ Aguarde 1-2 minutos para o servidor processar.")
        print("🌐 Acesse https://lumiensina.app.br e recarregue a página (Ctrl+R)")

    except ftplib.all_errors as e:
        print(f"\n❌ Erro FTP: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Erro: {e}")
        sys.exit(1)

if __name__ == "__main__":
    print("=" * 60)
    print("UPLOAD FTP - LUMI para Hostinger")
    print("=" * 60)
    upload_files()
