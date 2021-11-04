module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ['./tests/setup.js'],
  testMatch: ['**/*.spec.[jt]s?(x)', '**/*.test.[jt]s?(x)']
}
