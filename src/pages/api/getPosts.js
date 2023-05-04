import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { connectDb, disconnectDb } from "../../../utils/db";

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const {
      user: { sub },
    } = await getSession(req, res);
    const client = await connectDb();
    const db = client.db(process.env.MONGODB_NAME);
    const userProfile = await db.collection("users").findOne({
      auth0Id: sub,
    });
    const { lastPostDate, getNewerPosts } = req.body;
    // console.log(getNewerPosts);
    const posts = await db
      .collection("posts")
      .find({
        userId: userProfile._id,
        created: {
          [getNewerPosts ? "$gt" : "$lt"]: new Date(lastPostDate),
        },
      })
      .limit(getNewerPosts ? 0 : 5)
      .sort({ created: -1 })
      .toArray();

    // console.log(lastPostDate);
    res.status(200).json({ posts });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    disconnectDb();
  }
});
