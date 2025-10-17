import { createJsWithTsPreset, type JestConfigWithTsJest } from 'ts-jest';

const presetConfig = createJsWithTsPreset({
  tsconfig: '<rootDir>tsconfig.json',
});

const config: JestConfigWithTsJest = {
  ...presetConfig,
  clearMocks: true,
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testEnvironment: 'node',
  restoreMocks: true,
  resetMocks: true,
  testMatch: ['<rootDir>//**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['<rootDir>/src/2024/day/'],
  reporters: ['default'],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/2024/**/*.ts', '!<rootDir>/src/2024/day/**'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

export default config;
