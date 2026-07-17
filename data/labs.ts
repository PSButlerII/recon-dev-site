import type { LabCategory } from "@/data/lab-categories";
import type {
  EngineeringLifecycle,
  EngineeringLifecyclePhase,
} from "@/data/engineering-lifecycle";


export type LabMilestone = {
  id: string;
  title: string;
  completed: boolean;
  completedOn?: string;
  notes?: string;
};

export type LabProjectStatus =
  | "Concept"
  | "Research"
  | "Prototype"
  | "Active Development"
  | "Internal Tool"
  | "Client Work / In Progress"
  | "Production"
  | "Archived";

export type LabProject = {
  title: string;
  slug: string;
  status: LabProjectStatus;
  category: LabCategory;
  started: string;
  lastUpdated: string;
  openSource: boolean;
  clientFacing: boolean;
  summary: string;
  overview: string;
  currentFocus: string;
  futureDirection: string;
  tags: string[];
  developmentLog: LabDevelopmentLogEntry[];
  lessonsLearned: string[];
  resources: {
    label: string;
    href: string;
  }[];
  milestones: LabMilestone[];
  engineeringLifecycle: EngineeringLifecycle;
};

export type LabLogType =
  | "Research"
  | "Prototype"
  | "Testing"
  | "Decision"
  | "Build"
  | "Documentation"
  | "Release";

export type LabDevelopmentLogEntry = {
  date: string;
  type: LabLogType;
  phase?: EngineeringLifecyclePhase;
  title: string;
  summary: string;
};

export const labProjects: LabProject[] = [
  {
    lessonsLearned: [],
    resources: [],
    milestones: [],
    title: "Pico MMU & Filament Systems",
    slug: "pico-mmu-filament-systems",
    status: "Active Development",
    overview:
      "Research and development around multi-material printing, spool monitoring, filament sensors, lane status, and Klipper integration.",
    currentFocus:
      "Exploring integration strategies for the Pico MMU with existing Klipper firmware and developing sensor feedback mechanisms.",
    futureDirection:
      "Expand the system to support additional filament types and improve the user interface for better monitoring and control.",
    category: "3D Printing / Klipper",
    started: "2025-04",
    lastUpdated: "2026-07",
    openSource: false,
    clientFacing: false,    
    summary:
      "Research and development around multi-material printing, spool monitoring, filament sensors, lane status, and Klipper integration.",
    tags: ["3D Printing", "Klipper", "Raspberry Pi Pico", "Automation"],
    developmentLog: [
      {
        date: "2026-07-15",
        type: "Research",
        title: "Initial Research on Multi-Material Printing",
        summary:
          "Conducted a comprehensive review of existing multi-material printing solutions and identified key areas for improvement.",
      },
      {
        date: "2026-07-25",
        type: "Prototype",
        title: "Prototype Development for Filament Sensor System",
        summary:
          "Developed a functional prototype of the filament sensor system to test its feasibility and performance.",
      }
    ],
    engineeringLifecycle: {
  discovery: true,
  research: true,
  planning: true,
  prototype: true,
  validation: false,
  documentation: false,
  release: false,
  maintenance: false,
},
  },
  {
    lessonsLearned: [],
    resources: [],
    milestones: [],
    title: "SBC Enclosure System",
    overview:
      "A modular small-board-computer enclosure concept using 3D printing, laser-cut panels, airflow planning, and serviceable internal layouts.",
    currentFocus:
      "Designing and testing the physical structure and internal components for optimal performance and ease of maintenance.",
    futureDirection:
      "Refining the design based on feedback and testing results, with plans for mass production and distribution.",
    slug: "sbc-enclosure-system",
    status: "Prototype",
    category: "Product Design",
    started: "2025-01",
    lastUpdated: "2026-07",
    openSource: false,
    clientFacing: false,
    summary:
      "A modular small-board-computer enclosure concept using 3D printing, laser-cut panels, airflow planning, and serviceable internal layouts.",
    tags: ["Product Design", "3D Printing", "Laser Cutting", "SBC"],
    developmentLog: [
      {
        date: "2026-07-10",
        type: "Prototype",
        title: "Initial Prototype Testing",
        summary:
          "Tested the initial prototype of the SBC enclosure system to evaluate its performance and identify areas for improvement.",
      },
      {
        date: "2026-07-20",
        type: "Research",
        title: "Material Selection and Testing",
        summary:
          "Evaluated various materials for the SBC enclosure system based on thermal properties, durability, and manufacturability.",
      },
      
    ],
    engineeringLifecycle: {
  discovery: true,
  research: true,
  planning: true,
  prototype: true,
  validation: false,
  documentation: false,
  release: false,
  maintenance: false,
},
  },
  {
    lessonsLearned: [],
    resources: [],
    milestones: [],
    title: "CoreXY Conversion Framework",
    overview:
      "Exploration of a generalized framework for converting common Cartesian 3D printers into CoreXY-style machines.",
    currentFocus:
      "Developing the theoretical foundation and practical implementation strategies for the CoreXY conversion framework.",
    futureDirection:
      "Expanding the framework to include more printer models and improving the user experience for developers and users.",
    slug: "corexy-conversion-framework",
    status: "Research",
    category: "Mechanical Systems",
    started: "2026-06",
    lastUpdated: "2026-07",
    openSource: false,
    clientFacing: false,
    summary:
      "Exploration of a generalized framework for converting common Cartesian 3D printers into CoreXY-style machines.",
    tags: ["Mechanical Design", "Research", "3D Printing"],
    developmentLog: [
      {
        date: "2026-07-15",
        type: "Research",
        title: "Initial Research on CoreXY Conversion",
        summary:
          "Conducted a comprehensive review of existing CoreXY conversion methods and identified key challenges and opportunities.",
      },
      {
        date: "2026-07-25",
        type: "Prototype",
        title: "Prototype Development for CoreXY Conversion",
        summary:
          "Developed a functional prototype of the CoreXY conversion framework to test its feasibility and performance.",
      }
    ],
    engineeringLifecycle: {
  discovery: true,
  research: true,
  planning: true,
  prototype: true,
  validation: false,
  documentation: false,
  release: false,
  maintenance: false,
},
  },
  {
    lessonsLearned: [],
    resources: [],
    milestones: [],
    title: "Recon Dev CRM",
    overview:
      "A custom business management system for clients, service requests, projects, invoices, quotes, and future website intake integration.",
    currentFocus:
      "Developing and refining the CRM system to meet the evolving needs of Recon Dev's client base.",
    futureDirection:
      "Integrating with the existing website and expanding functionality to include advanced reporting and analytics.",
    slug: "recon-dev-crm",
    status: "Internal Tool",
    category: "Business Systems",
    started: "2026-05",
    lastUpdated: "2026-07",
    openSource: false,
    clientFacing: false,
    summary:
      "A custom business management system for clients, service requests, projects, invoices, quotes, and future website intake integration.",
    tags: ["Next.js", "CRM", "Internal Systems", "Automation"],
    developmentLog: [
      {
        date: "2026-07-10",
        type: "Research",
        title: "Initial Research on CRM Features",
        summary:
          "Conducted a comprehensive review of existing CRM solutions and identified key features and functionalities.",
      }
    ],
    engineeringLifecycle: {
  discovery: true,
  research: true,
  planning: true,
  prototype: true,
  validation: false,
  documentation: false,
  release: false,
  maintenance: false,
},
  },
  {
    lessonsLearned: [],
    resources: [],
    milestones: [],
    title: "PERRLA Reference Extractor",
    overview:
      "A document-processing concept for extracting structured reference data from Word/PERRLA documents into JSON and RIS formats.",
    currentFocus:
      "Developing the extraction logic and validating the output against the required formats.",
    futureDirection:
      "Enhancing the accuracy of the extraction process and adding support for additional document types.",
    slug: "perrla-reference-extractor",
    status: "Concept",
    category: "Document Processing",
    started: "2026-06",
    lastUpdated: "2026-07",
    openSource: false,
    clientFacing: false,
    summary:
      "A document-processing concept for extracting structured reference data from Word/PERRLA documents into JSON and RIS formats.",
    tags: ["Python", "Document Processing", "Research Tools"],
    developmentLog: [
      {
        date: "2026-07-10",
        type: "Research",
        title: "Initial Research on Reference Extraction",
        summary:
          "Conducted a comprehensive review of existing reference extraction methods and identified key challenges and opportunities.",
      }
    ],
    engineeringLifecycle: {
  discovery: true,
  research: true,
  planning: true,
  prototype: true,
  validation: false,
  documentation: false,
  release: false,
  maintenance: false,
},
  },
  {
    lessonsLearned: [],
    resources: [],
    milestones: [],
    title: "Food Service Platform",
    overview:
      "A custom meal-prep, catering, and personal-chef web platform with ordering, admin tools, scheduling, and approval workflows.",
    currentFocus:
      "Developing the platform's core features and user interface to meet the needs of both customers and administrators.",
    futureDirection:
      "Expanding the platform's capabilities to include more advanced scheduling options, integration with third-party services, and enhanced reporting features.",
    slug: "food-service-platform",
    status: "Client Work / In Progress",
    category: "Client Web Application",
    started: "2026-05",
    lastUpdated: "2026-07",
    openSource: false,
    clientFacing: true,
    summary:
      "A custom meal-prep, catering, and personal-chef web platform with ordering, admin tools, scheduling, and approval workflows.",
    tags: ["Next.js", "Food Service", "Admin Tools", "Workflow"],
    developmentLog: [
      {
        date: "2026-07-10",
        type: "Research",
        title: "Initial Research on Food Service Platform",
        summary:
          "Conducted a comprehensive review of existing food service platforms and identified key features and functionalities.",
      },
      {
        date: "2026-07-20",
        type: "Prototype",
        title: "Prototype Development for Food Service Platform",
        summary:
          "Developed a functional prototype of the food service platform to test its feasibility and performance.",

      }
    ],
    engineeringLifecycle: {
  discovery: true,
  research: true,
  planning: true,
  prototype: true,
  validation: false,
  documentation: false,
  release: false,
  maintenance: false,
},
  },
];

