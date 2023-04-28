import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <h1>Home</h1>
      <div className="">
        <Link href="/api/auth/login">Login</Link>
      </div>
    </div>
  );
}
