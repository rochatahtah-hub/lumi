# LUMI — Aprender ficou mais simples

Plataforma de estudos com IA para Ensino Fundamental e Médio. PWA (instala no celular e no computador), mobile-first, sem login obrigatório, sem câmera/foto — só texto digitado ou colado.

## A regra central: a base é o coração, a IA só preenche lacunas

```
pergunta do aluno
 → 1. base própria neste aparelho (busca por nome, sinônimos, perguntas relacionadas, radicais e erros de digitação)
 → 2. base oficial na nuvem (PostgreSQL Full Text Search + trigramas)          → encontrou: responde pela base, SEM IA
 → 3. conteúdo que a IA já pesquisou e está em revisão                         → reaproveita, sem nova chamada
 → 4. lacuna: a IA pesquisa na web em fontes confiáveis, responde ao aluno e registra em
      "Conteúdos encontrados pela IA" (pergunta, assunto, matéria, nível, resposta, fontes, data)
 → admin revisa → "Adicionar à base oficial" → a próxima pergunta igual é respondida pela base
```

Toda pergunta sem resposta na base entra em "Perguntas que o LUMI não encontrou" (com contagem, datas, matéria e assunto provável).

## Base de conhecimento

Organização: nível → matéria → série → assunto → subassunto → conteúdo → exemplos → exercícios → respostas → dicas → revisão, mais palavras-chave, sinônimos, perguntas relacionadas e fontes.

Base inicial (autoral, alinhada à BNCC, fatos conferidos em fontes como IBGE, Arquivo Nacional, Exército Brasileiro e sites educacionais): **35 conteúdos, 374 exercícios, 13 matérias** — Matemática, Português, Ciências, História, Geografia, Inglês, Física, Química, Biologia, Literatura, Filosofia, Sociologia e Artes.

- Conteúdos: `src/content/lessons/*.ts` · assunto/subassunto/perguntas: `src/content/meta.ts` (inclui o dicionário de sinônimos).
- Depois de editar: `node scripts/build-seed.ts` regenera `supabase/seed.sql`.

## Rodar

```bash
npm install
npm run dev                          # http://localhost:5173
npm run build && npx vite preview    # build de produção com service worker (PWA)
```

Sem configurar nada, o app funciona 100% local (base embutida, progresso no aparelho, "colar conteúdo" com exercícios, painel em modo de visualização).

## Ativar nuvem + IA (Supabase)

1. Projeto Supabase + banco:
   ```bash
   supabase link --project-ref <PROJECT_REF>
   supabase db push                                   # migrações 0001 (estrutura) e 0002 (busca, IA, revisão, ciclo mensal)
   psql "<CONNECTION_STRING>" -f supabase/seed.sql    # publica os 35 conteúdos (ou cole no SQL Editor)
   ```
2. Secrets das Edge Functions (as chaves de IA **nunca** vão para o frontend):
   ```bash
   supabase secrets set GEMINI_API_KEY=...        # principal — pesquisa com Google Search e registra as fontes
   supabase secrets set ANTHROPIC_API_KEY=...     # opcional, reserva (sem pesquisa na web)
   supabase secrets set CRON_SECRET=<aleatório>
   # opcionais: GEMINI_MODEL, ANTHROPIC_MODEL, AI_DAILY_LIMIT (40/dia por aparelho), BASE_MATCH_SCORE (70), ALLOWED_ORIGIN
   supabase functions deploy lumi-ai
   supabase functions deploy kb-admin
   ```
3. Frontend: `.env` com `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
4. Admin: crie a conta pelo app e promova: `update profiles set role = 'admin' where id = (select id from auth.users where email = '...');`
5. Atualização mensal automática: edite e rode `supabase/cron.sql` (todo dia 1º a IA pesquisa as perguntas mais feitas que não foram encontradas; tudo vai para revisão).

## Painel administrativo

Painel (números, mais acessados, maior índice de erro) · Conteúdos (editor completo: assunto, subassunto, palavras-chave, perguntas relacionadas, blocos, reformulações, exercícios, dicas, fontes, histórico de versões com responsável) · **Encontrados pela IA** (revisar → corrigir → adicionar à base oficial / rejeitar; pesquisar assunto novo) · **Não encontradas** · **Atualização da base** (última/próxima atualização, revisados, novos, correções, novos exercícios, novos assuntos; registrar o ciclo do mês) · Fontes (tipos: livro, material didático, site, instituição, vídeo, canal…).

Versões nunca são apagadas. Nada pesquisado pela IA entra na base oficial sem revisão humana.

## Publicação

- **Oficial (Hostinger, conta rochatahtah@gmail.com):** https://ivory-dog-642534.hostingersite.com — plano Hospedagem Web Premium, domínio temporário da Hostinger (dá para conectar um domínio próprio em Sites → Conectar domínio).
  Para publicar uma nova versão: `npm run build` e enviar o conteúdo de `dist/` para `public_html/` pelo Gerenciador de Arquivos (o `.htaccess` incluído cuida de HTTPS, rotas do app e cache). O pacote pronto fica em `deploy/lumi-hostinger.zip`.
- **Cópia de testes (Cloudflare):** https://lumi.synex.workers.dev — `npx wrangler deploy`.
- **Supabase:** projeto `lumi` (`khmozcolgdpkvlgctqgk`). Ao trocar o domínio, atualizar `site_url` em `supabase/config.toml` e rodar `supabase config push`.

## Instalação no celular

No primeiro acesso pelo celular o LUMI mostra "📱 Quer ter o LUMI no seu celular?" com o botão "📲 Instalar LUMI", que usa o **mecanismo oficial** do navegador (sem APK, sem download). No iPhone, o Safari não permite instalar por botão — o convite mostra os 2 toques da "Tela de Início". "Continuar pelo navegador" guarda a escolha por 14 dias; instalado, o convite não aparece. Também em Mais → "📱 Instalar o LUMI".

## Privacidade

Sem conta: nada sai do aparelho além de estatísticas anônimas (código aleatório + acertos por questão) quando a nuvem está ativa. Com conta: só e-mail e senha (recomendado o do responsável para menores). Sem CPF, telefone, endereço, nome completo ou foto.
