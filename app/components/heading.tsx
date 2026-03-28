import type { RemixNode } from "remix/component";

import { css } from "remix/component";

type HeadingProps = {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    children: RemixNode;
};

let headingStyle = css({
    fontSize: "var(--text-2xl)",
    lineHeight: "2rem",
    fontWeight: "var(--font-weight-semibold)",
    color: "var(--color-zinc-950)",
    "@media (prefers-color-scheme: dark)": {
        color: "var(--color-white)",
    },
});

let subheadingStyle = css({
    fontSize: "var(--text-base)",
    lineHeight: "1.75rem",
    fontWeight: "var(--font-weight-semibold)",
    color: "var(--color-zinc-950)",
    "@media (prefers-color-scheme: dark)": {
        color: "var(--color-white)",
    },
});

export function Heading() {
    return (props: HeadingProps) => {
        let Tag = `h${props.level ?? 1}` as "h1";
        return <Tag mix={[headingStyle]}>{props.children}</Tag>;
    };
}

export function Subheading() {
    return (props: HeadingProps) => {
        let Tag = `h${props.level ?? 2}` as "h2";
        return <Tag mix={[subheadingStyle]}>{props.children}</Tag>;
    };
}
