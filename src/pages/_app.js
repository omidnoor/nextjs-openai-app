import "@/styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { DM_Sans, DM_Serif_Display } from "@next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { PostsProvider } from "@/context/postsContext";

config.autoAddCss = false;

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
});

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <>{page}</>);
  return (
    <>
      <UserProvider>
        <PostsProvider>
          <main
            className={`${dmSans.variable} ${dmSerifDisplay.variable} font-body`}
          >
            {getLayout(<Component {...pageProps} />, pageProps)}
          </main>
        </PostsProvider>
      </UserProvider>
    </>
  );
}
