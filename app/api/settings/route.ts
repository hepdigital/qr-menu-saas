import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function PATCH(request: NextRequest) {
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
    const { data: restaurant, error: restaurantError } = await supabase
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

    const body = await request.json()
    const { 
      primary_language, 
      currency, 
      email, 
      phone, 
      name 
    } = body

    // Build update object with only provided fields
    const updates: any = {
      updated_at: new Date().toISOString()
    }

    if (primary_language !== undefined) {
      updates.primary_language = primary_language
    }
    if (currency !== undefined) {
      updates.currency = currency
    }
    if (email !== undefined) {
      updates.email = email
    }
    if (phone !== undefined) {
      updates.phone = phone
    }
    if (name !== undefined) {
      updates.name = name
    }

    // Update restaurant settings
    const { data: updatedRestaurant, error: updateError } = await supabase
      .from('restaurants')
      .update(updates)
      .eq('id', restaurant.id)
      .select()
      .single()

    if (updateError) {
      console.error('Update error:', updateError)
      return NextResponse.json(
        { error: 'Failed to update settings' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true,
      restaurant: updatedRestaurant 
    })
  } catch (error) {
    console.error('Settings update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
