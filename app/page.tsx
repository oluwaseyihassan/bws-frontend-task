import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen text-2xl flex-col">
      <div>Welcome to Predictions App!</div>
      <Link className="text-blue-500 hover:underline" href="/predictions">Go to Predictions</Link>
    </div>
  );
}