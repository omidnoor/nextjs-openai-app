import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function NewPost() {
  return (
    <div className="">
      <h1>new post page</h1>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired(async (context) => {
  return {
    props: {},
  };
});
