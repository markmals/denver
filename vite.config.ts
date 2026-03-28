import { cloudflare } from "@cloudflare/vite-plugin";
import mdx from "@mdx-js/rollup";
import { defineConfig } from "vite-plus";

import { contentLayer } from "./content-layer/plugin.ts";
import { remix } from "./remix.plugin.ts";

let IS_TEST = Boolean(process.env.VITEST);

export default defineConfig({
    build: {
        // Prevent SVG sprites from being inlined as data URIs,
        // which breaks <use href="...#fragment"> references.
        assetsInlineLimit: 0,
    },
    css: {
        transformer: "lightningcss",
    },
    fmt: {
        arrowParens: "avoid",
        overrides: [
            {
                files: ["**/*.jsonc"],
                options: {
                    trailingComma: "none",
                },
            },
            {
                files: ["**/.vscode/**"],
                options: {
                    trailingComma: "all",
                },
            },
        ],
        sortImports: {
            groups: [
                "type-import",
                ["value-builtin", "value-external"],
                "type-internal",
                "value-internal",
                ["type-parent", "type-sibling", "type-index"],
                ["value-parent", "value-sibling", "value-index"],
                "unknown",
            ],
            partitionByComment: true,
        },
        sortTailwindcss: {
            functions: ["cx", "cva"],
            stylesheet: "./app/tailwind.css",
        },
        tabWidth: 4,
    },
    lint: {
        categories: {
            correctness: "error",
            suspicious: "error",
        },
        env: {
            browser: true,
            node: true,
        },
        ignorePatterns: ["**/worker-configuration.d.ts", "dist/**"],
        jsPlugins: ["eslint-plugin-perfectionist"],
        options: {
            typeAware: true,
            typeCheck: true,
        },
        plugins: ["jsx-a11y", "jsdoc", "import", "node", "promise", "vitest"],
        rules: {
            "eslint/default-param-last": "error",
            "eslint/func-style": ["error", "declaration"],
            "eslint/id-length": "off",
            "eslint/init-declarations": "off",
            "eslint/max-lines": "off",
            "eslint/max-lines-per-function": "off",
            "eslint/max-statements": "off",
            "eslint/capitalized-comments": "off",
            "eslint/no-cond-assign": "off",
            "eslint/no-continue": "off",
            "eslint/no-dupe-else-if": "error",
            "eslint/no-duplicate-imports": "off",
            "eslint/no-else-return": "error",
            "eslint/no-empty-pattern": "warn",
            "eslint/no-irregular-whitespace": "error",
            "eslint/no-lonely-if": "warn",
            "eslint/no-magic-numbers": "off",
            "eslint/no-param-reassign": "error",
            "eslint/no-shadow": "off",
            "eslint/no-template-curly-in-string": "warn",
            "eslint/no-ternary": "off",
            "eslint/no-undefined": "off",
            "eslint/no-unused-expressions": "error",
            "eslint/no-warning-comments": "off",
            "eslint/no-unused-vars": "off",
            "eslint/no-useless-escape": "warn",
            "eslint/require-await": "off",
            "eslint/sort-imports": "off",
            "eslint/sort-keys": "off",

            "import/extensions": [
                "error",
                "ignorePackages",
                {
                    cjs: "always",
                    cts: "always",
                    js: "always",
                    jsx: "always",
                    mjs: "always",
                    mts: "always",
                    ts: "always",
                    tsx: "always",
                },
            ],
            "import/exports-last": "off",
            "import/group-exports": "off",
            "import/no-commonjs": "warn",
            "import/no-default-export": "off",
            "import/no-named-export": "off",
            "import/no-nodejs-modules": "off",
            "import/no-relative-parent-imports": "off",
            "import/prefer-default-export": "off",

            "jest/require-hook": "off",

            "jsx-a11y/no-autofocus": "off",

            "node/no-process-env": "off",

            "perfectionist/sort-jsx-props": "warn",

            "typescript/consistent-type-imports": "error",
            "typescript/no-empty-interface": "warn",
            "typescript/no-explicit-any": "warn",
            "typescript/no-inferrable-types": "error",
            "typescript/no-non-null-assertion": "warn",
            "typescript/prefer-as-const": "error",
            "typescript/prefer-enum-initializers": "error",

            "unicorn/no-lonely-if": "warn",
            "unicorn/prefer-at": "warn",
            "unicorn/prefer-string-slice": "warn",
            "unicorn/prefer-string-trim-start-end": "error",
        },
        settings: {
            "jsx-a11y": {
                components: {
                    Link: "a",
                },
                polymorphicPropName: "as",
            },
            vitest: {
                typecheck: true,
            },
        },
    },
    plugins: [
        contentLayer(),
        mdx({ jsxImportSource: "remix/component" }),
        remix({ clientEntry: false, serverHandler: false }),
        !IS_TEST &&
            cloudflare({
                viteEnvironment: {
                    name: "ssr",
                },
            }),
    ],
    resolve: {
        tsconfigPaths: true,
    },
    run: {
        tasks: {
            deploy: {
                cache: false,
                command: "vp build && wrangler deploy",
            },
            typecheck: {
                command: "tsgo --noEmit",
            },
        },
    },
    staged: {
        "*": "vp check --fix",
    },
    test: {
        include: ["**/*.test.ts"],
    },
});
