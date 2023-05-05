import { getSession } from "@auth0/nextjs-auth0";
import { connectDb } from "./db";

export const getAppProps = async (context) => {
  const userSession = await getSession(context.req, context.res);
  const client = await connectDb();
  const db = client.db(process.env.MONGODB_NAME);
  const user = await db.collection("users").findOne({
    auth0Id: userSession.user.sub,
  });
  if (!user) {
    return {
      availableToken: 0,
      posts: [],
    };
  }
  const posts = await db
    .collection("posts")
    .find({
      userId: user._id,
    })
    .limit(3)
    .sort({ created: -1 })
    .toArray();

  return {
    availableTokens: user.availableTokens,
    posts: posts?.map((post) => ({
      _id: post._id.toString(),
      created: post.created.toString(),
      userId: post.userId.toString(),
      postContent: post.postContent,
      title: post.title,
      metaDescription: post.metaDescription,
      topic: post.topic,
    })),
    postid: context.params?.postid || null,
  };
};
