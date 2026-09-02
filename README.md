# Deep Talk — cartes à questions

Un paquet de cartes face cachée, pensé pour le mobile. On touche la pile, la
première carte se retourne, on lit la question, on écarte la carte, et on
repioche. Une carte tirée ne revient pas tant que la page n'est pas rechargée.

Pas de build, pas de dépendances : trois fichiers et un navigateur.

## Lancer le jeu

Ouvrir `index.html` dans un navigateur suffit. Pour tester sur un téléphone
depuis la même machine :

```bash
python3 -m http.server 8000
# puis, sur le téléphone : http://<ip-de-la-machine>:8000
```

## Ajouter des questions

Tout se passe dans `questions.js`. Deux écritures possibles, mélangeables :

```js
window.DEEP_TALK_QUESTIONS = [
  "Une question toute simple.",
  { theme: "Souvenirs", text: "Une question avec un thème affiché sur la carte." }
];
```

L'ordre du fichier n'a pas d'importance : le paquet est mélangé
(Fisher–Yates) à chaque chargement de la page.

## Les fichiers

| Fichier | Rôle |
| --- | --- |
| `index.html` | La structure : le paquet, la carte à deux faces, l'écran de fin. |
| `styles.css` | Le style et les animations (retournement 3D, épaisseur du paquet). |
| `app.js` | Le mélange, la pioche, les états de la carte. |
| `questions.js` | Les données — le seul fichier à toucher pour changer le contenu. |

## Comment ça marche

Le paquet est mélangé au chargement dans un tableau `pool`. Une seule carte
existe réellement dans le DOM : elle a une face « dos » et une face
« question ». Piocher remplit la face question puis retourne la carte
(`rotateY(180deg)`) ; fermer la fait sortir de l'écran, après quoi elle est
remise à zéro hors champ et redevient le dos du paquet. Les cartes empilées
derrière ne sont que des couches décoratives, qui disparaissent au fur et à
mesure pour montrer le paquet fondre.

Détails mobiles : plein écran en `100dvh`, `safe-area-inset` pour les encoches,
pas de scroll ni de zoom au double-tap, retour haptique léger (`navigator.vibrate`)
et respect de `prefers-reduced-motion`.
