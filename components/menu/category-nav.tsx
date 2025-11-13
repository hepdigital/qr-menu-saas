'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface CategoryNavProps {
  categories: Array<{ id: string; name: string; name_en?: string }>
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
  language: 'tr' | 'en'
}

export function CategoryNav({ 
  categories, 
  activeCategory, 
  onCategoryChange,
  language 
}: CategoryNavProps) {
  return (
    <div className="sticky top-[73px] z-10 bg-white border-b py-2">
      <div className="container mx-auto px-4">
        <Tabs value={activeCategory} onValueChange={onCategoryChange}>
          <TabsList className="w-full justify-start overflow-x-auto flex-nowrap">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="whitespace-nowrap"
              >
                {language === 'en' && category.name_en ? category.name_en : category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}
