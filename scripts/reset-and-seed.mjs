import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { MongoClient } from "mongodb";
import { config } from "dotenv";

config({ path: ".env.local" });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Missing MONGODB_URI in .env.local");
  process.exit(1);
}

const DB = "krishna_infosys";

const COLLECTIONS = [
  "jobs",
  "blog_posts",
  "enquiries",
  "applications",
  "leads",
  "settings",
  "company",
];

function loadJson(candidates) {
  for (const rel of candidates) {
    const p = resolve(process.cwd(), rel);
    if (existsSync(p)) {
      const raw = JSON.parse(readFileSync(p, "utf8"));
      console.log("  loaded", rel);
      return raw;
    }
  }
  return null;
}

function asArray(data, key) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (key && Array.isArray(data[key])) return data[key];
  if (Array.isArray(data.posts)) return data.posts;
  if (Array.isArray(data.jobs)) return data.jobs;
  if (Array.isArray(data.items)) return data.items;
  return [];
}

const client = new MongoClient(uri);
await client.connect();
const db = client.db(DB);

console.log("=== EMPTY COLLECTIONS ===");
for (const name of COLLECTIONS) {
  const col = db.collection(name);
  const before = await col.countDocuments();
  await col.deleteMany({});
  console.log(`  ${name}: deleted ${before}`);
}

console.log("\n=== SEED FROM DATA ===");

// Jobs
const jobsRaw = loadJson([
  "src/data/jobs.json",
  "data/jobs.json",
  "public/data/jobs.json",
]);
const jobs = asArray(jobsRaw, "jobs").map((j) => ({
  ...j,
  createdAt: j.createdAt ? new Date(j.createdAt) : new Date(),
  updatedAt: new Date(),
}));
if (jobs.length) {
  await db.collection("jobs").insertMany(jobs);
  console.log("  jobs inserted", jobs.length);
} else {
  console.log("  jobs: no seed file / empty");
}

// Blog
const blogRaw = loadJson([
  "src/data/blog-posts.json",
  "data/blog-posts.json",
  "public/data/blog-posts.json",
]);
const posts = asArray(blogRaw, "posts").map((p) => ({
  ...p,
  published: p.published !== false,
  createdAt: p.createdAt ? new Date(p.createdAt) : new Date(),
  updatedAt: new Date(),
}));
if (posts.length) {
  await db.collection("blog_posts").insertMany(posts);
  console.log("  blog_posts inserted", posts.length);
} else {
  console.log("  blog_posts: no seed file / empty");
}

// Company / settings (optional)
const companyRaw = loadJson([
  "src/data/company.json",
  "data/company.json",
  "public/data/company.json",
]);
if (companyRaw && typeof companyRaw === "object" && !Array.isArray(companyRaw)) {
  await db.collection("settings").updateOne(
    { key: "company" },
    { $set: { key: "company", ...companyRaw, updatedAt: new Date() } },
    { upsert: true },
  );
  console.log("  settings.company upserted");
}

const counts = {};
for (const name of COLLECTIONS) {
  counts[name] = await db.collection(name).countDocuments();
}
console.log("\n=== FINAL COUNTS ===");
console.log(counts);

await client.close();
console.log("\nDone.");
