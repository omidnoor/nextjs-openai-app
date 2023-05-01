import "@/styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { DM_Sans, DM_Serif_Display } from "@next/font/google";

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
        <main
          className={`${dmSans.variable} ${dmSerifDisplay.variable} font-body`}
        >
          {getLayout(<Component {...pageProps} />, pageProps)}
        </main>
      </UserProvider>
    </>
  );
}
