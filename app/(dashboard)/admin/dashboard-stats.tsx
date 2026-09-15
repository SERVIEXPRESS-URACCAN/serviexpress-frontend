'use client'
import { useEffect, useState } from 'react'
import { DashboardStats as DashboardStatsType } from '@/types/dashboard.type'
import { getDashboardStats } from '@/services/dashboard.service'
import StatsCard from '@/components/propietario/owner-stats-card'

export default function DashboardStats() {
  const [stats, setStats] = useState<DashboardStatsType | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getDashboardStats()
        setStats(data)
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
        setError(true)
      }
    }
    loadStats()
  }, [])

  if (error) {
    return (
      <p className='text-red-400'>
        Error al cargar las estadísticas del dashboard.
      </p>
    )
  }

  if (!stats) {
    return <p>Cargando estadísticas...</p>
  }
  return (
    <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-4'>
      <StatsCard title='Usuarios' value={stats.users.toString()} />

      <StatsCard title='Órdenes' value={stats.orders.toString()} />

      <StatsCard title='Negocios' value={stats.businesses.toString()} />

      <StatsCard
        title='Ingresos'
        value={`$${stats.revenue.toLocaleString()}`}
      />
    </div>
  )
}
