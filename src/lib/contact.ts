export const contact = {
	brand: "Krishna Infosys",
	tagline: "Excellence through Expertise",

	phone: {
		display: "+91 79 4030 4848",
		href: "tel:+917940304848",
		raw: "+917940304848",
	},

	email: {
		general: "info@krishnainfosys.com",
		sales: "sales@krishnainfosys.com",
		support: "support@krishnainfosys.com",
		hr: "hr@krishnainfosys.com",
		ceo: "ceo@krishnainfosys.com",
	},

	web: {
		display: "www.krishnainfosys.com",
		href: "https://www.krishnainfosys.com",
	},

	address: {
		operational: {
			label: "Operational office",
			lines: [
				"15 & 16, 1st Floor, Swastik House",
				"Near Stadium Circle, Opp. Muktjivan Colour Lab",
				"Near Income Tax Underpass, Navrangpura",
				"Ahmedabad – 380009, Gujarat, India",
			],
			short: "Navrangpura, Ahmedabad – 380009",
		},
		registered: {
			label: "Registered office",
			lines: [
				"A-61, Jogeshwari Society",
				"Opp Wonder Point, CTM Cross Road, Amaraiwadi",
				"Ahmedabad – 380026, Gujarat, India",
			],
			short: "Amaraiwadi, Ahmedabad – 380026",
		},
	},

	legal: {
		proprietor: "Prakash Patel",
		gstin: "24BNGPP7256R1Z5",
		udyam: "UDYAM-GJ-01-0323748",
		iso: "ISO 9001:2015",
	},

	grievance: {
		name: "Prakash Patel",
		role: "CEO",
		email: "ceo@krishnainfosys.com",
		phoneDisplay: "+91 79 4030 4848",
		phoneHref: "tel:+917940304848",
	},
} as const;

/** mailto helper */
export function mailTo(key: keyof typeof contact.email = "general") {
	return `mailto:${contact.email[key]}`;
}
