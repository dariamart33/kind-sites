import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const outputDirectory = fileURLToPath(new URL("../docs/", import.meta.url));
const clientDirectory = fileURLToPath(new URL("../dist/client/", import.meta.url));
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("pages-build", Date.now().toString());

const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("https://kindsites.ru/", { headers: { accept: "text/html" } }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) {
  throw new Error(`Unable to render the home page: ${response.status}`);
}

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await cp(clientDirectory, outputDirectory, { recursive: true });
await writeFile(new URL("../docs/index.html", import.meta.url), await response.text());
await writeFile(new URL("../docs/CNAME", import.meta.url), "kindsites.ru\n");
await writeFile(new URL("../docs/.nojekyll", import.meta.url), "");
