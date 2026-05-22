import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { isOwner } from "@/lib/permissions";
import { LogoutButton } from "@/components/shared/logout-button";

export default async function OwnerPage() {
  const session = await auth();
  if (!session) redirect("/login");
  if (!isOwner(session.user.roles)) redirect("/unauthorized");

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-2xl font-bold">Owner Dashboard</h1>
      <LogoutButton />
    </div>
  );
}