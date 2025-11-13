# Quick Start Guide

## 🚀 Deploy in 5 Steps

### 1. Create Supabase Project
```bash
# Go to https://supabase.com/dashboard
# Create new project
# Copy API credentials
```

### 2. Run Database Migrations
```bash
# Install Supabase CLI
npm install -g supabase

# Link project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### 3. Configure Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Login and link
vercel login
vercel link

# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add NEXT_PUBLIC_APP_URL production
```

### 4. Configure Domains

Add in Vercel Dashboard → Settings → Domains:
- qrmenu.app
- www.qrmenu.app
- panel.qrmenu.app
- admin.qrmenu.app
- *.qrmenu.app (requires Pro plan)

Configure DNS:
- A record: @ → 76.76.21.21
- CNAME: * → cname.vercel-dns.com

### 5. Deploy
```bash
vercel --prod
```

## 📋 Essential URLs

- Landing: https://qrmenu.app
- Panel: https://panel.qrmenu.app
- Admin: https://admin.qrmenu.app
- Menu: https://[slug].qrmenu.app

## 🧪 Test Deployment

```bash
# Linux/Mac
./scripts/test-subdomains.sh qrmenu.app

# Windows
.\scripts\test-subdomains.ps1 -Domain "qrmenu.app"
```

## 📚 Full Documentation

- [DEPLOYMENT.md](DEPLOYMENT.md) - Complete deployment guide
- [PRODUCTION-CHECKLIST.md](PRODUCTION-CHECKLIST.md) - Deployment checklist
- [TESTING-GUIDE.md](TESTING-GUIDE.md) - Testing procedures
- [scripts/vercel-setup.md](scripts/vercel-setup.md) - Vercel configuration
- [scripts/supabase-setup.md](scripts/supabase-setup.md) - Supabase configuration
