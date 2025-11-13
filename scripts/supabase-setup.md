# Supabase Production Setup Guide

## Prerequisites

- Supabase account (https://supabase.com)
- Database password (strong, unique)
- Access to project SQL editor

## Step 1: Create Production Project

### 1.1 Create New Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in project details:
   - **Name**: QR Menu Production
   - **Database Password**: Generate a strong password (save it securely!)
   - **Region**: Choose closest to your users (e.g., Frankfurt for EU, N. Virginia for US)
   - **Pricing Plan**: Free tier for testing, Pro for production

4. Click "Create new project"
5. Wait for project provisioning (2-3 minutes)

### 1.2 Get API Credentials

1. Go to Settings → API
2. Copy the following credentials:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGc...` (safe to expose in client)
   - **service_role key**: `eyJhbGc...` (keep secret, server-side only)

3. Save these to your password manager or secure notes

## Step 2: Run Database Migrations

### Option A: Using Supabase Dashboard (Recommended for first-time setup)

1. Go to SQL Editor in Supabase dashboard
2. Click "New Query"
3. Copy and paste the content of each migration file in order:

#### Migration 1: Initial Schema

Copy content from `supabase/migrations/001_initial_schema.sql` and run it.

This creates:
- `restaurants` table
- `categories` table
- `products` table
- `qr_codes` table
- `menu_views` table
- `payments` table
- `admin_users` table

#### Migration 2: RLS Policies

Copy content from `supabase/migrations/002_rls_policies.sql` and run it.

This creates:
- Row Level Security policies for all tables
- Owner-based access control
- Public read access for digital menus
- Admin access policies

#### Migration 3: Storage Buckets

Copy content from `supabase/migrations/003_storage_buckets.sql` and run it.

This creates:
- Storage buckets for images
- Public access policies
- File size and type restrictions

### Option B: Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your production project
supabase link --project-ref your-project-ref

# Push all migrations
supabase db push

# Or run migrations individually
supabase db execute --file supabase/migrations/001_initial_schema.sql
supabase db execute --file supabase/migrations/002_rls_policies.sql
supabase db execute --file supabase/migrations/003_storage_buckets.sql
```

### Verify Migrations

Check that all tables were created:

```sql
-- Run this query in SQL Editor
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

Expected tables:
- admin_users
- categories
- menu_views
- payments
- products
- qr_codes
- restaurants

## Step 3: Configure Storage Buckets

### 3.1 Create Storage Buckets

Go to Storage in Supabase dashboard and create these buckets:

#### Bucket 1: restaurant-logos
- **Name**: `restaurant-logos`
- **Public**: ✅ Yes
- **File size limit**: 5 MB
- **Allowed MIME types**: `image/jpeg,image/png,image/webp`

#### Bucket 2: restaurant-covers
- **Name**: `restaurant-covers`
- **Public**: ✅ Yes
- **File size limit**: 5 MB
- **Allowed MIME types**: `image/jpeg,image/png,image/webp`

#### Bucket 3: product-images
- **Name**: `product-images`
- **Public**: ✅ Yes
- **File size limit**: 5 MB
- **Allowed MIME types**: `image/jpeg,image/png,image/webp`

### 3.2 Configure Bucket Policies

For each bucket, set up policies:

#### Policy 1: Public Read Access

```sql
-- Allow anyone to read files
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'restaurant-logos' );

-- Repeat for other buckets
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'restaurant-covers' );

CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'product-images' );
```

#### Policy 2: Authenticated Upload

```sql
-- Allow authenticated users to upload
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'restaurant-logos' 
  AND auth.role() = 'authenticated'
);

-- Repeat for other buckets
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'restaurant-covers' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images' 
  AND auth.role() = 'authenticated'
);
```

#### Policy 3: Owner Delete

```sql
-- Allow users to delete their own files
CREATE POLICY "Owner Delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'restaurant-logos'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Repeat for other buckets
CREATE POLICY "Owner Delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'restaurant-covers'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Owner Delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'product-images'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

### 3.3 Verify Storage Configuration

Test upload via SQL:

```sql
-- Check buckets exist
SELECT * FROM storage.buckets;

-- Check policies
SELECT * FROM storage.policies;
```

## Step 4: Configure Authentication

### 4.1 Enable Email Provider

1. Go to Authentication → Providers
2. Enable "Email" provider
3. Disable "Confirm email" if you want faster testing (enable for production)

### 4.2 Configure Site URL

1. Go to Authentication → URL Configuration
2. Set **Site URL**: `https://panel.qrmenu.app`
3. Add **Redirect URLs**:
   - `https://panel.qrmenu.app/auth/callback`
   - `https://panel.qrmenu.app/reset-password/confirm`
   - `https://panel.qrmenu.app/*` (wildcard for all panel routes)

### 4.3 Configure JWT Settings

1. Go to Authentication → Settings
2. **JWT expiry**: 604800 (7 days)
3. **Refresh token expiry**: 2592000 (30 days)
4. **Enable refresh token rotation**: ✅ Yes

### 4.4 Configure Rate Limiting

1. Go to Authentication → Rate Limits
2. Set limits to prevent abuse:
   - **Sign up**: 10 per hour per IP
   - **Sign in**: 30 per hour per IP
   - **Password reset**: 5 per hour per IP

## Step 5: Customize Email Templates

### 5.1 Confirmation Email

Go to Authentication → Email Templates → Confirm signup

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Confirm Your Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: #000;
      color: #fff;
      padding: 20px;
      text-align: center;
    }
    .content {
      padding: 30px 20px;
      background: #f9f9f9;
    }
    .button {
      display: inline-block;
      padding: 12px 30px;
      background: #000;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #666;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Welcome to QR Menu!</h1>
  </div>
  <div class="content">
    <h2>Confirm Your Email Address</h2>
    <p>Thank you for registering your restaurant with QR Menu. To complete your registration, please confirm your email address by clicking the button below:</p>
    <p style="text-align: center;">
      <a href="{{ .ConfirmationURL }}" class="button">Confirm Email Address</a>
    </p>
    <p>Or copy and paste this link into your browser:</p>
    <p style="word-break: break-all; color: #666;">{{ .ConfirmationURL }}</p>
    <p>If you didn't create an account with QR Menu, you can safely ignore this email.</p>
  </div>
  <div class="footer">
    <p>&copy; 2024 QR Menu. All rights reserved.</p>
  </div>
</body>
</html>
```

### 5.2 Password Reset Email

Go to Authentication → Email Templates → Reset password

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: #000;
      color: #fff;
      padding: 20px;
      text-align: center;
    }
    .content {
      padding: 30px 20px;
      background: #f9f9f9;
    }
    .button {
      display: inline-block;
      padding: 12px 30px;
      background: #000;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #666;
      font-size: 12px;
    }
    .warning {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 15px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Password Reset Request</h1>
  </div>
  <div class="content">
    <h2>Reset Your Password</h2>
    <p>We received a request to reset the password for your QR Menu account. Click the button below to create a new password:</p>
    <p style="text-align: center;">
      <a href="{{ .ConfirmationURL }}" class="button">Reset Password</a>
    </p>
    <p>Or copy and paste this link into your browser:</p>
    <p style="word-break: break-all; color: #666;">{{ .ConfirmationURL }}</p>
    <div class="warning">
      <strong>⚠️ Security Notice:</strong>
      <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
  </div>
  <div class="footer">
    <p>&copy; 2024 QR Menu. All rights reserved.</p>
  </div>
</body>
</html>
```

### 5.3 Magic Link Email (Optional)

If you want to enable magic link authentication:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your Magic Link</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: #000;
      color: #fff;
      padding: 20px;
      text-align: center;
    }
    .content {
      padding: 30px 20px;
      background: #f9f9f9;
    }
    .button {
      display: inline-block;
      padding: 12px 30px;
      background: #000;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #666;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Your Login Link</h1>
  </div>
  <div class="content">
    <h2>Sign In to QR Menu</h2>
    <p>Click the button below to sign in to your QR Menu account:</p>
    <p style="text-align: center;">
      <a href="{{ .ConfirmationURL }}" class="button">Sign In</a>
    </p>
    <p>Or copy and paste this link into your browser:</p>
    <p style="word-break: break-all; color: #666;">{{ .ConfirmationURL }}</p>
    <p>This link will expire in 1 hour.</p>
  </div>
  <div class="footer">
    <p>&copy; 2024 QR Menu. All rights reserved.</p>
  </div>
</body>
</html>
```

## Step 6: Create Admin User

To access the super admin panel, you need to create an admin user:

### 6.1 Register a User

1. Go to `https://panel.qrmenu.app/register`
2. Register with your admin email
3. Complete email confirmation

### 6.2 Add Admin Role

1. Go to Supabase dashboard → Authentication → Users
2. Find your user and copy the UUID
3. Go to SQL Editor and run:

```sql
-- Insert admin user record
INSERT INTO admin_users (user_id, role)
VALUES ('your-user-uuid-here', 'super_admin');
```

### 6.3 Verify Admin Access

1. Go to `https://admin.qrmenu.app`
2. Login with your admin credentials
3. Verify you can access admin dashboard

## Step 7: Configure Database Indexes

Add indexes for better query performance:

```sql
-- Indexes for restaurants table
CREATE INDEX idx_restaurants_slug ON restaurants(slug);
CREATE INDEX idx_restaurants_owner_id ON restaurants(owner_id);
CREATE INDEX idx_restaurants_subscription_status ON restaurants(subscription_status);

-- Indexes for categories table
CREATE INDEX idx_categories_restaurant_id ON categories(restaurant_id);
CREATE INDEX idx_categories_display_order ON categories(display_order);

-- Indexes for products table
CREATE INDEX idx_products_restaurant_id ON products(restaurant_id);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_is_available ON products(is_available);
CREATE INDEX idx_products_display_order ON products(display_order);

-- Indexes for qr_codes table
CREATE INDEX idx_qr_codes_restaurant_id ON qr_codes(restaurant_id);
CREATE INDEX idx_qr_codes_table_number ON qr_codes(table_number);

-- Indexes for menu_views table
CREATE INDEX idx_menu_views_restaurant_id ON menu_views(restaurant_id);
CREATE INDEX idx_menu_views_viewed_at ON menu_views(viewed_at);
CREATE INDEX idx_menu_views_table_number ON menu_views(table_number);

-- Indexes for payments table
CREATE INDEX idx_payments_restaurant_id ON payments(restaurant_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_created_at ON payments(created_at);
```

## Step 8: Configure Realtime (Optional)

If you want real-time updates for analytics:

```sql
-- Enable realtime for menu_views table
ALTER PUBLICATION supabase_realtime ADD TABLE menu_views;

-- Enable realtime for products table (for live menu updates)
ALTER PUBLICATION supabase_realtime ADD TABLE products;

-- Enable realtime for categories table
ALTER PUBLICATION supabase_realtime ADD TABLE categories;
```

## Step 9: Set Up Database Backups

### 9.1 Enable Automatic Backups

1. Go to Settings → Database
2. Enable **Daily Backups** (Pro plan feature)
3. Set backup retention period (7 days recommended)

### 9.2 Manual Backup

```bash
# Using Supabase CLI
supabase db dump -f backup.sql

# Or using pg_dump directly
pg_dump -h db.xxxxx.supabase.co -U postgres -d postgres > backup.sql
```

## Step 10: Configure CORS (if needed)

If you have custom domains or need specific CORS settings:

```sql
-- Add CORS configuration
ALTER DATABASE postgres SET "app.settings.cors_allowed_origins" TO 'https://qrmenu.app,https://panel.qrmenu.app,https://admin.qrmenu.app';
```

## Verification Checklist

Run these checks to verify everything is set up correctly:

### Database Tables
```sql
-- Check all tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

### RLS Policies
```sql
-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Check policies exist
SELECT tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public';
```

### Storage Buckets
```sql
-- Check buckets exist
SELECT id, name, public 
FROM storage.buckets;

-- Check storage policies
SELECT bucket_id, name 
FROM storage.policies;
```

### Indexes
```sql
-- Check indexes
SELECT tablename, indexname 
FROM pg_indexes 
WHERE schemaname = 'public' 
ORDER BY tablename, indexname;
```

## Troubleshooting

### Migration Errors

**Issue:** SQL migration fails

**Solutions:**
1. Check for syntax errors in SQL
2. Verify tables don't already exist
3. Run migrations in correct order
4. Check database logs for detailed errors

### RLS Policy Issues

**Issue:** Queries blocked by RLS

**Solutions:**
1. Verify policies are created correctly
2. Check user authentication status
3. Test with service role key (bypasses RLS)
4. Review policy conditions

### Storage Upload Failures

**Issue:** Can't upload files to storage

**Solutions:**
1. Verify buckets are created
2. Check bucket is set to public
3. Verify upload policies exist
4. Check file size and type restrictions
5. Review CORS settings

### Authentication Issues

**Issue:** Can't register or login

**Solutions:**
1. Verify email provider is enabled
2. Check site URL is configured
3. Verify redirect URLs are correct
4. Check rate limiting settings
5. Review authentication logs

## Security Best Practices

1. **Use Strong Database Password**: Generate a random 32+ character password
2. **Rotate API Keys**: Regularly rotate service role keys
3. **Enable 2FA**: Enable two-factor authentication on Supabase account
4. **Monitor Logs**: Regularly review authentication and database logs
5. **Limit Service Role Key Usage**: Only use service role key server-side
6. **Enable RLS**: Ensure Row Level Security is enabled on all tables
7. **Regular Backups**: Set up automated daily backups
8. **Update Dependencies**: Keep Supabase client libraries updated

## Performance Optimization

1. **Connection Pooling**: Supabase handles this automatically
2. **Query Optimization**: Use indexes on frequently queried columns
3. **Pagination**: Implement pagination for large datasets
4. **Caching**: Use ISR in Next.js for digital menus
5. **CDN**: Supabase Storage uses CDN automatically

## Monitoring

### Database Metrics

Monitor in Supabase dashboard:
- Query performance
- Connection pool usage
- Database size
- Active connections

### Storage Metrics

Monitor:
- Storage usage
- Bandwidth usage
- Request count
- Error rates

### Authentication Metrics

Monitor:
- Sign-up rate
- Login success/failure rate
- Active users
- Session duration

## Support Resources

- Supabase Documentation: https://supabase.com/docs
- Supabase Support: https://supabase.com/support
- Community: https://github.com/supabase/supabase/discussions
- Status Page: https://status.supabase.com/
