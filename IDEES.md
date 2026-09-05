# Idées à creuser

Ce que le jeu ne fait pas encore, et pourquoi ça vaudrait le coup.
Rien ici n'est décidé : c'est une liste d'intentions, pas un cahier des charges.

---

## 1. Un warm up

**Le problème.** On ouvre le jeu, on tombe sur « De quoi as-tu honte
aujourd'hui ? » et la table se fige. Les paquets actuels attaquent fort dès la
première carte, alors qu'une conversation a besoin de quelques minutes pour se
mettre en route — surtout quand les gens ne se connaissent pas tous.

**L'idée.** Des questions plus simples pour ouvrir, avant de basculer sur du
lourd.

**À trancher avant de coder** — deux lectures possibles de la demande :

- **Une troisième catégorie « Warm up »**, à côté de Deep et Crousti. Trois
  onglets, trois paquets, on choisit son entrée. Simple, cohérent avec ce qui
  existe, mais rien n'oblige à commencer par là.
- **Un échauffement dans chaque catégorie** : un warm up Deep et un warm up
  Crousti, servis d'office en début de partie, puis on passe au paquet normal.
  Plus dirigiste, plus proche de l'intention (« au début »), mais ça demande
  une notion d'ordre là où tout est mélangé aujourd'hui.

Les deux se tiennent. La seconde répond mieux au besoin réel — que la partie
démarre en douceur sans qu'on ait à y penser — mais elle change la règle du
paquet unique et mélangé.

**Ce que ça coûte techniquement.** La première : une entrée de plus dans
`YAPPY_DECKS`, un bouton dans le sélecteur, un bloc de jetons de couleur. Une
demi-heure. La seconde : une notion de phase dans `app.js` (échauffement →
cœur), un seuil de bascule, et de quoi le dire à l'écran.

---

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
  thème d'affilée. Le mélange est aléatoire pur aujourd'hui : sur 51 cartes, il
  peut sortir trois questions sur l'argent à la suite. Demande de taguer les
  questions par thème.
- **Manifest PWA** — pour ajouter le jeu à l'écran d'accueil et l'ouvrir sans
  la barre du navigateur. Pour un jeu qu'on se passe à table, ça change le
  ressenti.
- **Crousti est court** — 14 cartes contre 51 en Deep. Le paquet s'épuise vite.
- **Un quasi-doublon en Deep** — « Est-ce que tu crois qu'on peut réellement
  changer pour quelqu'un ? » et « Est-ce que tu crois qu'on peut vraiment
  changer, assez pour mériter une seconde chance ? » s'ouvrent pareil. Soit on
  en coupe une, soit on reformule la première.
