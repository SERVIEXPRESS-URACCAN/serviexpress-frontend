'use client'

import StatsCard from '@/components/propietario/owner-stats-card'
import { getOwnerDashboardStats } from '@/services/owner/owner-dashboard.service'
import { useEffect, useState } from 'react'
import type { OwnerDashboardStats as OwnerDashboardStatsType } from '@/types/dashboard.type'

export default function OwnerDashboardStats() {
  const [stats, setStats] = useState<OwnerDashboardStatsType | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getOwnerDashboardStats()
        setStats(data)
      } catch (error) {
        console.error('Error fetching owner dashboard stats:', error)
        setError(true)
      }
    }
    loadStats()
  }, [])

  if (error) {
    return (
      <p className='text-red-400'>No se pudieron cargar las estadísticas.</p>
    )
  }

  if (!stats) {
    return <p>Cargando estadísticas...</p>
  }

  return (
    <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-4'>
      <StatsCard title='Productos' value={stats.products.toString()} />
      <StatsCard title='Pedidos' value={stats.orders.toString()} />
      <StatsCard title='Negocios' value={stats.businesses.toString()} />
      <StatsCard
        title='Ingresos'
        value={`$${stats.revenue.toLocaleString()}`}
      />
    </div>
  )
}
