import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase/server'
import type { Restaurant, Category, Product } from '@/types/database'
import { MenuClient } from '@/components/menu/menu-client'

// Enable ISR with 60-second revalidation
export const revalidate = 60

interface MenuData {
  restaurant: Restaurant
  categories: (Category & { products: Product[] })[]
}

async function getMenuData(slug: string): Promise<MenuData | null> {
  try {
    // Fetch restaurant by subdomain slug
    const { data: restaurant, error: restaurantError } = await supabaseAdmin
      .from('restaurants')
      .select('*')
      .eq('slug', slug)
      .single()

    if (restaurantError || !restaurant) {
      return null
    }

    // Fetch categories for restaurant
    const { data: categories, error: categoriesError } = await supabaseAdmin
      .from('categories')
      .select('*')
      .eq('restaurant_id', restaurant.id)
      .order('display_order', { ascending: true })

    if (categoriesError) {
      throw categoriesError
    }

    // Fetch products for restaurant
    const { data: products, error: productsError } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('restaurant_id', restaurant.id)
      .order('display_order', { ascending: true })

    if (productsError) {
      throw productsError
    }

    // Group products by category
    const categoriesWithProducts = (categories || []).map(category => ({
      ...category,
      products: (products || []).filter(product => product.category_id === category.id)
    }))

    return {
      restaurant,
      categories: categoriesWithProducts
    }
  } catch (error) {
    console.error('Error fetching menu data:', error)
    return null
  }
}

export default async function MenuPage({
  searchParams,
}: {
  searchParams: { restaurant?: string; table?: string }
}) {
  const restaurantSlug = searchParams.restaurant
  const tableNumber = searchParams.table

  // Handle missing restaurant slug
  if (!restaurantSlug) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold">Digital Menu</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          No restaurant specified
        </p>
      </main>
    )
  }

  // Fetch menu data
  const menuData = await getMenuData(restaurantSlug)

  // Handle non-existent restaurant
  if (!menuData) {
    notFound()
  }

  const { restaurant, categories } = menuData

  return <MenuClient restaurant={restaurant} categories={categories} tableNumber={tableNumber} />
}
