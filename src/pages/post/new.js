import AppLayout from "@/components/AppLayout/AppLayout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import { useRouter } from "next/router";

export default function NewPost() {
  const router = useRouter();
  const [render, setRender] = useState(true);
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
  };

  return (
    <div className="h-full flex flex-col items-center justify-center  bg-slate-100 p-10 rounded-md shadow-md ">
      {render && (
        <Formik
          initialValues={{
            topic: "",
            keywords: "",
          }}
          validationSchema={validate}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, isSubmitting, errors, touched }) => (
            <Form className="">
              <div className="">
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
