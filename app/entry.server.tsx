import { createRouter } from "remix/fetch-router";
import { get, route } from "remix/fetch-router/routes";
import { staticFiles } from "remix/static-middleware";

import home from "~/home.tsx";

export let routes = route({
    home: get("/"),
});

export let router = createRouter({
    middleware: [staticFiles("./public"), staticFiles("./dist/client")],
});

router.map(routes, home);

export default router;

if (import.meta.hot) {
    import.meta.hot.accept();
}
