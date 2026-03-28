import type { RemixNode } from "remix/component";

import { renderToStream } from "remix/component/server";
import { createHtmlResponse as html } from "remix/response/html";

export function document(node: RemixNode): Response {
    return html(renderToStream(node));
}
