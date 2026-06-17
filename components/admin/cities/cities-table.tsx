import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { City } from '@/types/city.types'
import { CityActions } from './city-actions'

type Props = {
  cities: City[]
}

export const CitiesTable = ({ cities }: Props) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead className="w-12.5"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {cities.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                No hay ciudades disponibles
              </TableCell>
            </TableRow>
          ) : (
            cities.map((city) => (
              <TableRow key={city.id}>
                <TableCell>{city.id}</TableCell>

                <TableCell>{city.name}</TableCell>

                <TableCell>
                  <CityActions city={city} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
