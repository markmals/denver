import { createRouter } from "remix/fetch-router";
import { staticFiles } from "remix/static-middleware";

import home from "~/home.tsx";
import { routes } from "~/routes.ts";

export let router = createRouter({
    middleware: [staticFiles("./public"), staticFiles("./dist/client")],
});

router.map(routes, home);

export default router;

if (import.meta.hot) {
    import.meta.hot.accept();
}
