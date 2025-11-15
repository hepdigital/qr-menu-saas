import { createClient } from '@/lib/supabase/server'
import { getCurrentRestaurant } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { MenuManager } from '@/components/panel/menu-manager'

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
    <MenuManager 
      initialCategories={categories || []} 
      initialProducts={products || []} 
    />
  )
}
