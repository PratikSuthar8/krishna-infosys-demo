import { MongoClient } from "mongodb";
import { config } from "dotenv";
config({ path: ".env.local" });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Missing MONGODB_URI");
  process.exit(1);
}

const client = new MongoClient(uri);
await client.connect();
const db = client.db("krishna_infosys");
const enquiries = db.collection("enquiries");
const leads = db.collection("leads");

const rows = await enquiries.find({}).toArray();
let n = 0;
for (const e of rows) {
  const exists = await leads.findOne({ enquiryId: e._id });
  if (exists) continue;
  await leads.insertOne({
    name: e.name || "Unknown",
    email: e.email || "",
    phone: e.phone || null,
    company: e.company || null,
    source: "website-contact",
    interest: e.subject || null,
    message: e.message || null,
    status: e.status === "new" || !e.status ? "new" : "contacted",
    notes: [],
    enquiryId: e._id,
    createdAt: e.createdAt || new Date(),
    updatedAt: e.updatedAt || new Date(),
  });
  n++;
}
console.log("migrated", n, "of", rows.length);
await client.close();
