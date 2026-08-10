import { MongoClient, Db, Collection, Document } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Missing MONGODB_URI in environment");
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const clientPromise: Promise<MongoClient> =
  process.env.NODE_ENV === "development"
    ? (global._mongoClientPromise ??= new MongoClient(uri).connect())
    : new MongoClient(uri).connect();

export default clientPromise;

export async function getDb(name = "krishna_infosys"): Promise<Db> {
  const client = await clientPromise;
  return client.db(name);
}

export async function getCollection<T extends Document>(
  name: string
): Promise<Collection<T>> {
  const db = await getDb();
  return db.collection<T>(name);
}
