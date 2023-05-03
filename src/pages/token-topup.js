import AppLayout from "@/components/AppLayout/AppLayout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Button } from "@mui/material";
import { getAppProps } from "../../utils/getAppProps";

export default function TokenTopup() {
  const handleClick = async () => {
    const response = await fetch(`/api/addToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    window.location.href = json.session.url;
  };

  return (
    <div className="">
      <Button
        onClick={handleClick}
        variant="contained"
        // color="primary"
        fullWidth
        sx={{
          backgroundColor: "green !important",
          "&:hover": {
            backgroundColor: "darkgreen !important",
          },
        }}
      >
        Add tokens
      </Button>
    </div>
  );
}

TokenTopup.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const props = await getAppProps(context);
    return {
      props,
    };
  },
});
