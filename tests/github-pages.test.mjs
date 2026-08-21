import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("GitHub Pages output is ready for the custom domain", async () => {
  const html = await readFile(new URL("../docs/index.html", import.meta.url), "utf8");
  const cname = await readFile(new URL("../docs/CNAME", import.meta.url), "utf8");

  assert.equal(cname, "kindsites.ru\n");
  assert.match(html, /KIND SITES/);
  assert.match(html, /39 000 ₽/);
  assert.match(html, /69 000 ₽/);
  assert.match(html, /от 100 000 ₽/);

  const localAssets = [...html.matchAll(/(?:href|src)="(\/_next\/[^"?]+|\/[^"?]+\.(?:svg|png|webp))"/g)]
    .map(([, path]) => new URL(`../docs${path}`, import.meta.url));
  assert.ok(localAssets.length > 0);
  await Promise.all(localAssets.map((path) => access(path)));
});
