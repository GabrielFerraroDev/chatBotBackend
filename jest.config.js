module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,test}',
    '/**/*.d.ts',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  coverageReporters: ['text', 'cobertura'],
  reporters: ['default', 'jest-junit'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
}
