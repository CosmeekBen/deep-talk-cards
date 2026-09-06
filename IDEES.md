# Idées à creuser

Ce que le jeu ne fait pas encore, et pourquoi ça vaudrait le coup.
Rien ici n'est décidé : c'est une liste d'intentions, pas un cahier des charges.

---

## 1. Un warm up — fait, à moitié

Livré comme **une troisième catégorie** : Warm up, bleue, à côté de Deep et
Crousti, servie au démarrage du jeu. Neuf cartes pour l'instant.

Reste la seconde lecture de l'idée, si elle manque à l'usage : un **échauffement
dans chaque catégorie**, servi d'office en début de partie puis basculant sur le
paquet normal, plutôt qu'un onglet qu'il faut penser à ouvrir. Plus dirigiste,
mais ça garantit que la partie démarre en douceur. Ça demanderait une notion de
phase dans `app.js` là où tout est mélangé aujourd'hui.

## 2. La carte retournée (« aller plus loin »)

**L'idée.** Chaque question porte une relance : une seconde question qui pousse
la même chose un cran plus loin. La réponse facile est donnée, la relance va
chercher ce qu'il y a dessous.

Exemple avec une carte existante :

> **Quelle est ta dernière fierté ?**
> → *Et pourquoi tu ne l'as dit à personne ?*

**Pourquoi ça tombe bien.** Le geste existe déjà. La carte se retourne une
première fois pour révéler la question ; elle peut se retourner une seconde
fois pour la relance. Le vocabulaire visuel est en place, il n'y a rien à
inventer — juste à décider qui déclenche le second retournement, et si la
relance est optionnelle (celui qui répond décide) ou imposée.

**Ce que ça coûte.** Côté code, peu : un champ `relance` dans les données, un
troisième état de carte, et le balayage qui devient « relance » avant de
devenir « suivante ». Côté contenu, c'est le vrai travail : 65 relances à
écrire, une par carte, et une relance ratée est pire que pas de relance.

**À trancher.** Est-ce que toutes les cartes en ont une, ou seulement
certaines ? Une relance sur trois cartes, bien écrite, vaut mieux que 65
tièdes.

---

## 3. Le reste, en vrac

- **Tirage stratifié** — garantir qu'on ne sorte pas deux questions du même
  thème d'affilée. Le mélange est aléatoire pur aujourd'hui. Plus urgent quand
  Crousti contenait six cartes désignant quelqu'un de présent ; il n'en reste
  que deux, donc c'est devenu un confort plutôt qu'un correctif.
- **Manifest PWA** — pour ajouter le jeu à l'écran d'accueil et l'ouvrir sans
  la barre du navigateur. Pour un jeu qu'on se passe à table, ça change le
  ressenti.
- **Les paquets sont déséquilibrés** — 9 en Warm up, 51 en Deep, 15 en Crousti.
- **Un quasi-doublon en Deep** — « Est-ce que tu crois qu'on peut réellement
  changer pour quelqu'un ? » et « Est-ce que tu crois qu'on peut vraiment
  changer, assez pour mériter une seconde chance ? » s'ouvrent pareil. Soit on
  en coupe une, soit on reformule la première.
