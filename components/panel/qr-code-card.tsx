'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { QRCode } from '@/types/database'
import { Download, Trash2 } from 'lucide-react'

interface QRCodeCardProps {
  qrCode: QRCode & { qr_code_data_url?: string }
  onDelete: (id: string) => void
}

export function QRCodeCard({ qrCode, onDelete }: QRCodeCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDownload = () => {
    if (!qrCode.qr_code_data_url) return

    // Create a temporary link element to trigger download
    const link = document.createElement('a')
    link.href = qrCode.qr_code_data_url
    link.download = `qr-code-${qrCode.table_number || 'general'}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this QR code?')) {
      return
    }

    setIsDeleting(true)

    try {
      const response = await fetch(`/api/qr-codes/${qrCode.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete QR code')
      }

      onDelete(qrCode.id)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col items-center space-y-3">
        {qrCode.qr_code_data_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={qrCode.qr_code_data_url}
            alt={`QR Code for ${qrCode.table_number || 'General Menu'}`}
            className="w-48 h-48 border border-gray-200 rounded"
          />
        )}

        <div className="text-center">
          <h3 className="font-semibold text-gray-900">
            {qrCode.table_number || 'General Menu'}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(qrCode.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-2 w-full">
          <Button
            onClick={handleDownload}
            variant="outline"
            size="sm"
            className="flex-1"
            disabled={!qrCode.qr_code_data_url}
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button
            onClick={handleDelete}
            variant="outline"
            size="sm"
            disabled={isDeleting}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
