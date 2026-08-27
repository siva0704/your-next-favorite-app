import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

async function main() {
  const serverMjsPath = path.resolve(".output/server/index.mjs");
  const serverUrl = pathToFileURL(serverMjsPath).href;

  console.log("Loading server bundle from:", serverUrl);
  const handlerModule = await import(serverUrl);
  const handler = handlerModule.default;

  const req = new Request("http://localhost/your-next-favorite-app/");
  const res = await handler.fetch(req, {});
  let html = await res.text();

  if (res.status >= 400 || !html) {
    throw new Error(`Failed to render index HTML, status: ${res.status}`);
  }

  // Convert root-relative asset paths to relative paths for GitHub Pages subpath compatibility
  html = html.replaceAll('href="/your-next-favorite-app/assets/', 'href="./assets/');
  html = html.replaceAll('src="/your-next-favorite-app/assets/', 'src="./assets/');
  html = html.replaceAll('content="/your-next-favorite-app/assets/', 'content="./assets/');
  html = html.replaceAll('href="/your-next-favorite-app/favicon.ico"', 'href="./favicon.ico"');
  html = html.replaceAll('"/your-next-favorite-app/assets/', '"./assets/');
  html = html.replaceAll("'/your-next-favorite-app/assets/", "'./assets/");
  html = html.replaceAll('href="/assets/', 'href="./assets/');
  html = html.replaceAll('src="/assets/', 'src="./assets/');

  const outputPublicDir = path.resolve(".output/public");
  if (!fs.existsSync(outputPublicDir)) {
    fs.mkdirSync(outputPublicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(outputPublicDir, "index.html"), html, "utf-8");
  fs.writeFileSync(path.join(outputPublicDir, "404.html"), html, "utf-8");
  fs.writeFileSync(path.join(outputPublicDir, ".nojekyll"), "", "utf-8");

  console.log("Successfully generated static index.html, 404.html, and .nojekyll in .output/public!");
}

main().catch((err) => {
  console.error("Error generating static HTML:", err);
  process.exit(1);
});
