import { getSession } from "@auth0/nextjs-auth0";
import { connectDb, disconnectDb } from "../../../utils/db";

export default async function handler(req, res) {
  try {
    const { user } = await getSession(req, res);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const client = await connectDb();
    const db = client.db(process.env.MONGODB_NAME);
    const users = await db.collection("users").updateOne(
      {
        auth0Id: user.sub,
      },
      {
        $inc: {
          availableTokens: 10,
        },

        $setOnInsert: {
          auth0Id: user.sub,
        },
      },
      {
        upsert: true,
      },
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await disconnectDb();
  }
}
