/* ============================================================
   Yappy Cards — les paquets de questions
   ------------------------------------------------------------
   Un paquet par catégorie. Pour ajouter une question, il suffit
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

  warmup: {
    label: "Warm up",
    tagline: "On commence par le commencement.",
    questions: [
      "Quelle petite chose suffit presque toujours à te mettre de bonne humeur ?",
      "Quelle histoire te concernant tes proches adorent raconter ?",
      "Tu préfères être très doué dans un domaine que personne ne valorise, ou moyen dans un domaine très reconnu ?",
      "Sur quoi es-tu étonnamment difficile ?",
      "Quelle question aimerais-tu qu'on te pose plus souvent ?",
      "Quel moment récent t'a fait penser : « putain, j'aime bien ma vie » ?",
      "Tu préfères ne plus jamais voyager ou ne plus jamais pouvoir déménager ?",
      "Quelle habitude chez toi ferait rire quelqu'un qui vivrait avec toi ?",
      "Tu préfères envoyer un nude à la mauvaise personne, ou en recevoir un que tu n'avais absolument pas demandé ?",
      "Sur quoi as-tu changé d'avis récemment ?",
      "Qu'est-ce qui te fait te sentir unique ?",
      "Quel est ton petit kiff du moment ?",
      "Tu préfères coucher avec quelqu'un que tu détestes mais qui t'attire à fond, ou quelqu'un que tu adores mais qui ne t'attire pas du tout ?",
      "Quelle première impression les gens ont souvent de toi et qui est fausse ?",
      "Si tu pouvais enlever une seule contrainte de ta vie actuelle, laquelle ?"
    ]
  },

  deep: {
    label: "Deep",
    tagline: "Pour aller là où on ne va pas d'habitude.",
    questions: [
      "Avec qui te sens-tu 100 % toi-même (ou presque) ?",
      "Quel est le plus gros mensonge que tu te racontes actuellement ?",
      "Ton partenaire doit-il forcément bien s'entendre avec tes amis ?",
      "Si tu retirais ton métier, tes relations et tes accomplissements, qu'est-ce qui resterait de ton identité ?",
      "À quel moment de ta vie t'es-tu senti le plus perdu ?",
      "Est-ce que tu préférerais connaître ton futur ou pouvoir changer ton passé ?",
      "Que penses-tu du polyamour ?",
      "Quelle est ta dernière fierté ?",
      "Dans quelles situations as-tu tendance à devenir quelqu'un que tu aimes moins ?",
      "Qu'est-ce que tu veux que tes proches disent de toi quand tu n'es pas là ?",
      "Est-ce qu'il y a quelqu'un à qui tu dois encore des excuses ?",
      "De quoi tu as besoin pour te sentir en sécurité financière ?",
      "Quelle version passée de toi aurait le plus de mal à reconnaître qui tu es aujourd'hui ?",
      "Est-ce qu'il faut parfois être égoïste pour être heureux ?",
      "Quelle amitié t'a le plus fait évoluer ?",
      "Quelle est ta priorité actuelle ?",
      "Est-ce que tu crois qu'on peut vraiment changer, assez pour mériter une seconde chance ?",
      "Quel événement de ta vie t'a probablement construit plus que tu ne le réalises ?",
      "Quel ami connaît une version de toi que presque personne d'autre ne connaît ?",
      "As-tu déjà vraiment détesté quelqu'un ? Pourquoi ?",
      "Oui ou non : s'associer à un ami ou à un membre de sa famille ?",
      "Est-ce que tu as davantage peur de mourir ou de ne pas avoir assez vécu ?",
      "Quand est-ce que tu te sens le plus seul ?",
      "Quelle est ta définition de la réussite ?",
      "Quelle chose venant de ta famille aimerais-tu conserver toute ta vie ?",
      "Quel choix de vie as-tu fait principalement pour faire plaisir aux autres ?",
      "Quelle relation es-tu content d'avoir terminée ?",
      "Si demain tu gagnes 100 M, est-ce que tu continues ce que tu fais aujourd'hui ? Et sinon, que changerais-tu ?",
      "Une omission volontaire, c'est un mensonge ?",
      "C'est quoi le truc qui te semblait normal il y a quelques années et qu'aujourd'hui tu ne comprends pas ?",
      "Quel rôle as-tu naturellement pris dans ta famille ?",
      "Si tu devais avoir une conversation de 4 h en tête-à-tête avec une personne présente, qui choisirais-tu ?",
      "Qu'est-ce que tu ne comprends toujours pas à ce jour ?",
      "Quelles identités portes-tu encore sans réussir à t'en détacher ? Une identité, pas une casquette qu'on enlève.",
      "Est-ce que tu pourrais être avec quelqu'un qui gagne énormément moins que toi ? Et énormément plus ?",
      "Qu'est-ce que tu sacrifies aujourd'hui pour ton ambition ?",
      "Si un membre de ta famille est « nocif » pour toi, tu romps la relation, ou le lien du sang passe avant tout et tu la préserves coûte que coûte ?",
      "Crois-tu à l'amour d'une vie ?",
      "Qu'est-ce que le toi idéal a, que tu n'as pas encore ?",
      "Si tu pouvais parler 10 minutes avec ton toi de 80 ans, quelle serait ta première question ?",
      "De quoi as-tu honte aujourd'hui ?",
      "De qui aimerais-tu secrètement obtenir davantage de reconnaissance ?",
      "Quelle est pour toi la différence entre le lien amical et le lien amoureux ?",
      "Quelle dépense regrettes-tu ?",
      "Quelle peur influence ta vie alors que tu en parles rarement ?",
      "Quel comportement chez toi tu sais être un red flag ?",
      "Si ta vie reste exactement comme aujourd'hui pendant 5 ans, est-ce que ça te va ?",
      "Quelle conversation aurais-tu aimé avoir avec quelqu'un avant qu'il ne sorte de ta vie ?",
      "Est-ce que tu crois à l'amitié homme-femme ?",
      "Quelle opinion morale que tu avais très forte est devenue beaucoup plus nuancée avec l'âge ?",
      "Peut-on tout pardonner ?",
      "Est-ce que tu attends de ton partenaire de vie que ce soit ton meilleur ami ?",
      "Quelle décision penses-tu avoir prise trop tard ?",
      "Dans les participants actuels que tu ne connais pas, avec qui as-tu eu un fit particulier ?",
      "Quelle est la chose que tu refuses de devenir, même si elle te permettait de réussir davantage ?",
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
      "Qui ici t'a fait une mauvaise première impression, et finalement une bonne surprise ?",
      "Quel détail physique étonnamment précis peut te faire craquer ?",
      "Est-ce que tu pourrais regarder ton ou ta partenaire coucher avec quelqu'un d'autre ?",
      "Le plus grand écart d'âge que tu as eu au lit ?",
      "Tu préfères ne faire que des plans à 3 jusqu'à la fin de ta vie, ou ne plus jamais coucher ?",
      "Tu préfères qu'on ait accès à ton historique IA ou à ton historique porno ?",
      "Qui ici t'a fait la meilleure première impression ?",
      "Tu te considères plus vanille ou plus kinky que les gens présents ici ?",
      "Tu préfères tromper une fois sans jamais être découvert, ou être trompé une fois sans jamais le savoir ?",
      "Quelle importance réelle donnerais-tu au sexe dans la réussite d'un couple, sur 10 ?",
      "Pour ou contre l'ouverture du couple ?",
      "Tu préfères ne plus jamais coucher deux fois avec la même personne, ou n'en avoir qu'une seule jusqu'à la fin de ta vie ?",
      "Est-ce que sucer c'est tromper ?",
      "Tu as déjà envoyé un nude que tu regrettes ?",
      "Quelle importance donnes-tu à la fréquence dans une relation ?",
      "Qui ici a le plus de charme indépendamment du physique ?",
      "Est-ce que le bodycount de quelqu'un peut changer le regard que tu portes sur lui ou elle ? Si oui, à partir de quand ?",
      "L'endroit le plus insolite où tu as ken ?",
      "Est-ce que pour toi sucer est plus intime qu'une pénétration ?",
      "Quel kink te plairait probablement, mais que tu n'as jamais testé ?",
      "Tu préfères une vie sexuelle incroyable sans jamais tomber amoureux, ou un amour profond avec une vie sexuelle médiocre ?",
      "Sur un curseur de 1 à 10, 1 étant « homo » et 10 « hétéro », comment situerais-tu ton orientation sexuelle ?",
      "Est-ce que tu as déjà flirté avec quelqu'un uniquement pour l'ego ?",
      "Pour ou contre les jeux de rôles ?",
      "Avec combien de personnes présentes ici tu pourrais coucher ?"
    ]
  }

};
