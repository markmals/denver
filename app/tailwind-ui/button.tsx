import type { RemixNode } from "remix/component";

import { clsx } from "clsx";

import { Link } from "./link.tsx";

let styles = {
    base: [
        "relative isolate inline-flex items-center justify-center gap-x-2 rounded-lg border text-base/6",
        "px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)] sm:text-sm/6",
        "focus:outline-hidden focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
        "disabled:text-black/35",
        "*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-0.5 *:data-[slot=icon]:size-5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:text-(--btn-icon,currentColor) sm:*:data-[slot=icon]:my-1 sm:*:data-[slot=icon]:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:hover:[--btn-icon:ButtonText]",
    ],
    solid: [
        "font-semibold",
        "border-transparent bg-(--btn-border)",
        "dark:bg-(--btn-bg)",
        "before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-(--btn-bg)",
        "before:shadow-sm",
        "dark:before:hidden",
        "dark:border-white/5",
        "after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg)-1px)]",
        "after:shadow-[inset_0_1px_--theme(--color-white/15%)]",
        "active:after:bg-(--btn-hover-overlay) hover:after:bg-(--btn-hover-overlay)",
        "dark:after:-inset-px dark:after:rounded-lg",
        "disabled:before:shadow-none disabled:after:shadow-none",
    ],
    outline: [
        "border-zinc-950/10 text-zinc-950 active:bg-zinc-950/2.5 hover:bg-zinc-950/2.5",
        "font-semibold",
        "dark:border-white/15 dark:text-white dark:[--btn-bg:transparent] dark:active:bg-white/5 dark:hover:bg-white/5",
        "[--btn-icon:var(--color-zinc-500)] active:[--btn-icon:var(--color-zinc-700)] hover:[--btn-icon:var(--color-zinc-700)] dark:active:[--btn-icon:var(--color-zinc-400)] dark:hover:[--btn-icon:var(--color-zinc-400)]",
    ],
    plain: [
        "border-transparent active:bg-zinc-950/5 hover:bg-zinc-950/5",
        "font-normal",
        "dark:active:bg-white/10 dark:hover:bg-white/10",
        "[--btn-icon:currentColor]",
    ],
    colors: {
        "dark/zinc": [
            "text-white [--btn-bg:var(--color-zinc-900)] [--btn-border:var(--color-zinc-950)]/90 [--btn-hover-overlay:var(--color-white)]/10",
            "dark:text-white dark:[--btn-bg:var(--color-zinc-600)] dark:[--btn-hover-overlay:var(--color-white)]/5",
            "[--btn-icon:var(--color-zinc-400)] active:[--btn-icon:var(--color-zinc-300)] hover:[--btn-icon:var(--color-zinc-300)]",
        ],
        light: [
            "text-zinc-950 [--btn-bg:white] [--btn-border:var(--color-zinc-950)]/10 [--btn-hover-overlay:var(--color-zinc-950)]/2.5 active:[--btn-border:var(--color-zinc-950)]/15 hover:[--btn-border:var(--color-zinc-950)]/15",
            "dark:text-white dark:[--btn-hover-overlay:var(--color-white)]/5 dark:[--btn-bg:var(--color-zinc-800)]",
            "[--btn-icon:var(--color-zinc-500)] active:[--btn-icon:var(--color-zinc-700)] hover:[--btn-icon:var(--color-zinc-700)] dark:[--btn-icon:var(--color-zinc-500)] dark:active:[--btn-icon:var(--color-zinc-400)] dark:hover:[--btn-icon:var(--color-zinc-400)]",
        ],
        "dark/white": [
            "text-white [--btn-bg:var(--color-zinc-900)] [--btn-border:var(--color-zinc-950)]/90 [--btn-hover-overlay:var(--color-white)]/10",
            "dark:text-zinc-950 dark:[--btn-bg:white] dark:[--btn-hover-overlay:var(--color-zinc-950)]/5",
            "[--btn-icon:var(--color-zinc-400)] active:[--btn-icon:var(--color-zinc-300)] hover:[--btn-icon:var(--color-zinc-300)] dark:[--btn-icon:var(--color-zinc-500)] dark:active:[--btn-icon:var(--color-zinc-400)] dark:hover:[--btn-icon:var(--color-zinc-400)]",
        ],
        dark: [
            "text-white [--btn-bg:var(--color-zinc-900)] [--btn-border:var(--color-zinc-950)]/90 [--btn-hover-overlay:var(--color-white)]/10",
            "dark:[--btn-hover-overlay:var(--color-white)]/5 dark:[--btn-bg:var(--color-zinc-800)]",
            "[--btn-icon:var(--color-zinc-400)] active:[--btn-icon:var(--color-zinc-300)] hover:[--btn-icon:var(--color-zinc-300)]",
        ],
        white: [
            "text-zinc-950 [--btn-bg:white] [--btn-border:var(--color-zinc-950)]/10 [--btn-hover-overlay:var(--color-zinc-950)]/2.5 active:[--btn-border:var(--color-zinc-950)]/15 hover:[--btn-border:var(--color-zinc-950)]/15",
            "dark:[--btn-hover-overlay:var(--color-zinc-950)]/5",
            "[--btn-icon:var(--color-zinc-400)] active:[--btn-icon:var(--color-zinc-500)] hover:[--btn-icon:var(--color-zinc-500)]",
        ],
        zinc: [
            "text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-zinc-600)] [--btn-border:var(--color-zinc-700)]/90",
            "dark:[--btn-hover-overlay:var(--color-white)]/5",
            "[--btn-icon:var(--color-zinc-400)] active:[--btn-icon:var(--color-zinc-300)] hover:[--btn-icon:var(--color-zinc-300)]",
        ],
        indigo: [
            "text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-indigo-500)] [--btn-border:var(--color-indigo-600)]/90",
            "[--btn-icon:var(--color-indigo-300)] active:[--btn-icon:var(--color-indigo-200)] hover:[--btn-icon:var(--color-indigo-200)]",
        ],
        cyan: [
            "text-cyan-950 [--btn-bg:var(--color-cyan-300)] [--btn-border:var(--color-cyan-400)]/80 [--btn-hover-overlay:var(--color-white)]/25",
            "[--btn-icon:var(--color-cyan-500)]",
        ],
        red: [
            "text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-red-600)] [--btn-border:var(--color-red-700)]/90",
            "[--btn-icon:var(--color-red-300)] active:[--btn-icon:var(--color-red-200)] hover:[--btn-icon:var(--color-red-200)]",
        ],
        orange: [
            "text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-orange-500)] [--btn-border:var(--color-orange-600)]/90",
            "[--btn-icon:var(--color-orange-300)] active:[--btn-icon:var(--color-orange-200)] hover:[--btn-icon:var(--color-orange-200)]",
        ],
        amber: [
            "text-amber-950 [--btn-hover-overlay:var(--color-white)]/25 [--btn-bg:var(--color-amber-400)] [--btn-border:var(--color-amber-500)]/80",
            "[--btn-icon:var(--color-amber-600)]",
        ],
        yellow: [
            "text-yellow-950 [--btn-hover-overlay:var(--color-white)]/25 [--btn-bg:var(--color-yellow-300)] [--btn-border:var(--color-yellow-400)]/80",
            "[--btn-icon:var(--color-yellow-600)] active:[--btn-icon:var(--color-yellow-700)] hover:[--btn-icon:var(--color-yellow-700)]",
        ],
        lime: [
            "text-lime-950 [--btn-hover-overlay:var(--color-white)]/25 [--btn-bg:var(--color-lime-300)] [--btn-border:var(--color-lime-400)]/80",
            "[--btn-icon:var(--color-lime-600)] active:[--btn-icon:var(--color-lime-700)] hover:[--btn-icon:var(--color-lime-700)]",
        ],
        green: [
            "text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-green-600)] [--btn-border:var(--color-green-700)]/90",
            "[--btn-icon:var(--color-white)]/60 active:[--btn-icon:var(--color-white)]/80 hover:[--btn-icon:var(--color-white)]/80",
        ],
        emerald: [
            "text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-emerald-600)] [--btn-border:var(--color-emerald-700)]/90",
            "[--btn-icon:var(--color-white)]/60 active:[--btn-icon:var(--color-white)]/80 hover:[--btn-icon:var(--color-white)]/80",
        ],
        teal: [
            "text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-teal-600)] [--btn-border:var(--color-teal-700)]/90",
            "[--btn-icon:var(--color-white)]/60 active:[--btn-icon:var(--color-white)]/80 hover:[--btn-icon:var(--color-white)]/80",
        ],
        sky: [
            "text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-sky-500)] [--btn-border:var(--color-sky-600)]/80",
            "[--btn-icon:var(--color-white)]/60 active:[--btn-icon:var(--color-white)]/80 hover:[--btn-icon:var(--color-white)]/80",
        ],
        blue: [
            "text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-blue-600)] [--btn-border:var(--color-blue-700)]/90",
            "[--btn-icon:var(--color-blue-400)] active:[--btn-icon:var(--color-blue-300)] hover:[--btn-icon:var(--color-blue-300)]",
        ],
        violet: [
            "text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-violet-500)] [--btn-border:var(--color-violet-600)]/90",
            "[--btn-icon:var(--color-violet-300)] active:[--btn-icon:var(--color-violet-200)] hover:[--btn-icon:var(--color-violet-200)]",
        ],
        purple: [
            "text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-purple-500)] [--btn-border:var(--color-purple-600)]/90",
            "[--btn-icon:var(--color-purple-300)] active:[--btn-icon:var(--color-purple-200)] hover:[--btn-icon:var(--color-purple-200)]",
        ],
        fuchsia: [
            "text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-fuchsia-500)] [--btn-border:var(--color-fuchsia-600)]/90",
            "[--btn-icon:var(--color-fuchsia-300)] active:[--btn-icon:var(--color-fuchsia-200)] hover:[--btn-icon:var(--color-fuchsia-200)]",
        ],
        pink: [
            "text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-pink-500)] [--btn-border:var(--color-pink-600)]/90",
            "[--btn-icon:var(--color-pink-300)] active:[--btn-icon:var(--color-pink-200)] hover:[--btn-icon:var(--color-pink-200)]",
        ],
        rose: [
            "text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-rose-500)] [--btn-border:var(--color-rose-600)]/90",
            "[--btn-icon:var(--color-rose-300)] active:[--btn-icon:var(--color-rose-200)] hover:[--btn-icon:var(--color-rose-200)]",
        ],
    },
};

type ButtonProps = (
    | { color?: keyof typeof styles.colors; outline?: never; plain?: never }
    | { color?: never; outline: true; plain?: never }
    | { color?: never; outline?: never; plain: true }
) & {
    class?: string;
    children: RemixNode;
} & (({ href: string } & Record<string, unknown>) | Record<string, unknown>);

export function Button() {
    return (props: ButtonProps) => {
        let classes = clsx(
            props.class,
            styles.base,
            props.outline
                ? styles.outline
                : props.plain
                  ? styles.plain
                  : clsx(styles.solid, styles.colors[props.color ?? "dark/zinc"]),
        );

        if ("href" in props && props.href) {
            return (
                <Link
                    class={classes}
                    href={props.href as string}
                    target={(props as Record<string, unknown>).target as string | undefined}
                >
                    <TouchTarget>{props.children}</TouchTarget>
                </Link>
            );
        }

        return (
            <button class={clsx(classes, "cursor-default")} type="button">
                <TouchTarget>{props.children}</TouchTarget>
            </button>
        );
    };
}

export function TouchTarget() {
    return (props: { children: RemixNode }) => (
        <>
            <span
                aria-hidden="true"
                class="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden"
            />
            {props.children}
        </>
    );
}
