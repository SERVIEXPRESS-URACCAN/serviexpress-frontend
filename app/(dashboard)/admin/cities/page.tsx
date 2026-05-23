import { CitiesTable, CreateCityDialog } from '@/components/admin/cities'

import { getCities } from '@/services/city.services'

export default async function CitiesPage() {
  const cities = await getCities()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Ciudades</h1>
        </div>

        <CreateCityDialog />
      </div>

      <CitiesTable cities={cities} />
    </div>
  )
}
