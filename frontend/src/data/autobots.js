// src/data/autobots.js

import prime from "../assets/autobots/prime.png";
import bumblebee from "../assets/autobots/bumblebee.png";
import ratchet from "../assets/autobots/ratchet.png";
import ironhide from "../assets/autobots/ironhide.png";
import jazz from "../assets/autobots/jazz.png";
import mirage from "../assets/autobots/mirage.png";
import wheeljack from "../assets/autobots/wheeljack.png";
import arcee from "../assets/autobots/arcee.png";
export const autobots = [
  {
    id: 1,
    name: "Prime",
    image: prime,
    role: "Chief Autobot",
    department: "Leadership",
    description:
      "Leads the entire AI workforce and coordinates all business operations across departments.",
    skills: [
      "Leadership",
      "Decision Making",
      "Planning",
      "Project Management",
    ],
  },

  {
    id: 2,
    name: "Bumblebee",
    image: bumblebee,
    role: "Marketing Specialist",
    department: "Marketing",
    description:
      "Creates marketing campaigns, social media content, and customer engagement strategies.",
    skills: [
      "Marketing",
      "Branding",
      "Communication",
      "Content Writing",
    ],
  },

  {
    id: 3,
    name: "Ratchet",
    image: ratchet,
    role: "HR Manager",
    department: "Human Resources",
    description:
      "Monitors employee well-being, onboarding, documentation, and company policies.",
    skills: [
      "Recruitment",
      "Employee Support",
      "Policy Management",
      "Documentation",
    ],
  },

  {
    id: 4,
    name: "Ironhide",
    image: ironhide,
    role: "Cybersecurity Expert",
    department: "Security",
    description:
      "Protects company systems, monitors threats, and ensures business data remains secure.",
    skills: [
      "Cyber Security",
      "Threat Detection",
      "Encryption",
      "Risk Analysis",
    ],
  },

  {
    id: 5,
    name: "Jazz",
    image: jazz,
    role: "Sales Manager",
    department: "Sales",
    description:
      "Handles customer relationships, lead generation, and sales forecasting.",
    skills: [
      "Sales",
      "CRM",
      "Negotiation",
      "Customer Success",
    ],
  },

  {
    id: 6,
    name: "Mirage",
    image: mirage,
    role: "UI/UX Designer",
    department: "Design",
    description:
      "Designs beautiful user interfaces and improves the overall user experience.",
    skills: [
      "UI Design",
      "UX Research",
      "Figma",
      "Wireframing",
    ],
  },

  {
    id: 7,
    name: "Wheeljack",
    image: wheeljack,
    role: "Software Engineer",
    department: "Engineering",
    description:
      "Builds software features, fixes bugs, and develops intelligent automation tools.",
    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "MongoDB",
    ],
  },

  {
    id: 8,
    name: "Arcee",
    image: arcee,
    role: "Customer Support Specialist",
    department: "Support",
    description:
      "Resolves customer issues, answers questions, and improves customer satisfaction.",
    skills: [
      "Support",
      "Problem Solving",
      "Communication",
      "CRM",
    ],
  },
];

export default autobots;