'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { QRCode } from '@/types/database'

interface QRCodeGeneratorProps {
  onGenerate: (qrCode: QRCode & { qr_code_data_url: string }) => void
}

export function QRCodeGenerator({ onGenerate }: QRCodeGeneratorProps) {
  const [tableNumber, setTableNumber] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch('/api/qr-codes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          table_number: tableNumber || undefined,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to generate QR code')
      }

      const data = await response.json()
      onGenerate(data.qrCode)
      setTableNumber('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="table-number">Table Number (Optional)</Label>
        <Input
          id="table-number"
          type="text"
          placeholder="e.g., Table 1, A1, etc."
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          className="mt-1"
        />
        <p className="text-sm text-gray-500 mt-1">
          Leave empty to generate a general menu QR code
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <Button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full"
      >
        {isGenerating ? 'Generating...' : 'Generate QR Code'}
      </Button>
    </div>
  )
}
