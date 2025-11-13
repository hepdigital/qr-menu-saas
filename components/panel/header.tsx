'use client'

import Image from 'next/image'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { Restaurant } from '@/types/database'

interface HeaderProps {
  restaurant: Restaurant
}

export function Header({ restaurant }: HeaderProps) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      })

      if (response.ok) {
        router.push('/panel/login')
        router.refresh()
      }
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-0 lg:left-64 z-30">
      <div className="flex items-center justify-between h-full px-6">
        {/* Restaurant info */}
        <div className="flex items-center space-x-3 ml-12 lg:ml-0">
          {restaurant.logo_url && (
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100">
              <Image
                src={restaurant.logo_url}
                alt={restaurant.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
            <h2 className="text-sm font-semibold text-gray-900">{restaurant.name}</h2>
            <p className="text-xs text-gray-500">{restaurant.slug}.qrmenu.app</p>
          </div>
        </div>

        {/* Logout button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </Button>
      </div>
    </header>
  )
}
