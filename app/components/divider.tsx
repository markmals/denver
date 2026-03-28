import { css } from "remix/component";

type DividerProps = {
    soft?: boolean;
};

let softStyle = css({
    width: "100%",
    borderTop: "1px solid oklch(14.1% 0.005 285.823 / 5%)",
    "@media (prefers-color-scheme: dark)": {
        borderColor: "rgb(255 255 255 / 5%)",
    },
});

let hardStyle = css({
    width: "100%",
    borderTop: "1px solid oklch(14.1% 0.005 285.823 / 10%)",
    "@media (prefers-color-scheme: dark)": {
        borderColor: "rgb(255 255 255 / 10%)",
    },
});

export function Divider() {
    return (props: DividerProps) => <hr mix={[props.soft ? softStyle : hardStyle]} />;
}
