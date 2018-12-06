module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jest/globals": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "jest"
  ],
  "rules": {
    "keyword-spacing": [
      "error",
      {
        "after": true,
        "before": true,
        "overrides": {
          "if": {
            "after": false
          },
          "for": {
            "after": false
          },
          "while": {
            "after": false
          },
          "switch": {
            "after": false
          },
          "catch": {
            "after": false
          }
        }
      }
    ],
    "space-before-function-paren": [
      "error",
      "never"
    ],
    "generator-star-spacing": [
      "error",
      {
        "before": false,
        "after": true
      }
    ],
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "no-unused-vars": [
      "warn",
      {
        "args": "none",
        "ignoreRestSiblings": true
      }
    ],
    "no-console": 0
  }
};