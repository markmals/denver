import * as s from "remix/data-schema";
import * as check from "remix/data-schema/checks";
import { defineCollection as collection } from "sprinkles:content";

import { glob } from "../content-layer/loaders/index.ts";

function partialUrl() {
    return s
        .string()
        .refine(
            v => v.startsWith("/") || v.startsWith("http"),
            "Must be a partial URL path or a full URL",
        );
}

let restaurants = collection({
    loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `app/content` }),
    schema: s.object({
        name: s.string(),
        address: s.string(),
        cuisine: s.string(),
        menu: s.optional(s.string().pipe(check.url())),
        thumbnail: partialUrl(),
    }),
});

export let collections = { restaurants };
