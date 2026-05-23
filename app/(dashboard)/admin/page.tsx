import PageHeader from '@/components/admin/page-header'
import StatsCard from '@/components/admin/stats-card'
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/permissions";

export default async function AdminPage() {
  const session = await auth();

  if (!session) redirect("/login");

  if (!isAdmin(session.user.roles)) {
    redirect("/not-found");
  }
  return (
    <div>
      <PageHeader title="Dashboard" description="Resumen general del sistema" />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Usuarios" value="120" />

        <StatsCard title="Órdenes" value="58" />

        <StatsCard title="Negocios" value="14" />

        <StatsCard title="Ingresos" value="$2,340" />
      </div>
    </div>
  )
}
