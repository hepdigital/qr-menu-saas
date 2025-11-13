'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { TrendingUp, Users, Eye, DollarSign } from 'lucide-react'

interface Statistics {
  restaurants: {
    total: number
    active: number
    inactive: number
  }
  views: {
    total: number
    last30Days: number
    byDay: Record<string, number>
  }
  revenue: {
    total: number
    pending: number
    currency: string
  }
  registrations: {
    last30Days: number
    byDay: Record<string, number>
  }
}

export function PlatformStatistics() {
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

  // Get last 7 days for chart
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return date.toISOString().split('T')[0]
  })

  const viewsChartData = last7Days.map((date) => ({
    date,
    views: statistics.views.byDay[date] || 0,
  }))

  const registrationsChartData = last7Days.map((date) => ({
    date,
    registrations: statistics.registrations.byDay[date] || 0,
  }))

  const maxViews = Math.max(...viewsChartData.map((d) => d.views), 1)
  const maxRegistrations = Math.max(...registrationsChartData.map((d) => d.registrations), 1)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Platform Statistics</h1>
        <p className="mt-2 text-gray-600">Detailed analytics and metrics</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Restaurants</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {statistics.restaurants.total}
              </p>
              <p className="mt-1 text-sm text-green-600">
                {statistics.restaurants.active} active
              </p>
            </div>
            <div className="rounded-full bg-blue-500 p-3">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Menu Views (30d)</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {statistics.views.last30Days.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {statistics.views.total.toLocaleString()} total
              </p>
            </div>
            <div className="rounded-full bg-green-500 p-3">
              <Eye className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {statistics.revenue.total.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-gray-500">{statistics.revenue.currency}</p>
            </div>
            <div className="rounded-full bg-yellow-500 p-3">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New Registrations</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {statistics.registrations.last30Days}
              </p>
              <p className="mt-1 text-sm text-gray-500">Last 30 days</p>
            </div>
            <div className="rounded-full bg-purple-500 p-3">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900">Menu Views (Last 7 Days)</h2>
          <div className="mt-6 space-y-4">
            {viewsChartData.map((item) => (
              <div key={item.date}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {new Date(item.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="font-medium text-gray-900">{item.views}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${(item.views / maxViews) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            New Registrations (Last 7 Days)
          </h2>
          <div className="mt-6 space-y-4">
            {registrationsChartData.map((item) => (
              <div key={item.date}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {new Date(item.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="font-medium text-gray-900">{item.registrations}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full bg-purple-500"
                    style={{
                      width: `${(item.registrations / maxRegistrations) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
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
          <h2 className="text-lg font-semibold text-gray-900">Revenue Breakdown</h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Completed</span>
              <span className="text-sm font-medium text-green-600">
                {statistics.revenue.total.toLocaleString()} {statistics.revenue.currency}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Pending</span>
              <span className="text-sm font-medium text-yellow-600">
                {statistics.revenue.pending.toLocaleString()} {statistics.revenue.currency}
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900">Averages</h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Views per Restaurant</span>
              <span className="text-sm font-medium text-gray-900">
                {statistics.restaurants.total > 0
                  ? Math.round(statistics.views.total / statistics.restaurants.total)
                  : 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Revenue per Restaurant</span>
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
