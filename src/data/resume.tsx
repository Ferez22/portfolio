import { Icons } from "@/components/icons";
import { Contact, HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Azure } from "@/components/ui/svgs/azure";

export const DATA = {
  name: "Fares Aouani Cherif",
  initials: "FCH",
  url: "https://faresaouani.com",
  location: "Düsseldorf, Germany",
  locationLink: "https://www.google.com/maps/place/Düsseldorf",
  headline: {
    en: "Freelance AI & Software Engineer",
    fr: "Ingénieur IA & logiciel freelance",
    de: "Freiberuflicher KI- & Software-Engineer",
  },
  description: {
    en: "Freelance AI and software engineer. I build digital products powered by AI,  from the model and the agents behind them to the web app people actually use. Available for new projects.",
    fr: "Ingénieur IA et logiciel en freelance. Je conçois des produits numériques propulsés par l'IA, du modèle et des agents qui les animent jusqu'à l'application web réellement utilisée. Disponible pour de nouveaux projets.",
    de: "Freiberuflicher KI- und Software-Engineer. Ich baue digitale Produkte mit KI im Kern, vom Modell und den Agenten dahinter bis zur Web-App, die Menschen wirklich nutzen. Verfügbar für neue Projekte.",
  },
  summary: {
    en: "I work with startups and companies as a freelance engineer, building AI-powered products end to end: LLM features, agents and retrieval systems, plus the web app, APIs and cloud infrastructure around them. Before going independent I spent years shipping production software — most recently a company-wide AI assistant serving 2,000+ people across 13 offices. I like small teams, short feedback loops, and shipping things that actually get used. Beyond tech, I play tennis at a competitive amateur level and produce electronic music.",
    fr: "Je travaille avec des startups et des entreprises en tant qu'ingénieur freelance, en construisant des produits propulsés par l'IA de bout en bout : fonctionnalités LLM, agents et systèmes de recherche, ainsi que l'application web, les API et l'infrastructure cloud qui les entourent. Avant de me mettre à mon compte, j'ai passé des années à livrer du logiciel en production — dernièrement un assistant IA déployé à l'échelle d'une entreprise, utilisé par plus de 2 000 personnes sur 13 sites. J'aime les petites équipes, les boucles de retour courtes et les produits réellement utilisés. Au-delà de la tech, je joue au tennis à un niveau amateur compétitif et je produis de la musique électronique.",
    de: "Ich arbeite als freiberuflicher Engineer mit Startups und Unternehmen und baue KI-gestützte Produkte von Anfang bis Ende: LLM-Features, Agenten und Retrieval-Systeme sowie die Web-App, APIs und Cloud-Infrastruktur drumherum. Vor der Selbstständigkeit habe ich jahrelang Produktionssoftware ausgeliefert — zuletzt einen unternehmensweiten KI-Assistenten für über 2.000 Menschen an 13 Standorten. Ich mag kleine Teams, kurze Feedbackschleifen und Dinge, die wirklich genutzt werden. Neben der Technik spiele ich Tennis auf ambitioniertem Amateurniveau und produziere elektronische Musik.",
  },
  avatarUrl: "/me.jpg",
  skills: [
    { name: "Azure", icon: Azure },
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "Typescript", icon: Typescript },
    { name: "Node.js", icon: Nodejs },
    { name: "Python", icon: Python },
    { name: "Postgres", icon: Postgresql },
    { name: "Docker", icon: Docker },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
    { href: "/#contact", icon: Contact, label: "Contact" },
  ],
  contact: {
    email: "fares.aouani@proton.me",
    tel: "",
    calendlyUrl: "https://calendly.com/fares-aouani-proton/30min",
    social: {
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/fares-aouani-cherif",
        icon: Icons.linkedin,

        navbar: true,
      },
      GitHub: {
        name: "GitHub",
        url: "https://github.com/Ferez22",
        icon: Icons.github,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/ferezCh",
        icon: Icons.x,

        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "https://www.youtube.com/@ferez_",
        icon: Icons.youtube,
        navbar: true,
      },
      Soundcloud: {
        name: "Soundcloud",
        url: "https://soundcloud.com/ferez-197925187",
        icon: Icons.soundcloud,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:fares.aouani@proton.me",
        icon: Icons.email,

        navbar: false,
      },
    },
  },
  certifications: [
    {
      name: "Microsoft Certified: Azure Developer Associate",
      href: "https://learn.microsoft.com/en-us/credentials/certifications/azure-developer/?practice-assessment-type=certification",
      logoUrl: "/az204.png",
      date: "March 2025",
      credentialId:
        "Credential ID: 9C0721D2FA6B9253 - Certification number: 4DDC4A-IE3385",
    },
  ],
  nonProfitWork: [
    {
      name: "AMLD Africa",
      href: "https://www.mlafrica.org",
      logoUrl: "/amld.png",
      date: "July 2025",
      description: {
        en: "AMLD Africa is a non-profit organization that aims to democratize the use of technology and AI in Africa.",
        fr: "AMLD Africa est une organisation à but non lucratif qui vise à démocratiser l'usage de la technologie et de l'IA en Afrique.",
        de: "AMLD Africa ist eine gemeinnützige Organisation, die den Einsatz von Technologie und KI in Afrika demokratisieren möchte.",
      },
    },
  ],
  work: [
    {
      company: "Freelance",
      href: "https://faresaouani.com",
      badges: ["Available"],
      location: "Remote / Düsseldorf",
      title: {
        en: "AI & Software Engineer",
        fr: "Ingénieur IA & logiciel",
        de: "KI- & Software-Engineer",
      },
      logoUrl: "/me.jpg",
      start: "July 2026",
      end: "Present",
      description: {
        en: "Independent engineer building AI-powered digital products for startups and companies. I take features from idea to production: LLM and agent systems, retrieval pipelines, and the web apps, APIs and cloud infrastructure they run on. Typical work ranges from a focused AI feature inside an existing product to a full build — design, frontend, backend, deployment and monitoring.",
        fr: "Ingénieur indépendant, je construis des produits numériques propulsés par l'IA pour des startups et des entreprises. Je mène les fonctionnalités de l'idée à la production : systèmes LLM et agents, pipelines de recherche, ainsi que les applications web, API et infrastructures cloud qui les font tourner. Les missions vont d'une fonctionnalité IA ciblée dans un produit existant à une construction complète — design, frontend, backend, déploiement et monitoring.",
        de: "Als unabhängiger Engineer baue ich KI-gestützte digitale Produkte für Startups und Unternehmen. Ich bringe Features von der Idee in die Produktion: LLM- und Agentensysteme, Retrieval-Pipelines sowie die Web-Apps, APIs und Cloud-Infrastruktur, auf denen sie laufen. Die Projekte reichen von einem gezielten KI-Feature in einem bestehenden Produkt bis zum kompletten Aufbau — Design, Frontend, Backend, Deployment und Monitoring.",
      },
    },
    {
      company: "STE Qartmina",
      href: "https://qartmina.com/",
      badges: ["Tech"],
      location: "Online",
      title: {
        en: "Managing Partner",
        fr: "Associé gérant",
        de: "Geschäftsführender Gesellschafter",
      },
      logoUrl: "/Qartmina Logo main.png",
      start: "October 2026",
      end: "Present",
      description: {
        en: "STE Qartmina is a tech startup that provides innovative solutions for the tech industry. As Managing Partner, I am responsible for the overall strategy and direction of the company. We mainly offer Consulting in Technology and AI, helping businesses gain back execution time, by finding use cases for automation and AI in their employees daily workflow.",
        fr: "STE Qartmina est une startup technologique qui propose des solutions innovantes pour le secteur de la tech. En tant qu'associé gérant, je suis responsable de la stratégie et de la direction globale de l'entreprise. Nous proposons principalement du conseil en technologie et en IA, aidant les entreprises à regagner du temps d'exécution en identifiant des cas d'usage d'automatisation et d'IA dans le quotidien de leurs employés.",
        de: "STE Qartmina ist ein Tech-Startup, das innovative Lösungen für die Technologiebranche bietet. Als geschäftsführender Gesellschafter verantworte ich die Gesamtstrategie und Ausrichtung des Unternehmens. Wir bieten vor allem Beratung in Technologie und KI an und helfen Unternehmen, Ausführungszeit zurückzugewinnen, indem wir Anwendungsfälle für Automatisierung und KI im Arbeitsalltag ihrer Mitarbeitenden finden.",
      },
    },
    {
      company: "Forvis Mazars Gmbh",
      href: "https://forvismazars.com/",
      badges: [],
      location: "Düsseldorf, Germany",
      title: {
        en: "Fullstack Engineer",
        fr: "Ingénieur Fullstack",
        de: "Fullstack-Entwickler",
      },
      logoUrl: "/forvismazars.png",
      start: "May 2023",
      end: "Present",
      description: {
        en: "Part of the Technology and Data team at this global audit and advisory firm, driving data-driven transformation. Two main projects I have worked on: a document generator and a company-wide AI chatbot. Build from the ground up, now serving 2,000+ employees across 13 locations in 3+ countries, backed by 50+ knowledge bases. Deployed Databricks infrastructure with Terraform, built Azure CI/CD pipelines, and set up monitoring and app infrastructure. Shipping features and good vibes.",
        fr: "Membre de l'équipe Technologie et Data de ce cabinet mondial d'audit et de conseil, où je porte la transformation pilotée par la donnée. Deux projets principaux : un générateur de documents et un chatbot IA déployé à l'échelle de l'entreprise. Conçu de A à Z, il sert aujourd'hui plus de 2 000 employés répartis sur 13 sites dans plus de 3 pays, avec plus de 50 bases de connaissances. J'ai déployé l'infrastructure Databricks avec Terraform, construit des pipelines CI/CD Azure et mis en place le monitoring et l'infrastructure applicative. Des fonctionnalités livrées et une bonne ambiance.",
        de: "Teil des Technology-and-Data-Teams dieser globalen Wirtschaftsprüfungs- und Beratungsgesellschaft, wo ich die datengetriebene Transformation vorantreibe. Zwei Hauptprojekte: ein Dokumentengenerator und ein unternehmensweiter KI-Chatbot. Von Grund auf aufgebaut, versorgt er heute über 2.000 Mitarbeitende an 13 Standorten in mehr als 3 Ländern, gestützt auf über 50 Wissensdatenbanken. Ich habe die Databricks-Infrastruktur mit Terraform aufgesetzt, Azure-CI/CD-Pipelines gebaut sowie Monitoring und App-Infrastruktur eingerichtet. Features liefern und gute Stimmung.",
      },
    },
    {
      company: "Adesso Gmbh",
      href: "https://adesso.com/",
      badges: [],
      location: "Düsseldorf, Germany",
      title: {
        en: "Internship: Team Lead & Fullstack Developer",
        fr: "Stage : Chef d'équipe & développeur fullstack",
        de: "Praktikum: Teamleiter & Fullstack-Entwickler",
      },
      logoUrl: "/adesso.png",
      start: "Sep 2022",
      end: "Jan 2023",
      description: {
        en: "Adesso is a leading German IT consulting company. • Led the development of a Parking Monitor for multiple Adesso parking locations across Germany • Ensured end-to-end delivery of a full-stack and IoT solution as Team Lead, following agile methodologies • Frontend angular, backend NodeRed and Arduino code for the Ultrasound sensors • Used an MQTT to trigger changes in the database and on the webUI",
        fr: "Adesso est une grande société allemande de conseil en informatique. • J'ai dirigé le développement d'un moniteur de stationnement pour plusieurs parkings Adesso à travers l'Allemagne • Assuré la livraison de bout en bout d'une solution full-stack et IoT en tant que chef d'équipe, selon des méthodes agiles • Frontend Angular, backend Node-RED et code Arduino pour les capteurs à ultrasons • Utilisé MQTT pour déclencher les changements dans la base de données et sur l'interface web",
        de: "Adesso ist ein führendes deutsches IT-Beratungsunternehmen. • Leitung der Entwicklung eines Parkplatz-Monitors für mehrere Adesso-Standorte in ganz Deutschland • Als Teamleiter die End-to-End-Lieferung einer Full-Stack- und IoT-Lösung nach agilen Methoden verantwortet • Frontend mit Angular, Backend mit Node-RED und Arduino-Code für die Ultraschallsensoren • MQTT genutzt, um Änderungen in der Datenbank und in der Web-UI auszulösen",
      },
    },
    {
      company: "Datalog Finance",
      href: "https://datalog-finance.com/",
      badges: [],
      location: "Paris, France",
      title: {
        en: "Working Student: Web designer",
        fr: "Étudiant salarié : Web designer",
        de: "Werkstudent: Webdesigner",
      },
      logoUrl: "/datalog.png",
      start: "Feb 2021",
      end: "Dec 2021",
      description: {
        en: "Redesigned the company's TMS (Treasury Management System) UI from the ground up, building the new interface with HTML, CSS and JavaScript.",
        fr: "Refonte complète de l'interface du TMS (système de gestion de trésorerie) de l'entreprise, en construisant la nouvelle interface avec HTML, CSS et JavaScript.",
        de: "Die Benutzeroberfläche des firmeneigenen TMS (Treasury-Management-System) von Grund auf neu gestaltet und die neue Oberfläche mit HTML, CSS und JavaScript umgesetzt.",
      },
    },
  ],
  education: [
    {
      school: "Hochschule Rhein-Waal",
      href: "https://www.hochschule-rhein-waal.de/de",
      degree: "Medien- und Kommuniationsinformatik",
      logoUrl: "/hsrw.png",
      start: "2018",
      end: "2023",
    },
  ],
  projects: [
    {
      title: "Weekendstack",
      href: "https://www.producthunt.com/products/weekendstack",
      dates: "July 2026",
      active: true,
      description: {
        en: "Ship a real SaaS in a weekend, with your AI agent. A production-ready stack that gets you from idea to launched product without wiring auth, payments and infra from scratch. Live on Product Hunt.",
        fr: "Lancez un vrai SaaS en un week-end, avec votre agent IA. Une stack prête pour la production qui vous mène de l'idée au produit lancé sans câbler l'authentification, les paiements et l'infra à partir de zéro. En ligne sur Product Hunt.",
        de: "Bring ein echtes SaaS an einem Wochenende live — mit deinem KI-Agenten. Ein produktionsreifer Stack, der dich von der Idee zum fertigen Produkt bringt, ohne Auth, Payments und Infra von Grund auf zu verkabeln. Jetzt auf Product Hunt.",
      },
      technologies: ["Typescript", "Next.js"],
      links: [
        {
          type: "Product Hunt",
          href: "https://www.producthunt.com/products/weekendstack",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/weekendstack.jpg",
      video: "",
    },
    {
      title: "SaaS: Invoice Generator",
      href: "",
      dates: "July 2026",
      active: true,
      description: {
        en: "Are you a freelancer or a small business who needs to generate invoices fast? This is your tool.",
        fr: "Vous êtes freelance ou une petite entreprise et devez générer des factures rapidement ? Voici votre outil.",
        de: "Freelancer oder kleines Unternehmen und musst schnell Rechnungen erstellen? Das ist dein Werkzeug.",
      },
      technologies: ["Typescript"],
      links: [
        {
          type: "Website",
          href: "https://invova.app",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "invova.png",
      video: "",
    },
    {
      title: "Guitar Practice Companion",
      href: "",
      dates: "May 2026",
      active: true,
      description: {
        en: "I started learning guitar a few months ago and quickly realized that learning chords first is the fastest path to playing real songs. But finding chords and understanding how to fret them isn't easy — so I built a tool that detects the chords you play in real time (TensorFlow + audio recognition) and visually shows you what you're striking. It also includes a library of chords with visualizations so you can start practicing right away.",
        fr: "J'ai commencé la guitare il y a quelques mois et j'ai vite compris qu'apprendre d'abord les accords est le chemin le plus rapide pour jouer de vraies chansons. Mais trouver les accords et comprendre comment les placer n'est pas simple — j'ai donc créé un outil qui détecte les accords que vous jouez en temps réel (TensorFlow + reconnaissance audio) et vous montre visuellement ce que vous jouez. Il inclut aussi une bibliothèque d'accords avec des visualisations pour commencer à pratiquer tout de suite.",
        de: "Vor ein paar Monaten habe ich angefangen, Gitarre zu lernen, und schnell gemerkt, dass es am schnellsten zu echten Songs führt, zuerst Akkorde zu lernen. Doch Akkorde zu finden und zu verstehen, wie man sie greift, ist nicht leicht — also habe ich ein Werkzeug gebaut, das die gespielten Akkorde in Echtzeit erkennt (TensorFlow + Audioerkennung) und visuell anzeigt, was du greifst. Es enthält außerdem eine Akkord-Bibliothek mit Visualisierungen, damit du sofort üben kannst.",
      },
      technologies: ["Python", "Tensorflow"],
      links: [
        {
          type: "Website",
          href: "https://learn-guitarre.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "guitar.png",
      video: "",
    },
    {
      title: "Hannibal's Army Multi-Agent system",
      href: "",
      dates: "March 2026",
      active: true,
      description: {
        en: "A multi-agent trip planner that matches users with their perfect destination based on preferences, budget, and travel style. Built on LangGraph and local LLMs via Ollama, it pairs a polished terminal interface with an AI-powered chat system to organize trips end to end.",
        fr: "Un planificateur de voyage multi-agents qui associe les utilisateurs à leur destination idéale selon leurs préférences, leur budget et leur style de voyage. Basé sur LangGraph et des LLM locaux via Ollama, il combine une interface terminal soignée et un système de chat propulsé par l'IA pour organiser les voyages de bout en bout.",
        de: "Ein Multi-Agenten-Reiseplaner, der Nutzer anhand von Vorlieben, Budget und Reisestil mit ihrem perfekten Ziel zusammenbringt. Aufgebaut auf LangGraph und lokalen LLMs über Ollama, verbindet er eine ausgefeilte Terminal-Oberfläche mit einem KI-gestützten Chat-System, um Reisen von Anfang bis Ende zu organisieren.",
      },
      technologies: [
        "Python",
        "Langchain",
        "Langgraph",
        "Ollama",
        "MCP",
        "Pandas",
      ],
      links: [
        {
          type: "Website",
          href: "https://github.com/Ferez22/hannibals-army",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://old.mlafrica.org/wp-content/uploads/2026/03/Enregistrement-de-lecran-2026-03-19-a-12.42.34.mov",
    },
    {
      title: "AMLD Africa Tech Infrastructure",
      href: "https://www.mlafrica.org",
      dates: "Jan 2026 - Present",
      active: true,
      description: {
        en: "Since joining AMLD Africa in July 2025, I built robust infrastructure that powers both the organization's public presence and its internal operations — supporting an event that reached 3,000+ attendees onsite, online, and through ambassador broadcasts. The platform streamlines agenda generation, certificate issuance, and the team's day-to-day workflows.",
        fr: "Depuis mon arrivée chez AMLD Africa en juillet 2025, j'ai construit une infrastructure robuste qui alimente à la fois la présence publique de l'organisation et ses opérations internes — au service d'un événement ayant réuni plus de 3 000 participants sur place, en ligne et via les diffusions des ambassadeurs. La plateforme simplifie la génération d'agendas, l'émission de certificats et le travail quotidien de l'équipe.",
        de: "Seit meinem Einstieg bei AMLD Africa im Juli 2025 habe ich eine robuste Infrastruktur aufgebaut, die sowohl den öffentlichen Auftritt der Organisation als auch ihren internen Betrieb trägt — für eine Veranstaltung mit über 3.000 Teilnehmenden vor Ort, online und über Botschafter-Übertragungen. Die Plattform vereinfacht die Agenda-Erstellung, die Ausstellung von Zertifikaten und die täglichen Abläufe des Teams.",
      },
      technologies: [
        "Next.js",
        "Typescript",
        "TailwindCSS",
        "Shadcn UI",
        "Supabase",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.mlafrica.org",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "amldwebsite.png",
      video: "",
    },
    {
      title: "AMLD Africa: Automations",
      href: "https://www.mlafrica.org/",
      dates: "Oct 2025 - Present",
      active: true,
      description: {
        en: "Automations I built for AMLD Africa: anonymized speaker applications for fair, bias-free reviewer scoring; an automated certificate pipeline that generated 1,400 attendee certificates; and informational email campaigns to attendees — saving the team countless manual hours.",
        fr: "Des automatisations que j'ai créées pour AMLD Africa : anonymisation des candidatures des intervenants pour une évaluation juste et sans biais ; un pipeline automatisé de certificats ayant généré 1 400 certificats de participation ; et des campagnes d'e-mails d'information aux participants — faisant gagner à l'équipe d'innombrables heures de travail manuel.",
        de: "Automatisierungen, die ich für AMLD Africa gebaut habe: anonymisierte Speaker-Bewerbungen für eine faire, verzerrungsfreie Bewertung; eine automatisierte Zertifikats-Pipeline, die 1.400 Teilnahmezertifikate erzeugt hat; und informative E-Mail-Kampagnen an die Teilnehmenden — was dem Team unzählige manuelle Arbeitsstunden erspart hat.",
      },
      technologies: ["Make", "Notion", "Microsoft Outlook", "Google drive"],
      links: [
        {
          type: "Website",
          href: "https://www.mlafrica.org/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://old.mlafrica.org/wp-content/uploads/2026/03/WhatsApp-Video-2026-03-02-at-15.51.55.mp4",
    },
  ],
  hackathons: [
    {
      title: "QHacks II",
      dates: "February 3rd - 5th, 2017",
      location: "Kingston, Ontario",
      description:
        "Developed a mobile game which enables city-wide manhunt with random lobbies",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/qhacks.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
      links: [
        {
          title: "Source (Mobile)",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/human-huntr-react-native",
        },
        {
          title: "Source (API)",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/mattBlackDesign/human-huntr-rails",
        },
      ],
    },
  ],
} as const;
