'use client'

import { useEffect, useState } from 'react'
import { QRCodeGenerator } from '@/components/panel/qr-code-generator'
import { BatchQRGenerator } from '@/components/panel/batch-qr-generator'
import { QRCodeCard } from '@/components/panel/qr-code-card'
import { QRCode } from '@/types/database'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function QRCodesPage() {
  const [qrCodes, setQrCodes] = useState<(QRCode & { qr_code_data_url?: string })[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchQRCodes()
  }, [])

  const fetchQRCodes = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/qr-codes')

      if (!response.ok) {
        throw new Error('Failed to fetch QR codes')
      }

      const data = await response.json()
      
      // Generate QR code data URLs for existing codes
      const qrCodesWithDataUrls = await Promise.all(
        data.qrCodes.map(async (qrCode: QRCode) => {
          try {
            // Import QRCode library dynamically
            const QRCodeLib = (await import('qrcode')).default
            const qrCodeDataUrl = await QRCodeLib.toDataURL(qrCode.qr_data, {
              width: 512,
              margin: 2,
              color: {
                dark: '#000000',
                light: '#FFFFFF',
              },
            })
            return { ...qrCode, qr_code_data_url: qrCodeDataUrl }
          } catch (err) {
            console.error('Error generating QR code data URL:', err)
            return qrCode
          }
        })
      )

      setQrCodes(qrCodesWithDataUrls)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerate = (qrCode: QRCode & { qr_code_data_url: string }) => {
    setQrCodes([qrCode, ...qrCodes])
  }

  const handleBatchGenerate = (newQrCodes: (QRCode & { qr_code_data_url: string })[]) => {
    setQrCodes([...newQrCodes, ...qrCodes])
  }

  const handleDelete = (id: string) => {
    setQrCodes(qrCodes.filter((qr) => qr.id !== id))
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">QR Codes</h1>
      <p className="mt-2 text-gray-600">Generate and manage QR codes for your tables</p>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Generator Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Generate QR Codes
            </h2>

            <Tabs defaultValue="single" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="single">Single</TabsTrigger>
                <TabsTrigger value="batch">Batch</TabsTrigger>
              </TabsList>
              <TabsContent value="single" className="mt-4">
                <QRCodeGenerator onGenerate={handleGenerate} />
              </TabsContent>
              <TabsContent value="batch" className="mt-4">
                <BatchQRGenerator onGenerate={handleBatchGenerate} />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* QR Codes List Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Your QR Codes ({qrCodes.length})
            </h2>

            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading QR codes...</p>
              </div>
            ) : error ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            ) : qrCodes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No QR codes yet. Generate your first QR code to get started!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {qrCodes.map((qrCode) => (
                  <QRCodeCard
                    key={qrCode.id}
                    qrCode={qrCode}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
