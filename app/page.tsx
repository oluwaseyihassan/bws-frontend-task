import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen text-2xl">
      <div>Welcome to Predictions App!</div>
      <Link href="/predictions">Go to Predictions</Link>
    </div>
  );
}
