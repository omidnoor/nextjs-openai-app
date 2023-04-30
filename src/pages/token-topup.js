import AppLayout from "@/components/AppLayout/AppLayout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function TokenTopup() {
  return (
    <div className="">
      <h1>tokentopup page</h1>
    </div>
  );
}

TokenTopup.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired(async (context) => {
  return {
    props: {},
  };
});
