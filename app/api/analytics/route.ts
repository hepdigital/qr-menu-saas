import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { createClient } from '@/lib/supabase/server'

// POST endpoint to record menu view
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { restaurant_id, table_number } = body

    if (!restaurant_id) {
      return NextResponse.json(
        { error: 'restaurant_id is required' },
        { status: 400 }
      )
    }

    // Get user agent and IP address
    const userAgent = request.headers.get('user-agent') || undefined
    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                      request.headers.get('x-real-ip') || 
                      undefined

    // Record menu view
    const { data, error } = await supabaseAdmin
      .from('menu_views')
      .insert({
        restaurant_id,
        table_number: table_number || null,
        user_agent: userAgent,
        ip_address: ipAddress,
      })
      .select()
      .single()

    if (error) {
      console.error('Error recording menu view:', error)
      return NextResponse.json(
        { error: 'Failed to record menu view' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Menu view recorded', data },
      { status: 201 }
    )
  } catch (error) {
    console.error('Analytics POST error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// GET endpoint to fetch view statistics
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get restaurant for this user
    const { data: restaurant, error: restaurantError } = await supabaseAdmin
      .from('restaurants')
      .select('id')
      .eq('owner_id', user.id)
      .single()

    if (restaurantError || !restaurant) {
      return NextResponse.json(
        { error: 'Restaurant not found' },
        { status: 404 }
      )
    }

    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '30')

    // Calculate date range
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Fetch total views
    const { count: totalViews, error: totalError } = await supabaseAdmin
      .from('menu_views')
      .select('*', { count: 'exact', head: true })
      .eq('restaurant_id', restaurant.id)
      .gte('viewed_at', startDate.toISOString())
      .lte('viewed_at', endDate.toISOString())

    if (totalError) {
      console.error('Error fetching total views:', totalError)
      return NextResponse.json(
        { error: 'Failed to fetch statistics' },
        { status: 500 }
      )
    }

    // Fetch views grouped by day
    const { data: viewsData, error: viewsError } = await supabaseAdmin
      .from('menu_views')
      .select('viewed_at')
      .eq('restaurant_id', restaurant.id)
      .gte('viewed_at', startDate.toISOString())
      .lte('viewed_at', endDate.toISOString())
      .order('viewed_at', { ascending: true })

    if (viewsError) {
      console.error('Error fetching views by day:', viewsError)
      return NextResponse.json(
        { error: 'Failed to fetch statistics' },
        { status: 500 }
      )
    }

    // Aggregate views by day
    const viewsByDay: Record<string, number> = {}
    viewsData?.forEach((view) => {
      const date = new Date(view.viewed_at).toISOString().split('T')[0]
      viewsByDay[date] = (viewsByDay[date] || 0) + 1
    })

    // Fetch views grouped by table number
    const { data: tableData, error: tableError } = await supabaseAdmin
      .from('menu_views')
      .select('table_number')
      .eq('restaurant_id', restaurant.id)
      .gte('viewed_at', startDate.toISOString())
      .lte('viewed_at', endDate.toISOString())
      .not('table_number', 'is', null)

    if (tableError) {
      console.error('Error fetching views by table:', tableError)
      return NextResponse.json(
        { error: 'Failed to fetch statistics' },
        { status: 500 }
      )
    }

    // Aggregate views by table number
    const viewsByTable: Record<string, number> = {}
    tableData?.forEach((view) => {
      if (view.table_number) {
        viewsByTable[view.table_number] = (viewsByTable[view.table_number] || 0) + 1
      }
    })

    return NextResponse.json({
      totalViews: totalViews || 0,
      viewsByDay,
      viewsByTable,
      dateRange: {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      },
    })
  } catch (error) {
    console.error('Analytics GET error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
