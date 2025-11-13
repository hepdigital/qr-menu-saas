import { NextResponse } from 'next/server'
import { getCurrentUser, getCurrentRestaurant } from '@/lib/auth'

export const dynamic = 'force-dynamic'

/**
 * GET /api/restaurants
 * Get current restaurant information
 */
export async function GET() {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const restaurant = await getCurrentRestaurant()
    
    if (!restaurant) {
      return NextResponse.json(
        { success: false, error: 'Restaurant not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      {
        success: true,
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          slug: restaurant.slug,
          email: restaurant.email,
          phone: restaurant.phone,
          logo_url: restaurant.logo_url,
          cover_image_url: restaurant.cover_image_url,
          primary_color: restaurant.primary_color,
          secondary_color: restaurant.secondary_color,
          theme_id: restaurant.theme_id,
          primary_language: restaurant.primary_language,
          currency: restaurant.currency
        }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
