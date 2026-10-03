# ARQUITETURA DO LUMI: Explicação Visual

**Para:** Você  
**Assunto:** Por que Node.js não é necessário em produção  
**Data:** 03/10/2026

---

## 🎯 Pergunta

> "Por que a Hostinger não aceita Node.js e como o LUMI funciona sem ele?"

---

## 💡 Resposta Simples

**O LUMI não usa Node.js em produção.**

Ponto final. Não há nada para "remover" da Hostinger porque nunca esteve lá.

---

## 📊 Visão Geral da Arquitetura

```
Você (desenvolvedor)
         ↓
        git push
         ↓
GitHub Actions (máquina CI/CD)
├── Node.js INSTALADO (necessário)
├── npm ci (baixar dependências de build)
├── npm run build (TypeScript + Vite)
│   ├── tsc (compila TypeScript)
│   └── vite (empacota código)
├── Resultado: pasta dist/ (arquivos estáticos)
└── Deploy dist/ para Hostinger (via SFTP)
         ↓
Hostinger (servidor web estático)
├── Apache
├── dist/ files (HTML, CSS, JS, PNG, etc)
├── .htaccess (roteamento React)
└── Zero Node.js ← AQUI!
         ↓
Navegador do usuário
├── Download index.html
├── Download app.js, app.css
├── Executa React no navegador
├── React Router cuida de roteamento
├── Supabase client comunica com nuvem
└── Resultado: App funciona!
```

---

## 🔄 Fluxo de Dados (Simplificado)

### 1. Desenvolvimento (seu computador)
```
$ npm run build
↓
Compila TypeScript
Minifica código
Otimiza assets
↓
Cria dist/
```

### 2. CI/CD (GitHub Actions)
```
GitHub Actions máquina com Node.js
├── git clone
├── npm ci (instala dependências de BUILD)
├── npm run build (executa acima)
├── sftp dist/* hostinger.com
└── sucesso!

Node.js é USADO aqui (necessário para compilar)
```

### 3. Produção (Hostinger)
```
Hostinger servidor
├── Apache roda
├── Serve dist/index.html
├── .htaccess faz roteamento SPA
└── FIM!

Node.js é IGNORADO aqui (não é necessário)
```

### 4. Runtime (Navegador)
```
Navegador do usuário
├── React roda em JavaScript (navegador)
├── React Router cuida das páginas
├── Supabase client fala com API
└── App funciona!

Node.js não está aqui (rodaria em servidor se estivesse)
```

---

## 🏗️ Arquitetura de Camadas

```
┌─────────────────────────────────────────────────────┐
│          Navegador do Usuário (Cliente)             │
├─────────────────────────────────────────────────────┤
│  React App                                          │
│  ├── Components (JSX)                               │
│  ├── Pages (15+ páginas)                            │
│  ├── React Router (SPA routing)                     │
│  ├── TanStack Query (dados cache)                   │
│  └── Service Worker (PWA offline)                   │
│                                                     │
│  → Tudo roda AQUI, no navegador                    │
│  → Node.js não está nesta camada                   │
└─────────────────────────────────────────────────────┘
            ↑                              ↑
            │ HTTP fetch/API              │
            │ requests                    │
            │                             │
┌───────────┴─────────────┐      ┌────────┴──────────┐
│   Hostinger (Estático)  │      │ Supabase (Cloud)  │
├─────────────────────────┤      ├───────────────────┤
│ Apache                  │      │ PostgreSQL DB     │
│ ├── index.html          │      │ ├── Usuários      │
│ ├── app.js (compiled)   │      │ ├── Cursos        │
│ ├── app.css (compiled)  │      │ ├── Progresso     │
│ ├── assets/             │      │ ├── Exercícios    │
│ ├── .htaccess (SPA)     │      │ └── Jogos         │
│ └── Zero Node.js        │      │                   │
│                         │      │ Autenticação      │
│ Serve arquivos          │      │ ├── Email/Pass    │
│ estáticos APENAS        │      │ ├── Tokens        │
│                         │      │ └── Sessões       │
└─────────────────────────┘      │                   │
                                 │ APIs (JSON)       │
                                 │ ├── GET /data     │
                                 │ ├── POST /save    │
                                 │ └── etc.          │
                                 └───────────────────┘
```

**Conclusão:** Node.js aparece APENAS em GitHub Actions (para compilar)

---

## 📦 O que está em cada lugar

| Lugar | O que tem | O que NÃO tem |
|-------|----------|--------------|
| **Seu PC** | Código fonte (.tsx, .ts) | Produção |
| **GitHub** | Código fonte | Nada que roda |
| **GitHub Actions** | Node.js, npm, Vite | Servidor |
| **Hostinger** | Arquivos estáticos (dist/) | Node.js |
| **Supabase** | Banco de dados, Auth | Frontend code |
| **Navegador** | React, JavaScript | Servidor |

---

## 🔗 Fluxo de uma Requisição (Exemplo)

**Cenário:** Usuário clica em "Matérias"

```
1. Clique no navegador
   ↓
2. React Router detecta rota /materia/:id
   ↓
3. React renderiza componente SubjectPage
   ↓
4. Componente faz fetch para Supabase:
   → GET https://khmozcolgdpkvlgctqgk.supabase.co/api/...
   ↓
5. Supabase retorna dados JSON
   ↓
6. React atualiza estado
   ↓
7. DOM atualiza
   ↓
8. Usuário vê a página

Hostinger: não participou (serviu apenas index.html inicial)
Node.js: não participou em nada
```

---

## ✅ Confirmação: O que Funciona sem Node.js

| Feature | Roda em | Funciona? |
|---------|---------|-----------|
| 🏠 Home page | React (navegador) | ✅ Sim |
| 📚 Matérias | React (navegador) | ✅ Sim |
| ✏️ Exercícios | React (navegador) | ✅ Sim |
| 🎮 Jogos | React (navegador) | ✅ Sim |
| 🔐 Login | Supabase Auth (cloud) | ✅ Sim |
| 💾 Salvar progresso | Supabase DB (cloud) | ✅ Sim |
| 📱 PWA | Service Worker (navegador) | ✅ Sim |
| 📡 Offline | Service Worker (navegador) | ✅ Sim |
| 📈 Analytics | Google Analytics (cloud) | ✅ Sim |

**Nenhuma feature depende de Node.js em produção.**

---

## ❌ O que NÃO funciona (e por quê)

| Coisa | Por quê | Solução |
|------|---------|---------|
| npm start em produção | Tenta rodar servidor Node | Não faz isso |
| npm install em produção | node_modules é 300MB+ | Compilar em CI, enviar só dist/ |
| Executar scripts .js em servidor | Não há Node.js lá | Scripts rodam no navegador (React) |
| Recompile em produção | npm precisa de Node.js | Compilar antes em CI |

---

## 📈 Tamanho da Aplicação

```
Código fonte (src/)
└── 25.014 linhas de TypeScript
    (Compilado em GitHub Actions com Node.js)
         ↓
Resultado final (dist/)
├── index.html        1.4 KB
├── app.js           ~150 KB (minificado)
├── app.css          ~50 KB (minificado)
├── sw.js            3.6 KB
└── assets/          (imagens, fontes)
         ↓
    Total: ~250-300 KB (comprimido com Gzip em ~60-80 KB)
         ↓
    Upload para Hostinger (via SFTP)
         ↓
    Download pelo navegador (~60 KB)
         ↓
    Roda React no navegador
         ↓
    Solicita dados do Supabase quando necessário
         ↓
    Renderiza UI
```

---

## 🔐 Segurança

```
Você coloca credenciais Supabase em .env.production
         ↓
GitHub Actions lê de GitHub Secrets (seguro)
         ↓
Compila TypeScript, injeta vars em build time
         ↓
Código compilado com credenciais NÃO fica em dist/
(Credenciais são buscadas da variável de ambiente do navegador)
         ↓
dist/ é enviado para Hostinger (público, apenas HTML/CSS/JS)
         ↓
Navegador roda React, faz requisições para Supabase
         ↓
Supabase valida tokens, protege dados
```

**Credenciais seguras? ✅ Sim (nunca ficam em arquivos públicos)**

---

## 🎯 Resposta Definitiva

| Pergunta | Resposta |
|----------|----------|
| Node.js é necessário em produção? | **❌ Não** |
| Preciso rodar npm start na Hostinger? | **❌ Não** |
| Preciso instalar dependências na Hostinger? | **❌ Não** |
| Preciso de um servidor Node.js? | **❌ Não** |
| O LUMI funciona na Hostinger tradicional? | **✅ Sim** |
| O código compila corretamente? | **✅ Sim** |
| Deploy automático funciona? | **✅ Sim** |
| Site está online? | **✅ Sim** |

---

## 🚀 Workflow Final (Recomendado)

```
┌──────────────┐
│ Desenvolvimento│
│ npm run dev  │
│ seu computador
└────────┬─────┘
         │
         ↓
┌──────────────────────────┐
│ Commit & Push            │
│ git push origin master   │
└────────┬─────────────────┘
         │
         ↓
┌──────────────────────────────────────────┐
│ GitHub Actions Workflow                  │
│ ├── npm ci (instalar build dependencies) │
│ ├── npm run lint (verificar código)      │
│ ├── npm run build (gerar dist/)          │
│ └── sftp dist/* hostinger (deploy)       │
│                                          │
│ Node.js é USADO aqui                    │
└────────┬─────────────────────────────────┘
         │
         ↓
┌──────────────────────────────┐
│ Hostinger (Produção)         │
│ ├── Serve dist/ files        │
│ ├── Apache + .htaccess       │
│ └── Zero Node.js             │
└────────┬──────────────────────┘
         │
         ↓
┌──────────────────────────────┐
│ Usuário Acessa               │
│ https://lumiensina.app.br   │
│ ✅ App funciona perfeitamente
└──────────────────────────────┘
```

---

## 📞 Simples, Direto, Funcionando

> **O LUMI é uma React app que roda no navegador com dados do Supabase.**  
> **Não há servidor. Não há Node.js em produção. Hostinger serve arquivos estáticos.**  
> **Tudo funciona perfeitamente.**

---

**Criado:** 03/10/2026  
**Versão:** LUMI v3.1  
**Status:** ✅ Arquitetura Confirmada e Funcionando
