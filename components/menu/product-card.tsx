import Image from 'next/image'
import type { Product } from '@/types/database'
import { Card, CardContent } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  language: 'tr' | 'en'
  currency: string
  onClick: () => void
}

export function ProductCard({ product, language, currency, onClick }: ProductCardProps) {
  const name = language === 'en' && product.name_en ? product.name_en : product.name
  const description = language === 'en' && product.description_en ? product.description_en : product.description

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{name}</h3>
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {description}
              </p>
            )}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">
                {formatPrice(product.price, currency)}
              </span>
              {!product.is_available && (
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                  Sold Out
                </span>
              )}
            </div>
          </div>
          {product.image_url && (
            <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={product.image_url}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
