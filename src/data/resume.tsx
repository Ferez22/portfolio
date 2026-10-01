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
    en: "Build systems. Skyrocket your productivity.",
    fr: "Crées des systèmes, booste ta productivité.",
    de: "Nutze Systeme, erhöhe deine Produktivität.",
  },
  summary: {
    en: "In the AI era, a lot has changed for enterprises. Priorities have shifted. Projects and ideas, that were too crazy to even think about, have become accessible. The right people with the right frameworks using AI Agents have changed what it costs to create a custom tool, start that new project, try out that idea, rebuild your whole codebase, as have done it many big companies.",
    fr: "",
    de: "",
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
      name: "OpenAI Select Partner",
      href: "https://openai.com/",
      logoUrl: "/openai-select-partner.svg",
      logoShape: "square",
      invertOnDark: true,
      date: "2026",
      credentialId: "Official OpenAI Select Partner",
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
      company: "STE Qartmina & Independant Consultant and Contractor",
      href: "https://qartmina.com/",
      badges: ["Tech"],
      location: "Online",
      title: {
        en: "Managing Partner",
        fr: "Associé gérant",
        de: "Geschäftsführender Gesellschafter",
      },
      logoUrl: "/Qartmina Logo main.png",
      start: "Oct 2026",
      end: "Present",
      description: {
        en: "STE Qartmina is a tech consultancy that provides innovative solutions for the tech industry. As Managing Partner, I am responsible for the overall strategy and direction of the company. We mainly offer Consulting in Technology and AI, helping businesses plan and start big technology projects and gain back execution time, by finding use cases for automation and AI in their employees daily workflow.",
        fr: "STE Qartmina est une société de consulting qui propose des solutions innovantes pour le secteur de la tech. En tant qu'associé gérant, je suis responsable de la stratégie et de la direction globale de l'entreprise. Nous proposons principalement du conseil en technologie et en IA, aidant les entreprises à attaquer les projets technologiques les plus demandants et  mettre en place des processus pour regagner du temps d'exécution en identifiant des cas d'usage d'automatisation et d'IA dans le quotidien de leurs employés.",
        de: "STE Qartmina ist ein Tech-Beratung, das innovative Lösungen für die Technologiebranche bietet. Als geschäftsführender Gesellschafter verantworte ich die Gesamtstrategie und Ausrichtung des Unternehmens. Wir bieten vor allem Beratung in Technologie und KI an und helfen Unternehmen, große Technologie Projekte zu planen und umzusetzen, und Ausführungszeit zurückzugewinnen, indem wir Anwendungsfälle für Automatisierung und KI im Arbeitsalltag ihrer Mitarbeitenden finden.",
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
  education: [],
  projects: [
     {
      title: "bcards.io",
      href: "https://www.bcards.io",
      dates: "Present",
      active: true,
      description: {
        en: "Your business card, shared in one scan. One profile, one QR code, one web page. Contacts save themselves in a tap, your stats follow, your team keeps one image. GDPR-compliant from day one.",
        fr: "Ta carte de visite, partagée en un scan. Un profil, un QR code, une page web. Tes contacts se sauvegardent en un geste, tes statistiques suivent, ton équipe garde une seule image. Conforme au RGPD dès le premier jour.",
        de: "Deine Visitenkarte, sehr schnell geteilt. Ein Profil,. ein QR Code, eine Webseite. Deine Kontakten sind gespeichert, deine Statistiken auch, dein Team hat ein eigenes Branding. GDPR-compliant seit dem ersten Tag.",
      },
      technologies: [
        "Next.js",
        "Railway",
        "Cronjobs",
        "und mehr"
      ],
      links: [
        {
          type: "Website",
          href: "https://www.mlafrica.org",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/bcards-logo.png",
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
