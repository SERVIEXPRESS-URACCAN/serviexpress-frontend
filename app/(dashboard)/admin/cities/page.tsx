'use client'
import { CitiesTable, CreateCityDialog } from '@/components/admin/cities'
import { useCities } from '@/hooks/useCities'

export default function CitiesPage() {
  const { cities, fetchCities } = useCities()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Ciudades</h1>
        </div>

        <CreateCityDialog refreshAction={fetchCities} />
      </div>

      <CitiesTable cities={cities} refreashAction={fetchCities} />
    </div>
  )
}
