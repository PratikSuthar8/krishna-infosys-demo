import { MongoClient } from "mongodb";
import { config } from "dotenv";
config({ path: ".env.local" });

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
const col = client.db("krishna_infosys").collection("jobs");
const r = await col.updateMany(
  { $or: [{ published: { $exists: false } }, { published: null }] },
  { $set: { published: true } },
);
console.log("jobs marked published:", r.modifiedCount);
await client.close();
