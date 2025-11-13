import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const { id } = params

    // Get restaurant details
    const { data: restaurant, error: restaurantError } = await supabase
      .from('restaurants')
      .select('*')
      .eq('id', id)
      .single()

    if (restaurantError || !restaurant) {
      return NextResponse.json(
        { error: 'Restaurant not found' },
        { status: 404 }
      )
    }

    // Get category count
    const { count: categoryCount } = await supabase
      .from('categories')
      .select('*', { count: 'exact', head: true })
      .eq('restaurant_id', id)

    // Get product count
    const { count: productCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('restaurant_id', id)

    // Get QR code count
    const { count: qrCodeCount } = await supabase
      .from('qr_codes')
      .select('*', { count: 'exact', head: true })
      .eq('restaurant_id', id)

    // Get menu views count
    const { count: viewCount } = await supabase
      .from('menu_views')
      .select('*', { count: 'exact', head: true })
      .eq('restaurant_id', id)

    // Get recent menu views (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const { data: recentViews } = await supabase
      .from('menu_views')
      .select('viewed_at')
      .eq('restaurant_id', id)
      .gte('viewed_at', thirtyDaysAgo.toISOString())
      .order('viewed_at', { ascending: false })

    // Get payment history
    const { data: payments } = await supabase
      .from('payments')
      .select('*')
      .eq('restaurant_id', id)
      .order('created_at', { ascending: false })
      .limit(10)

    return NextResponse.json({
      restaurant,
      statistics: {
        categories: categoryCount || 0,
        products: productCount || 0,
        qrCodes: qrCodeCount || 0,
        totalViews: viewCount || 0,
        recentViews: recentViews?.length || 0,
      },
      payments: payments || [],
    })
  } catch (error) {
    console.error('Admin restaurant details API error:', error)
    return NextResponse.json(
      { error: 'An error occurred while fetching restaurant details' },
      { status: 500 }
    )
  }
}
