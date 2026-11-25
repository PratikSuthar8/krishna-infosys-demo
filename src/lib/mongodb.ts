import { MongoClient, Db, Collection, Document } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI in environment");
  }
  // Reuse one client per server instance (dev and production). Creating a new
  // MongoClient per call opened a fresh connection on every request.
  global._mongoClientPromise ??= new MongoClient(uri).connect().catch((err) => {
    global._mongoClientPromise = undefined;
    throw err;
  });
  return global._mongoClientPromise;
}

/** Lazy: does not read env until the promise is used */
const clientPromise = {
  then(
    onfulfilled?: ((value: MongoClient) => unknown) | null,
    onrejected?: ((reason: unknown) => unknown) | null
  ) {
    return getClientPromise().then(
      onfulfilled ?? undefined,
      onrejected ?? undefined
    );
  },
} as Promise<MongoClient>;

export default clientPromise;

export async function getDb(name = "krishna_infosys"): Promise<Db> {
  const client = await getClientPromise();
  return client.db(name);
}

export async function getCollection<T extends Document>(
  name: string
): Promise<Collection<T>> {
  const db = await getDb();
  return db.collection<T>(name);
}
