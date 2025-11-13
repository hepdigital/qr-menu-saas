'use client'

import Image from 'next/image'
import type { Product } from '@/types/database'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { formatPrice } from '@/lib/utils'

interface ProductDetailModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  language: 'tr' | 'en'
  currency: string
}

export function ProductDetailModal({ 
  product, 
  isOpen, 
  onClose,
  language,
  currency 
}: ProductDetailModalProps) {
  if (!product) return null

  const name = language === 'en' && product.name_en ? product.name_en : product.name
  const description = language === 'en' && product.description_en ? product.description_en : product.description

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {product.image_url && (
          <div className="relative w-full h-64 rounded-lg overflow-hidden -mt-6 -mx-6 mb-4">
            <Image
              src={product.image_url}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <DialogHeader>
          <DialogTitle className="text-2xl">{name}</DialogTitle>
          {description && (
            <DialogDescription className="text-base mt-2">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">
              {formatPrice(product.price, currency)}
            </span>
            {!product.is_available && (
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded text-sm font-medium">
                Sold Out
              </span>
            )}
          </div>

          {product.allergens && product.allergens.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">
                {language === 'en' ? 'Allergens' : 'Alerjenler'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.allergens.map((allergen, index) => (
                  <span 
                    key={index}
                    className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm"
                  >
                    {allergen}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
