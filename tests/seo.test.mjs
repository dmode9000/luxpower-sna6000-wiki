import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import test from 'node:test';

// Run after: VITEPRESS_BASE=/luxpower-sna6000-wiki/ npm run build
const dist = new URL('../docs/.vitepress/dist/', import.meta.url).pathname;
const site = 'https://dmode9000.github.io/luxpower-sna6000-wiki/';
function htmlPages(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? htmlPages(path) :
      entry.name.endsWith('.html') && entry.name !== '404.html' ? [path] : [];
  });
}
function urlFor(path) {
  return site + relative(dist, path).replace(/(^|\/)index\.html$/, '$1');
}

test('sitemap lists every HTML content page once at the deployed URL', () => {
  const xml = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const expected = htmlPages(dist).map(urlFor);
  assert.ok(expected.length > 0);
  assert.equal(new Set(urls).size, urls.length, 'duplicate sitemap URLs');
  assert.deepEqual(urls.sort(), expected.sort());
});

test('every content page has exactly one self-referencing canonical', () => {
  for (const path of htmlPages(dist)) {
    const head = readFileSync(path, 'utf8').split('</head>')[0];
    const links = head.match(/<link\b[^>]*rel="canonical"[^>]*>/g) || [];
    assert.equal(links.length, 1, path);
    assert.ok(links[0].includes(`href="${urlFor(path)}"`), path);
  }
});
