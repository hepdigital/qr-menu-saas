import { getCurrentRestaurant } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  UtensilsCrossed, 
  QrCode, 
  Palette, 
  Eye,
  TrendingUp,
  Calendar
} from 'lucide-react'

export default async function DashboardPage() {
  const restaurant = await getCurrentRestaurant()
  
  if (!restaurant) {
    return null
  }

  const supabase = await createClient()

  // Fetch statistics
  const [categoriesResult, productsResult, viewsResult] = await Promise.all([
    supabase
      .from('categories')
      .select('id', { count: 'exact', head: true })
      .eq('restaurant_id', restaurant.id),
    supabase
      .from('products')
      .select('id', { count: 'exact', head: true })
      .eq('restaurant_id', restaurant.id),
    supabase
      .from('menu_views')
      .select('id', { count: 'exact', head: true })
      .eq('restaurant_id', restaurant.id),
  ])

  const categoriesCount = categoriesResult.count || 0
  const productsCount = productsResult.count || 0
  const totalViews = viewsResult.count || 0

  // Fetch recent menu views (last 7 days)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const { data: recentViews } = await supabase
    .from('menu_views')
    .select('*')
    .eq('restaurant_id', restaurant.id)
    .gte('viewed_at', sevenDaysAgo.toISOString())
    .order('viewed_at', { ascending: false })
    .limit(10)

  const recentViewsCount = recentViews?.length || 0

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {restaurant.name}!
        </h1>
        <p className="mt-2 text-gray-600">
          Here&apos;s an overview of your restaurant&apos;s digital menu
        </p>
      </div>

      {/* Statistics cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{totalViews}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Recent Views</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{recentViewsCount}</p>
              <p className="text-xs text-gray-500 mt-1">Last 7 days</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{categoriesCount}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <UtensilsCrossed className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Products</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{productsCount}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <UtensilsCrossed className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Quick actions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/panel/menu">
            <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center space-y-2">
              <UtensilsCrossed className="h-6 w-6" />
              <span>Manage Menu</span>
            </Button>
          </Link>
          <Link href="/panel/qr-codes">
            <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center space-y-2">
              <QrCode className="h-6 w-6" />
              <span>Generate QR Codes</span>
            </Button>
          </Link>
          <Link href="/panel/customization">
            <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center space-y-2">
              <Palette className="h-6 w-6" />
              <span>Customize Theme</span>
            </Button>
          </Link>
        </div>
      </Card>

      {/* Recent menu views */}
      {recentViews && recentViews.length > 0 && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Menu Views</h2>
          <div className="space-y-3">
            {recentViews.map((view) => (
              <div
                key={view.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Calendar className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {view.table_number ? `Table ${view.table_number}` : 'Direct Access'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(view.viewed_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/panel/analytics">
              <Button variant="outline" className="w-full">
                View All Analytics
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  )
}
