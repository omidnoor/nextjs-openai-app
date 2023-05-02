import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

let cachedClient = null;

export async function connectDb() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(uri);
  cachedClient = client;
  await client.connect();

  return client;
}

export function disconnectDb() {
  if (cachedClient) {
    cachedClient.close();
    cachedClient = null;
  }
}
