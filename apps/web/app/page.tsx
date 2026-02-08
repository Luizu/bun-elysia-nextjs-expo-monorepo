"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Welcome to Monorepo</h1>
        <div className="flex gap-4">
          <Link href="/sign-in" className="px-4 py-2 bg-blue-500 text-white rounded">
            Sign In
          </Link>
          <Link href="/sign-up" className="px-4 py-2 bg-green-500 text-white rounded">
            Sign Up
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Hello, {session.user.name}</h1>
      <p className="text-gray-600">{session.user.email}</p>
      <button
        onClick={async () => {
          await authClient.signOut();
          router.refresh();
        }}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Sign Out
      </button>
    </div>
  );
}
