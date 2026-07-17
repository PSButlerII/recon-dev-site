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

export type LabDesignDecision = {
  title: string;
  decision: string;
};

export type LabTradeoff = {
  choice: string;
  reason: string;
};

export type LabLink = {
  label: string;
  href: string;
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
  designDecisions: LabDesignDecision[];
  tradeoffs: LabTradeoff[];
  knownLimitations: string[];
  futureImprovements: string[];
  downloads: LabLink[];
  references: LabLink[];
  resources: LabLink[];
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
    lessonsLearned: [
      "State-change-only serial reporting can make monitoring appear unresponsive; periodic heartbeat or status reporting provides a clearer indication that the monitor is operating.",
      "MMU lane selection and spool availability represent different states and should not share one indicator meaning.",
      "Cutter workflows must match the physical cutter architecture rather than assume a toolhead-actuated lever.",
      "Large retract values can introduce filament-handling problems even when intended to reduce oozing.",
      "Active-lane configuration is necessary to avoid empty-spool alerts for lanes that are not participating in a print.",
      "Hardware replacement should not be assumed to resolve an electrical issue until voltage behavior is tested under load.",
    ],
    designDecisions: [
      {
        title: "Separate lane and spool indication",
        decision:
          "Use the EBB42-side LEDs to identify the selected MMU lane and a separate indicator system for spool availability. These are different states: one identifies the feed path, while the other reports whether usable filament remains.",
      },
      {
        title: "Use a servo for lane selection",
        decision:
          "Keep servo-based indexed lane selection for the current design so another stepper driver and home switch are not required. The selector uses calibrated positions at 18, 44, 65, 84, 109, 126, 147, and 170 degrees, with a 0.000500-second minimum pulse width, 0.002500-second maximum pulse width, and 180-degree maximum angle.",
      },
      {
        title: "Actuate the cutter without toolhead positioning",
        decision:
          "Drive the filament cutter directly with a servo. Toolhead motion intended for a lever-style cutter is unnecessary for this mechanism and previously caused move-out-of-range errors.",
      },
      {
        title: "Use cutting instead of traditional tip forming",
        decision:
          "Disable or bypass traditional tip forming because the current filament-change workflow uses a physical cutter and does not require the additional filament manipulation.",
      },
      {
        title: "Retain a short pre-cut retraction",
        decision:
          "Use approximately 5 mm as the starting pre-cut retraction to help reduce nozzle ooze. The earlier 30 mm movement was considered excessive for this workflow.",
      },
      {
        title: "Configure spool monitoring by active lane",
        decision:
          "Allow the external spool monitor to track only lanes marked active through configuration. Not every physical spool position participates in every print, so inactive lanes should not generate alerts.",
      },
    ],
    tradeoffs: [
      {
        choice: "Servo selector versus stepper selector",
        reason:
          "A servo works with the available control hardware and avoids an additional driver and homing mechanism, but it depends on physically calibrated angles and provides no independent homing confirmation. A homed stepper could provide more deterministic indexing at the cost of more hardware and control complexity.",
      },
      {
        choice: "UART versus HTTP/Wi-Fi monitoring",
        reason:
          "UART keeps communication local and simple, but requires reliable host-side serial parsing and status reporting. HTTP/Wi-Fi creates a clearer API boundary and supports dynamic configuration, while adding networking and MicroPython service complexity.",
      },
      {
        choice: "Pico-class boards versus Raspberry Pi Zero 2 WH",
        reason:
          "Pico and Pico W boards provide low-power embedded control and direct hardware interaction. The Zero 2 WH provides a Linux environment for Flask and systemd integration, richer logging, and easier host-side development.",
      },
      {
        choice: "Combined versus separate indicators",
        reason:
          "A combined lane-selection and spool-availability indicator would reduce hardware, but its meaning would be ambiguous. Separate indicators make the selected lane and available filament state distinct.",
      },
    ],
    knownLimitations: [
      "Servo positions require physical calibration and can vary with linkage geometry.",
      "The servo selector has no independent homing confirmation.",
      "The spool monitor and MMU control system remain separate subsystems.",
      "The Wi-Fi Microdot implementation is not yet the primary completed implementation.",
      "Long-duration and multi-printer validation has not been completed.",
      "Cutter, load, unload, and filament-change behavior require continued real-print testing.",
      "Public downloads and sanitized configuration packages have not been prepared.",
    ],
    futureImprovements: [
      "Complete and validate the Pico W or Pico 2 W Microdot API implementation.",
      "Consolidate sanitized configuration and setup documentation.",
      "Improve synchronization between MMU lane state and external spool monitoring.",
      "Add more reliable notification and print-pause behavior.",
      "Perform longer real-print validation.",
      "Explore a stepper-based selector only if the required driver and homing hardware provide a meaningful reliability improvement.",
      "Create a public architecture diagram showing MMU control, cutter control, Klipper, and spool-monitor communication.",
    ],
    downloads: [],
    references: [],
    resources: [],
    milestones: [],
    title: "Pico MMU & Filament Systems",
    slug: "pico-mmu-filament-systems",
    status: "Active Development",
    overview:
      "A four-lane LH Stinger Pico MMU and filament-handling system used with a Klipper-controlled Creality Ender 3 V3 SE. The MMU connects through a BTT EBB42 V1.2 toolhead board and combines lane selection, lane indication, a servo-driven filament cutter, a toolhead-path filament sensor, and external spool-availability monitoring.",
    currentFocus:
      "The current spool-monitoring implementation uses a Raspberry Pi Zero 2 WH with GPIO sensors, LED indicators, a Flask API, timestamped JSONL logs with size-based rotation, and Klipper macros for state queries and active-lane updates. Current work also covers real-print testing of cutter and filament-change behavior and a separate Pico W or Pico 2 W API implementation using MicroPython and Microdot.",
    futureDirection:
      "Develop the Wi-Fi API approach beyond the earlier UART prototypes, improve coordination between MMU lane state and spool availability, strengthen notification and pause behavior, and prepare sanitized public setup documentation after further validation.",
    category: "3D Printing / Klipper",
    started: "2025-04",
    lastUpdated: "2026-07",
    openSource: false,
    clientFacing: false,    
    summary:
      "Research and development around multi-material printing, spool monitoring, filament sensors, lane status, and Klipper integration.",
    tags: ["3D Printing", "Klipper", "Raspberry Pi Pico", "Automation"],
    developmentLog: [],
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
    designDecisions: [],
    tradeoffs: [],
    knownLimitations: [],
    futureImprovements: [],
    downloads: [],
    references: [],
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
    designDecisions: [],
    tradeoffs: [],
    knownLimitations: [],
    futureImprovements: [],
    downloads: [],
    references: [],
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
    designDecisions: [],
    tradeoffs: [],
    knownLimitations: [],
    futureImprovements: [],
    downloads: [],
    references: [],
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
    designDecisions: [],
    tradeoffs: [],
    knownLimitations: [],
    futureImprovements: [],
    downloads: [],
    references: [],
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
    designDecisions: [],
    tradeoffs: [],
    knownLimitations: [],
    futureImprovements: [],
    downloads: [],
    references: [],
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

