module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "space-infix-ops": ["error", { "int32Hint": false }],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "space-in-parens": ["error", "always"],
    "object-curly-spacing": [0, "always"]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
