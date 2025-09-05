import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user) redirect("/auth/signin");
  
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-neutral-600">Signed in as {session?.user?.email}</p>
    </main>
  );
}
