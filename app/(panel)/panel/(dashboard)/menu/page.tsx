import { createClient } from '@/lib/supabase/server'
import { getCurrentRestaurant } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { CategoryList } from '@/components/panel/category-list'
import { ProductList } from '@/components/panel/product-list'

export default async function MenuPage() {
  const restaurant = await getCurrentRestaurant()

  if (!restaurant) {
    redirect('/panel/login')
  }

  const supabase = await createClient()

  // Fetch categories for the restaurant
  const { data: categories, error: categoriesError } = await supabase
    .from('categories')
    .select('*')
    .eq('restaurant_id', restaurant.id)
    .order('display_order', { ascending: true })

  if (categoriesError) {
    console.error('Error fetching categories:', categoriesError)
  }

  // Fetch products for the restaurant
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select(`
      *,
      categories (
        id,
        name,
        name_en
      )
    `)
    .eq('restaurant_id', restaurant.id)
    .order('display_order', { ascending: true })

  if (productsError) {
    console.error('Error fetching products:', productsError)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
        <p className="mt-2 text-gray-600">Manage your categories and products</p>
      </div>
      
      <CategoryList initialCategories={categories || []} />
      
      <div className="border-t pt-8">
        <ProductList 
          initialProducts={products || []} 
          categories={categories || []} 
        />
      </div>
    </div>
  )
}
