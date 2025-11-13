# QR Menu SaaS Platform

A multi-tenant SaaS platform that enables restaurants to create, manage, and deploy QR code-based digital menus.

## 🌟 Features

- **Multi-tenant Architecture**: Each restaurant gets a unique subdomain
- **Digital Menu Management**: Create and organize categories and products
- **QR Code Generation**: Generate QR codes for tables with tracking
- **Theme Customization**: Customize colors, logos, and branding
- **Multi-language Support**: Turkish and English content
- **Analytics Dashboard**: Track menu views and engagement
- **Super Admin Panel**: Platform-wide management and monitoring
- **Responsive Design**: Mobile-first design for optimal viewing

## 🏗️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Deployment**: Vercel
- **Validation**: Zod

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Vercel account (for deployment)
- Domain name with wildcard subdomain support

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd qr-menu-saas
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup

Run migrations in Supabase:

```bash
npm install -g supabase
supabase link --project-ref your-project-ref
supabase db push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🌐 Subdomain Structure

- **Main Domain** (`qrmenu.app`) - Landing site
- **Panel** (`panel.qrmenu.app`) - Restaurant management panel
- **Admin** (`admin.qrmenu.app`) - Super admin panel
- **Restaurant** (`[slug].qrmenu.app`) - Digital menu display

### Local Development

Use query parameters for subdomain testing:
- Landing: `http://localhost:3000`
- Panel: `http://localhost:3000?subdomain=panel`
- Admin: `http://localhost:3000?subdomain=admin`
- Menu: `http://localhost:3000?subdomain=test-restaurant`

## 📦 Project Structure

```
qr-menu-saas/
├── app/                    # Next.js app directory
│   ├── (landing)/         # Landing site routes
│   ├── (panel)/           # Restaurant panel routes
│   ├── (admin)/           # Admin panel routes
│   ├── (menu)/            # Digital menu routes
│   └── api/               # API routes
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── panel/            # Panel components
│   ├── admin/            # Admin components
│   ├── menu/             # Menu components
│   └── ui/               # UI components (shadcn)
├── lib/                   # Utility functions
├── types/                 # TypeScript types
├── supabase/             # Database migrations
│   └── migrations/       # SQL migration files
├── scripts/              # Deployment scripts
└── public/               # Static assets
```

## 🚢 Deployment

### Quick Deploy

See [QUICK-START.md](QUICK-START.md) for rapid deployment.

### Complete Guide

See [DEPLOYMENT.md](DEPLOYMENT.md) for comprehensive deployment instructions.

### Deployment Checklist

Use [PRODUCTION-CHECKLIST.md](PRODUCTION-CHECKLIST.md) to ensure all steps are completed.

## 🧪 Testing

### Automated Tests

```bash
# Test subdomain routing (Linux/Mac)
./scripts/test-subdomains.sh qrmenu.app

# Test subdomain routing (Windows)
.\scripts\test-subdomains.ps1 -Domain "qrmenu.app"
```

### Manual Testing

See [TESTING-GUIDE.md](TESTING-GUIDE.md) for comprehensive testing procedures.

## 📚 Documentation

- [DEPLOYMENT.md](DEPLOYMENT.md) - Complete deployment guide
- [PRODUCTION-CHECKLIST.md](PRODUCTION-CHECKLIST.md) - Pre-launch checklist
- [TESTING-GUIDE.md](TESTING-GUIDE.md) - Testing procedures
- [QUICK-START.md](QUICK-START.md) - Quick deployment guide
- [scripts/vercel-setup.md](scripts/vercel-setup.md) - Vercel configuration
- [scripts/supabase-setup.md](scripts/supabase-setup.md) - Supabase setup
- [supabase/README.md](supabase/README.md) - Database migrations

## 🔒 Security

- Row Level Security (RLS) on all database tables
- JWT-based authentication
- Secure file upload with type/size validation
- HTTPS enforced in production
- Environment variables for sensitive data

## 🛠️ Development

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Type Check

```bash
npx tsc --noEmit
```

## 📄 License

[Your License Here]

## 🤝 Contributing

[Contributing guidelines if applicable]

## 📞 Support

- Documentation: See docs folder
- Issues: [GitHub Issues]
- Email: [Support email]

## 🙏 Acknowledgments

- Next.js team
- Supabase team
- shadcn/ui
- Vercel
