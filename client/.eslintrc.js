module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "airbnb",
    "prettier",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["react", "react-hooks"],
  rules: {
    "react/prop-types": 0,
    "linebreak-style": 0,
    quotes: ["error", "double"],
    semi: ["error", "always"],

    "no-unused-vars": "warn",
    "no-console": "off",
    "func-names": "off",
    "no-process-exit": "off",
    "object-shorthand": "off",
    "class-methods-use-this": "off",

    "react/jsx-props-no-spreading": 0,
    "import/prefer-default-export": 0,

    "max-len": [
      2,
      {
        code: 88,
      },
    ],
    "object-curly-newline": "off",
  },
};
