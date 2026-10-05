// Assemble la version « un seul fichier » destinée à l'artifact.
// Usage : node outils/build-artifact.js <fichier-de-sortie>
// Les polices passent par Google Fonts (autorisé par la CSP) ; les images,
// elles, doivent être inlinées en base64 — la CSP bloque les images externes.
const fs = require('fs');
const path = require('path');
const R = path.resolve(__dirname, '..');
const lire = f => fs.readFileSync(path.join(R, f), 'utf8');

let css = lire('styles.css');
for (const m of css.matchAll(/url\("(images\/[^"]+)"\)/g)) {
  const b64 = fs.readFileSync(path.join(R, m[1])).toString('base64');
  css = css.replace(m[0], `url("data:image/webp;base64,${b64}")`);
}

const corps = lire('index.html')
  .split('<body>')[1].split('</body>')[0]
  .split('\n').filter(l => !/<script src=/.test(l)).join('\n');

const page = [
  '<title>Yappy Cards</title>',
  '<link rel="preconnect" href="https://fonts.googleapis.com">',
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500&family=Instrument+Serif&display=swap">',
  '<style>', css, '</style>', corps,
  '<script>', lire('questions.js'), lire('app.js'), '</script>',
].join('\n');

const sortie = process.argv[2];
if (!sortie) { console.error('indiquer un fichier de sortie'); process.exit(1); }
fs.writeFileSync(sortie, page);
console.log('artifact :', (page.length / 1024).toFixed(0), 'Ko | image externe restante :', /url\("images\//.test(page));
