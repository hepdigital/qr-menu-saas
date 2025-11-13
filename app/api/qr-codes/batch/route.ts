import { NextRequest, NextResponse } from 'next/server'
import { getCurrentRestaurant } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import QRCode from 'qrcode'
import { z } from 'zod'

const batchQrCodeSchema = z.object({
  table_numbers: z.array(z.string()).min(1, 'At least one table number is required'),
})

/**
 * POST /api/qr-codes/batch
 * Generate multiple QR codes for multiple tables
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
    const validation = batchQrCodeSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validation.error.issues },
        { status: 400 }
      )
    }

    const { table_numbers } = validation.data

    // Get the app URL from environment or construct it
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const baseUrl = appUrl.replace(/^https?:\/\//, '').replace(/^www\./, '')

    const supabase = await createClient()

    // Generate QR codes for all table numbers
    const qrCodes = await Promise.all(
      table_numbers.map(async (table_number) => {
        // Construct the QR data URL with restaurant subdomain and table number
        const qrDataUrl = `https://${restaurant.slug}.${baseUrl}?table=${encodeURIComponent(table_number)}`

        // Generate QR code as data URL
        const qrCodeDataUrl = await QRCode.toDataURL(qrDataUrl, {
          width: 512,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        })

        // Save QR code record to database
        const { data: qrCode, error } = await supabase
          .from('qr_codes')
          .insert({
            restaurant_id: restaurant.id,
            table_number,
            qr_data: qrDataUrl,
          })
          .select()
          .single()

        if (error) {
          console.error(`Error saving QR code for table ${table_number}:`, error)
          throw error
        }

        return {
          ...qrCode,
          qr_code_data_url: qrCodeDataUrl,
        }
      })
    )

    return NextResponse.json({ qrCodes })
  } catch (error) {
    console.error('Error in POST /api/qr-codes/batch:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
