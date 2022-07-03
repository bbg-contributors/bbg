module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: [
    "standard",
    "plugin:import/recommended",
    "plugin:eslint-comments/recommended",
    "plugin:jsonc/recommended-with-jsonc",
    "plugin:yml/standard",
    "plugin:markdown/recommended",
  ],
  ignorePatterns: [
    "*.min.*",
    "CHANGELOG.md",
    "dist",
    "LICENSE*",
    "output",
    "coverage",
    "public",
    "temp",
    "packages-lock.json",
    "pnpm-lock.yaml",
    "yarn.lock",
    "__snapshots__",
    "!.github",
    "!.vitepress",
    "!.vscode",
  ],
  plugins: [
    "html",
    "unicorn",
  ],
  settings: {
    "import/resolver": {
      node: { extensions: [".js", ".mjs", ".ts", ".d.ts"] },
    },
  },
  overrides: [
    {
      files: ["*.json", "*.json5"],
      parser: "jsonc-eslint-parser",
      rules: {
        "quotes": ["warn", "double"],
        "quote-props": ["warn", "consistent-as-needed"],
        "comma-dangle": ["warn", "always"],
      },
    },
    {
      files: ["package.json"],
      parser: "jsonc-eslint-parser",
      rules: {
        "jsonc/sort-keys": [
          "warn",
          {
            pathPattern: "^$",
            order: [
              "name",
              "type",
              "version",
              "private",
              "packageManager",
              "description",
              "keywords",
              "license",
              "author",
              "repository",
              "funding",
              "main",
              "module",
              "types",
              "unpkg",
              "jsdelivr",
              "exports",
              "files",
              "bin",
              "sideEffects",
              "scripts",
              "peerDependencies",
              "peerDependenciesMeta",
              "dependencies",
              "optionalDependencies",
              "devDependencies",
              "husky",
              "lint-staged",
              "eslintConfig",
            ],
          },
          {
            pathPattern: "^(?:dev|peer|optional|bundled)?[Dd]ependencies$",
            order: { type: "asc" },
          },
        ],
      },
    },
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "no-unused-vars": "off",
        "no-undef": "off",
        "no-eval": "off",
      },
    },
    {
      files: ["scripts/**/*.*", "cli.*"],
      rules: {
        "no-console": "off",
      },
    },
    {
      files: ["*.test.ts", "*.test.js", "*.spec.ts", "*.spec.js"],
      rules: {
        "no-unused-expressions": "off",
      },
    },
    {
      // Code blocks in markdown file
      files: ["**/*.md/*.*"],
      rules: {
        "@typescript-eslint/no-redeclare": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-var-requires": "off",
        "import/no-unresolved": "off",
        "no-alert": "off",
        "no-console": "off",
        "no-restricted-imports": "off",
        "no-undef": "off",
        "no-unused-expressions": "off",
        "no-unused-vars": "off",
      },
    },
  ],
  rules: {
    // import
    "import/order": "warn",
    "import/first": "warn",
    "import/no-mutable-exports": "warn",
    "import/no-unresolved": "off",
    "import/no-absolute-path": "off",

    // Common
    "semi": ["warn", "always"],
    "curly": ["warn", "multi-or-nest", "consistent"],
    "quotes": ["warn", "double"],
    "quote-props": ["warn", "consistent-as-needed"],
    "no-unused-vars": "warn",
    "no-param-reassign": "off",
    "array-bracket-spacing": ["warn", "never"],
    "brace-style": ["warn", "1tbs", { allowSingleLine: true }],
    "block-spacing": ["warn", "always"],
    "camelcase": "off",
    "comma-spacing": ["warn", { before: false, after: true }],
    "comma-style": ["warn", "last"],
    "comma-dangle": ["warn", "always-multiline"],
    "no-constant-condition": "warn",
    "no-debugger": "warn",
    "no-console": ["warn", { allow: ["error", "warn"] }],
    "no-cond-assign": ["warn", "always"],
    "func-call-spacing": ["off", "never"],
    "key-spacing": ["warn", { beforeColon: false, afterColon: true }],
    "indent": ["warn", 2, { SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1 }],
    "no-restricted-syntax": [
      "warn",
      "DebuggerStatement",
      "LabeledStatement",
      "WithStatement",
    ],
    "object-curly-spacing": ["warn", "always"],
    "no-return-await": "off",

    // es6
    "no-var": "warn",
    "prefer-const": [
      "warn",
      {
        destructuring: "any",
        ignoreReadBeforeAssign: true,
      },
    ],
    "prefer-arrow-callback": [
      "warn",
      {
        allowNamedFunctions: false,
        allowUnboundThis: true,
      },
    ],
    "object-shorthand": [
      "warn",
      "always",
      {
        ignoreConstructors: false,
        avoidQuotes: true,
      },
    ],
    "prefer-rest-params": "warn",
    "prefer-spread": "warn",
    // "prefer-template": "warn",
    "template-curly-spacing": "warn",
    "arrow-parens": ["warn", "as-needed", { requireForBlockBody: true }],
    "generator-star-spacing": "off",
    "spaced-comment": ["warn", "always", {
      line: {
        markers: ["/"],
        exceptions: ["/", "#"],
      },
      block: {
        markers: ["!"],
        exceptions: ["*"],
        balanced: true,
      },
    }],

    // best-practice
    "array-callback-return": "warn",
    "block-scoped-var": "warn",
    "consistent-return": "off",
    "complexity": ["off", 11],
    "eqeqeq": ["warn", "smart"],
    "no-case-declarations": "warn",
    "no-multi-spaces": "warn",
    "no-multi-str": "warn",
    "no-with": "warn",
    "no-useless-escape": "off",
    "vars-on-top": "warn",
    "require-await": "off",
    "no-return-assign": "off",
    "operator-linebreak": ["warn", "before"],

    // unicorns
    // Pass error message when throwing errors
    "unicorn/error-message": "warn",
    // Uppercase regex escapes
    "unicorn/escape-case": "warn",
    // Array.isArray instead of instanceof
    "unicorn/no-array-instanceof": "warn",
    // Prevent deprecated `new Buffer()`
    "unicorn/no-new-buffer": "warn",
    // Keep regex literals safe!
    "unicorn/no-unsafe-regex": "off",
    // Lowercase number formatting for octal, hex, binary (0x1'error' instead of 0X1'error')
    "unicorn/number-literal-case": "warn",
    // ** instead of Math.pow()
    "unicorn/prefer-exponentiation-operator": "warn",
    // includes over indexOf when checking for existence
    "unicorn/prefer-includes": "warn",
    // String methods startsWith/endsWith instead of more complicated stuff
    "unicorn/prefer-starts-ends-with": "warn",
    // textContent instead of innerText
    "unicorn/prefer-text-content": "warn",
    // Enforce throwing type error when throwing error while checking typeof
    "unicorn/prefer-type-error": "warn",
    // Use new when throwing error
    "unicorn/throw-new-error": "warn",

    "no-use-before-define": ["warn", { functions: false, classes: false, variables: true }],
    "eslint-comments/disable-enable-pair": "off",
    "import/no-named-as-default-member": "off",
    "n/no-callback-literal": "off",

    "sort-imports": [
      "warn",
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        allowSeparatedGroups: false,
      },
    ],

    // yml
    "yml/quotes": ["warn", { prefer: "double", avoidEscape: false }],
    "yml/no-empty-document": "off",
  },
};
