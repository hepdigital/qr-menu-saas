# QR Menu SaaS - URL Yapısı

## 🌐 Domain ve Subdomain Yapısı

### Ana Domain (Landing Page)
**Production:** `https://qr-menu-saas-sepia.vercel.app/`  
**Local:** `http://localhost:3000/`

Landing sayfası - QR menü hizmetini tanıtan ve satan sayfa.

**Sayfalar:**
- `/` - Ana sayfa (features, pricing, examples, contact)
- `/panel/login` - Panel giriş (direkt erişim)
- `/panel/register` - Panel kayıt (direkt erişim)
- `/admin/login` - Admin giriş (direkt erişim)

---

### Panel Subdomain (Restoran Yönetim Paneli)
**Production:** `https://panel.qr-menu-saas-sepia.vercel.app/`  
**Local:** `http://localhost:3000/?subdomain=panel`

Restoran sahiplerinin menülerini yönettiği panel.

**Sayfalar:**
- `/` veya `/panel` - Panel ana sayfa
- `/login` veya `/panel/login` - Giriş sayfası
- `/register` veya `/panel/register` - Kayıt sayfası
- `/dashboard` veya `/panel/dashboard` - Dashboard
- `/menu` veya `/panel/menu` - Menü yönetimi
- `/qr-codes` veya `/panel/qr-codes` - QR kod oluşturma
- `/settings` veya `/panel/settings` - Ayarlar

---

### Admin Subdomain (Süper Admin Paneli)
**Production:** `https://admin.qr-menu-saas-sepia.vercel.app/`  
**Local:** `http://localhost:3000/?subdomain=admin`

Platform yöneticilerinin tüm sistemi yönettiği panel.

**Sayfalar:**
- `/` veya `/admin` - Admin ana sayfa
- `/login` veya `/admin/login` - Admin giriş
- `/dashboard` veya `/admin/dashboard` - Admin dashboard
- `/restaurants` veya `/admin/restaurants` - Restoran yönetimi
- `/users` veya `/admin/users` - Kullanıcı yönetimi
- `/payments` veya `/admin/payments` - Ödeme yönetimi
- `/statistics` veya `/admin/statistics` - İstatistikler

---

### Restoran Subdomain (Dijital Menü)
**Production:** `https://[restoran-slug].qr-menu-saas-sepia.vercel.app/`  
**Örnek:** `https://pizzeria-roma.qr-menu-saas-sepia.vercel.app/`  
**Local:** `http://localhost:3000/?subdomain=pizzeria-roma`

Müşterilerin QR kod ile eriştiği dijital menü.

**Özellikler:**
- Her restoran kendi subdomain'ine sahip
- Subdomain, restoran slug'ı ile eşleşir
- Müşteriler QR kodu tarayarak bu sayfaya yönlendirilir

---

## 🔧 Middleware Mantığı

Middleware (`middleware.ts`) gelen istekleri analiz eder:

1. **Subdomain yoksa** → Ana domain (landing page)
2. **Subdomain = "panel"** → `/panel/*` route'larına yönlendir
3. **Subdomain = "admin"** → `/admin/*` route'larına yönlendir
4. **Diğer subdomain'ler** → `/menu/*` route'larına yönlendir (restoran menüsü)

---

## 📁 Route Yapısı

```
app/
├── page.tsx                          # Landing page (/)
├── layout.tsx                        # Root layout
├── (panel)/                          # Panel route group
│   └── panel/                        # /panel/*
│       ├── layout.tsx
│       ├── page.tsx
│       ├── login/
│       ├── register/
│       └── (dashboard)/
│           ├── dashboard/
│           ├── menu/
│           ├── qr-codes/
│           └── settings/
├── (admin)/                          # Admin route group
│   └── admin/                        # /admin/*
│       ├── layout.tsx
│       ├── page.tsx
│       ├── login/
│       ├── dashboard/
│       ├── restaurants/
│       ├── payments/
│       └── statistics/
└── (menu)/                           # Menu route group
    └── menu/                         # /menu/*
        ├── layout.tsx
        ├── page.tsx
        └── not-found.tsx
```

---

## 🚀 Test Etme

### Local Development

1. **Ana sayfa:**
   ```
   http://localhost:3000/
   ```

2. **Panel (direkt erişim):**
   ```
   http://localhost:3000/panel/login
   http://localhost:3000/panel/register
   http://localhost:3000/panel/dashboard
   ```

3. **Panel (subdomain simülasyonu):**
   ```
   http://localhost:3000/?subdomain=panel
   ```

4. **Admin (direkt erişim):**
   ```
   http://localhost:3000/admin/login
   http://localhost:3000/admin/dashboard
   ```

5. **Admin (subdomain simülasyonu):**
   ```
   http://localhost:3000/?subdomain=admin
   ```

6. **Restoran menüsü (subdomain simülasyonu):**
   ```
   http://localhost:3000/?subdomain=pizzeria-roma
   ```

### Production (Vercel)

1. **Ana sayfa:**
   ```
   https://qr-menu-saas-sepia.vercel.app/
   ```

2. **Panel:**
   ```
   https://qr-menu-saas-sepia.vercel.app/panel/login
   https://panel.qr-menu-saas-sepia.vercel.app/
   https://panel.qr-menu-saas-sepia.vercel.app/login
   ```

3. **Admin:**
   ```
   https://qr-menu-saas-sepia.vercel.app/admin/login
   https://admin.qr-menu-saas-sepia.vercel.app/
   https://admin.qr-menu-saas-sepia.vercel.app/login
   ```

4. **Restoran menüsü:**
   ```
   https://pizzeria-roma.qr-menu-saas-sepia.vercel.app/
   ```

---

## ✅ Çözülen Sorunlar

1. ✅ Ana domain'de `/panel/login` 304 hatası → Düzeltildi
2. ✅ Route yapısı düzenlendi (çift `/panel/panel` sorunu giderildi)
3. ✅ Middleware subdomain ve path-based routing'i destekliyor
4. ✅ Hem subdomain hem direkt path erişimi çalışıyor
5. ✅ Landing page ana domain'de gösteriliyor

---

## 📝 Notlar

- Vercel otomatik olarak wildcard subdomain'leri destekler
- Local development'ta subdomain test etmek için `?subdomain=` query parametresi kullanın
- Production'da gerçek subdomain'ler çalışır
- Middleware tüm route'ları otomatik olarak yönetir
