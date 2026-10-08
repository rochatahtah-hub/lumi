import { useEffect, useMemo, useRef, useState } from 'react'
import type { Lesson } from '../../types'
import { shuffle } from '../../lib/text'
import { GameShell, type GameApi } from '../GameShell'
import type { GameProps } from './choice'
import { loadMap, regionsOf } from './map'

// Encaixe automático: distância máxima (em pixels) para snap
const SNAP_DISTANCE = 45

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
function wrap(text: string, max: number, lines = 3): string[] {
  const out: string[] = []
  let cur = ''
  for (const w of text.split(/\s+/)) {
    if ((cur + ' ' + w).trim().length > max) { out.push(cur.trim()); cur = w } else cur += ' ' + w
  }
  if (cur.trim()) out.push(cur.trim())
  if (out.length > lines) { out.length = lines; out[lines - 1] += '…' }
  return out
}
const toUrl = (svg: string) => `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}")`

/** cartaz do conteúdo: título + vocabulário (Inglês) ou pontos-chave da revisão, no visual do LUMI */
export function posterSvg(l: Lesson): string {
  const vocab = (l.english?.vocabulary ?? []).slice(0, 4).map((v) => [v.word, v.translation])
  const items = vocab.length >= 3 ? vocab : l.review.slice(0, 4).map((r) => [r, ''])
  const title = wrap(l.title, 22, 2)
  const cards = items.map(([a, b], k) => {
    const y = 250 + k * 84
    const lines = wrap(a, b ? 24 : 40, b ? 1 : 2)
    return `<rect x="50" y="${y}" width="500" height="70" rx="18" fill="#252F3D" stroke="#FF8A1F" stroke-opacity=".45"/>
      <circle cx="84" cy="${y + 35}" r="13" fill="#FF8A1F"/><text x="84" y="${y + 41}" font-size="16" font-weight="700" text-anchor="middle" fill="#fff">${k + 1}</text>
      ${lines.map((t, j) => `<text x="110" y="${y + (lines.length > 1 ? 30 + j * 24 : 43)}" font-size="${b ? 24 : 19}" font-weight="700" fill="#F8FAFC">${esc(t)}</text>`).join('')}
      ${b ? `<text x="530" y="${y + 43}" font-size="19" text-anchor="end" fill="#FFB347">${esc(b)}</text>` : ''}`
  }).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" font-family="Poppins, Arial, sans-serif">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1B2430"/><stop offset="1" stop-color="#2E3B4E"/></linearGradient>
    <radialGradient id="s" cx=".85" cy=".1" r=".5"><stop offset="0" stop-color="#FF8A1F" stop-opacity=".45"/><stop offset="1" stop-color="#FF8A1F" stop-opacity="0"/></radialGradient></defs>
    <rect width="600" height="600" fill="url(#g)"/><rect width="600" height="600" fill="url(#s)"/>
    <g stroke="#FF8A1F" stroke-width="6" stroke-linecap="round" transform="translate(470 40) scale(.9)"><line x1="50" y1="8" x2="50" y2="20"/><line x1="24" y1="18" x2="31" y2="27"/><line x1="76" y1="18" x2="69" y2="27"/></g>
    <path d="M500 88a20 20 0 0 1 36 0z" fill="#FF8A1F"/>
    <text x="50" y="80" font-size="20" font-weight="600" fill="#FFB347">LUMI · ${esc(l.english?.cefr ?? l.grade ?? '')}</text>
    ${title.map((t, i) => `<text x="50" y="${140 + i * 50}" font-size="42" font-weight="800" fill="#F8FAFC">${esc(t)}</text>`).join('')}
    ${cards}
  </svg>`
}

// Hash simples para seleção determinística
function hashString(str: string): number {
  let h = 0
  for (let i = 0; i < str.length; i++) h = ((h << 5) - h) + str.charCodeAt(i) | 0
  return Math.abs(h)
}

// Ilustrações educacionais EXPANSAS para todas as matérias
// Cada tema tem MÚLTIPLAS variações para não repetir a mesma imagem
function educationalIllustration(topic: string, subject: string, lessonId?: string): string {
  const t = topic?.toLowerCase() || ''
  const s = subject?.toLowerCase() || ''
  const variantIndex = lessonId ? hashString(lessonId) : 0

  // Função helper para selecionar variante
  const selectVariant = (variants: string[]): string => variants[variantIndex % variants.length]

  // ============ BIOLOGIA ============
  if (s.includes('biologia')) {
    if (t.includes('célula') || t.includes('animal')) {
      const variants = [cellAnimalSvg(), cellPlantSvg(), cellPlantSvg()]
      return selectVariant(variants)
    }
    if (t.includes('célula') && t.includes('vegetal')) {
      const variants = [cellPlantSvg(), cellAnimalSvg(), cellPlantSvg()]
      return selectVariant(variants)
    }
    if (t.includes('dna') || t.includes('genética')) {
      const variants = [dnaSvg(), moleculeSvg(), organicStructureSvg()]
      return selectVariant(variants)
    }
    if (t.includes('respiratório')) {
      const variants = [systemRespirarySvg(), systemCircularySvg(), humanBodySvg()]
      return selectVariant(variants)
    }
    if (t.includes('circulatório') || t.includes('coração')) {
      const variants = [systemCircularySvg(), systemRespirarySvg(), humanBodySvg()]
      return selectVariant(variants)
    }
    if (t.includes('evolução')) {
      const variants = [evolutionSvg(), foodChainSvg(), animalsSvg()]
      return selectVariant(variants)
    }
    if (t.includes('ecossistema') || t.includes('cadeia alimentar')) {
      const variants = [ecosystemSvg(), foodChainSvg(), biomaSvg()]
      return selectVariant(variants)
    }
  }

  // ============ CIÊNCIAS ============
  if (s.includes('ciência') || s.includes('ciencias')) {
    if (t.includes('sistema solar') || t.includes('planeta')) {
      return solarSystemSvg()
    }
    if (t.includes('água') || t.includes('ciclo')) {
      return waterCycleSvg()
    }
    if (t.includes('corpo') || t.includes('humano')) {
      return humanBodySvg()
    }
    if (t.includes('cadeia') || t.includes('alimentar')) {
      return foodChainSvg()
    }
    if (t.includes('animal')) {
      return animalsSvg()
    }
    if (t.includes('planta')) {
      return plantsSvg()
    }
    if (t.includes('ecossistema')) {
      return ecosystemSvg()
    }
  }

  // ============ QUÍMICA ============
  if (s.includes('química') || s.includes('quimica')) {
    if (t.includes('átomo') || t.includes('atomos')) {
      return atomSvg()
    }
    if (t.includes('molécula')) {
      return moleculeSvg()
    }
    if (t.includes('tabela periódica') || t.includes('periodica')) {
      return periodicTableSvg()
    }
    if (t.includes('ligação') || t.includes('ligacao')) {
      return chemicalBondSvg()
    }
    if (t.includes('reação') || t.includes('reacao')) {
      return chemicalReactionSvg()
    }
    if (t.includes('laboratório') || t.includes('laboratorio')) {
      return laboratoryEquipmentSvg()
    }
    if (t.includes('orgânica') || t.includes('organica')) {
      return organicStructureSvg()
    }
  }

  // ============ FÍSICA ============
  if (s.includes('física') || s.includes('fisica')) {
    if (t.includes('sistema solar') || t.includes('planeta')) {
      return solarSystemSvg()
    }
    if (t.includes('movimento')) {
      return movementSvg()
    }
    if (t.includes('força') || t.includes('forcas')) {
      return forcesSvg()
    }
    if (t.includes('máquina') || t.includes('maquina')) {
      return machinesSvg()
    }
    if (t.includes('eletricidade') || t.includes('eletricidade')) {
      return electricitySvg()
    }
    if (t.includes('onda')) {
      return wavesSvg()
    }
    if (t.includes('óptica') || t.includes('optica')) {
      return opticsSvg()
    }
  }

  // ============ GEOGRAFIA ============
  if (s.includes('geografia')) {
    if (t.includes('mapa') || t.includes('continente')) {
      return mapContinentSvg()
    }
    if (t.includes('relevo') || t.includes('montanha')) {
      return reliefMountainSvg()
    }
    if (t.includes('bioma')) {
      return biomaSvg()
    }
    if (t.includes('clima')) {
      return climatePatternsSvg()
    }
    if (t.includes('paisagem')) {
      return landscapeSvg()
    }
    if (t.includes('cidade') || t.includes('urbano')) {
      return citySvg()
    }
    if (t.includes('fenômeno') || t.includes('tornado') || t.includes('tempestade')) {
      return weatherPhenomenuSvg()
    }
  }

  // ============ HISTÓRIA ============
  if (s.includes('história') || s.includes('historia')) {
    if (t.includes('civilização') || t.includes('civilizacao') || t.includes('egito')) {
      return ancientCivilizationSvg()
    }
    if (t.includes('castelo')) {
      return castleSvg()
    }
    if (t.includes('pirâmide') || t.includes('piramide')) {
      return pyramidSvg()
    }
    if (t.includes('revolução') || t.includes('revolucao')) {
      return revolutionSvg()
    }
    if (t.includes('personagem') || t.includes('histórico')) {
      return historicalCharacterSvg()
    }
    if (t.includes('período') || t.includes('periodo')) {
      return historicalPeriodSvg()
    }
  }

  // ============ MATEMÁTICA ============
  if (s.includes('matemática') || s.includes('matematica')) {
    if (t.includes('geometria') || t.includes('forma')) {
      return geometryShapesSvg()
    }
    if (t.includes('gráfico') || t.includes('grafico')) {
      return graphChartSvg()
    }
    if (t.includes('fração') || t.includes('fracao')) {
      return fractionsSvg()
    }
    if (t.includes('medida') || t.includes('unidade')) {
      return measurementsSvg()
    }
    if (t.includes('padrão') || t.includes('padrao')) {
      return patternsSvg()
    }
    if (t.includes('relógio') || t.includes('relogio')) {
      return clockSvg()
    }
    if (t.includes('dinheiro') || t.includes('moeda')) {
      return moneySvg()
    }
  }

  // ============ PORTUGUÊS ============
  if (s.includes('português') || s.includes('portugues')) {
    if (t.includes('personagem') || t.includes('pessoa')) {
      return characterSvg()
    }
    if (t.includes('livro') || t.includes('literatura')) {
      return bookSvg()
    }
    if (t.includes('história') || t.includes('narrativa')) {
      return storySceneSvg()
    }
    if (t.includes('gênero') || t.includes('genero')) {
      return literaryGenreSvg()
    }
  }

  // ============ INGLÊS ============
  if (s.includes('inglês') || s.includes('ingles') || s.includes('english')) {
    if (t.includes('objeto')) {
      return objectsSvg()
    }
    if (t.includes('lugar') || t.includes('place')) {
      return placesSvg()
    }
    if (t.includes('animal') || t.includes('animais')) {
      return animalsSvg()
    }
    if (t.includes('alimento') || t.includes('comida')) {
      return foodSvg()
    }
    if (t.includes('profissão') || t.includes('profissao') || t.includes('job')) {
      return professionsSvg()
    }
    if (t.includes('viagem') || t.includes('travel')) {
      return travelSvg()
    }
  }

  // ============ ARTES ============
  if (s.includes('arte') || s.includes('arts')) {
    if (t.includes('pintura') || t.includes('quadro')) {
      return paintingSvg()
    }
    if (t.includes('escultura') || t.includes('sculpture')) {
      return sculptureSvg()
    }
    if (t.includes('movimento') || t.includes('estilo')) {
      return artMovementSvg()
    }
  }

  // Padrão: fallback colorido
  return defaultEducationalSvg()
}

// ============ SVG FUNCTIONS ============
function cellAnimalSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><defs><radialGradient id="cg" cx="40%"><stop offset="0%" stop-color="#FFE5B4"/><stop offset="100%" stop-color="#FFD700"/></radialGradient></defs><circle cx="300" cy="300" r="220" fill="url(#cg)" stroke="#2E8B57" stroke-width="4"/><circle cx="300" cy="300" r="90" fill="#FF69B4" stroke="#DC143C" stroke-width="2"/><circle cx="300" cy="300" r="50" fill="#FFD700" stroke="#FF8C00" stroke-width="2"/><ellipse cx="220" cy="240" rx="40" ry="50" fill="#87CEEB" opacity="0.7"/><circle cx="360" cy="240" r="35" fill="#90EE90" opacity="0.7"/><circle cx="280" cy="360" r="40" fill="#FFB6C1" opacity="0.7"/><text x="300" y="500" font-size="24" fill="#2E8B57" text-anchor="middle" font-weight="bold">CÉLULA ANIMAL</text></svg>`
}

function cellPlantSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><defs><linearGradient id="cpg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#90EE90"/><stop offset="100%" stop-color="#228B22"/></linearGradient></defs><rect x="80" y="80" width="440" height="440" fill="url(#cpg)" stroke="#2E8B57" stroke-width="4" rx="20"/><circle cx="300" cy="300" r="100" fill="#FFD700" stroke="#228B22" stroke-width="2"/><circle cx="300" cy="300" r="60" fill="#90EE90" stroke="#2E8B57" stroke-width="1"/><ellipse cx="200" cy="200" rx="45" ry="60" fill="#87CEEB" opacity="0.7"/><ellipse cx="400" cy="220" rx="50" ry="55" fill="#87CEEB" opacity="0.7"/><text x="300" y="520" font-size="24" fill="#2E8B57" text-anchor="middle" font-weight="bold">CÉLULA VEGETAL</text></svg>`
}

function dnaSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><defs><linearGradient id="dg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FF1493"/><stop offset="100%" stop-color="#0099FF"/></linearGradient></defs><path d="M 300 80 Q 250 150 300 220 Q 350 150 300 80" fill="none" stroke="url(#dg)" stroke-width="6"/><path d="M 300 220 Q 250 290 300 360 Q 350 290 300 220" fill="none" stroke="url(#dg)" stroke-width="6"/><path d="M 300 360 Q 250 430 300 500 Q 350 430 300 360" fill="none" stroke="url(#dg)" stroke-width="6"/><circle cx="280" cy="150" r="12" fill="#FFD700"/><circle cx="320" cy="150" r="12" fill="#00FF00"/><circle cx="270" cy="290" r="12" fill="#FFD700"/><circle cx="330" cy="290" r="12" fill="#00FF00"/><circle cx="280" cy="430" r="12" fill="#FFD700"/><circle cx="320" cy="430" r="12" fill="#00FF00"/><text x="300" y="560" font-size="20" fill="#FF1493" text-anchor="middle" font-weight="bold">DNA - GENÉTICA</text></svg>`
}

function systemRespirarySvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle cx="180" cy="250" r="90" fill="#FF6B6B" stroke="#CC0000" stroke-width="2"/><circle cx="420" cy="250" r="90" fill="#FF6B6B" stroke="#CC0000" stroke-width="2"/><rect x="260" y="200" width="80" height="150" fill="#8B4513" stroke="#654321" stroke-width="2"/><line x1="300" y1="350" x2="300" y2="450" stroke="#8B4513" stroke-width="3"/><text x="300" y="520" font-size="20" fill="#CC0000" text-anchor="middle" font-weight="bold">SISTEMA RESPIRATÓRIO</text></svg>`
}

function systemCircularySvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle cx="300" cy="300" r="80" fill="#E71C3C" stroke="#8B0000" stroke-width="3"/><path d="M 300 220 Q 250 200 200 250" fill="none" stroke="#E71C3C" stroke-width="4"/><path d="M 300 220 Q 350 200 400 250" fill="none" stroke="#E71C3C" stroke-width="4"/><path d="M 300 380 Q 250 400 200 350" fill="none" stroke="#0066CC" stroke-width="4"/><path d="M 300 380 Q 350 400 400 350" fill="none" stroke="#0066CC" stroke-width="4"/><circle cx="200" cy="250" r="20" fill="#E71C3C" stroke="#8B0000" stroke-width="2"/><circle cx="400" cy="250" r="20" fill="#E71C3C" stroke="#8B0000" stroke-width="2"/><text x="300" y="520" font-size="20" fill="#E71C3C" text-anchor="middle" font-weight="bold">SISTEMA CIRCULATÓRIO</text></svg>`
}

function evolutionSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><g id="fish"><ellipse cx="100" cy="150" rx="40" ry="30" fill="#0066FF"/><polygon points="140,150 180,130 180,170" fill="#0066FF"/></g><g id="amphibian"><ellipse cx="220" cy="150" rx="40" ry="35" fill="#00CC00"/><circle cx="200" cy="130" r="8" fill="#00AA00"/><circle cx="240" cy="130" r="8" fill="#00AA00"/></g><g id="reptile"><rect x="300" y="130" width="70" height="40" fill="#FFB84D" rx="5"/><circle cx="315" cy="125" r="8" fill="#FF9500"/></g><g id="mammal"><circle cx="450" cy="150" r="40" fill="#8B4513"/><circle cx="465" cy="125" r="8" fill="#6B3410"/></g><line x1="140" y1="150" x2="180" y2="150" stroke="#666" stroke-width="2"/><line x1="260" y1="150" x2="300" y2="150" stroke="#666" stroke-width="2"/><line x1="370" y1="150" x2="410" y2="150" stroke="#666" stroke-width="2"/><text x="300" y="520" font-size="20" fill="#2E7D32" text-anchor="middle" font-weight="bold">EVOLUÇÃO</text></svg>`
}

function ecosystemSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect x="0" y="300" width="600" height="300" fill="#8B6F47"/><rect x="0" y="100" width="600" height="200" fill="#87CEEB"/><polygon points="100,300 150,200 200,300" fill="#228B22"/><polygon points="350,300 400,150 450,300" fill="#228B22"/><circle cx="500" cy="200" r="50" fill="#FFD700" opacity="0.8"/><circle cx="150" cy="400" r="20" fill="#FFB347"/><polygon points="400,400 420,360 440,400" fill="#666"/><text x="300" y="520" font-size="20" fill="#2E7D32" text-anchor="middle" font-weight="bold">ECOSSISTEMA</text></svg>`
}

function solarSystemSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle cx="300" cy="300" r="60" fill="#FFD700"/><circle cx="200" cy="300" r="20" fill="#8B7355"/><circle cx="350" cy="250" r="25" fill="#4169E1"/><circle cx="420" cy="320" r="15" fill="#FF6B35"/><circle cx="250" cy="420" r="30" fill="#C0826D"/><circle cx="450" cy="200" r="12" fill="#FFB347"/><ellipse cx="300" cy="300" rx="120" ry="30" fill="none" stroke="#999" stroke-width="1" stroke-dasharray="5,5"/><text x="300" y="520" font-size="20" fill="#FF8C00" text-anchor="middle" font-weight="bold">SISTEMA SOLAR</text></svg>`
}

function waterCycleSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect x="0" y="350" width="600" height="250" fill="#4169E1"/><circle cx="150" cy="200" r="80" fill="none" stroke="#999" stroke-width="2" stroke-dasharray="5,5"/><path d="M 150 120 Q 200 100 250 150" fill="none" stroke="#FF8C00" stroke-width="3"/><path d="M 250 150 Q 280 200 200 280" fill="none" stroke="#4169E1" stroke-width="3"/><path d="M 200 280 Q 150 300 120 350" fill="none" stroke="#4169E1" stroke-width="3"/><text x="100" y="90" font-size="12" fill="#666">Evaporação</text><text x="280" y="160" font-size="12" fill="#666">Condensação</text><text x="80" y="330" font-size="12" fill="#666">Precipitação</text><text x="300" y="520" font-size="20" fill="#0066FF" text-anchor="middle" font-weight="bold">CICLO DA ÁGUA</text></svg>`
}

function humanBodySvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle cx="300" cy="120" r="40" fill="#FDBCB4"/><rect x="270" y="160" width="60" height="100" fill="#FDBCB4"/><rect x="220" y="180" width="50" height="120" fill="#FDBCB4"/><rect x="330" y="180" width="50" height="120" fill="#FDBCB4"/><rect x="260" y="260" width="30" height="150" fill="#FDBCB4"/><rect x="310" y="260" width="30" height="150" fill="#FDBCB4"/><circle cx="300" cy="180" r="20" fill="#FF6B6B" opacity="0.6"/><text x="300" y="520" font-size="20" fill="#8B4513" text-anchor="middle" font-weight="bold">CORPO HUMANO</text></svg>`
}

function foodChainSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle cx="100" cy="300" r="35" fill="#90EE90"/><polygon points="250,300 280,280 310,300 280,320" fill="#FFD700"/><ellipse cx="420" cy="300" rx="40" ry="50" fill="#FF6B35"/><path d="M 135 300 L 220 300" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/><path d="M 315 300 L 380 300" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/><text x="100" y="360" font-size="12" text-anchor="middle" fill="#2E7D32">Planta</text><text x="280" y="360" font-size="12" text-anchor="middle" fill="#FF8C00">Inseto</text><text x="420" y="360" font-size="12" text-anchor="middle" fill="#CC0000">Predador</text><text x="300" y="520" font-size="20" fill="#2E7D32" text-anchor="middle" font-weight="bold">CADEIA ALIMENTAR</text></svg>`
}

function animalsSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><ellipse cx="100" cy="200" rx="30" ry="40" fill="#FFB347"/><circle cx="100" cy="160" r="15" fill="#FFB347"/><polygon points="130,190 150,180 145,210" fill="#FFB347"/><ellipse cx="300" cy="250" rx="50" ry="60" fill="#8B7355"/><circle cx="290" cy="180" r="25" fill="#8B7355"/><polygon points="280,150 270,130 290,130" fill="#8B7355"/><circle cx="480" cy="200" r="45" fill="#FF6B6B"/><circle cx="460" cy="170" r="20" fill="#FF6B6B"/><polygon points="440,175 420,165 430,190" fill="#FF6B6B"/><text x="300" y="520" font-size="20" fill="#2E7D32" text-anchor="middle" font-weight="bold">ANIMAIS</text></svg>`
}

function plantsSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect x="140" y="350" width="20" height="150" fill="#8B4513"/><polygon points="150,350 80,250 150,200 220,250" fill="#228B22"/><polygon points="150,280 100,200 150,150 200,200" fill="#228B22"/><circle cx="150" cy="120" r="25" fill="#90EE90"/><circle cx="100" cy="300" r="20" fill="#90EE90"/><circle cx="200" cy="320" r="22" fill="#90EE90"/><rect x="340" y="350" width="15" height="180" fill="#8B4513"/><polygon points="347,350 310,280 347,250 384,280" fill="#228B22"/><circle cx="347" cy="200" r="20" fill="#FFD700"/><text x="300" y="520" font-size="20" fill="#2E7D32" text-anchor="middle" font-weight="bold">PLANTAS</text></svg>`
}

function atomSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle cx="300" cy="300" r="30" fill="#FF0000" stroke="#8B0000" stroke-width="2"/><ellipse cx="300" cy="300" rx="120" ry="80" fill="none" stroke="#0099FF" stroke-width="3" opacity="0.7"/><ellipse cx="300" cy="300" rx="80" ry="120" fill="none" stroke="#00FF00" stroke-width="3" opacity="0.7" transform="rotate(60 300 300)"/><circle cx="300" cy="170" r="12" fill="#FFD700" stroke="#FFA500" stroke-width="2"/><circle cx="380" cy="280" r="12" fill="#FFD700" stroke="#FFA500" stroke-width="2"/><circle cx="300" cy="430" r="12" fill="#FFD700" stroke="#FFA500" stroke-width="2"/><circle cx="220" cy="280" r="12" fill="#FFD700" stroke="#FFA500" stroke-width="2"/><text x="300" y="520" font-size="24" fill="#FF0000" text-anchor="middle" font-weight="bold">ÁTOMO</text></svg>`
}

function moleculeSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle cx="150" cy="300" r="25" fill="#FF6B9D"/><circle cx="250" cy="300" r="25" fill="#4ECDC4"/><circle cx="350" cy="300" r="25" fill="#FFD700"/><line x1="175" y1="300" x2="225" y2="300" stroke="#333" stroke-width="2"/><line x1="275" y1="300" x2="325" y2="300" stroke="#333" stroke-width="2"/><circle cx="150" cy="200" r="12" fill="#00FF00"/><circle cx="250" cy="400" r="12" fill="#0099FF"/><line x1="150" y1="225" x2="150" y2="188" stroke="#333" stroke-width="1"/><line x1="250" y1="325" x2="250" y2="388" stroke="#333" stroke-width="1"/><text x="300" y="520" font-size="20" fill="#FF6B9D" text-anchor="middle" font-weight="bold">MOLÉCULA</text></svg>`
}

function periodicTableSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect x="50" y="100" width="80" height="80" fill="#FF6B9D" stroke="#333" stroke-width="2"/><text x="90" y="125" font-size="14" text-anchor="middle" font-weight="bold" fill="white">H</text><text x="90" y="150" font-size="10" text-anchor="middle" fill="white">Hidrogênio</text><rect x="150" y="100" width="80" height="80" fill="#4ECDC4" stroke="#333" stroke-width="2"/><text x="190" y="125" font-size="14" text-anchor="middle" font-weight="bold" fill="white">O</text><text x="190" y="150" font-size="10" text-anchor="middle" fill="white">Oxigênio</text><rect x="250" y="100" width="80" height="80" fill="#FFD700" stroke="#333" stroke-width="2"/><text x="290" y="125" font-size="14" text-anchor="middle" font-weight="bold">C</text><text x="290" y="150" font-size="10" text-anchor="middle">Carbono</text><rect x="350" y="100" width="80" height="80" fill="#FF6B35" stroke="#333" stroke-width="2"/><text x="390" y="125" font-size="14" text-anchor="middle" font-weight="bold" fill="white">N</text><text x="390" y="150" font-size="10" text-anchor="middle" fill="white">Nitrogênio</text><text x="300" y="520" font-size="20" fill="#FFD700" text-anchor="middle" font-weight="bold">TABELA PERIÓDICA</text></svg>`
}

function chemicalBondSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle cx="150" cy="300" r="30" fill="#FF6B9D" stroke="#333" stroke-width="2"/><circle cx="450" cy="300" r="30" fill="#4ECDC4" stroke="#333" stroke-width="2"/><line x1="180" y1="300" x2="420" y2="300" stroke="#333" stroke-width="3"/><text x="150" y="260" font-size="12" text-anchor="middle" fill="#333">Átomo A</text><text x="450" y="260" font-size="12" text-anchor="middle" fill="#333">Átomo B</text><text x="300" y="380" font-size="14" text-anchor="middle" fill="#333">Ligação Covalente</text><text x="300" y="520" font-size="20" fill="#FF6B9D" text-anchor="middle" font-weight="bold">LIGAÇÕES QUÍMICAS</text></svg>`
}

function chemicalReactionSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle cx="100" cy="300" r="20" fill="#FF6B9D"/><circle cx="120" cy="280" r="20" fill="#4ECDC4"/><text x="110" y="350" font-size="14" text-anchor="middle" fill="#333">Reagentes</text><path d="M 150 300 L 250 300" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/><text x="200" y="280" font-size="12" text-anchor="middle" fill="#333">Calor</text><circle cx="300" cy="300" r="20" fill="#FFD700"/><circle cx="320" cy="280" r="20" fill="#00FF00"/><text x="310" y="350" font-size="14" text-anchor="middle" fill="#333">Produtos</text><text x="300" y="520" font-size="20" fill="#FF6B9D" text-anchor="middle" font-weight="bold">REAÇÃO QUÍMICA</text></svg>`
}

function laboratoryEquipmentSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><path d="M 100 450 L 120 250 L 140 450 Z" fill="none" stroke="#8B4513" stroke-width="2"/><polygon points="120,250 140,250 140,200 120,200" fill="#87CEEB"/><circle cx="280" cy="400" r="50" fill="none" stroke="#8B4513" stroke-width="2"/><rect x="260" y="200" width="40" height="200" fill="#FFD700" stroke="#FF8C00" stroke-width="2"/><line x1="280" y1="200" x2="280" y2="180" stroke="#FF8C00" stroke-width="2"/><circle cx="450" cy="350" r="35" fill="none" stroke="#0066FF" stroke-width="2"/><line x1="430" y1="315" x2="420" y2="280" stroke="#0066FF" stroke-width="2"/><text x="300" y="520" font-size="20" fill="#8B4513" text-anchor="middle" font-weight="bold">LABORATÓRIO</text></svg>`
}

function organicStructureSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle cx="150" cy="250" r="15" fill="#FFD700"/><circle cx="200" cy="200" r="15" fill="#FFD700"/><circle cx="250" cy="250" r="15" fill="#FFD700"/><circle cx="250" cy="350" r="15" fill="#FF6B9D"/><circle cx="300" cy="400" r="15" fill="#FF6B9D"/><line x1="165" y1="240" x2="185" y2="210" stroke="#333" stroke-width="2"/><line x1="215" y1="210" x2="235" y2="240" stroke="#333" stroke-width="2"/><line x1="250" y1="265" x2="250" y2="335" stroke="#333" stroke-width="2"/><line x1="265" y1="360" x2="285" y2="390" stroke="#333" stroke-width="2"/><text x="300" y="520" font-size="20" fill="#FFD700" text-anchor="middle" font-weight="bold">QUÍMICA ORGÂNICA</text></svg>`
}

function movementSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect x="100" y="300" width="60" height="60" fill="#FF6B35" stroke="#333" stroke-width="2"/><circle cx="160" cy="380" r="15" fill="#333"/><circle cx="160" cy="380" r="10" fill="#666"/><path d="M 100 200 Q 150 150 200 200" fill="none" stroke="#0099FF" stroke-width="3" stroke-dasharray="5,5"/><text x="150" y="160" font-size="12" text-anchor="middle" fill="#333">Movimento</text><path d="M 250 330 L 350 330" stroke="#FF8C00" stroke-width="3" marker-end="url(#arrowhead)"/><text x="300" y="310" font-size="12" text-anchor="middle" fill="#333">Velocidade</text><text x="300" y="520" font-size="20" fill="#FF6B35" text-anchor="middle" font-weight="bold">MOVIMENTO</text></svg>`
}

function forcesSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle cx="300" cy="300" r="40" fill="#FF8C00" stroke="#CC0000" stroke-width="2"/><line x1="340" y1="300" x2="420" y2="300" stroke="#CC0000" stroke-width="3" marker-end="url(#arrowhead)"/><line x1="260" y1="300" x2="180" y2="300" stroke="#0066FF" stroke-width="3" marker-end="url(#arrowhead)"/><line x1="300" y1="340" x2="300" y2="420" stroke="#FFD700" stroke-width="3" marker-end="url(#arrowhead)"/><text x="300" y="520" font-size="20" fill="#FF8C00" text-anchor="middle" font-weight="bold">FORÇAS</text></svg>`
}

function machinesSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle cx="200" cy="250" r="50" fill="#8B7355" stroke="#654321" stroke-width="2"/><circle cx="200" cy="250" r="40" fill="none" stroke="#654321" stroke-width="1" stroke-dasharray="3,3"/><path d="M 240 250 L 360 250" stroke="#666" stroke-width="4"/><circle cx="400" cy="250" r="40" fill="#8B7355" stroke="#654321" stroke-width="2"/><line x1="200" y1="300" x2="200" y2="380" stroke="#8B7355" stroke-width="3"/><line x1="400" y1="300" x2="400" y2="380" stroke="#8B7355" stroke-width="3"/><text x="300" y="520" font-size="20" fill="#8B7355" text-anchor="middle" font-weight="bold">MÁQUINAS</text></svg>`
}

function electricitySvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><path d="M 300 100 L 280 180 L 310 200 L 280 300 L 320 320 L 300 450" fill="none" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/><circle cx="200" cy="300" r="30" fill="#0066CC" stroke="#333" stroke-width="2"/><text x="200" y="310" font-size="14" text-anchor="middle" fill="white">+</text><circle cx="400" cy="300" r="30" fill="#CC0000" stroke="#333" stroke-width="2"/><text x="400" y="310" font-size="14" text-anchor="middle" fill="white">-</text><line x1="200" y1="330" x2="250" y2="300" stroke="#333" stroke-width="2"/><line x1="350" y1="300" x2="400" y2="330" stroke="#333" stroke-width="2"/><text x="300" y="520" font-size="20" fill="#FFD700" text-anchor="middle" font-weight="bold">ELETRICIDADE</text></svg>`
}

function wavesSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><path d="M 50 300 Q 100 250 150 300 T 250 300 T 350 300 T 450 300 T 550 300" fill="none" stroke="#0099FF" stroke-width="4"/><line x1="100" y1="300" x2="100" y2="200" stroke="#666" stroke-width="1" stroke-dasharray="2,2"/><text x="110" y="250" font-size="12" fill="#333">A</text><double-headed-arrow x1="150" y1="320" x2="250" y2="320" stroke="#FF8C00" stroke-width="2"/><text x="200" y="345" font-size="12" text-anchor="middle" fill="#333">λ</text><text x="300" y="520" font-size="20" fill="#0099FF" text-anchor="middle" font-weight="bold">ONDAS</text></svg>`
}

function opticsSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle cx="300" cy="300" r="60" fill="none" stroke="#0066FF" stroke-width="3"/><circle cx="300" cy="300" r="50" fill="#87CEEB" opacity="0.3"/><path d="M 150 200 L 300 300 L 150 400" stroke="#FF8C00" stroke-width="2"/><path d="M 450 200 L 300 300 L 450 400" stroke="#00FF00" stroke-width="2"/><text x="100" y="300" font-size="12" text-anchor="middle" fill="#333">Objeto</text><text x="500" y="300" font-size="12" text-anchor="middle" fill="#333">Imagem</text><text x="300" y="520" font-size="20" fill="#0066FF" text-anchor="middle" font-weight="bold">ÓPTICA</text></svg>`
}

function mapContinentSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect x="0" y="250" width="600" height="350" fill="#4169E1"/><polygon points="80,250 150,200 200,250 180,320 120,350" fill="#228B22"/><polygon points="280,220 350,180 400,240 380,350 300,360" fill="#228B22"/><polygon points="450,250 500,200 530,300 480,340" fill="#228B22"/><text x="120" y="310" font-size="10" text-anchor="middle" fill="white">América</text><text x="340" y="300" font-size="10" text-anchor="middle" fill="white">Europa</text><text x="490" y="320" font-size="10" text-anchor="middle" fill="white">Ásia</text><text x="300" y="520" font-size="20" fill="#228B22" text-anchor="middle" font-weight="bold">MAPAS E CONTINENTES</text></svg>`
}

function reliefMountainSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><polygon points="100,450 200,200 300,300 400,150 500,350 600,450" fill="#8B7355" stroke="#654321" stroke-width="2"/><polygon points="200,300 250,250 300,300" fill="#FFFFFF" opacity="0.7"/><polygon points="400,200 420,180 440,200" fill="#FFFFFF" opacity="0.7"/><rect x="0" y="450" width="600" height="150" fill="#228B22"/><text x="300" y="520" font-size="20" fill="#8B7355" text-anchor="middle" font-weight="bold">RELEVO</text></svg>`
}

function biomaSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><polygon points="100,400 150,250 200,400" fill="#228B22"/><polygon points="250,400 300,200 350,400" fill="#2E8B57"/><polygon points="400,400 450,280 500,400" fill="#228B22"/><circle cx="100" cy="480" r="15" fill="#FFB347"/><circle cx="300" cy="480" r="15" fill="#FFB347"/><circle cx="500" cy="480" r="15" fill="#FFB347"/><polygon points="50,500 60,480 70,500" fill="#2E7D32"/><polygon points="300,500 310,480 320,500" fill="#2E7D32"/><polygon points="550,500 560,480 570,500" fill="#2E7D32"/><text x="300" y="520" font-size="20" fill="#228B22" text-anchor="middle" font-weight="bold">BIOMA</text></svg>`
}

function climatePatternsSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle cx="500" cy="150" r="50" fill="#FFD700" opacity="0.8"/><path d="M 100 250 Q 150 200 200 250 Q 250 300 300 250 Q 350 200 400 250" fill="none" stroke="#0066FF" stroke-width="3"/><text x="100" y="320" font-size="12" text-anchor="middle" fill="#333">Frio</text><text x="300" y="320" font-size="12" text-anchor="middle" fill="#333">Quente</text><text x="500" y="320" font-size="12" text-anchor="middle" fill="#333">Seco</text><text x="300" y="520" font-size="20" fill="#FFD700" text-anchor="middle" font-weight="bold">CLIMA</text></svg>`
}

function landscapeSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect x="0" y="350" width="600" height="250" fill="#8B6F47"/><rect x="0" y="150" width="600" height="200" fill="#87CEEB"/><polygon points="100,350 150,200 200,350" fill="#228B22"/><polygon points="350,350 400,180 450,350" fill="#8B4513"/><circle cx="500" cy="200" r="50" fill="#FFD700" opacity="0.8"/><circle cx="100" cy="500" r="15" fill="#FFB347"/><text x="300" y="520" font-size="20" fill="#228B22" text-anchor="middle" font-weight="bold">PAISAGEM</text></svg>`
}

function citySvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect x="80" y="280" width="80" height="170" fill="#8B8B8B" stroke="#333" stroke-width="2"/><rect x="110" y="310" width="15" height="15" fill="#FFD700"/><rect x="145" y="310" width="15" height="15" fill="#FFD700"/><rect x="110" y="350" width="15" height="15" fill="#FFD700"/><rect x="145" y="350" width="15" height="15" fill="#FFD700"/><rect x="240" y="250" width="100" height="200" fill="#A9A9A9" stroke="#333" stroke-width="2"/><polygon points="290,250 290,200 340,250" fill="#CC0000"/><rect x="400" y="320" width="70" height="130" fill="#B0C4DE" stroke="#333" stroke-width="2"/><rect x="0" y="450" width="600" height="150" fill="#228B22"/><text x="300" y="520" font-size="20" fill="#8B8B8B" text-anchor="middle" font-weight="bold">CIDADE</text></svg>`
}

function weatherPhenomenuSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle cx="150" cy="250" r="40" fill="#808080" stroke="#333" stroke-width="2"/><path d="M 120 290 L 100 370" stroke="#0066FF" stroke-width="3"/><path d="M 150 300 L 140 380" stroke="#0066FF" stroke-width="3"/><path d="M 180 290 L 200 370" stroke="#0066FF" stroke-width="3"/><circle cx="400" cy="200" r="50" fill="#FFD700" opacity="0.6"/><path d="M 350 300 Q 375 200 400 150 Q 425 200 450 300" fill="none" stroke="#FF8C00" stroke-width="3"/><text x="150" y="430" font-size="12" text-anchor="middle" fill="#333">Chuva</text><text x="400" y="430" font-size="12" text-anchor="middle" fill="#333">Tornado</text><text x="300" y="520" font-size="20" fill="#0066FF" text-anchor="middle" font-weight="bold">FENÔMENOS NATURAIS</text></svg>`
}

function ancientCivilizationSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><polygon points="200,450 250,200 300,450" fill="#CCAA77" stroke="#8B7355" stroke-width="2"/><polygon points="300,450 350,250 400,450" fill="#D4B896" stroke="#8B7355" stroke-width="2"/><rect x="50" y="350" width="100" height="100" fill="#C19A6B" stroke="#8B7355" stroke-width="2"/><text x="100" y="410" font-size="12" text-anchor="middle" fill="white">TEMPLO</text><circle cx="450" cy="300" r="30" fill="none" stroke="#8B7355" stroke-width="3"/><circle cx="450" cy="300" r="20" fill="none" stroke="#8B7355" stroke-width="1" stroke-dasharray="3,3"/><text x="300" y="520" font-size="20" fill="#8B7355" text-anchor="middle" font-weight="bold">CIVILIZAÇÕES ANTIGAS</text></svg>`
}

function castleSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect x="100" y="300" width="150" height="150" fill="#8B7355" stroke="#654321" stroke-width="2"/><polygon points="125,300 125,250 150,300" fill="#CC0000"/><polygon points="175,300 175,270 200,300" fill="#CC0000"/><polygon points="225,300 225,240 250,300" fill="#CC0000"/><rect x="350" y="300" width="150" height="150" fill="#A0826D" stroke="#654321" stroke-width="2"/><polygon points="375,300 375,220 400,300" fill="#CC0000"/><polygon points="425,300 425,210 450,300" fill="#CC0000"/><line x1="125" y1="200" x2="375" y2="200" stroke="#654321" stroke-width="2"/><text x="300" y="520" font-size="20" fill="#8B7355" text-anchor="middle" font-weight="bold">CASTELO</text></svg>`
}

function pyramidSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><polygon points="300,150 100,400 500,400" fill="#CCAA77" stroke="#8B7355" stroke-width="2"/><line x1="300" y1="150" x2="300" y2="400" stroke="#8B7355" stroke-width="1" stroke-dasharray="3,3"/><line x1="200" y1="300" x2="400" y2="300" stroke="#8B7355" stroke-width="1" stroke-dasharray="2,2"/><text x="300" y="520" font-size="20" fill="#8B7355" text-anchor="middle" font-weight="bold">PIRÂMIDE</text></svg>`
}

function revolutionSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle cx="150" cy="300" r="40" fill="#FFD700"/><circle cx="300" cy="300" r="40" fill="#FF6B35"/><circle cx="450" cy="300" r="40" fill="#228B22"/><path d="M 190 300 L 260 300" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/><path d="M 340 300 L 410 300" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)"/><text x="150" y="370" font-size="12" text-anchor="middle" fill="#333">Antes</text><text x="300" y="370" font-size="12" text-anchor="middle" fill="#333">Conflito</text><text x="450" y="370" font-size="12" text-anchor="middle" fill="#333">Depois</text><text x="300" y="520" font-size="20" fill="#FF6B35" text-anchor="middle" font-weight="bold">REVOLUÇÃO</text></svg>`
}

function historicalCharacterSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle cx="300" cy="200" r="40" fill="#FDBCB4" stroke="#333" stroke-width="2"/><rect x="270" y="240" width="60" height="100" fill="#8B4513" stroke="#333" stroke-width="2"/><circle cx="300" cy="240" r="15" fill="#FFD700"/><rect x="250" y="270" width="25" height="80" fill="#FDBCB4"/><rect x="325" y="270" width="25" height="80" fill="#FDBCB4"/><rect x="260" y="340" width="20" height="100" fill="#654321"/><rect x="320" y="340" width="20" height="100" fill="#654321"/><text x="300" y="520" font-size="20" fill="#8B4513" text-anchor="middle" font-weight="bold">PERSONAGEM HISTÓRICO</text></svg>`
}

function historicalPeriodSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><line x1="50" y1="300" x2="550" y2="300" stroke="#333" stroke-width="3"/><circle cx="100" cy="300" r="15" fill="#FFD700" stroke="#333" stroke-width="2"/><circle cx="200" cy="300" r="15" fill="#FF6B35" stroke="#333" stroke-width="2"/><circle cx="300" cy="300" r="15" fill="#228B22" stroke="#333" stroke-width="2"/><circle cx="400" cy="300" r="15" fill="#0066FF" stroke="#333" stroke-width="2"/><circle cx="500" cy="300" r="15" fill="#8B00FF" stroke="#333" stroke-width="2"/><text x="100" y="350" font-size="10" text-anchor="middle" fill="#333">Antigo</text><text x="300" y="350" font-size="10" text-anchor="middle" fill="#333">Medieval</text><text x="500" y="350" font-size="10" text-anchor="middle" fill="#333">Moderno</text><text x="300" y="520" font-size="20" fill="#333" text-anchor="middle" font-weight="bold">PERÍODO HISTÓRICO</text></svg>`
}

function geometryShapesSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle cx="120" cy="250" r="50" fill="#FF6B9D" stroke="#333" stroke-width="2"/><polygon points="250,200 300,350 350,200" fill="#4ECDC4" stroke="#333" stroke-width="2"/><rect x="380" y="200" width="100" height="100" fill="#FFD700" stroke="#333" stroke-width="2"/><text x="120" y="400" font-size="12" text-anchor="middle" fill="#333">Círculo</text><text x="300" y="400" font-size="12" text-anchor="middle" fill="#333">Triângulo</text><text x="430" y="400" font-size="12" text-anchor="middle" fill="#333">Quadrado</text><text x="300" y="520" font-size="20" fill="#FFD700" text-anchor="middle" font-weight="bold">GEOMETRIA</text></svg>`
}

function graphChartSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><line x1="50" y1="450" x2="550" y2="450" stroke="#333" stroke-width="2"/><line x1="50" y1="450" x2="50" y2="50" stroke="#333" stroke-width="2"/><rect x="100" y="350" width="40" height="100" fill="#FF6B9D"/><rect x="170" y="250" width="40" height="200" fill="#4ECDC4"/><rect x="240" y="150" width="40" height="300" fill="#FFD700"/><rect x="310" y="200" width="40" height="250" fill="#00FF00"/><rect x="380" y="300" width="40" height="150" fill="#0066FF"/><text x="300" y="520" font-size="20" fill="#FF6B9D" text-anchor="middle" font-weight="bold">GRÁFICOS</text></svg>`
}

function fractionsSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle cx="150" cy="250" r="70" fill="#FFD700" stroke="#333" stroke-width="2"/><line x1="150" y1="180" x2="150" y2="320" stroke="#333" stroke-width="2"/><path d="M 150 250 L 220 250" stroke="#333" stroke-width="3"/><circle cx="380" cy="250" r="70" fill="#FF6B9D" stroke="#333" stroke-width="2"/><line x1="310" y1="250" x2="450" y2="250" stroke="#333" stroke-width="2"/><line x1="380" y1="180" x2="380" y2="320" stroke="#333" stroke-width="2"/><path d="M 380 250 L 450 250" stroke="#333" stroke-width="3"/><text x="150" y="390" font-size="12" text-anchor="middle" fill="#333">1/2</text><text x="380" y="390" font-size="12" text-anchor="middle" fill="#333">3/4</text><text x="300" y="520" font-size="20" fill="#FFD700" text-anchor="middle" font-weight="bold">FRAÇÕES</text></svg>`
}

function measurementsSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><line x1="100" y1="300" x2="500" y2="300" stroke="#333" stroke-width="3"/><line x1="100" y1="280" x2="100" y2="320" stroke="#333" stroke-width="2"/><line x1="200" y1="290" x2="200" y2="310" stroke="#333" stroke-width="2"/><line x1="300" y1="290" x2="300" y2="310" stroke="#333" stroke-width="2"/><line x1="400" y1="290" x2="400" y2="310" stroke="#333" stroke-width="2"/><line x1="500" y1="280" x2="500" y2="320" stroke="#333" stroke-width="2"/><text x="100" y="350" font-size="12" text-anchor="middle" fill="#333">0</text><text x="300" y="350" font-size="12" text-anchor="middle" fill="#333">5cm</text><text x="500" y="350" font-size="12" text-anchor="middle" fill="#333">10cm</text><text x="300" y="520" font-size="20" fill="#333" text-anchor="middle" font-weight="bold">MEDIDAS</text></svg>`
}

function patternsSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle cx="100" cy="250" r="20" fill="#FF6B9D"/><circle cx="180" cy="250" r="20" fill="#4ECDC4"/><circle cx="260" cy="250" r="20" fill="#FF6B9D"/><circle cx="340" cy="250" r="20" fill="#4ECDC4"/><circle cx="420" cy="250" r="20" fill="#FF6B9D"/><circle cx="500" cy="250" r="20" fill="#4ECDC4"/><circle cx="100" cy="350" r="20" fill="#FFD700"/><circle cx="140" cy="350" r="20" fill="#FFD700"/><circle cx="180" cy="350" r="20" fill="#00FF00"/><circle cx="220" cy="350" r="20" fill="#00FF00"/><circle cx="260" cy="350" r="20" fill="#FFD700"/><circle cx="300" cy="350" r="20" fill="#FFD700"/><text x="300" y="520" font-size="20" fill="#FFD700" text-anchor="middle" font-weight="bold">PADRÕES</text></svg>`
}

function clockSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle cx="300" cy="300" r="120" fill="white" stroke="#333" stroke-width="3"/><circle cx="300" cy="300" r="10" fill="#333"/><line x1="300" y1="300" x2="300" y2="200" stroke="#333" stroke-width="4"/><line x1="300" y1="300" x2="380" y2="300" stroke="#333" stroke-width="3"/><circle cx="300" cy="180" r="8" fill="#333"/><circle cx="300" cy="420" r="8" fill="#333"/><circle cx="180" cy="300" r="8" fill="#333"/><circle cx="420" cy="300" r="8" fill="#333"/><text x="300" y="520" font-size="20" fill="#333" text-anchor="middle" font-weight="bold">RELÓGIO</text></svg>`
}

function moneySvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle cx="150" cy="250" r="40" fill="#FFD700" stroke="#FF8C00" stroke-width="2"/><text x="150" y="260" font-size="24" text-anchor="middle" font-weight="bold" fill="#FF8C00">R$</text><circle cx="300" cy="250" r="40" fill="#FFD700" stroke="#FF8C00" stroke-width="2"/><text x="300" y="260" font-size="24" text-anchor="middle" font-weight="bold" fill="#FF8C00">$</text><rect x="420" y="220" width="80" height="60" fill="#C0C0C0" stroke="#888" stroke-width="2" rx="5"/><text x="460" y="255" font-size="20" text-anchor="middle" font-weight="bold" fill="#333">100</text><text x="300" y="520" font-size="20" fill="#FFD700" text-anchor="middle" font-weight="bold">DINHEIRO</text></svg>`
}

function characterSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle cx="300" cy="200" r="40" fill="#FDBCB4" stroke="#333" stroke-width="2"/><rect x="270" y="240" width="60" height="100" fill="#8B4513" stroke="#333" stroke-width="2"/><rect x="250" y="270" width="25" height="80" fill="#FDBCB4"/><rect x="325" y="270" width="25" height="80" fill="#FDBCB4"/><rect x="260" y="340" width="20" height="100" fill="#654321"/><rect x="320" y="340" width="20" height="100" fill="#654321"/><text x="300" y="520" font-size="20" fill="#8B4513" text-anchor="middle" font-weight="bold">PERSONAGEM</text></svg>`
}

function bookSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><path d="M 150 200 L 150 400 L 300 420 L 300 200 Z" fill="#8B4513" stroke="#654321" stroke-width="2"/><path d="M 300 200 L 300 420 L 450 400 L 450 200 Z" fill="#A0522D" stroke="#654321" stroke-width="2"/><line x1="300" y1="200" x2="300" y2="420" stroke="#654321" stroke-width="2"/><line x1="180" y1="250" x2="270" y2="250" stroke="#FFD700" stroke-width="1" opacity="0.5"/><line x1="180" y1="290" x2="270" y2="290" stroke="#FFD700" stroke-width="1" opacity="0.5"/><line x1="330" y1="250" x2="420" y2="250" stroke="#FFD700" stroke-width="1" opacity="0.5"/><line x1="330" y1="290" x2="420" y2="290" stroke="#FFD700" stroke-width="1" opacity="0.5"/><text x="300" y="520" font-size="20" fill="#8B4513" text-anchor="middle" font-weight="bold">LIVRO</text></svg>`
}

function storySceneSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect x="50" y="100" width="500" height="300" fill="#87CEEB" stroke="#333" stroke-width="2" rx="10"/><polygon points="150,150 200,80 250,150" fill="#228B22"/><circle cx="400" cy="200" r="50" fill="#FFD700"/><circle cx="200" cy="300" r="30" fill="#FDBCB4"/><rect x="220" y="290" width="40" height="60" fill="#8B4513"/><polygon points="260,310 240,330 280,330" fill="#FDBCB4"/><polygon points="280,310 300,330 260,330" fill="#FDBCB4"/><text x="300" y="520" font-size="20" fill="#8B4513" text-anchor="middle" font-weight="bold">HISTÓRIA/NARRATIVA</text></svg>`
}

function literaryGenreSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect x="80" y="150" width="100" height="120" fill="#FF6B9D" stroke="#333" stroke-width="2" rx="5"/><text x="130" y="200" font-size="12" text-anchor="middle" fill="white" font-weight="bold">Romance</text><rect x="220" y="150" width="100" height="120" fill="#4ECDC4" stroke="#333" stroke-width="2" rx="5"/><text x="270" y="200" font-size="12" text-anchor="middle" fill="white" font-weight="bold">Ficção</text><rect x="360" y="150" width="100" height="120" fill="#FFD700" stroke="#333" stroke-width="2" rx="5"/><text x="410" y="200" font-size="12" text-anchor="middle" fill="#333" font-weight="bold">Poesia</text><text x="300" y="520" font-size="20" fill="#8B4513" text-anchor="middle" font-weight="bold">GÊNERO LITERÁRIO</text></svg>`
}

function objectsSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle cx="120" cy="250" r="35" fill="#FF6B9D" stroke="#333" stroke-width="2"/><text x="120" y="260" font-size="12" text-anchor="middle" fill="white">Ball</text><rect x="200" y="220" width="70" height="60" fill="#4ECDC4" stroke="#333" stroke-width="2" rx="5"/><text x="235" y="260" font-size="12" text-anchor="middle" fill="white">Box</text><circle cx="400" cy="250" r="25" fill="#FFD700" stroke="#333" stroke-width="2"/><text x="400" y="260" font-size="12" text-anchor="middle">Book</text><text x="300" y="520" font-size="20" fill="#FFD700" text-anchor="middle" font-weight="bold">OBJETOS</text></svg>`
}

function placesSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect x="50" y="200" width="100" height="100" fill="#8B7355" stroke="#333" stroke-width="2"/><polygon points="100,200 75,150 125,150" fill="#CC0000"/><text x="100" y="265" font-size="10" text-anchor="middle" fill="white">School</text><circle cx="300" cy="300" r="50" fill="#228B22" stroke="#333" stroke-width="2"/><text x="300" y="310" font-size="10" text-anchor="middle" fill="white">Park</text><polygon points="450,350 400,250 500,250" fill="#FFB347" stroke="#333" stroke-width="2"/><text x="450" y="330" font-size="10" text-anchor="middle">Mountain</text><text x="300" y="520" font-size="20" fill="#8B7355" text-anchor="middle" font-weight="bold">LUGARES</text></svg>`
}

function foodSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle cx="120" cy="250" r="40" fill="#FFD700" stroke="#FF8C00" stroke-width="2"/><text x="120" y="265" font-size="16" text-anchor="middle" font-weight="bold">Apple</text><rect x="220" y="210" width="80" height="80" fill="#FF6B35" stroke="#333" stroke-width="2" rx="5"/><text x="260" y="265" font-size="14" text-anchor="middle" fill="white" font-weight="bold">Pizza</text><circle cx="420" cy="250" r="35" fill="#8B4513" stroke="#333" stroke-width="2"/><text x="420" y="265" font-size="14" text-anchor="middle" fill="white" font-weight="bold">Bread</text><text x="300" y="520" font-size="20" fill="#FFD700" text-anchor="middle" font-weight="bold">ALIMENTOS</text></svg>`
}

function professionsSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><g><circle cx="120" cy="200" r="25" fill="#FDBCB4"/><rect x="100" y="225" width="40" height="50" fill="#FFF" stroke="#333" stroke-width="1"/><text x="120" y="310" font-size="10" text-anchor="middle">Doctor</text></g><g><circle cx="300" cy="200" r="25" fill="#FDBCB4"/><polygon points="310,225 290,225 280,275 320,275" fill="#8B4513"/><text x="300" y="310" font-size="10" text-anchor="middle">Teacher</text></g><g><circle cx="480" cy="200" r="25" fill="#FDBCB4"/><rect x="460" y="225" width="40" height="50" fill="#FFD700" stroke="#333" stroke-width="1"/><text x="480" y="310" font-size="10" text-anchor="middle">Engineer</text></g><text x="300" y="520" font-size="20" fill="#8B4513" text-anchor="middle" font-weight="bold">PROFISSÕES</text></svg>`
}

function travelSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><polygon points="100,350 120,200 140,350" fill="#8B4513" stroke="#333" stroke-width="2"/><text x="120" y="380" font-size="10" text-anchor="middle">Airplane</text><circle cx="300" cy="250" r="50" fill="none" stroke="#0066FF" stroke-width="2" stroke-dasharray="5,5"/><path d="M 250 250 L 350 250" stroke="#0066FF" stroke-width="2"/><text x="300" y="320" font-size="10" text-anchor="middle">Travel</text><rect x="420" y="220" width="80" height="60" fill="#C0C0C0" stroke="#333" stroke-width="2" rx="5"/><text x="460" y="260" font-size="10" text-anchor="middle">Train</text><text x="300" y="520" font-size="20" fill="#0066FF" text-anchor="middle" font-weight="bold">VIAGEM</text></svg>`
}

function paintingSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect x="100" y="100" width="400" height="300" fill="white" stroke="#8B4513" stroke-width="3"/><circle cx="200" cy="200" r="40" fill="#FF6B9D" opacity="0.7"/><circle cx="300" cy="180" r="50" fill="#4ECDC4" opacity="0.7"/><circle cx="380" cy="240" r="35" fill="#FFD700" opacity="0.7"/><text x="300" y="520" font-size="20" fill="#8B4513" text-anchor="middle" font-weight="bold">PINTURA</text></svg>`
}

function sculptureSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><polygon points="300,100 250,250 200,400 400,400 350,250" fill="#808080" stroke="#333" stroke-width="2"/><circle cx="300" cy="150" r="30" fill="#A9A9A9" stroke="#333" stroke-width="1"/><rect x="280" y="190" width="40" height="60" fill="#808080"/><text x="300" y="520" font-size="20" fill="#808080" text-anchor="middle" font-weight="bold">ESCULTURA</text></svg>`
}

function artMovementSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect x="80" y="120" width="100" height="100" fill="#FF6B9D" stroke="#333" stroke-width="2" transform="rotate(45 130 170)"/><circle cx="250" cy="170" r="50" fill="#4ECDC4" stroke="#333" stroke-width="2"/><polygon points="400,120 450,220 350,220" fill="#FFD700" stroke="#333" stroke-width="2"/><text x="300" y="520" font-size="20" fill="#FFD700" text-anchor="middle" font-weight="bold">MOVIMENTO ARTÍSTICO</text></svg>`
}

function defaultEducationalSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><defs><linearGradient id="dg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FF8A1F"/><stop offset="100%" stop-color="#FFD700"/></linearGradient></defs><circle cx="150" cy="150" r="80" fill="#FF6B9D"/><circle cx="450" cy="150" r="80" fill="#4ECDC4"/><circle cx="150" cy="450" r="80" fill="#95E1D3"/><circle cx="450" cy="450" r="80" fill="#F9D56E"/><rect x="200" y="200" width="200" height="200" fill="url(#dg)" rx="20"/><text x="300" y="520" font-size="20" fill="#2C3E50" text-anchor="middle" font-weight="bold">APRENDER</text></svg>`
}

async function mapSvg(l: Lesson): Promise<{ svg: string; ratio: string }> {
  const m = l.games!.map!
  const data = await loadMap(m.map)
  const lit = new Set(m.targets.slice(0, 6).flatMap((t) => regionsOf(m, t)))
  const [, , w, h] = data.viewBox.split(' ')
  return { ratio: `${w} / ${h}`, svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${data.viewBox}"><rect width="100%" height="100%" fill="#16202b"/>${data.regions.map((r) => `<path d="${r.d}" fill="${lit.has(r.id) ? '#FF8A1F' : '#3A4A5E'}" stroke="#16202b" stroke-width=".7"/>`).join('')}</svg>` }
}

export function PuzzleGame(p: GameProps) {
  // Dificuldade inteligente: fácil tem menos peças
  const n = { 1: 2, 2: 3, 3: 4 }[p.difficulty]

  // Experiência adaptada por idade
  const isYoung = p.lesson.grade?.includes('1º') || p.lesson.grade?.includes('2º') || p.lesson.grade?.includes('3º')
  const fontSize = isYoung ? 'text-xs' : 'text-sm'
  const spacing = isYoung ? 'gap-1' : 'gap-2'
  const pieceSize = isYoung ? 'p-2' : 'p-3'
  const [img, setImg] = useState<string | null>(null)
  const [ratio, setRatio] = useState('1 / 1')
  useEffect(() => {
    if (p.lesson.games?.map) void mapSvg(p.lesson).then((m) => { setImg(toUrl(m.svg)); setRatio(m.ratio) })
    else {
      // Usar ilustração educacional se disponível, senão usar cartaz
      const useEducational = ['biologia', 'quimica', 'fisica', 'geografia'].includes(p.lesson.subject)
      const imgSvg = useEducational ? educationalIllustration(p.lesson.topic || '', p.lesson.subject, p.lesson.id) : posterSvg(p.lesson)
      setImg(toUrl(imgSvg))
    }
  }, [p.lesson])
  const tray = useMemo(() => shuffle(Array.from({ length: n * n }, (_, i) => i)), [n])
  const [placed, setPlaced] = useState<(number | null)[]>(() => Array(n * n).fill(null))
  const [sel, setSel] = useState<number | null>(null)
  const [draggedPiece, setDraggedPiece] = useState<{ k: number; x: number; y: number } | null>(null)
  const [ghost, setGhost] = useState(false)
  const [bad, setBad] = useState<number | null>(null)
  const [useDragMode, setUseDragMode] = useState(true)
  const [showPreview, setShowPreview] = useState(false)
  const done = placed.every((x) => x !== null)
  const apiRef = useRef<GameApi | null>(null)
  const boardRef = useRef<HTMLDivElement>(null)

  useEffect(() => { if (done) { const t = setTimeout(() => apiRef.current?.done(n * n), 2000); return () => clearTimeout(t) } }, [done, n])

  const piece = (k: number) => ({ backgroundImage: img ?? undefined, backgroundSize: `${n * 100}% ${n * 100}%`, backgroundPosition: `${((k % n) / (n - 1)) * 100}% ${(Math.floor(k / n) / (n - 1)) * 100}%` })

  const drop = (slot: number, api: GameApi) => {
    if (sel === null || placed[slot] !== null) return
    api.move()
    if (sel === slot) {
      api.hit(true)
      const pl = [...placed]; pl[slot] = sel
      setPlaced(pl); setSel(null)
      const left = pl.filter((x) => x === null).length
      // Mensagens contextuais com feedback progressivo
      if (left === 0) {
        api.say('🎉 PERFEITO! Você montou tudo! Excelente trabalho!', 'medium')
      } else if (left === 1) {
        api.say('Quase lá! Só falta 1 peça! 🎯', 'smile')
      } else if (left <= 3) {
        api.say(`Muito bom! Faltam ${left} peças! 💪`, 'smile')
      } else if (left <= 6) {
        api.say('Excelente! Peça encaixada! 🧩', 'smile')
      } else {
        api.say('Bom trabalho! Continue! 👍', 'smile')
      }
    } else {
      api.hit(false)
      setBad(slot); setTimeout(() => setBad(null), 450)
      api.say('Essa peça não combina aqui. Veja as bordas! ❌', 'look')
    }
  }

  const handleDragStart = (e: React.DragEvent, k: number) => {
    if (!useDragMode) return
    e.dataTransfer!.effectAllowed = 'move'
    setDraggedPiece({ k, x: e.clientX, y: e.clientY })
  }

  const handleDragOver = (e: React.DragEvent) => {
    if (!useDragMode) return
    e.preventDefault()
    e.dataTransfer!.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, slot: number, api: GameApi) => {
    if (!useDragMode || !draggedPiece) return
    e.preventDefault()
    setDraggedPiece(null)
    drop(slot, api)
  }

  const hint = (lv: 1 | 2 | 3) => {
    if (lv === 1) return 'Comece pelos cantos! Eles têm um lado reto.'
    if (lv === 2) { setShowPreview(true); setTimeout(() => setShowPreview(false), 3000); return 'Olha só! A imagem apareceu.' }
    const k = placed.findIndex((x) => x === null)
    if (k >= 0) { const pl = [...placed]; pl[k] = k; setPlaced(pl) }
    return 'Pronto! Coloquei uma peça. 😉'
  }

  const totalPieces = n * n
  const placedCount = placed.filter((x) => x !== null).length
  const progressPercent = (placedCount / totalPieces) * 100

  return (
    <GameShell {...p} progress={[placedCount, totalPieces]} hint={hint}>
      {(api) => { apiRef.current = api; return !img ? <p className="py-10 text-center text-sm text-offwhite/60">Preparando…</p> : (
        <div className="space-y-4">
          {/* Barra de progresso */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs text-offwhite/70">
              <span>Progresso</span>
              <span>{placedCount} de {totalPieces}</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-laranja to-orange-400 transition-all" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          {/* Botões de controle - adaptados para idade */}
          <div className={`flex ${spacing} flex-wrap justify-center`}>
            <button onClick={() => { setShowPreview(true); setTimeout(() => setShowPreview(false), 2500) }} className={`${fontSize} px-3 py-1 rounded-full border border-white/20 hover:bg-laranja/30 transition font-semibold text-offwhite/90`}>
              👀 Ver Imagem (3s)
            </button>
            {p.difficulty > 1 && (
              <button onClick={() => setUseDragMode(!useDragMode)} className="text-xs px-3 py-1 rounded-full border border-white/20 hover:bg-laranja/20 transition font-semibold text-offwhite/90">
                {useDragMode ? '✋ Toque' : '🖱️ Arrasto'}
              </button>
            )}
          </div>
          {/* Instrução - adaptada por idade */}
          <p className={`${fontSize} text-center text-offwhite/60`}>
            {isYoung
              ? (useDragMode ? '⬆️ Arrasta a peça bem grande!' : '👉 Toque na peça depois no lugar!')
              : (useDragMode ? '⬆️ Arrasta a peça para encaixar' : '👉 Toque na peça depois no lugar')}
          </p>

          {/* Tabuleiro */}
          <div ref={boardRef} className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border-2 border-laranja/30 bg-white/5" style={{ aspectRatio: ratio }}>
            {/* Preview/Ghost image */}
            {(showPreview || done) && (
              <div className="absolute inset-0 transition-opacity" style={{ backgroundImage: img, backgroundSize: '100% 100%', opacity: done ? 1 : 0.25 }} />
            )}

            {/* Grid de slots */}
            <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
              {placed.map((k, slot) => (
                <button
                  key={slot}
                  onClick={() => !useDragMode && drop(slot, api)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, slot, api)}
                  aria-label={`Espaço ${slot + 1}`}
                  className={`border-2 transition-all ${k === null ? `border-white/20 ${sel !== null && useDragMode ? 'bg-laranja/20 shadow-[inset_0_0_8px_rgba(255,138,31,0.3)]' : 'bg-white/5'}` : 'border-laranja/60 shadow-[inset_0_0_10px_rgba(255,138,31,0.2)]'} ${bad === slot ? 'bg-erro/40 scale-95 border-erro' : ''}`}
                  style={k !== null && !done ? piece(k) : undefined}
                />
              ))}
            </div>
          </div>

          {/* Tray de peças */}
          {!done && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center px-2">
                <p className="text-xs text-offwhite/60 font-semibold">🧩 Peças ({tray.filter((k) => !placed.includes(k)).length})</p>
                <p className="text-xs text-offwhite/50">{placedCount} de {totalPieces}</p>
              </div>
              <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(n + 1, 5)}, minmax(0, 1fr))` }}>
                {tray.filter((k) => !placed.includes(k)).map((k) => (
                  <button
                    key={k}
                    draggable={useDragMode}
                    onDragStart={(e) => handleDragStart(e, k)}
                    onClick={() => !useDragMode && setSel(sel === k ? null : k)}
                    aria-label="Peça"
                    style={{ ...piece(k), aspectRatio: ratio }}
                    className={`rounded-lg border-2 transition transform cursor-grab active:cursor-grabbing ${
                      sel === k && !useDragMode ? 'scale-110 border-laranja shadow-[0_0_14px_rgba(255,138,31,.6)] ring-2 ring-laranja/40' : 'border-white/30 hover:scale-105 hover:border-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Comemoração com LUMI participando */}
          {done && (
            <div className="space-y-4">
              {/* LUMI celebrando */}
              <div className="text-center">
                <p className="text-6xl animate-bounce" style={{ animationDuration: '0.8s' }}>🎨</p>
                <p className="text-xs text-offwhite/60 mt-1">Olha que incrível! 👀</p>
              </div>

              {/* Confete/Celebração visual */}
              <div className="relative h-16 flex items-center justify-center overflow-hidden">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="absolute text-2xl" style={{
                    left: `${(i % 4) * 25 + 12}%`,
                    animation: `bounce ${0.6 + i * 0.05}s ease-in-out infinite`,
                    animationDelay: `${i * 0.08}s`
                  }}>
                    {['🎉', '⭐', '🌟', '✨', '💫', '🎊'][i % 6]}
                  </div>
                ))}
              </div>

              <div className="text-center space-y-3 py-6 px-4 rounded-2xl bg-gradient-to-br from-laranja/30 to-orange-400/20 border-2 border-laranja/50 shadow-lg shadow-laranja/20">
                <div className="flex items-center justify-center gap-2">
                  <p className="text-4xl animate-bounce" style={{ animationDuration: '0.7s' }}>🎉</p>
                  <p className="text-3xl">🎨</p>
                  <p className="text-4xl animate-bounce" style={{ animationDuration: '0.7s', animationDelay: '0.1s' }}>🎉</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-laranja">Perfeito! Você montou tudo!</p>
                  <p className="text-xs text-offwhite/80 mt-1 italic">"Que trabalho lindo!" — LUMI</p>
                </div>
                <div className="pt-3 border-t border-white/20">
                  <p className="text-xs text-offwhite/90 font-semibold mb-2">📚 Curiosidade:</p>
                  <p className="text-sm text-offwhite/95">{p.lesson.blocks?.[0]?.title || 'Parabéns por completar!'}</p>
                </div>
                <div className="pt-2 space-y-1">
                  <p className="text-2xl font-bold text-laranja">⭐ +{n * n * 10} pontos!</p>
                  <p className="text-xs text-offwhite/70">Incrível desempenho! LUMI está muito orgulhoso de você!</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) }}
    </GameShell>
  )
}
