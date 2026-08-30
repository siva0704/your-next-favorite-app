import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

async function main() {
  const serverMjsPath = path.resolve(".output/server/index.mjs");
  const serverUrl = pathToFileURL(serverMjsPath).href;

  console.log("Loading server bundle from:", serverUrl);
  const handlerModule = await import(serverUrl);
  const handler = handlerModule.default;

  const repoBase =
    process.env.BASE_PATH ||
    (process.env.GITHUB_REPOSITORY
      ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}`
      : "/your-next-favorite-app");

  let res;
  if (repoBase && repoBase !== "/") {
    const reqWithBase = new Request(`http://localhost${repoBase}/`);
    res = await handler.fetch(reqWithBase, {});
  }
  if (!res || res.status >= 400) {
    const reqRoot = new Request("http://localhost/");
    res = await handler.fetch(reqRoot, {});
  }
  let html = await res.text();

  if (res.status >= 400 || !html) {
    throw new Error(`Failed to render index HTML, status: ${res.status}`);
  }

  // Ensure relative asset paths compatibility across GitHub Pages subpaths and custom domains
  if (repoBase) {
    html = html.replaceAll(`${repoBase}/assets/`, "./assets/");
    html = html.replaceAll(`"${repoBase}/favicon.ico"`, '"./favicon.ico"');
    html = html.replaceAll(`href="${repoBase}/favicon.ico"`, 'href="./favicon.ico"');
  }
  html = html.replaceAll("/your-next-favorite-app/assets/", "./assets/");
  html = html.replaceAll('"/your-next-favorite-app/favicon.ico"', '"./favicon.ico"');
  html = html.replaceAll('href="/your-next-favorite-app/favicon.ico"', 'href="./favicon.ico"');
  html = html.replaceAll('href="/assets/', 'href="./assets/');
  html = html.replaceAll('src="/assets/', 'src="./assets/');
  html = html.replaceAll('content="/assets/', 'content="./assets/');
  html = html.replaceAll('"/assets/', '"./assets/');
  html = html.replaceAll("'/assets/", "'./assets/");
  html = html.replaceAll('href="/favicon.ico"', 'href="./favicon.ico"');
  html = html.replaceAll('"/favicon.ico"', '"./favicon.ico"');

  const outputPublicDir = path.resolve(".output/public");
  if (!fs.existsSync(outputPublicDir)) {
    fs.mkdirSync(outputPublicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(outputPublicDir, "index.html"), html, "utf-8");
  fs.writeFileSync(path.join(outputPublicDir, "404.html"), html, "utf-8");
  fs.writeFileSync(path.join(outputPublicDir, ".nojekyll"), "", "utf-8");

  console.log(
    "Successfully generated static index.html, 404.html, and .nojekyll in .output/public!",
  );
}

main().catch((err) => {
  console.error("Error generating static HTML:", err);
  process.exit(1);
});
