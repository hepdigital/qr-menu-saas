# Deployment Guide

This guide covers deploying the QR Menu SaaS platform to Vercel with Supabase backend.

## Prerequisites

- Vercel account
- Supabase account
- Domain name (e.g., qrmenu.app)
- Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Configure Vercel Project

### 1.1 Create New Vercel Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your Git repository
4. Select the repository containing this project

### 1.2 Configure Build Settings

Vercel should auto-detect Next.js settings, but verify:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

### 1.3 Configure Environment Variables

Add the following environment variables in Vercel project settings:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=https://qrmenu.app
```

**To get Supabase credentials:**
1. Go to your Supabase project dashboard
2. Navigate to Settings → API
3. Copy the Project URL and anon/public key
4. Copy the service_role key (keep this secret!)

### 1.4 Deploy the Project

1. Click "Deploy"
2. Wait for the build to complete
3. Note the deployment URL (e.g., `your-project.vercel.app`)

## Step 2: Configure Domain and Subdomains

### 2.1 Add Custom Domain

1. In Vercel project settings, go to "Domains"
2. Add your main domain: `qrmenu.app`
3. Follow DNS configuration instructions from Vercel

### 2.2 Configure DNS Records

Add the following DNS records in your domain registrar:

**A Record (for main domain):**
```
Type: A
Name: @
Value: 76.76.21.21 (Vercel's IP)
```

**CNAME Record (for www):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**CNAME Record (for wildcard subdomain):**
```
Type: CNAME
Name: *
Value: cname.vercel-dns.com
```

### 2.3 Add Subdomain Configurations

In Vercel project settings, add these domains:

1. `qrmenu.app` (main domain - landing site)
2. `www.qrmenu.app` (www subdomain)
3. `panel.qrmenu.app` (restaurant panel)
4. `admin.qrmenu.app` (super admin panel)
5. `*.qrmenu.app` (wildcard for restaurant subdomains)

**Note:** Wildcard domains require a Pro plan or higher on Vercel.

### 2.4 Verify SSL Certificates

Vercel automatically provisions SSL certificates. Verify that:
- All domains show "Valid Configuration"
- SSL certificates are active
- HTTPS redirects are enabled

## Step 3: Configure Production Supabase

### 3.1 Create Production Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project for production
3. Choose a strong database password
4. Select a region close to your users (e.g., Frankfurt for EU)

### 3.2 Run Database Migrations

Execute the SQL migrations in order:

1. Go to SQL Editor in Supabase dashboard
2. Run `supabase/migrations/001_initial_schema.sql`
3. Run `supabase/migrations/002_rls_policies.sql`
4. Run `supabase/migrations/003_storage_buckets.sql`

Alternatively, if using Supabase CLI:

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push
```

### 3.3 Configure Storage Buckets

Create storage buckets for images:

1. Go to Storage in Supabase dashboard
2. Create the following buckets:
   - `restaurant-logos` (public)
   - `restaurant-covers` (public)
   - `product-images` (public)

For each bucket:
- Set "Public bucket" to ON
- Configure policies to allow public read access
- Set file size limit to 5MB
- Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`

### 3.4 Configure Authentication

1. Go to Authentication → Settings
2. Enable Email provider
3. Configure Site URL: `https://panel.qrmenu.app`
4. Add Redirect URLs:
   - `https://panel.qrmenu.app/auth/callback`
   - `https://panel.qrmenu.app/reset-password/confirm`
5. Configure email templates (optional):
   - Customize confirmation email
   - Customize password reset email
   - Add your branding

### 3.5 Configure Email Templates

Go to Authentication → Email Templates and customize:

**Confirmation Email:**
```html
<h2>Welcome to QR Menu!</h2>
<p>Click the link below to confirm your email address:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm Email</a></p>
```

**Password Reset Email:**
```html
<h2>Reset Your Password</h2>
<p>Click the link below to reset your password:</p>
<p><a href="{{ .ConfirmationURL }}">Reset Password</a></p>
<p>If you didn't request this, please ignore this email.</p>
```

## Step 4: Update Environment Variables

Update Vercel environment variables with production Supabase credentials:

1. Go to Vercel project settings → Environment Variables
2. Update the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-prod-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-prod-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-prod-service-role-key
   NEXT_PUBLIC_APP_URL=https://qrmenu.app
   ```
3. Redeploy the project for changes to take effect

## Step 5: Test Subdomain Routing

### 5.1 Test Main Domain (Landing Site)

1. Navigate to `https://qrmenu.app`
2. Verify landing page loads correctly
3. Check that all links work
4. Test registration and login links

### 5.2 Test Panel Subdomain (Restaurant Panel)

1. Navigate to `https://panel.qrmenu.app`
2. Verify login page loads
3. Register a test restaurant
4. Verify dashboard loads after registration
5. Test all panel features:
   - Category management
   - Product management
   - QR code generation
   - Theme customization
   - Analytics
   - Settings

### 5.3 Test Admin Subdomain (Super Admin Panel)

1. Navigate to `https://admin.qrmenu.app`
2. Verify admin login page loads
3. Create an admin user in Supabase:
   ```sql
   INSERT INTO admin_users (user_id, role)
   VALUES ('user-uuid-from-auth-users', 'super_admin');
   ```
4. Login with admin credentials
5. Verify admin dashboard loads
6. Test admin features:
   - Restaurant list
   - Restaurant details
   - Platform statistics
   - Payment tracking

### 5.4 Test Restaurant Subdomain (Digital Menu)

1. Create a test restaurant with slug `test-restaurant`
2. Navigate to `https://test-restaurant.qrmenu.app`
3. Verify digital menu loads
4. Test menu features:
   - Category navigation
   - Product display
   - Product details modal
   - Language switching
   - Responsive design on mobile

### 5.5 Test QR Code Scanning

1. Generate QR codes for test restaurant
2. Download QR code PNG files
3. Print or display QR codes
4. Scan with mobile device camera
5. Verify correct restaurant menu loads
6. Verify table number is displayed (if included in QR)

## Step 6: Performance Optimization

### 6.1 Enable Vercel Analytics

1. Go to Vercel project settings → Analytics
2. Enable Web Analytics
3. Monitor page load times and Core Web Vitals

### 6.2 Configure Caching

Verify Next.js ISR is working:
- Digital menus should revalidate every 60 seconds
- Static pages should be cached at edge

### 6.3 Image Optimization

Verify Next.js Image component is optimizing images:
- Check image formats (WebP where supported)
- Verify responsive image sizes
- Check Supabase CDN is being used

## Step 7: Monitoring and Maintenance

### 7.1 Set Up Error Tracking

Consider integrating error tracking:
- Sentry
- LogRocket
- Vercel Error Tracking

### 7.2 Monitor Database Performance

In Supabase dashboard:
- Check query performance
- Monitor connection pool usage
- Review slow queries

### 7.3 Set Up Alerts

Configure alerts for:
- High error rates
- Slow response times
- Database connection issues
- Storage quota warnings

## Troubleshooting

### Subdomain Not Working

**Issue:** Subdomain returns 404 or doesn't route correctly

**Solutions:**
1. Verify DNS records are configured correctly
2. Check that wildcard domain is added in Vercel
3. Wait for DNS propagation (up to 48 hours)
4. Clear browser cache and DNS cache
5. Test with `dig` or `nslookup` command

### Environment Variables Not Loading

**Issue:** App can't connect to Supabase

**Solutions:**
1. Verify environment variables are set in Vercel
2. Check variable names match exactly (case-sensitive)
3. Redeploy after changing environment variables
4. Check that variables are set for production environment

### Database Connection Errors

**Issue:** RLS policies blocking queries

**Solutions:**
1. Verify RLS policies are correctly configured
2. Check that service role key is being used for admin operations
3. Test queries in Supabase SQL editor
4. Review Supabase logs for detailed error messages

### Image Upload Failures

**Issue:** Images not uploading to Supabase Storage

**Solutions:**
1. Verify storage buckets are created
2. Check bucket policies allow uploads
3. Verify file size limits
4. Check CORS configuration in Supabase
5. Review storage quota

### SSL Certificate Issues

**Issue:** SSL certificate not provisioning

**Solutions:**
1. Verify domain ownership in Vercel
2. Check DNS records are correct
3. Wait for certificate provisioning (can take a few minutes)
4. Contact Vercel support if issue persists

## Production Checklist

Before going live, verify:

- [ ] All environment variables are set correctly
- [ ] Database migrations have been run
- [ ] Storage buckets are configured
- [ ] Authentication is working
- [ ] Email templates are customized
- [ ] All subdomains are accessible
- [ ] SSL certificates are active
- [ ] QR codes scan correctly
- [ ] Mobile responsive design works
- [ ] All CRUD operations work
- [ ] Analytics tracking is working
- [ ] Error handling is in place
- [ ] Performance is acceptable
- [ ] Backup strategy is in place

## Rollback Procedure

If issues occur after deployment:

1. Go to Vercel project → Deployments
2. Find the last working deployment
3. Click "..." → "Promote to Production"
4. Verify rollback was successful

## Support

For deployment issues:
- Vercel Documentation: https://vercel.com/docs
- Supabase Documentation: https://supabase.com/docs
- Next.js Documentation: https://nextjs.org/docs

## Security Notes

**Important:**
- Never commit `.env.local` or `.env` files
- Keep `SUPABASE_SERVICE_ROLE_KEY` secret
- Use environment variables for all sensitive data
- Enable 2FA on Vercel and Supabase accounts
- Regularly rotate API keys
- Monitor access logs
- Keep dependencies updated
