/* ============================================================
   Yappy Cards — les paquets de questions
   ------------------------------------------------------------
   Un paquet par mode. Pour ajouter une question, il suffit
   d'ajouter une ligne dans le tableau du bon paquet.

   Deux écritures possibles, mélangeables :

     "Une question toute simple."
     { theme: "Argent", text: "Une question avec son propre libellé." }

   Sans « theme », la carte affiche le nom de la catégorie.
   L'ordre n'a pas d'importance pour le jeu : chaque paquet est
   mélangé au chargement de la page. Il est tenu mélangé ici pour
   qu'on puisse relire le paquet sans lire dix questions d'affilée
   sur le même sujet.

   Les espaces fines avant ? ! : ; sont ajoutées automatiquement
   à l'affichage — inutile de s'en occuper ici.
   ============================================================ */

window.YAPPY_DECKS = {

  deep: {
    label: "Deep",
    tagline: "Pour aller là où on ne va pas d'habitude.",
    questions: [
      "Avec qui te sens-tu 100 % toi-même (ou presque) ?",
      "Quel est le plus gros mensonge que tu te racontes actuellement ?",
      "Quelle est ta mesure du succès ?",
      "Ton partenaire doit-il forcément bien s'entendre avec tes amis ?",
      "À quel moment de ta vie t'es-tu senti le plus perdu ?",
      "Est-ce que tu préférerais connaître ton futur ou pouvoir changer ton passé ?",
      "Que penses-tu du polyamour ?",
      "Quelle est ta dernière fierté ?",
      "Est-ce qu'il y a quelqu'un à qui tu dois encore des excuses ?",
      "De quoi tu as besoin pour te sentir en sécurité financière ?",
      "Quelle version passée de toi aurait le plus de mal à reconnaître qui tu es aujourd'hui ?",
      "Est-ce qu'il faut parfois être égoïste pour être heureux ?",
      "Est-ce qu'embrasser quelqu'un peut être plus intime que coucher avec ?",
      "Quelle est ta priorité actuelle ?",
      "Quel événement de ta vie t'a probablement construit plus que tu ne le réalises ?",
      "Oui ou non : s'associer à un ami ou à un membre de sa famille ?",
      "Est-ce que tu as davantage peur de mourir ou de ne pas avoir assez vécu ?",
      "Quand est-ce que tu te sens le plus seul ?",
      "Quelle est ta définition de la réussite ?",
      "Quel choix de vie as-tu fait principalement pour faire plaisir aux autres ?",
      "Quelle relation es-tu content d'avoir terminée ?",
      "Si demain tu gagnes 100 M, est-ce que tu continues ce que tu fais aujourd'hui ? Et sinon, que changerais-tu ?",
      "Une omission volontaire, c'est un mensonge ?",
      "Si tu devais avoir une conversation de 4 h en tête-à-tête avec une personne présente, qui choisirais-tu ?",
      "Qu'est-ce que tu ne comprends toujours pas à ce jour ?",
      "Est-ce que tu pourrais être avec quelqu'un qui gagne énormément moins que toi ? Et énormément plus ?",
      "Si un membre de ta famille est « nocif » pour toi, tu romps la relation, ou le lien du sang passe avant tout et tu la préserves coûte que coûte ?",
      "Crois-tu à l'amour d'une vie ?",
      "Si tu pouvais parler 10 minutes avec ton toi de 80 ans, quelle serait ta première question ?",
      "De quoi as-tu honte aujourd'hui ?",
      "Quelle est pour toi la différence entre le lien amical et le lien amoureux ?",
      "Quelle dépense regrettes-tu ?",
      "Est-ce que tu crois qu'on peut réellement changer pour quelqu'un ?",
      "Quel comportement chez toi tu sais être un red flag ?",
      "Si ta vie reste exactement comme aujourd'hui pendant 5 ans, est-ce que ça te va ?",
      "Quelle conversation aurais-tu aimé avoir avec quelqu'un avant qu'il ne sorte de ta vie ?",
      "Est-ce que tu crois à l'amitié homme-femme ?",
      "De qui attends-tu encore inconsciemment une validation ?",
      "Est-ce que tu attends de ton partenaire de vie que ce soit ton meilleur ami ?",
      "Quelle décision penses-tu avoir prise trop tard ?",
      "Dans les participants actuels que tu ne connais pas, avec qui as-tu eu un fit particulier ?",
      "Est-ce que sucer c'est tromper ?",
      "Est-ce que tu te sens compris par ton entourage ?",
      "Tu préfères être quitté ou devoir quitter quelqu'un ?",
      "Est-ce que tu préférerais savoir que ton partenaire fantasme sur quelqu'un que vous connaissez, ou ne jamais le savoir ?"
    ]
  },

  crousti: {
    label: "Crousti",
    tagline: "Là, on ne fait plus semblant.",
    questions: [
      "Ta pire expérience flirt ou dating ?",
      "Est-ce que tu pourrais regarder ton ou ta partenaire coucher avec quelqu'un d'autre ?",
      "Plutôt vanille ou… piment ?",
      "Tu préfères tromper une fois sans jamais être découvert, ou être trompé une fois sans jamais le savoir ?",
      "Pour ou contre l'ouverture du couple ?",
      "Quelle importance donnes-tu à la fréquence dans une relation ?",
      "Est-ce que le bodycount de quelqu'un peut changer le regard que tu portes sur lui ou elle ? Si oui, à partir de quand ?",
      "Pour ou contre continuer les plaisirs solitaires quand tu es en couple ?",
      "L'endroit le plus insolite où tu as ken ?",
      "Est-ce que tu as déjà flirté avec quelqu'un uniquement pour l'ego ?",
      "Pour ou contre les jeux de rôles ?",
      "Si tu étais célibataire, avec qui pourrais-tu coucher ici ?"
    ]
  }

};
