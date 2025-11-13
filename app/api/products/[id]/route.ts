import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getCurrentUser, getCurrentRestaurant } from '@/lib/auth'
import { updateProductSchema } from '@/lib/validations'

/**
 * PATCH /api/products/[id]
 * Update a product for the authenticated restaurant
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
    
    const { id } = await params
    const body = await request.json()
    
    // Validate request body
    const validationResult = updateProductSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationResult.error.format() 
        },
        { status: 400 }
      )
    }
    
    const supabase = await createClient()
    
    // Check if product exists and belongs to the restaurant
    const { data: existingProduct, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .eq('restaurant_id', restaurant.id)
      .single()
    
    if (fetchError || !existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    // If category_id is being updated, verify it belongs to the restaurant
    if (validationResult.data.category_id !== undefined && validationResult.data.category_id !== null) {
      const { data: category, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('id', validationResult.data.category_id)
        .eq('restaurant_id', restaurant.id)
        .single()
      
      if (categoryError || !category) {
        return NextResponse.json(
          { error: 'Invalid category ID' },
          { status: 400 }
        )
      }
    }
    
    // Update product
    const { data: product, error } = await supabase
      .from('products')
      .update({
        ...validationResult.data,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('restaurant_id', restaurant.id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating product:', error)
      return NextResponse.json(
        { error: 'Failed to update product' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { 
        message: 'Product updated successfully',
        product 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/products/[id]
 * Delete a product for the authenticated restaurant
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
    
    const { id } = await params
    const supabase = await createClient()
    
    // Check if product exists and belongs to the restaurant
    const { data: existingProduct, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .eq('restaurant_id', restaurant.id)
      .single()
    
    if (fetchError || !existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    // Delete product
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
      .eq('restaurant_id', restaurant.id)
    
    if (error) {
      console.error('Error deleting product:', error)
      return NextResponse.json(
        { error: 'Failed to delete product' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
