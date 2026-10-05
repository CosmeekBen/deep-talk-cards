// Contrôle que CHAQUE question tient sur sa carte au plus petit écran (320x480),
// sans les tirer une à une : on injecte le texte directement dans la carte.
// Signale aussi les cartes à moins de MARGE px de marge — un repli de police
// suffirait à les faire déborder.
// Usage : node outils/verifier-petit-ecran.js <page.html>   (Playwright requis)
const { chromium } = require('playwright');
const chemin = require('path').resolve(process.argv[2]);
const MARGE = 20;
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const p = await (await b.newContext({ viewport: { width: 320, height: 480 }, deviceScaleFactor: 2 })).newPage();
  await p.goto('file://' + chemin);
  await p.waitForTimeout(500);
  const r = await p.evaluate(() => {
    const q = document.getElementById('question');
    document.getElementById('card').classList.add('is-flipped');
    const FINE = ' ', LONGUE = 95;               // miroir de typo() et LONG_QUESTION dans app.js
    const rows = [];
    for (const [cat, d] of Object.entries(window.YAPPY_DECKS)) {
      for (const it of d.questions) {
        const t = typeof it === 'string' ? it : it.text;
        q.textContent = t.replace(/\s+([?!;:%»])/g, FINE + '$1').replace(/(«)\s+/g, '$1' + FINE);
        q.classList.toggle('is-long', t.length > LONGUE);
        const rg = document.createRange(); rg.selectNodeContents(q);
        const te = rg.getBoundingClientRect(), bo = q.getBoundingClientRect();
        rows.push({ cat, t, marge: Math.round(Math.min(te.top - bo.top, bo.bottom - te.bottom)) });
      }
    }
    return rows;
  });
  const mauvais = r.filter(x => x.marge < 0), justes = r.filter(x => x.marge >= 0 && x.marge < MARGE);
  console.log(r.length, 'cartes testées en 320x480 |', mauvais.length, 'débordent |', justes.length, 'à moins de', MARGE, 'px de marge');
  [...mauvais, ...justes].forEach(x => console.log(`  ${x.marge}px  [${x.cat}] ${x.t.slice(0, 80)}`));
  await b.close();
  process.exit(mauvais.length ? 1 : 0);
})();
