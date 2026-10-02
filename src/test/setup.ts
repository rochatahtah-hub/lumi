/**
 * Vitest Setup — Configuração global para testes
 * Executado antes de todos os testes
 */

import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// Limpar DOM após cada teste
afterEach(() => {
  cleanup()
})

// Mock de window.matchMedia (para queries CSS)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock de IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return []
  }
  unobserve() {}
} as any

// Mock de ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any

// Suprimir console.warn/error em testes (opcional)
// global.console = {
//   ...console,
//   warn: vi.fn(),
//   error: vi.fn(),
// }
