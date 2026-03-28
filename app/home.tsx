import type { RemixNode } from "remix/component";
import type { Controller } from "remix/fetch-router";

import assert from "node:assert";
import { getCollection, getEntry, render } from "sprinkles:content";

import icons from "~/assets/icons.svg?url";
import styles from "~/assets/tailwind.css?url";
import { Button } from "~/components/button.tsx";
import { Divider } from "~/components/divider.tsx";
import { Heading } from "~/components/heading.tsx";
import { document } from "~/lib/render.tsx";
import { routes } from "~/routes.ts";

export default {
    actions: {
        async home() {
            let restaurants = await getCollection("restaurants");

            let items = await Promise.all(
                restaurants.map(async restaurant => {
                    let entry = await getEntry("restaurants", restaurant.id);
                    assert(entry, `Could not find entry for slug: ${restaurant.id}`);
                    let { Content } = await render(entry);
                    return { data: entry.data, content: Content };
                }),
            );

            return document(
                <html lang="en">
                    <head>
                        <meta charset="utf-8" />
                        <meta content="width=device-width, initial-scale=1" name="viewport" />
                        <meta content="#000000" name="theme-color" />
                        <link href={styles} rel="stylesheet" />
                        <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
                        <link href="favicon.png" rel="icon" type="image/png" />
                        {import.meta.env.DEV && <script async src="/@vite/client" type="module" />}
                        <title>Denver Restaurants</title>
                    </head>
                    <body class="relative isolate flex min-h-svh w-full flex-col bg-gray-200 text-zinc-950 dark:bg-black dark:text-white">
                        <main class="flex flex-1 flex-col px-2 py-2">
                            <div class="grow rounded-lg bg-white p-10 shadow-xs ring-1 ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10">
                                <div class="mx-auto max-w-6xl">
                                    <div class="flex flex-col gap-4">
                                        <Heading>Denver Restaurants</Heading>
                                        <Divider />
                                        <ul class="flex flex-col border-black/15 *:border-b *:last:border-none dark:border-white/15">
                                            {items.map(item => (
                                                <ListItem {...item.data} content={item.content} />
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </body>
                </html>,
            );
        },
    },
} satisfies Controller<typeof routes>;

function Icon() {
    return (props: { name: string; size?: number; class?: string }) => {
        let size = props.size ?? 24;
        return (
            <svg aria-hidden="true" data-slot="icon" height={size} width={size}>
                <use href={`${icons}#icon-${props.name}`} />
            </svg>
        );
    };
}

interface ListItemProps {
    name: string;
    address: string;
    cuisine: string;
    menu?: string;
    thumbnail: string;
    content: () => () => RemixNode;
}

function ListItem() {
    return (props: ListItemProps) => {
        let { content: Content } = props;
        return (
            <li class="border-black/15 py-6 first-of-type:pt-0! dark:border-white/15">
                <div class="flex flex-col items-start gap-6 md:flex-row">
                    <div class="relative w-full md:w-auto">
                        <div class="block aspect-3/2 w-full overflow-hidden rounded-lg bg-black/10 md:aspect-square md:w-52 dark:bg-white/10">
                            <img alt="" class="size-full object-cover" src={props.thumbnail} />
                        </div>
                    </div>
                    <div class="flex w-full flex-col justify-between gap-2 overflow-hidden">
                        <div class="flex flex-col gap-2">
                            <div class="flex flex-col gap-1">
                                <h2 class="text-xl font-medium text-black/95 md:truncate dark:text-white/95">
                                    {props.name}
                                </h2>
                                <div class="text-sm text-black/70 dark:text-white/70">
                                    <span class="inline-block text-wrap">
                                        {props.cuisine} •{" "}
                                        <a
                                            class="underline hover:text-blue-500 dark:hover:text-blue-400"
                                            href={`https://www.google.com/maps/dir/?api=1&destination=${props.address
                                                .split(" ")
                                                .join("+")}`}
                                            target="_blank"
                                        >
                                            {props.address}
                                        </a>
                                    </span>
                                </div>
                            </div>
                            <div class="text-sm text-black/70 dark:text-white/70">
                                <Content />
                            </div>
                        </div>
                        <div>
                            {props.menu !== undefined && (
                                <Button
                                    class="text-blue-500 dark:text-blue-400"
                                    href={props.menu}
                                    plain
                                    target="_blank"
                                >
                                    Menu
                                    <Icon name="book-open" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </li>
        );
    };
}
