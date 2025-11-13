# Production Testing Guide

This guide provides step-by-step instructions for manually testing the QR Menu SaaS platform in production.

## Prerequisites

- Production deployment is complete
- All domains are configured
- Supabase is set up
- You have test credentials ready

## Automated Testing

Before manual testing, run the automated subdomain test script:

### On Linux/Mac:
```bash
chmod +x scripts/test-subdomains.sh
./scripts/test-subdomains.sh qrmenu.app
```

### On Windows (PowerShell):
```powershell
.\scripts\test-subdomains.ps1 -Domain "qrmenu.app"
```

## Manual Testing Checklist

### 1. Main Domain (Landing Site)

**URL:** `https://qrmenu.app`

#### Test Steps:
1. [ ] Open URL in browser
2. [ ] Verify page loads without errors
3. [ ] Check hero section displays correctly
4. [ ] Scroll through features section
5. [ ] Check pricing section
6. [ ] Verify contact information
7. [ ] Click "Register" button → Should go to `https://panel.qrmenu.app/register`
8. [ ] Click "Login" button → Should go to `https://panel.qrmenu.app/login`
9. [ ] Test on mobile device (responsive design)
10. [ ] Test on tablet (responsive design)

#### Expected Results:
- ✅ Page loads in < 3 seconds
- ✅ All images load correctly
- ✅ No console errors
- ✅ Responsive on all devices
- ✅ Links work correctly

---

### 2. Panel Subdomain (Restaurant Panel)

**URL:** `https://panel.qrmenu.app`

#### 2.1 Registration Flow

1. [ ] Navigate to `https://panel.qrmenu.app/register`
2. [ ] Fill in registration form:
   - Restaurant Name: "Test Restaurant"
   - Email: "test@example.com"
   - Password: "Test1234"
   - Phone: "+1234567890"
3. [ ] Click "Register"
4. [ ] Check email for confirmation (if enabled)
5. [ ] Confirm email address
6. [ ] Verify redirect to dashboard

**Expected Results:**
- ✅ Form validation works
- ✅ Registration succeeds
- ✅ Email is sent (if enabled)
- ✅ Redirect to dashboard after registration

#### 2.2 Login Flow

1. [ ] Navigate to `https://panel.qrmenu.app/login`
2. [ ] Enter credentials:
   - Email: "test@example.com"
   - Password: "Test1234"
3. [ ] Click "Login"
4. [ ] Verify redirect to dashboard

**Expected Results:**
- ✅ Login succeeds
- ✅ Dashboard loads
- ✅ User session is maintained

#### 2.3 Dashboard

1. [ ] Verify dashboard displays:
   - Restaurant name in header
   - Sidebar navigation
   - Overview statistics
   - Quick action buttons
2. [ ] Test sidebar navigation:
   - [ ] Dashboard
   - [ ] Menu Management
   - [ ] QR Codes
   - [ ] Customization
   - [ ] Analytics
   - [ ] Settings

**Expected Results:**
- ✅ All navigation items work
- ✅ Statistics display correctly
- ✅ No console errors

#### 2.4 Category Management

**URL:** `https://panel.qrmenu.app/menu`

1. [ ] Click "Add Category" button
2. [ ] Fill in category form:
   - Name (Turkish): "Başlangıçlar"
   - Name (English): "Starters"
3. [ ] Click "Save"
4. [ ] Verify category appears in list
5. [ ] Click "Edit" on category
6. [ ] Change name
7. [ ] Click "Save"
8. [ ] Verify changes are saved
9. [ ] Test drag-and-drop reordering
10. [ ] Click "Delete" on category
11. [ ] Confirm deletion
12. [ ] Verify category is removed

**Expected Results:**
- ✅ Can create category
- ✅ Can edit category
- ✅ Can reorder categories
- ✅ Can delete category
- ✅ Multi-language fields work

#### 2.5 Product Management

**URL:** `https://panel.qrmenu.app/menu`

1. [ ] Click "Add Product" button
2. [ ] Fill in product form:
   - Name (Turkish): "Mercimek Çorbası"
   - Name (English): "Lentil Soup"
   - Description (Turkish): "Geleneksel Türk çorbası"
   - Description (English): "Traditional Turkish soup"
   - Price: 45.00
   - Category: Select "Başlangıçlar"
3. [ ] Upload product image
4. [ ] Select allergens (if any)
5. [ ] Click "Save"
6. [ ] Verify product appears in list
7. [ ] Click "Edit" on product
8. [ ] Change details
9. [ ] Click "Save"
10. [ ] Toggle "Available" switch
11. [ ] Verify stock status changes
12. [ ] Click "Delete" on product
13. [ ] Confirm deletion

**Expected Results:**
- ✅ Can create product
- ✅ Image upload works
- ✅ Can edit product
- ✅ Can toggle availability
- ✅ Can delete product
- ✅ Multi-language fields work

#### 2.6 QR Code Generation

**URL:** `https://panel.qrmenu.app/qr-codes`

1. [ ] Enter table number: "1"
2. [ ] Click "Generate QR Code"
3. [ ] Verify QR code displays
4. [ ] Click "Download" button
5. [ ] Verify PNG file downloads
6. [ ] Test batch generation:
   - Start: 1
   - End: 5
7. [ ] Click "Generate Batch"
8. [ ] Verify 5 QR codes are generated
9. [ ] Download all QR codes

**Expected Results:**
- ✅ Single QR code generates
- ✅ QR code downloads as PNG
- ✅ Batch generation works
- ✅ All QR codes download

#### 2.7 Theme Customization

**URL:** `https://panel.qrmenu.app/customization`

1. [ ] Upload restaurant logo
2. [ ] Verify logo preview
3. [ ] Upload cover image
4. [ ] Verify cover preview
5. [ ] Select primary color
6. [ ] Select secondary color
7. [ ] Choose pre-built theme
8. [ ] Click "Save Changes"
9. [ ] Verify changes are saved

**Expected Results:**
- ✅ Logo upload works
- ✅ Cover upload works
- ✅ Color picker works
- ✅ Theme preview updates
- ✅ Changes save successfully

#### 2.8 Analytics

**URL:** `https://panel.qrmenu.app/analytics`

1. [ ] Verify total views display
2. [ ] Check views chart (last 30 days)
3. [ ] Verify table breakdown
4. [ ] Test date filter
5. [ ] Verify data updates

**Expected Results:**
- ✅ Statistics display correctly
- ✅ Chart renders properly
- ✅ Table breakdown shows
- ✅ Filters work

#### 2.9 Settings

**URL:** `https://panel.qrmenu.app/settings`

1. [ ] Change primary language
2. [ ] Change currency
3. [ ] Update contact information
4. [ ] Update restaurant details
5. [ ] Click "Save"
6. [ ] Verify changes are saved

**Expected Results:**
- ✅ Language changes
- ✅ Currency changes
- ✅ Contact info updates
- ✅ All changes save

#### 2.10 Logout

1. [ ] Click "Logout" button
2. [ ] Verify redirect to login page
3. [ ] Try to access dashboard without login
4. [ ] Verify redirect to login

**Expected Results:**
- ✅ Logout works
- ✅ Session is cleared
- ✅ Protected routes redirect to login

---

### 3. Admin Subdomain (Super Admin Panel)

**URL:** `https://admin.qrmenu.app`

#### 3.1 Admin Login

1. [ ] Navigate to `https://admin.qrmenu.app`
2. [ ] Enter admin credentials
3. [ ] Click "Login"
4. [ ] Verify redirect to admin dashboard

**Expected Results:**
- ✅ Admin login works
- ✅ Dashboard loads
- ✅ Admin navigation displays

#### 3.2 Restaurant List

1. [ ] Verify restaurant list displays
2. [ ] Check columns:
   - Restaurant name
   - Email
   - Status
   - Created date
3. [ ] Test search functionality
4. [ ] Test filters
5. [ ] Click on a restaurant
6. [ ] Verify details page loads

**Expected Results:**
- ✅ List displays all restaurants
- ✅ Search works
- ✅ Filters work
- ✅ Details page loads

#### 3.3 Platform Statistics

1. [ ] Verify total restaurants count
2. [ ] Check active/inactive breakdown
3. [ ] Verify total menu views
4. [ ] Check revenue statistics (if applicable)

**Expected Results:**
- ✅ All statistics display
- ✅ Numbers are accurate
- ✅ Charts render correctly

#### 3.4 Payment Tracking

1. [ ] Navigate to payments section
2. [ ] Verify payment list displays
3. [ ] Check payment details
4. [ ] Test filters

**Expected Results:**
- ✅ Payment list displays
- ✅ Details are accurate
- ✅ Filters work

---

### 4. Restaurant Subdomain (Digital Menu)

**URL:** `https://[restaurant-slug].qrmenu.app`

#### 4.1 Setup Test Restaurant

First, create a test restaurant:
1. Register restaurant with name "Test Restaurant"
2. Add categories and products
3. Upload images
4. Customize theme
5. Note the restaurant slug (e.g., "test-restaurant")

#### 4.2 Test Digital Menu

**URL:** `https://test-restaurant.qrmenu.app`

1. [ ] Navigate to restaurant subdomain
2. [ ] Verify menu loads
3. [ ] Check header displays:
   - Restaurant logo
   - Restaurant name
4. [ ] Verify cover image displays
5. [ ] Check category navigation
6. [ ] Click on each category
7. [ ] Verify products display
8. [ ] Click on a product
9. [ ] Verify product detail modal opens
10. [ ] Check product details:
    - Name
    - Description
    - Price
    - Image
    - Allergens
11. [ ] Close modal
12. [ ] Test language switcher
13. [ ] Verify content changes language
14. [ ] Test on mobile device
15. [ ] Test on tablet

**Expected Results:**
- ✅ Menu loads quickly (< 2 seconds)
- ✅ All images load
- ✅ Categories display correctly
- ✅ Products display correctly
- ✅ Product modal works
- ✅ Language switching works
- ✅ Responsive on all devices
- ✅ Theme colors apply correctly

#### 4.3 Test with Table Number

**URL:** `https://test-restaurant.qrmenu.app?table=5`

1. [ ] Navigate to URL with table parameter
2. [ ] Verify table number displays
3. [ ] Check that view is tracked in analytics

**Expected Results:**
- ✅ Table number shows in UI
- ✅ View is recorded in analytics

#### 4.4 Test Non-Existent Restaurant

**URL:** `https://nonexistent-xyz.qrmenu.app`

1. [ ] Navigate to non-existent subdomain
2. [ ] Verify 404 or error page displays
3. [ ] Check error message is user-friendly

**Expected Results:**
- ✅ Returns 404 status
- ✅ Error page displays
- ✅ Message is clear

---

### 5. QR Code Scanning

#### 5.1 Print QR Codes

1. [ ] Generate QR code for table 1
2. [ ] Download PNG file
3. [ ] Print QR code (or display on screen)

#### 5.2 Test with Mobile Devices

**iPhone:**
1. [ ] Open Camera app
2. [ ] Point at QR code
3. [ ] Tap notification
4. [ ] Verify menu opens in Safari
5. [ ] Check table number displays
6. [ ] Test menu functionality

**Android:**
1. [ ] Open Camera app (or Google Lens)
2. [ ] Point at QR code
3. [ ] Tap link
4. [ ] Verify menu opens in Chrome
5. [ ] Check table number displays
6. [ ] Test menu functionality

**Expected Results:**
- ✅ QR code scans successfully
- ✅ Correct menu opens
- ✅ Table number is correct
- ✅ Menu is fully functional
- ✅ Responsive design works

---

### 6. Cross-Browser Testing

Test all main features in:

#### Desktop Browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

#### Mobile Browsers:
- [ ] Chrome (Android)
- [ ] Safari (iOS)
- [ ] Samsung Internet (Android)

**Expected Results:**
- ✅ Works in all browsers
- ✅ No visual glitches
- ✅ All features functional

---

### 7. Performance Testing

#### 7.1 Lighthouse Audit

1. [ ] Open Chrome DevTools
2. [ ] Go to Lighthouse tab
3. [ ] Run audit for each page:
   - Landing site
   - Panel login
   - Digital menu

**Target Scores:**
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

#### 7.2 Load Time Testing

Test page load times:
- [ ] Landing site: < 2 seconds
- [ ] Panel dashboard: < 3 seconds
- [ ] Digital menu: < 2 seconds

#### 7.3 Image Optimization

1. [ ] Check image formats (should be WebP where supported)
2. [ ] Verify responsive images load
3. [ ] Check lazy loading works

**Expected Results:**
- ✅ All scores above 90
- ✅ Load times acceptable
- ✅ Images optimized

---

### 8. Security Testing

#### 8.1 Authentication

1. [ ] Try accessing panel without login
2. [ ] Verify redirect to login
3. [ ] Try accessing another user's data
4. [ ] Verify access denied
5. [ ] Test password reset flow

**Expected Results:**
- ✅ Protected routes require auth
- ✅ Users can only access own data
- ✅ Password reset works

#### 8.2 Input Validation

1. [ ] Try SQL injection in forms
2. [ ] Try XSS attacks in text fields
3. [ ] Try uploading non-image files
4. [ ] Try uploading oversized files

**Expected Results:**
- ✅ All inputs are validated
- ✅ Malicious input is rejected
- ✅ File uploads are restricted

#### 8.3 HTTPS

1. [ ] Verify all pages use HTTPS
2. [ ] Try accessing via HTTP
3. [ ] Verify redirect to HTTPS
4. [ ] Check SSL certificate is valid

**Expected Results:**
- ✅ All traffic uses HTTPS
- ✅ HTTP redirects to HTTPS
- ✅ SSL certificate valid

---

### 9. Error Handling

#### 9.1 Network Errors

1. [ ] Disconnect internet
2. [ ] Try to load page
3. [ ] Verify error message displays
4. [ ] Reconnect internet
5. [ ] Verify page recovers

#### 9.2 Form Errors

1. [ ] Submit empty forms
2. [ ] Verify validation errors
3. [ ] Submit invalid data
4. [ ] Verify error messages

#### 9.3 404 Errors

1. [ ] Navigate to non-existent page
2. [ ] Verify 404 page displays
3. [ ] Check navigation still works

**Expected Results:**
- ✅ Errors are handled gracefully
- ✅ Error messages are clear
- ✅ User can recover from errors

---

### 10. Analytics Verification

#### 10.1 Track Menu Views

1. [ ] Open digital menu
2. [ ] Wait for page load
3. [ ] Go to panel analytics
4. [ ] Verify view count increased
5. [ ] Check table number recorded (if applicable)

#### 10.2 Verify Data Accuracy

1. [ ] Open menu multiple times
2. [ ] Check analytics dashboard
3. [ ] Verify counts are accurate
4. [ ] Check chart updates

**Expected Results:**
- ✅ Views are tracked
- ✅ Data is accurate
- ✅ Real-time updates work

---

## Issue Reporting

If you find any issues during testing, document them:

### Issue Template

```
**Issue Title:** [Brief description]

**Severity:** [Critical / High / Medium / Low]

**URL:** [Where the issue occurred]

**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Result:**
[What should happen]

**Actual Result:**
[What actually happened]

**Browser/Device:**
[Browser version and device]

**Screenshots:**
[Attach screenshots if applicable]

**Console Errors:**
[Any errors from browser console]
```

---

## Post-Testing

After completing all tests:

1. [ ] Document all issues found
2. [ ] Prioritize issues by severity
3. [ ] Create tickets for fixes
4. [ ] Update deployment checklist
5. [ ] Notify stakeholders of results

---

## Continuous Monitoring

Set up ongoing monitoring:

1. [ ] Enable Vercel Analytics
2. [ ] Monitor error rates
3. [ ] Track performance metrics
4. [ ] Review user feedback
5. [ ] Schedule regular testing

---

## Support

For issues or questions:
- Technical Lead: [Contact]
- DevOps: [Contact]
- Vercel Support: https://vercel.com/support
- Supabase Support: https://supabase.com/support
