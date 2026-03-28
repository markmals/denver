import type { MixValue, RemixNode } from "remix/component";

import { css } from "remix/component";

import { Link } from "./link.tsx";

// Base button styles shared across all variants
let baseStyle = css({
    position: "relative",
    isolation: "isolate",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "calc(var(--spacing) * 2)",
    borderRadius: "var(--radius-lg)",
    border: "1px solid transparent",
    fontSize: "var(--text-base)",
    lineHeight: "1.5rem",
    paddingLeft: "calc(calc(var(--spacing) * 3.5) - 1px)",
    paddingRight: "calc(calc(var(--spacing) * 3.5) - 1px)",
    paddingTop: "calc(calc(var(--spacing) * 2.5) - 1px)",
    paddingBottom: "calc(calc(var(--spacing) * 2.5) - 1px)",
    "&:focus": {
        outline: "none",
    },
    "&:focus-visible": {
        outline: "2px solid var(--color-blue-500)",
        outlineOffset: "2px",
    },
    "&:disabled": {
        color: "rgb(0 0 0 / 35%)",
    },
    // Icon slot styling
    "& [data-slot=icon]": {
        marginLeft: "-0.125rem",
        marginRight: "-0.125rem",
        marginTop: "0.125rem",
        marginBottom: "0.125rem",
        width: "1.25rem",
        height: "1.25rem",
        flexShrink: 0,
        color: "var(--btn-icon, currentColor)",
    },
    "@media (min-width: 40rem)": {
        fontSize: "var(--text-sm)",
        lineHeight: "1.5rem",
        paddingLeft: "calc(calc(var(--spacing) * 3) - 1px)",
        paddingRight: "calc(calc(var(--spacing) * 3) - 1px)",
        paddingTop: "calc(calc(var(--spacing) * 1.5) - 1px)",
        paddingBottom: "calc(calc(var(--spacing) * 1.5) - 1px)",
        "& [data-slot=icon]": {
            marginTop: "0.25rem",
            marginBottom: "0.25rem",
            width: "1rem",
            height: "1rem",
        },
    },
});

// Solid variant - layered background with before/after pseudo-elements
let solidStyle = css({
    fontWeight: "var(--font-weight-semibold)",
    borderColor: "transparent",
    backgroundColor: "var(--btn-border)",
    "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        zIndex: -10,
        borderRadius: "calc(var(--radius-lg) - 1px)",
        backgroundColor: "var(--btn-bg)",
        boxShadow: "var(--shadow-sm)",
    },
    "&::after": {
        content: '""',
        position: "absolute",
        inset: 0,
        zIndex: -10,
        borderRadius: "calc(var(--radius-lg) - 1px)",
        boxShadow: "inset 0 1px rgb(255 255 255 / 15%)",
    },
    "&:hover::after, &:active::after": {
        backgroundColor: "var(--btn-hover-overlay)",
    },
    "&:disabled::before": {
        boxShadow: "none",
    },
    "&:disabled::after": {
        boxShadow: "none",
    },
    "@media (prefers-color-scheme: dark)": {
        backgroundColor: "var(--btn-bg)",
        borderColor: "rgb(255 255 255 / 5%)",
        "&::before": {
            display: "none",
        },
        "&::after": {
            inset: "-1px",
            borderRadius: "var(--radius-lg)",
        },
    },
});

// Outline variant
let outlineStyle = css({
    fontWeight: "var(--font-weight-semibold)",
    borderColor: "rgb(0 0 0 / 10%)",
    color: "var(--color-zinc-950)",
    "--btn-icon": "var(--color-zinc-500)",
    "&:hover, &:active": {
        backgroundColor: "rgb(0 0 0 / 2.5%)",
        "--btn-icon": "var(--color-zinc-700)",
    },
    "@media (prefers-color-scheme: dark)": {
        borderColor: "rgb(255 255 255 / 15%)",
        color: "var(--color-white)",
        "--btn-bg": "transparent",
        "&:hover, &:active": {
            backgroundColor: "rgb(255 255 255 / 5%)",
            "--btn-icon": "var(--color-zinc-400)",
        },
    },
});

// Plain variant
let plainStyle = css({
    borderColor: "transparent",
    fontWeight: "var(--font-weight-normal)",
    "--btn-icon": "currentColor",
    "&:hover, &:active": {
        backgroundColor: "rgb(0 0 0 / 5%)",
    },
    "@media (prefers-color-scheme: dark)": {
        "&:hover, &:active": {
            backgroundColor: "rgb(255 255 255 / 10%)",
        },
    },
});

// Color definitions - each maps to CSS custom property values
// Format: [light text color, --btn-bg, --btn-border, --btn-hover-overlay, --btn-icon, hover/active --btn-icon, dark overrides...]
type ColorConfig = {
    color: string;
    btnBg: string;
    btnBorder: string;
    btnHoverOverlay: string;
    btnIcon: string;
    btnIconHover?: string;
    dark?: {
        color?: string;
        btnBg?: string;
        btnHoverOverlay?: string;
        btnIcon?: string;
        btnIconHover?: string;
    };
};

let COLOR_MAP: Record<string, ColorConfig> = {
    "dark/zinc": {
        color: "var(--color-white)",
        btnBg: "var(--color-zinc-900)",
        btnBorder: "rgb(from var(--color-zinc-950) r g b / 90%)",
        btnHoverOverlay: "rgb(255 255 255 / 10%)",
        btnIcon: "var(--color-zinc-400)",
        btnIconHover: "var(--color-zinc-300)",
        dark: {
            color: "var(--color-white)",
            btnBg: "var(--color-zinc-600)",
            btnHoverOverlay: "rgb(255 255 255 / 5%)",
        },
    },
    light: {
        color: "var(--color-zinc-950)",
        btnBg: "var(--color-white)",
        btnBorder: "rgb(from var(--color-zinc-950) r g b / 10%)",
        btnHoverOverlay: "rgb(from var(--color-zinc-950) r g b / 2.5%)",
        btnIcon: "var(--color-zinc-500)",
        btnIconHover: "var(--color-zinc-700)",
        dark: {
            color: "var(--color-white)",
            btnBg: "var(--color-zinc-800)",
            btnHoverOverlay: "rgb(255 255 255 / 5%)",
            btnIcon: "var(--color-zinc-500)",
            btnIconHover: "var(--color-zinc-400)",
        },
    },
    "dark/white": {
        color: "var(--color-white)",
        btnBg: "var(--color-zinc-900)",
        btnBorder: "rgb(from var(--color-zinc-950) r g b / 90%)",
        btnHoverOverlay: "rgb(255 255 255 / 10%)",
        btnIcon: "var(--color-zinc-400)",
        btnIconHover: "var(--color-zinc-300)",
        dark: {
            color: "var(--color-zinc-950)",
            btnBg: "var(--color-white)",
            btnHoverOverlay: "rgb(from var(--color-zinc-950) r g b / 5%)",
            btnIcon: "var(--color-zinc-500)",
            btnIconHover: "var(--color-zinc-400)",
        },
    },
    dark: {
        color: "var(--color-white)",
        btnBg: "var(--color-zinc-900)",
        btnBorder: "rgb(from var(--color-zinc-950) r g b / 90%)",
        btnHoverOverlay: "rgb(255 255 255 / 10%)",
        btnIcon: "var(--color-zinc-400)",
        btnIconHover: "var(--color-zinc-300)",
        dark: {
            btnBg: "var(--color-zinc-800)",
            btnHoverOverlay: "rgb(255 255 255 / 5%)",
        },
    },
    white: {
        color: "var(--color-zinc-950)",
        btnBg: "var(--color-white)",
        btnBorder: "rgb(from var(--color-zinc-950) r g b / 10%)",
        btnHoverOverlay: "rgb(from var(--color-zinc-950) r g b / 2.5%)",
        btnIcon: "var(--color-zinc-400)",
        btnIconHover: "var(--color-zinc-500)",
        dark: {
            btnHoverOverlay: "rgb(from var(--color-zinc-950) r g b / 5%)",
        },
    },
    zinc: {
        color: "var(--color-white)",
        btnBg: "var(--color-zinc-600)",
        btnBorder: "rgb(from var(--color-zinc-700) r g b / 90%)",
        btnHoverOverlay: "rgb(255 255 255 / 10%)",
        btnIcon: "var(--color-zinc-400)",
        btnIconHover: "var(--color-zinc-300)",
        dark: {
            btnHoverOverlay: "rgb(255 255 255 / 5%)",
        },
    },
    indigo: {
        color: "var(--color-white)",
        btnBg: "var(--color-indigo-500)",
        btnBorder: "rgb(from var(--color-indigo-600) r g b / 90%)",
        btnHoverOverlay: "rgb(255 255 255 / 10%)",
        btnIcon: "var(--color-indigo-300)",
        btnIconHover: "var(--color-indigo-200)",
    },
    cyan: {
        color: "var(--color-cyan-950)",
        btnBg: "var(--color-cyan-300)",
        btnBorder: "rgb(from var(--color-cyan-400) r g b / 80%)",
        btnHoverOverlay: "rgb(255 255 255 / 25%)",
        btnIcon: "var(--color-cyan-500)",
    },
    red: {
        color: "var(--color-white)",
        btnBg: "var(--color-red-600)",
        btnBorder: "rgb(from var(--color-red-700) r g b / 90%)",
        btnHoverOverlay: "rgb(255 255 255 / 10%)",
        btnIcon: "var(--color-red-300)",
        btnIconHover: "var(--color-red-200)",
    },
    orange: {
        color: "var(--color-white)",
        btnBg: "var(--color-orange-500)",
        btnBorder: "rgb(from var(--color-orange-600) r g b / 90%)",
        btnHoverOverlay: "rgb(255 255 255 / 10%)",
        btnIcon: "var(--color-orange-300)",
        btnIconHover: "var(--color-orange-200)",
    },
    amber: {
        color: "var(--color-amber-950)",
        btnBg: "var(--color-amber-400)",
        btnBorder: "rgb(from var(--color-amber-500) r g b / 80%)",
        btnHoverOverlay: "rgb(255 255 255 / 25%)",
        btnIcon: "var(--color-amber-600)",
    },
    yellow: {
        color: "var(--color-yellow-950)",
        btnBg: "var(--color-yellow-300)",
        btnBorder: "rgb(from var(--color-yellow-400) r g b / 80%)",
        btnHoverOverlay: "rgb(255 255 255 / 25%)",
        btnIcon: "var(--color-yellow-600)",
        btnIconHover: "var(--color-yellow-700)",
    },
    lime: {
        color: "var(--color-lime-950)",
        btnBg: "var(--color-lime-300)",
        btnBorder: "rgb(from var(--color-lime-400) r g b / 80%)",
        btnHoverOverlay: "rgb(255 255 255 / 25%)",
        btnIcon: "var(--color-lime-600)",
        btnIconHover: "var(--color-lime-700)",
    },
    green: {
        color: "var(--color-white)",
        btnBg: "var(--color-green-600)",
        btnBorder: "rgb(from var(--color-green-700) r g b / 90%)",
        btnHoverOverlay: "rgb(255 255 255 / 10%)",
        btnIcon: "rgb(255 255 255 / 60%)",
        btnIconHover: "rgb(255 255 255 / 80%)",
    },
    emerald: {
        color: "var(--color-white)",
        btnBg: "var(--color-emerald-600)",
        btnBorder: "rgb(from var(--color-emerald-700) r g b / 90%)",
        btnHoverOverlay: "rgb(255 255 255 / 10%)",
        btnIcon: "rgb(255 255 255 / 60%)",
        btnIconHover: "rgb(255 255 255 / 80%)",
    },
    teal: {
        color: "var(--color-white)",
        btnBg: "var(--color-teal-600)",
        btnBorder: "rgb(from var(--color-teal-700) r g b / 90%)",
        btnHoverOverlay: "rgb(255 255 255 / 10%)",
        btnIcon: "rgb(255 255 255 / 60%)",
        btnIconHover: "rgb(255 255 255 / 80%)",
    },
    sky: {
        color: "var(--color-white)",
        btnBg: "var(--color-sky-500)",
        btnBorder: "rgb(from var(--color-sky-600) r g b / 80%)",
        btnHoverOverlay: "rgb(255 255 255 / 10%)",
        btnIcon: "rgb(255 255 255 / 60%)",
        btnIconHover: "rgb(255 255 255 / 80%)",
    },
    blue: {
        color: "var(--color-white)",
        btnBg: "var(--color-blue-600)",
        btnBorder: "rgb(from var(--color-blue-700) r g b / 90%)",
        btnHoverOverlay: "rgb(255 255 255 / 10%)",
        btnIcon: "var(--color-blue-400)",
        btnIconHover: "var(--color-blue-300)",
    },
    violet: {
        color: "var(--color-white)",
        btnBg: "var(--color-violet-500)",
        btnBorder: "rgb(from var(--color-violet-600) r g b / 90%)",
        btnHoverOverlay: "rgb(255 255 255 / 10%)",
        btnIcon: "var(--color-violet-300)",
        btnIconHover: "var(--color-violet-200)",
    },
    purple: {
        color: "var(--color-white)",
        btnBg: "var(--color-purple-500)",
        btnBorder: "rgb(from var(--color-purple-600) r g b / 90%)",
        btnHoverOverlay: "rgb(255 255 255 / 10%)",
        btnIcon: "var(--color-purple-300)",
        btnIconHover: "var(--color-purple-200)",
    },
    fuchsia: {
        color: "var(--color-white)",
        btnBg: "var(--color-fuchsia-500)",
        btnBorder: "rgb(from var(--color-fuchsia-600) r g b / 90%)",
        btnHoverOverlay: "rgb(255 255 255 / 10%)",
        btnIcon: "var(--color-fuchsia-300)",
        btnIconHover: "var(--color-fuchsia-200)",
    },
    pink: {
        color: "var(--color-white)",
        btnBg: "var(--color-pink-500)",
        btnBorder: "rgb(from var(--color-pink-600) r g b / 90%)",
        btnHoverOverlay: "rgb(255 255 255 / 10%)",
        btnIcon: "var(--color-pink-300)",
        btnIconHover: "var(--color-pink-200)",
    },
    rose: {
        color: "var(--color-white)",
        btnBg: "var(--color-rose-500)",
        btnBorder: "rgb(from var(--color-rose-600) r g b / 90%)",
        btnHoverOverlay: "rgb(255 255 255 / 10%)",
        btnIcon: "var(--color-rose-300)",
        btnIconHover: "var(--color-rose-200)",
    },
};

type CSSProps = Parameters<typeof css>[0];

// Build a css() mixin for a given color config
function colorStyle(config: ColorConfig) {
    let style: CSSProps = {
        color: config.color,
        "--btn-bg": config.btnBg,
        "--btn-border": config.btnBorder,
        "--btn-hover-overlay": config.btnHoverOverlay,
        "--btn-icon": config.btnIcon,
    };

    if (config.btnIconHover) {
        style["&:hover, &:active"] = {
            "--btn-icon": config.btnIconHover,
        };
    }

    if (config.dark) {
        let darkStyle: CSSProps = {};
        if (config.dark.color) darkStyle.color = config.dark.color;
        if (config.dark.btnBg) darkStyle["--btn-bg"] = config.dark.btnBg;
        if (config.dark.btnHoverOverlay)
            darkStyle["--btn-hover-overlay"] = config.dark.btnHoverOverlay;
        if (config.dark.btnIcon) darkStyle["--btn-icon"] = config.dark.btnIcon;
        if (config.dark.btnIconHover) {
            darkStyle["&:hover, &:active"] = {
                "--btn-icon": config.dark.btnIconHover,
            };
        }
        style["@media (prefers-color-scheme: dark)"] = darkStyle;
    }

    return css(style);
}

// Pre-compute all color styles
let colorStyles = Object.fromEntries(
    Object.entries(COLOR_MAP).map(([name, config]) => [name, colorStyle(config)]),
) as Record<keyof typeof COLOR_MAP, ReturnType<typeof css>>;

let cursorDefaultStyle = css({
    cursor: "default",
});

type ButtonColor = keyof typeof COLOR_MAP;

type ButtonProps = (
    | { color?: ButtonColor; outline?: never; plain?: never }
    | { color?: never; outline: true; plain?: never }
    | { color?: never; outline?: never; plain: true }
) & {
    mix?: MixValue<Element>;
    children: RemixNode;
} & ({ href: string; target?: string; rel?: string } | { href?: never });

export function Button() {
    return (props: ButtonProps) => {
        let variantMixin = props.outline
            ? outlineStyle
            : props.plain
              ? plainStyle
              : [solidStyle, colorStyles[props.color ?? "dark/zinc"]];

        let mixins = props.mix
            ? [baseStyle, variantMixin, props.mix].flat()
            : [baseStyle, variantMixin].flat();

        if (props.href) {
            return (
                <Link href={props.href} mix={mixins} target={props.target}>
                    <TouchTarget>{props.children}</TouchTarget>
                </Link>
            );
        }

        return (
            <button mix={[...mixins, cursorDefaultStyle]} type="button">
                <TouchTarget>{props.children}</TouchTarget>
            </button>
        );
    };
}

let touchTargetStyle = css({
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "max(100%, 2.75rem)",
    height: "max(100%, 2.75rem)",
    transform: "translate(-50%, -50%)",
    "@media (pointer: fine)": {
        display: "none",
    },
});

export function TouchTarget() {
    return (props: { children: RemixNode }) => (
        <>
            <span aria-hidden="true" mix={[touchTargetStyle]} />
            {props.children}
        </>
    );
}
