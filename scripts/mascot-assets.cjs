// Gera os assets do mascote a partir da ARTE OFICIAL (referência enviada pela equipe).
// Uso: node scripts/mascot-assets.cjs "<caminho da imagem de referência>"
// Saída: src/assets/lumi/*.webp (com borda esmaecida/transparente para se misturar ao fundo do app)
//
// Quando existir a arte própria de caminhada e de tchau, basta substituir
// src/assets/lumi/lumi-home-walk.webp e lumi-home-wave.webp — nada no código precisa mudar.
const sharp = require('sharp')
const path = require('path')

const src = process.argv[2]
if (!src) throw new Error('informe a imagem de referência')
const out = path.join(__dirname, '..', 'src', 'assets', 'lumi')

// regiões do mascote em cada cartão da referência (1536×1024)
const CROPS = {
  easy: { left: 40, top: 282, width: 470, height: 386 },
  medium: { left: 548, top: 282, width: 462, height: 386 },
  hard: { left: 1058, top: 282, width: 462, height: 386 },
}

async function masked(crop, width) {
  const img = sharp(src).extract(crop).resize({ width })
  const { height } = await img.clone().metadata().then(async () => ({ height: Math.round((crop.height / crop.width) * width) }))
  // máscara radial: centro opaco, bordas somem suavemente (o fundo escuro da arte desaparece)
  const mask = Buffer.from(`<svg width="${width}" height="${height}"><defs><radialGradient id="g" cx="50%" cy="48%" r="58%">
    <stop offset="62%" stop-color="#fff" stop-opacity="1"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/></svg>`)
  return img.ensureAlpha().composite([{ input: mask, blend: 'dest-in' }])
}

;(async () => {
  for (const [name, crop] of Object.entries(CROPS)) {
    await (await masked(crop, 480)).webp({ quality: 88, alphaQuality: 90 }).toFile(path.join(out, `lumi-${name}.webp`))
  }
  // Home: artes oficiais de corpo inteiro (caminhando/acenando e tchau com beijinho), mesmo enquadramento
  const HOME = process.argv.slice(3) // [pose caminhada, pose tchau]
  if (HOME.length === 2) {
    const W = 300, H = 414
    const homeCrops = [{ left: 98, top: 28, width: 512, height: 706 }, { left: 92, top: 28, width: 530, height: 706 }]
    const { cutout } = require('./mascot-cutout.cjs')
    for (const [i, name] of ['walk', 'wave'].entries()) {
      const tmp = path.join(require('os').tmpdir(), `lumi-${name}-raw.png`)
      await sharp(HOME[i]).extract(homeCrops[i]).resize(W, H, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(tmp)
      await cutout(tmp, path.join(out, `lumi-home-${name}.webp`)) // fundo removido (recorte)
    }
  }
  console.log('assets do mascote gerados em', out)
})()
