# Documentation Index

Quick reference guide to all QR Menu SaaS documentation.

## 🚀 Getting Started

**New to the project?** Start here:

1. [README.md](README.md) - Project overview and quick start
2. [QUICK-START.md](QUICK-START.md) - Deploy in 5 steps

## 📖 Main Documentation

### Deployment Guides

| Document | Purpose | When to Use |
|----------|---------|-------------|
| [QUICK-START.md](QUICK-START.md) | Rapid deployment | When you need to deploy quickly |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Complete deployment guide | For detailed step-by-step deployment |
| [PRODUCTION-CHECKLIST.md](PRODUCTION-CHECKLIST.md) | Pre-launch checklist | Before going live |
| [DEPLOYMENT-SUMMARY.md](DEPLOYMENT-SUMMARY.md) | What was configured | Overview of deployment setup |

### Testing Documentation

| Document | Purpose | When to Use |
|----------|---------|-------------|
| [TESTING-GUIDE.md](TESTING-GUIDE.md) | Manual testing procedures | After deployment |
| [scripts/test-subdomains.sh](scripts/test-subdomains.sh) | Automated testing (Linux/Mac) | To verify subdomain routing |
| [scripts/test-subdomains.ps1](scripts/test-subdomains.ps1) | Automated testing (Windows) | To verify subdomain routing |

### Troubleshooting

| Document | Purpose | When to Use |
|----------|---------|-------------|
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | Common issues & solutions | When you encounter problems |

## 🛠️ Technical Documentation

### Platform-Specific Guides

#### Vercel
- [scripts/vercel-setup.md](scripts/vercel-setup.md) - Complete Vercel configuration
- [vercel.json](vercel.json) - Vercel configuration file
- [.vercelignore](.vercelignore) - Deployment exclusions

#### Supabase
- [scripts/supabase-setup.md](scripts/supabase-setup.md) - Complete Supabase setup
- [supabase/README.md](supabase/README.md) - Database migrations guide
- [scripts/run-migrations.sh](scripts/run-migrations.sh) - Migration script (Linux/Mac)
- [scripts/run-migrations.ps1](scripts/run-migrations.ps1) - Migration script (Windows)

### Database
- [supabase/migrations/001_initial_schema.sql](supabase/migrations/001_initial_schema.sql) - Database tables
- [supabase/migrations/002_rls_policies.sql](supabase/migrations/002_rls_policies.sql) - Security policies
- [supabase/migrations/003_storage_buckets.sql](supabase/migrations/003_storage_buckets.sql) - Storage setup

## 📋 Configuration Files

### Environment Variables
- [.env.example](.env.example) - Development environment template
- [.env.production.example](.env.production.example) - Production environment template

### Project Configuration
- [next.config.js](next.config.js) - Next.js configuration
- [middleware.ts](middleware.ts) - Subdomain routing logic
- [vercel.json](vercel.json) - Vercel deployment settings

## 🎯 By Task

### I want to...

#### Deploy the Application
1. Read [QUICK-START.md](QUICK-START.md) for overview
2. Follow [DEPLOYMENT.md](DEPLOYMENT.md) for details
3. Use [PRODUCTION-CHECKLIST.md](PRODUCTION-CHECKLIST.md) before launch

#### Set Up Supabase
1. Read [scripts/supabase-setup.md](scripts/supabase-setup.md)
2. Run [scripts/run-migrations.sh](scripts/run-migrations.sh) or [.ps1](scripts/run-migrations.ps1)
3. Verify with [supabase/README.md](supabase/README.md)

#### Set Up Vercel
1. Read [scripts/vercel-setup.md](scripts/vercel-setup.md)
2. Configure [vercel.json](vercel.json)
3. Set environment variables from [.env.production.example](.env.production.example)

#### Test the Deployment
1. Run automated tests: [scripts/test-subdomains.sh](scripts/test-subdomains.sh)
2. Follow manual tests: [TESTING-GUIDE.md](TESTING-GUIDE.md)
3. Use [PRODUCTION-CHECKLIST.md](PRODUCTION-CHECKLIST.md) to verify

#### Fix Issues
1. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Review relevant setup guide
3. Check platform status pages

#### Understand the Project
1. Read [README.md](README.md)
2. Review [DEPLOYMENT-SUMMARY.md](DEPLOYMENT-SUMMARY.md)
3. Explore code structure

## 📱 By Platform

### Windows Users
- Use `.ps1` scripts (PowerShell)
- [scripts/run-migrations.ps1](scripts/run-migrations.ps1)
- [scripts/test-subdomains.ps1](scripts/test-subdomains.ps1)

### Linux/Mac Users
- Use `.sh` scripts (Bash)
- [scripts/run-migrations.sh](scripts/run-migrations.sh)
- [scripts/test-subdomains.sh](scripts/test-subdomains.sh)

## 🎓 By Experience Level

### Beginner
Start with these in order:
1. [README.md](README.md)
2. [QUICK-START.md](QUICK-START.md)
3. [DEPLOYMENT.md](DEPLOYMENT.md)
4. [PRODUCTION-CHECKLIST.md](PRODUCTION-CHECKLIST.md)

### Intermediate
Focus on:
1. [scripts/vercel-setup.md](scripts/vercel-setup.md)
2. [scripts/supabase-setup.md](scripts/supabase-setup.md)
3. [TESTING-GUIDE.md](TESTING-GUIDE.md)

### Advanced
Deep dive into:
1. [middleware.ts](middleware.ts) - Routing logic
2. [supabase/migrations/](supabase/migrations/) - Database schema
3. [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Advanced issues

## 🔍 Quick Reference

### Essential Commands

```bash
# Development
npm install
npm run dev

# Build
npm run build

# Deploy
vercel --prod

# Test
./scripts/test-subdomains.sh qrmenu.app

# Migrations
./scripts/run-migrations.sh
```

### Essential URLs

- Landing: `https://qrmenu.app`
- Panel: `https://panel.qrmenu.app`
- Admin: `https://admin.qrmenu.app`
- Menu: `https://[slug].qrmenu.app`

### Essential Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=
```

## 📊 Documentation Map

```
Documentation Structure:
│
├── Getting Started
│   ├── README.md
│   └── QUICK-START.md
│
├── Deployment
│   ├── DEPLOYMENT.md
│   ├── PRODUCTION-CHECKLIST.md
│   └── DEPLOYMENT-SUMMARY.md
│
├── Platform Setup
│   ├── scripts/vercel-setup.md
│   └── scripts/supabase-setup.md
│
├── Testing
│   ├── TESTING-GUIDE.md
│   ├── scripts/test-subdomains.sh
│   └── scripts/test-subdomains.ps1
│
├── Database
│   ├── supabase/README.md
│   ├── scripts/run-migrations.sh
│   ├── scripts/run-migrations.ps1
│   └── supabase/migrations/
│
└── Support
    ├── TROUBLESHOOTING.md
    └── DOCUMENTATION-INDEX.md (this file)
```

## 🔗 External Resources

### Official Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Status Pages
- [Vercel Status](https://www.vercel-status.com/)
- [Supabase Status](https://status.supabase.com/)

### Support
- [Vercel Support](https://vercel.com/support)
- [Supabase Support](https://supabase.com/support)

## 📝 Document Descriptions

### README.md
Project overview, tech stack, quick start guide, and project structure.

### QUICK-START.md
5-step deployment guide for rapid deployment. Perfect for experienced developers.

### DEPLOYMENT.md
Comprehensive deployment guide with detailed instructions for every step. Includes troubleshooting and best practices.

### PRODUCTION-CHECKLIST.md
Complete checklist to verify before going live. Covers all aspects from code to monitoring.

### TESTING-GUIDE.md
Manual testing procedures for all features. Includes test cases and expected results.

### TROUBLESHOOTING.md
Common issues and solutions. Organized by category with step-by-step fixes.

### DEPLOYMENT-SUMMARY.md
Overview of what was configured in Task 16. Lists all files created and accomplishments.

### scripts/vercel-setup.md
Detailed Vercel configuration guide. Covers project setup, domains, and deployment.

### scripts/supabase-setup.md
Detailed Supabase setup guide. Covers database, storage, and authentication.

## 🎯 Recommended Reading Order

### For First-Time Deployment
1. README.md
2. QUICK-START.md or DEPLOYMENT.md
3. scripts/supabase-setup.md
4. scripts/vercel-setup.md
5. PRODUCTION-CHECKLIST.md
6. TESTING-GUIDE.md

### For Troubleshooting
1. TROUBLESHOOTING.md
2. Relevant setup guide
3. Official documentation

### For Understanding
1. README.md
2. DEPLOYMENT-SUMMARY.md
3. Code files (middleware.ts, etc.)

## 💡 Tips

- **Bookmark this page** for quick reference
- **Start with QUICK-START.md** if experienced
- **Use DEPLOYMENT.md** for first deployment
- **Keep TROUBLESHOOTING.md** handy
- **Run automated tests** before manual testing
- **Follow checklists** to avoid missing steps

## 🆘 Need Help?

1. Check this index for relevant documentation
2. Read the specific guide
3. Check TROUBLESHOOTING.md
4. Review platform status pages
5. Contact support if needed

---

**Last Updated:** Task 16 Completion
**Documentation Version:** 1.0
**Project:** QR Menu SaaS
