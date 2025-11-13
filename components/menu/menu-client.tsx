'use client'

import { useState, useEffect } from 'react'
import type { Restaurant, Category, Product } from '@/types/database'
import { MenuHeader } from './menu-header'
import { CategoryNav } from './category-nav'
import { ProductCard } from './product-card'
import { ProductDetailModal } from './product-detail-modal'
import { LanguageSwitcher } from './language-switcher'

interface MenuClientProps {
  restaurant: Restaurant
  categories: (Category & { products: Product[] })[]
  tableNumber?: string
}

export function MenuClient({ restaurant, categories, tableNumber }: MenuClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || '')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [language, setLanguage] = useState<'tr' | 'en'>(restaurant.primary_language)

  // Detect browser language preference on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.startsWith('en')) {
        setLanguage('en')
      } else if (browserLang.startsWith('tr')) {
        setLanguage('tr')
      } else {
        // Fall back to restaurant's primary language
        setLanguage(restaurant.primary_language)
      }
    }
  }, [restaurant.primary_language])

  // Track menu view on page load
  useEffect(() => {
    const trackView = async () => {
      try {
        await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            restaurant_id: restaurant.id,
            table_number: tableNumber || null,
          }),
        })
      } catch (error) {
        // Silently fail - analytics shouldn't break the user experience
        console.error('Failed to track menu view:', error)
      }
    }

    trackView()
  }, [restaurant.id, tableNumber])

  const activeCategoryData = categories.find(cat => cat.id === activeCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      <MenuHeader restaurant={restaurant} tableNumber={tableNumber} />
      
      {categories.length > 0 && (
        <CategoryNav
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          language={language}
        />
      )}

      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-end mb-4">
          <LanguageSwitcher
            currentLanguage={language}
            onLanguageChange={setLanguage}
          />
        </div>

        {activeCategoryData && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {language === 'en' && activeCategoryData.name_en 
                ? activeCategoryData.name_en 
                : activeCategoryData.name}
            </h2>
            
            {activeCategoryData.products.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                {language === 'en' ? 'No products in this category' : 'Bu kategoride ürün bulunmuyor'}
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {activeCategoryData.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    language={language}
                    currency={restaurant.currency}
                    onClick={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {language === 'en' ? 'No menu items available' : 'Menü öğesi bulunmuyor'}
            </p>
          </div>
        )}
      </div>

      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        language={language}
        currency={restaurant.currency}
      />
    </div>
  )
}
