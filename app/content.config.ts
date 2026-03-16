import * as s from "@remix-run/data-schema";
import { defineCollection } from "sprinkles:content";

import { file } from "../content-layer/loaders/index.ts";

let restaurants = defineCollection({
    loader: file("app/content/restaurants.jsonc"),
    schema: s.object({
        id: s.string(),
        name: s.string(),
    }),
});

export let collections = { restaurants };
