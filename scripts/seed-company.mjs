import { readFileSync } from "fs";
import { MongoClient } from "mongodb";
import { config } from "dotenv";

config({ path: ".env.local" });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Missing MONGODB_URI");
  process.exit(1);
}

const raw = JSON.parse(readFileSync("src/data/jobs.json", "utf8"));
if (!raw.company) {
  console.log("no company key in jobs.json");
  process.exit(0);
}

const client = new MongoClient(uri);
await client.connect();
const col = client.db("krishna_infosys").collection("settings");
await col.updateOne(
  { key: "company" },
  { $set: { key: "company", ...raw.company, updatedAt: new Date() } },
  { upsert: true },
);
console.log("company seeded");
await client.close();
