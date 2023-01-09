/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
  ],
  overrides: [
    {
      files: ["cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}"],
      extends: ["plugin:cypress/recommended"],
    },
    {
      files: ["*.vue", "*.ts"],
      rules: {
        "no-undef": "off",
        "prefer-arrow-callback": "error",
      },
    },
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    ecmaFeatures: {
      jsx: false,
    },
  },
};
