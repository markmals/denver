import type { RemixNode } from "remix/component";

import { clsx } from "clsx";

type HeadingProps = {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    class?: string;
    children: RemixNode;
};

export function Heading() {
    return (props: HeadingProps) => {
        let Tag = `h${props.level ?? 1}` as "h1";
        return (
            <Tag
                class={clsx(props.class, "text-2xl/8 font-semibold text-zinc-950 dark:text-white")}
            >
                {props.children}
            </Tag>
        );
    };
}

export function Subheading() {
    return (props: HeadingProps) => {
        let Tag = `h${props.level ?? 2}` as "h2";
        return (
            <Tag
                class={clsx(props.class, "text-base/7 font-semibold text-zinc-950 dark:text-white")}
            >
                {props.children}
            </Tag>
        );
    };
}
