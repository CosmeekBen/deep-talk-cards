/* ============================================================
   Deep Talk — les paquets de questions
   ------------------------------------------------------------
   Un paquet par mode. Pour ajouter une question, il suffit
   d'ajouter une ligne dans le tableau du bon paquet.

   Deux écritures possibles, mélangeables :

     "Une question toute simple."
     { theme: "Argent", text: "Une question avec son propre libellé." }

   Sans « theme », la carte affiche le nom du mode.
   L'ordre n'a pas d'importance : chaque paquet est mélangé
   au chargement de la page.

   Les espaces fines avant ? ! : ; sont ajoutées automatiquement
   à l'affichage — inutile de s'en occuper ici.
   ============================================================ */

window.DEEP_TALK_DECKS = {

  deep: {
    label: "Deep Talk",
    tagline: "Pour aller là où on ne va pas d'habitude.",
    questions: [
      "Avec qui te sens-tu 100 % toi-même (ou presque) ?",
      "Quelle est ta dernière fierté ?",
      "Quelle est ta priorité actuelle ?",
      "De quoi as-tu honte aujourd'hui ?",
      "Qu'est-ce que tu ne comprends toujours pas à ce jour ?",
      "Dans les participants actuels que tu ne connais pas, avec qui as-tu eu un fit particulier ?",
      "Quel comportement chez toi tu sais être un red flag ?",
      "À quel moment de ta vie t'es-tu senti le plus perdu ?",
      "Quelle version passée de toi aurait le plus de mal à reconnaître qui tu es aujourd'hui ?",
      "Quand est-ce que tu te sens le plus seul ?",
      "Tu préfères être quitté ou devoir quitter quelqu'un ?",
      "Si tu devais avoir une conversation de 4 h en tête-à-tête avec une personne présente, qui choisirais-tu ?",
      "De qui attends-tu encore inconsciemment une validation ?",
      "Si ta vie reste exactement comme aujourd'hui pendant 5 ans, est-ce que ça te va ?",
      "Est-ce qu'embrasser quelqu'un peut être plus intime que coucher avec ?",
      "Est-ce que tu préférerais savoir que ton partenaire fantasme sur quelqu'un que vous connaissez, ou ne jamais le savoir ?",
      "Quelle relation es-tu content d'avoir terminée ?",
      "Est-ce que tu crois à l'amitié homme-femme ?",
      "Que penses-tu du polyamour ?",
      "Crois-tu à l'amour d'une vie ?",
      "Est-ce que sucer c'est tromper ?",
      "Oui ou non : s'associer à un ami ou à un membre de sa famille ?",
      "Si un membre de ta famille est « nocif » pour toi, tu romps la relation, ou le lien du sang passe avant tout et tu la préserves coûte que coûte ?",
      "Est-ce que tu te sens compris par ton entourage ?",
      "Quelle est ta mesure du succès ?",
      "Quelle est ta définition de la réussite ?",
      "Quelle décision penses-tu avoir prise trop tard ?",
      "Quelle est pour toi la différence entre le lien amical et le lien amoureux ?",
      "De quoi tu as besoin pour te sentir en sécurité financière ?",
      "Quelle dépense regrettes-tu ?",
      "Si demain tu gagnes 100 M, est-ce que tu continues ce que tu fais aujourd'hui ? Et sinon, que changerais-tu ?",
      "Est-ce que tu attends de ton partenaire de vie que ce soit ton meilleur ami ?"
    ]
  },

  crousti: {
    label: "Crousti",
    tagline: "Là, on ne fait plus semblant.",
    questions: [
      "Ta pire expérience flirt ou dating ?",
      "Pour ou contre continuer les plaisirs solitaires quand tu es en couple ?",
      "Si tu étais célibataire, avec qui pourrais-tu coucher ici ?",
      "Pour ou contre l'ouverture du couple ?",
      "L'endroit le plus insolite où tu as ken ?",
      "Plutôt vanille ou… piment ?",
      "Pour ou contre les jeux de rôles ?",
      "Quelle importance donnes-tu à la fréquence dans une relation ?"
    ]
  }

};
