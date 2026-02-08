// @ts-check
const eslint = require("@eslint/js");
const { defineConfig } = require("eslint/config");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = defineConfig([
  {
    ignores: [
      ".env",
      ".angular/**",
      "dist/**",
      "tmp/**",
      "out-tsc/**",
      "bazel-out/**",
      "/**/*.spec.ts",
      "node_modules/**",
      ".vscode/*",
      "!.vscode/settings.json", // Exceção (include)
      "coverage/**",
      // ... adicione o resto aqui
    ],
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
        {
          type: "element",
          prefix: "[app",
          style: "kebab-case",
        },
      ],
      "@typescript-eslint/naming-convention": [
        "warn",
        {
          selector: "interface",
          format: ["PascalCase"],
          custom: {
            regex: "^I[A-Z]",
            match: true,
          },
        },
        {
          selector: "class",
          format: ["PascalCase"],
        },
        {
          selector: "function",
          format: ["camelCase"],
        },
        {
          selector: "method",
          format: ["camelCase"],
        },
        {
          selector: "variable",
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: "allow",
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: "property",
          format: ["camelCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "variable",
          modifiers: ["const"],
          format: ['camelCase', 'UPPER_CASE'],
        },
        {
          "selector": "objectLiteralProperty",
          "format": ["camelCase"],
          "leadingUnderscore": "allow"
        },
      ],
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          accessibility: "explicit",
          "overrides": {
          "constructors": "off",
          "accessors": "off"
        }
        },

      ],
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-empty-function": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "no-console": "warn",
      // Mantém o mesmo "limite" do Prettier (printWidth: 100) sem gerar ruído
      "max-len": [
        "warn",
        {
          code: 130,
          tabWidth: 2,
          ignoreComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
          ignoreUrls: true,
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      "@angular-eslint/template/label-has-associated-control": 'off',
      "@angular-eslint/template/click-events-have-key-events": 'off',
      "@angular-eslint/template/interactive-supports-focus": 'off'
    },
  }
]);
