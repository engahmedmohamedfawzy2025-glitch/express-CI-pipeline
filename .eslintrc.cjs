module.exports = {
env: { node: true, es2022: true, jest: true },
extends: ['eslint:recommended', 'plugin:jest/recommended', 'prettier'],
parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
plugins: ['jest'],
rules: { 'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }] }
};