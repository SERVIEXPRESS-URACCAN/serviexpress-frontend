import { getMandaderos } from "@/services/mandadero.service";
import { auth } from "@/auth";
import { MandaderoTable } from "@/components/admin/mandadero/mandadero-table";
import { MandaderoSearch } from "@/components/admin/mandadero/mandadero-search";
import { CreateMandaderoDialog } from "@/components/admin/mandadero/create-mandadero-dialog";

export default async function MandaderoPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;

  const currentPage = Number(params.page) || 1;
  const search = params.search || "";

  const session = await auth();

  const mandaderos = await getMandaderos(
    session!.accessToken,
    currentPage,
    search,
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Mandaderos</h1>
      <div className="flex items-center justify-between">
        <MandaderoSearch className="w-full max-w-6xl" />

        <CreateMandaderoDialog />
      </div>

      <MandaderoTable mandaderos={mandaderos} currentPage={currentPage} />
    </div>
  );
}
