import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { getGlobalCode } from "./lib/global-code.server";

// Splice the Aura Desk "Header & Footer Code" (site-wide GTM/gtag etc.) into
// every HTML response, the same way it's baked into the main site's static
// pages — just done live per-request here since this app is server-rendered,
// not statically exported. Never throws: if the settings fetch fails/times
// out, the page renders normally without the injected code.
async function injectGlobalCode(response: Response): Promise<Response> {
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) return response;

  try {
    const { headCode, bodyCode } = await getGlobalCode();
    if (!headCode && !bodyCode) return response;

    let html = await response.text();
    if (headCode) {
      html = html.replace("</head>", `<!-- DA:HEAD:START -->\n${headCode}\n<!-- DA:HEAD:END -->\n</head>`);
    }
    if (bodyCode) {
      html = html.replace("</body>", `<!-- DA:BODY:START -->\n${bodyCode}\n<!-- DA:BODY:END -->\n</body>`);
    }

    const headers = new Headers(response.headers);
    headers.delete("content-length");
    return new Response(html, { status: response.status, headers });
  } catch {
    return response;
  }
}

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      return await injectGlobalCode(normalized);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
