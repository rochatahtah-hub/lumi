# Checklist de Testes Mobile 📱

## Device Testing
- [ ] iPhone SE (pequeno) — 375px
- [ ] iPhone 12/13 (médio) — 390px
- [ ] iPhone 14 Pro Max (grande) — 430px
- [ ] Samsung S21 (OLED) — 360px
- [ ] Tablet (iPad) — 768px

## Interação
- [ ] Toque em botões (hit area ≥ 44x44px)
- [ ] Arrastar peças (drag no touch)
- [ ] Scroll suave sem lag
- [ ] Modal não sai da tela
- [ ] Input keyboard não bloqueia conteúdo

## Quebra-cabeça
- [ ] Peças visíveis em tela pequena
- [ ] Tabuleiro redimensiona automaticamente
- [ ] Tray (bandeja) scrollável se necessário
- [ ] Modo toque é o padrão (não arrastar)
- [ ] Pré-visualização cabe na tela

## Memória & Jogos
- [ ] Cartas são clicáveis (não muito pequenas)
- [ ] Grid responde a rotação do device
- [ ] Celebração não sai da tela
- [ ] Instruções visíveis sem scroll

## Performance
- [ ] FPS estável (≥ 30fps) ao arrastar
- [ ] Sem jank ao encaixar
- [ ] Carregamento < 3s em 4G
- [ ] Sem memory leaks após 5 minutos

## Acessibilidade
- [ ] Touch targets ≥ 44x44px
- [ ] Contraste mínimo AA (WCAG)
- [ ] Sem conteúdo essencial só em hover
- [ ] Teclado virtual não bloqueia ação

## Orientação
- [ ] Portrait e Landscape ambos funcionam
- [ ] Transição suave entre orientações
- [ ] Célula não redesenha (evitar jarretira)
- [ ] Bloqueio de orientação respeitado

## Bateria
- [ ] Animações não drenam bateria (usar transform)
- [ ] Sem polling constantemente
- [ ] Sem loops infinitos em JS

## Som (se houver)
- [ ] Som toca no app (não só em mudo)
- [ ] Feedback tátil funciona
- [ ] Volume respeitado do device

## Teste Automático
```bash
npm run test:mobile
# Roda em 5 devices virtuais simultaneamente
```
