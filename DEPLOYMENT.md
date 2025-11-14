# QR Menu SaaS - Deployment Guide

## 🚀 Vercel'e Deploy Etme

### 1. Environment Variables Ayarlama

Vercel dashboard'da şu environment variable'ları ekleyin:

```env
NEXT_PUBLIC_SUPABASE_URL=your-actual-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-actual-supabase-service-role-key
NEXT_PUBLIC_APP_URL=https://qr-menu-saas-sepia.vercel.app
```

### 2. Wildcard Subdomain Ayarlama

Vercel otomatik olarak wildcard subdomain'leri destekler. Herhangi bir ek ayar gerekmez.

**Otomatik çalışacak subdomain'ler:**
- `panel.qr-menu-saas-sepia.vercel.app`
- `admin.qr-menu-saas-sepia.vercel.app`
- `[herhangi-bir-restoran].qr-menu-saas-sepia.vercel.app`

### 3. Deploy Komutu

```bash
# Vercel CLI ile deploy
vercel

# Production deploy
vercel --prod
```

### 4. Custom Domain Ekleme (Opsiyonel)

Eğer kendi domain'inizi kullanmak isterseniz:

1. Vercel dashboard → Settings → Domains
2. Domain ekleyin (örn: `qrmenu.app`)
3. DNS kayıtlarını güncelleyin:
   ```
   A Record: @ → 76.76.21.21
   CNAME: * → cname.vercel-dns.com
   ```

Wildcard CNAME sayesinde tüm subdomain'ler otomatik çalışır:
- `qrmenu.app` → Landing page
- `panel.qrmenu.app` → Panel
- `admin.qrmenu.app` → Admin
- `pizzeria-roma.qrmenu.app` → Restoran menüsü

---

## 🧪 Test Etme

### Production URL'leri Test Edin:

1. **Landing Page:**
   ```
   https://qr-menu-saas-sepia.vercel.app/
   ```

2. **Panel Login (direkt):**
   ```
   https://qr-menu-saas-sepia.vercel.app/panel/login
   ```

3. **Panel Login (subdomain):**
   ```
   https://panel.qr-menu-saas-sepia.vercel.app/
   https://panel.qr-menu-saas-sepia.vercel.app/login
   ```

4. **Admin Login (direkt):**
   ```
   https://qr-menu-saas-sepia.vercel.app/admin/login
   ```

5. **Admin Login (subdomain):**
   ```
   https://admin.qr-menu-saas-sepia.vercel.app/
   https://admin.qr-menu-saas-sepia.vercel.app/login
   ```

---

## ✅ Deployment Checklist

- [ ] Supabase database oluşturuldu
- [ ] Supabase environment variables Vercel'e eklendi
- [ ] Vercel'e push edildi
- [ ] Ana domain çalışıyor (landing page)
- [ ] `/panel/login` çalışıyor
- [ ] `/panel/register` çalışıyor
- [ ] `/admin/login` çalışıyor
- [ ] `panel.` subdomain çalışıyor
- [ ] `admin.` subdomain çalışıyor
- [ ] Wildcard subdomain test edildi (örn: `test-restaurant.`)

---

## 🐛 Troubleshooting

### Problem: 304 veya 404 Hatası

**Çözüm:** 
- Vercel cache'ini temizleyin
- Yeniden deploy edin
- Browser cache'ini temizleyin (Ctrl+Shift+R)

### Problem: Subdomain Çalışmıyor

**Çözüm:**
- Vercel dashboard'da domain ayarlarını kontrol edin
- Wildcard subdomain'in aktif olduğundan emin olun
- DNS propagation'ı bekleyin (24 saat kadar sürebilir)

### Problem: Environment Variables Yüklenmiyor

**Çözüm:**
- Vercel dashboard → Settings → Environment Variables
- Tüm variable'ların doğru girildiğinden emin olun
- Yeniden deploy edin

---

## 📊 Monitoring

Vercel dashboard'da şunları izleyebilirsiniz:
- Deployment logs
- Function logs
- Analytics
- Performance metrics

---

## 🔄 Güncelleme

Kod değişikliklerini deploy etmek için:

```bash
git add .
git commit -m "Update message"
git push origin main
```

Vercel otomatik olarak yeni deployment başlatır.
