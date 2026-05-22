import { City } from '@/types/city.types'
import { CityCard } from './CityCard'

interface Props {
  cities: City[]
}

export default function CityList({ cities }: Props) {
  return (
    <div className="grid gap-4">
      {cities.map((city) => (
        <CityCard key={city.id} city={city} />
      ))}
    </div>
  )
}
