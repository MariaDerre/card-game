import prettier from "eslint-plugin-prettier";
import globals, { jest } from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    ...compat.extends("eslint:recommended", "prettier"),
    {
        plugins: {
            prettier,
            jest,
        },
        languageOptions: {
            parserOptions: {
                sourceType: "module",
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            ecmaVersion: 2020,
            sourceType: "module",
        },
        rules: {
            "prettier/prettier": "error",
            camelcase: "error",
            eqeqeq: ["error", "always"],
        },
    },
];
