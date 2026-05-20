import { auth } from "@/auth";

import { redirect } from "next/navigation";

import {
  isAdmin,
  isOwner,
} from "@/lib/permissions";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) redirect("/login");

  const roles = session.user.roles;

  if (isAdmin(roles)) redirect("/admin");

  if (isOwner(roles)) redirect("/owner");

  redirect("/unauthorized");
}