import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createServer as createHttpServer } from 'node:http';
import { resolve, sep } from 'node:path';
import { createServer } from 'vite';
import { chromium } from '@playwright/test';

// Load the same TypeScript and tenant glob that the supplied components run.
const vite = await createServer({ server: { middlewareMode: true } });
let evidence;
try {
  const { uniqueById, groupByCause, readAs, causeOf } = await vite.ssrLoadModule('/src/lib/kb/causes.ts');
  const { tenantOf } = await vite.ssrLoadModule('/src/lib/kb/locales.ts');
  const reports = JSON.parse(await readFile('src/lib/data/reports-4471.json'));
  const notes = JSON.parse(await readFile('src/lib/data/desk-notes.json'));
  const unique = uniqueById(reports);
  assert.equal(reports.length, 427);
  assert.equal(unique.length, 412);
  const groups = groupByCause(unique.filter(r => r.mergedInto === 4471), tenantOf);
  assert.deepEqual(groups.map(g => [g.cause, g.reports.length, g.tenants, g.taggedAs, readAs(g, notes.oneDayMove)]), [
    ['parser', 379, 11, { parser: 356, hint: 23 }, 5],
    ['hint', 33, 3, { parser: 15, hint: 18 }, 0]
  ]);
  assert.equal(causeOf({ channel: 'form' }, tenantOf({ tenant: 'alder.physio' })), 'hint');
  assert.equal(causeOf({ channel: 'app' }, tenantOf({ tenant: 'alder.physio' })), 'parser');
  assert.equal(causeOf({ channel: 'email' }, undefined), null);
  evidence = { rows: reports.length, unique: unique.length, overlappingRows: reports.length - unique.length,
    overlappingIds: [...new Set(reports.filter((r, i) => reports.findIndex(x => x.id === r.id) !== i).map(r => r.id))],
    oneDayMoveIds: notes.oneDayMove,
    groups: groups.map(g => ({ cause: g.cause, reports: g.reports.length, tenants: g.tenants, taggedAs: g.taggedAs, oneDayMove: readAs(g, notes.oneDayMove), reportIds: g.reports.map(r => r.id) })) };
} finally { await vite.close(); }

// Serve only the generated static output, so a passing test proves prerendered HTML exists.
const root = resolve('build');
const server = createHttpServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let path = resolve(root, '.' + pathname);
    if (!path.startsWith(root + sep) && path !== root) throw Error('outside build');
    if (!path.includes('.')) path += '/index.html';
    const data = await readFile(path);
    res.setHeader('Content-Type', path.endsWith('.js') ? 'text/javascript' : path.endsWith('.css') ? 'text/css' : 'text/html');
    res.end(data);
  } catch { res.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}) });
try {
  await mkdir('verification', { recursive: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const base = `http://127.0.0.1:${server.address().port}`;
  for (const [name, route] of [
    ['index', '/kb/'], ['incident', '/kb/incidents/4471/'],
    ['triage', '/kb/triage/dedupe/'], ['decision', '/kb/decisions/0001-dedupe-by-subject/'],
    ['investigation', '/kb/incidents/4471-review/']
  ]) {
    const html = await readFile(`build${route}index.html`, 'utf8');
    assert.ok(/<h1[ >]/.test(html), `${route} must contain server-rendered page content`);
    await page.goto(base + route);
    await page.locator('h1').waitFor();
    if (name === 'incident' || name === 'investigation') {
      await page.getByText('412', { exact: true }).first().waitFor();
      assert.match(await page.locator('main').innerText(), /379/);
      assert.match(await page.locator('main').innerText(), /33/);
      assert.match(await page.locator('main').innerText(), /5 reports read as a one-day move/);
      assert.equal(await page.locator('svg rect').count(), 54);
    }
    if (name === 'triage') {
      assert.match(await page.locator('.verdict').innerText(), /different causes/);
      await page.locator('select[aria-label="tenant"]').nth(1).selectOption('alder.physio');
      assert.match(await page.locator('.verdict').innerText(), /same cause/);
      await page.locator('select[aria-label="channel"]').nth(1).selectOption('app');
      assert.match(await page.locator('.verdict').innerText(), /different causes/);
    }
    if (name === 'investigation') assert.match(await page.locator('.stamp').innerText(), /DR-[0-9A-Z]{4}-[0-9A-Z]{4}/);
    await page.screenshot({ path: `verification/${name}.png`, fullPage: true });
  }
  assert.deepEqual(errors, []);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base + '/kb/incidents/4471-review/');
  await page.screenshot({ path: 'verification/investigation-mobile.png', fullPage: true });
  await writeFile('verification/evidence.json', JSON.stringify(evidence, null, 2) + '\n');
  console.log(JSON.stringify(evidence, null, 2));
} finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
