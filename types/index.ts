// Centralized type exports

// Database types
export type {
  Restaurant,
  Category,
  Product,
  QRCode,
  MenuView,
  Payment,
  AdminUser,
} from './database'

// API types
export type {
  // Authentication
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  PasswordResetRequest,
  PasswordResetResponse,
  
  // Category
  CreateCategoryRequest,
  UpdateCategoryRequest,
  CategoryResponse,
  CategoriesListResponse,
  
  // Product
  CreateProductRequest,
  UpdateProductRequest,
  ProductResponse,
  ProductsListResponse,
  
  // Theme
  UpdateThemeRequest,
  ThemeResponse,
  
  // QR Code
  GenerateQRCodeRequest,
  QRCodeResponse,
  QRCodesListResponse,
  
  // Analytics
  AnalyticsResponse,
  
  // File Upload
  FileUploadResponse,
  
  // Restaurant Settings
  UpdateRestaurantRequest,
  RestaurantResponse,
  
  // Admin
  AdminRestaurantsListResponse,
  AdminRestaurantDetailsResponse,
  AdminPlatformStatsResponse,
  AdminPaymentsListResponse,
  
  // Error
  ApiErrorResponse,
} from './api'
