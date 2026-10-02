#!/usr/bin/env python3
"""
Script para executar migrações SQL do LUMI v3.1 no Supabase
Lê exam-prep-migrations.sql e executa as queries
"""

import os
import sys
from pathlib import Path

# Tentar importar dependências
try:
    import psycopg2
    from psycopg2 import sql
except ImportError:
    print("❌ psycopg2 não instalado. Instalando...")
    os.system("pip install psycopg2-binary")
    import psycopg2
    from psycopg2 import sql

def get_supabase_connection_string():
    """Obter string de conexão do Supabase via .env"""
    env_path = Path(__file__).parent.parent / ".env"

    if not env_path.exists():
        print("❌ Arquivo .env não encontrado!")
        print("Criando .env template...")

        template = """# Supabase Connection
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY

# Database Direct Connection
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
"""
        with open(env_path, "w") as f:
            f.write(template)

        print(f"✅ Arquivo template criado em: {env_path}")
        print("\n⚠️  Preencha as credenciais do Supabase em .env")
        print("   DATABASE_URL pode ser obtido em: Supabase → Settings → Database → Connection string")
        return None

    # Ler .env
    env_vars = {}
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#"):
                key, value = line.split("=", 1)
                env_vars[key.strip()] = value.strip()

    return env_vars.get("DATABASE_URL")

def execute_migrations(sql_file):
    """Executar migrações SQL"""

    # Obter connection string
    db_url = get_supabase_connection_string()
    if not db_url:
        print("\n❌ Não foi possível conectar ao Supabase")
        print("Configure DATABASE_URL em .env e tente novamente")
        return False

    # Ler arquivo SQL
    if not Path(sql_file).exists():
        print(f"❌ Arquivo não encontrado: {sql_file}")
        return False

    with open(sql_file) as f:
        sql_content = f.read()

    print(f"📄 Lendo: {sql_file}")
    print(f"📊 Tamanho: {len(sql_content)} caracteres")

    try:
        # Conectar ao Supabase
        print("\n🔗 Conectando ao Supabase...")
        conn = psycopg2.connect(db_url)
        cursor = conn.cursor()
        print("✅ Conectado!")

        # Executar queries
        print("\n▶️  Executando migrações SQL...")
        cursor.execute(sql_content)
        conn.commit()
        print("✅ Migrações executadas com sucesso!")

        # Verificar tabelas criadas
        cursor.execute("""
            SELECT tablename FROM pg_tables
            WHERE tablename LIKE 'exam_prep_%'
        """)
        tables = cursor.fetchall()

        print("\n📋 Tabelas criadas:")
        for table in tables:
            print(f"   ✅ {table[0]}")

        cursor.close()
        conn.close()

        return True

    except psycopg2.Error as e:
        print(f"\n❌ Erro ao executar SQL: {e}")
        print("\n💡 Solução:")
        print("   1. Verifique DATABASE_URL em .env")
        print("   2. Confirme que Supabase está acessível")
        print("   3. Tente manualmente em: Supabase → SQL Editor")
        return False
    except Exception as e:
        print(f"\n❌ Erro: {e}")
        return False

if __name__ == "__main__":
    print("""
╔════════════════════════════════════════════════════════╗
║   LUMI v3.1 — Executar Migrações SQL                 ║
║                                                        ║
║   Este script conecta ao Supabase e executa as       ║
║   migrações do exam_prep_results e exam_prep_answers  ║
╚════════════════════════════════════════════════════════╝
    """)

    # Caminho do arquivo SQL
    lumi_dir = Path(__file__).parent.parent
    sql_file = lumi_dir / "src" / "lib" / "exam-prep-migrations.sql"

    print(f"\n📂 Diretório LUMI: {lumi_dir}")
    print(f"📄 Arquivo SQL: {sql_file}")

    # Executar migrações
    success = execute_migrations(str(sql_file))

    if success:
        print("\n" + "="*60)
        print("🎉 MIGRAÇÕES CONCLUÍDAS COM SUCESSO!")
        print("="*60)
        print("\n✅ Próximos passos:")
        print("   1. Testar localmente: npm run dev")
        print("   2. Fazer teste completo de preparação para prova")
        print("   3. Confirmar dados aparecem em Supabase")
        sys.exit(0)
    else:
        print("\n" + "="*60)
        print("❌ ERRO AO EXECUTAR MIGRAÇÕES")
        print("="*60)
        sys.exit(1)
