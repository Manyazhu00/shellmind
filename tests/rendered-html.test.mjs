import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("redirects the app route to the published static homepage", async () => {
  const response = await render();

  assert.equal(response.status, 307);
  assert.equal(response.headers.get("location"), "http://localhost/index.html");
});

test("publishes the English-first Shellmind homepage", async () => {
  const [html, layout] = await Promise.all([
    readFile(new URL("../public/index.html", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(html, /<html lang="en" data-lang="en">/);
  assert.match(html, /apply\(s\|\|'en'\)/);
  assert.match(html, /Know what’s fair<br>before you sign\./);
  assert.match(html, /Benchmark every price/);
  assert.match(html, /assets\/shellmind-ad-480\.m4v/);
  assert.match(html, /assets\/shellmind-ad-en-480\.m4v/);
  assert.match(layout, /title:\s*"Shellmind · AI Renovation Concierge"/);
  assert.match(layout, /<html lang="en">/);

  await Promise.all([
    access(new URL("../public/assets/shellmind-ad-480.m4v", import.meta.url)),
    access(new URL("../public/assets/shellmind-ad-en-480.m4v", import.meta.url)),
  ]);
});
