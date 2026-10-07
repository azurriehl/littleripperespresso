// Packs the Vite build into ONE self-contained HTML file: CSS, JavaScript,
// the favicon and the Unsplash photo are all inlined. Used for previews and
// for sharing the site as a single file. Run with: npm run build:single
//
//   node scripts/build-single.mjs                 -> writes ../index.html
//   node scripts/build-single.mjs --artifact out  -> also writes a body-only copy to `out`
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const dist = join(here, "..", "dist");
let html = readFileSync(join(dist, "index.html"), "utf8");

// Inline the stylesheet and the script bundle.
html = html.replace(/<link rel="stylesheet"[^>]*href="\/(assets\/[^"]+\.css)"[^>]*>/, (_, file) => {
  return `<style>\n${readFileSync(join(dist, file), "utf8")}\n</style>`;
});
let scriptFile = null;
html = html.replace(/<script type="module"[^>]*src="\/(assets\/[^"]+\.js)"[^>]*><\/script>/, (_, file) => {
  scriptFile = file;
  return "<!--APP_SCRIPT-->";
});
if (!scriptFile) throw new Error("No module script found in dist/index.html");
let js = readFileSync(join(dist, scriptFile), "utf8");

// Swap remote Unsplash photos for embedded data URIs (smaller size for the single file).
const urls = [...new Set(js.match(/https:\/\/images\.unsplash\.com\/[^"'`\s]+/g) || [])];
for (const url of urls) {
  const small = url.replace(/w=\d+/, "w=1200").replace(/q=\d+/, "q=72");
  const bytes = execFileSync("curl", ["-sSfL", small], { maxBuffer: 20 * 1024 * 1024 });
  js = js.split(url).join(`data:image/jpeg;base64,${bytes.toString("base64")}`);
  console.log(`inlined photo ${Math.round(bytes.length / 1024)} KB`);
}

// Favicon as a data URI.
const favicon = readFileSync(join(dist, "favicon.svg"), "utf8");
html = html.replace('href="/favicon.svg"', () => `href="data:image/svg+xml,${encodeURIComponent(favicon)}"`);

// Body script goes last so #root exists; escape any closing script tags inside it.
html = html.replace("<!--APP_SCRIPT-->", "");
// Function replacers throughout: a plain string replacement would expand "$'" and "$`"
// sequences inside the minified bundle and corrupt it.
const safeJs = js.replace(/<\/script/gi, () => "<\\/script");
html = html.replace("</body>", () => `<script type="module">\n${safeJs}\n</script>\n</body>`);
html = html.replace("<head>", () => "<head>\n    <!-- Generated from site/ by `npm run build:single`. Edit site/src/config/business.js, not this file. -->");

const out = join(here, "..", "..", "index.html");
writeFileSync(out, html);
console.log(`wrote ${out} (${Math.round(html.length / 1024)} KB)`);

const flag = process.argv.indexOf("--artifact");
if (flag > -1 && process.argv[flag + 1]) {
  const body = html
    .replace(/<!doctype html>\s*/i, "")
    .replace(/<html[^>]*>\s*/i, "")
    .replace(/<\/html>\s*$/i, "")
    .replace(/<head>\s*/i, "")
    .replace(/<\/head>\s*/i, "")
    .replace(/<body>\s*/i, "")
    .replace(/<\/body>\s*/i, "")
    .replace(/<meta charset[^>]*>\s*/i, "")
    .replace(/<meta name="viewport"[^>]*>\s*/i, "");
  writeFileSync(process.argv[flag + 1], body);
  console.log(`wrote artifact copy ${process.argv[flag + 1]}`);
}
