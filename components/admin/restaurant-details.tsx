'use client'

import { useEffect, useState, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ExternalLink, Store, Package, QrCode, Eye } from 'lucide-react'
import Link from 'next/link'
import type { Restaurant } from '@/types/database'

interface RestaurantDetailsData {
  restaurant: Restaurant
  statistics: {
    categories: number
    products: number
    qrCodes: number
    totalViews: number
    recentViews: number
  }
  payments: Array<{
    id: string
    amount: number
    currency: string
    status: string
    created_at: string
  }>
}

export function RestaurantDetails({ restaurantId }: { restaurantId: string }) {
  const [data, setData] = useState<RestaurantDetailsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchRestaurantDetails = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/restaurants/${restaurantId}`)
      if (response.ok) {
        const result = await response.json()
        setData(result)
      }
    } catch (error) {
      console.error('Error fetching restaurant details:', error)
    } finally {
      setIsLoading(false)
    }
  }, [restaurantId])

  useEffect(() => {
    fetchRestaurantDetails()
  }, [fetchRestaurantDetails])

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg text-gray-500">Loading restaurant details...</div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg text-gray-500">Restaurant not found</div>
      </div>
    )
  }

  const { restaurant, statistics, payments } = data

  const getStatusBadge = (status: string) => {
    const styles = {
      trial: 'bg-blue-100 text-blue-800',
      active: 'bg-green-100 text-green-800',
      expired: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800',
    }
    return styles[status as keyof typeof styles] || styles.cancelled
  }

  const getPaymentStatusBadge = (status: string) => {
    const styles = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
    }
    return styles[status as keyof typeof styles] || styles.pending
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/admin/restaurants">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Restaurants
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{restaurant.name}</h1>
            <p className="mt-2 text-gray-600">{restaurant.slug}</p>
          </div>
          <span
            className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStatusBadge(
              restaurant.subscription_status
            )}`}
          >
            {restaurant.subscription_status}
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{statistics.categories}</p>
            </div>
            <div className="rounded-full bg-blue-500 p-3">
              <Store className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Products</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{statistics.products}</p>
            </div>
            <div className="rounded-full bg-green-500 p-3">
              <Package className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">QR Codes</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{statistics.qrCodes}</p>
            </div>
            <div className="rounded-full bg-purple-500 p-3">
              <QrCode className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{statistics.totalViews}</p>
              <p className="text-xs text-gray-500">{statistics.recentViews} in last 30d</p>
            </div>
            <div className="rounded-full bg-yellow-500 p-3">
              <Eye className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900">Restaurant Information</h2>
          <div className="mt-4 space-y-3">
            <div>
              <span className="text-sm text-gray-600">Email:</span>
              <span className="ml-2 text-sm font-medium text-gray-900">
                {restaurant.email || 'N/A'}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-600">Phone:</span>
              <span className="ml-2 text-sm font-medium text-gray-900">
                {restaurant.phone || 'N/A'}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-600">Primary Language:</span>
              <span className="ml-2 text-sm font-medium text-gray-900">
                {restaurant.primary_language.toUpperCase()}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-600">Currency:</span>
              <span className="ml-2 text-sm font-medium text-gray-900">
                {restaurant.currency}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-600">Created:</span>
              <span className="ml-2 text-sm font-medium text-gray-900">
                {new Date(restaurant.created_at).toLocaleDateString()}
              </span>
            </div>
            <div className="pt-3">
              <a
                href={`https://${restaurant.slug}.qrmenu.app`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                View Digital Menu
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Payments</h2>
          {payments.length === 0 ? (
            <p className="mt-4 text-sm text-gray-500">No payment history</p>
          ) : (
            <div className="mt-4 space-y-3">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between border-b pb-3 last:border-b-0"
                >
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {payment.amount} {payment.currency}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(payment.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getPaymentStatusBadge(
                      payment.status
                    )}`}
                  >
                    {payment.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
