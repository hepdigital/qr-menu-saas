'use client'

import { useState, useEffect } from 'react'
import { ImageUpload } from '@/components/panel/image-upload'
import { ColorPicker } from '@/components/panel/color-picker'
import { ThemePreview } from '@/components/panel/theme-preview'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface ThemeData {
  logo_url?: string
  cover_image_url?: string
  primary_color: string
  secondary_color: string
  theme_id: string
}

interface PrebuiltTheme {
  id: string
  name: string
  primary_color: string
  secondary_color: string
  description: string
}

const PREBUILT_THEMES: PrebuiltTheme[] = [
  {
    id: 'default',
    name: 'Classic Black',
    primary_color: '#000000',
    secondary_color: '#FFFFFF',
    description: 'Elegant and timeless'
  },
  {
    id: 'modern-blue',
    name: 'Modern Blue',
    primary_color: '#2563EB',
    secondary_color: '#F0F9FF',
    description: 'Professional and trustworthy'
  },
  {
    id: 'warm-orange',
    name: 'Warm Orange',
    primary_color: '#EA580C',
    secondary_color: '#FFF7ED',
    description: 'Energetic and appetizing'
  },
  {
    id: 'fresh-green',
    name: 'Fresh Green',
    primary_color: '#16A34A',
    secondary_color: '#F0FDF4',
    description: 'Natural and healthy'
  },
  {
    id: 'elegant-purple',
    name: 'Elegant Purple',
    primary_color: '#7C3AED',
    secondary_color: '#FAF5FF',
    description: 'Luxurious and sophisticated'
  }
]

export default function CustomizationPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [restaurantName, setRestaurantName] = useState('My Restaurant')
  const [theme, setTheme] = useState<ThemeData>({
    primary_color: '#000000',
    secondary_color: '#FFFFFF',
    theme_id: 'default'
  })
  const [hasChanges, setHasChanges] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    fetchTheme()
  }, [])

  const fetchTheme = async () => {
    try {
      const response = await fetch('/api/theme')
      const data = await response.json()

      if (data.success && data.theme) {
        setTheme(data.theme)
      }

      // Fetch restaurant name
      const restaurantResponse = await fetch('/api/restaurants')
      const restaurantData = await restaurantResponse.json()
      if (restaurantData.success && restaurantData.restaurant) {
        setRestaurantName(restaurantData.restaurant.name)
      }
    } catch (error) {
      console.error('Error fetching theme:', error)
      setMessage({ type: 'error', text: 'Failed to load theme settings' })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)

    try {
      const response = await fetch('/api/theme', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(theme),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save theme')
      }

      setMessage({ type: 'success', text: 'Theme saved successfully!' })
      setHasChanges(false)
    } catch (error) {
      console.error('Error saving theme:', error)
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to save theme' 
      })
    } finally {
      setSaving(false)
    }
  }

  const updateTheme = (updates: Partial<ThemeData>) => {
    setTheme(prev => ({ ...prev, ...updates }))
    setHasChanges(true)
  }

  const applyPrebuiltTheme = (prebuiltTheme: PrebuiltTheme) => {
    updateTheme({
      primary_color: prebuiltTheme.primary_color,
      secondary_color: prebuiltTheme.secondary_color,
      theme_id: prebuiltTheme.id
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading theme settings...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Theme Customization</h1>
        <p className="mt-2 text-gray-600">Customize your menu&apos;s appearance</p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Customization Options */}
        <div className="space-y-6">
          {/* Images */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Images</h2>
            <div className="space-y-6">
              <ImageUpload
                label="Restaurant Logo"
                currentImageUrl={theme.logo_url}
                onUpload={(url) => updateTheme({ logo_url: url })}
                type="logo"
                aspectRatio="aspect-square"
              />
              
              <ImageUpload
                label="Cover Image"
                currentImageUrl={theme.cover_image_url}
                onUpload={(url) => updateTheme({ cover_image_url: url })}
                type="cover"
                aspectRatio="aspect-video"
              />
            </div>
          </Card>

          {/* Colors */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Colors</h2>
            <div className="space-y-4">
              <ColorPicker
                label="Primary Color"
                value={theme.primary_color}
                onChange={(color) => updateTheme({ primary_color: color })}
              />
              
              <ColorPicker
                label="Secondary Color"
                value={theme.secondary_color}
                onChange={(color) => updateTheme({ secondary_color: color })}
              />
            </div>
          </Card>

          {/* Pre-built Themes */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Pre-built Themes</h2>
            <div className="space-y-3">
              {PREBUILT_THEMES.map((prebuiltTheme) => (
                <button
                  key={prebuiltTheme.id}
                  onClick={() => applyPrebuiltTheme(prebuiltTheme)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all hover:border-gray-400 ${
                    theme.theme_id === prebuiltTheme.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <div 
                        className="w-8 h-8 rounded"
                        style={{ backgroundColor: prebuiltTheme.primary_color }}
                      />
                      <div 
                        className="w-8 h-8 rounded border border-gray-300"
                        style={{ backgroundColor: prebuiltTheme.secondary_color }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{prebuiltTheme.name}</h3>
                      <p className="text-xs text-gray-500">{prebuiltTheme.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className="w-full"
            size="lg"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        {/* Right Column - Preview */}
        <div className="lg:sticky lg:top-6 h-fit">
          <ThemePreview
            logoUrl={theme.logo_url}
            coverImageUrl={theme.cover_image_url}
            primaryColor={theme.primary_color}
            secondaryColor={theme.secondary_color}
            restaurantName={restaurantName}
          />
        </div>
      </div>
    </div>
  )
}
