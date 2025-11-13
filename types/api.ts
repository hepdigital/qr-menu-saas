// API Request and Response types

// Authentication
export interface RegisterRequest {
  name: string
  email: string
  password: string
  phone?: string
}

export interface RegisterResponse {
  success: boolean
  restaurant?: {
    id: string
    name: string
    slug: string
  }
  error?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  user?: {
    id: string
    email: string
  }
  restaurant?: {
    id: string
    name: string
    slug: string
  }
  error?: string
}

export interface PasswordResetRequest {
  email: string
}

export interface PasswordResetResponse {
  success: boolean
  message?: string
  error?: string
}

// Category API
export interface CreateCategoryRequest {
  name: string
  name_en?: string
  display_order?: number
}

export interface UpdateCategoryRequest {
  name?: string
  name_en?: string
  display_order?: number
}

export interface CategoryResponse {
  success: boolean
  category?: {
    id: string
    name: string
    name_en?: string
    display_order: number
  }
  error?: string
}

export interface CategoriesListResponse {
  success: boolean
  categories?: Array<{
    id: string
    name: string
    name_en?: string
    display_order: number
    product_count?: number
  }>
  error?: string
}

// Product API
export interface CreateProductRequest {
  name: string
  name_en?: string
  description?: string
  description_en?: string
  price: number
  category_id?: string
  allergens?: string[]
  is_available?: boolean
  display_order?: number
}

export interface UpdateProductRequest {
  name?: string
  name_en?: string
  description?: string
  description_en?: string
  price?: number
  category_id?: string
  image_url?: string
  allergens?: string[]
  is_available?: boolean
  display_order?: number
}

export interface ProductResponse {
  success: boolean
  product?: {
    id: string
    name: string
    name_en?: string
    description?: string
    description_en?: string
    price: number
    category_id?: string
    image_url?: string
    allergens?: string[]
    is_available: boolean
    display_order: number
  }
  error?: string
}

export interface ProductsListResponse {
  success: boolean
  products?: Array<{
    id: string
    name: string
    name_en?: string
    description?: string
    description_en?: string
    price: number
    category_id?: string
    category_name?: string
    image_url?: string
    allergens?: string[]
    is_available: boolean
    display_order: number
  }>
  error?: string
}

// Theme Customization API
export interface UpdateThemeRequest {
  logo_url?: string
  cover_image_url?: string
  primary_color?: string
  secondary_color?: string
  theme_id?: string
}

export interface ThemeResponse {
  success: boolean
  theme?: {
    logo_url?: string
    cover_image_url?: string
    primary_color: string
    secondary_color: string
    theme_id: string
  }
  error?: string
}

// QR Code API
export interface GenerateQRCodeRequest {
  table_number?: string
}

export interface QRCodeResponse {
  success: boolean
  qr_code?: {
    id: string
    table_number?: string
    qr_data: string
    qr_image_url: string
  }
  error?: string
}

export interface QRCodesListResponse {
  success: boolean
  qr_codes?: Array<{
    id: string
    table_number?: string
    qr_data: string
    created_at: string
  }>
  error?: string
}

// Analytics API
export interface AnalyticsResponse {
  success: boolean
  analytics?: {
    total_views: number
    views_by_day: Array<{
      date: string
      count: number
    }>
    views_by_table: Array<{
      table_number: string
      count: number
    }>
  }
  error?: string
}

// File Upload API
export interface FileUploadResponse {
  success: boolean
  url?: string
  error?: string
}

// Restaurant Settings API
export interface UpdateRestaurantRequest {
  name?: string
  email?: string
  phone?: string
  primary_language?: 'tr' | 'en'
  currency?: 'TRY' | 'USD' | 'EUR'
}

export interface RestaurantResponse {
  success: boolean
  restaurant?: {
    id: string
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
  }
  error?: string
}

// Admin API
export interface AdminRestaurantsListResponse {
  success: boolean
  restaurants?: Array<{
    id: string
    name: string
    slug: string
    email?: string
    subscription_status: string
    subscription_plan?: string
    created_at: string
    last_activity?: string
  }>
  total?: number
  error?: string
}

export interface AdminRestaurantDetailsResponse {
  success: boolean
  restaurant?: {
    id: string
    name: string
    slug: string
    email?: string
    phone?: string
    subscription_status: string
    subscription_plan?: string
    subscription_expires_at?: string
    created_at: string
    total_views: number
    total_products: number
    total_categories: number
  }
  error?: string
}

export interface AdminPlatformStatsResponse {
  success: boolean
  stats?: {
    total_restaurants: number
    active_restaurants: number
    trial_restaurants: number
    expired_restaurants: number
    total_revenue: number
    monthly_revenue: number
  }
  error?: string
}

export interface AdminPaymentsListResponse {
  success: boolean
  payments?: Array<{
    id: string
    restaurant_id: string
    restaurant_name: string
    amount: number
    currency: string
    status: string
    payment_method?: string
    created_at: string
  }>
  total?: number
  error?: string
}

// Generic API Error Response
export interface ApiErrorResponse {
  success: false
  error: string
  code?: string
  statusCode?: number
}
