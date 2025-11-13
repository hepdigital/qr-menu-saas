'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Product, Category } from '@/types/database'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Pencil, Trash2, ImageIcon } from 'lucide-react'
import { ProductFormDialog } from '@/components/panel/product-form-dialog'
import { DeleteProductDialog } from '@/components/panel/delete-product-dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ProductWithCategory extends Product {
  categories?: {
    id: string
    name: string
    name_en?: string
  } | null
}

interface ProductListProps {
  initialProducts: ProductWithCategory[]
  categories: Category[]
}

export function ProductList({ initialProducts, categories }: ProductListProps) {
  const [products, setProducts] = useState<ProductWithCategory[]>(initialProducts)
  const [editingProduct, setEditingProduct] = useState<ProductWithCategory | null>(null)
  const [deletingProduct, setDeletingProduct] = useState<ProductWithCategory | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const filteredProducts = categoryFilter === 'all'
    ? products
    : products.filter(p => p.category_id === categoryFilter)

  const handleProductCreated = (newProduct: Product) => {
    // Fetch the category info if needed
    const category = categories.find(c => c.id === newProduct.category_id)
    const productWithCategory = {
      ...newProduct,
      categories: category ? {
        id: category.id,
        name: category.name,
        name_en: category.name_en,
      } : null
    }
    setProducts([...products, productWithCategory])
    setIsCreateDialogOpen(false)
  }

  const handleProductUpdated = (updatedProduct: Product) => {
    const category = categories.find(c => c.id === updatedProduct.category_id)
    const productWithCategory = {
      ...updatedProduct,
      categories: category ? {
        id: category.id,
        name: category.name,
        name_en: category.name_en,
      } : null
    }
    setProducts(products.map(p => 
      p.id === updatedProduct.id ? productWithCategory : p
    ))
    setEditingProduct(null)
  }

  const handleProductDeleted = (deletedId: string) => {
    setProducts(products.filter(p => p.id !== deletedId))
    setDeletingProduct(null)
  }

  const handleStockToggle = async (product: ProductWithCategory) => {
    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_available: !product.is_available }),
      })

      if (!response.ok) {
        throw new Error('Failed to update stock status')
      }

      const data = await response.json()
      handleProductUpdated(data.product)
    } catch (error) {
      console.error('Failed to update stock status:', error)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(price)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Products</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage your menu items and their details
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          Add Product
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Filter by category:</label>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredProducts.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500">
            {categoryFilter === 'all'
              ? 'No products yet. Create your first product to get started.'
              : 'No products in this category.'}
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              {/* Product Image */}
              <div className="aspect-video bg-gray-100 relative">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                {!product.is_available && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">Sold Out</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  {product.name_en && (
                    <p className="text-sm text-gray-500">{product.name_en}</p>
                  )}
                </div>

                {product.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.categories && (
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {product.categories.name}
                    </span>
                  )}
                </div>

                {product.allergens && product.allergens.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {product.allergens.map((allergen, index) => (
                      <span
                        key={index}
                        className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded"
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStockToggle(product)}
                    className="flex-1"
                  >
                    {product.is_available ? 'Mark Sold Out' : 'Mark Available'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingProduct(product)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeletingProduct(product)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create Dialog */}
      <ProductFormDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        categories={categories}
        onSuccess={handleProductCreated}
      />

      {/* Edit Dialog */}
      {editingProduct && (
        <ProductFormDialog
          open={!!editingProduct}
          onOpenChange={(open: boolean) => !open && setEditingProduct(null)}
          product={editingProduct}
          categories={categories}
          onSuccess={handleProductUpdated}
        />
      )}

      {/* Delete Dialog */}
      {deletingProduct && (
        <DeleteProductDialog
          open={!!deletingProduct}
          onOpenChange={(open: boolean) => !open && setDeletingProduct(null)}
          product={deletingProduct}
          onSuccess={handleProductDeleted}
        />
      )}
    </div>
  )
}
