import AppLayout from "@/components/AppLayout/AppLayout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function NewPost() {
  const clickHandler = async () => {
    const response = await fetch(`/api/generatePost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log("RESULT", json);
  };

  return (
    <div className="">
      <h1>new post page</h1>
      <button className="btn" onClick={clickHandler}>
        Generate
      </button>
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
