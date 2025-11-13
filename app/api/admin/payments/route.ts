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
    const { searchParams } = new URL(request.url)
    
    // Get query parameters for filtering
    const status = searchParams.get('status')
    const restaurantId = searchParams.get('restaurant_id')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    // Build query with restaurant join
    let query = supabase
      .from('payments')
      .select(`
        *,
        restaurant:restaurants(id, name, email, slug)
      `, { count: 'exact' })
      .order('created_at', { ascending: false })

    // Apply filters
    if (status) {
      query = query.eq('status', status)
    }

    if (restaurantId) {
      query = query.eq('restaurant_id', restaurantId)
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1)

    const { data: payments, error, count } = await query

    if (error) {
      console.error('Error fetching payments:', error)
      return NextResponse.json(
        { error: 'Failed to fetch payments' },
        { status: 500 }
      )
    }

    // Calculate summary statistics
    const allPayments = await supabase
      .from('payments')
      .select('amount, status, currency')

    const summary = {
      total: allPayments.data?.length || 0,
      completed: allPayments.data?.filter(p => p.status === 'completed').length || 0,
      pending: allPayments.data?.filter(p => p.status === 'pending').length || 0,
      failed: allPayments.data?.filter(p => p.status === 'failed').length || 0,
      totalRevenue: allPayments.data
        ?.filter(p => p.status === 'completed')
        .reduce((sum, p) => sum + (p.amount || 0), 0) || 0,
    }

    return NextResponse.json({
      payments,
      summary,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    })
  } catch (error) {
    console.error('Admin payments API error:', error)
    return NextResponse.json(
      { error: 'An error occurred while fetching payments' },
      { status: 500 }
    )
  }
}
