import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getCurrentUser, getCurrentRestaurant } from '@/lib/auth'
import { productSchema } from '@/lib/validations'

/**
 * GET /api/products
 * Fetch all products for the authenticated restaurant
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const restaurant = await getCurrentRestaurant()
    
    if (!restaurant) {
      return NextResponse.json(
        { error: 'Restaurant not found' },
        { status: 404 }
      )
    }
    
    const supabase = await createClient()
    
    // Get optional category filter from query params
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('category_id')
    
    let query = supabase
      .from('products')
      .select(`
        *,
        categories (
          id,
          name,
          name_en
        )
      `)
      .eq('restaurant_id', restaurant.id)
      .order('display_order', { ascending: true })
    
    // Apply category filter if provided
    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }
    
    const { data: products, error } = await query
    
    if (error) {
      console.error('Error fetching products:', error)
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ products }, { status: 200 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/products
 * Create a new product for the authenticated restaurant
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const restaurant = await getCurrentRestaurant()
    
    if (!restaurant) {
      return NextResponse.json(
        { error: 'Restaurant not found' },
        { status: 404 }
      )
    }
    
    const body = await request.json()
    
    // Validate request body
    const validationResult = productSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationResult.error.format() 
        },
        { status: 400 }
      )
    }
    
    const { 
      name, 
      name_en, 
      description, 
      description_en, 
      price, 
      category_id, 
      allergens, 
      is_available, 
      display_order 
    } = validationResult.data
    
    const supabase = await createClient()
    
    // If category_id is provided, verify it belongs to the restaurant
    if (category_id) {
      const { data: category, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('id', category_id)
        .eq('restaurant_id', restaurant.id)
        .single()
      
      if (categoryError || !category) {
        return NextResponse.json(
          { error: 'Invalid category ID' },
          { status: 400 }
        )
      }
    }
    
    // Create product
    const { data: product, error } = await supabase
      .from('products')
      .insert({
        restaurant_id: restaurant.id,
        name,
        name_en: name_en || null,
        description: description || null,
        description_en: description_en || null,
        price,
        category_id: category_id || null,
        allergens: allergens || null,
        is_available: is_available ?? true,
        display_order: display_order ?? 0,
      })
      .select()
      .single()
    
    if (error) {
      console.error('Error creating product:', error)
      return NextResponse.json(
        { error: 'Failed to create product' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { 
        message: 'Product created successfully',
        product 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
