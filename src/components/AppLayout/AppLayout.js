import { useUser } from "@auth0/nextjs-auth0/client";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import Logo from "../Logo/Logo";
import { Button } from "@mui/material";

export default function AppLayout({
  children,
  availableTokens,
  posts,
  postId,
}) {
  const { user } = useUser();
  return (
    <div className="grid grid-cols-[300px_1fr] h-screen max-h-sceen">
      <div className="flex flex-col text-white overflow-hidden">
        <div className="bg-slate-800 px-2 ">
          <Logo />
          <Button
            variant="contained"
            fullWidth
            sx={{
              marginTop: "30px",
              backgroundColor: "green !important",
              "&:hover": {
                backgroundColor: "darkgreen !important",
                textDecoration: "none",
              },
            }}
          >
            <Link style={{ textDecoration: "none" }} href="/post/new">
              New Post
            </Link>
          </Button>
          <Link
            href="/token-topup"
            className="flex justify-center mt-2 text-center "
          >
            <FontAwesomeIcon
              icon={faCoins}
              className="text-yellow-500 w-[15px]"
            />
            <span className="pl-1">{availableTokens} token available</span>
          </Link>
        </div>
        <div className="px-4 flex-1 overflow-auto scrollbar-hide bg-gradient-to-b from-slate-800 to-cyan-800">
          {posts?.map((post, index) => {
            const truncatedTitle = post.title.slice(0, 50);

            return (
              <Link
                href={`/post/${post._id}`}
                key={index}
                className={`py-1  block text-ellipsis overflow-hidden whitespace-nowrap my-1 px-2 bg-white/10 cursor-pointer border border-white/0 rounded-sm ${
                  postId === post._id ? "bg-white/30 border-white" : ""
                }`}
              >
                {truncatedTitle}
              </Link>
            );
          })}
        </div>
        <div className="bg-cyan-800 flex items-center gap-2 border-t border-t-black/50 h-20 px-2">
          {!!user ? (
            <>
              <div className="min-w-[50px]">
                <Image
                  src={user.picture}
                  alt={user.name}
                  height={50}
                  width={50}
                  priority
                  className="rounded-full"
                />
              </div>
              <div className="flex-1">
                <div className="font-bold">{user.email}</div>
                <Link href="/api/auth/logout" className="text-sm">
                  logout
                </Link>
              </div>
            </>
          ) : (
            <Link href="/api/auth/login">Login</Link>
          )}
        </div>
      </div>
      <div className="m-auto">{children}</div>
    </div>
  );
}
