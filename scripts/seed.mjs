import { readFileSync } from "fs";
import { MongoClient } from "mongodb";
import { config } from "dotenv";

config({ path: ".env.local" });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Missing MONGODB_URI in .env.local");
  process.exit(1);
}

const jobsFile = JSON.parse(readFileSync("src/data/jobs.json", "utf8"));
const blogFile = JSON.parse(readFileSync("src/data/blog-posts.json", "utf8"));

const client = new MongoClient(uri);

async function main() {
  await client.connect();
  const db = client.db("krishna_infosys");

  // company settings
  await db.collection("settings").updateOne(
    { key: "company" },
    {
      $set: {
        key: "company",
        ...jobsFile.company,
        updatedAt: new Date(),
      },
    },
    { upsert: true }
  );

  // jobs
  const jobs = jobsFile.jobs.map((j) => ({
    ...j,
    published: true,
    updatedAt: new Date(),
  }));
  await db.collection("jobs").deleteMany({});
  if (jobs.length) await db.collection("jobs").insertMany(jobs);
  await db.collection("jobs").createIndex({ slug: 1 }, { unique: true });

  // blog
  const posts = blogFile.posts.map((p) => ({
    ...p,
    published: true,
    updatedAt: new Date(),
  }));
  await db.collection("blog_posts").deleteMany({});
  if (posts.length) await db.collection("blog_posts").insertMany(posts);
  await db.collection("blog_posts").createIndex({ slug: 1 }, { unique: true });

  // empty collections for forms
  await db.collection("enquiries").createIndex({ createdAt: -1 });
  await db.collection("applications").createIndex({ createdAt: -1 });
  await db.collection("applications").createIndex({ jobSlug: 1 });

  console.log("Seed complete:");
  console.log("  jobs:", jobs.length);
  console.log("  blog_posts:", posts.length);
  console.log("  settings.company: ok");
  await client.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
