import type { Controller } from "remix/fetch-router";

import assert from "node:assert";
import { css, type RemixNode } from "remix/component";
import { getCollection, getEntry, render } from "sprinkles:content";

import icons from "~/assets/icons.svg?url";
import preflight from "~/assets/preflight.css?url";
import theme from "~/assets/theme.css?url";
import { Button } from "~/components/button.tsx";
import { Divider } from "~/components/divider.tsx";
import { Heading } from "~/components/heading.tsx";
import { routes } from "~/entry.server.tsx";
import { document } from "~/lib/render.tsx";

import {
    addressLinkStyle,
    bodyStyle,
    cardStyle,
    contentStyle,
    imageContainerStyle,
    imageWrapperStyle,
    listItemStyle,
    listStyle,
    mainStyle,
    rowStyle,
    subtextStyle,
    titleStyle,
} from "./styles.ts";

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
                        <link href={preflight} rel="stylesheet" />
                        <link href={theme} rel="stylesheet" />
                        <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
                        <link href="favicon.png" rel="icon" type="image/png" />
                        {import.meta.env.DEV && <script async src="/@vite/client" type="module" />}
                        <title>Denver Restaurants</title>
                    </head>
                    <body mix={bodyStyle}>
                        <main mix={mainStyle}>
                            <div mix={cardStyle}>
                                <div mix={css({ marginInline: "auto", maxWidth: "72rem" })}>
                                    <div
                                        mix={css({
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "calc(var(--spacing) * 4)",
                                        })}
                                    >
                                        <Heading>Denver Restaurants</Heading>
                                        <Divider />
                                        <ul mix={listStyle}>
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
    return (props: { name: string; size?: number }) => {
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
            <li mix={listItemStyle}>
                <div mix={rowStyle}>
                    <div mix={imageWrapperStyle}>
                        <div mix={imageContainerStyle}>
                            <img
                                alt=""
                                mix={css({
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                })}
                                src={props.thumbnail}
                            />
                        </div>
                    </div>
                    <div mix={contentStyle}>
                        <div
                            mix={css({
                                display: "flex",
                                flexDirection: "column",
                                gap: "calc(var(--spacing) * 2)",
                            })}
                        >
                            <div
                                mix={css({
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "calc(var(--spacing) * 1)",
                                })}
                            >
                                <h2 mix={titleStyle}>{props.name}</h2>
                                <div mix={subtextStyle}>
                                    <span mix={css({ display: "inline-block", textWrap: "wrap" })}>
                                        {props.cuisine} •{" "}
                                        <a
                                            href={`https://www.google.com/maps/dir/?api=1&destination=${props.address
                                                .split(" ")
                                                .join("+")}`}
                                            mix={[addressLinkStyle]}
                                            target="_blank"
                                        >
                                            {props.address}
                                        </a>
                                    </span>
                                </div>
                            </div>
                            <div mix={subtextStyle}>
                                <Content />
                            </div>
                        </div>
                        <div>
                            {props.menu && (
                                <Button
                                    href={props.menu}
                                    mix={css({
                                        color: "var(--color-blue-500)",
                                        "@media (prefers-color-scheme: dark)": {
                                            color: "var(--color-blue-400)",
                                        },
                                    })}
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
