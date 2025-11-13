'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Store, Eye, DollarSign, TrendingUp } from 'lucide-react'

interface Statistics {
  restaurants: {
    total: number
    active: number
    inactive: number
  }
  views: {
    total: number
    last30Days: number
  }
  revenue: {
    total: number
    pending: number
    currency: string
  }
  registrations: {
    last30Days: number
  }
}

export function AdminDashboard() {
  const [statistics, setStatistics] = useState<Statistics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStatistics()
  }, [])

  const fetchStatistics = async () => {
    try {
      const response = await fetch('/api/admin/statistics')
      if (response.ok) {
        const data = await response.json()
        setStatistics(data)
      }
    } catch (error) {
      console.error('Error fetching statistics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg text-gray-500">Loading statistics...</div>
      </div>
    )
  }

  if (!statistics) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg text-gray-500">Failed to load statistics</div>
      </div>
    )
  }

  const stats = [
    {
      name: 'Total Restaurants',
      value: statistics.restaurants.total,
      subtext: `${statistics.restaurants.active} active`,
      icon: Store,
      color: 'bg-blue-500',
    },
    {
      name: 'Menu Views (30d)',
      value: statistics.views.last30Days.toLocaleString(),
      subtext: `${statistics.views.total.toLocaleString()} total`,
      icon: Eye,
      color: 'bg-green-500',
    },
    {
      name: 'Total Revenue',
      value: `${statistics.revenue.total.toLocaleString()} ${statistics.revenue.currency}`,
      subtext: `${statistics.revenue.pending.toLocaleString()} pending`,
      icon: DollarSign,
      color: 'bg-yellow-500',
    },
    {
      name: 'New Registrations (30d)',
      value: statistics.registrations.last30Days,
      subtext: 'Last 30 days',
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Platform Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Overview of platform statistics and metrics
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.name} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="mt-1 text-sm text-gray-500">{stat.subtext}</p>
                </div>
                <div className={`rounded-full p-3 ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900">Restaurant Status</h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active</span>
              <span className="text-sm font-medium text-green-600">
                {statistics.restaurants.active}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Inactive</span>
              <span className="text-sm font-medium text-red-600">
                {statistics.restaurants.inactive}
              </span>
            </div>
            <div className="flex items-center justify-between border-t pt-3">
              <span className="text-sm font-medium text-gray-900">Total</span>
              <span className="text-sm font-bold text-gray-900">
                {statistics.restaurants.total}
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900">Quick Stats</h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Avg. Views per Restaurant</span>
              <span className="text-sm font-medium text-gray-900">
                {statistics.restaurants.total > 0
                  ? Math.round(statistics.views.total / statistics.restaurants.total)
                  : 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Avg. Revenue per Restaurant</span>
              <span className="text-sm font-medium text-gray-900">
                {statistics.restaurants.total > 0
                  ? Math.round(statistics.revenue.total / statistics.restaurants.total)
                  : 0}{' '}
                {statistics.revenue.currency}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
