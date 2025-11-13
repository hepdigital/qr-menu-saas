// Database table interfaces

export interface Restaurant {
  id: string
  owner_id: string
  name: string
  slug: string
  email?: string
  phone?: string
  logo_url?: string
  cover_image_url?: string
  primary_color: string
  secondary_color: string
  theme_id: string
  primary_language: 'tr' | 'en'
  currency: 'TRY' | 'USD' | 'EUR'
  subscription_status: 'trial' | 'active' | 'expired' | 'cancelled'
  subscription_plan?: string
  subscription_expires_at?: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  restaurant_id: string
  name: string
  name_en?: string
  display_order: number
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  restaurant_id: string
  category_id?: string
  name: string
  name_en?: string
  description?: string
  description_en?: string
  price: number
  image_url?: string
  allergens?: string[]
  is_available: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface QRCode {
  id: string
  restaurant_id: string
  table_number?: string
  qr_data: string
  created_at: string
}

export interface MenuView {
  id: string
  restaurant_id: string
  table_number?: string
  viewed_at: string
  user_agent?: string
  ip_address?: string
}

export interface Payment {
  id: string
  restaurant_id: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed'
  payment_method?: string
  transaction_id?: string
  created_at: string
}

export interface AdminUser {
  id: string
  user_id: string
  role: 'super_admin'
  created_at: string
}
