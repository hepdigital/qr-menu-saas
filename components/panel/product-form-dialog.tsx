'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Product, Category } from '@/types/database'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Upload, X, ImageIcon } from 'lucide-react'

interface ProductFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: Product
  categories: Category[]
  onSuccess: (product: Product) => void
}

const COMMON_ALLERGENS = [
  'Gluten',
  'Dairy',
  'Eggs',
  'Nuts',
  'Peanuts',
  'Soy',
  'Fish',
  'Shellfish',
  'Sesame',
]

export function ProductFormDialog({
  open,
  onOpenChange,
  product,
  categories,
  onSuccess,
}: ProductFormDialogProps) {
  const [name, setName] = useState(product?.name || '')
  const [nameEn, setNameEn] = useState(product?.name_en || '')
  const [description, setDescription] = useState(product?.description || '')
  const [descriptionEn, setDescriptionEn] = useState(product?.description_en || '')
  const [price, setPrice] = useState(product?.price?.toString() || '')
  const [categoryId, setCategoryId] = useState(product?.category_id || '')
  const [allergens, setAllergens] = useState<string[]>(product?.allergens || [])
  const [imageUrl, setImageUrl] = useState(product?.image_url || '')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(product?.image_url || null)
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isEditing = !!product

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Please select a JPEG, PNG, or WebP image')
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must not exceed 5MB')
      return
    }

    setImageFile(file)
    
    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
    setError(null)
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview(null)
    setImageUrl('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleAllergenToggle = (allergen: string) => {
    setAllergens(prev =>
      prev.includes(allergen)
        ? prev.filter(a => a !== allergen)
        : [...prev, allergen]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      let finalImageUrl = imageUrl

      // Upload image if a new file was selected
      if (imageFile) {
        setIsUploading(true)
        const formData = new FormData()
        formData.append('file', imageFile)
        formData.append('type', 'product')

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        const uploadData = await uploadResponse.json()

        if (!uploadResponse.ok) {
          throw new Error(uploadData.error || 'Failed to upload image')
        }

        finalImageUrl = uploadData.url
        setIsUploading(false)
      }

      const url = isEditing ? `/api/products/${product.id}` : '/api/products'
      const method = isEditing ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          name_en: nameEn || undefined,
          description: description || undefined,
          description_en: descriptionEn || undefined,
          price: parseFloat(price),
          category_id: categoryId || undefined,
          image_url: finalImageUrl || undefined,
          allergens: allergens.length > 0 ? allergens : undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save product')
      }

      onSuccess(data.product)
      
      // Reset form
      resetForm()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
      setIsUploading(false)
    }
  }

  const resetForm = () => {
    setName('')
    setNameEn('')
    setDescription('')
    setDescriptionEn('')
    setPrice('')
    setCategoryId('')
    setAllergens([])
    setImageUrl('')
    setImageFile(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset form when closing
      setName(product?.name || '')
      setNameEn(product?.name_en || '')
      setDescription(product?.description || '')
      setDescriptionEn(product?.description_en || '')
      setPrice(product?.price?.toString() || '')
      setCategoryId(product?.category_id || '')
      setAllergens(product?.allergens || [])
      setImageUrl(product?.image_url || '')
      setImageFile(null)
      setImagePreview(product?.image_url || null)
      setError(null)
    }
    onOpenChange(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Product' : 'Create Product'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Update the product information below.'
              : 'Add a new product to your menu.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Product Image</Label>
              <div className="flex flex-col gap-2">
                {imagePreview ? (
                  <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full aspect-video bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100"
                  >
                    <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload image</p>
                    <p className="text-xs text-gray-500 mt-1">JPEG, PNG, or WebP (max 5MB)</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>
            </div>

            {/* Product Name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Product Name (Turkish) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Margherita Pizza"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name_en">Product Name (English)</Label>
                <Input
                  id="name_en"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  placeholder="e.g., Margherita Pizza"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Description */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="description">Description (Turkish)</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Product description..."
                  rows={3}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description_en">Description (English)</Label>
                <Textarea
                  id="description_en"
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                  placeholder="Product description..."
                  rows={3}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Price and Category */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">
                  Price (₺) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={categoryId || 'none'} onValueChange={(value) => setCategoryId(value === 'none' ? '' : value)} disabled={isLoading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No category</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Allergens */}
            <div className="space-y-2">
              <Label>Allergens</Label>
              <div className="flex flex-wrap gap-2">
                {COMMON_ALLERGENS.map(allergen => (
                  <button
                    key={allergen}
                    type="button"
                    onClick={() => handleAllergenToggle(allergen)}
                    disabled={isLoading}
                    className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                      allergens.includes(allergen)
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-orange-500'
                    }`}
                  >
                    {allergen}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500">
                Select all allergens present in this product
              </p>
            </div>

            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
                {error}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || isUploading}>
              {isLoading
                ? isUploading
                  ? 'Uploading...'
                  : 'Saving...'
                : isEditing
                ? 'Update'
                : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
