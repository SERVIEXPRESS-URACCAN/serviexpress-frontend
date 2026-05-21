import { City } from '@/types/city.types'

interface CityCardProps {
  city: City
}

export const CityCard = ({ city }: CityCardProps) => {
  return (
    <div className="border rounded-md p-4">
      <h2>{city.name}</h2>
    </div>
  )
}
