// Monta a folha de animação (sprite) do LUMI a partir da folha oficial de poses.
// Uso: node scripts/mascot-sprite.cjs "<folha de poses>" [pasta de prévia]
// Saída: src/assets/lumi/lumi-walk-sprite.webp (quadros lado a lado, mesmo tamanho, pés alinhados)
const sharp = require('sharp')
const path = require('path')

const SRC = process.argv[2]
const PREVIEW = process.argv[3]
const OUT = path.join(__dirname, '..', 'src', 'assets', 'lumi')
const TOP = 30, BOTTOM = 446 // corta o reflexo do chão
const FW = 250, FH = BOTTOM - TOP // tamanho de cada quadro no sprite

// fatias (com folga) de cada uma das 8 poses na folha 1444×541
const SLICES = [[30, 212], [205, 395], [370, 560], [520, 722], [712, 900], [852, 1092], [1060, 1246], [1238, 1444]]
// ordem no sprite: caminhada (passo, apoio, passo, apoio) e depois o tchau
const WALK = [1, 2, 6, 2]
const WAVE = [3, 5, 7]
// retângulos (coordenadas da fatia) com pedaços da pose vizinha a apagar: [x, y, largura, altura]
const ERASE = { 6: [0, 60, 47, 120] }

async function frame(idx) {
  const [x0, x1] = SLICES[idx]
  const w = x1 - x0, h = FH
  const { data } = await sharp(SRC).extract({ left: x0, top: TOP, width: w, height: h }).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const px = (i) => [data[i * 4], data[i * 4 + 1], data[i * 4 + 2]]
  const lum = ([r, g, b]) => 0.299 * r + 0.587 * g + 0.114 * b
  // 1) fundo: preenchimento a partir das bordas (mesma técnica de mascot-cutout.cjs)
  const bg = new Uint8Array(w * h), q = []
  const push = (i) => { if (!bg[i]) { bg[i] = 1; q.push(i) } }
  for (let x = 0; x < w; x++) { push(x); push((h - 1) * w + x) }
  for (let y = 0; y < h; y++) { push(y * w); push(y * w + w - 1) }
  while (q.length) {
    const i = q.pop(), c = px(i), x = i % w, y = (i / w) | 0
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx, ny = y + dy
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue
      const j = ny * w + nx
      if (bg[j]) continue
      const d = px(j)
      if (lum(d) < 120 && Math.abs(d[0] - c[0]) + Math.abs(d[1] - c[1]) + Math.abs(d[2] - c[2]) < 22) push(j)
    }
  }
  if (ERASE[idx]) { const [ex, ey, ew, eh] = ERASE[idx]; for (let y = ey; y < ey + eh; y++) for (let x = ex; x < ex + ew; x++) bg[y * w + x] = 1 }
  // 2) componentes: fica o robô desta fatia (o maior) + pedaços pequenos longe das bordas (corações)
  const comp = new Int32Array(w * h).fill(-1), sizes = [], boxes = [], orange = []
  for (let s = 0; s < w * h; s++) {
    if (bg[s] || comp[s] >= 0) continue
    const id = sizes.length, st = [s]; comp[s] = id
    let n = 0, minx = w, maxx = 0, r = 0, b = 0
    while (st.length) {
      const i = st.pop(); n++; r += data[i * 4]; b += data[i * 4 + 2]
      const x = i % w, y = (i / w) | 0
      minx = Math.min(minx, x); maxx = Math.max(maxx, x)
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, ny = y + dy
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue
        const j = ny * w + nx
        if (!bg[j] && comp[j] < 0) { comp[j] = id; st.push(j) }
      }
    }
    sizes.push(n); boxes.push([minx, maxx]); orange.push(r / n > 170 && b / n < 120)
  }
  const main = sizes.indexOf(Math.max(...sizes))
  const keep = new Set([main])
  sizes.forEach((n, id) => { if (id !== main && orange[id] && n > 12 && n < 3000 && boxes[id][0] > 3 && boxes[id][1] < w - 4) keep.add(id) }) // só corações (pedaços alaranjados)
  // 3) centro do tronco (para alinhar os quadros) e alfa suavizado
  let sx = 0, sn = 0
  const alpha = Buffer.alloc(w * h)
  for (let i = 0; i < w * h; i++) {
    const on = !bg[i] && keep.has(comp[i])
    alpha[i] = on ? 255 : 0
    const y = (i / w) | 0
    if (on && comp[i] === main && y > 130 && y < 290) { sx += i % w; sn++ }
  }
  const soft = await sharp(alpha, { raw: { width: w, height: h, channels: 1 } }).blur(0.7).extractChannel(0).raw().toBuffer()
  for (let i = 0; i < w * h; i++) data[i * 4 + 3] = soft[i]
  const img = await sharp(data, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer()
  return { img, cx: Math.round(sx / sn), w }
}

;(async () => {
  const order = [...WALK, ...WAVE]
  const frames = []
  for (const idx of order) frames.push(await frame(idx))
  const composites = frames.map((f, k) => {
    const left = k * FW + Math.round(FW / 2 - f.cx)
    // recorta o que passar da borda do quadro (não pode vazar para o vizinho no sprite)
    const cutL = Math.max(0, k * FW - left), cutR = Math.max(0, left + f.w - (k + 1) * FW)
    return { f, left: left + cutL, cutL, width: f.w - cutL - cutR }
  })
  const parts = []
  for (const c of composites) parts.push({ input: await sharp(c.f.img).extract({ left: c.cutL, top: 0, width: c.width, height: FH }).toBuffer(), left: c.left, top: 0 })
  const sprite = sharp({ create: { width: FW * order.length, height: FH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).composite(parts)
  await sprite.clone().webp({ quality: 88, alphaQuality: 92 }).toFile(path.join(OUT, 'lumi-walk-sprite.webp'))
  if (PREVIEW) await sharp({ create: { width: FW * order.length, height: FH, channels: 4, background: '#2E9E6B' } }).composite([{ input: await sprite.png().toBuffer() }]).png().toFile(PREVIEW)
  console.log(`sprite: ${order.length} quadros de ${FW}×${FH} (caminhada ${WALK.length}, tchau ${WAVE.length})`)
})()
