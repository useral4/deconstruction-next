import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const EXPORT_IMAGES = path.join(ROOT, "legacy", "tilda-export", "images");
const PUBLIC_IMAGES = path.join(ROOT, "public", "images");
const AUDIT = path.join(ROOT, "_data", "audit.json");

function safeName(url) {
  const u = new URL(url);
  const base = path.basename(u.pathname) || "image";
  const hash = createHash("md5").update(url).digest("hex").slice(0, 8);
  return `${hash}_${base.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
}

async function download(url, dest) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return buf.length;
}

async function main() {
  fs.mkdirSync(PUBLIC_IMAGES, { recursive: true });

  // Copy local export images
  let copied = 0;
  if (fs.existsSync(EXPORT_IMAGES)) {
    for (const file of fs.readdirSync(EXPORT_IMAGES)) {
      const src = path.join(EXPORT_IMAGES, file);
      const dest = path.join(PUBLIC_IMAGES, file);
      if (!fs.existsSync(dest)) {
        fs.copyFileSync(src, dest);
        copied++;
      }
    }
  }

  const audit = JSON.parse(fs.readFileSync(AUDIT, "utf8"));
  const cdnUrls = audit.cdnUrls || [];
  const manifest = { copied, downloaded: [], failed: [] };

  for (const url of cdnUrls) {
    const full = url.startsWith("http") ? url : `https:${url}`;
    const name = safeName(full);
    const dest = path.join(PUBLIC_IMAGES, name);
    if (fs.existsSync(dest)) continue;
    try {
      const size = await download(full, dest);
      manifest.downloaded.push({ url: full, file: name, size });
    } catch (e) {
      manifest.failed.push({ url: full, error: String(e.message || e) });
    }
  }

  fs.writeFileSync(path.join(ROOT, "_data", "cdn-manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`Copied local: ${copied}, CDN downloaded: ${manifest.downloaded.length}, failed: ${manifest.failed.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
