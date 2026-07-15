import type { Locale } from "./config";

export type Dictionary = {
  nav: { home: string; blog: string; contact: string };
  tooltip: { socials: string; less: string; theme: string; language: string };
  hero: { greeting: string };
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
    hero: { greeting: "Hi, I'm" },
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
      badge: "My Projects",
      heading: "Check out my latest work",
      subtitle:
        "I've worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites.",
    },
    contact: {
      handLabel: "Let's talk",
      heading: "Let's build something good",
      intro:
        "Have a project, a role, or an idea you want to bounce around? I'm always up for a good conversation — whether it's building AI products, shipping web apps, or just talking shop.",
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
      subtitle: "My thoughts on software development, life, and more.",
      previous: "Previous",
      next: "Next",
      page: "Page",
      of: "of",
      empty: "No blog posts yet. Check back soon!",
      backToBlog: "Back to Blog",
      metaDescription: "Thoughts on software development, life, and more.",
    },
  },
  fr: {
    nav: { home: "Accueil", blog: "Blog", contact: "Contact" },
    tooltip: { socials: "Réseaux", less: "Moins", theme: "Thème", language: "Langue" },
    hero: { greeting: "Salut, moi c'est" },
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
      badge: "Mes projets",
      heading: "Découvrez mes derniers travaux",
      subtitle:
        "J'ai travaillé sur des projets variés, de simples sites web à des applications web complexes. En voici quelques-uns de mes préférés.",
    },
    contact: {
      handLabel: "Discutons",
      heading: "Construisons quelque chose de bien",
      intro:
        "Vous avez un projet, un poste ou une idée à partager ? Je suis toujours partant pour une bonne discussion — qu'il s'agisse de créer des produits IA, de livrer des applications web ou simplement de parler métier.",
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
      subtitle: "Mes réflexions sur le développement logiciel, la vie, et plus encore.",
      previous: "Précédent",
      next: "Suivant",
      page: "Page",
      of: "sur",
      empty: "Pas encore d'articles. Revenez bientôt !",
      backToBlog: "Retour au blog",
      metaDescription: "Réflexions sur le développement logiciel, la vie, et plus encore.",
    },
  },
  de: {
    nav: { home: "Start", blog: "Blog", contact: "Kontakt" },
    tooltip: { socials: "Sozial", less: "Weniger", theme: "Design", language: "Sprache" },
    hero: { greeting: "Hi, ich bin" },
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
      badge: "Meine Projekte",
      heading: "Sieh dir meine neuesten Arbeiten an",
      subtitle:
        "Ich habe an ganz unterschiedlichen Projekten gearbeitet, von einfachen Websites bis zu komplexen Webanwendungen. Hier einige meiner Favoriten.",
    },
    contact: {
      handLabel: "Lass uns reden",
      heading: "Lass uns etwas Gutes bauen",
      intro:
        "Hast du ein Projekt, eine Stelle oder eine Idee, über die du sprechen möchtest? Ich bin immer für ein gutes Gespräch zu haben — ob es ums Bauen von KI-Produkten, das Ausliefern von Web-Apps oder einfach Fachsimpeln geht.",
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
      subtitle: "Meine Gedanken zu Softwareentwicklung, dem Leben und mehr.",
      previous: "Zurück",
      next: "Weiter",
      page: "Seite",
      of: "von",
      empty: "Noch keine Beiträge. Schau bald wieder vorbei!",
      backToBlog: "Zurück zum Blog",
      metaDescription: "Gedanken zu Softwareentwicklung, dem Leben und mehr.",
    },
  },
};

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}
