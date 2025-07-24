/* eslint-env jest,node,browser */
/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'

import { afterEach, jest } from '@jest/globals'
import { configure } from '@testing-library/react'
import { TextDecoder, TextEncoder } from 'util'

// Polyfill TextEncoder/TextDecoder if not present
if (!globalThis.TextEncoder) {
  globalThis.TextEncoder = TextEncoder
}

if (!globalThis.TextDecoder) {
  globalThis.TextDecoder = TextDecoder
}

// Configure test environment for React Testing Library
configure({ testIdAttribute: 'data-testid' })

// Mock window.matchMedia for tests
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
}

// Suppress console output in tests by mocking console methods
globalThis.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
  log: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
}

// Clear mocks after each test to avoid test pollution
afterEach(() => {
  jest.clearAllMocks()
})
