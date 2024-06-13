const globals = require("globals");
const parser = require("jsonc-eslint-parser");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = [{
    ignores: [
        "**/*.min.*",
        "**/CHANGELOG.md",
        "**/dist",
        "**/LICENSE*",
        "**/output",
        "**/coverage",
        "**/public",
        "**/temp",
        "**/packages-lock.json",
        "**/pnpm-lock.yaml",
        "**/yarn.lock",
        "**/__snapshots__",
        "!**/.github",
        "!**/.vitepress",
        "!**/.vscode",
        "**/node_modules",
        "**/docs",
        "**/.github",
        "**/test.js",
        "**/eslint.config.cjs"
    ],
}, ...compat.extends(
    "eslint:recommended",
    "plugin:jsonc/recommended-with-jsonc",
    "plugin:yml/standard",
    "plugin:markdown/recommended-legacy",
), {
    languageOptions: {
        globals: {
            ...globals.browser,
        },

        ecmaVersion: "latest",
        sourceType: "script",
    },

    rules: {
        indent: ["error", 2],
        quotes: ["error", "double"],
        semi: ["error", "always"],
    },
}, {
    files: ["**/*.json", "**/*.json5"],

    languageOptions: {
        parser: parser,
    },

    rules: {
        quotes: ["warn", "double"],
        "quote-props": ["warn", "consistent-as-needed"],
        "comma-dangle": ["warn", "always"],
    },
}, {
    files: ["**/package.json"],

    languageOptions: {
        parser: parser,
    },

    rules: {
        "jsonc/sort-keys": ["warn", {
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
        }, {
            pathPattern: "^(?:dev|peer|optional|bundled)?[Dd]ependencies$",

            order: {
                type: "asc",
            },
        }],
    },
}, {
    files: ["**/*.js"],

    rules: {
        "no-unused-vars": "off",
        "no-undef": "off",
        "no-eval": "warn",
        "no-empty": "warn",
        "no-extra-semi": "warn",
    },
}, {
    files: ["**/*.md/*.*"],

    rules: {
        "import/no-unresolved": "off",
        "no-alert": "off",
        "no-console": "off",
        "no-restricted-imports": "off",
        "no-undef": "off",
        "no-unused-expressions": "off",
        "no-unused-vars": "off",
    },
}];