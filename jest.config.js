module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  modulePathIgnorePatterns: ['\\.(css|scss)$'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/cypress/'],
  moduleNameMapper: { '@primeng/themes': '<rootDir>/node_modules/@primeng/themes/index.mjs' },
};
