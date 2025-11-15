'use client'

import { useState } from 'react'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { GripVertical, Plus, Pencil, Trash2, ChevronDown, ChevronRight, Eye, EyeOff } from 'lucide-react'
import { Category, Product } from '@/types/database'
import { CategoryFormDialog } from '@/components/panel/category-form-dialog'
import { ProductFormDialog } from '@/components/panel/product-form-dialog'
import { DeleteCategoryDialog } from '@/components/panel/delete-category-dialog'
import { DeleteProductDialog } from '@/components/panel/delete-product-dialog'

interface ProductWithCategory extends Product {
  categories?: {
    id: string
    name: string
    name_en?: string
  } | null
}

interface MenuManagerProps {
  initialCategories: Category[]
  initialProducts: ProductWithCategory[]
}

// Sortable Category Component
function SortableCategory({ 
  category, 
  products,
  allCategories,
  onEditCategory,
  onDeleteCategory,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onToggleProductAvailability,
  onReorderProducts
}: {
  category: Category
  products: ProductWithCategory[]
  allCategories: Category[]
  onEditCategory: (category: Category) => void
  onDeleteCategory: (category: Category) => void
  onAddProduct: (categoryId: string) => void
  onEditProduct: (product: ProductWithCategory) => void
  onDeleteProduct: (product: ProductWithCategory) => void
  onToggleProductAvailability: (product: ProductWithCategory) => void
  onReorderProducts: (categoryId: string, products: ProductWithCategory[]) => void
}) {
  const [isExpanded, setIsExpanded] = useState(true)
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: category.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = products.findIndex((p) => p.id === active.id)
      const newIndex = products.findIndex((p) => p.id === over.id)
      const reorderedProducts = arrayMove(products, oldIndex, newIndex)
      onReorderProducts(category.id, reorderedProducts)
    }
  }

  return (
    <div ref={setNodeRef} style={style} className="mb-4">
      <Card className="overflow-hidden">
        {/* Category Header */}
        <div className="bg-gray-50 border-b p-4 flex items-center gap-3">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
          >
            <GripVertical className="h-5 w-5" />
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-600 hover:text-gray-900"
          >
            {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>

          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{category.name}</h3>
            {category.name_en && (
              <p className="text-sm text-gray-500">{category.name_en}</p>
            )}
          </div>

          <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded">
            {products.length} items
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddProduct(category.id)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Product
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEditCategory(category)}
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDeleteCategory(category)}
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>

        {/* Products List */}
        {isExpanded && (
          <div className="p-4">
            {products.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No products in this category. Click "Add Product" to create one.
              </div>
            ) : (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={products.map(p => p.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-2">
                    {products.map((product) => (
                      <SortableProduct
                        key={product.id}
                        product={product}
                        onEdit={onEditProduct}
                        onDelete={onDeleteProduct}
                        onToggleAvailability={onToggleProductAvailability}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}

// Sortable Product Component
function SortableProduct({
  product,
  onEdit,
  onDelete,
  onToggleAvailability,
}: {
  product: ProductWithCategory
  onEdit: (product: ProductWithCategory) => void
  onDelete: (product: ProductWithCategory) => void
  onToggleAvailability: (product: ProductWithCategory) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: product.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(price)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-3 bg-white border rounded-lg hover:shadow-sm transition-shadow ${
        !product.is_available ? 'opacity-60' : ''
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
      >
        <GripVertical className="h-4 w-4" />
      </button>

      {product.image_url && (
        <img
          src={product.image_url}
          alt={product.name}
          className="w-12 h-12 object-cover rounded"
        />
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-gray-900 truncate">{product.name}</h4>
          {!product.is_available && (
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">Sold Out</span>
          )}
        </div>
        {product.name_en && (
          <p className="text-sm text-gray-500 truncate">{product.name_en}</p>
        )}
      </div>

      <div className="text-right">
        <p className="font-semibold text-gray-900">{formatPrice(product.price)}</p>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleAvailability(product)}
          title={product.is_available ? 'Mark as sold out' : 'Mark as available'}
        >
          {product.is_available ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(product)}
        >
          <Pencil className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(product)}
        >
          <Trash2 className="h-4 w-4 text-red-600" />
        </Button>
      </div>
    </div>
  )
}

// Main Menu Manager Component
export function MenuManager({ initialCategories, initialProducts }: MenuManagerProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [products, setProducts] = useState<ProductWithCategory[]>(initialProducts)
  
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null)
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false)
  
  const [editingProduct, setEditingProduct] = useState<ProductWithCategory | null>(null)
  const [deletingProduct, setDeletingProduct] = useState<ProductWithCategory | null>(null)
  const [isCreateProductOpen, setIsCreateProductOpen] = useState(false)
  const [selectedCategoryForProduct, setSelectedCategoryForProduct] = useState<string>('')

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Category handlers
  const handleCategoryDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = categories.findIndex((c) => c.id === active.id)
      const newIndex = categories.findIndex((c) => c.id === over.id)
      const reorderedCategories = arrayMove(categories, oldIndex, newIndex)
      
      setCategories(reorderedCategories)

      // Update display_order in database
      try {
        await Promise.all(
          reorderedCategories.map((category, index) =>
            fetch(`/api/categories/${category.id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ display_order: index }),
            })
          )
        )
      } catch (error) {
        console.error('Failed to update category order:', error)
      }
    }
  }

  const handleCategoryCreated = (newCategory: Category) => {
    setCategories([...categories, newCategory])
    setIsCreateCategoryOpen(false)
  }

  const handleCategoryUpdated = (updatedCategory: Category) => {
    setCategories(categories.map(c => c.id === updatedCategory.id ? updatedCategory : c))
    setEditingCategory(null)
  }

  const handleCategoryDeleted = (deletedId: string) => {
    setCategories(categories.filter(c => c.id !== deletedId))
    setDeletingCategory(null)
  }

  // Product handlers
  const handleProductsReorder = async (categoryId: string, reorderedProducts: ProductWithCategory[]) => {
    // Update local state
    const otherProducts = products.filter(p => p.category_id !== categoryId)
    setProducts([...otherProducts, ...reorderedProducts])

    // Update display_order in database
    try {
      await Promise.all(
        reorderedProducts.map((product, index) =>
          fetch(`/api/products/${product.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ display_order: index }),
          })
        )
      )
    } catch (error) {
      console.error('Failed to update product order:', error)
    }
  }

  const handleAddProduct = (categoryId: string) => {
    setSelectedCategoryForProduct(categoryId)
    setIsCreateProductOpen(true)
  }

  const handleProductCreated = (newProduct: Product) => {
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
    setIsCreateProductOpen(false)
    setSelectedCategoryForProduct('')
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
    setProducts(products.map(p => p.id === updatedProduct.id ? productWithCategory : p))
    setEditingProduct(null)
  }

  const handleProductDeleted = (deletedId: string) => {
    setProducts(products.filter(p => p.id !== deletedId))
    setDeletingProduct(null)
  }

  const handleToggleProductAvailability = async (product: ProductWithCategory) => {
    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_available: !product.is_available }),
      })

      if (!response.ok) {
        throw new Error('Failed to update product availability')
      }

      const data = await response.json()
      handleProductUpdated(data.product)
    } catch (error) {
      console.error('Failed to update product availability:', error)
    }
  }

  // Get products for a category
  const getProductsForCategory = (categoryId: string) => {
    return products
      .filter(p => p.category_id === categoryId)
      .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
  }

  // Get uncategorized products
  const uncategorizedProducts = products
    .filter(p => !p.category_id)
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Menu Management</h2>
          <p className="text-sm text-gray-600 mt-1">
            Drag and drop to reorder categories and products
          </p>
        </div>
        <Button onClick={() => setIsCreateCategoryOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Categories with Products */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleCategoryDragEnd}>
        <SortableContext items={categories.map(c => c.id)} strategy={verticalListSortingStrategy}>
          {categories.map((category) => (
            <SortableCategory
              key={category.id}
              category={category}
              products={getProductsForCategory(category.id)}
              allCategories={categories}
              onEditCategory={setEditingCategory}
              onDeleteCategory={setDeletingCategory}
              onAddProduct={handleAddProduct}
              onEditProduct={setEditingProduct}
              onDeleteProduct={setDeletingProduct}
              onToggleProductAvailability={handleToggleProductAvailability}
              onReorderProducts={handleProductsReorder}
            />
          ))}
        </SortableContext>
      </DndContext>

      {/* Uncategorized Products */}
      {uncategorizedProducts.length > 0 && (
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Uncategorized Products</h3>
          <div className="space-y-2">
            {uncategorizedProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-3 p-3 bg-gray-50 border rounded-lg">
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{product.name}</h4>
                  {product.name_en && (
                    <p className="text-sm text-gray-500">{product.name_en}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingProduct(product)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Dialogs */}
      <CategoryFormDialog
        open={isCreateCategoryOpen}
        onOpenChange={setIsCreateCategoryOpen}
        onSuccess={handleCategoryCreated}
      />

      {editingCategory && (
        <CategoryFormDialog
          open={!!editingCategory}
          onOpenChange={(open) => !open && setEditingCategory(null)}
          category={editingCategory}
          onSuccess={handleCategoryUpdated}
        />
      )}

      {deletingCategory && (
        <DeleteCategoryDialog
          open={!!deletingCategory}
          onOpenChange={(open) => !open && setDeletingCategory(null)}
          category={deletingCategory}
          onSuccess={handleCategoryDeleted}
        />
      )}

      <ProductFormDialog
        open={isCreateProductOpen}
        onOpenChange={setIsCreateProductOpen}
        categories={categories}
        onSuccess={handleProductCreated}
        defaultCategoryId={selectedCategoryForProduct}
      />

      {editingProduct && (
        <ProductFormDialog
          open={!!editingProduct}
          onOpenChange={(open) => !open && setEditingProduct(null)}
          product={editingProduct}
          categories={categories}
          onSuccess={handleProductUpdated}
        />
      )}

      {deletingProduct && (
        <DeleteProductDialog
          open={!!deletingProduct}
          onOpenChange={(open) => !open && setDeletingProduct(null)}
          product={deletingProduct}
          onSuccess={handleProductDeleted}
        />
      )}
    </div>
  )
}
