import AppLayout from "@/components/AppLayout/AppLayout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import { useRouter } from "next/router";
import { getAppProps } from "../../../utils/getAppProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain } from "@fortawesome/free-solid-svg-icons";

export default function NewPost() {
  const router = useRouter();
  const [render, setRender] = useState(false);
  const [values, setValues] = useState({});

  const validate = Yup.object({
    topic: Yup.string()
      .required("Topic is required")
      .min(5, "Topic must be at least 50 characters")
      .max(300, "Topic must be less than 300 characters"),
    keywords: Yup.string()
      .required("Keywords is required")
      .min(5, "Topic must be at least 50 characters")
      .max(100, "Topic must be less than 300 characters"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setRender(true);
    try {
      const response = await fetch(`/api/generatePost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const json = await response.json();
      if (json?.postId) {
        router.push(`/post/${json.postId}`);
      }
      setRender(false);
      setSubmitting(false);
    } catch (error) {
      setRender(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="h-full overflow-hidden">
      <div
        className="w-full h-full flex flex-col items-center 
      justify-center overflow-auto "
      >
        {!render && (
          <Formik
            initialValues={{
              topic: "",
              keywords: "",
            }}
            validationSchema={validate}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, isSubmitting, errors, touched }) => (
              <Form>
                <div className="w-full h-full m-auto max-w-screen-sm bg-slate-100 p-4 rounded-md shadow-xl border border-slate-200 shadow-slate-200">
                  <div className="mb-14 ">
                    <label htmlFor="topic">
                      Generate a blog post on the topic of :
                    </label>
                    <Field
                      as={TextField}
                      fullWidth
                      id="topic"
                      name="topic"
                      label="Topic"
                      multiline
                      rows={2}
                      error={touched.topic && Boolean(errors.topic)}
                      helperText={touched.topic && errors.topic}
                      sx={{
                        marginTop: "10px",
                        width: "100%",
                        maxWidth: "800px",
                        height: "56px",
                        ".MuiInputBase-input": {
                          height: "100%",
                        },
                      }}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="keywords" className="mb-4">
                      Targeting the following keywords :
                      <small> (Separate keywords with a comma)</small>
                    </label>
                    <Field
                      as={TextField}
                      fullWidth
                      id="keywords"
                      name="keywords"
                      label="Keywords"
                      multiline
                      rows={2}
                      error={touched.keywords && Boolean(errors.keywords)}
                      helperText={touched.keywords && errors.keywords}
                      sx={{
                        marginTop: "10px",
                        width: "100%",
                        maxWidth: "800px",
                        height: "56px",
                        ".MuiInputBase-input": {
                          height: "100%",
                        },
                      }}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="contained"
                    // color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    sx={{
                      marginTop: "30px",
                      backgroundColor: "green !important",
                      "&:hover": {
                        backgroundColor: "darkgreen !important",
                      },
                    }}
                  >
                    Generate
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        )}
        {render && (
          <div className="text-green-500 flex animate-pulse w-full flex-col justify-center items-center">
            <FontAwesomeIcon icon={faBrain} className="text-8xl" />
            <h6>Generating...</h6>
          </div>
        )}
      </div>
    </div>
  );
}

NewPost.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const { postId, posts, availableTokens } = await getAppProps(context);
    return {
      props: {
        availableTokens,
        posts,
        postId,
      },
    };
  },
});
