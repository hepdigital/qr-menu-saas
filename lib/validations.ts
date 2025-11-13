import { z } from 'zod'

// Authentication validation schemas

export const registerSchema = z.object({
  name: z.string()
    .min(2, 'Restaurant name must be at least 2 characters')
    .max(100, 'Restaurant name must not exceed 100 characters'),
  email: z.string()
    .email('Invalid email address')
    .toLowerCase(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  phone: z.string()
    .optional()
    .refine(
      (val: string | undefined) => !val || val.length >= 10,
      'Phone number must be at least 10 digits'
    ),
})

export const loginSchema = z.object({
  email: z.string()
    .email('Invalid email address')
    .toLowerCase(),
  password: z.string()
    .min(1, 'Password is required'),
})

export const passwordResetSchema = z.object({
  email: z.string()
    .email('Invalid email address')
    .toLowerCase(),
})

export const passwordResetConfirmSchema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string()
    .min(1, 'Please confirm your password'),
}).refine((data: { password: string; confirmPassword: string }) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

// Category validation schemas

export const categorySchema = z.object({
  name: z.string()
    .min(1, 'Category name is required')
    .max(100, 'Category name must not exceed 100 characters'),
  name_en: z.string()
    .max(100, 'English category name must not exceed 100 characters')
    .optional(),
  display_order: z.number()
    .int('Display order must be an integer')
    .min(0, 'Display order must be non-negative')
    .default(0),
})

export const updateCategorySchema = z.object({
  name: z.string()
    .min(1, 'Category name is required')
    .max(100, 'Category name must not exceed 100 characters')
    .optional(),
  name_en: z.string()
    .max(100, 'English category name must not exceed 100 characters')
    .optional(),
  display_order: z.number()
    .int('Display order must be an integer')
    .min(0, 'Display order must be non-negative')
    .optional(),
})

// Product validation schemas

export const productSchema = z.object({
  name: z.string()
    .min(1, 'Product name is required')
    .max(200, 'Product name must not exceed 200 characters'),
  name_en: z.string()
    .max(200, 'English product name must not exceed 200 characters')
    .optional(),
  description: z.string()
    .max(1000, 'Description must not exceed 1000 characters')
    .optional(),
  description_en: z.string()
    .max(1000, 'English description must not exceed 1000 characters')
    .optional(),
  price: z.number()
    .positive('Price must be positive')
    .max(999999.99, 'Price is too large'),
  category_id: z.string()
    .uuid('Invalid category ID')
    .optional(),
  allergens: z.array(z.string())
    .optional(),
  is_available: z.boolean()
    .default(true),
  display_order: z.number()
    .int('Display order must be an integer')
    .min(0, 'Display order must be non-negative')
    .default(0),
})

export const updateProductSchema = z.object({
  name: z.string()
    .min(1, 'Product name is required')
    .max(200, 'Product name must not exceed 200 characters')
    .optional(),
  name_en: z.string()
    .max(200, 'English product name must not exceed 200 characters')
    .optional(),
  description: z.string()
    .max(1000, 'Description must not exceed 1000 characters')
    .optional(),
  description_en: z.string()
    .max(1000, 'English description must not exceed 1000 characters')
    .optional(),
  price: z.number()
    .positive('Price must be positive')
    .max(999999.99, 'Price is too large')
    .optional(),
  category_id: z.string()
    .uuid('Invalid category ID')
    .nullable()
    .optional(),
  image_url: z.string()
    .url('Invalid image URL')
    .optional(),
  allergens: z.array(z.string())
    .optional(),
  is_available: z.boolean()
    .optional(),
  display_order: z.number()
    .int('Display order must be an integer')
    .min(0, 'Display order must be non-negative')
    .optional(),
})

// Theme customization validation schemas

export const themeCustomizationSchema = z.object({
  logo_url: z.string()
    .url('Invalid logo URL')
    .optional(),
  cover_image_url: z.string()
    .url('Invalid cover image URL')
    .optional(),
  primary_color: z.string()
    .regex(/^#[0-9A-F]{6}$/i, 'Invalid color format. Use hex format (e.g., #FF5733)'),
  secondary_color: z.string()
    .regex(/^#[0-9A-F]{6}$/i, 'Invalid color format. Use hex format (e.g., #FF5733)'),
  theme_id: z.string()
    .min(1, 'Theme ID is required'),
})

export const updateThemeSchema = z.object({
  logo_url: z.string()
    .url('Invalid logo URL')
    .optional(),
  cover_image_url: z.string()
    .url('Invalid cover image URL')
    .optional(),
  primary_color: z.string()
    .regex(/^#[0-9A-F]{6}$/i, 'Invalid color format. Use hex format (e.g., #FF5733)')
    .optional(),
  secondary_color: z.string()
    .regex(/^#[0-9A-F]{6}$/i, 'Invalid color format. Use hex format (e.g., #FF5733)')
    .optional(),
  theme_id: z.string()
    .min(1, 'Theme ID is required')
    .optional(),
})

// QR Code validation schemas

export const generateQRCodeSchema = z.object({
  table_number: z.string()
    .max(50, 'Table number must not exceed 50 characters')
    .optional(),
})

// Restaurant settings validation schemas

export const updateRestaurantSchema = z.object({
  name: z.string()
    .min(2, 'Restaurant name must be at least 2 characters')
    .max(100, 'Restaurant name must not exceed 100 characters')
    .optional(),
  email: z.string()
    .email('Invalid email address')
    .toLowerCase()
    .optional(),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .optional(),
  primary_language: z.enum(['tr', 'en'], {
    message: 'Language must be either "tr" or "en"',
  })
    .optional(),
  currency: z.enum(['TRY', 'USD', 'EUR'], {
    message: 'Currency must be TRY, USD, or EUR',
  })
    .optional(),
})

// File upload validation

export const fileUploadSchema = z.object({
  file: z.instanceof(File, { message: 'File is required' })
    .refine((file: File) => file.size <= 5 * 1024 * 1024, 'File size must not exceed 5MB')
    .refine(
      (file: File) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'File must be a JPEG, PNG, or WebP image'
    ),
})

// Type exports for use in components
export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type PasswordResetInput = z.infer<typeof passwordResetSchema>
export type CategoryInput = z.infer<typeof categorySchema>
export type ProductInput = z.infer<typeof productSchema>
export type ThemeCustomizationInput = z.infer<typeof themeCustomizationSchema>
export type UpdateRestaurantInput = z.infer<typeof updateRestaurantSchema>
export type GenerateQRCodeInput = z.infer<typeof generateQRCodeSchema>
