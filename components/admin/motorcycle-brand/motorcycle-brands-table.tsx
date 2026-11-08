import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { MotorcycleBrand } from '@/types/motorcycle.types'
import { MotorcycleBrandActions } from './motorcycle-brand-actions'

type Props = {
  brands: MotorcycleBrand[]
  refreshAction: () => Promise<void>
}

export const MotorcycleBrandsTable = ({ brands, refreshAction }: Props) => {
  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead className='w-12.5'></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {brands.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className='h-24 text-center'>
                No hay marcas disponibles
              </TableCell>
            </TableRow>
          ) : (
            [...brands]
              .sort((a, b) => a.id - b.id)
              .map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell>{brand.id}</TableCell>
                  <TableCell>{brand.name}</TableCell>
                  <TableCell>
                    <MotorcycleBrandActions
                      brand={brand}
                      refreshAction={refreshAction}
                    />
                  </TableCell>
                </TableRow>
              ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
