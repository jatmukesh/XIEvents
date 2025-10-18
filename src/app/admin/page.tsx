import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import DashboardClient from "./dashboard";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // Redirect to login if not authenticated
    redirect("/login");
  }

  // User is authenticated, render client dashboard
  return <DashboardClient session={session} />;
}
