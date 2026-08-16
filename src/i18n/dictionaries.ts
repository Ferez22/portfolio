import type { Locale } from "./config";

export type Dictionary = {
  nav: { home: string; blog: string; contact: string };
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
    bookCall: string;
    emailEyebrow: string;
    sendEmail: string;
    copy: string;
    copied: string;
    socialsHeading: string;
    replyTime: string;
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
    nav: { home: "Home", blog: "Blog", contact: "Contact" },
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
      bookCall: "Book a call",
      emailEyebrow: "Prefer to write?",
      sendEmail: "Send an email",
      copy: "Copy",
      copied: "Copied",
      socialsHeading: "Find me elsewhere",
      replyTime: "Usually replies within a day",
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
    nav: { home: "Accueil", blog: "Blog", contact: "Contact" },
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
      bookCall: "Réserver un appel",
      emailEyebrow: "Vous préférez écrire ?",
      sendEmail: "Envoyer un e-mail",
      copy: "Copier",
      copied: "Copié",
      socialsHeading: "Retrouvez-moi ailleurs",
      replyTime: "Répond généralement sous 24 h",
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
    nav: { home: "Start", blog: "Blog", contact: "Kontakt" },
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
      bookCall: "Termin buchen",
      emailEyebrow: "Lieber schreiben?",
      sendEmail: "E-Mail senden",
      copy: "Kopieren",
      copied: "Kopiert",
      socialsHeading: "Finde mich anderswo",
      replyTime: "Antwortet meist innerhalb eines Tages",
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
