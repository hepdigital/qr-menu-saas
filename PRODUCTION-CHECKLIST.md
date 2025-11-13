# Production Deployment Checklist

Use this checklist to ensure all deployment steps are completed correctly.

## Pre-Deployment

### Code Preparation
- [ ] All features are implemented and tested
- [ ] No console.log statements in production code
- [ ] Environment variables are documented
- [ ] Error handling is implemented
- [ ] Loading states are implemented
- [ ] TypeScript errors are resolved
- [ ] ESLint warnings are addressed
- [ ] Build succeeds locally (`npm run build`)

### Repository
- [ ] Code is committed to Git
- [ ] Repository is pushed to GitHub/GitLab/Bitbucket
- [ ] .gitignore includes .env files
- [ ] README.md is updated
- [ ] License file is included (if applicable)

## Supabase Setup

### Project Creation
- [ ] Production Supabase project created
- [ ] Strong database password generated and saved
- [ ] Appropriate region selected
- [ ] Project URL and API keys copied

### Database Migrations
- [ ] Migration 001 (Initial Schema) executed successfully
- [ ] Migration 002 (RLS Policies) executed successfully
- [ ] Migration 003 (Storage Buckets) executed successfully
- [ ] All tables created and verified
- [ ] All indexes created
- [ ] RLS enabled on all tables

### Storage Configuration
- [ ] `restaurant-logos` bucket created (public)
- [ ] `restaurant-covers` bucket created (public)
- [ ] `product-images` bucket created (public)
- [ ] Public read policies configured
- [ ] Authenticated upload policies configured
- [ ] Owner delete policies configured
- [ ] File size limits set (5MB)
- [ ] MIME type restrictions configured

### Authentication Setup
- [ ] Email provider enabled
- [ ] Site URL configured (`https://panel.qrmenu.app`)
- [ ] Redirect URLs added
- [ ] JWT expiry set (7 days)
- [ ] Refresh token rotation enabled
- [ ] Rate limiting configured
- [ ] Email confirmation settings configured

### Email Templates
- [ ] Confirmation email template customized
- [ ] Password reset email template customized
- [ ] Magic link email template customized (if using)
- [ ] Email templates tested

### Admin User
- [ ] Admin user registered
- [ ] Admin user email confirmed
- [ ] Admin user added to `admin_users` table
- [ ] Admin access verified

## Vercel Setup

### Project Creation
- [ ] Vercel account created/logged in
- [ ] New project created
- [ ] Git repository connected
- [ ] Framework preset set to Next.js
- [ ] Build settings verified

### Environment Variables
- [ ] `NEXT_PUBLIC_SUPABASE_URL` added
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` added
- [ ] `SUPABASE_SERVICE_ROLE_KEY` added
- [ ] `NEXT_PUBLIC_APP_URL` added
- [ ] All variables set for Production environment
- [ ] All variables set for Preview environment (optional)

### Domain Configuration
- [ ] Main domain added (`qrmenu.app`)
- [ ] WWW subdomain added (`www.qrmenu.app`)
- [ ] Panel subdomain added (`panel.qrmenu.app`)
- [ ] Admin subdomain added (`admin.qrmenu.app`)
- [ ] Wildcard domain added (`*.qrmenu.app`) - requires Pro plan
- [ ] DNS A record configured
- [ ] DNS CNAME records configured (www, wildcard)
- [ ] DNS propagation verified
- [ ] SSL certificates provisioned
- [ ] All domains show "Valid Configuration"

### Deployment
- [ ] Initial deployment successful
- [ ] Build logs reviewed (no errors)
- [ ] Deployment URL accessible
- [ ] Custom domain accessible

## Testing

### Main Domain (Landing Site)
- [ ] `https://qrmenu.app` loads correctly
- [ ] Hero section displays
- [ ] Features section displays
- [ ] Pricing section displays
- [ ] Contact section displays
- [ ] Navigation works
- [ ] Register link works
- [ ] Login link works
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop

### Panel Subdomain (Restaurant Panel)
- [ ] `https://panel.qrmenu.app` loads correctly
- [ ] Login page displays
- [ ] Registration works
- [ ] Email confirmation works (if enabled)
- [ ] Login works
- [ ] Dashboard loads after login
- [ ] Sidebar navigation works
- [ ] All menu items accessible

#### Category Management
- [ ] Can create category
- [ ] Can edit category
- [ ] Can delete category
- [ ] Can reorder categories
- [ ] Multi-language fields work

#### Product Management
- [ ] Can create product
- [ ] Can edit product
- [ ] Can delete product
- [ ] Image upload works
- [ ] Can toggle stock status
- [ ] Can add allergens
- [ ] Multi-language fields work

#### QR Code Generation
- [ ] Can generate single QR code
- [ ] Can generate batch QR codes
- [ ] Can download QR codes
- [ ] QR codes include table numbers
- [ ] QR code list displays

#### Theme Customization
- [ ] Can upload logo
- [ ] Can upload cover image
- [ ] Can select colors
- [ ] Can choose pre-built theme
- [ ] Theme preview works

#### Analytics
- [ ] Dashboard displays view count
- [ ] Chart displays correctly
- [ ] Table breakdown shows
- [ ] Date filter works

#### Settings
- [ ] Can update language
- [ ] Can update currency
- [ ] Can update contact info
- [ ] Can update restaurant details
- [ ] Logout works

### Admin Subdomain (Super Admin Panel)
- [ ] `https://admin.qrmenu.app` loads correctly
- [ ] Admin login works
- [ ] Admin dashboard loads
- [ ] Restaurant list displays
- [ ] Can view restaurant details
- [ ] Platform statistics display
- [ ] Payment list displays (if applicable)
- [ ] Search and filters work

### Restaurant Subdomain (Digital Menu)
- [ ] Create test restaurant with slug `test-restaurant`
- [ ] `https://test-restaurant.qrmenu.app` loads correctly
- [ ] Restaurant logo displays
- [ ] Cover image displays (if set)
- [ ] Categories display
- [ ] Products display
- [ ] Product images display
- [ ] Product details modal works
- [ ] Prices display correctly
- [ ] Currency symbol correct
- [ ] Language switcher works
- [ ] Multi-language content displays
- [ ] Table number displays (if in URL)
- [ ] Sold out indicator shows
- [ ] Allergen information displays
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop

### QR Code Scanning
- [ ] Generate QR code for test restaurant
- [ ] Download QR code PNG
- [ ] Print QR code (or display on screen)
- [ ] Scan with iPhone camera
- [ ] Scan with Android camera
- [ ] Correct menu loads
- [ ] Table number displays correctly
- [ ] Menu view is tracked in analytics

### Cross-Browser Testing
- [ ] Chrome (desktop)
- [ ] Firefox (desktop)
- [ ] Safari (desktop)
- [ ] Edge (desktop)
- [ ] Chrome (mobile)
- [ ] Safari (mobile)

### Performance Testing
- [ ] Lighthouse score > 90 (Performance)
- [ ] Lighthouse score > 90 (Accessibility)
- [ ] Lighthouse score > 90 (Best Practices)
- [ ] Lighthouse score > 90 (SEO)
- [ ] Page load time < 3 seconds
- [ ] Images are optimized
- [ ] No console errors
- [ ] No console warnings

## Security

### Authentication
- [ ] Passwords are hashed (Supabase handles this)
- [ ] JWT tokens are secure
- [ ] Session management works
- [ ] Password reset works
- [ ] Rate limiting is active

### Authorization
- [ ] RLS policies prevent unauthorized access
- [ ] Users can only see their own data
- [ ] Admin access is restricted
- [ ] Public routes are accessible

### Data Protection
- [ ] Environment variables are not exposed
- [ ] Service role key is server-side only
- [ ] No sensitive data in client code
- [ ] HTTPS is enforced
- [ ] CORS is configured correctly

### File Upload
- [ ] File type validation works
- [ ] File size limits enforced
- [ ] Malicious files are rejected
- [ ] Storage policies prevent unauthorized access

## Monitoring

### Vercel
- [ ] Vercel Analytics enabled
- [ ] Deployment notifications configured
- [ ] Error tracking configured (optional)

### Supabase
- [ ] Database metrics monitored
- [ ] Storage usage monitored
- [ ] Authentication logs reviewed
- [ ] Backup strategy in place

## Documentation

- [ ] DEPLOYMENT.md is complete
- [ ] Environment variables documented
- [ ] API endpoints documented (if applicable)
- [ ] User guide created (optional)
- [ ] Admin guide created (optional)

## Post-Deployment

### Immediate Actions
- [ ] Test all critical paths
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Verify analytics tracking

### Within 24 Hours
- [ ] Monitor user registrations
- [ ] Check for any errors
- [ ] Review performance metrics
- [ ] Test QR code scanning with real devices

### Within 1 Week
- [ ] Gather user feedback
- [ ] Monitor database performance
- [ ] Review storage usage
- [ ] Check for any security issues
- [ ] Plan for improvements

## Rollback Plan

If critical issues occur:

1. [ ] Identify the issue
2. [ ] Check Vercel deployment logs
3. [ ] Check Supabase logs
4. [ ] Decide: Fix forward or rollback
5. [ ] If rollback: Promote previous deployment in Vercel
6. [ ] Verify rollback successful
7. [ ] Communicate with users (if applicable)
8. [ ] Fix issue in development
9. [ ] Test thoroughly
10. [ ] Redeploy

## Support Contacts

- **Vercel Support**: https://vercel.com/support
- **Supabase Support**: https://supabase.com/support
- **Domain Registrar**: [Your registrar support]
- **Team Lead**: [Contact info]
- **On-Call Engineer**: [Contact info]

## Notes

Use this section to track any issues, decisions, or important information during deployment:

```
Date: ___________
Deployed by: ___________
Deployment URL: ___________
Issues encountered: ___________
Resolution: ___________
```

---

## Quick Reference

### Vercel CLI Commands
```bash
vercel login
vercel link
vercel env add VARIABLE_NAME production
vercel --prod
vercel logs
vercel promote [deployment-url]
```

### Supabase CLI Commands
```bash
supabase login
supabase link --project-ref your-ref
supabase db push
supabase db execute --file migration.sql
supabase db dump -f backup.sql
```

### Testing URLs
- Landing: https://qrmenu.app
- Panel: https://panel.qrmenu.app
- Admin: https://admin.qrmenu.app
- Menu: https://[restaurant-slug].qrmenu.app

### Emergency Contacts
- Vercel Status: https://www.vercel-status.com/
- Supabase Status: https://status.supabase.com/
