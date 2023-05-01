import AppLayout from "@/components/AppLayout/AppLayout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState } from "react";

export default function NewPost() {
  const [postContent, setPostContent] = useState("");

  const clickHandler = async () => {
    const response = await fetch(`/api/generatePost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setPostContent(json?.postContent);
    console.log("RESULT", json.post);
  };

  return (
    <div className="">
      <h1>new post page</h1>
      <button className="btn" onClick={clickHandler}>
        Generate
      </button>
      <div
        dangerouslySetInnerHTML={{ __html: postContent }}
        className="max-w-screen-sm p-10"
      />
    </div>
  );
}

NewPost.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired(async (context) => {
  return {
    props: {},
  };
});
