import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const roles =
    session.user?.roles ?? [];

  if (roles.includes("admin")) {
    redirect("/admin");
  }

  if (roles.includes("owner")) {
    redirect("/owner");
  }

  redirect("/login");
}