import {
  Building2,
  Cable,
  Cctv,
  Clapperboard,
  Database,
  DoorOpen,
  Flame,
  Home,
  Mic,
  MonitorPlay,
  Phone,
  Radio,
  Server,
  Shield,
  Siren,
  Speaker,
  SquareStack,
  Theater,
  Video,
  Wifi,
  type LucideIcon,
} from "lucide-react";

export type DomainId =
  | "security-access"
  | "communication"
  | "audio-visual"
  | "networking-data"
  | "automation-safety";

export type DomainCapability = {
  id: string;
  title: string;
  summary: string;
  points: string[];
  icon: LucideIcon;
};

export type DomainPrinciple = {
  title: string;
  detail: string;
  icon: LucideIcon;
};

export type DomainPhase = {
  number: string;
  title: string;
  detail: string;
};

export type DomainConfig = {
  id: DomainId;
  path: string;
  navLabel: string;
  eyebrow: string;
  heroLines: [string, string];
  heroCopy: string;
  heroCta: string;
  systems: { label: string; icon: LucideIcon }[];
  capabilitiesIntro: { title: string; subtitle: string; copy: string };
  capabilities: DomainCapability[];
  approachIntro: { title: string; subtitle: string; copy: string };
  principles: DomainPrinciple[];
  phasesTitle: string;
  phases: DomainPhase[];
  cta: {
    eyebrow: string;
    title: string;
    subtitle: string;
    copy: string;
    icon: LucideIcon;
  };
  related: { label: string; href: string }[];
};

export const domains: Record<DomainId, DomainConfig> = {
  "security-access": {
    id: "security-access",
    path: "/solutions/security-access",
    navLabel: "Security & Access",
    eyebrow: "Solutions · Security & Access",
    heroLines: ["Integrated protection", "for people, premises and assets."],
    heroCopy:
      "CCTV, access control, intrusion, barriers and video door phones designed as one defensive layer — monitored, documented and supportable after handover.",
    heroCta: "Scope a security system",
    systems: [
      { label: "CCTV Surveillance", icon: Cctv },
      { label: "Access Control", icon: DoorOpen },
      { label: "Intrusion Alarm", icon: Siren },
      { label: "Boom Barrier", icon: SquareStack },
      { label: "Video Door Phone", icon: Shield },
    ],
    capabilitiesIntro: {
      title: "Five systems.",
      subtitle: "One security layer.",
      copy: "Each capability can stand alone — or combine into a site-wide security architecture with shared monitoring and service.",
    },
    capabilities: [
      {
        id: "cctv",
        title: "CCTV Surveillance",
        summary:
          "IP camera architecture with the right mix of fixed, PTZ and analytic-ready views — designed for coverage, retention and usable evidence.",
        points: [
          "IP CCTV design & BOQ",
          "Indoor / outdoor coverage plans",
          "NVR / VMS recording strategy",
          "Remote monitoring readiness",
          "Analytics-ready camera selection",
          "Storage & retention sizing",
        ],
        icon: Cctv,
      },
      {
        id: "access",
        title: "Access Control",
        summary:
          "Door, turnstile and zone control for staff, visitors and restricted areas — with clear anti-passback and audit trails where required.",
        points: [
          "Card / biometric readers",
          "Controller & door hardware",
          "Visitor vs staff zoning",
          "Time-based access rules",
          "Elevator / wing control",
          "Event logs & reports",
        ],
        icon: DoorOpen,
      },
      {
        id: "intrusion",
        title: "Intrusion Alarm",
        summary:
          "Detection layers for perimeter and interiors — integrated with response procedures, not isolated siren boxes.",
        points: [
          "PIR / magnetic contacts",
          "Perimeter detection options",
          "Zone programming",
          "Alarm panel integration",
          "Armed / disarmed schedules",
          "Notification paths",
        ],
        icon: Siren,
      },
      {
        id: "barrier",
        title: "Boom Barrier",
        summary:
          "Vehicle entry control for campuses, plants and parking — coordinated with access credentials and guard workflows.",
        points: [
          "Barrier & loop design",
          "RFID / ANPR options",
          "Guard booth integration",
          "Safety edges & sensors",
          "Entry / exit logic",
          "Service access planning",
        ],
        icon: SquareStack,
      },
      {
        id: "vdp",
        title: "Video Door Phone",
        summary:
          "Visitor verification at residences, lobbies and gated entries — with indoor stations and optional mobile connectivity.",
        points: [
          "Villa / apartment VDP",
          "Lobby & gate stations",
          "Indoor monitor layout",
          "Door release integration",
          "Multi-unit wiring plans",
          "Upgrade paths to IP",
        ],
        icon: Shield,
      },
    ],
    approachIntro: {
      title: "Security engineered",
      subtitle: "as infrastructure.",
      copy: "Not a pile of cameras and readers — a designed system with clear coverage logic, network discipline and service continuity.",
    },
    principles: [
      {
        title: "Coverage before catalogue",
        detail:
          "Camera and sensor placement starts from risk zones, sightlines and operations — not from a product list.",
        icon: Cctv,
      },
      {
        title: "Shared backbone",
        detail:
          "CCTV, access and alarms planned on one network/power strategy so pathways and racks stay coherent.",
        icon: Cable,
      },
      {
        title: "Response-ready design",
        detail:
          "Monitoring, alerts and door logic designed for how guards and admins actually work on site.",
        icon: Siren,
      },
      {
        title: "Documented handover",
        detail:
          "As-built views, credential matrices and device records so service is not tribal knowledge.",
        icon: Shield,
      },
    ],
    phasesTitle: "Delivery sequence",
    phases: [
      {
        number: "01",
        title: "Survey & risk map",
        detail: "Entries, perimeters, high-value zones and workflow constraints.",
      },
      {
        number: "02",
        title: "Architecture & BOQ",
        detail: "Camera schedule, access points, storage sizing, power and network.",
      },
      {
        number: "03",
        title: "Install & commission",
        detail: "Staged installation, testing, user training and live cutover.",
      },
      {
        number: "04",
        title: "Operate & maintain",
        detail: "AMC visits, corrective SLA and OEM escalation when needed.",
      },
    ],
    cta: {
      eyebrow: "Security consultation",
      title: "Need a security layer",
      subtitle: "that holds on site?",
      copy: "Share site type, risk zones and whether you need CCTV, access, intrusion, barriers or a full stack — we'll return a clear design path.",
      icon: Shield,
    },
    related: [
      { label: "Communication", href: "/solutions/communication" },
      { label: "Networking & Data", href: "/solutions/networking-data" },
      { label: "Automation & Safety", href: "/solutions/automation-safety" },
      { label: "AMC & Support", href: "/amc-support" },
    ],
  },
  communication: {
    id: "communication",
    path: "/solutions/communication",
    navLabel: "Communication",
    eyebrow: "Solutions · Communication",
    heroLines: ["Connected communication", "across every environment."],
    heroCopy:
      "EPABX / IP PBX, intercom, public address, video conferencing and distribution links — designed for clear operations, not isolated handsets.",
    heroCta: "Scope communication systems",
    systems: [
      { label: "Intercom / EPABX", icon: Phone },
      { label: "Video Conferencing", icon: Video },
      { label: "Public Address", icon: Mic },
      { label: "FTTH / DTH", icon: Radio },
    ],
    capabilitiesIntro: {
      title: "Voice, paging and",
      subtitle: "meeting systems.",
      copy: "Four communication pillars from the Solutions menu — each designed to connect cleanly with networking and security where the brief requires it.",
    },
    capabilities: [
      {
        id: "epabx",
        title: "Intercom / EPABX",
        summary:
          "Voice infrastructure for offices, plants and campuses — IP or hybrid PBX with extensions, trunking and intercom paths that match how teams actually call.",
        points: [
          "EPABX / IP PBX design",
          "Extension & trunk planning",
          "Analog / IP intercom",
          "Operator console options",
          "Call routing & groups",
          "Integration with PA where needed",
        ],
        icon: Phone,
      },
      {
        id: "vc",
        title: "Video Conferencing",
        summary:
          "Meeting-room and boardroom VC that stays reliable — displays, codecs, cameras and network readiness sized for daily use, not demo day only.",
        points: [
          "Room size & layout design",
          "Camera & mic placement",
          "Codec / platform readiness",
          "Display & switching path",
          "Network QoS guidance",
          "User control simplicity",
        ],
        icon: Video,
      },
      {
        id: "pa",
        title: "Public Address",
        summary:
          "Zoned announcement systems for campuses, hospitals, factories and public buildings — clear speech coverage with emergency paging paths.",
        points: [
          "Zone mapping",
          "Speaker layout & SPL targets",
          "Amplifier & rack design",
          "Emergency paging inputs",
          "Background music options",
          "Integration with fire / EVAC",
        ],
        icon: Mic,
      },
      {
        id: "ftth",
        title: "FTTH / DTH",
        summary:
          "Distribution links for residential and multi-dwelling environments — fibre and DTH pathways planned with building risers and unit terminations.",
        points: [
          "FTTH pathway design",
          "DTH dish & multi-switch",
          "Riser & shaft planning",
          "Unit termination points",
          "Active equipment placement",
          "Service provider coordination",
        ],
        icon: Radio,
      },
    ],
    approachIntro: {
      title: "Communication designed",
      subtitle: "for daily operations.",
      copy: "Every extension, zone and meeting room should match how the site runs — shift changes, emergencies, guest flows and management calls included.",
    },
    principles: [
      {
        title: "Zones before speakers",
        detail:
          "PA and intercom coverage starts from operational zones — wards, floors, yards, lobbies — not from device count.",
        icon: Mic,
      },
      {
        title: "Speech clarity first",
        detail: "Paging and room audio sized for intelligibility. Loud is not the same as clear.",
        icon: Radio,
      },
      {
        title: "Pathway discipline",
        detail:
          "Voice, video and distribution links share planned risers and racks with the wider ELV backbone.",
        icon: Cable,
      },
      {
        title: "Operator-simple controls",
        detail:
          "Consoles, room panels and paging stations designed so staff can run them without a specialist on call.",
        icon: Phone,
      },
    ],
    phasesTitle: "Delivery sequence",
    phases: [
      {
        number: "01",
        title: "Use-case mapping",
        detail: "Who calls whom, which zones need paging, which rooms need VC.",
      },
      {
        number: "02",
        title: "System architecture",
        detail: "PBX/intercom topology, PA zones, VC rooms, FTTH/DTH paths.",
      },
      {
        number: "03",
        title: "Install & tune",
        detail: "Hardware, cabling, acoustic checks and operator training.",
      },
      {
        number: "04",
        title: "Support continuity",
        detail: "AMC coverage, spares logic and escalation for critical voice systems.",
      },
    ],
    cta: {
      eyebrow: "Communication consultation",
      title: "Need clear voice and",
      subtitle: "paging across the site?",
      copy: "Share building type, zone count and whether you need EPABX, PA, intercom, VC or distribution links — we'll outline a practical system path.",
      icon: Radio,
    },
    related: [
      { label: "Security & Access", href: "/solutions/security-access" },
      { label: "Audio Visual", href: "/solutions/audio-visual" },
      { label: "Networking & Data", href: "/solutions/networking-data" },
      { label: "AMC & Support", href: "/amc-support" },
    ],
  },
  "audio-visual": {
    id: "audio-visual",
    path: "/solutions/audio-visual",
    navLabel: "Audio Visual",
    eyebrow: "Solutions · Audio Visual",
    heroLines: ["Immersive AV systems", "engineered around the space."],
    heroCopy:
      "Home theatre, professional audio, digital signage and auditorium systems — image, sound and control designed for daily reliability, not one-time demos.",
    heroCta: "Scope an AV system",
    systems: [
      { label: "Home Theatre", icon: Clapperboard },
      { label: "Professional Audio", icon: Speaker },
      { label: "Digital Signage", icon: MonitorPlay },
      { label: "Auditorium", icon: Theater },
    ],
    capabilitiesIntro: {
      title: "Image, sound and",
      subtitle: "control — by space.",
      copy: "Four AV pillars from the Solutions menu — each scoped to the room type and how people actually use it every day.",
    },
    capabilities: [
      {
        id: "home-theatre",
        title: "Home Theatre",
        summary:
          "Residential cinema and media rooms — display, audio and control planned for the room geometry so picture and sound stay consistent every night.",
        points: [
          "Room layout & viewing geometry",
          "Display / projector selection",
          "Surround & immersive audio",
          "Acoustic treatment guidance",
          "Source & switching design",
          "Simple daily control",
        ],
        icon: Clapperboard,
      },
      {
        id: "pro-audio",
        title: "Professional Audio",
        summary:
          "Reinforcement and distributed audio for halls, lobbies, restaurants and event spaces — intelligibility and coverage over volume alone.",
        points: [
          "Coverage & SPL planning",
          "Speaker & amp selection",
          "Mixer / DSP design",
          "Zone & source routing",
          "Live / fixed install options",
          "Rack & cabling standards",
        ],
        icon: Speaker,
      },
      {
        id: "signage",
        title: "Digital Signage",
        summary:
          "Wayfinding, brand and information displays for campuses, retail and corporate lobbies — players, screens and content paths under one design.",
        points: [
          "Screen placement & sizing",
          "Media player architecture",
          "Content scheduling path",
          "Network readiness",
          "Multi-site content control",
          "Mounting & power planning",
        ],
        icon: MonitorPlay,
      },
      {
        id: "auditorium",
        title: "Auditorium",
        summary:
          "Integrated image and sound for auditoriums, seminar halls and large meeting spaces — projection, reinforcement and control as one system.",
        points: [
          "Projection / LED design",
          "Speech reinforcement",
          "Stage / lectern inputs",
          "Recording & streaming options",
          "Control system logic",
          "Operator training",
        ],
        icon: Theater,
      },
    ],
    approachIntro: {
      title: "AV that works",
      subtitle: "every ordinary day.",
      copy: "The goal is not a spectacular opening day — it is a room staff and guests can run reliably without constant specialist support.",
    },
    principles: [
      {
        title: "Space before product",
        detail:
          "Room size, seating, ambient light and use pattern define the system — catalogue comes second.",
        icon: Theater,
      },
      {
        title: "Sightlines & geometry",
        detail:
          "Display height, throw distance and viewing cones planned so every seat gets a usable image.",
        icon: MonitorPlay,
      },
      {
        title: "Coverage over loudness",
        detail:
          "Audio designed for even coverage and speech clarity across the zone, not peak volume at one point.",
        icon: Speaker,
      },
      {
        title: "Controls people will use",
        detail:
          "Simple source select, volume and scene recall — so the room works without an AV specialist present.",
        icon: Clapperboard,
      },
    ],
    phasesTitle: "Delivery sequence",
    phases: [
      {
        number: "01",
        title: "Brief & room study",
        detail: "Purpose, capacity, ambient conditions and control expectations.",
      },
      {
        number: "02",
        title: "AV architecture",
        detail: "Display, audio, sources, switching, racks and network needs.",
      },
      {
        number: "03",
        title: "Install & calibrate",
        detail: "Mounting, cabling, image/audio tuning and operator walkthrough.",
      },
      {
        number: "04",
        title: "Operate & support",
        detail: "Handover docs, AMC coverage and escalation for critical rooms.",
      },
    ],
    cta: {
      eyebrow: "AV consultation",
      title: "Have a room that needs",
      subtitle: "to perform every day?",
      copy: "Boardroom, auditorium, lobby signage or home theatre — share room type, capacity and use pattern. We'll outline a practical AV path.",
      icon: MonitorPlay,
    },
    related: [
      { label: "Communication", href: "/solutions/communication" },
      { label: "Networking & Data", href: "/solutions/networking-data" },
      { label: "Automation & Safety", href: "/solutions/automation-safety" },
      { label: "AMC & Support", href: "/amc-support" },
    ],
  },
  "networking-data": {
    id: "networking-data",
    path: "/solutions/networking-data",
    navLabel: "Networking & Data",
    eyebrow: "Solutions · Networking & Data",
    heroLines: ["Reliable infrastructure", "for connected operations."],
    heroCopy:
      "Structured cabling, fibre, Wi-Fi, server rooms and data-centre pathways — the backbone under every ELV layer, sized for cameras, voice, AV and business traffic together.",
    heroCta: "Scope network infrastructure",
    systems: [
      { label: "Structured Cabling", icon: Cable },
      { label: "Fiber / Wi-Fi / RF", icon: Wifi },
      { label: "Server Room", icon: Server },
      { label: "Data Centre", icon: Database },
    ],
    capabilitiesIntro: {
      title: "The layer every",
      subtitle: "ELV system rides on.",
      copy: "Cabling, wireless, server rooms and data-centre pathways — engineered so security, voice and AV do not fight the network.",
    },
    capabilities: [
      {
        id: "cabling",
        title: "Structured Cabling",
        summary:
          "Copper backbone and horizontal pathways designed for today's ELV + IT loads — with room to grow without tearing walls open again.",
        points: [
          "Cat6 / Cat6A design",
          "Floor & riser pathways",
          "Patch panel standards",
          "Testing & certification",
          "Labeling & documentation",
          "PoE load planning",
        ],
        icon: Cable,
      },
      {
        id: "wireless",
        title: "Fiber / Wi-Fi / RF",
        summary:
          "Fibre backbones, wireless coverage and RF links where copper is not enough — survey-led, not guesswork.",
        points: [
          "Fibre backbone design",
          "Wi-Fi survey & heatmaps",
          "AP placement strategy",
          "Outdoor / RF links",
          "SSID & VLAN guidance",
          "Interference awareness",
        ],
        icon: Wifi,
      },
      {
        id: "server-room",
        title: "Server Room",
        summary:
          "Rack, power, cooling and pathway design for on-premise equipment rooms that stay serviceable and expandable.",
        points: [
          "Rack layout & elevation",
          "Power & UPS planning",
          "Cooling considerations",
          "Cable management",
          "Environmental monitoring",
          "Access & security links",
        ],
        icon: Server,
      },
      {
        id: "data-centre",
        title: "Data Centre",
        summary:
          "Higher-density facilities and colo-style rooms — pathways, containment thinking and structured delivery for critical compute spaces.",
        points: [
          "High-density cabling",
          "Pathway & containment",
          "Power topology inputs",
          "Cross-connect design",
          "Redundancy planning",
          "Handover documentation",
        ],
        icon: Database,
      },
    ],
    approachIntro: {
      title: "Backbone first.",
      subtitle: "Everything else follows.",
      copy: "When cabling and wireless are sized correctly, security, voice and AV stop competing for bandwidth, power and rack space.",
    },
    principles: [
      {
        title: "ELV + IT as one load",
        detail:
          "Cameras, access, voice, AV and business traffic planned on the same pathway and power assumptions.",
        icon: Server,
      },
      {
        title: "Standards before shortcuts",
        detail:
          "Category, fibre type, labeling and test results defined up front so future moves are not guesswork.",
        icon: Cable,
      },
      {
        title: "Pathways that scale",
        detail:
          "Risers, trays and racks sized with spare capacity so the next project does not force a rebuild.",
        icon: Wifi,
      },
      {
        title: "Rooms you can service",
        detail:
          "Server and equipment rooms designed for access, airflow and clear cable management — not spaghetti racks.",
        icon: Database,
      },
    ],
    phasesTitle: "Delivery sequence",
    phases: [
      {
        number: "01",
        title: "Load & site study",
        detail: "Device counts, PoE draw, wireless demand and room constraints.",
      },
      {
        number: "02",
        title: "Network architecture",
        detail: "Cabling schedule, fibre routes, Wi-Fi plan, rack elevations.",
      },
      {
        number: "03",
        title: "Install & certify",
        detail: "Pathways, terminations, testing, labeling and as-built packs.",
      },
      {
        number: "04",
        title: "Operate & extend",
        detail: "Handover, AMC on critical links and clear expansion paths.",
      },
    ],
    cta: {
      eyebrow: "Network consultation",
      title: "Building a backbone",
      subtitle: "that can carry the stack?",
      copy: "Share floor count, device density and whether you need cabling, Wi-Fi, fibre or a server room — we'll outline a clean infrastructure path.",
      icon: Cable,
    },
    related: [
      { label: "Security & Access", href: "/solutions/security-access" },
      { label: "Communication", href: "/solutions/communication" },
      { label: "Audio Visual", href: "/solutions/audio-visual" },
      { label: "AMC & Support", href: "/amc-support" },
    ],
  },
  "automation-safety": {
    id: "automation-safety",
    path: "/solutions/automation-safety",
    navLabel: "Automation & Safety",
    eyebrow: "Solutions · Automation & Safety",
    heroLines: ["Intelligent control", "with integrated life-safety."],
    heroCopy:
      "Home automation, building automation and fire alarm systems — comfort, efficiency and safety designed to work with the wider ELV stack, not against it.",
    heroCta: "Scope automation & safety",
    systems: [
      { label: "Home Automation", icon: Home },
      { label: "Building Automation", icon: Building2 },
      { label: "Fire Alarm System", icon: Flame },
    ],
    capabilitiesIntro: {
      title: "Control and safety",
      subtitle: "as one practice.",
      copy: "Comfort automation and life-safety systems planned with the same pathway discipline as the rest of the ELV stack.",
    },
    capabilities: [
      {
        id: "home-automation",
        title: "Home Automation",
        summary:
          "Lighting, climate, shades and scenes for residences — control that feels simple day-to-day and integrates cleanly with security and AV where needed.",
        points: [
          "Lighting control & scenes",
          "Climate integration",
          "Shade / curtain control",
          "Touch / app interfaces",
          "Schedule & occupancy logic",
          "Security / AV handshakes",
        ],
        icon: Home,
      },
      {
        id: "building-automation",
        title: "Building Automation",
        summary:
          "Centralised control for commercial and multi-zone properties — lighting, HVAC interfaces and operational schedules under one logic layer.",
        points: [
          "Zone lighting control",
          "HVAC interface points",
          "Schedule & scene engines",
          "Central dashboards",
          "Energy-aware logic",
          "Multi-floor coordination",
        ],
        icon: Building2,
      },
      {
        id: "fire-alarm",
        title: "Fire Alarm System",
        summary:
          "Detection and notification infrastructure aligned to life-safety practice — panels, detectors, sounders and integration paths with PA / access where the brief requires.",
        points: [
          "Detection layout design",
          "Panel & loop architecture",
          "Sounder / strobe coverage",
          "Cause & effect logic",
          "PA / EVAC interfaces",
          "Access release interfaces",
        ],
        icon: Flame,
      },
    ],
    approachIntro: {
      title: "Comfort and safety",
      subtitle: "without conflict.",
      copy: "Automation should make the building easier to live and work in. Fire systems protect life. Both get designed with clear priority and clean interfaces.",
    },
    principles: [
      {
        title: "Simple daily control",
        detail:
          "Scenes and schedules people will actually use — not control surfaces that need a specialist after week one.",
        icon: Home,
      },
      {
        title: "Stack integration",
        detail:
          "Automation and safety interfaces planned with access, PA and networking so systems do not fight each other.",
        icon: Building2,
      },
      {
        title: "Safety is non-negotiable",
        detail:
          "Fire detection and notification designed to life-safety discipline — comfort systems never override critical paths.",
        icon: Flame,
      },
      {
        title: "Cause & effect clarity",
        detail:
          "What happens on alarm, occupancy or schedule is written down, tested and handed over with the system.",
        icon: Shield,
      },
    ],
    phasesTitle: "Delivery sequence",
    phases: [
      {
        number: "01",
        title: "Use & risk mapping",
        detail: "Living patterns, zone priorities and life-safety requirements.",
      },
      {
        number: "02",
        title: "Control architecture",
        detail: "Automation logic, fire loops, interfaces and panel topology.",
      },
      {
        number: "03",
        title: "Install & prove",
        detail: "Devices, programming, functional tests and operator training.",
      },
      {
        number: "04",
        title: "Maintain readiness",
        detail: "AMC visits, battery/detector discipline and escalation paths.",
      },
    ],
    cta: {
      eyebrow: "Automation & safety consultation",
      title: "Need control, comfort",
      subtitle: "and life-safety aligned?",
      copy: "Home automation, building control or fire alarm — share property type, zone count and safety requirements. We'll outline a clear system path.",
      icon: Flame,
    },
    related: [
      { label: "Security & Access", href: "/solutions/security-access" },
      { label: "Networking & Data", href: "/solutions/networking-data" },
      { label: "Audio Visual", href: "/solutions/audio-visual" },
      { label: "AMC & Support", href: "/amc-support" },
    ],
  },
};
