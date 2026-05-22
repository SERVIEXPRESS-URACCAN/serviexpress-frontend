'use client'

import CityList from '@/components/admin/cities/CityList'
import { useCities } from '@/hooks/useCities'

export default function CitiesPage() {
  const { cities, loading } = useCities()

  if (loading) {
    return <p>Cargando...</p>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ciudades</h1>

      <CityList cities={cities} />
    </div>
  )
}
