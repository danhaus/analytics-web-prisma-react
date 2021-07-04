module.exports = {
  testRegex: '((\\.|/)(test|spec))\\.[jt]sx?$',
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/singleton.ts'],
};
