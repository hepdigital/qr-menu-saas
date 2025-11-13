# Vercel Setup Instructions

## Quick Setup Guide

### 1. Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Link Project

```bash
vercel link
```

### 4. Set Environment Variables

You can set environment variables via CLI or Vercel Dashboard.

#### Via CLI:

```bash
# Set production environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add NEXT_PUBLIC_APP_URL production

# Set preview environment variables (optional)
vercel env add NEXT_PUBLIC_SUPABASE_URL preview
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview
vercel env add SUPABASE_SERVICE_ROLE_KEY preview
vercel env add NEXT_PUBLIC_APP_URL preview
```

#### Via Dashboard:

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable with appropriate values
5. Select environments: Production, Preview, Development

### 5. Configure Domains

#### Via Dashboard:

1. Go to Settings → Domains
2. Add domains in this order:
   - `qrmenu.app` (main domain)
   - `www.qrmenu.app`
   - `panel.qrmenu.app`
   - `admin.qrmenu.app`
   - `*.qrmenu.app` (wildcard - requires Pro plan)

#### DNS Configuration:

Add these records in your domain registrar:

```
# Main domain
Type: A
Name: @
Value: 76.76.21.21

# WWW subdomain
Type: CNAME
Name: www
Value: cname.vercel-dns.com

# Wildcard subdomain (for all restaurant subdomains)
Type: CNAME
Name: *
Value: cname.vercel-dns.com
```

### 6. Deploy

```bash
# Deploy to production
vercel --prod

# Or push to main branch (if auto-deploy is enabled)
git push origin main
```

## Vercel Project Settings

### Build & Development Settings

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`
- **Node.js Version**: 18.x or higher

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJhbGc...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (secret) | `eyJhbGc...` |
| `NEXT_PUBLIC_APP_URL` | Application base URL | `https://qrmenu.app` |

### Deployment Protection (Optional)

For preview deployments:
- Enable Vercel Authentication
- Set password protection
- Configure allowed email domains

## Wildcard Domain Requirements

**Important:** Wildcard domains (`*.qrmenu.app`) require:
- Vercel Pro plan or higher
- Proper DNS configuration
- SSL certificate provisioning (automatic)

If you don't have Pro plan:
- You'll need to manually add each restaurant subdomain
- Or use a different routing strategy (e.g., path-based: `qrmenu.app/r/restaurant-name`)

## Testing Deployment

### Test Main Domain
```bash
curl -I https://qrmenu.app
# Should return 200 OK
```

### Test Panel Subdomain
```bash
curl -I https://panel.qrmenu.app
# Should return 200 OK
```

### Test Admin Subdomain
```bash
curl -I https://admin.qrmenu.app
# Should return 200 OK
```

### Test Restaurant Subdomain
```bash
curl -I https://test-restaurant.qrmenu.app
# Should return 200 OK or 404 if restaurant doesn't exist
```

## Troubleshooting

### DNS Not Resolving

Check DNS propagation:
```bash
# Check A record
nslookup qrmenu.app

# Check CNAME record
nslookup panel.qrmenu.app

# Check wildcard
nslookup test.qrmenu.app
```

### SSL Certificate Issues

- Wait 5-10 minutes for certificate provisioning
- Verify domain ownership in Vercel
- Check DNS records are correct
- Try removing and re-adding the domain

### Build Failures

Check build logs in Vercel dashboard:
- Verify all dependencies are in `package.json`
- Check for TypeScript errors
- Verify environment variables are set
- Review build output for specific errors

## Monitoring

### Vercel Analytics

Enable in project settings:
- Web Analytics (Core Web Vitals)
- Speed Insights
- Audience insights

### Deployment Logs

View logs for each deployment:
```bash
vercel logs [deployment-url]
```

### Real-time Logs

Stream logs in real-time:
```bash
vercel logs --follow
```

## Rollback

If deployment has issues:

```bash
# List recent deployments
vercel ls

# Promote a previous deployment
vercel promote [deployment-url]
```

Or via dashboard:
1. Go to Deployments
2. Find working deployment
3. Click "..." → "Promote to Production"

## CI/CD Integration

### GitHub Integration

Vercel automatically deploys:
- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

### Custom Deployment Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## Performance Optimization

### Edge Functions

Middleware runs on Vercel Edge Network for fast subdomain routing.

### Image Optimization

Next.js Image component automatically optimizes images:
- WebP format where supported
- Responsive sizes
- Lazy loading

### Caching

Configure in `next.config.js`:
- Static pages: Cached at edge
- ISR pages: Revalidate every 60s
- API routes: Custom cache headers

## Security

### Environment Variables

- Never commit `.env` files
- Use Vercel's encrypted environment variables
- Rotate keys regularly
- Use different keys for preview/production

### Headers

Configure security headers in `next.config.js`:
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

### DDoS Protection

Vercel provides:
- Automatic DDoS mitigation
- Rate limiting (Pro plan)
- Edge caching

## Cost Optimization

### Vercel Pricing

- **Hobby**: Free (personal projects)
- **Pro**: $20/month (wildcard domains, analytics)
- **Enterprise**: Custom pricing

### Bandwidth Optimization

- Enable image optimization
- Use CDN for static assets
- Implement proper caching
- Compress responses

## Support Resources

- Vercel Documentation: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Community: https://github.com/vercel/vercel/discussions
- Status Page: https://www.vercel-status.com/
