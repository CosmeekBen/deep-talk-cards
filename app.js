/* ============================================================
   Deep Talk — logique du paquet
   Une pile mélangée. On pioche, on lit, on écarte.
   Une carte piochée ne revient pas avant un rechargement
   de la page (ou un remélange explicite).
   ============================================================ */

(function () {
  'use strict';

  /* Doit rester aligné avec --lift / --flip dans styles.css */
  var LEAVE_MS = 430;

  var deck      = document.getElementById('deck');
  var cardWrap  = document.getElementById('cardWrap');
  var card      = document.getElementById('card');
  var drawBtn   = document.getElementById('drawBtn');
  var nextBtn   = document.getElementById('nextBtn');
  var themeEl   = document.getElementById('theme');
  var questionEl= document.getElementById('question');
  var counterEl = document.getElementById('counter');
  var footHint  = document.getElementById('footHint');
  var endscreen = document.getElementById('endscreen');
  var restartBtn= document.getElementById('restartBtn');
  var layers    = Array.prototype.slice.call(deck.querySelectorAll('.deck__layer'));

  var pool = [];      // cartes encore dans le paquet, déjà mélangées
  var total = 0;
  var state = 'idle'; // idle | revealed | animating | empty

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

  /* ---------- Rendu ---------- */

  function updateCounter() {
    counterEl.textContent = pool.length === 0
      ? 'paquet vide'
      : pool.length + (pool.length > 1 ? ' cartes' : ' carte');
  }

  function updateLayers() {
    // L'épaisseur visible du paquet fond au fur et à mesure.
    layers.forEach(function (layer, index) {
      layer.classList.toggle('is-hidden', pool.length <= index + 1);
    });
  }

  function setHint(text) {
    footHint.classList.add('is-dim');
    setTimeout(function () {
      footHint.textContent = text;
      footHint.classList.remove('is-dim');
    }, 220);
  }

  function buzz(ms) {
    if (navigator.vibrate) { try { navigator.vibrate(ms); } catch (e) {} }
  }

  /* ---------- Actions ---------- */

  function draw() {
    if (state !== 'idle') return;
    if (!pool.length) { showEnd(); return; }

    var item = pool.pop();
    themeEl.textContent = item.theme;
    themeEl.style.visibility = item.theme ? 'visible' : 'hidden';
    questionEl.textContent = item.text;

    state = 'revealed';
    cardWrap.classList.add('is-active');
    card.classList.add('is-flipped');
    drawBtn.setAttribute('aria-hidden', 'true');
    drawBtn.tabIndex = -1;

    updateCounter();
    updateLayers();
    setHint('Une question à la fois. Prenez le temps.');
    buzz(12);
  }

  function close() {
    if (state !== 'revealed') return;
    state = 'animating';
    cardWrap.classList.add('is-leaving');
    buzz(8);

    setTimeout(function () {
      // Remise à zéro instantanée, hors champ, sans animation visible.
      cardWrap.classList.add('no-anim');
      cardWrap.classList.remove('is-leaving', 'is-active');
      card.classList.remove('is-flipped');
      void cardWrap.offsetWidth; // force le reflow
      cardWrap.classList.remove('no-anim');

      drawBtn.removeAttribute('aria-hidden');
      drawBtn.tabIndex = 0;

      if (!pool.length) {
        showEnd();
      } else {
        state = 'idle';
      }
    }, LEAVE_MS);
  }

  function showEnd() {
    state = 'empty';
    deck.classList.add('is-gone');
    endscreen.hidden = false;
    updateCounter();
    setHint('Merci pour la conversation.');
  }

  function start() {
    pool = shuffle(normalize(window.DEEP_TALK_QUESTIONS));
    total = pool.length;

    endscreen.hidden = true;
    deck.classList.remove('is-gone');
    cardWrap.classList.remove('is-leaving', 'is-active');
    card.classList.remove('is-flipped');

    state = total ? 'idle' : 'empty';
    if (!total) showEnd();

    updateCounter();
    updateLayers();
  }

  /* ---------- Branchements ---------- */

  drawBtn.addEventListener('click', draw);
  nextBtn.addEventListener('click', close);
  restartBtn.addEventListener('click', function () {
    start();
    setHint('Nouveau mélange. ' + total + ' cartes.');
  });

  start();
})();
