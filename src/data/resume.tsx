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
  description:
    "I'm a software engineer with a passion for building things that are genuinely helpful. I'm constantly learning to stay on top of where tech is heading, and I love sharing what I know along the way.",
  summary:
    "Creative and driven software engineer with a passion for building things and helping people. I thrive in fast-paced, international environments and have a strong interest in technology consulting and digital transformation. Beyond tech, I'm just as into sports and music: I play tennis at a competitive amateur level and produce electronic music.",
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
    { href: "/contact", icon: Contact, label: "Contact" },
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
      description:
        "AMLD Africa is a non-profit organization that aims to democratize the use of technology and AI in Africa.",
    },
  ],
  work: [
    {
      company: "Forvis Mazars Gmbh",
      href: "https://forvismazars.com/",
      badges: [],
      location: "Düsseldorf, Germany",
      title: "Fullstack Engineer",
      logoUrl: "/forvismazars.png",
      start: "May 2023",
      end: "Present",
      description:
        "Part of the Technology and Data team at this global audit and advisory firm, driving data-driven transformation. Two main projects I have worked on: a document generator and a company-wide AI chatbot. Build from the ground up, now serving 2,000+ employees across 13 locations in 3+ countries, backed by 50+ knowledge bases. Deployed Databricks infrastructure with Terraform, built Azure CI/CD pipelines, and set up monitoring and app infrastructure. Shipping features and good vibes.",
    },
    {
      company: "Adesso Gmbh",
      href: "https://adesso.com/",
      badges: [],
      location: "Düsseldorf, Germany",
      title: "Internship: Team Lead & Fullstack Developer",
      logoUrl: "/adesso.png",
      start: "Sep 2022",
      end: "Jan 2023",
      description:
        "Adesso is a leading German IT consulting company. • Led the development of a Parking Monitor for multiple Adesso parking locations across Germany • Ensured end-to-end delivery of a full-stack and IoT solution as Team Lead, following agile methodologies • Frontend angular, backend NodeRed and Arduino code for the Ultrasound sensors • Used an MQTT to trigger changes in the database and on the webUI",
    },
    {
      company: "Datalog Finance",
      href: "https://datalog-finance.com/",
      badges: [],
      location: "Paris, France",
      title: "Working Student: Web designer",
      logoUrl: "/datalog.png",
      start: "Feb 2021",
      end: "Dec 2021",
      description:
        "Redesigned the company's TMS (Treasury Management System) UI from the ground up, building the new interface with HTML, CSS and JavaScript.",
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
      title: "SaaS: Invoice Generator",
      href: "",
      dates: "July 2026",
      active: true,
      description:
        "Are you a freelancer or a small business who needs to generate invoices fast? This is your tool.",
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
      description:
        "I started learning guitar a few months ago and quickly realized that learning chords first is the fastest path to playing real songs. But finding chords and understanding how to fret them isn't easy — so I built a tool that detects the chords you play in real time (TensorFlow + audio recognition) and visually shows you what you're striking. It also includes a library of chords with visualizations so you can start practicing right away.",
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
      description:
        "A multi-agent trip planner that matches users with their perfect destination based on preferences, budget, and travel style. Built on LangGraph and local LLMs via Ollama, it pairs a polished terminal interface with an AI-powered chat system to organize trips end to end.",
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
      description:
        "Since joining AMLD Africa in July 2025, I built robust infrastructure that powers both the organization's public presence and its internal operations — supporting an event that reached 3,000+ attendees onsite, online, and through ambassador broadcasts. The platform streamlines agenda generation, certificate issuance, and the team's day-to-day workflows.",
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
      description:
        "Automations I built for AMLD Africa: anonymized speaker applications for fair, bias-free reviewer scoring; an automated certificate pipeline that generated 1,400 attendee certificates; and informational email campaigns to attendees — saving the team countless manual hours.",
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
