import { css } from "remix/component";

export let bodyStyle = css({
    position: "relative",
    isolation: "isolate",
    display: "flex",
    minHeight: "100svh",
    width: "100%",
    flexDirection: "column",
    backgroundColor: "var(--color-gray-200)",
    color: "var(--color-zinc-950)",
    "@media (prefers-color-scheme: dark)": {
        backgroundColor: "var(--color-black)",
        color: "var(--color-white)",
    },
});

export let mainStyle = css({
    display: "flex",
    flex: "1 1 0%",
    flexDirection: "column",
    paddingInline: "calc(var(--spacing) * 2)",
    paddingBlock: "calc(var(--spacing) * 2)",
});

export let cardStyle = css({
    flexGrow: 1,
    borderRadius: "var(--radius-lg)",
    backgroundColor: "var(--color-white)",
    padding: "calc(var(--spacing) * 10)",
    boxShadow: "var(--shadow-xs), 0 0 0 1px oklch(14.1% 0.005 285.823 / 5%)",
    "@media (prefers-color-scheme: dark)": {
        backgroundColor: "var(--color-zinc-900)",
        boxShadow: "var(--shadow-xs), 0 0 0 1px rgb(255 255 255 / 10%)",
    },
});

export let listStyle = css({
    display: "flex",
    flexDirection: "column",
    "& > *": {
        borderBottom: "1px solid rgb(0 0 0 / 15%)",
    },
    "& > *:last-child": {
        borderBottom: "none",
    },
    "@media (prefers-color-scheme: dark)": {
        "& > *": {
            borderColor: "rgb(255 255 255 / 15%)",
        },
    },
});

export let listItemStyle = css({
    paddingTop: "calc(var(--spacing) * 6)",
    paddingBottom: "calc(var(--spacing) * 6)",
    "&:first-of-type": {
        paddingTop: 0,
    },
});

export let rowStyle = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "calc(var(--spacing) * 6)",
    "@media (min-width: 48rem)": {
        flexDirection: "row",
    },
});

export let imageWrapperStyle = css({
    position: "relative",
    width: "100%",
    "@media (min-width: 48rem)": {
        width: "auto",
    },
});

export let imageContainerStyle = css({
    display: "block",
    aspectRatio: "3 / 2",
    width: "100%",
    overflow: "hidden",
    borderRadius: "var(--radius-lg)",
    backgroundColor: "rgb(0 0 0 / 10%)",
    "@media (min-width: 48rem)": {
        aspectRatio: "1 / 1",
        width: "13rem",
    },
    "@media (prefers-color-scheme: dark)": {
        backgroundColor: "rgb(255 255 255 / 10%)",
    },
});

export let contentStyle = css({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "calc(var(--spacing) * 2)",
    overflow: "hidden",
});

export let titleStyle = css({
    fontSize: "var(--text-xl)",
    lineHeight: "var(--text-xl--line-height)",
    fontWeight: "var(--font-weight-medium)",
    color: "rgb(0 0 0 / 95%)",
    "@media (min-width: 48rem)": {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    "@media (prefers-color-scheme: dark)": {
        color: "rgb(255 255 255 / 95%)",
    },
});

export let subtextStyle = css({
    fontSize: "var(--text-sm)",
    lineHeight: "var(--text-sm--line-height)",
    color: "rgb(0 0 0 / 70%)",
    "@media (prefers-color-scheme: dark)": {
        color: "rgb(255 255 255 / 70%)",
    },
});

export let addressLinkStyle = css({
    textDecoration: "underline",
    "&:hover": {
        color: "var(--color-blue-500)",
    },
    "@media (prefers-color-scheme: dark)": {
        "&:hover": {
            color: "var(--color-blue-400)",
        },
    },
});
