#!/usr/bin/env python3
"""
Script para executar migrações SQL via Supabase RPC
Usa a API do Supabase para executar queries SQL
"""

import os
import sys
import requests
import json
from pathlib import Path

def load_env():
    """Carregar variáveis de ambiente"""
    env_path = Path(__file__).parent.parent / ".env"
    env_vars = {}

    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#"):
                key, value = line.split("=", 1)
                env_vars[key.strip()] = value.strip()

    return env_vars

def execute_sql_via_rpc(supabase_url, service_role_key, sql_content):
    """Executar SQL via RPC do Supabase (requer function postgres)"""

    # URL do endpoint RPC
    rpc_url = f"{supabase_url}/rest/v1/rpc/execute_sql"

    headers = {
        "Authorization": f"Bearer {service_role_key}",
        "Content-Type": "application/json",
        "apikey": service_role_key
    }

    payload = {"sql": sql_content}

    try:
        print("🔗 Conectando via Supabase RPC...")
        response = requests.post(rpc_url, json=payload, headers=headers, timeout=30)

        if response.status_code in [200, 201]:
            print("✅ Migrações executadas com sucesso!")
            return True
        else:
            print(f"❌ Erro: {response.status_code}")
            print(f"   Resposta: {response.text}")
            return False

    except requests.exceptions.Timeout:
        print("❌ Timeout ao conectar ao Supabase")
        return False
    except Exception as e:
        print(f"❌ Erro: {e}")
        return False

def execute_sql_manual(supabase_url, anon_key, sql_content):
    """
    Instruções para executar SQL manualmente no Supabase console
    """

    print("""
╔════════════════════════════════════════════════════════════╗
║   INSTRUÇÕES PARA EXECUTAR MIGRAÇÕES MANUALMENTE         ║
╚════════════════════════════════════════════════════════════╝

Como a função RPC não está configurada, execute manualmente:

1️⃣  Abra Supabase Console
   → https://app.supabase.com

2️⃣  Selecione projeto "lumi"

3️⃣  Vá em: SQL Editor → New Query

4️⃣  Cole TODO o conteúdo do arquivo:
   → src/lib/exam-prep-migrations.sql

5️⃣  Clique: "Run" (botão verde)

6️⃣  Confirme: ✅ Success (sem erros)

7️⃣  Valide em: Table Editor
   → Procure por "exam_prep_results"
   → Procure por "exam_prep_answers"

═══════════════════════════════════════════════════════════════
    """)

def main():
    print("""
╔════════════════════════════════════════════════════════════╗
║   LUMI v3.1 — Executar Migrações SQL                     ║
╚════════════════════════════════════════════════════════════╝
    """)

    # Carregar env
    try:
        env_vars = load_env()
        supabase_url = env_vars.get("VITE_SUPABASE_URL")
        anon_key = env_vars.get("VITE_SUPABASE_ANON_KEY")

        if not supabase_url or not anon_key:
            raise ValueError("Variáveis de Supabase não encontradas")

        print(f"✅ Supabase URL: {supabase_url}")
        print(f"✅ Anon Key configurada")

    except Exception as e:
        print(f"❌ Erro ao carregar .env: {e}")
        return False

    # Ler arquivo SQL
    sql_file = Path(__file__).parent.parent / "src" / "lib" / "exam-prep-migrations.sql"

    try:
        with open(sql_file) as f:
            sql_content = f.read()

        print(f"✅ Arquivo SQL carregado: {len(sql_content)} caracteres")

    except FileNotFoundError:
        print(f"❌ Arquivo não encontrado: {sql_file}")
        return False

    # Mostrar instruções de execução manual
    execute_sql_manual(supabase_url, anon_key, sql_content)

    print("\n📋 Arquivo SQL pronto para copiar!")
    print(f"   Caminho: {sql_file}")

    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
