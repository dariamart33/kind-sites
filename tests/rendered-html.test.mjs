import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://kindsites.ru/", { headers: { accept: "text/html" } }),
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

test("server-renders the KIND SITES landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>KIND SITES — сайты с характером<\/title>/i);
  assert.match(html, /Сайты, которые/);
  assert.match(html, /Анимированная монограмма KIND SITES/);
  assert.match(html, /chrome-art/);
  assert.match(html, /ks-chrome-cutout-v1\.webp/);
  assert.match(html, /orbit-one/);
  assert.match(html, /Дарья/);
  assert.match(html, /Мария/);
  assert.match(html, /RICHY/);
  assert.match(html, /og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/i);
});
