import type { PropsWithChildren } from "react";

import { isRouteErrorResponse, Outlet } from "react-router";

import type { Route } from "./+types/root";

import styles from "./tailwind.css?url";

export function Layout({ children }: PropsWithChildren) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta content="width=device-width, initial-scale=1" name="viewport" />
                <meta content="#000000" name="theme-color" />
                <link href={styles} rel="stylesheet" />
                <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
                <link href="favicon.png" rel="icon" type="image/png" />
                <title>Denver Restaurants</title>
            </head>
            <body className="relative isolate flex min-h-svh w-full flex-col bg-gray-200 text-zinc-950 dark:bg-black dark:text-white">
                <main className="flex flex-1 flex-col px-2 py-2">
                    <div className="grow rounded-lg bg-white p-10 shadow-xs ring-1 ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10">
                        <div className="mx-auto max-w-6xl">{children}</div>
                    </div>
                </main>
            </body>
        </html>
    );
}

export function ServerComponent() {
    return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main>
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre>
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
}
