import { clsx } from "clsx";

type DividerProps = {
    soft?: boolean;
    class?: string;
};

export function Divider() {
    return (props: DividerProps) => (
        <hr
            class={clsx(
                props.class,
                "w-full border-t",
                props.soft && "border-zinc-950/5 dark:border-white/5",
                !props.soft && "border-zinc-950/10 dark:border-white/10",
            )}
        />
    );
}
