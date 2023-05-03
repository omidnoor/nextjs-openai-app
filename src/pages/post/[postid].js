import AppLayout from "@/components/AppLayout/AppLayout";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { connectDb } from "../../../utils/db";
import { ObjectId } from "mongodb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { getAppProps } from "../../../utils/getAppProps";

export default function Post({
  postContent,
  title,
  metaDescription,
  keywords,
}) {
  return (
    <div className="overflow-auto h-full ">
      <div className="max-w-screen-sm mx-auto px-4">
        <div className="text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm">
          SEO title and meta description
        </div>
        <div className="p-4 my-2 border border-stone-200 rounded-md">
          <div className="text-blue-600 text-2xl font-bold">{title}</div>
          <div className="mt-2 ">{metaDescription}</div>
        </div>

        <div className="text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm">
          Keywords
        </div>
        <div className="flex flex-wrap pt-2 gap-1 ">
          {keywords.split(",").map((keyword, index) => (
            <div
              key={index}
              className="p-2 rounded-full bg-slate-800 text-white "
            >
              <FontAwesomeIcon icon={faHashtag} /> {keyword}
            </div>
          ))}
        </div>

        <div className="text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm">
          Blog Post
        </div>
        <div dangerouslySetInnerHTML={{ __html: postContent || "" }} />
      </div>
    </div>
  );
}

Post.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const { posts, availableTokens, postId } = await getAppProps(context);
    // console.log(posts);
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
        availableTokens,
        posts,
        postId,
      },
    };
  },
});
