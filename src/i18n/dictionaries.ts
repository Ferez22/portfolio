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
    tooltip: { socials: "Socials", less: "Less", theme: "Theme", language: "Language" },
    hero: { greeting: "Hi, I'm", availability: "Available for freelance projects", availabilityHint: "Taking on new AI and web engineering work. Free 30-minute call, no pitch." },
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
      heading: "Digital products I've built",
      subtitle:
        "AI products, SaaS platforms and web apps — shipped end to end. A few of the builds I'm happiest with.",
    },
    contact: {
      handLabel: "Let's talk",
      heading: "Let's build your product",
      intro:
        "I'm currently taking on freelance work — AI features, full product builds, or a hand on an existing codebase. Tell me what you're building and I'll tell you straight whether I'm the right person for it.",
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
      subtitle: "Notes on AI engineering, building products, and the freelance life.",
      previous: "Previous",
      next: "Next",
      page: "Page",
      of: "of",
      empty: "No blog posts yet. Check back soon!",
      backToBlog: "Back to Blog",
      metaDescription: "Notes on AI engineering, building products, and the freelance life.",
    },
  },
  fr: {
    nav: { home: "Accueil", blog: "Blog", contact: "Contact" },
    tooltip: { socials: "Réseaux", less: "Moins", theme: "Thème", language: "Langue" },
    hero: { greeting: "Salut, moi c'est", availability: "Disponible pour des missions freelance", availabilityHint: "Je prends de nouvelles missions IA et web. Appel gratuit de 30 minutes, sans argumentaire." },
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
        "Produits IA, plateformes SaaS et applications web — livrés de bout en bout. Quelques réalisations dont je suis le plus fier.",
    },
    contact: {
      handLabel: "Discutons",
      heading: "Construisons votre produit",
      intro:
        "Je prends actuellement des missions en freelance — fonctionnalités IA, construction complète de produit, ou renfort sur une base de code existante. Dites-moi ce que vous construisez et je vous dirai franchement si je suis la bonne personne.",
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
      subtitle: "Notes sur l'ingénierie IA, la création de produits et la vie de freelance.",
      previous: "Précédent",
      next: "Suivant",
      page: "Page",
      of: "sur",
      empty: "Pas encore d'articles. Revenez bientôt !",
      backToBlog: "Retour au blog",
      metaDescription: "Notes sur l'ingénierie IA, la création de produits et la vie de freelance.",
    },
  },
  de: {
    nav: { home: "Start", blog: "Blog", contact: "Kontakt" },
    tooltip: { socials: "Sozial", less: "Weniger", theme: "Design", language: "Sprache" },
    hero: { greeting: "Hi, ich bin", availability: "Verfügbar für Freelance-Projekte", availabilityHint: "Ich nehme neue KI- und Web-Projekte an. Kostenloses 30-Minuten-Gespräch, kein Pitch." },
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
        "KI-Produkte, SaaS-Plattformen und Web-Apps — end to end ausgeliefert. Einige Builds, auf die ich besonders stolz bin.",
    },
    contact: {
      handLabel: "Lass uns reden",
      heading: "Lass uns dein Produkt bauen",
      intro:
        "Ich nehme derzeit Freelance-Projekte an — KI-Features, komplette Produktentwicklung oder Unterstützung an einer bestehenden Codebasis. Sag mir, was du baust, und ich sage dir ehrlich, ob ich der Richtige dafür bin.",
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
      subtitle: "Notizen zu KI-Engineering, Produktentwicklung und dem Freelance-Leben.",
      previous: "Zurück",
      next: "Weiter",
      page: "Seite",
      of: "von",
      empty: "Noch keine Beiträge. Schau bald wieder vorbei!",
      backToBlog: "Zurück zum Blog",
      metaDescription: "Notizen zu KI-Engineering, Produktentwicklung und dem Freelance-Leben.",
    },
  },
};

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}
