# Implementation Plan

- [x] 1. Project setup and configuration




- [x] 1.1 Initialize Next.js 14 project with TypeScript and App Router


  - Create new Next.js project with `npx create-next-app@latest`
  - Configure TypeScript, ESLint, and Tailwind CSS
  - Set up project folder structure (app, components, lib, types)
  - _Requirements: All_

- [x] 1.2 Configure Supabase client and environment variables


  - Install Supabase client library
  - Create Supabase project and obtain credentials
  - Set up environment variables for Supabase URL and keys
  - Create Supabase client utility functions
  - _Requirements: 1.1, 1.3_


- [x] 1.3 Set up shadcn/ui and base UI components

  - Install and configure shadcn/ui
  - Add base components (Button, Input, Card, Dialog, etc.)
  - Create theme configuration with CSS variables
  - _Requirements: 4.1, 4.2, 4.3_

- [x] 2. Database schema and migrations





- [x] 2.1 Create database schema SQL file


  - Write SQL for all tables (restaurants, categories, products, qr_codes, menu_views, payments, admin_users)
  - Define foreign key relationships and constraints
  - Add indexes for performance optimization
  - _Requirements: 1.1, 2.1, 3.1, 5.1, 8.1, 12.1_

- [x] 2.2 Implement Row Level Security policies


  - Create RLS policies for restaurant owners
  - Create public read policies for digital menus
  - Create admin policies for super admin access
  - _Requirements: 1.3, 10.1, 11.1_

- [x] 2.3 Configure Supabase Storage buckets


  - Create storage buckets for logos, covers, and product images
  - Set up public access policies for image buckets
  - Configure file size and type restrictions
  - _Requirements: 3.2, 4.1, 4.3_


- [x] 3. TypeScript types and validation schemas





- [x] 3.1 Create database type definitions


  - Define TypeScript interfaces for all database tables
  - Create types for API responses and requests
  - Export types from centralized types file
  - _Requirements: All_

- [x] 3.2 Implement Zod validation schemas


  - Create validation schemas for registration, login, and password reset
  - Create validation schemas for category and product forms
  - Create validation schema for theme customization
  - _Requirements: 1.1, 1.2, 2.1, 3.1, 4.2_

- [x] 4. Subdomain routing and middleware





- [x] 4.1 Implement Next.js middleware for subdomain detection


  - Create middleware.ts with subdomain extraction logic
  - Implement routing logic for main domain, panel, admin, and restaurant subdomains
  - Add URL rewriting for each subdomain type
  - _Requirements: 7.1, 7.2, 13.1, 13.2, 13.3, 13.4, 13.5_


- [x] 4.2 Create app directory structure for multi-site routing

  - Create /landing route for main domain
  - Create /panel route for restaurant panel
  - Create /admin route for super admin panel
  - Create /menu route for digital menus
  - _Requirements: 13.1, 13.2, 13.3, 13.4_

- [-] 5. Authentication system


- [x] 5.1 Implement restaurant registration


  - Create registration API route with Supabase Auth
  - Generate unique restaurant slug from name
  - Create restaurant record in database
  - Implement password validation and error handling
  - _Requirements: 1.1, 1.2, 1.5_

- [x] 5.2 Implement login and session management


  - Create login API route with Supabase Auth
  - Set up JWT token handling
  - Implement session persistence
  - Create logout functionality
  - _Requirements: 1.3, 10.5_

- [x] 5.3 Implement password reset flow


  - Create password reset request API route
  - Send password reset email via Supabase
  - Create password reset confirmation page
  - _Requirements: 1.4_

- [x] 5.4 Create authentication UI components






  - Build registration form with validation
  - Build login form with error handling
  - Build password reset form
  - Add loading states and success messages
  - _Requirements: 1.1, 1.2, 1.3, 1.4_
-

- [x] 6. Landing site




- [x] 6.1 Create landing page layout and hero section


  - Build responsive landing page layout
  - Create hero section with main CTA
  - Add navigation header with login/register links
  - _Requirements: 9.1, 9.3_

- [x] 6.2 Build features and pricing sections


  - Create features showcase section
  - Build pricing cards with subscription tiers
  - Add example menu demonstrations
  - _Requirements: 9.1, 9.2, 9.4_

- [x] 6.3 Add contact and footer sections


  - Create contact information section
  - Build footer with links and support options
  - Add social media links
  - _Requirements: 9.5_


- [x] 7. Restaurant panel layout and navigation




- [x] 7.1 Create restaurant panel layout component

  - Build sidebar navigation with menu items
  - Create header with restaurant name and logo
  - Implement responsive mobile navigation
  - Add logout button
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [x] 7.2 Implement authentication guard for panel routes


  - Create middleware to check authentication
  - Redirect unauthenticated users to login
  - Fetch and display current restaurant data
  - _Requirements: 10.1, 1.3_


- [x] 7.3 Create dashboard home page

  - Display restaurant overview statistics
  - Show recent menu views
  - Add quick action buttons
  - _Requirements: 10.1, 10.2_


- [x] 8. Category management



- [x] 8.1 Create category CRUD API routes


  - Implement GET endpoint to fetch categories
  - Implement POST endpoint to create category
  - Implement PATCH endpoint to update category
  - Implement DELETE endpoint to remove category
  - Add validation and error handling
  - _Requirements: 2.1, 2.2, 2.3_


- [x] 8.2 Build category management UI

  - Create category list with drag-and-drop reordering
  - Build category creation form
  - Build category edit modal
  - Add delete confirmation dialog
  - Implement multi-language name fields
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 6.1_

- [x] 9. Product management



- [x] 9.1 Create product CRUD API routes


  - Implement GET endpoint to fetch products
  - Implement POST endpoint to create product
  - Implement PATCH endpoint to update product
  - Implement DELETE endpoint to remove product
  - Add validation and error handling
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 9.2 Implement image upload functionality


  - Create file upload API route
  - Upload images to Supabase Storage
  - Generate and return public image URLs
  - Validate file type and size
  - _Requirements: 3.2_

- [x] 9.3 Build product management UI


  - Create product list with category filtering
  - Build product creation form with image upload
  - Build product edit modal
  - Add delete confirmation dialog
  - Implement stock status toggle
  - Add allergen selection interface
  - Implement multi-language fields
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 6.1_

- [x] 10. Theme customization




- [x] 10.1 Create theme customization API routes


  - Implement PATCH endpoint to update restaurant theme settings
  - Save logo and cover image URLs
  - Update color preferences
  - _Requirements: 4.1, 4.2, 4.3_

- [x] 10.2 Build theme customization UI







  - Create logo upload component
  - Create cover image upload component
  - Build color picker for primary and secondary colors
  - Add theme preview component
  - Create pre-built theme selection interface
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_


- [x] 11. QR code generation





- [x] 11.1 Create QR code generation API routes

  - Implement POST endpoint to generate QR codes
  - Generate QR data with restaurant subdomain and table number
  - Save QR code records to database
  - Return QR code data URL
  - _Requirements: 5.1, 5.2_


- [x] 11.2 Build QR code management UI

  - Create QR code generation form with table number input
  - Display generated QR codes with preview
  - Implement QR code download functionality (PNG format)
  - Add batch QR generation for multiple tables
  - Create QR code list view
  - _Requirements: 5.1, 5.2, 5.3, 5.4_
-

- [x] 12. Digital menu display







- [x] 12.1 Create digital menu data fetching logic



  - Fetch restaurant by subdomain slug
  - Fetch categories and products for restaurant
  - Handle non-existent restaurant error
  - Implement ISR with 60-second revalidation
  - _Requirements: 7.1, 7.2, 7.5_

- [x] 12.2 Build digital menu UI components


  - Create menu header with logo and restaurant info
  - Build category navigation tabs
  - Create product card component
  - Build product detail modal
  - Add table number indicator
  - Implement responsive mobile-first design
  - _Requirements: 7.2, 7.3, 7.4, 5.5_

- [x] 12.3 Implement multi-language support for menu


  - Detect browser language preference
  - Display content in selected language
  - Fall back to primary language if translation missing
  - Add language switcher component
  - _Requirements: 6.1, 6.2, 6.5_

- [x] 12.4 Implement currency formatting


  - Format prices according to selected currency
  - Display appropriate currency symbol
  - Handle decimal places correctly
  - _Requirements: 6.3, 6.4_
-


- [x] 13. Analytics tracking





- [x] 13.1 Create analytics API routes


  - Implement POST endpoint to record menu view
  - Implement GET endpoint to fetch view statistics
  - Aggregate views by day and table number
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 13.2 Implement view tracking in digital menu


  - Track menu view on page load
  - Send view event to analytics API
  - Include table number if present
  - Capture user agent and IP address
  - _Requirements: 8.1, 8.4_

- [x] 13.3 Build analytics dashboard UI


  - Display total menu views
  - Create chart for views over past 30 days
  - Show breakdown by table number
  - Add date range filter


  - _Requirements: 8.2, 8.3, 8.5_
-

- [x] 14. Super admin panel






- [x] 14.1 Create admin authentication system

  - Implement admin user check middleware
  - Create admin login page
  - Restrict access to admin routes
  - _Requirements: 11.1_

- [x] 14.2 Create admin API routes


  - Implement GET endpoint for all restaurants list
  - Implement GET endpoint for restaurant details
  - Implement GET endpoint for platform statistics
  - Implement GET endpoint for payment list
  - _Requirements: 11.2, 11.3, 11.4, 12.2, 12.3, 12.4_

- [x] 14.3 Build admin panel UI


  - Create admin layout with navigation
  - Build restaurant list table with filters
  - Createe eyrentatr ntacaion vliwt


  - Build platform statistics dashbo
ard
  - Create payment transactions list
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 12.2, 12.3, 12.4_

- [x] 15. Settings and configuration




- [x] 15.1 Create restaurant settings API routes


  - Implement PATCH endpoint for language and currency
  - Implement PATCH endpoint for contact information
  - _Requirements: 6.1, 6.3_

- [x] 15.2 Build settings UI


  - Create language selection dropdown
  - Create currency selection dropdown
  - Build contact information form
  - Add restaurant details edit form
  - _Requirements: 6.1, 6.3_

- [x] 16. Deployment and configuration




- [x] 16.1 Configure Vercel deployment


  - Set up Vercel project
  - Configure environment variables
  - Set up domain and wildcard subdomain
  - Configure build settings
  - _Requirements: All_



- [x] 16.2 Configure production Supabase instance

  - Run database migrations
  - Set up storage buckets
  - Configure authentication settings
  - Set up email templates

  - _Requirements: All_

- [x] 16.3 Test subdomain routing in production

  - Verify main domain serves landing site
  - Verify panel subdomain serves restaurant panel
  - Verify admin subdomain serves admin panel
  - Test restaurant subdomain routing
  - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

- [ ]* 17. Testing and quality assurance
- [ ]* 17.1 Write unit tests for validation schemas
  - Test registration validation
  - Test product validation
  - Test category validation
  - _Requirements: 1.1, 2.1, 3.1_

- [ ]* 17.2 Write integration tests for authentication
  - Test registration flow
  - Test login flow
  - Test password reset flow
  - _Requirements: 1.1, 1.3, 1.4_

- [ ]* 17.3 Perform manual testing
  - Test responsive design on mobile and desktop
  - Test QR code scanning with real devices
  - Test image uploads
  - Test multi-language switching
  - Verify subdomain routing
  - _Requirements: All_
