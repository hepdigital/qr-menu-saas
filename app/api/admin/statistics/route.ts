import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Check if user is admin
    const isAdminUser = await isAdmin()
    
    if (!isAdminUser) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      )
    }

    const supabase = await createClient()

    // Get total restaurants count
    const { count: totalRestaurants } = await supabase
      .from('restaurants')
      .select('*', { count: 'exact', head: true })

    // Get active restaurants (trial or active subscription)
    const { count: activeRestaurants } = await supabase
      .from('restaurants')
      .select('*', { count: 'exact', head: true })
      .in('subscription_status', ['trial', 'active'])

    // Get inactive restaurants
    const { count: inactiveRestaurants } = await supabase
      .from('restaurants')
      .select('*', { count: 'exact', head: true })
      .in('subscription_status', ['expired', 'cancelled'])

    // Get total menu views
    const { count: totalViews } = await supabase
      .from('menu_views')
      .select('*', { count: 'exact', head: true })

    // Get views in last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const { count: recentViews } = await supabase
      .from('menu_views')
      .select('*', { count: 'exact', head: true })
      .gte('viewed_at', thirtyDaysAgo.toISOString())

    // Get total payments
    const { data: payments } = await supabase
      .from('payments')
      .select('amount, currency, status')

    // Calculate revenue
    const totalRevenue = payments
      ?.filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + (p.amount || 0), 0) || 0

    const pendingRevenue = payments
      ?.filter(p => p.status === 'pending')
      .reduce((sum, p) => sum + (p.amount || 0), 0) || 0

    // Get recent registrations (last 30 days)
    const { data: recentRegistrations } = await supabase
      .from('restaurants')
      .select('created_at')
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at', { ascending: false })

    // Group registrations by day
    const registrationsByDay = recentRegistrations?.reduce((acc: any, reg) => {
      const date = new Date(reg.created_at).toISOString().split('T')[0]
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {}) || {}

    // Get views by day for last 30 days
    const { data: viewsByDay } = await supabase
      .from('menu_views')
      .select('viewed_at')
      .gte('viewed_at', thirtyDaysAgo.toISOString())
      .order('viewed_at', { ascending: false })

    const viewsGroupedByDay = viewsByDay?.reduce((acc: any, view) => {
      const date = new Date(view.viewed_at).toISOString().split('T')[0]
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {}) || {}

    return NextResponse.json({
      restaurants: {
        total: totalRestaurants || 0,
        active: activeRestaurants || 0,
        inactive: inactiveRestaurants || 0,
      },
      views: {
        total: totalViews || 0,
        last30Days: recentViews || 0,
        byDay: viewsGroupedByDay,
      },
      revenue: {
        total: totalRevenue,
        pending: pendingRevenue,
        currency: 'TRY', // Default currency
      },
      registrations: {
        last30Days: recentRegistrations?.length || 0,
        byDay: registrationsByDay,
      },
    })
  } catch (error) {
    console.error('Admin statistics API error:', error)
    return NextResponse.json(
      { error: 'An error occurred while fetching statistics' },
      { status: 500 }
    )
  }
}
