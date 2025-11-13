'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronLeft, ChevronRight, DollarSign, TrendingUp, AlertCircle } from 'lucide-react'

interface Payment {
  id: string
  restaurant_id: string
  amount: number
  currency: string
  status: string
  payment_method?: string
  transaction_id?: string
  created_at: string
  restaurant: {
    id: string
    name: string
    email: string
    slug: string
  }
}

interface PaymentListResponse {
  payments: Payment[]
  summary: {
    total: number
    completed: number
    pending: number
    failed: number
    totalRevenue: number
  }
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export function PaymentList() {
  const [data, setData] = useState<PaymentListResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [status, setStatus] = useState<string>('all')
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchPayments()
  }, [page, status])

  const fetchPayments = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
      })

      if (status !== 'all') {
        params.append('status', status)
      }

      const response = await fetch(`/api/admin/payments?${params}`)
      if (response.ok) {
        const result = await response.json()
        setData(result)
      }
    } catch (error) {
      console.error('Error fetching payments:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
    }
    return styles[status as keyof typeof styles] || styles.pending
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
        <p className="mt-2 text-gray-600">Track all payment transactions</p>
      </div>

      {data?.summary && (
        <div className="mb-6 grid gap-6 md:grid-cols-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {data.summary.totalRevenue.toLocaleString()} TRY
                </p>
              </div>
              <div className="rounded-full bg-green-500 p-3">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">{data.summary.completed}</p>
              </div>
              <div className="rounded-full bg-blue-500 p-3">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">{data.summary.pending}</p>
              </div>
              <div className="rounded-full bg-yellow-500 p-3">
                <AlertCircle className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">{data.summary.failed}</p>
              </div>
              <div className="rounded-full bg-red-500 p-3">
                <AlertCircle className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card>
        </div>
      )}

      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-gray-500">Loading payments...</div>
        ) : !data || data.payments.length === 0 ? (
          <div className="py-12 text-center text-gray-500">No payments found</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm font-medium text-gray-500">
                    <th className="pb-3">Restaurant</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Transaction ID</th>
                    <th className="pb-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {data.payments.map((payment) => (
                    <tr key={payment.id} className="text-sm">
                      <td className="py-4">
                        <div>
                          <div className="font-medium text-gray-900">
                            {payment.restaurant.name}
                          </div>
                          <div className="text-gray-500">{payment.restaurant.slug}</div>
                        </div>
                      </td>
                      <td className="py-4 font-medium text-gray-900">
                        {payment.amount} {payment.currency}
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusBadge(
                            payment.status
                          )}`}
                        >
                          {payment.status}
                        </span>
                      </td>
                      <td className="py-4 text-gray-600">
                        {payment.transaction_id || 'N/A'}
                      </td>
                      <td className="py-4 text-gray-600">
                        {new Date(payment.created_at).toLocaleDateString()}
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
                  {data.pagination.total} payments
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
