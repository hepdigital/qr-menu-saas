import { NextRequest, NextResponse } from 'next/server'
import { getCurrentRestaurant } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'

/**
 * DELETE /api/qr-codes/[id]
 * Delete a QR code
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const restaurant = await getCurrentRestaurant()

    if (!restaurant) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = params

    const supabase = await createClient()

    // Delete the QR code (RLS will ensure it belongs to the restaurant)
    const { error } = await supabase
      .from('qr_codes')
      .delete()
      .eq('id', id)
      .eq('restaurant_id', restaurant.id)

    if (error) {
      console.error('Error deleting QR code:', error)
      return NextResponse.json(
        { error: 'Failed to delete QR code' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/qr-codes/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
