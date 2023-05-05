import AppLayout from "@/components/AppLayout/AppLayout";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { connectDb } from "../../../utils/db";
import { ObjectId } from "mongodb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { getAppProps } from "../../../utils/getAppProps";
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import PostsContext from "@/context/postsContext";

export default function Post({
  postContent,
  title,
  metaDescription,
  keywords,
  postid,
}) {
  const [confirmation, setConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { removePost } = useContext(PostsContext);
  // console.log(postid);
  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/deletePost/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postid,
        }),
      });
      const json = await response.json();
      if (json.success) {
        setMessage("Post deleted successfully!");
        removePost(postid);
        router.replace(`/post/new`);
      }
      setError("");
    } catch (error) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

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
        <div className="my-4">
          {!confirmation && (
            <Button
              variant="contained"
              fullWidth
              sx={{
                marginTop: "30px",
                backgroundColor: "#bf404e !important",
                "&:hover": {
                  backgroundColor: "#a65966 !important",
                  textDecoration: "none",
                },
                font: "inherit",
              }}
              onClick={() => setConfirmation(true)}
            >
              Delete Post
            </Button>
          )}
          {!!confirmation && (
            <div className="flex flex-col justify-center items-center ">
              <p className="p-2 bg-red-300 text-center">
                Are you sure you want to delete this post? This action is
                irreversible
              </p>
              <div className="flex items-center h-full w-full gap-4">
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    // backgroundColor: "#bf404e !important",
                    "&:hover": {
                      backgroundColor: "#2d2dd2 !important",
                      color: "white",
                      textDecoration: "none",
                    },
                    font: "inherit",
                  }}
                  onClick={() => setConfirmation(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#bf404e !important",
                    "&:hover": {
                      backgroundColor: "#a65966 !important",
                      textDecoration: "none",
                    },
                    font: "inherit",
                  }}
                  onClick={() => handleDelete()}
                >
                  Confirm
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Post.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const { posts, availableTokens, postid } = await getAppProps(context);
    // console.log(posts);
    const userSession = await getSession(context.req, context.res);
    const client = await connectDb();
    const db = client.db(process.env.MONGODB_NAME);
    const user = await db.collection("users").findOne({
      auth0Id: userSession.user.sub,
    });
    const post = await db.collection("posts").findOne({
      _id: new ObjectId(context.params.postid),
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
        postCreated: post.created.toString(),
        postid,
      },
    };
  },
});
