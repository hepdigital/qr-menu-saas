import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { registerSchema } from '@/lib/validations'
import { generateUniqueSlug } from '@/lib/slug'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validationResult = registerSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationResult.error.flatten().fieldErrors 
        },
        { status: 400 }
      )
    }
    
    const { name, email, password, phone } = validationResult.data
    
    // Check if email already exists
    const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers()
    const emailExists = existingUser?.users.some(user => user.email === email)
    
    if (emailExists) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 409 }
      )
    }
    
    // Generate unique slug for restaurant
    const slug = generateUniqueSlug(name)
    
    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email for now
    })
    
    if (authError || !authData.user) {
      console.error('Auth error:', authError)
      return NextResponse.json(
        { error: authError?.message || 'Failed to create user account' },
        { status: 500 }
      )
    }
    
    // Create restaurant record in database
    const { data: restaurant, error: restaurantError } = await supabaseAdmin
      .from('restaurants')
      .insert({
        owner_id: authData.user.id,
        name,
        slug,
        email,
        phone: phone || null,
        subscription_status: 'trial',
      })
      .select()
      .single()
    
    if (restaurantError) {
      console.error('Restaurant creation error:', restaurantError)
      
      // Rollback: Delete the auth user if restaurant creation fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
      
      return NextResponse.json(
        { error: 'Failed to create restaurant record' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      {
        message: 'Registration successful',
        user: {
          id: authData.user.id,
          email: authData.user.email,
        },
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          slug: restaurant.slug,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
