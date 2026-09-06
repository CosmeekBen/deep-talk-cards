/* ============================================================
   Yappy Cards — logique des paquets
   Deux modes, deux piles indépendantes. On pioche, on lit,
   on écarte. Une carte tirée ne revient pas avant un
   rechargement de la page (ou un remélange explicite).
   ============================================================ */

(function () {
  'use strict';

  /* Doit rester aligné avec --lift dans styles.css */
  var LEAVE_MS = 430;
  /* Au-delà, la question passe en petit corps pour tenir sur la carte */
  var LONG_QUESTION = 95;
  /* Balayage : à partir de quel déplacement, ou de quelle vitesse, la carte part */
  var SWIPE_PART = 0.26;   /* fraction de la largeur de carte */
  var SWIPE_FLICK = 0.55;  /* px/ms, pour un geste bref mais franc */
  var SWIPE_PRISE = 8;     /* px avant de considérer que c'est un balayage */

  var root       = document.documentElement;
  var deckEl     = document.getElementById('deck');
  var cardWrap   = document.getElementById('cardWrap');
  var card       = document.getElementById('card');
  var drawBtn    = document.getElementById('drawBtn');
  var nextBtn    = document.getElementById('nextBtn');
  var eyebrowEl  = document.getElementById('eyebrow');
  var sigilEl    = document.getElementById('sigil');
  var questionEl = document.getElementById('question');
  var counterEl  = document.getElementById('counter');
  var fillEl     = document.getElementById('progressFill');
  var progressEl = document.getElementById('progress');
  var taglineEl  = document.getElementById('tagline');
  var endscreen  = document.getElementById('endscreen');
  var endTextEl  = document.getElementById('endText');
  var restartBtn = document.getElementById('restartBtn');
  var swapBtn    = document.getElementById('swapBtn');
  var modesEl    = document.getElementById('modes');
  var modeBtns   = Array.prototype.slice.call(modesEl.querySelectorAll('.mode-btn'));
  var layers     = Array.prototype.slice.call(deckEl.querySelectorAll('.deck__layer'));
  var themeMeta  = document.querySelector('meta[name="theme-color"]');

  var order = [];     // clés des modes, dans l'ordre des onglets
  var decks = {};     // { clé: { label, tagline, pool, total } }
  var mode  = null;   // mode affiché
  var state = 'idle'; // idle | revealed | animating | empty
  var geste = null;   // balayage en cours
  var tirages = 0;    // pour ne montrer l'astuce qu'à la première carte

  /* ---------- Données ---------- */

  function normalize(list) {
    return (list || []).map(function (item) {
      if (typeof item === 'string') return { text: item, theme: '' };
      return { text: item.text || '', theme: item.theme || '' };
    }).filter(function (item) { return item.text; });
  }

  function shuffle(list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* Ponctuation française : espace fine insécable avant ? ! ; : et
     dans les guillemets. Le fichier de questions reste ainsi simple
     à éditer, la mise en forme se fait à l'affichage. */
  function typo(text) {
    var FINE = '\u202F'; // espace fine insécable, invisible dans le source
    return text
      .replace(/\s+([?!;:%»])/g, FINE + '$1')
      .replace(/(«)\s+/g, '$1' + FINE);
  }

  /* ---------- Constellations ----------
     Chaque question porte sa propre figure, dérivée de son texte : la même
     question donne toujours la même, deux questions différentes en donnent
     deux différentes. Même vocabulaire que l'emblème du dos — un cercle,
     des points, des liens. Les sommets sont pris dans l'ordre du cercle,
     ce qui donne toujours un polygone convexe, jamais de figure emmêlée. */

  function hashText(text) {
    var h = 2166136261;
    for (var i = 0; i < text.length; i++) {
      h ^= text.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function sigil(seed) {
    var N = 16, RING = 21, R = 13.5, C = 24;
    var s = seed || 1;
    function next() { s = (Math.imul(s, 1103515245) + 12345) >>> 0; return s / 4294967296; }
    function round(v) { return Math.round(v * 100) / 100; }

    var k = 2 + Math.floor(next() * 4); // de 2 à 5 sommets
    var nodes = [Math.floor(next() * N)];
    for (var tries = 0; nodes.length < k && tries < 400; tries++) {
      var p = Math.floor(next() * N);
      var libre = nodes.every(function (q) {
        var d = Math.abs(p - q);
        return Math.min(d, N - d) >= 2; // jamais deux sommets collés
      });
      if (libre) nodes.push(p);
    }
    nodes.sort(function (a, b) { return a - b; });

    var pts = nodes.map(function (i) {
      var a = (i / N) * Math.PI * 2 - Math.PI / 2;
      return [round(C + Math.cos(a) * R), round(C + Math.sin(a) * R)];
    });

    var trait = pts.map(function (pt, i) { return (i ? 'L' : 'M') + pt[0] + ' ' + pt[1]; }).join(' ');
    if (pts.length > 2) trait += ' Z';

    var points = pts.map(function (pt, i) {
      return '<circle cx="' + pt[0] + '" cy="' + pt[1] + '" r="' + (i ? 1.6 : 2.4) +
             '" fill="currentColor" stroke="none"/>';
    }).join('');

    return '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1" ' +
           'stroke-linejoin="round" stroke-linecap="round">' +
           '<circle cx="' + C + '" cy="' + C + '" r="' + RING + '" opacity=".3"/>' +
           '<path d="' + trait + '" opacity=".8"/>' + points + '</svg>';
  }

  function deck() { return decks[mode]; }

  /* Les autres paquets qui ont encore des cartes, dans l'ordre des onglets
     à partir du paquet courant. Vaut pour deux catégories comme pour dix. */
  function autresFournis() {
    var depart = order.indexOf(mode);
    var suite = [];
    for (var n = 1; n < order.length; n++) {
      var cle = order[(depart + n) % order.length];
      if (decks[cle] && decks[cle].pool.length) suite.push(cle);
    }
    return suite;
  }

  function enumerer(liste) {
    if (liste.length < 2) return liste[0] || '';
    return liste.slice(0, -1).join(', ') + ' et ' + liste[liste.length - 1];
  }

  /* ---------- Rendu ---------- */

  function plural(n) { return n + (n > 1 ? ' cartes' : ' carte'); }

  function render() {
    var d = deck();

    counterEl.textContent = d.pool.length + ' / ' + d.total;
    progressEl.setAttribute('aria-label',
      (d.total - d.pool.length) + ' cartes sur ' + d.total + ' déjà piochées');
    fillEl.style.setProperty('--p', d.total ? (d.total - d.pool.length) / d.total : 0);

    // L'épaisseur visible du paquet fond au fur et à mesure.
    layers.forEach(function (layer, index) {
      layer.classList.toggle('is-hidden', d.pool.length <= index + 1);
    });

    modeBtns.forEach(function (btn, index) {
      var on = btn.dataset.mode === mode;
      btn.classList.toggle('is-on', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
      if (on) modesEl.style.setProperty('--i', index);
    });
  }

  function setTagline(text) {
    taglineEl.classList.add('is-dim');
    setTimeout(function () {
      taglineEl.textContent = text;
      taglineEl.classList.remove('is-dim');
    }, 220);
  }

  function lockModes(locked) {
    modesEl.classList.toggle('is-locked', locked);
    modeBtns.forEach(function (btn) { btn.disabled = locked; });
  }

  function buzz(ms) {
    if (navigator.vibrate) { try { navigator.vibrate(ms); } catch (e) {} }
  }

  /* ---------- Actions ---------- */

  function draw() {
    if (state !== 'idle') return;
    var d = deck();
    if (!d.pool.length) { showEnd(); return; }

    var item = d.pool.pop();
    sigilEl.innerHTML = item.sigil;
    eyebrowEl.textContent = item.theme || d.label;
    questionEl.textContent = typo(item.text);
    questionEl.classList.toggle('is-long', item.text.length > LONG_QUESTION);

    state = 'revealed';
    cardWrap.classList.add('is-active');
    card.classList.add('is-flipped');
    drawBtn.setAttribute('aria-hidden', 'true');
    drawBtn.tabIndex = -1;
    lockModes(true);

    tirages++;
    if (tirages === 1) setTagline('Balayez la carte sur le côté, ou touchez le bouton.');

    render();
    buzz(12);
  }

  /* sens : -1 balayée à gauche, 1 à droite, 0 fermée par le bouton (sortie par le haut) */
  function close(sens) {
    if (state !== 'revealed') return;
    state = 'animating';

    if (sens) {
      cardWrap.style.setProperty('--out-x', (sens * 135) + '%');
      cardWrap.style.setProperty('--out-y', '-4%');
      cardWrap.style.setProperty('--out-r', (sens * 16) + 'deg');
    } else {
      cardWrap.style.removeProperty('--out-x');
      cardWrap.style.removeProperty('--out-y');
      cardWrap.style.removeProperty('--out-r');
    }

    cardWrap.classList.remove('is-dragging');
    cardWrap.classList.add('is-leaving');
    buzz(8);

    setTimeout(function () {
      // Remise à zéro instantanée, hors champ, sans animation visible.
      cardWrap.classList.add('no-anim');
      cardWrap.classList.remove('is-leaving', 'is-active');
      card.classList.remove('is-flipped');
      poserCarte();
      void cardWrap.offsetWidth; // force le reflow
      cardWrap.classList.remove('no-anim');

      drawBtn.removeAttribute('aria-hidden');
      drawBtn.tabIndex = 0;
      lockModes(false);

      if (tirages === 1) setTagline(deck().tagline);
      if (!deck().pool.length) showEnd();
      else state = 'idle';
    }, LEAVE_MS);
  }

  function showEnd() {
    var d = deck();
    var suite = autresFournis();

    state = 'empty';
    deckEl.classList.add('is-gone');

    // « 51 cartes en Deep et 15 en Crousti » : le mot ne sert qu'une fois
    var reste = suite.map(function (cle, i) {
      var n = decks[cle].pool.length;
      return (i ? n : plural(n)) + ' en ' + decks[cle].label;
    });

    endTextEl.textContent = 'Les ' + d.total + ' cartes du paquet ' + d.label +
      ' sont passées.' + (reste.length ? ' Il reste ' + enumerer(reste) + '.' : '');

    swapBtn.hidden = !suite.length;
    if (suite.length) swapBtn.textContent = 'Passer en ' + decks[suite[0]].label;

    endscreen.hidden = false;
    render();
  }

  function resetCard() {
    cardWrap.classList.add('no-anim');
    cardWrap.classList.remove('is-leaving', 'is-active', 'is-dragging');
    card.classList.remove('is-flipped');
    poserCarte();
    void cardWrap.offsetWidth;
    cardWrap.classList.remove('no-anim');
    drawBtn.removeAttribute('aria-hidden');
    drawBtn.tabIndex = 0;
  }

  function setMode(key, announce) {
    if (!decks[key] || state === 'revealed' || state === 'animating') return;

    mode = key;
    root.setAttribute('data-mode', key);
    resetCard();

    if (deck().pool.length) {
      endscreen.hidden = true;
      deckEl.classList.remove('is-gone');
      state = 'idle';
      render();
      if (announce) setTagline(deck().tagline);
      else taglineEl.textContent = deck().tagline;
    } else {
      showEnd();
    }

    if (themeMeta) {
      themeMeta.content = getComputedStyle(document.body).backgroundColor;
    }
  }

  function reshuffle() {
    var d = deck();
    d.pool = shuffle(d.source);
    endscreen.hidden = true;
    deckEl.classList.remove('is-gone');
    resetCard();
    state = d.pool.length ? 'idle' : 'empty';
    render();
    setTagline('Nouveau mélange. ' + plural(d.total) + '.');
  }

  /* ---------- Démarrage ---------- */

  function start() {
    var source = window.YAPPY_DECKS || {};

    order = modeBtns.map(function (btn) { return btn.dataset.mode; })
                    .filter(function (key) { return source[key]; });

    /* Les figures sont attribuées une fois pour toutes, ici plutôt qu'au
       tirage. Le hachage du texte suffit presque toujours à les séparer,
       mais sur 85 cartes une collision finit par arriver (paradoxe des
       anniversaires) : on décale alors la graine jusqu'à une figure libre.
       Deux cartes ne partagent donc jamais la leur, toutes catégories
       confondues. En contrepartie, ajouter une question peut déplacer la
       figure de celle qui la percutait — jamais celle des autres. */
    var figures = {};

    order.forEach(function (key) {
      var raw = normalize(source[key].questions);

      raw.forEach(function (item) {
        var graine = hashText(item.text);
        var dessin = sigil(graine);
        while (figures[dessin]) dessin = sigil(++graine);
        figures[dessin] = true;
        item.sigil = dessin;
      });

      decks[key] = {
        label: source[key].label || key,
        tagline: source[key].tagline || '',
        source: raw,
        pool: shuffle(raw),
        total: raw.length
      };
    });

    if (!order.length) return;
    modesEl.style.setProperty('--n', order.length);
    setMode(order[0], false);
  }

  /* ---------- Balayage ----------
     La carte suit le doigt, puis part de son côté si le geste est assez
     ample ou assez vif. En dessous, elle revient se poser. Le bouton reste
     le chemin visible ; le balayage est le raccourci. */

  function poserCarte() {
    cardWrap.style.setProperty('--dx', '0px');
    cardWrap.style.setProperty('--dr', '0deg');
    cardWrap.style.setProperty('--fade', '1');
  }

  function suivreDoigt(dx, largeur) {
    cardWrap.style.setProperty('--dx', Math.round(dx) + 'px');
    cardWrap.style.setProperty('--dr', ((dx / largeur) * 11).toFixed(2) + 'deg');
    cardWrap.style.setProperty('--fade', (1 - Math.min(Math.abs(dx) / largeur, 1) * 0.35).toFixed(3));
  }

  cardWrap.addEventListener('pointerdown', function (e) {
    if (state !== 'revealed' || geste) return;
    if (e.target.closest && e.target.closest('.next-btn')) return; // le bouton garde son clic
    geste = { id: e.pointerId, x0: e.clientX, y0: e.clientY, dx: 0, t0: Date.now(), pris: false };
  });

  cardWrap.addEventListener('pointermove', function (e) {
    if (!geste || e.pointerId !== geste.id) return;
    var dx = e.clientX - geste.x0;
    var dy = e.clientY - geste.y0;

    if (!geste.pris) {
      // on n'attrape le geste qu'une fois qu'il est franchement horizontal
      if (Math.abs(dx) < SWIPE_PRISE || Math.abs(dx) < Math.abs(dy)) return;
      geste.pris = true;
      cardWrap.classList.add('is-dragging');
      try { cardWrap.setPointerCapture(e.pointerId); } catch (err) {}
    }

    geste.dx = dx;
    suivreDoigt(dx, cardWrap.offsetWidth || 1);
  });

  function relacher(e) {
    if (!geste || (e && e.pointerId !== geste.id)) return;
    var pris = geste.pris, dx = geste.dx, duree = Date.now() - geste.t0;
    geste = null;
    cardWrap.classList.remove('is-dragging');
    if (!pris) return;

    var largeur = cardWrap.offsetWidth || 1;
    var vitesse = Math.abs(dx) / Math.max(duree, 1);

    if (Math.abs(dx) > largeur * SWIPE_PART || vitesse > SWIPE_FLICK) {
      close(dx < 0 ? -1 : 1);
    } else {
      poserCarte(); // pas assez : la carte se repose
    }
  }

  cardWrap.addEventListener('pointerup', relacher);
  cardWrap.addEventListener('pointercancel', relacher);

  /* ---------- Branchements ---------- */

  drawBtn.addEventListener('click', draw);
  nextBtn.addEventListener('click', function () { close(0); });
  restartBtn.addEventListener('click', reshuffle);
  swapBtn.addEventListener('click', function () {
    var suite = autresFournis();
    if (suite.length) setMode(suite[0], true);
  });

  modeBtns.forEach(function (btn) {
    btn.addEventListener('click', function () { setMode(btn.dataset.mode, true); });
  });

  start();
})();
