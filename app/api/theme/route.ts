import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getCurrentUser, getCurrentRestaurant } from '@/lib/auth'
import { updateThemeSchema } from '@/lib/validations'

/**
 * PATCH /api/theme
 * Update restaurant theme settings
 */
export async function PATCH(request: NextRequest) {
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
    
    const body = await request.json()
    
    // Validate request body
    const validation = updateThemeSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          details: validation.error.issues 
        },
        { status: 400 }
      )
    }
    
    const { logo_url, cover_image_url, primary_color, secondary_color, theme_id } = validation.data
    
    const supabase = await createClient()
    
    // Build update object with only provided fields
    const updateData: Record<string, any> = {
      updated_at: new Date().toISOString()
    }
    
    if (logo_url !== undefined) updateData.logo_url = logo_url
    if (cover_image_url !== undefined) updateData.cover_image_url = cover_image_url
    if (primary_color !== undefined) updateData.primary_color = primary_color
    if (secondary_color !== undefined) updateData.secondary_color = secondary_color
    if (theme_id !== undefined) updateData.theme_id = theme_id
    
    // Update restaurant theme settings
    const { data, error } = await supabase
      .from('restaurants')
      .update(updateData)
      .eq('id', restaurant.id)
      .select('logo_url, cover_image_url, primary_color, secondary_color, theme_id')
      .single()
    
    if (error) {
      console.error('Error updating theme:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to update theme settings' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      {
        success: true,
        theme: data
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

/**
 * GET /api/theme
 * Get current restaurant theme settings
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
        theme: {
          logo_url: restaurant.logo_url,
          cover_image_url: restaurant.cover_image_url,
          primary_color: restaurant.primary_color,
          secondary_color: restaurant.secondary_color,
          theme_id: restaurant.theme_id
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
