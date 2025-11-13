'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import type { Restaurant } from '@/types/database'

interface RestaurantListResponse {
  restaurants: Restaurant[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export function RestaurantList() {
  const [data, setData] = useState<RestaurantListResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<string>('all')
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchRestaurants()
  }, [page, status])

  const fetchRestaurants = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
      })

      if (status !== 'all') {
        params.append('status', status)
      }

      if (search) {
        params.append('search', search)
      }

      const response = await fetch(`/api/admin/restaurants?${params}`)
      if (response.ok) {
        const result = await response.json()
        setData(result)
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = () => {
    setPage(1)
    fetchRestaurants()
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      trial: 'bg-blue-100 text-blue-800',
      active: 'bg-green-100 text-green-800',
      expired: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800',
    }
    return styles[status as keyof typeof styles] || styles.cancelled
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Restaurants</h1>
        <p className="mt-2 text-gray-600">Manage all registered restaurants</p>
      </div>

      <Card className="p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by name, email, or slug..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>
          </div>

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="trial">Trial</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-gray-500">Loading restaurants...</div>
        ) : !data || data.restaurants.length === 0 ? (
          <div className="py-12 text-center text-gray-500">No restaurants found</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm font-medium text-gray-500">
                    <th className="pb-3">Restaurant</th>
                    <th className="pb-3">Email</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Created</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {data.restaurants.map((restaurant) => (
                    <tr key={restaurant.id} className="text-sm">
                      <td className="py-4">
                        <div>
                          <div className="font-medium text-gray-900">{restaurant.name}</div>
                          <div className="text-gray-500">{restaurant.slug}</div>
                        </div>
                      </td>
                      <td className="py-4 text-gray-600">{restaurant.email || 'N/A'}</td>
                      <td className="py-4">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusBadge(
                            restaurant.subscription_status
                          )}`}
                        >
                          {restaurant.subscription_status}
                        </span>
                      </td>
                      <td className="py-4 text-gray-600">
                        {new Date(restaurant.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-4">
                        <Link
                          href={`/admin/restaurants/${restaurant.id}`}
                          className="inline-flex items-center text-blue-600 hover:text-blue-800"
                        >
                          View Details
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {data.pagination.totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing {(page - 1) * data.pagination.limit + 1} to{' '}
                  {Math.min(page * data.pagination.limit, data.pagination.total)} of{' '}
                  {data.pagination.total} restaurants
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page + 1)}
                    disabled={page === data.pagination.totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  )
}
