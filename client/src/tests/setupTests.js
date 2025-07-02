// Import Jest's expect function
global.expect = require('expect');

// Mock window.matchMedia
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

// Mock window.scrollTo
window.scrollTo = jest.fn();

// Mock console.error to fail tests on PropType warnings
const originalConsoleError = console.error;
console.error = (message) => {
  if (/(Failed prop type)/.test(message)) {
    throw new Error(message);
  }
  originalConsoleError(message);
};
