import { cloudflare } from "@cloudflare/vite-plugin";
import mdx from "@mdx-js/rollup";
import { contentLayer } from "@withsprinkles/content-layer/remix";
import { defineConfig } from "vite-plus";

import { remix } from "./remix.plugin.ts";

export default defineConfig({
    plugins: [
        contentLayer(),
        mdx({ jsxImportSource: "remix/component" }),
        remix({ clientEntry: false, serverHandler: false }),
        cloudflare({ viteEnvironment: { name: "ssr" } }),
    ],
    resolve: {
        tsconfigPaths: true,
    },
    css: {
        transformer: "lightningcss",
    },
    fmt: {
        ignorePatterns: ["**/worker-configuration.d.ts", "dist/**"],
        tabWidth: 4,
        arrowParens: "avoid",
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
    },
    lint: {
        ignorePatterns: ["**/worker-configuration.d.ts", "dist/**"],
        options: {
            typeAware: true,
            typeCheck: true,
        },
        jsPlugins: ["eslint-plugin-perfectionist"],
        rules: {
            "typescript/no-floating-promises": "allow",
            "typescript/unbound-method": "allow",
            "perfectionist/sort-jsx-props": "warn",
        },
    },
});
