import type { Locale } from "./config";

export type Dictionary = {
  nav: { home: string; cv: string; blog: string; contact: string };
  tooltip: { socials: string; less: string; theme: string; language: string };
  hero: { greeting: string; availability: string; availabilityHint: string };
  sections: {
    about: string;
    certifications: string;
    nonProfit: string;
    work: string;
    education: string;
    skills: string;
  };
  work: { present: string };
  projects: { badge: string; heading: string; subtitle: string };
  contact: {
    handLabel: string;
    heading: string;
    intro: string;
    ctaEyebrow: string;
    ctaHeading: string;
    ctaText: string;
    ctaShort: string;
    bookCall: string;
    emailEyebrow: string;
    sendEmail: string;
    copy: string;
    copied: string;
    socialsHeading: string;
    replyTime: string;
  };
  newsletter: {
    heading: string;
    text: string;
    label: string;
    placeholder: string;
    subscribe: string;
    subscribing: string;
    /** Boarding captions shown while subscribing, in order. */
    steps: [string, string, string];
    successText: string;
    /** Shown to returning subscribers (flag already in storage). */
    alreadyText: string;
    error: string;
    close: string;
  };
  landing: {
    agentSub: string;
    kbSub: string;
    mcpSub: string;
    crmSub: string;
    legendPage: string;
    legendDialog: string;
    legendExternal: string;
    repos: string;
    contributions: string;
    languages: string;
    since: string;
    githubActivity: string;
    recentRepos: string;
    viewProfile: string;
    contactTitle: string;
    contactText: string;
    online: string;
    openCv: string;
    tools: string;
    kindOss: string;
    kindOwn: string;
    kindClient: string;
    seeProjects: string;
    posts: string;
    showAll: string;
    open: string;
    external: string;
    email: string;
    callLength: string;
    overview: string;
    tabProducts: string;
    tabBlog: string;
    shelfAbout: string;
    shelfAboutSub: string;
    shelfCases: string;
    shelfCasesSub: string;
    shelfItch: string;
    shelfItchSub: string;
    comingSoon: string;
    scrollPrev: string;
    scrollNext: string;
    letsTalk: string;
    founder: string;
    productsSub: string;
    offers: string;
    ways: string;
    copy: string;
    copied: string;
    tagProduct: string;
    tagHire: string;
    tagPage: string;
    tagDialog: string;
    run: string;
    pause: string;
    contactForm: string;
    writeEmail: string;
    pickSlot: string;
    productGroup: string;
    hireGroup: string;
    live: string;
    available: string;
    offersRow: string;
    products2: string;
    introCall: string;
    channels: string;
  };
  blog: {
    title: string;
    postsSuffix: string;
    subtitle: string;
    previous: string;
    next: string;
    page: string;
    of: string;
    empty: string;
    backToBlog: string;
    metaDescription: string;
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    nav: { home: "Home", cv: "CV", blog: "Blog", contact: "Contact" },
    tooltip: {
      socials: "Socials",
      less: "Less",
      theme: "Theme",
      language: "Language",
    },
    hero: {
      greeting: "Hi, I'm",
      availability: "Available for AI coaching & builds",
      availabilityHint:
        "Coaching people and teams on AI, and building custom AI apps. Free 30-minute call, no pitch.",
    },
    sections: {
      about: "About",
      certifications: "Certifications",
      nonProfit: "Non-Profit Work",
      work: "Work Experience",
      education: "Education",
      skills: "Skills",
    },
    work: { present: "Present" },
    projects: {
      badge: "Selected Work",
      heading: "Things I've built",
      subtitle:
        "AI agents, SaaS platforms and web apps — shipped end to end. A few of the builds I'm happiest with.",
    },
    contact: {
      handLabel: "Let's talk",
      heading: "Let's put AI to work for you",
      intro:
        "I'm currently taking on new work — coaching you or your team on using AI day to day, finding where it actually pays off, or building the custom AI app behind it. Tell me what you're working on and I'll tell you straight whether I'm the right person for it.",
      ctaEyebrow: "The fastest way",
      ctaHeading: "Grab a coffee chat",
      ctaText:
        "A free 30-minute call — no pitch, no pressure. Just pick a slot that works for you and we'll take it from there.",
      ctaShort: "Free 30-minute call, no pitch.",
      bookCall: "Book a call",
      emailEyebrow: "Prefer to write?",
      sendEmail: "Send an email",
      copy: "Copy",
      copied: "Copied",
      socialsHeading: "Find me elsewhere",
      replyTime: "Usually replies within a day",
    },
    newsletter: {
      heading: "The ship will sail soon…",
      text: "You don't want to be left behind on the latest developments in tech…",
      label: "Email address",
      placeholder: "you@example.com",
      subscribe: "Subscribe",
      subscribing: "Subscribing…",
      steps: ["Checking your ticket…", "Crossing the gangway…", "Stepping aboard…"],
      successText: "You're saved from sinking in the AI informational nonsense! Welcome to the premium experience.",
      alreadyText: "You're aboard the lifeboat…",
      error: "That didn't go through. Check your email address and try again.",
      close: "Close",
    },
    landing: {
      agentSub: "Fares Aouani",
      kbSub: "Blog",
      mcpSub: "Tools I've built",
      crmSub: "Contact me",
      legendPage: "Page",
      legendDialog: "Dialog",
      legendExternal: "External",
      repos: "repos",
      contributions: "contributions in 12 months",
      languages: "languages",
      since: "on GitHub since",
      githubActivity: "Activity, last 12 months",
      recentRepos: "Recently pushed",
      viewProfile: "View profile on GitHub",
      contactTitle: "Let's talk",
      contactText: "Book a call, write me, or get the newsletter.",
      online: "Online",
      openCv: "Open CV",
      tools: "tools",
      kindOss: "Open source",
      kindOwn: "Own company",
      kindClient: "Client work",
      seeProjects: "See all projects",
      posts: "posts",
      showAll: "Show all",
      open: "Open",
      external: "External",
      email: "Email",
      callLength: "30 min",
      overview: "Overview",
      tabProducts: "Products", tabBlog: "Blog", shelfAbout: "About me", shelfAboutSub: "Who I am and how I work", shelfCases: "Case studies", shelfCasesSub: "Learnings from my career", shelfItch: "Scratch your own itch", shelfItchSub: "Tools I built for my own problems", comingSoon: "Coming soon", scrollPrev: "Scroll left", scrollNext: "Scroll right",
      letsTalk: "Let's talk",
      founder: "Founder",
      productsSub: "Web · SEO · Hire",
      offers: "offers",
      ways: "ways",
      copy: "Copy",
      copied: "Copied ✓",
      tagProduct: "Product",
      tagHire: "Hire",
      tagPage: "Page",
      tagDialog: "Dialog",
      run: "▶ run",
      pause: "❚❚ pause",
      contactForm: "Contact form",
      writeEmail: "Write me an email",
      pickSlot: "Pick a slot",
      productGroup: "Product",
      hireGroup: "Freelance · On hire",
      live: "live",
      available: "available",
      offersRow: "Products & freelance",
      products2: "products",
      introCall: "Intro call",
      channels: "Activity, last 12 months",
    },
    blog: {
      title: "Blog",
      postsSuffix: "posts",
      subtitle:
        "Notes on AI engineering, coaching people through AI, and building products.",
      previous: "Previous",
      next: "Next",
      page: "Page",
      of: "of",
      empty: "No blog posts yet. Check back soon!",
      backToBlog: "Back to Blog",
      metaDescription:
        "Notes on AI engineering, coaching people through AI, and building products.",
    },
  },
  fr: {
    nav: { home: "Accueil", cv: "CV", blog: "Blog", contact: "Contact" },
    tooltip: {
      socials: "Réseaux",
      less: "Moins",
      theme: "Thème",
      language: "Langue",
    },
    hero: {
      greeting: "Salut, moi c'est",
      availability: "Disponible pour du coaching IA & des projets",
      availabilityHint:
        "J'accompagne particuliers et équipes sur l'IA, et je construis des applications IA sur mesure. Appel gratuit de 30 minutes, sans argumentaire.",
    },
    sections: {
      about: "À propos",
      certifications: "Certifications",
      nonProfit: "Bénévolat",
      work: "Expérience professionnelle",
      education: "Formation",
      skills: "Compétences",
    },
    work: { present: "Aujourd'hui" },
    projects: {
      badge: "Travaux sélectionnés",
      heading: "Les produits numériques que j'ai construits",
      subtitle:
        "Agents IA, plateformes SaaS et applications web — livrés de bout en bout. Quelques réalisations dont je suis le plus fier.",
    },
    contact: {
      handLabel: "Discutons",
      heading: "Mettons l'IA au travail pour vous",
      intro:
        "Je prends actuellement de nouvelles missions — vous accompagner, vous ou votre équipe, dans l'usage quotidien de l'IA, repérer là où elle rapporte vraiment, ou construire l'application IA sur mesure derrière. Dites-moi sur quoi vous travaillez et je vous dirai franchement si je suis la bonne personne.",
      ctaEyebrow: "Le moyen le plus rapide",
      ctaHeading: "Prenons un café virtuel",
      ctaText:
        "Un appel gratuit de 30 minutes — sans argumentaire, sans pression. Choisissez simplement un créneau qui vous convient et on part de là.",
      ctaShort: "Appel gratuit de 30 minutes, sans argumentaire.",
      bookCall: "Réserver un appel",
      emailEyebrow: "Vous préférez écrire ?",
      sendEmail: "Envoyer un e-mail",
      copy: "Copier",
      copied: "Copié",
      socialsHeading: "Retrouvez-moi ailleurs",
      replyTime: "Répond généralement sous 24 h",
    },
    newsletter: {
      heading: "Le navire va bientôt lever l'ancre…",
      text: "Vous ne voulez pas rester à quai face aux dernières avancées de la tech…",
      label: "Adresse e-mail",
      placeholder: "vous@exemple.com",
      subscribe: "S'abonner",
      subscribing: "Inscription…",
      steps: ["Vérification du billet…", "Traversée de la passerelle…", "Montée à bord…"],
      successText: "Sauvé du naufrage dans le bruit informationnel de l'IA ! Bienvenue dans l'expérience premium.",
      alreadyText: "Vous êtes à bord du canot…",
      error: "L'inscription n'a pas abouti. Vérifiez votre adresse e-mail et réessayez.",
      close: "Fermer",
    },
    landing: {
      agentSub: "Fares Aouani",
      kbSub: "Blog",
      mcpSub: "Mes outils",
      crmSub: "Me contacter",
      legendPage: "Page",
      legendDialog: "Fenêtre",
      legendExternal: "Externe",
      repos: "dépôts",
      contributions: "contributions en 12 mois",
      languages: "langages",
      since: "sur GitHub depuis",
      githubActivity: "Activité, 12 derniers mois",
      recentRepos: "Mis à jour récemment",
      viewProfile: "Voir le profil GitHub",
      contactTitle: "Discutons",
      contactText: "Réservez un appel, écrivez-moi ou recevez la newsletter.",
      online: "En ligne",
      openCv: "Ouvrir le CV",
      tools: "outils",
      kindOss: "Open source",
      kindOwn: "Ma société",
      kindClient: "Projet client",
      seeProjects: "Voir tous les projets",
      posts: "articles",
      showAll: "Tout voir",
      open: "Ouvrir",
      external: "Externe",
      email: "E-mail",
      callLength: "30 min",
      overview: "Aperçu",
      tabProducts: "Produits", tabBlog: "Blog", shelfAbout: "À propos de moi", shelfAboutSub: "Qui je suis et comment je travaille", shelfCases: "Études de cas", shelfCasesSub: "Les leçons de mon parcours", shelfItch: "Scratch your own itch", shelfItchSub: "Les outils que j'ai construits pour mes propres problèmes", comingSoon: "Bientôt", scrollPrev: "Défiler à gauche", scrollNext: "Défiler à droite",
      letsTalk: "Discutons",
      founder: "Fondateur",
      productsSub: "Web · SEO · Freelance",
      offers: "offres",
      ways: "moyens",
      copy: "Copier",
      copied: "Copié ✓",
      tagProduct: "Produit",
      tagHire: "Freelance",
      tagPage: "Page",
      tagDialog: "Fenêtre",
      run: "▶ lancer",
      pause: "❚❚ pause",
      contactForm: "Formulaire de contact",
      writeEmail: "M'écrire un e-mail",
      pickSlot: "Choisir un créneau",
      productGroup: "Produit",
      hireGroup: "Freelance · Disponible",
      live: "en ligne",
      available: "disponible",
      offersRow: "Produits & freelance",
      products2: "produits",
      introCall: "Appel découverte",
      channels: "Activité, 12 derniers mois",
    },
    blog: {
      title: "Blog",
      postsSuffix: "articles",
      subtitle:
        "Notes sur l'ingénierie IA, l'accompagnement à l'IA et la création de produits.",
      previous: "Précédent",
      next: "Suivant",
      page: "Page",
      of: "sur",
      empty: "Pas encore d'articles. Revenez bientôt !",
      backToBlog: "Retour au blog",
      metaDescription:
        "Notes sur l'ingénierie IA, l'accompagnement à l'IA et la création de produits.",
    },
  },
  de: {
    nav: { home: "Start", cv: "Lebenslauf", blog: "Blog", contact: "Kontakt" },
    tooltip: {
      socials: "Sozial",
      less: "Weniger",
      theme: "Design",
      language: "Sprache",
    },
    hero: {
      greeting: "Hi, ich bin",
      availability: "Verfügbar für KI-Coaching & Projekte",
      availabilityHint:
        "Ich coache Menschen und Teams zu KI und baue maßgeschneiderte KI-Anwendungen. Kostenloses 30-Minuten-Gespräch, kein Pitch.",
    },
    sections: {
      about: "Über mich",
      certifications: "Zertifizierungen",
      nonProfit: "Ehrenamtliche Arbeit",
      work: "Berufserfahrung",
      education: "Ausbildung",
      skills: "Kenntnisse",
    },
    work: { present: "Heute" },
    projects: {
      badge: "Ausgewählte Arbeiten",
      heading: "Digitale Produkte, die ich gebaut habe",
      subtitle:
        "KI-Agenten, SaaS-Plattformen und Web-Apps — end to end ausgeliefert. Einige Builds, auf die ich besonders stolz bin.",
    },
    contact: {
      handLabel: "Lass uns reden",
      heading: "Lass uns KI für dich arbeiten lassen",
      intro:
        "Ich nehme derzeit neue Projekte an — Coaching für dich oder dein Team zum täglichen KI-Einsatz, das Aufspüren der Stellen, an denen KI sich wirklich lohnt, oder der Bau der maßgeschneiderten KI-Anwendung dahinter. Sag mir, woran du arbeitest, und ich sage dir ehrlich, ob ich der Richtige dafür bin.",
      ctaEyebrow: "Der schnellste Weg",
      ctaHeading: "Auf einen virtuellen Kaffee",
      ctaText:
        "Ein kostenloses 30-minütiges Gespräch — kein Pitch, kein Druck. Wähl einfach einen passenden Termin und wir nehmen es von dort.",
      ctaShort: "Kostenloses 30-Minuten-Gespräch, kein Pitch.",
      bookCall: "Termin buchen",
      emailEyebrow: "Lieber schreiben?",
      sendEmail: "E-Mail senden",
      copy: "Kopieren",
      copied: "Kopiert",
      socialsHeading: "Finde mich anderswo",
      replyTime: "Antwortet meist innerhalb eines Tages",
    },
    newsletter: {
      heading: "Das Schiff legt bald ab…",
      text: "Du willst bei den neuesten Entwicklungen in der Tech-Welt nicht zurückbleiben…",
      label: "E-Mail-Adresse",
      placeholder: "du@beispiel.de",
      subscribe: "Anmelden",
      subscribing: "Wird angemeldet…",
      steps: ["Ticket wird geprüft…", "Über die Gangway…", "An Bord gehen…"],
      successText: "Gerettet vor dem Untergang im KI-Informationschaos! Willkommen beim Premium-Erlebnis.",
      alreadyText: "Du bist an Bord des Rettungsboots…",
      error: "Das hat nicht geklappt. Prüf deine E-Mail-Adresse und versuch es noch einmal.",
      close: "Schließen",
    },
    landing: {
      agentSub: "Fares Aouani",
      kbSub: "Blog",
      mcpSub: "Meine Tools",
      crmSub: "Kontakt",
      legendPage: "Seite",
      legendDialog: "Dialog",
      legendExternal: "Extern",
      repos: "Repos",
      contributions: "Beiträge in 12 Monaten",
      languages: "Sprachen",
      since: "auf GitHub seit",
      githubActivity: "Aktivität, letzte 12 Monate",
      recentRepos: "Zuletzt aktualisiert",
      viewProfile: "Profil auf GitHub ansehen",
      contactTitle: "Lass uns reden",
      contactText: "Termin buchen, schreiben oder Newsletter abonnieren.",
      online: "Online",
      openCv: "Lebenslauf öffnen",
      tools: "Tools",
      kindOss: "Open Source",
      kindOwn: "Eigene Firma",
      kindClient: "Kundenprojekt",
      seeProjects: "Alle Projekte ansehen",
      posts: "Beiträge",
      showAll: "Alle anzeigen",
      open: "Öffnen",
      external: "Extern",
      email: "E-Mail",
      callLength: "30 Min.",
      overview: "Überblick",
      tabProducts: "Produkte", tabBlog: "Blog", shelfAbout: "Über mich", shelfAboutSub: "Wer ich bin und wie ich arbeite", shelfCases: "Fallstudien", shelfCasesSub: "Learnings aus meiner Laufbahn", shelfItch: "Scratch your own itch", shelfItchSub: "Tools, die ich für meine eigenen Probleme gebaut habe", comingSoon: "Demnächst", scrollPrev: "Nach links scrollen", scrollNext: "Nach rechts scrollen",
      letsTalk: "Lass uns reden",
      founder: "Gründer",
      productsSub: "Web · SEO · Freelance",
      offers: "Angebote",
      ways: "Wege",
      copy: "Kopieren",
      copied: "Kopiert ✓",
      tagProduct: "Produkt",
      tagHire: "Freelance",
      tagPage: "Seite",
      tagDialog: "Dialog",
      run: "▶ start",
      pause: "❚❚ pause",
      contactForm: "Kontaktformular",
      writeEmail: "Schreib mir eine E-Mail",
      pickSlot: "Termin wählen",
      productGroup: "Produkt",
      hireGroup: "Freelance · Verfügbar",
      live: "live",
      available: "verfügbar",
      offersRow: "Produkte & Freelance",
      products2: "Produkte",
      introCall: "Kennenlerngespräch",
      channels: "Aktivität, letzte 12 Monate",
    },
    blog: {
      title: "Blog",
      postsSuffix: "Beiträge",
      subtitle:
        "Notizen zu KI-Engineering, KI-Coaching und Produktentwicklung.",
      previous: "Zurück",
      next: "Weiter",
      page: "Seite",
      of: "von",
      empty: "Noch keine Beiträge. Schau bald wieder vorbei!",
      backToBlog: "Zurück zum Blog",
      metaDescription:
        "Notizen zu KI-Engineering, KI-Coaching und Produktentwicklung.",
    },
  },
};

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}
