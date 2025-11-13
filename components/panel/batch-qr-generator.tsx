'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { QRCode } from '@/types/database'

interface BatchQRGeneratorProps {
  onGenerate: (qrCodes: (QRCode & { qr_code_data_url: string })[]) => void
}

export function BatchQRGenerator({ onGenerate }: BatchQRGeneratorProps) {
  const [tableNumbers, setTableNumbers] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    setIsGenerating(true)
    setError(null)

    // Parse table numbers from input (comma-separated or range)
    const numbers = parseTableNumbers(tableNumbers)

    if (numbers.length === 0) {
      setError('Please enter at least one table number')
      setIsGenerating(false)
      return
    }

    try {
      const response = await fetch('/api/qr-codes/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          table_numbers: numbers,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to generate QR codes')
      }

      const data = await response.json()
      onGenerate(data.qrCodes)
      setTableNumbers('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsGenerating(false)
    }
  }

  const parseTableNumbers = (input: string): string[] => {
    const numbers: string[] = []
    const parts = input.split(',').map((p) => p.trim())

    for (const part of parts) {
      // Check if it's a range (e.g., "1-5")
      const rangeMatch = part.match(/^(\d+)-(\d+)$/)
      if (rangeMatch) {
        const start = parseInt(rangeMatch[1])
        const end = parseInt(rangeMatch[2])
        for (let i = start; i <= end; i++) {
          numbers.push(i.toString())
        }
      } else if (part) {
        numbers.push(part)
      }
    }

    return numbers
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="table-numbers">Table Numbers</Label>
        <Input
          id="table-numbers"
          type="text"
          placeholder="e.g., 1,2,3 or 1-10 or A1,A2,B1"
          value={tableNumbers}
          onChange={(e) => setTableNumbers(e.target.value)}
          className="mt-1"
        />
        <p className="text-sm text-gray-500 mt-1">
          Enter comma-separated table numbers or ranges (e.g., 1-10)
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
        {isGenerating ? 'Generating...' : 'Generate Multiple QR Codes'}
      </Button>
    </div>
  )
}
