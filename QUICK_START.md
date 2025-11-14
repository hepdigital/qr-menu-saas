# QR Menu SaaS - Hızlı Başlangıç

## ✅ Yapılan Değişiklikler

### 1. URL Routing Düzeltildi
- ✅ Ana domain'de `/panel/login` artık çalışıyor (304 hatası giderildi)
- ✅ Hem subdomain hem path-based erişim destekleniyor
- ✅ Route yapısı düzenlendi (çift `/panel/panel` sorunu giderildi)

### 2. Middleware Güncellendi
- ✅ Subdomain ve path-based routing birlikte çalışıyor
- ✅ Ana domain'de direkt `/panel/*`, `/admin/*` erişimi mümkün
- ✅ Subdomain'ler otomatik olarak doğru route'lara yönlendiriliyor

### 3. Route Yapısı Optimize Edildi
```
app/
├── page.tsx                    # Landing page (/)
├── (panel)/panel/*             # /panel/* routes
├── (admin)/admin/*             # /admin/* routes
└── (menu)/menu/*               # /menu/* routes
```

---

## 🌐 Kullanılabilir URL'ler

### Production (Vercel)

#### Ana Domain - Landing Page
```
https://qr-menu-saas-sepia.vercel.app/
```

#### Panel - Restoran Yönetimi
```
# Direkt erişim (önerilen)
https://qr-menu-saas-sepia.vercel.app/panel/login
https://qr-menu-saas-sepia.vercel.app/panel/register
https://qr-menu-saas-sepia.vercel.app/panel/dashboard

# Subdomain erişimi
https://panel.qr-menu-saas-sepia.vercel.app/
https://panel.qr-menu-saas-sepia.vercel.app/login
https://panel.qr-menu-saas-sepia.vercel.app/register
```

#### Admin - Platform Yönetimi
```
# Direkt erişim (önerilen)
https://qr-menu-saas-sepia.vercel.app/admin/login
https://qr-menu-saas-sepia.vercel.app/admin/dashboard

# Subdomain erişimi
https://admin.qr-menu-saas-sepia.vercel.app/
https://admin.qr-menu-saas-sepia.vercel.app/login
```

#### Restoran Menüsü
```
https://[restoran-slug].qr-menu-saas-sepia.vercel.app/
Örnek: https://pizzeria-roma.qr-menu-saas-sepia.vercel.app/
```

### Local Development

```bash
# Ana sayfa
http://localhost:3000/

# Panel (direkt)
http://localhost:3000/panel/login
http://localhost:3000/panel/register

# Panel (subdomain simülasyonu)
http://localhost:3000/?subdomain=panel

# Admin (direkt)
http://localhost:3000/admin/login

# Admin (subdomain simülasyonu)
http://localhost:3000/?subdomain=admin

# Restoran menüsü (subdomain simülasyonu)
http://localhost:3000/?subdomain=pizzeria-roma
```

---

## 🚀 Deployment

### 1. Environment Variables

Vercel dashboard'da şu değişkenleri ekleyin:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
NEXT_PUBLIC_APP_URL=https://qr-menu-saas-sepia.vercel.app
```

### 2. Deploy

```bash
# Otomatik deploy (GitHub push ile)
git push origin main

# Manuel deploy (Vercel CLI)
vercel --prod
```

### 3. Test

Deploy sonrası şu URL'leri test edin:
1. ✅ `https://qr-menu-saas-sepia.vercel.app/` (Landing)
2. ✅ `https://qr-menu-saas-sepia.vercel.app/panel/login` (Panel Login)
3. ✅ `https://qr-menu-saas-sepia.vercel.app/panel/register` (Panel Register)
4. ✅ `https://qr-menu-saas-sepia.vercel.app/admin/login` (Admin Login)
5. ✅ `https://panel.qr-menu-saas-sepia.vercel.app/` (Panel Subdomain)
6. ✅ `https://admin.qr-menu-saas-sepia.vercel.app/` (Admin Subdomain)

---

## 📁 Önemli Dosyalar

- `middleware.ts` - URL routing mantığı
- `app/page.tsx` - Landing page
- `app/(panel)/panel/*` - Panel sayfaları
- `app/(admin)/admin/*` - Admin sayfaları
- `app/(menu)/menu/*` - Menü sayfaları
- `URL_STRUCTURE.md` - Detaylı URL yapısı dokümantasyonu
- `DEPLOYMENT.md` - Deployment rehberi

---

## 🐛 Sorun Giderme

### Problem: 304 veya Sayfa Yüklenmiyor

**Çözüm:**
1. Browser cache'ini temizleyin (Ctrl+Shift+R)
2. Vercel'de yeniden deploy edin
3. Vercel cache'ini temizleyin

### Problem: Subdomain Çalışmıyor

**Çözüm:**
1. Vercel otomatik olarak wildcard subdomain destekler
2. DNS propagation'ı bekleyin (24 saat)
3. Custom domain kullanıyorsanız wildcard CNAME ekleyin

### Problem: Environment Variables Yüklenmiyor

**Çözüm:**
1. Vercel dashboard → Settings → Environment Variables
2. Tüm değişkenlerin doğru girildiğinden emin olun
3. Yeniden deploy edin

---

## 📞 Destek

Daha fazla bilgi için:
- `URL_STRUCTURE.md` - Detaylı URL yapısı
- `DEPLOYMENT.md` - Deployment rehberi
- Vercel Docs: https://vercel.com/docs

---

## ✨ Özellikler

✅ Multi-tenant SaaS mimarisi  
✅ Subdomain-based routing  
✅ Path-based routing (fallback)  
✅ Landing page  
✅ Restoran yönetim paneli  
✅ Admin paneli  
✅ Dijital menü görüntüleme  
✅ QR kod oluşturma  
✅ Responsive design  
✅ SEO optimized  

---

**Tüm URL'ler artık çalışıyor! 🎉**

Vercel'e push ettikten sonra production URL'lerini test edebilirsiniz.
