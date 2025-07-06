const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/out/',
    '/dist/'
  ],
  testMatch: [
    '**/__tests__/**/*.tsx',
    '**/?(*.)+(spec|test).tsx'
  ],
  verbose: true
};

module.exports = createJestConfig(customJestConfig);
