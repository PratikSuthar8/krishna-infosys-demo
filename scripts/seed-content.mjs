import { readFileSync, existsSync } from "fs";
import { MongoClient } from "mongodb";
import { config } from "dotenv";

config({ path: ".env.local" });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Missing MONGODB_URI in .env.local");
  process.exit(1);
}

function loadJson(path) {
  if (!existsSync(path)) {
    console.error("File not found:", path);
    process.exit(1);
  }
  return JSON.parse(readFileSync(path, "utf8"));
}

const client = new MongoClient(uri);

async function main() {
  console.log("Connecting...");
  await client.connect();
  const db = client.db("krishna_infosys");
  console.log("DB:", db.databaseName);

  // --- JOBS ---
  const jobsRaw = loadJson("src/data/jobs.json");
  const jobsList = Array.isArray(jobsRaw) ? jobsRaw : jobsRaw.jobs || [];
  const company = !Array.isArray(jobsRaw) ? jobsRaw.company : null;

  const jobsCol = db.collection("jobs");
  const delJobs = await jobsCol.deleteMany({});
  console.log("jobs cleared:", delJobs.deletedCount);

  if (jobsList.length) {
    const docs = jobsList.map((j) => ({
      ...j,
      published: j.published !== false,
      createdAt: j.createdAt ? new Date(j.createdAt) : new Date(),
      updatedAt: new Date(),
    }));
    await jobsCol.insertMany(docs);
  }
  console.log("jobs inserted:", await jobsCol.countDocuments());

  // --- COMPANY ---
  if (company && typeof company === "object") {
    const settings = db.collection("settings");
    await settings.updateOne(
      { key: "company" },
      { $set: { key: "company", ...company, updatedAt: new Date() } },
      { upsert: true },
    );
    console.log("settings.company: ok");
  } else {
    console.log("settings.company: skipped (no company in jobs.json)");
  }

  // --- BLOG ---
  const blogRaw = loadJson("src/data/blog-posts.json");
  const posts = Array.isArray(blogRaw)
    ? blogRaw
    : blogRaw.posts || blogRaw.items || [];

  const blogCol = db.collection("blog_posts");
  const delBlog = await blogCol.deleteMany({});
  console.log("blog_posts cleared:", delBlog.deletedCount);

  if (posts.length) {
    const docs = posts.map((p) => ({
      ...p,
      published: p.published !== false,
      body: Array.isArray(p.body)
        ? p.body
        : typeof p.body === "string"
          ? [p.body]
          : [],
      createdAt: p.createdAt ? new Date(p.createdAt) : new Date(),
      updatedAt: new Date(),
    }));
    await blogCol.insertMany(docs);
  }
  console.log("blog_posts inserted:", await blogCol.countDocuments());

  console.log("\n=== FINAL ===");
  console.log({
    jobs: await jobsCol.countDocuments(),
    blog_posts: await blogCol.countDocuments(),
  });
  console.log("Done. Users are NOT seeded — login with ADMIN_EMAIL/PASSWORD to bootstrap.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => client.close());
