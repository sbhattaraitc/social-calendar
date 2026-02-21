/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: ['@eslint/js'],
    ignorePatterns: ['node_modules/dist/build/coverage'],
    rules: {
        'no-unused-vars': 'warn',
    },
};