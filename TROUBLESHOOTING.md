# Troubleshooting Guide

Common issues and solutions for QR Menu SaaS deployment and operation.

## Deployment Issues

### Issue: Vercel Build Fails

**Symptoms:**
- Build fails in Vercel dashboard
- Error messages in build logs

**Solutions:**

1. **Check TypeScript errors:**
```bash
npx tsc --noEmit
```

2. **Check ESLint errors:**
```bash
npm run lint
```

3. **Verify environment variables:**
- Go to Vercel → Settings → Environment Variables
- Ensure all required variables are set
- Redeploy after adding variables

4. **Check build locally:**
```bash
npm run build
```

5. **Review build logs:**
- Check Vercel deployment logs for specific errors
- Look for missing dependencies or import errors

---

### Issue: Subdomain Not Working

**Symptoms:**
- Subdomain returns 404
- Subdomain doesn't route correctly
- "This site can't be reached" error

**Solutions:**

1. **Check DNS configuration:**
```bash
# Check A record
nslookup qrmenu.app

# Check CNAME
nslookup panel.qrmenu.app

# Check wildcard
nslookup test.qrmenu.app
```

2. **Verify Vercel domain settings:**
- Go to Vercel → Settings → Domains
- Ensure all subdomains are added
- Check for "Valid Configuration" status

3. **Wait for DNS propagation:**
- DNS changes can take up to 48 hours
- Use https://dnschecker.org to check propagation

4. **Clear DNS cache:**
```bash
# Windows
ipconfig /flushdns

# Mac
sudo dscacheutil -flushcache

# Linux
sudo systemd-resolve --flush-caches
```

5. **Check wildcard domain:**
- Wildcard domains require Vercel Pro plan
- Verify `*.qrmenu.app` is added in Vercel

---

### Issue: SSL Certificate Not Provisioning

**Symptoms:**
- "Your connection is not private" error
- SSL certificate warnings
- HTTPS not working

**Solutions:**

1. **Wait for provisioning:**
- SSL certificates can take 5-10 minutes
- Check Vercel domain status

2. **Verify domain ownership:**
- Ensure DNS records point to Vercel
- Check domain verification in Vercel

3. **Remove and re-add domain:**
- Go to Vercel → Settings → Domains
- Remove the domain
- Wait 5 minutes
- Re-add the domain

4. **Contact Vercel support:**
- If issue persists after 1 hour
- Provide domain name and project details

---

## Database Issues

### Issue: Database Connection Errors

**Symptoms:**
- "Failed to connect to database"
- API routes returning 500 errors
- Supabase client errors

**Solutions:**

1. **Check environment variables:**
```bash
# Verify in .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

2. **Verify Supabase project status:**
- Go to Supabase dashboard
- Check project is active
- Check for maintenance notifications

3. **Test connection:**
```javascript
// In browser console
const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
const { data, error } = await supabase.from('restaurants').select('count')
console.log(data, error)
```

4. **Check Supabase logs:**
- Go to Supabase → Logs
- Look for connection errors or query failures

---

### Issue: RLS Policy Blocking Queries

**Symptoms:**
- Queries return empty results
- "Row level security policy violation" errors
- Users can't access their own data

**Solutions:**

1. **Verify RLS policies:**
```sql
-- Check policies exist
SELECT tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public';
```

2. **Test with service role key:**
- Service role key bypasses RLS
- If works with service role, RLS policy issue

3. **Check user authentication:**
```javascript
// Verify user is authenticated
const { data: { user } } = await supabase.auth.getUser()
console.log(user)
```

4. **Review policy conditions:**
- Check `auth.uid()` matches `owner_id`
- Verify foreign key relationships

5. **Temporarily disable RLS (testing only):**
```sql
ALTER TABLE restaurants DISABLE ROW LEVEL SECURITY;
-- Test query
-- Re-enable:
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
```

---

### Issue: Migrations Failed

**Symptoms:**
- SQL errors when running migrations
- Tables not created
- "Relation already exists" errors

**Solutions:**

1. **Check migration order:**
- Run migrations in sequence: 001, 002, 003
- Don't skip migrations

2. **Check for existing tables:**
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

3. **Drop and recreate (development only):**
```sql
-- WARNING: This deletes all data
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
-- Then run migrations again
```

4. **Review error messages:**
- Check SQL syntax errors
- Look for constraint violations
- Verify foreign key references

---

## Storage Issues

### Issue: Image Upload Fails

**Symptoms:**
- Upload button doesn't work
- "Failed to upload" error
- Images don't appear after upload

**Solutions:**

1. **Check storage buckets exist:**
```sql
SELECT * FROM storage.buckets;
```

2. **Verify bucket policies:**
```sql
SELECT * FROM storage.policies;
```

3. **Check file size:**
- Maximum 5MB per file
- Compress large images

4. **Verify file type:**
- Only JPEG, PNG, WebP allowed
- Check MIME type

5. **Test upload manually:**
- Go to Supabase → Storage
- Try uploading file manually
- Check for error messages

6. **Check CORS settings:**
```sql
-- Verify CORS configuration
SELECT * FROM storage.buckets WHERE id = 'product-images';
```

---

## Authentication Issues

### Issue: Can't Register or Login

**Symptoms:**
- Registration form doesn't submit
- Login fails with valid credentials
- "Invalid credentials" error

**Solutions:**

1. **Check email provider enabled:**
- Go to Supabase → Authentication → Providers
- Verify Email provider is enabled

2. **Verify site URL:**
- Go to Supabase → Authentication → URL Configuration
- Check Site URL: `https://panel.qrmenu.app`

3. **Check redirect URLs:**
- Verify all redirect URLs are added
- Include wildcards if needed

4. **Test with different email:**
- Some email providers block automated emails
- Try with Gmail or another provider

5. **Check rate limiting:**
- Go to Supabase → Authentication → Rate Limits
- Verify not hitting limits

6. **Review auth logs:**
- Go to Supabase → Authentication → Logs
- Look for failed attempts and reasons

---

### Issue: Email Confirmation Not Received

**Symptoms:**
- Registration succeeds but no email
- Password reset email not received

**Solutions:**

1. **Check spam folder:**
- Confirmation emails often go to spam

2. **Verify email settings:**
- Go to Supabase → Authentication → Email Templates
- Check "From" email address

3. **Check email provider:**
- Some providers block Supabase emails
- Try different email address

4. **Disable email confirmation (testing):**
- Go to Supabase → Authentication → Settings
- Disable "Confirm email"
- Re-enable for production

5. **Use custom SMTP (production):**
- Configure custom SMTP server
- Use SendGrid, Mailgun, etc.

---

## Performance Issues

### Issue: Slow Page Load Times

**Symptoms:**
- Pages take > 5 seconds to load
- Images load slowly
- Poor Lighthouse scores

**Solutions:**

1. **Check image optimization:**
- Verify using Next.js Image component
- Check image sizes (should be < 500KB)
- Use WebP format

2. **Enable caching:**
- Verify ISR is configured
- Check cache headers

3. **Optimize database queries:**
- Add indexes on frequently queried columns
- Use pagination for large datasets

4. **Check Vercel region:**
- Verify deployment region matches users
- Consider multi-region deployment

5. **Review bundle size:**
```bash
npm run build
# Check .next/analyze output
```

6. **Use CDN for static assets:**
- Supabase Storage uses CDN automatically
- Verify images loading from CDN

---

## QR Code Issues

### Issue: QR Code Doesn't Scan

**Symptoms:**
- Camera doesn't recognize QR code
- QR code scans but wrong URL
- QR code leads to 404

**Solutions:**

1. **Check QR code quality:**
- Ensure high resolution (300+ DPI)
- Print size at least 2x2 inches
- Good contrast (black on white)

2. **Test QR code:**
- Use online QR code reader
- Verify URL is correct

3. **Check URL format:**
```
https://restaurant-slug.qrmenu.app?table=1
```

4. **Verify restaurant exists:**
- Check restaurant slug in database
- Ensure restaurant is active

5. **Test with different devices:**
- Try iPhone and Android
- Use different QR code apps

---

### Issue: Table Number Not Showing

**Symptoms:**
- QR code scans but table number missing
- Analytics doesn't track table

**Solutions:**

1. **Check URL parameter:**
- Verify `?table=X` in QR code URL

2. **Check menu component:**
- Verify table number extraction from URL
- Check display logic

3. **Test manually:**
```
https://test-restaurant.qrmenu.app?table=5
```

4. **Check analytics tracking:**
- Verify table number saved in database

---

## Middleware Issues

### Issue: Routing Not Working

**Symptoms:**
- All subdomains show same content
- Middleware not detecting subdomain
- Rewrites not working

**Solutions:**

1. **Check middleware.ts:**
- Verify middleware is in root directory
- Check matcher configuration

2. **Test subdomain detection:**
```javascript
// Add console.log in middleware
console.log('Hostname:', hostname)
console.log('Subdomain:', subdomain)
```

3. **Check Vercel configuration:**
- Verify rewrites in vercel.json
- Check middleware is deployed

4. **Test locally:**
```
http://localhost:3000?subdomain=panel
```

5. **Clear Vercel cache:**
- Redeploy with cache cleared
- Use "Redeploy" button in Vercel

---

## Production Checklist

If multiple issues occur, verify:

- [ ] All environment variables set correctly
- [ ] Database migrations completed
- [ ] Storage buckets configured
- [ ] DNS records correct
- [ ] SSL certificates active
- [ ] Authentication working
- [ ] RLS policies enabled
- [ ] Middleware deployed

---

## Getting Help

### Before Asking for Help

1. Check this troubleshooting guide
2. Review deployment documentation
3. Check Vercel and Supabase status pages
4. Search existing issues

### When Asking for Help

Provide:
- Exact error message
- Steps to reproduce
- Browser/device information
- Screenshots if applicable
- Relevant logs (Vercel, Supabase)
- What you've already tried

### Support Resources

- **Vercel**: https://vercel.com/support
- **Supabase**: https://supabase.com/support
- **Next.js**: https://nextjs.org/docs
- **Project Issues**: [Your issue tracker]

---

## Emergency Procedures

### Critical Production Issue

1. **Assess severity:**
   - Is site down completely?
   - Are users affected?
   - Is data at risk?

2. **Immediate actions:**
   - Check Vercel deployment status
   - Check Supabase project status
   - Review recent changes

3. **Rollback if needed:**
   - Go to Vercel → Deployments
   - Find last working deployment
   - Click "Promote to Production"

4. **Communicate:**
   - Notify stakeholders
   - Update status page
   - Provide ETA for fix

5. **Post-mortem:**
   - Document what happened
   - Identify root cause
   - Implement preventive measures

---

## Monitoring

Set up monitoring to catch issues early:

1. **Vercel Analytics:**
   - Monitor error rates
   - Track performance metrics

2. **Supabase Logs:**
   - Review database errors
   - Monitor auth failures

3. **Custom Alerts:**
   - Set up error notifications
   - Monitor uptime

4. **Regular Testing:**
   - Run automated tests daily
   - Manual testing weekly
