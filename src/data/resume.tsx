import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
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
    "I'm a software engineer with a passion for building things and helping people. I love learning new things and sharing my knowledge with others.",
  summary:
    "Creative and driven software engineer with a passion for building things and helping people. I thrive in fast-paced, international environments and have a strong interest in technology consulting and digital transformation. Beside technology, I am very sports and music affine. I play tennis at a amateur pro level and I produce electronic music.",
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
  ],
  contact: {
    email: "hello@example.com",
    tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/Ferez22",
        icon: Icons.github,
        navbar: true,
      },

      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/fares-aouani-cherif",
        icon: Icons.linkedin,

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
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },
  certifications: [
    {
      name: "Microsoft Certified: Azure Developper Associate",
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
      href: "https://fe-amld-website.vercel.app/",
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
        "Build almost from ground up our company wide extended Chatbot solution. Shipping features and good vibes.",
    },
    {
      company: "Adesso Gmbh",
      href: "https://adesso.com/",
      badges: [],
      location: "Düsseldorf, Germany",
      title: "Internship: Team Lead & Fullstack Developer ",
      logoUrl: "/adesso.png",
      start: "Sep 2022",
      end: "Jan 2023",
      description:
        "Build almost from ground up our company wide extended Chatbot solution. Shipping features and good vibes.",
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
        "Build almost from ground up our company wide extended Chatbot solution. Shipping features and good vibes.",
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
      title: "AMLD Africa Tech Infrastructure",
      href: "https://fe-amld-website.vercel.app/",
      dates: "Jul 2025 - Present",
      active: true,
      description:
        "As I joined AMLD Africa in July 2025, I dedicated myself to building a robust infrastrcuture to not only have a good external image and presence but also to facilitate the team's work in generating the agenda for the event, generating certificates of attendees etc..",
      technologies: ["Next.js", "Typescript", "TailwindCSS", "Shadcn UI"],
      links: [
        {
          type: "Website",
          href: "https://fe-amld-website.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://mlafrica.org/wp-content/uploads/2026/02/Enregistrement-de-lecran-2026-02-26-a-13.36.20.mov",
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
