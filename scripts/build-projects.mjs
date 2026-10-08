// Rebuilds optimized project pages from project-src/ into public/project-files/.
// Usage: node scripts/build-projects.mjs [name ...]   (default: all pages listed below)
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import vm from "node:vm";
import { transformSync } from "esbuild";

const require = createRequire(import.meta.url);
const ROOT = new URL("..", import.meta.url).pathname;
const OUT = join(ROOT, "public/project-files");
const PAGES = ["skyelite"];
const INLINE_LIMIT = 60 * 1024;

const VENDOR = {
  "https://unpkg.com/react@18.3.1/umd/react.production.min.js": ["react18/umd/react.production.min.js", "react-18.3.1.min.js"],
  "https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js": ["react-dom18/umd/react-dom.production.min.js", "react-dom-18.3.1.min.js"],
  "https://unpkg.com/lucide@latest": ["lucide/dist/umd/lucide.min.js", `lucide-${require("lucide/package.json").version}.min.js`],
};

function copyVendor() {
  mkdirSync(join(OUT, "vendor"), { recursive: true });
  for (const [src, name] of Object.values(VENDOR)) copyFileSync(require.resolve(src), join(OUT, "vendor", name));
}

function readTailwindConfig(html) {
  const m = html.match(/<script>\s*tailwind\.config\s*=\s*([\s\S]*?)<\/script>/);
  if (!m) return { config: {}, html };
  const sandbox = { tailwind: {} };
  vm.runInNewContext(`tailwind.config = ${m[1]}`, sandbox);
  return { config: sandbox.tailwind.config, html: html.replace(m[0], "") };
}

function buildCss(name, html, config, safelist) {
  const dir = join(tmpdir(), `tw-${name}`);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const extra = [...html.matchAll(/<style type="text\/tailwindcss">([\s\S]*?)<\/style>/g)].map((m) => m[1]).join("\n");
  writeFileSync(join(dir, "page.html"), html);
  writeFileSync(join(dir, "in.css"), `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n${extra}\n`);
  writeFileSync(join(dir, "tw.config.cjs"), `module.exports = ${JSON.stringify({ ...config, content: [join(dir, "page.html")], safelist })};`);
  execFileSync(process.execPath, [require.resolve("tailwindcss3/lib/cli.js"), "-c", join(dir, "tw.config.cjs"), "-i", join(dir, "in.css"), "-o", join(dir, "out.css"), "--minify"], { stdio: "pipe" });
  return readFileSync(join(dir, "out.css"), "utf8");
}

const SAFELIST = { skyelite: [] };

function build(name) {
  let html = readFileSync(join(ROOT, "project-src", `${name}.html`), "utf8");
  const tw = readTailwindConfig(html);
  html = tw.html;
  const css = buildCss(name, html, tw.config, SAFELIST[name] ?? []);
  html = html.replace(/<style type="text\/tailwindcss">[\s\S]*?<\/style>/g, "");
  let cssTag;
  if (Buffer.byteLength(css) < INLINE_LIMIT) cssTag = `<style>${css}</style>`;
  else {
    mkdirSync(join(OUT, "css"), { recursive: true });
    writeFileSync(join(OUT, "css", `${name}.css`), css);
    cssTag = `<link rel="stylesheet" href="/project-files/css/${name}.css" />`;
  }
  html = html.replace(/<script src="https:\/\/cdn\.tailwindcss\.com[^"]*"><\/script>/, cssTag);
  html = html.replace(/\s*<script src="https:\/\/unpkg\.com\/@babel\/standalone[^"]*"><\/script>/, "");
  html = html.replace(/<script type="text\/babel"[^>]*>([\s\S]*?)<\/script>/g, (_, code) =>
    `<script>${transformSync(code, { loader: "jsx", target: "es2018", jsx: "transform" }).code}</script>`);
  for (const [url, [, file]] of Object.entries(VENDOR))
    html = html.replace(new RegExp(`<script( crossorigin)? src="${url.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")}"></script>`), `<script src="/project-files/vendor/${file}"></script>`);
  writeFileSync(join(OUT, `${name}.html`), html);
  console.log(name, Buffer.byteLength(html), "bytes");
}

copyVendor();
(process.argv.slice(2).length ? process.argv.slice(2) : PAGES).forEach(build);
