#!/usr/bin/env python3
"""
Upload dist/ files to Hostinger via File Browser
Usage: python3 upload-via-browser.py
Requer: pip install requests
"""

import os
import requests
from pathlib import Path

# File Browser API
FILE_BROWSER_URL = "https://srv887-files.hstgr.io/api"
AUTH_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9"  # Placeholder - precisaríamos obter de verdade

DIST_PATH = Path("dist")
REMOTE_PATH = "/f78c26f3fa0dff72/files/public_html"

def upload_files():
    """Upload todos os arquivos de dist/ recursivamente"""

    if not DIST_PATH.exists():
        print("❌ Pasta dist/ não encontrada. Rode 'npm run build' primeiro.")
        return False

    print(f"📦 Upload de {DIST_PATH}/ para Hostinger...")

    # Listar todos os arquivos
    files_to_upload = []
    for root, dirs, files in os.walk(DIST_PATH):
        for file in files:
            file_path = Path(root) / file
            rel_path = file_path.relative_to(DIST_PATH)
            files_to_upload.append((file_path, rel_path))

    print(f"📋 Total: {len(files_to_upload)} arquivos")

    # Para teste: listar apenas os primeiros
    for i, (local_file, remote_file) in enumerate(files_to_upload[:20], 1):
        print(f"  {i}. {remote_file}")

    if len(files_to_upload) > 20:
        print(f"  ... e mais {len(files_to_upload) - 20}")

    print("\n⚠️ NOTA: Upload automático via API requer token de autenticação.")
    print("   Recomendação: Faça upload manualmente via:")
    print("   1. WinSCP (https://winscp.net/)")
    print("   2. Ou Hostinger File Manager (https://hpanel.hostinger.com)")
    print("   3. Ou cPanel Git Repository (se disponível)")

    return True

if __name__ == "__main__":
    upload_files()
