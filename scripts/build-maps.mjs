// Gera os mapas do jogo "Mapa Interativo" a partir de dados geográficos reais (nada desenhado à mão):
//  · países: Natural Earth via pacote world-atlas (domínio público)
//  · estados do Brasil: pacote @svg-maps/brazil (licença CC BY 4.0)
// Uso: node scripts/build-maps.mjs  →  src/games/maps/*.json  ({ viewBox, regions: [{ id, name, d }] })
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { feature } from 'topojson-client'
import { geoConicConformal, geoMercator, geoNaturalEarth1, geoPath, geoCentroid } from 'd3-geo'
import brazil from '@svg-maps/brazil'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'src', 'games', 'maps')
mkdirSync(out, { recursive: true })
const topo = (res) => JSON.parse(readFileSync(join(root, 'node_modules', 'world-atlas', `countries-${res}.json`), 'utf8'))
const round = (d) => d.replace(/-?\d+\.\d+/g, (n) => (+n).toFixed(1))

// fit = área geográfica a enquadrar [lonMin, latMin, lonMax, latMax] (evita que territórios ultramarinos distorçam o mapa)
function build(name, res, projection, keep, [W, H], fit) {
  const fc = feature(topo(res), topo(res).objects.countries)
  const shown = { type: 'FeatureCollection', features: fc.features.filter((f) => f.geometry && keep(geoCentroid(f), f)) }
  const [x0, y0, x1, y1] = fit
  const box = { type: 'MultiPoint', coordinates: [[x0, y0], [x1, y0], [x0, y1], [x1, y1], [(x0 + x1) / 2, y0], [(x0 + x1) / 2, y1]] }
  projection.fitExtent([[4, 4], [W - 4, H - 4]], box)
  projection.clipExtent?.([[0, 0], [W, H]])
  const path = geoPath(projection)
  const regions = shown.features.map((f) => ({ id: f.properties.name, name: f.properties.name, d: round(path(f) ?? '') })).filter((r) => r.d)
  writeFileSync(join(out, `${name}.json`), JSON.stringify({ viewBox: `0 0 ${W} ${H}`, regions }))
  console.log(name, regions.length, 'regiões', (JSON.stringify(regions).length / 1024).toFixed(0), 'KB')
}

build('mundo', '110m', geoNaturalEarth1(), (_, f) => f.properties.name !== 'Antarctica', [960, 500], [-180, -58, 180, 84])
build('europa', '50m', geoConicConformal().rotate([-15, 0]).parallels([43, 62]),
  ([lon, lat], f) => (lon > -25 && lon < 45 && lat > 34 && lat < 72) || f.properties.name === 'Russia', [600, 560], [-12, 35, 40, 70])
build('america-sul', '50m', geoMercator(), ([lon, lat]) => lon > -95 && lon < -30 && lat > -57 && lat < 14, [520, 620], [-82, -56, -34, 13])

// Brasil: caminhos já prontos por estado (ids = siglas em minúsculas)
writeFileSync(join(out, 'brasil.json'), JSON.stringify({
  viewBox: brazil.viewBox,
  regions: brazil.locations.map((l) => ({ id: l.id.toUpperCase(), name: l.name, d: round(l.path) })),
}))
console.log('brasil', brazil.locations.length, 'estados')
