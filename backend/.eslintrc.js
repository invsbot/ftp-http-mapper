module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": [
        "google"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
      "linebreak-style": ['warn', 'windows'],
      "require-jsdoc": ["off"],
      "no-invalid-this": ["off"],
      "max-len": ["error", { "code": 150 }],
      "no-unused-vars": ["warn"]
    }
};