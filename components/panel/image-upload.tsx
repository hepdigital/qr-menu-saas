'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Image from 'next/image'

interface ImageUploadProps {
  label: string
  currentImageUrl?: string
  onUpload: (url: string) => void
  type: 'logo' | 'cover' | 'product'
  aspectRatio?: string
}

export function ImageUpload({ 
  label, 
  currentImageUrl, 
  onUpload, 
  type,
  aspectRatio = 'aspect-square'
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(currentImageUrl)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Please upload a JPEG, PNG, or WebP image')
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must not exceed 5MB')
      return
    }

    setError(null)
    setUploading(true)

    try {
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)

      // Upload to server
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', type)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload image')
      }

      onUpload(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image')
      setPreviewUrl(currentImageUrl)
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setPreviewUrl(undefined)
    onUpload('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      <div className="flex items-start gap-4">
        {/* Preview */}
        <div className={`relative ${aspectRatio} w-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50`}>
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt={label}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs text-center p-2">
              No image
            </div>
          )}
        </div>

        {/* Upload controls */}
        <div className="flex-1 space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
            id={`file-upload-${type}`}
          />
          
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : previewUrl ? 'Change' : 'Upload'}
            </Button>
            
            {previewUrl && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRemove}
                disabled={uploading}
              >
                Remove
              </Button>
            )}
          </div>

          <p className="text-xs text-gray-500">
            JPEG, PNG, or WebP. Max 5MB.
          </p>

          {error && (
            <p className="text-xs text-red-600">{error}</p>
          )}
        </div>
      </div>
    </div>
  )
}
