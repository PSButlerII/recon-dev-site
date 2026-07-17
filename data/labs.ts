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
    lessonsLearned: [
      "Manufacturing methods need to shape the enclosure architecture from the beginning.",
      "A visually appealing tambour system still needs practical installation and service access.",
      "Track geometry, door travel, and end stops need to be designed together.",
      "Universal mounting requires modular interfaces rather than permanent board-specific cutouts.",
      "Service access is easier to preserve when the raised-floor space is treated as a separate subsystem.",
      "A single CAD tool may not be ideal for both printable solids and laser-cut templates.",
      "Hinge placement needs to be tested against actual door motion rather than judged only from static renders.",
    ],
    designDecisions: [
      {
        title: "Use hybrid manufacturing",
        decision:
          "Use 3D-printed parts for the main enclosure structure and laser-cut parts for the tambour door. Each process is applied to the geometry it can produce more practically with the available equipment.",
      },
      {
        title: "Assemble the enclosure from multiple parts",
        decision:
          "Divide the enclosure into separately manufactured components. The Ender 3 V3 SE build volume and the need for replaceable, serviceable parts make a single-piece enclosure impractical.",
      },
      {
        title: "Include a raised-floor service plenum",
        decision:
          "Reserve approximately 20 mm below the main equipment area for cable management, mounting, airflow routing, and maintenance access.",
      },
      {
        title: "Use a universal SBC mounting plate",
        decision:
          "Mount boards to a replaceable under-floor plate so multiple SBC layouts can be supported without redesigning the enclosure shell.",
      },
      {
        title: "Use a modular IO shield",
        decision:
          "Keep connector openings on replaceable shields, including an ATX-style concept considered for Raspberry Pi 5 support, rather than making board-specific openings permanent.",
      },
      {
        title: "Provide an internally hinged bottom service door",
        decision:
          "Use a bottom swing-open door with internal hinges to provide broad access to the plenum while keeping hinge hardware protected and the exterior visually clean.",
      },
      {
        title: "Generate manufacturing geometry with Python and Trimesh",
        decision:
          "Prefer Python and Trimesh over an OpenSCAD-only workflow for accurate, renderable geometry and direct STL generation. OpenSCAD may remain as an optional reference format.",
      },
      {
        title: "Separate laser and print outputs",
        decision:
          "Generate SVG or DXF-style templates for laser-cut door and panel parts separately from STL structural components because the processes require different file formats and tolerances.",
      },
    ],
    tradeoffs: [
      {
        choice: "Tambour door versus hinged or removable lid",
        reason:
          "A bread-box-style tambour provides full-top access with compact opening motion, but adds track, slat, friction, stop, and assembly complexity.",
      },
      {
        choice: "Universal versus board-specific enclosure",
        reason:
          "A universal enclosure is reusable across SBC models, but requires modular mounts and IO plates and may use more space than a board-specific shell.",
      },
      {
        choice: "Wood tambour parts versus printed plastic",
        reason:
          "Wood or wood-like materials suit the available laser and provide a different appearance, but thickness, warping, friction, and laser kerf need to be managed. The final material is not selected.",
      },
      {
        choice: "Raised-floor plenum versus minimal height",
        reason:
          "The plenum improves service access, cable routing, and airflow options, but increases the enclosure's overall height and volume.",
      },
      {
        choice: "Internal versus exposed hinges",
        reason:
          "Internal hinges improve protection and keep the exterior cleaner, but are more difficult to align, clear, and manufacture.",
      },
      {
        choice: "OpenSCAD versus Python and Trimesh",
        reason:
          "OpenSCAD remains useful for parametric reference designs, while Python and Trimesh provide the programmatic geometry and output control preferred for this manufacturing workflow.",
      },
    ],
    knownLimitations: [
      "The tambour track and slat geometry still require physical validation.",
      "The final wood species and material thickness have not been selected.",
      "Laser kerf and material-specific tolerances are not finalized.",
      "The universal mounting system has not been validated across a broad range of SBCs.",
      "EMI mitigation has not been physically tested.",
      "Airflow has not been measured with the final hardware installed.",
      "The bottom service-door hinges and clearances require prototype validation.",
      "The design is not production-ready.",
      "Final printable and laser-cut file packages have not been prepared.",
    ],
    futureImprovements: [
      "Generate accurate STL components with Python and Trimesh.",
      "Generate SVG or DXF tambour and panel templates for the laser.",
      "Prototype and test track friction, clearances, door travel, and stops.",
      "Finalize the universal SBC mounting plate.",
      "Develop several modular IO-shield examples.",
      "Test airflow with representative SBCs and fans.",
      "Evaluate EMI-lining or shielding options.",
      "Validate the bottom service-door hinge design.",
      "Create an assembly guide and bill of materials.",
      "Produce a manufacturable prototype with the Ender 3 V3 SE and Creality Falcon 10W.",
    ],
    downloads: [],
    references: [],
    resources: [],
    milestones: [],
    title: "SBC Enclosure System",
    overview:
      "A modular enclosure system for multiple small-board computer models, with current working dimensions of approximately 140 × 200 × 90 mm. The design combines a multi-part 3D-printed structure, a laser-cut bread-box-style tambour door, a raised-floor service plenum, replaceable mounting and IO interfaces, and internal airflow routing.",
    currentFocus:
      "Current work is focused on producing accurate STL geometry with Python and Trimesh, defining separately installable tambour slats and visible internal tracks, correcting the internally hinged bottom service door, and developing universal SBC mounting and modular IO-shield interfaces within the available printer and laser limits.",
    futureDirection:
      "Build a manufacturable prototype, validate door travel and service access, measure airflow with representative hardware, evaluate EMI mitigation, and prepare separate printable and laser-cut outputs with assembly documentation.",
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
    lessonsLearned: [
      "Keeping email delivery and CRM synchronization separate allows website intake to continue when the CRM connection is not configured or a sync attempt fails.",
      "A stable inquiry identifier needs to cross the integration boundary so the receiving system can reject duplicate submissions.",
      "Server-to-server integration keeps CRM credentials and signing material out of browser code.",
      "Signed, timestamped requests provide the receiver with verification inputs, but replay and duplicate protection still need to be enforced by the receiving endpoint.",
      "Separating lifecycle entities preserves the distinction between an initial request, active project work, and financial records.",
      "Automatically generated activity history improves traceability without depending on users to restate each lifecycle change in a note.",
    ],
    designDecisions: [
      {
        title: "Separate business entities by lifecycle stage",
        decision:
          "Represent Clients, Service Requests, Projects, Quotes, and Invoices as separate entities because each describes a different stage of the client lifecycle. Activities and Notes provide supporting history rather than expanding one customer record indefinitely.",
      },
      {
        title: "Replace temporary client state with persistence",
        decision:
          "Move business records out of client-side temporary state so they survive reloads and can support future multi-user access.",
      },
      {
        title: "Centralize business operations in API routes",
        decision:
          "Keep the UI focused on interaction and place persistence and business rules behind explicit API operations.",
      },
      {
        title: "Make entity conversions atomic and idempotent",
        decision:
          "Treat conversions between requests, projects, quotes, and related records as single repeat-safe operations so repeated actions cannot create duplicate business records.",
      },
      {
        title: "Generate activity history automatically",
        decision:
          "Create activity records for important lifecycle changes so the system maintains traceability without requiring a separate manual note for every transition.",
      },
      {
        title: "Accept website inquiries through a server boundary",
        decision:
          "Use the public website as a future intake source through a server-to-server request. The existing website adapter sends a typed inquiry payload with bearer authorization, a timestamp, and an HMAC signature when integration is configured.",
      },
    ],
    tradeoffs: [
      {
        choice: "Internal workflow optimization versus public SaaS product",
        reason:
          "Focusing on Recon Dev's operating workflow keeps the model and interface specific to actual internal needs, but does not prioritize the tenant isolation, broad configurability, or onboarding required by a generic CRM product.",
      },
      {
        choice: "Practical simplicity versus enterprise feature depth",
        reason:
          "A smaller set of explicit workflows is easier to maintain and use, while leaving advanced enterprise features outside the current scope.",
      },
      {
        choice: "Incremental persistence migration versus complete rewrite",
        reason:
          "Incremental migration allows existing workflows to remain available while records move to durable storage, but temporarily requires coordination between migrated and remaining temporary state.",
      },
      {
        choice: "Strong typing and explicit APIs versus rapid feature additions",
        reason:
          "Typed entities and explicit operations make lifecycle boundaries and integration contracts clearer, at the cost of more design work before adding new behavior.",
      },
    ],
    knownLimitations: [
      "The website-to-CRM sync remains disabled unless all required server-side integration settings are configured.",
      "The receiving CRM endpoint is outside this repository, so its persistence, payload validation, replay protection, duplicate-inquiry enforcement, and rate limiting cannot be verified here.",
      "The website adapter logs failed CRM responses but does not provide a retry queue for unsuccessful synchronization.",
      "The CRM application, persistence schema, entity relationships, authentication, and permissions are not present in this repository and cannot be verified from this codebase.",
      "Customer portal functionality remains future work.",
    ],
    futureImprovements: [
      "Complete the migration from temporary client state to durable persistence.",
      "Move remaining business operations behind explicit API routes.",
      "Implement atomic, idempotent conversions between lifecycle entities.",
      "Generate activity records automatically for important state changes and conversions.",
      "Connect website intake to a receiving endpoint that enforces signature validation, timestamp and replay checks, payload limits, duplicate inquiry identifiers, logging, and rate limiting.",
      "Add customer portal functionality after the internal entity and permission model is established.",
      "Add reporting and analytics after the underlying records and relationships are persistent.",
    ],
    downloads: [],
    references: [],
    resources: [],
    milestones: [],
    title: "Recon Dev CRM",
    overview:
      "An internal business-management platform for Recon Dev that separates Clients, Service Requests, Projects, Quotes, Invoices, Activities, and Notes across the client lifecycle. It is intended to reduce duplicate administrative work, preserve operational history, accept website inquiries, and support future customer access without becoming a generic CRM product.",
    currentFocus:
      "Current architecture work is replacing temporary client-side state with durable persistence, keeping business operations behind explicit APIs, defining repeat-safe conversions between entities, and generating activity history for significant lifecycle changes.",
    futureDirection:
      "Complete the persistence and entity-operation foundation, connect the existing signed website-intake adapter to the receiving CRM endpoint, then add reporting and a customer portal on top of authenticated, permission-aware workflows.",
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
        date: "2026-07-05",
        type: "Build",
        title: "Website CRM request contract tightened",
        summary:
          "Updated the website adapter to require its signing configuration, use a Unix timestamp in the signature contract, and retain response details for failed server-side sync diagnostics.",
      },
      {
        date: "2026-05-19",
        type: "Documentation",
        title: "Signed intake transport documented",
        summary:
          "Added HMAC signing and timestamp headers to the website-side CRM request and documented receiver requirements for HTTPS, validation, replay protection, duplicate inquiry identifiers, payload limits, logging, and rate limiting.",
      },
      {
        date: "2026-05-17",
        type: "Build",
        title: "Structured website inquiry adapter introduced",
        summary:
          "Added a typed ContactInquiry payload, generated inquiry identifiers, CRM payload mapping, and an optional server-to-server synchronization step after email delivery.",
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

