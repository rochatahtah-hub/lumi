// Remove o fundo das artes do mascote (preenchimento a partir das bordas, só a área contínua de fundo).
// O visor preto não é afetado porque fica cercado pelo capacete branco.
// Uso: node scripts/mascot-cutout.cjs entrada.webp saida.webp
const sharp = require('sharp')

async function cutout(input, output) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width: W, height: H } = info
  const px = (i) => [data[i * 4], data[i * 4 + 1], data[i * 4 + 2]]
  const lum = ([r, g, b]) => 0.299 * r + 0.587 * g + 0.114 * b
  const bg = new Uint8Array(W * H)
  const queue = []
  const push = (i) => { if (!bg[i]) { bg[i] = 1; queue.push(i) } }
  for (let x = 0; x < W; x++) { push(x); push((H - 1) * W + x) }
  for (let y = 0; y < H; y++) { push(y * W); push(y * W + W - 1) }
  while (queue.length) {
    const i = queue.pop()
    const c = px(i)
    const x = i % W, y = (i / W) | 0
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx, ny = y + dy
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue
      const j = ny * W + nx
      if (bg[j]) continue
      const d = px(j)
      const L = lum(d)
      const step = Math.abs(d[0] - c[0]) + Math.abs(d[1] - c[1]) + Math.abs(d[2] - c[2])
      // fundo: escuro/médio, sem saltos de cor (a borda do robô é branca → para aí)
      if (data[j * 4 + 3] < 10 || (L < 120 && step < 22)) push(j)
    }
  }
  // alfa: fundo transparente, com borda suavizada de 1–2 px
  const alpha = Buffer.alloc(W * H)
  for (let i = 0; i < W * H; i++) alpha[i] = bg[i] ? 0 : Math.min(255, data[i * 4 + 3])
  const soft = await sharp(alpha, { raw: { width: W, height: H, channels: 1 } }).blur(0.8).extractChannel(0).raw().toBuffer()
  for (let i = 0; i < W * H; i++) data[i * 4 + 3] = Math.min(data[i * 4 + 3], soft[i])
  await sharp(data, { raw: { width: W, height: H, channels: 4 } }).webp({ quality: 90, alphaQuality: 95 }).toFile(output)
}

if (require.main === module) cutout(process.argv[2], process.argv[3]).then(() => console.log('ok', process.argv[3]))
module.exports = { cutout }
