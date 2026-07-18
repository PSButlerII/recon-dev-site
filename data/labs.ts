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
      "Database uniqueness and transaction boundaries are necessary for repeat-safe conversions; interface controls alone do not prevent duplicate records under retries or concurrent requests.",
      "Separating intake, service requests, projects, quotes, and invoices makes lifecycle state explicit and allows each transition to be validated independently.",
      "Moving persistence and conversion logic behind server APIs keeps database access out of client components and gives business operations a consistent enforcement point.",
      "Automatically created activity records improve traceability for selected transitions, but they do not yet constitute a complete immutable audit system.",
      "Incremental persistence migrations preserve working workflows, but intermediate documentation and temporary data sources must be retired or clearly marked as the system evolves.",
      "A signed server-to-server intake contract protects integration secrets from browser code, while duplicate and replay controls still need enforcement at the receiving API boundary.",
    ],
    designDecisions: [
      {
        title: "Model lifecycle stages as separate records",
        decision:
          "Represent intake submissions, service requests, clients, projects, quotes, invoices, tasks, notes, files, activity, and settings as distinct persisted entities. This keeps the responsibilities and status of each business stage explicit.",
      },
      {
        title: "Persist business records in PostgreSQL",
        decision:
          "Use Prisma-backed PostgreSQL storage as the system of record instead of relying on temporary browser state. Client-side context hydrates the workspace through protected JSON APIs.",
      },
      {
        title: "Keep database operations behind route handlers",
        decision:
          "Place authentication, validation, persistence, and conversion operations in Next.js route handlers so client components do not access the database or server secrets directly.",
      },
      {
        title: "Enforce repeat-safe lifecycle conversions",
        decision:
          "Use unique database links and duplicate-aware operations for intake-to-request, request-to-project, and quote-to-invoice transitions. The request-to-project path also groups project creation, request status, and activity creation in one transaction.",
      },
      {
        title: "Protect the workspace with owner sessions",
        decision:
          "Use server-verified owner credentials and a signed, expiring HTTP-only cookie for the current single-owner workspace. Multi-user identity and role models are not part of the implemented system.",
      },
      {
        title: "Treat website intake as an integration boundary",
        decision:
          "Accept external website inquiries through a dedicated server-to-server endpoint that requires bearer authorization, a timestamped HMAC signature, payload validation, and a stable inquiry identifier. This bridge feeds the CRM intake subsystem; it is not the CRM application itself.",
      },
    ],
    tradeoffs: [
      {
        choice: "Single Next.js application versus separate services",
        reason:
          "Keeping the UI, internal APIs, authentication, and persistence adapter in one application simplifies deployment and allows direct transaction handling, but couples the workspace and API contracts within one codebase.",
      },
      {
        choice: "Single-owner authentication versus named users",
        reason:
          "A shared owner credential and stateless signed session match the current internal audience and avoid user/session tables, but provide no roles, per-user revocation, or actor-specific audit attribution.",
      },
      {
        choice: "Incremental persistence migration versus complete rewrite",
        reason:
          "Entity-by-entity migrations preserve working features and produce an auditable schema history, but leave legacy mock data and historical documentation that can become inconsistent with current behavior.",
      },
      {
        choice: "Global client context versus page-specific loading",
        reason:
          "Loading the CRM collections into one shared context gives pages a consistent data surface, but every authenticated page fetches all resources and shares a coarse loading and error state.",
      },
      {
        choice: "Local file storage versus shared durable storage",
        reason:
          "Writing authenticated uploads to the application server is straightforward for a single durable host, but it does not provide atomic file-and-metadata writes or support ephemeral and multi-instance deployments without shared storage.",
      },
    ],
    knownLimitations: [
      "The repository has no automated test suite or test script for authentication, persistence, billing, or conversion workflows.",
      "Most cross-entity links are nullable string identifiers without database foreign keys, and copied display names can become stale.",
      "Runtime validation is inconsistent across protected APIs; the public intake boundary has stronger schema and payload-size validation than many internal routes.",
      "Authentication supports one owner credential and does not include login throttling, named users, roles, permissions, or per-user session revocation.",
      "Uploaded files use local server storage, are not content-allowlisted or malware-scanned, and require durable shared storage for multi-instance operation.",
      "The global client context fetches all CRM resources for every authenticated page and does not expose resource-specific failure states.",
      "Production readiness is not demonstrated by automated tests, continuous integration, observability, health checks, restore exercises, or rollback automation.",
    ],
    futureImprovements: [
      "Add integration tests for authentication, unauthorized API access, public intake validation, and concurrent lifecycle conversions, then make tests part of continuous integration.",
      "Adopt shared runtime schemas and consistent error mapping for internal create and update routes.",
      "Apply the transactional, duplicate-aware conversion pattern consistently to intake-to-request and quote-to-invoice workflows.",
      "Define relationship ownership and add database foreign keys incrementally where orphaned records are not intentional.",
      "Move billing amounts to fixed-precision storage before invoices become an authoritative financial record.",
      "Introduce durable shared file storage, cleanup behavior, retention rules, and file-content controls.",
      "Split workspace data loading by page or domain and provide clear partial-failure states.",
      "Add login throttling, structured operational logging, health checks, and documented recovery procedures.",
      "Retain the signed website intake bridge and validate the end-to-end integration without exposing credentials or personal inquiry data.",
    ],
    downloads: [],
    references: [],
    resources: [],
    milestones: [],
    title: "Recon Dev CRM",
    overview:
      "Recon Dev CRM is a single-owner internal business-operations application for managing intake submissions, service requests, clients, projects, tasks, notes, files, quotes, invoices, settings, and activity. The Next.js workspace uses protected server APIs and Prisma-backed PostgreSQL persistence to carry work from inquiry through delivery and billing. A signed website contact-intake bridge is one input to this system, not the system itself.",
    currentFocus:
      "Current engineering work is centered on making persisted workflows consistent: standardizing runtime validation, completing transactional and idempotent conversion paths, strengthening relational integrity, and establishing automated coverage for authentication, intake, billing, and project conversion behavior.",
    futureDirection:
      "The next direction is operational hardening rather than feature expansion: improve test and deployment controls, adopt durable shared file storage, refine page-level data loading, and validate the website-to-CRM intake path end to end. Named users or broader integrations should be considered only if a confirmed operating need extends beyond the current single-owner model.",
    slug: "recon-dev-crm",
    status: "Internal Tool",
    category: "Business Systems",
    started: "2026-05",
    lastUpdated: "2026-07",
    openSource: false,
    clientFacing: false,
    summary:
      "A PostgreSQL-backed internal CRM for intake, client work, project delivery, billing records, files, and operational history.",
    tags: ["Next.js", "PostgreSQL", "Prisma", "CRM", "Internal Systems"],
    developmentLog: [
      {
        date: "2026-07-06",
        type: "Build",
        phase: "prototype",
        title: "Intake workflow visibility improved",
        summary:
          "Polished the website-submission intake workflow and added the count of new intake records to the authenticated workspace navigation.",
      },
      {
        date: "2026-07-01",
        type: "Build",
        phase: "prototype",
        title: "Protected public intake and file persistence added",
        summary:
          "Added the authenticated server-to-server intake endpoint, synchronized accepted website inquiries into CRM intake, introduced local file uploads, and documented owner authentication and production deployment requirements.",
      },
      {
        date: "2026-06-30",
        type: "Build",
        phase: "prototype",
        title: "Core persistence conversions strengthened",
        summary:
          "Moved client workflows onto PostgreSQL-backed APIs and added a transactional, idempotent service-request-to-project conversion guarded by a unique project link.",
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

