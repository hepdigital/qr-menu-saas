import Image from 'next/image'
import type { Restaurant } from '@/types/database'

interface MenuHeaderProps {
  restaurant: Restaurant
  tableNumber?: string
}

export function MenuHeader({ restaurant, tableNumber }: MenuHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {restaurant.logo_url && (
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={restaurant.logo_url}
                  alt={`${restaurant.name} logo`}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold">{restaurant.name}</h1>
              {restaurant.phone && (
                <p className="text-sm text-muted-foreground">{restaurant.phone}</p>
              )}
            </div>
          </div>
          {tableNumber && (
            <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
              Table {tableNumber}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
