import { NextRequest, NextResponse } from 'next/server'
import { getCurrentRestaurant } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { getRestaurantUrl } from '@/lib/domain'
import QRCode from 'qrcode'
import { z } from 'zod'

const qrCodeSchema = z.object({
  table_number: z.string().optional(),
})

const batchQrCodeSchema = z.object({
  table_numbers: z.array(z.string()).min(1, 'At least one table number is required'),
})

/**
 * GET /api/qr-codes
 * Fetch all QR codes for the current restaurant
 */
export async function GET() {
  try {
    const restaurant = await getCurrentRestaurant()

    if (!restaurant) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabase = await createClient()

    const { data: qrCodes, error } = await supabase
      .from('qr_codes')
      .select('*')
      .eq('restaurant_id', restaurant.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching QR codes:', error)
      return NextResponse.json(
        { error: 'Failed to fetch QR codes' },
        { status: 500 }
      )
    }

    return NextResponse.json({ qrCodes })
  } catch (error) {
    console.error('Error in GET /api/qr-codes:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/qr-codes
 * Generate a new QR code for a table
 */
export async function POST(request: NextRequest) {
  try {
    const restaurant = await getCurrentRestaurant()

    if (!restaurant) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validation = qrCodeSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validation.error.issues },
        { status: 400 }
      )
    }

    const { table_number } = validation.data

    // Construct the QR data URL with restaurant subdomain and table number
    const qrDataUrl = getRestaurantUrl(restaurant.slug, table_number)

    // Generate QR code as data URL
    const qrCodeDataUrl = await QRCode.toDataURL(qrDataUrl, {
      width: 512,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    })

    const supabase = await createClient()

    // Save QR code record to database
    const { data: qrCode, error } = await supabase
      .from('qr_codes')
      .insert({
        restaurant_id: restaurant.id,
        table_number: table_number || null,
        qr_data: qrDataUrl,
      })
      .select()
      .single()

    if (error) {
      console.error('Error saving QR code:', error)
      return NextResponse.json(
        { error: 'Failed to save QR code' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      qrCode: {
        ...qrCode,
        qr_code_data_url: qrCodeDataUrl,
      },
    })
  } catch (error) {
    console.error('Error in POST /api/qr-codes:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
