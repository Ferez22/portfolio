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
    en: "AI Coach & Engineer",
    fr: "Coach & ingénieur IA",
    de: "KI-Coach & Engineer",
  },
  description: {
    en: "",
    fr: "",
    de: "",
  },
  summary: {
    en: "",
    fr: "",
    de: "",
  },
  avatarUrl: "/me.jpg",
  /** Stylized portrait used by the landing page intro. */
  introPortraitUrl: "/pdp.jpg",
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
      company: "Independent",
      href: "https://faresaouani.com",
      badges: ["Available", "OpenAI Select Partner"],
      location: "Remote / Düsseldorf",
      title: {
        en: "AI Coach & Engineer",
        fr: "Coach & ingénieur IA",
        de: "KI-Coach & Engineer",
      },
      logoUrl: "/me.jpg",
      start: "July 2026",
      end: "Present",
      description: {
        en: "I coach people and teams on using AI in their day-to-day work: choosing the right tools, introducing them without friction, and turning repetitive work into workflows and agents — marketing, websites, internal tools, lead generation, daily news automations, meal or training plans, whatever the actual bottleneck is. I also run AI opportunity audits to find where AI genuinely pays off in a business or a life. When a workflow isn't enough, I build the product: LLMs at the core with tool use, retrieval and agents in Python, plus the web app, APIs and cloud infrastructure around it.",
        fr: "J'accompagne des personnes et des équipes dans l'usage quotidien de l'IA : choisir les bons outils, les introduire sans friction et transformer le travail répétitif en workflows et en agents — marketing, sites web, outils internes, génération de leads, automatisations d'actualité quotidiennes, plans de repas ou d'entraînement, selon le vrai goulot d'étranglement. Je réalise aussi des audits d'opportunités IA pour repérer là où l'IA rapporte vraiment, dans une entreprise comme dans une vie. Quand un workflow ne suffit plus, je construis le produit : des LLM au cœur avec l'usage d'outils, la recherche documentaire et les agents en Python, ainsi que l'application web, les API et l'infrastructure cloud autour.",
        de: "Ich coache Menschen und Teams beim täglichen Einsatz von KI: die richtigen Tools wählen, sie reibungslos einführen und wiederkehrende Arbeit in Workflows und Agenten überführen — Marketing, Websites, interne Tools, Leadgenerierung, tägliche News-Automatisierungen, Ernährungs- oder Trainingspläne, je nachdem, wo der echte Engpass liegt. Außerdem mache ich KI-Potenzialanalysen, um zu finden, wo KI im Unternehmen oder im Alltag wirklich etwas bringt. Wenn ein Workflow nicht reicht, baue ich das Produkt: LLMs im Kern mit Tool-Nutzung, Retrieval und Agenten in Python, dazu die Web-App, APIs und Cloud-Infrastruktur drumherum.",
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
  /**
   * The two full-screen quotes on the landing page.
   * `hero` shows right after the loader, `thesis` sits between the projects
   * and the chronology. Edit freely — they are rendered verbatim.
   */
  quotes: {
    hero: {
      en: "The only way to do great work is to love what you do. - Steve Jobs",
      fr: "Le meilleur moyen de faire un bon travail, c'est d'aimer ce que l'on fait. - Steve Jobs",
      de: "Der beste weg, um was großes zu schaffen, ist es das zu lieben, was man macht. - Steve Jobs",
    },
    thesis: {
      en: "AI only pays off when it lands inside a real process — one agent, one job, shipped to production.",
      fr: "L'IA ne rapporte que lorsqu'elle s'intègre à un vrai processus — un agent, une tâche, mis en production.",
      de: "KI zahlt sich erst aus, wenn sie in einem echten Prozess landet — ein Agent, eine Aufgabe, in Produktion.",
    },
  },
  /**
   * The full-screen chronology arrow. `kind` drives the styling:
   * milestone | school | work | world (world = context markers like COVID).
   */
  timeline: [
    {
      id: "born",
      kind: "milestone",
      dateLabel: "22.08.1997",
      sortDate: "1997-08-22",
      title: {
        en: "Born in Carthage, Tunisia",
        fr: "Né à Carthage, Tunisie",
        de: "Geboren in Karthago, Tunesien",
      },
      body: {
        en: "A Friday, in a city built on layers of other cities.",
        fr: "Un vendredi, dans une ville bâtie sur les couches d'autres villes.",
        de: "Ein Freitag, in einer Stadt, die auf anderen Städten gebaut ist.",
      },
    },
    {
      id: "bac",
      kind: "school",
      dateLabel: "2015",
      sortDate: "2015-06-01",
      title: {
        en: "French Baccalauréat",
        fr: "Baccalauréat français",
        de: "Französisches Abitur",
      },
      body: {
        en: "Finished school in the French system, already pointed at engineering.",
        fr: "Fin du lycée dans le système français, déjà tourné vers l'ingénierie.",
        de: "Schulabschluss im französischen System, schon Richtung Technik orientiert.",
      },
    },
    {
      id: "goethe",
      kind: "school",
      dateLabel: "2016",
      sortDate: "2016-01-01",
      title: {
        en: "Goethe-Institut — German",
        fr: "Goethe-Institut — allemand",
        de: "Goethe-Institut — Deutsch",
      },
      body: {
        en: "A year of German, to make studying in Germany possible.",
        fr: "Une année d'allemand, pour rendre possible des études en Allemagne.",
        de: "Ein Jahr Deutsch, um das Studium in Deutschland möglich zu machen.",
      },
    },
    {
      id: "berlin",
      kind: "school",
      dateLabel: "2017 – 2018",
      sortDate: "2017-09-01",
      title: {
        en: "Computer Science — Berlin",
        fr: "Informatique — Berlin",
        de: "Informatik — Berlin",
      },
      body: {
        en: "First years of CS studies in Berlin.",
        fr: "Premières années d'études d'informatique à Berlin.",
        de: "Erste Jahre des Informatikstudiums in Berlin.",
      },
    },
    {
      id: "hsrw",
      kind: "school",
      dateLabel: "2019 – 2023",
      sortDate: "2019-09-01",
      title: {
        en: "Digital Media & Computer Science — Kamp-Lintfort",
        fr: "Médias numériques & informatique — Kamp-Lintfort",
        de: "Medien- und Kommunikationsinformatik — Kamp-Lintfort",
      },
      body: {
        en: "Where the engineering and the design halves finally met.",
        fr: "Là où l'ingénierie et le design se sont enfin rencontrés.",
        de: "Wo Technik und Gestaltung endlich zusammenkamen.",
      },
    },
    {
      id: "covid",
      kind: "world",
      dateLabel: "2020 – 2021",
      sortDate: "2020-03-01",
      title: {
        en: "COVID",
        fr: "COVID",
        de: "COVID",
      },
      body: {
        en: "Everything went remote and quiet. Studies, work and side projects all collapsed into one desk, and I spent the time building.",
        fr: "Tout est devenu distant et silencieux. Études, travail et projets perso se sont retrouvés sur le même bureau, et j'ai passé ce temps à construire.",
        de: "Alles wurde remote und still. Studium, Arbeit und Nebenprojekte fielen auf einen Schreibtisch zusammen, und ich habe die Zeit zum Bauen genutzt.",
      },
    },
    {
      id: "datalog",
      kind: "work",
      dateLabel: "2021",
      sortDate: "2021-02-01",
      title: {
        en: "Datalog Finance — Web Design",
        fr: "Datalog Finance — web design",
        de: "Datalog Finance — Webdesign",
      },
      body: {
        en: "Rebuilt a treasury management UI from the ground up.",
        fr: "Refonte complète de l'interface d'un système de gestion de trésorerie.",
        de: "Die Oberfläche eines Treasury-Management-Systems neu gebaut.",
      },
    },
    {
      id: "adesso",
      kind: "work",
      dateLabel: "2022",
      sortDate: "2022-09-01",
      title: {
        en: "adesso GmbH — Software Engineer & Team Lead",
        fr: "adesso GmbH — ingénieur logiciel & chef d'équipe",
        de: "adesso GmbH — Software Engineer & Teamleiter",
      },
      body: {
        en: "Led a full-stack and IoT build end to end, first time owning delivery.",
        fr: "Direction d'un projet full-stack et IoT de bout en bout, première responsabilité de livraison.",
        de: "Ein Full-Stack- und IoT-Projekt end to end geleitet, erstmals mit Lieferverantwortung.",
      },
    },
    {
      id: "chatgpt",
      kind: "world",
      dateLabel: "Nov 2022",
      sortDate: "2022-11-30",
      title: {
        en: "ChatGPT ships",
        fr: "ChatGPT sort",
        de: "ChatGPT erscheint",
      },
      body: {
        en: "This is what shaped the direction I wanted to go into: artificial intelligence. It was suddenly obvious which problems were worth automating, and the interest stopped being a direction and became the work.",
        fr: "C'est ce qui a façonné la direction que je voulais prendre : l'intelligence artificielle. On voyait soudain quels problèmes méritaient d'être automatisés, et l'intérêt a cessé d'être une direction pour devenir le métier.",
        de: "Das hat die Richtung geprägt, die ich einschlagen wollte: künstliche Intelligenz. Plötzlich war klar, welche Probleme Automatisierung verdienen, und aus dem Interesse wurde die eigentliche Arbeit.",
      },
    },
    {
      id: "forvis",
      kind: "work",
      dateLabel: "2023 – now",
      sortDate: "2023-05-01",
      title: {
        en: "Forvis Mazars GmbH — Fullstack Engineer",
        fr: "Forvis Mazars GmbH — ingénieur fullstack",
        de: "Forvis Mazars GmbH — Fullstack-Entwickler",
      },
      body: {
        en: "A company-wide AI chatbot and a document generator, serving 2,000+ people across 13 locations.",
        fr: "Un chatbot IA à l'échelle de l'entreprise et un générateur de documents, pour 2 000+ personnes sur 13 sites.",
        de: "Ein unternehmensweiter KI-Chatbot und ein Dokumentengenerator für über 2.000 Menschen an 13 Standorten.",
      },
    },
    {
      id: "freelance",
      kind: "milestone",
      dateLabel: "Oct 2027",
      sortDate: "2027-10-01",
      title: {
        en: "Freelance AI Engineer",
        fr: "Ingénieur IA indépendant",
        de: "Freiberuflicher KI-Engineer",
      },
      body: {
        en: "It consolidated into one thing: AI engineering. Agents built for specific use cases, agentic and multi-agent systems, production-ready by today's best practices.",
        fr: "Tout s'est consolidé en une seule chose : l'ingénierie IA. Des agents conçus pour des cas d'usage précis, des systèmes agentiques et multi-agents, prêts pour la production selon les meilleures pratiques actuelles.",
        de: "Alles hat sich zu einer Sache verdichtet: KI-Engineering. Agenten für konkrete Anwendungsfälle, agentische und Multi-Agenten-Systeme, produktionsreif nach heutigen Best Practices.",
      },
    },
  ],
  projects: [
    {
      title: "Der Heimdall — AI Receptionist",
      href: "https://derheimdall.com",
      dates: "August 2026",
      active: true,
      description: {
        en: "A voice AI receptionist for craftsmen: answers every call 24/7 and books the client instead of losing them to voicemail, tens of thousands of euros a year saved.",
        fr: "Un réceptionniste vocal IA pour artisans : répond à chaque appel 24h/24 et décroche le rendez-vous au lieu de perdre le client — des dizaines de milliers d'euros économisés par an.",
        de: "Ein Voice-KI-Empfang für Handwerker: nimmt jeden Anruf rund um die Uhr an und bucht den Termin, statt Kunden an die Mailbox zu verlieren — zehntausende Euro Ersparnis im Jahr.",
      },
      technologies: [
        "Elevenlabs",
        "Twilio",
        "Typescript",
        "Next.js",
        "firebase",
        "resend email",
        "cloudflare",
      ],
      links: [],
      image: "/derheimdall.jpg",
      video: "",
    },
    {
      title: "AI Usage Survey",
      href: "https://survey.qartmina.com",
      dates: "August 2026",
      active: true,
      description: {
        en: "Only 5% of the world uses AI to its full potential, I had to verify that. A survey on who uses AI, what for and how often; every participant gets all the insights back.",
        fr: "Seuls 5 % du monde exploitent l'IA à fond, je devais le vérifier. Un sondage sur qui utilise l'IA, pour quoi et à quelle fréquence ; chaque participant reçoit tous les résultats.",
        de: "Nur 5 % der Welt nutzen KI voll aus, das wollte ich prüfen. Eine Umfrage dazu, wer KI nutzt, wofür und wie oft; alle Teilnehmenden bekommen sämtliche Erkenntnisse zurück.",
      },
      technologies: ["Next.js", "Typescript", "Firebase"],
      links: [
        {
          type: "Website",
          href: "https://survey.qartmina.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "3D Coffee Brand Website",
      href: "https://coffee-website-virid-zeta.vercel.app",
      dates: "2026",
      active: true,
      description: {
        en: "An animated 3D site for a Jordanian coffee brand, the bag turns and reacts as you scroll, closer to holding the product than reading about it.",
        fr: "Un site 3D animé pour une marque de café jordanienne, le paquet tourne et réagit au défilement, plus proche du produit en main que d'une page à lire.",
        de: "Eine animierte 3D-Website für eine jordanische Kaffeemarke — die Packung dreht sich beim Scrollen, näher am Produkt in der Hand als an einer Textseite.",
      },
      technologies: ["Next.js", "Three.js", "Typescript", "TailwindCSS"],
      links: [
        {
          type: "Website",
          href: "https://coffee-website-virid-zeta.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/coffee3dwebsite.jpg",
      video: "",
    },
    {
      title: "Corian Bathroom Elements Website",
      href: "https://website-gules-seven-71.vercel.app",
      dates: "2026",
      active: true,
      description: {
        en: "Site for a business selling Corian bathroom elements, washbasins, shower trays, custom pieces, built to show the catalogue and turn visitors into enquiries.",
        fr: "Site pour une entreprise d'éléments de salle de bain en Corian, vasques, receveurs, pièces sur mesure, pensé pour présenter le catalogue et générer des demandes.",
        de: "Website für einen Anbieter von Corian-Badelementen, Waschbecken, Duschtassen, Sonderanfertigungen, gebaut, um den Katalog zu zeigen und Anfragen zu erzeugen.",
      },
      technologies: ["Next.js", "Typescript", "TailwindCSS"],
      links: [
        {
          type: "Website",
          href: "https://website-gules-seven-71.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/seddik.jpg",
      video: "",
    },
    {
      title: "Weekendstack",
      href: "https://www.producthunt.com/products/weekendstack",
      dates: "July 2026",
      active: true,
      description: {
        en: "Ship a real SaaS in a weekend with your AI agent, a production-ready stack with auth, payments and infra already wired. Live on Product Hunt.",
        fr: "Lancez un vrai SaaS en un week-end avec votre agent IA, une stack prête pour la prod, auth, paiements et infra déjà câblés. En ligne sur Product Hunt.",
        de: "Bring ein echtes SaaS an einem Wochenende live, ein produktionsreifer Stack mit fertiger Auth, Payments und Infra. Jetzt auf Product Hunt.",
      },
      technologies: [
        "Typescript",
        "Next.js",
        "firebase",
        "resend email",
        "cloudflare",
      ],
      links: [
        {
          type: "Product Hunt",
          href: "https://www.producthunt.com/products/weekendstack",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/weekendstack-dev.jpg",
      video: "",
    },
    {
      title: "SaaS: Invoice Generator",
      href: "",
      dates: "July 2026",
      active: true,
      description: {
        en: "Freelancer or small business needing invoices fast? Create, send and track them in a couple of clicks.",
        fr: "Freelance ou petite entreprise pressé de facturer ? Créez, envoyez et suivez vos factures en deux clics.",
        de: "Freelancer oder kleines Unternehmen und schnell Rechnungen nötig? In zwei Klicks erstellen, senden und verfolgen.",
      },
      technologies: ["Typescript"],
      links: [
        {
          type: "Website",
          href: "https://invova.app",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/invova.jpg",
      video: "",
    },
    {
      title: "Guitar Practice Companion",
      href: "",
      dates: "May 2026",
      active: true,
      description: {
        en: "Detects the chords you play in real time (TensorFlow + audio recognition) and shows you what you're fretting, with a visual chord library to practice from.",
        fr: "Détecte en temps réel les accords que vous jouez (TensorFlow + reconnaissance audio) et montre ce que vous placez, avec une bibliothèque d'accords visuelle.",
        de: "Erkennt in Echtzeit die gespielten Akkorde (TensorFlow + Audioerkennung) und zeigt visuell, was du greifst, inklusive Akkord-Bibliothek zum Üben.",
      },
      technologies: ["Python", "Tensorflow"],
      links: [
        {
          type: "Website",
          href: "https://learn-guitarre.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/guitar.jpg",
      video: "",
    },
    {
      title: "Hannibal's Army Multi-Agent system",
      href: "",
      dates: "March 2026",
      active: true,
      description: {
        en: "A multi-agent trip planner matching you to the right destination by taste, budget and travel style, LangGraph with local LLMs via Ollama, in a polished terminal UI.",
        fr: "Un planificateur de voyage multi-agents qui trouve la destination idéale selon goûts, budget et style, LangGraph et LLM locaux via Ollama, interface terminal soignée.",
        de: "Ein Multi-Agenten-Reiseplaner, der das passende Ziel nach Vorlieben, Budget und Reisestil findet, LangGraph mit lokalen LLMs via Ollama, feine Terminal-UI.",
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
        en: "The platform behind AMLD Africa's public site and internal operations, agenda generation, certificates and daily workflows — for an event reaching 3,000+ attendees.",
        fr: "La plateforme derrière le site public et les opérations internes d'AMLD Africa, agendas, certificats, workflows quotidiens — pour un événement de 3 000+ participants.",
        de: "Die Plattform hinter AMLD Africas Website und internem Betrieb, Agenda, Zertifikate, tägliche Abläufe — für eine Veranstaltung mit über 3.000 Teilnehmenden.",
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
      image: "/amldwebsite.jpg",
      video: "",
    },
    {
      title: "AMLD Africa: Automations",
      href: "https://www.mlafrica.org/",
      dates: "Oct 2025 - Present",
      active: true,
      description: {
        en: "Anonymized speaker reviews for bias-free scoring, a pipeline that issued 1,400 certificates, and attendee email campaigns, hundreds of manual hours saved.",
        fr: "Candidatures d'intervenants anonymisées pour une évaluation sans biais, un pipeline ayant émis 1 400 certificats et des campagnes e-mail, des centaines d'heures gagnées.",
        de: "Anonymisierte Speaker-Bewerbungen für faire Bewertung, eine Pipeline mit 1.400 Zertifikaten und E-Mail-Kampagnen, hunderte manuelle Stunden gespart.",
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
