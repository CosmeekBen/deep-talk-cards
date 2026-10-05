// Tire les trois paquets en entier sur un viewport mobile et contrôle :
// cartes uniques, figures uniques, aucune question qui déborde de sa carte.
// Usage : node outils/verifier.js <page.html>   (Playwright requis)
const { chromium } = require('playwright');
const chemin = require('path').resolve(process.argv[2]);
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const p = await (await b.newContext({ viewport: { width: 390, height: 664 }, hasTouch: true })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + chemin);
  await p.waitForTimeout(500);
  const figures = new Set(); let total = 0, deborde = 0;
  for (const m of ['warmup', 'deep', 'crousti']) {
    await p.click(`.mode-btn[data-mode="${m}"]`); await p.waitForTimeout(500);
    const vues = new Set();
    for (let i = 0; i < 150; i++) {
      if (await p.evaluate(() => document.getElementById('deck').classList.contains('is-gone'))) break;
      await p.click('#drawBtn'); await p.waitForTimeout(55);
      const r = await p.evaluate(() => {
        const q = document.getElementById('question');
        const rg = document.createRange(); rg.selectNodeContents(q);
        const te = rg.getBoundingClientRect(), bo = q.getBoundingClientRect();
        const bt = document.querySelector('.next-btn').getBoundingClientRect();
        return { q: q.textContent, s: document.getElementById('sigil').innerHTML,
                 mauvais: te.top < bo.top - 1 || te.bottom > bo.bottom + 1 || te.bottom > bt.top - 4 };
      });
      vues.add(r.q); figures.add(r.s); total++;
      if (r.mauvais) { deborde++; console.log('  DÉBORDE :', r.q); }
      await p.click('#nextBtn'); await p.waitForTimeout(520);
    }
    console.log(m.padEnd(8), vues.size, 'cartes uniques');
  }
  console.log(`\ntotal tiré : ${total} | figures distinctes : ${figures.size} | débordements : ${deborde}`);
  console.log(errs.length ? 'ERREURS JS : ' + errs.join(' | ') : 'aucune erreur JS');
  await b.close();
  process.exit(deborde || errs.length || figures.size !== total ? 1 : 0);
})();
