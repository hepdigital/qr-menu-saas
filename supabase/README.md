# Supabase Database Migrations

This directory contains SQL migration files for the QR Menu SaaS platform.

## Migration Files

1. **001_initial_schema.sql** - Creates all database tables with proper relationships, constraints, and indexes
2. **002_rls_policies.sql** - Implements Row Level Security policies for data access control
3. **003_storage_buckets.sql** - Configures storage buckets for image uploads with access policies

## How to Apply Migrations

### Option 1: Using Supabase Dashboard (Recommended for initial setup)

1. Log in to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of each migration file in order (001, 002, 003)
4. Execute each migration

### Option 2: Using Supabase CLI

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Apply migrations
supabase db push
```

## Database Schema Overview

### Tables

- **restaurants** - Restaurant accounts and settings
- **categories** - Menu categories for organizing products
- **products** - Menu items with pricing and details
- **qr_codes** - Generated QR codes for tables
- **menu_views** - Analytics tracking for menu views
- **payments** - Payment transactions and subscriptions
- **admin_users** - Super admin access control

### Storage Buckets

- **restaurant-logos** - Restaurant logo images (5MB limit)
- **restaurant-covers** - Restaurant cover photos (5MB limit)
- **product-images** - Product photos (5MB limit)

All buckets accept: JPEG, JPG, PNG, and WebP formats

## Security Features

### Row Level Security (RLS)

All tables have RLS enabled with policies that:
- Allow restaurant owners to manage only their own data
- Allow public read access for digital menu display
- Allow super admins to access all data
- Restrict sensitive operations to authenticated users

### Storage Security

Storage buckets have policies that:
- Allow public read access for all images
- Restrict uploads/updates/deletes to restaurant owners
- Organize files by restaurant ID for isolation
- Enforce file size limits (5MB) and type restrictions

## Environment Variables Required

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Production Deployment

For production deployment, see:
- [../scripts/supabase-setup.md](../scripts/supabase-setup.md) - Complete Supabase setup guide
- [../scripts/run-migrations.sh](../scripts/run-migrations.sh) - Automated migration script (Linux/Mac)
- [../scripts/run-migrations.ps1](../scripts/run-migrations.ps1) - Automated migration script (Windows)

### Quick Production Setup

```bash
# Run all migrations at once
./scripts/run-migrations.sh

# Or on Windows
.\scripts\run-migrations.ps1
```

## Notes

- All timestamps use `TIMESTAMP WITH TIME ZONE` for proper timezone handling
- Automatic `updated_at` triggers are set up for restaurants, categories, and products
- Foreign key constraints use `ON DELETE CASCADE` for proper cleanup
- Indexes are optimized for common query patterns
