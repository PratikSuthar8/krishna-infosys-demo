export const LEAD_STATUSES = [
  { id: "new", label: "New", color: "bg-sky-500" },
  { id: "contacted", label: "Contacted", color: "bg-violet-500" },
  { id: "qualified", label: "Qualified", color: "bg-amber-500" },
  { id: "proposal", label: "Proposal", color: "bg-orange-500" },
  { id: "won", label: "Won", color: "bg-emerald-500" },
  { id: "lost", label: "Lost", color: "bg-zinc-400" },
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number]["id"];

export type LeadNote = {
  text: string;
  createdAt: string;
  author?: string;
};

export type Lead = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source?: string;
  interest?: string;
  message?: string;
  status: LeadStatus;
  value?: number;
  notes?: LeadNote[];
  createdAt?: string;
  updatedAt?: string;
};

export function isLeadStatus(v: string): v is LeadStatus {
  return LEAD_STATUSES.some((s) => s.id === v);
}
