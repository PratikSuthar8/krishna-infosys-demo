export type ClientSystem =
  | "CCTV"
  | "Access Control"
  | "EPABX"
  | "Networking"
  | "Fire Alarm"
  | "PA System"
  | "Boom Barrier"
  | "Home Automation"
  | "Time Attendance"
  | "Wi-Fi"
  | "AV"
  | "ELV Integrated";

export type ClientSector =
  | "Manufacturing"
  | "Healthcare"
  | "Education"
  | "Banking"
  | "Logistics"
  | "Real Estate"
  | "Hospitality"
  | "Infrastructure"
  | "Corporate"
  | "Residential"
  | "Pharma"
  | "Food & Beverage";

export type ClientProject = {
  id: string;
  name: string;
  sector: ClientSector;
  systems: ClientSystem[];
  year: number;
  yearEnd?: number;
  summary: string;
  featured?: boolean;
  /** optional path under /public if logo exists */
  logo?: string;
};

export const clientProjects: ClientProject[] = [
  {
    id: "lt-cctv-2024",
    name: "Larsen & Toubro Limited",
    sector: "Infrastructure",
    systems: ["CCTV"],
    year: 2024,
    summary: "Surveillance support for operational sites.",
    featured: true,
  },
  {
    id: "sterling-addlife-pa-2024",
    name: "Sterling Addlife India Pvt. Ltd.",
    sector: "Healthcare",
    systems: ["PA System"],
    year: 2024,
    summary: "Zoned public-address coverage for clinical environments.",
    featured: true,
  },
  {
    id: "sterling-cancer-pa-2024",
    name: "Sterling Speciality Clinics & Cancer Center",
    sector: "Healthcare",
    systems: ["PA System"],
    year: 2024,
    summary: "Hospital-grade PA with zone control and paging.",
    featured: true,
  },
  {
    id: "ramdev-elv",
    name: "Ramdev Food Products Pvt. Ltd.",
    sector: "Food & Beverage",
    systems: ["CCTV", "ELV Integrated"],
    year: 2019,
    yearEnd: 2020,
    summary: "Multi-phase CCTV and ELV for snacks division operations.",
    featured: true,
  },
  {
    id: "nippon-express-2019",
    name: "Nippon Express (India) Private Limited",
    sector: "Logistics",
    systems: ["EPABX", "Networking"],
    year: 2019,
    summary: "EPABX and structured network for logistics operations.",
    featured: true,
  },
  {
    id: "swati-switchgears",
    name: "Swati Switchgears (India) Pvt. Ltd.",
    sector: "Manufacturing",
    systems: ["EPABX", "Networking", "CCTV", "AV"],
    year: 2016,
    yearEnd: 2017,
    summary: "Multi-year ELV: intercom, racks, switching and workplace AV.",
    featured: true,
  },
  {
    id: "stelvio-healthcare-2024",
    name: "Stelvio Healthcare LLP",
    sector: "Healthcare",
    systems: ["Fire Alarm", "CCTV", "EPABX", "Networking"],
    year: 2024,
    summary: "Integrated fire, surveillance, EPABX and cabling.",
    featured: true,
  },
  {
    id: "dav-school-pa-2024",
    name: "DAV International School, Ahmedabad",
    sector: "Education",
    systems: ["PA System"],
    year: 2024,
    summary: "Campus PA for classrooms and common areas.",
    featured: true,
  },
  {
    id: "eco-industries-cctv-2024",
    name: "Eco Industries",
    sector: "Manufacturing",
    systems: ["CCTV", "Networking"],
    year: 2024,
    summary: "IP surveillance with PoE switching and structured cabling.",
  },
  {
    id: "swastik-builders-cctv-2024",
    name: "Swastik Builders",
    sector: "Real Estate",
    systems: ["CCTV", "Networking"],
    year: 2023,
    yearEnd: 2024,
    summary: "Large-site IP CCTV with multi-SATA NVR capacity.",
  },
  {
    id: "atishay-residency-2024",
    name: "Atishay Residency Co-op Housing Society",
    sector: "Residential",
    systems: ["CCTV"],
    year: 2024,
    summary: "Society premises surveillance on IP cameras and NVR.",
  },
  {
    id: "vipuldiam-2024",
    name: "VIPULDIAM",
    sector: "Corporate",
    systems: ["CCTV", "Wi-Fi", "Networking"],
    year: 2023,
    yearEnd: 2024,
    summary: "CCTV plus enterprise Wi-Fi access points.",
  },
  {
    id: "sun-automate-2019",
    name: "Sun Automate Controls Private Limited",
    sector: "Manufacturing",
    systems: ["CCTV", "EPABX", "Access Control", "Time Attendance"],
    year: 2019,
    yearEnd: 2022,
    summary: "Surveillance, intercom, access and attendance in one programme.",
  },
  {
    id: "velamani-cctv",
    name: "Velamani India Private Limited",
    sector: "Manufacturing",
    systems: ["CCTV", "Networking"],
    year: 2017,
    yearEnd: 2019,
    summary: "IP bullet cameras with PoE switching.",
  },
  {
    id: "saraspur-bank-2024",
    name: "Saraspur Nagarik Co-op Bank Ltd.",
    sector: "Banking",
    systems: ["EPABX", "AV"],
    year: 2017,
    yearEnd: 2024,
    summary: "Branch intercom and interactive display systems.",
  },
  {
    id: "ornella-boom-2024",
    name: "Ornella Builders LLP",
    sector: "Real Estate",
    systems: ["Boom Barrier"],
    year: 2024,
    summary: "Site access control with boom barriers.",
  },
  {
    id: "gokulesh-boom-2024",
    name: "Gokulesh Associates",
    sector: "Real Estate",
    systems: ["Boom Barrier"],
    year: 2023,
    yearEnd: 2024,
    summary: "Boom barrier installation and upgrades.",
  },
  {
    id: "v3-solutech-2024",
    name: "V3 SOLUTECH LLP",
    sector: "Corporate",
    systems: ["CCTV", "Networking", "Wi-Fi", "EPABX", "Time Attendance"],
    year: 2024,
    summary: "Office ELV: network, Wi-Fi, CCTV, intercom and T&A.",
  },
  {
    id: "pv-pharma-2024",
    name: "P V Pharma Health Care Pvt. Ltd.",
    sector: "Pharma",
    systems: ["CCTV", "EPABX", "Networking", "Time Attendance", "AV"],
    year: 2024,
    summary: "Multi-system office ELV including CCTV, EPABX and network.",
  },
  {
    id: "leistung-2023",
    name: "Leistung Engineering Pvt. Ltd.",
    sector: "Manufacturing",
    systems: ["Home Automation", "Fire Alarm"],
    year: 2023,
    summary: "Smart controls with conventional fire detection.",
  },
  {
    id: "school-deaf-pa-2021",
    name: "School for Deaf Mutes Society",
    sector: "Education",
    systems: ["PA System", "AV"],
    year: 2021,
    summary: "PA and projection for institutional spaces.",
  },
  {
    id: "sfl-ht-2018",
    name: "SFL Worldwide Logistics Pvt. Ltd.",
    sector: "Logistics",
    systems: ["AV"],
    year: 2018,
    summary: "Meeting-room AV and projection setup.",
  },
  {
    id: "accurate-pms-2019",
    name: "Accurate PMS Pvt. Ltd.",
    sector: "Corporate",
    systems: ["EPABX"],
    year: 2019,
    summary: "Matrix EPABX with expansion cards and handsets.",
  },
  {
    id: "codal-systems",
    name: "Codal Systems Pvt. Ltd.",
    sector: "Corporate",
    systems: ["CCTV", "Access Control", "Time Attendance"],
    year: 2022,
    yearEnd: 2024,
    summary: "CCTV and multi-door access control upgrades.",
  },
  {
    id: "devdip-builders-2024",
    name: "Devdip Builders Pvt. Ltd.",
    sector: "Real Estate",
    systems: ["CCTV", "Networking"],
    year: 2021,
    yearEnd: 2024,
    summary: "Project-site IP surveillance and PoE switching.",
  },
  {
    id: "panache-academy",
    name: "Panache Academy",
    sector: "Education",
    systems: ["CCTV"],
    year: 2019,
    summary: "Classroom and premise CCTV coverage.",
  },
  {
    id: "vasant-masala-2024",
    name: "Vasant Masala Private Limited",
    sector: "Food & Beverage",
    systems: ["EPABX", "Access Control", "Time Attendance"],
    year: 2020,
    yearEnd: 2024,
    summary: "EPABX and access/attendance for plant operations.",
  },
  {
    id: "kmk-2019",
    name: "KMK Computech Private Limited",
    sector: "Corporate",
    systems: ["Time Attendance", "Fire Alarm", "Access Control"],
    year: 2019,
    summary: "Access, attendance and fire alarm installation.",
  },
];

export const featuredClients = clientProjects.filter((c) => c.featured);

export function clientsBySystem(system: ClientSystem) {
  return clientProjects.filter((c) => c.systems.includes(system));
}
