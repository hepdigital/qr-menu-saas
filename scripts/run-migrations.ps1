# QR Menu SaaS - Database Migration Script (PowerShell)
# This script runs all database migrations in order

Write-Host "🚀 Starting database migrations..." -ForegroundColor Cyan
Write-Host ""

# Check if Supabase CLI is installed
$supabaseCmd = Get-Command supabase -ErrorAction SilentlyContinue
if (-not $supabaseCmd) {
    Write-Host "❌ Supabase CLI is not installed" -ForegroundColor Red
    Write-Host "Install it with: npm install -g supabase" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Supabase CLI found" -ForegroundColor Green
Write-Host ""

# Check if project is linked
if (-not (Test-Path ".supabase/config.toml")) {
    Write-Host "⚠️  Project not linked to Supabase" -ForegroundColor Yellow
    Write-Host "Run: supabase link --project-ref your-project-ref" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Project is linked" -ForegroundColor Green
Write-Host ""

# Run migrations
Write-Host "📝 Running migration 001: Initial Schema..." -ForegroundColor Cyan
supabase db execute --file supabase/migrations/001_initial_schema.sql
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Migration 001 completed" -ForegroundColor Green
} else {
    Write-Host "❌ Migration 001 failed" -ForegroundColor Red
    exit 1
}
Write-Host ""

Write-Host "📝 Running migration 002: RLS Policies..." -ForegroundColor Cyan
supabase db execute --file supabase/migrations/002_rls_policies.sql
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Migration 002 completed" -ForegroundColor Green
} else {
    Write-Host "❌ Migration 002 failed" -ForegroundColor Red
    exit 1
}
Write-Host ""

Write-Host "📝 Running migration 003: Storage Buckets..." -ForegroundColor Cyan
supabase db execute --file supabase/migrations/003_storage_buckets.sql
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Migration 003 completed" -ForegroundColor Green
} else {
    Write-Host "❌ Migration 003 failed" -ForegroundColor Red
    exit 1
}
Write-Host ""

Write-Host "🎉 All migrations completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Configure storage buckets in Supabase dashboard"
Write-Host "2. Set up authentication settings"
Write-Host "3. Customize email templates"
Write-Host "4. Create admin user"
Write-Host ""
