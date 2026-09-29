// Gera as poses de "espiar atrás do card" da Home.
// Uso: node scripts/mascot-peek.cjs "<referência da Home com os cards>" [prévia.png]
// Fontes: a própria referência da Home (poses com as mãos na borda) e a folha de poses já recortada
// (src/assets/lumi/lumi-walk-sprite.webp, 7 quadros 250×416). Toda pose termina EXATAMENTE na linha
// em que o card começa — o resto do corpo fica escondido atrás do card.
const sharp = require('sharp')
const path = require('path')

const REF = process.argv[2]
const PREVIEW = process.argv[3]
const OUT = path.join(__dirname, '..', 'src', 'assets', 'lumi')
const SPRITE = path.join(OUT, 'lumi-walk-sprite.webp')
const CARD_TOP = 606 // na referência (896×1200), o topo branco dos cards da 1ª fileira

// recortes da referência: [x0, y0, x1] (y1 = topo do card)
const FROM_REF = {
  grip: [358, 398, 566], // corpo até o peito, as duas mãos apoiadas na borda
  head: [78, 534, 272], // só a cabeça espiando + uma mão na borda
}
// recortes da folha de poses: [quadro, altura a partir do topo]
const FROM_SPRITE = {
  look: [1, 196], // olhando para o aluno
  wave: [4, 196], // acenando
  kiss: [5, 196], // beijinho com corações
  smile: [6, 196], // sorriso de olhos fechados, tchau
}

async function cutRef([x0, y0, x1]) {
  const w = x1 - x0, h = CARD_TOP - 1 - y0
  const { data } = await sharp(REF).extract({ left: x0, top: y0, width: w, height: h }).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const px = (i) => [data[i * 4], data[i * 4 + 1], data[i * 4 + 2]]
  const lum = ([r, g, b]) => 0.299 * r + 0.587 * g + 0.114 * b
  // fundo: preenchimento a partir do topo e das laterais (a borda de baixo é o corpo cortado pelo card)
  const bg = new Uint8Array(w * h), q = []
  const push = (i) => { if (!bg[i] && lum(px(i)) < 120) { bg[i] = 1; q.push(i) } }
  for (let x = 0; x < w; x++) push(x)
  for (let y = 0; y < h; y++) { push(y * w); push(y * w + w - 1) }
  while (q.length) {
    const i = q.pop(), c = px(i), x = i % w, y = (i / w) | 0
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx, ny = y + dy
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue
      const j = ny * w + nx
      if (bg[j]) continue
      const d = px(j)
      if (lum(d) < 120 && Math.abs(d[0] - c[0]) + Math.abs(d[1] - c[1]) + Math.abs(d[2] - c[2]) < 22) { bg[j] = 1; q.push(j) }
    }
  }
  // só o maior pedaço (o mascote) — descarta sobras de cards e de outros mascotes
  const comp = new Int32Array(w * h).fill(-1), sizes = []
  for (let s = 0; s < w * h; s++) {
    if (bg[s] || comp[s] >= 0) continue
    const id = sizes.length, st = [s]; comp[s] = id; let n = 0
    while (st.length) {
      const i = st.pop(); n++
      const x = i % w, y = (i / w) | 0
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, ny = y + dy
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue
        const j = ny * w + nx
        if (!bg[j] && comp[j] < 0) { comp[j] = id; st.push(j) }
      }
    }
    sizes.push(n)
  }
  const main = sizes.indexOf(Math.max(...sizes))
  const alpha = Buffer.alloc(w * h)
  for (let i = 0; i < w * h; i++) alpha[i] = comp[i] === main ? 255 : 0
  const soft = await sharp(alpha, { raw: { width: w, height: h, channels: 1 } }).blur(0.7).extractChannel(0).raw().toBuffer()
  // a última linha continua opaca: é ali que o card "corta" o corpo
  for (let i = 0; i < w * h; i++) data[i * 4 + 3] = (i / w | 0) >= h - 2 && comp[i] === main ? 255 : soft[i]
  return sharp(data, { raw: { width: w, height: h, channels: 4 } })
}

async function cutSprite([k, h]) {
  const img = sharp(SPRITE).extract({ left: k * 250, top: 0, width: 250, height: h })
  // apara as laterais vazias, mantendo o mascote centralizado no recorte
  const buf = await img.png().toBuffer()
  return sharp(buf).trim({ threshold: 1 })
}

;(async () => {
  const made = []
  for (const [name, box] of Object.entries(FROM_REF)) made.push([name, await cutRef(box)])
  for (const [name, spec] of Object.entries(FROM_SPRITE)) made.push([name, await cutSprite(spec)])
  const previews = []
  for (const [name, img] of made) {
    const file = path.join(OUT, `lumi-peek-${name}.webp`)
    await img.clone().webp({ quality: 90, alphaQuality: 95 }).toFile(file)
    const m = await sharp(file).metadata()
    console.log(name, `${m.width}×${m.height}`)
    previews.push({ file, ...m })
  }
  if (PREVIEW) {
    // prévia: cada pose sobre o fundo do app, apoiada num "card" branco
    const W = previews.reduce((s, p) => s + p.width + 30, 30), H = 300
    const parts = []
    let x = 30
    for (const p of previews) {
      parts.push({ input: await sharp(p.file).toBuffer(), left: x, top: 200 - p.height })
      parts.push({ input: { create: { width: p.width + 20, height: 90, channels: 4, background: '#ffffff' } }, left: x - 10, top: 200 })
      x += p.width + 30
    }
    await sharp({ create: { width: W, height: H, channels: 4, background: '#1B2430' } }).composite(parts).png().toFile(PREVIEW)
  }
})()
