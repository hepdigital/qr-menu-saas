#!/bin/bash

# QR Menu SaaS - Database Migration Script
# This script runs all database migrations in order

echo "🚀 Starting database migrations..."
echo ""

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null
then
    echo "❌ Supabase CLI is not installed"
    echo "Install it with: npm install -g supabase"
    exit 1
fi

echo "✅ Supabase CLI found"
echo ""

# Check if project is linked
if [ ! -f ".supabase/config.toml" ]; then
    echo "⚠️  Project not linked to Supabase"
    echo "Run: supabase link --project-ref your-project-ref"
    exit 1
fi

echo "✅ Project is linked"
echo ""

# Run migrations
echo "📝 Running migration 001: Initial Schema..."
supabase db execute --file supabase/migrations/001_initial_schema.sql
if [ $? -eq 0 ]; then
    echo "✅ Migration 001 completed"
else
    echo "❌ Migration 001 failed"
    exit 1
fi
echo ""

echo "📝 Running migration 002: RLS Policies..."
supabase db execute --file supabase/migrations/002_rls_policies.sql
if [ $? -eq 0 ]; then
    echo "✅ Migration 002 completed"
else
    echo "❌ Migration 002 failed"
    exit 1
fi
echo ""

echo "📝 Running migration 003: Storage Buckets..."
supabase db execute --file supabase/migrations/003_storage_buckets.sql
if [ $? -eq 0 ]; then
    echo "✅ Migration 003 completed"
else
    echo "❌ Migration 003 failed"
    exit 1
fi
echo ""

echo "🎉 All migrations completed successfully!"
echo ""
echo "Next steps:"
echo "1. Configure storage buckets in Supabase dashboard"
echo "2. Set up authentication settings"
echo "3. Customize email templates"
echo "4. Create admin user"
echo ""
