/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Configure test environment
configure({ testIdAttribute: 'data-testid' });

// Mock window.matchMedia
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

// Mock console methods
const originalConsole = {
  error: console.error,
  warn: console.warn,
  log: console.log,
  info: console.info,
  debug: console.debug,
};

global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
  log: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

// Clean up mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});