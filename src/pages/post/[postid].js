import AppLayout from "@/components/AppLayout/AppLayout";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { connectDb } from "../../../utils/db";
import { ObjectId } from "mongodb";

export default function Post({
  postContent,
  title,
  metaDescription,
  keywords,
}) {
  return (
    <div className="">
      <h1>{title}</h1>
    </div>
  );
}

Post.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const userSession = await getSession(context.req, context.res);
    const client = await connectDb();
    const db = client.db(process.env.MONGODB_NAME);
    const user = await db.collection("users").findOne({
      auth0Id: userSession.user.sub,
    });
    const post = await db.collection("posts").findOne({
      _id: new ObjectId(context.params.postId),
      userId: user._id,
    });
    if (!post) {
      return {
        redirect: {
          destination: "/post/new",
          permanent: false,
        },
      };
    }

    return {
      props: {
        postContent: post.postContent,
        title: post.title,
        metaDescription: post.metaDescription,
        keywords: post.keywords,
      },
    };
  },
});
