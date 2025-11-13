'use client'

import { useState } from 'react'
import { Category } from '@/types/database'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Pencil, Trash2, GripVertical } from 'lucide-react'
import { CategoryFormDialog } from '@/components/panel/category-form-dialog'
import { DeleteCategoryDialog } from '@/components/panel/delete-category-dialog'

interface CategoryListProps {
  initialCategories: Category[]
}

export function CategoryList({ initialCategories }: CategoryListProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    
    if (draggedIndex === null || draggedIndex === index) return

    const newCategories = [...categories]
    const draggedItem = newCategories[draggedIndex]
    
    // Remove dragged item
    newCategories.splice(draggedIndex, 1)
    // Insert at new position
    newCategories.splice(index, 0, draggedItem)
    
    setCategories(newCategories)
    setDraggedIndex(index)
  }

  const handleDragEnd = async () => {
    if (draggedIndex === null) return

    // Update display_order for all categories
    const updates = categories.map((category, index) => ({
      id: category.id,
      display_order: index,
    }))

    try {
      // Update each category's display_order
      await Promise.all(
        updates.map(update =>
          fetch(`/api/categories/${update.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ display_order: update.display_order }),
          })
        )
      )
    } catch (error) {
      console.error('Failed to update category order:', error)
      // Revert to initial order on error
      setCategories(initialCategories)
    }

    setDraggedIndex(null)
  }

  const handleCategoryCreated = (newCategory: Category) => {
    setCategories([...categories, newCategory])
    setIsCreateDialogOpen(false)
  }

  const handleCategoryUpdated = (updatedCategory: Category) => {
    setCategories(categories.map(cat => 
      cat.id === updatedCategory.id ? updatedCategory : cat
    ))
    setEditingCategory(null)
  }

  const handleCategoryDeleted = (deletedId: string) => {
    setCategories(categories.filter(cat => cat.id !== deletedId))
    setDeletingCategory(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
          <p className="text-sm text-gray-600 mt-1">
            Organize your menu items into categories. Drag to reorder.
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          Add Category
        </Button>
      </div>

      {categories.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500">No categories yet. Create your first category to get started.</p>
        </Card>
      ) : (
        <div className="space-y-2">
          {categories.map((category, index) => (
            <Card
              key={category.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className="p-4 cursor-move hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <GripVertical className="h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    {category.name_en && (
                      <p className="text-sm text-gray-500">English: {category.name_en}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingCategory(category)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeletingCategory(category)}
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
      <CategoryFormDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={handleCategoryCreated}
      />

      {/* Edit Dialog */}
      {editingCategory && (
        <CategoryFormDialog
          open={!!editingCategory}
          onOpenChange={(open: boolean) => !open && setEditingCategory(null)}
          category={editingCategory}
          onSuccess={handleCategoryUpdated}
        />
      )}

      {/* Delete Dialog */}
      {deletingCategory && (
        <DeleteCategoryDialog
          open={!!deletingCategory}
          onOpenChange={(open: boolean) => !open && setDeletingCategory(null)}
          category={deletingCategory}
          onSuccess={handleCategoryDeleted}
        />
      )}
    </div>
  )
}
