# 🚀 Hızlı Başlangıç - 5 Adımda Canlıya Alın

## 1️⃣ GitHub'a Yükleyin (2 dakika)

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/KULLANICI-ADINIZ/qr-menu-saas.git
git push -u origin main
```

## 2️⃣ Supabase Kurun (10 dakika)

1. https://supabase.com → "New Project"
2. Settings → API → Bilgileri kaydet
3. SQL Editor → Migration dosyalarını çalıştır:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_rls_policies.sql`
   - `supabase/migrations/003_storage_buckets.sql`
4. Storage → 3 bucket oluştur:
   - `restaurant-logos` (public)
   - `restaurant-covers` (public)
   - `product-images` (public)

## 3️⃣ Vercel'de Deploy Edin (5 dakika)

1. https://vercel.com → GitHub ile giriş
2. "New Project" → Repository seç
3. Environment Variables ekle:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
   ```
4. "Deploy" tıkla

## 4️⃣ Domain Ayarla (Opsiyonel - 15 dakika)

**Vercel'de:**
- Settings → Domains → Domain ekle

**DNS'de:**
```
A     @      76.76.21.21
CNAME *      cname.vercel-dns.com
CNAME panel  cname.vercel-dns.com
CNAME admin  cname.vercel-dns.com
```

## 5️⃣ Test Et (5 dakika)

```bash
# Windows
.\scripts\test-subdomains.ps1 -Domain "qrmenu.app"

# Linux/Mac
./scripts/test-subdomains.sh qrmenu.app
```

---

## ✅ Hazır!

- Ana site: `https://qrmenu.app`
- Panel: `https://panel.qrmenu.app`
- Admin: `https://admin.qrmenu.app`
- Menü: `https://[restoran-slug].qrmenu.app`

---

## 📚 Detaylı Rehber

Daha fazla bilgi için:
- **Türkçe:** `CANLI-ALMA-REHBERI.md`
- **İngilizce:** `DEPLOYMENT.md`
- **Sorun giderme:** `TROUBLESHOOTING.md`
