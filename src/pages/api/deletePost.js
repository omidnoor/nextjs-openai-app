import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { ObjectId } from "mongodb";
import { disconnectDb } from "../../../utils/db";

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const {
      user: { sub },
    } = await getSession();
    const client = await connectDb();
    const db = client.db(process.env.MONGODB_NAME);

    const userProfile = await db.collection("users").findOne({
      auth0Id: sub,
    });

    const { postId } = req.body;

    await db.collection("posts").deleteOne({
      userId: userProfile._id,
      _id: new ObjectId(postId),
    });

    res.status(200).json({ success: "true" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    disconnectDb();
  }
});
