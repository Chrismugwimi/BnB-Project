// app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardRedirect() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.role) {
    // Redirect to login if session is missing or role is undefined
    return redirect("/Login");
  }

  if (session.user.role === "HOST") {
    return redirect("/Dashboard/host");
  }

  return redirect("/Dashboard/guest");
}
