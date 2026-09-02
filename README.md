# Deep Talk — cartes à questions

Un paquet de cartes face cachée, pensé pour le mobile. On touche la pile, la
première carte se retourne, on lit la question, on écarte la carte, et on
repioche. Une carte tirée ne revient pas tant que la page n'est pas rechargée.

Deux modes, chacun avec son paquet, son ambiance et son propre avancement :
**Deep Talk** (nuit et laiton) et **Crousti** (cave à vin et braise). On bascule
de l'un à l'autre en cours de partie sans rien perdre — chaque pile garde les
cartes qui lui restent.

Pas de build, pas de dépendances : quatre fichiers et un navigateur.

## Lancer le jeu

Ouvrir `index.html` dans un navigateur suffit. Pour tester sur un téléphone
depuis la même machine :

```bash
python3 -m http.server 8000
# puis, sur le téléphone : http://<ip-de-la-machine>:8000
```

## Ajouter des questions

Tout se passe dans `questions.js`. Un paquet par mode :

```js
window.DEEP_TALK_DECKS = {
  deep: {
    label: "Deep Talk",
    tagline: "Pour aller là où on ne va pas d'habitude.",
    questions: [
      "Une question toute simple.",
      { theme: "Argent", text: "Une question avec son propre libellé." }
    ]
  },
  crousti: { label: "Crousti", tagline: "…", questions: [ /* … */ ] }
};
```

Sans `theme`, la carte affiche le nom du mode. L'ordre du fichier n'a pas
d'importance : chaque paquet est mélangé (Fisher–Yates) à chaque chargement.

Les espaces fines insécables avant `?` `!` `:` `;` et dans les guillemets sont
ajoutées à l'affichage — inutile de s'en occuper dans les données.

Pour ajouter un troisième mode : une entrée de plus dans `DEEP_TALK_DECKS`, un
bouton de plus dans le sélecteur de `index.html` (avec le bon `data-mode`), et
un bloc de couleurs `:root[data-mode="…"]` dans `styles.css`.

## Les fichiers

| Fichier | Rôle |
| --- | --- |
| `index.html` | La structure : paquet, carte à deux faces, écran de fin, sélecteur de mode. |
| `styles.css` | Le style, les deux palettes et les animations (retournement 3D, épaisseur du paquet). |
| `app.js` | Les paquets, le mélange, la pioche, les états de la carte. |
| `questions.js` | Les données — le seul fichier à toucher pour changer le contenu. |

## Comment ça marche

Chaque paquet est mélangé au chargement dans son propre tableau `pool`. Une
seule carte existe réellement dans le DOM : elle a une face « dos » et une face
« question ». Piocher remplit la face question puis retourne la carte
(`rotateY(180deg)`) ; fermer la fait sortir de l'écran, après quoi elle est
remise à zéro hors champ et redevient le dos du paquet. Les cartes empilées
derrière ne sont que des couches décoratives, qui disparaissent au fur et à
mesure pour montrer le paquet fondre.

L'avancement se lit à trois endroits : le compteur `restantes / total`, la barre
sous l'en-tête, et l'épaisseur de la pile. Le sélecteur de mode est verrouillé
tant qu'une carte est retournée — on ne change pas de paquet au milieu d'une
question.

Détails mobiles : plein écran en `100dvh`, `safe-area-inset` pour les encoches,
carte bornée par la hauteur réellement disponible (`cqh`) pour ne jamais déborder,
pas de scroll ni de zoom au double-tap, retour haptique léger (`navigator.vibrate`),
couleur de la barre système suivant le mode, et respect de `prefers-reduced-motion`.
