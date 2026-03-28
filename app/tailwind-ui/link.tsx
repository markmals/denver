import type { RemixNode } from "remix/component";

type LinkProps = {
    href: string;
    class?: string;
    target?: string;
    rel?: string;
    children: RemixNode;
};

export function Link() {
    return (props: LinkProps) => (
        <a class={props.class} href={props.href} rel={props.rel} target={props.target}>
            {props.children}
        </a>
    );
}
