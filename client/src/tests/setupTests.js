/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'

import { jest } from '@jest/globals'
import { global } from '@testing-library/jest-dom/matchers'
import { configure } from '@testing-library/react'
// Configure test environment
configure({ testIdAttribute: 'data-testid' })

// Mock window.matchMedia
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

// Mock console methods
const originalConsole = { ...console }

global.console = {
  ...originalConsole,
  error: jest.fn(),
  warn: jest.fn(),
  log: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
}