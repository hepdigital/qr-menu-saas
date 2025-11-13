'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Restaurant } from '@/types/database'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

interface SettingsFormProps {
  restaurant: Restaurant
}

export function SettingsForm({ restaurant }: SettingsFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: restaurant.name || '',
    email: restaurant.email || '',
    phone: restaurant.phone || '',
    primary_language: restaurant.primary_language || 'tr',
    currency: restaurant.currency || 'TRY',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update settings')
      }

      toast({
        title: 'Success',
        description: 'Settings updated successfully',
      })

      router.refresh()
    } catch (error) {
      console.error('Settings update error:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update settings',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Restaurant Details Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Restaurant Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Restaurant Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter restaurant name"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="restaurant@example.com"
            />
            <p className="mt-1 text-sm text-gray-500">
              Contact email for your restaurant
            </p>
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="+90 555 123 4567"
            />
            <p className="mt-1 text-sm text-gray-500">
              Contact phone number for your restaurant
            </p>
          </div>
        </div>
      </div>

      {/* Language and Currency Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Language & Currency
        </h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="language">Primary Language</Label>
            <Select
              value={formData.primary_language}
              onValueChange={(value) =>
                setFormData({ ...formData, primary_language: value as 'tr' | 'en' })
              }
            >
              <SelectTrigger id="language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tr">Turkish (Türkçe)</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
            <p className="mt-1 text-sm text-gray-500">
              Default language for your digital menu
            </p>
          </div>

          <div>
            <Label htmlFor="currency">Currency</Label>
            <Select
              value={formData.currency}
              onValueChange={(value) =>
                setFormData({ ...formData, currency: value as 'TRY' | 'USD' | 'EUR' })
              }
            >
              <SelectTrigger id="currency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TRY">Turkish Lira (₺)</SelectItem>
                <SelectItem value="USD">US Dollar ($)</SelectItem>
                <SelectItem value="EUR">Euro (€)</SelectItem>
              </SelectContent>
            </Select>
            <p className="mt-1 text-sm text-gray-500">
              Currency for displaying prices on your menu
            </p>
          </div>
        </div>
      </div>

      {/* Restaurant Subdomain Info */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">
          Your Restaurant URL
        </h3>
        <p className="text-sm text-blue-700">
          <span className="font-mono bg-white px-2 py-1 rounded border border-blue-200">
            {restaurant.slug}.qrmenu.app
          </span>
        </p>
        <p className="mt-2 text-xs text-blue-600">
          This is your unique URL where customers can access your digital menu
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>
    </form>
  )
}
