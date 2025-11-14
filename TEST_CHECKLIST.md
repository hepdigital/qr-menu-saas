# Test Checklist - Vercel Deployment Sonrası

## 🎯 Test Edilecek URL'ler

Vercel deployment tamamlandıktan sonra (1-2 dakika) aşağıdaki URL'leri test edin:

### ✅ 1. Ana Sayfa (Landing Page)

**URL:** `https://qr-menu-saas-sepia.vercel.app/`

**Beklenen:**
- ✅ Landing page gösterilmeli
- ✅ "Digital Menus Made Simple & Beautiful" başlığı görünmeli
- ✅ Features, Pricing, Examples bölümleri olmalı
- ✅ "Login" ve "Get Started" butonları olmalı
- ❌ "Restaurant Not Found" OLMAMALI

---

### ✅ 2. Panel Login (Path-based)

**URL:** `https://qr-menu-saas-sepia.vercel.app/panel/login`

**Beklenen:**
- ✅ Login formu gösterilmeli
- ✅ "Sign in to your account" başlığı olmalı
- ✅ Email ve password alanları olmalı
- ❌ 404 hatası OLMAMALI

---

### ✅ 3. Panel Register (Path-based)

**URL:** `https://qr-menu-saas-sepia.vercel.app/panel/register`

**Beklenen:**
- ✅ Kayıt formu gösterilmeli
- ✅ "Register Your Restaurant" başlığı olmalı
- ❌ 404 hatası OLMAMALI

---

### ✅ 4. Admin Login (Path-based)

**URL:** `https://qr-menu-saas-sepia.vercel.app/admin/login`

**Beklenen:**
- ✅ Admin login formu gösterilmeli
- ✅ "Super Admin Panel" başlığı olmalı
- ❌ 404 hatası OLMAMALI
- ❌ 307 redirect loop OLMAMALI
- ❌ ERR_TOO_MANY_REDIRECTS OLMAMALI

---

### ✅ 5. Panel Subdomain

**URL:** `https://panel.qr-menu-saas-sepia.vercel.app/`

**Beklenen:**
- ✅ Panel ana sayfası veya login'e redirect
- ✅ Panel layout gösterilmeli
- ❌ Landing page OLMAMALI

---

### ✅ 6. Admin Subdomain

**URL:** `https://admin.qr-menu-saas-sepia.vercel.app/`

**Beklenen:**
- ✅ Admin ana sayfası veya login'e redirect
- ✅ Admin layout gösterilmeli
- ❌ Landing page OLMAMALI

---

### ✅ 7. Restoran Subdomain (Test)

**URL:** `https://test-restaurant.qr-menu-saas-sepia.vercel.app/`

**Beklenen:**
- ✅ Menü sayfası gösterilmeli
- ✅ "Restaurant Not Found" mesajı gösterilmeli (çünkü DB'de yok)
- ✅ Bu normal bir davranış (restoran DB'de olmadığı için)

---

## 🐛 Sorun Giderme

### Problem: Hala "Restaurant Not Found" Görünüyor (Ana Sayfada)

**Çözüm:**
1. Vercel deployment'ın tamamlandığından emin olun
2. Browser cache'ini temizleyin (Ctrl+Shift+R veya Cmd+Shift+R)
3. Incognito/Private mode'da test edin
4. 5 dakika bekleyin (CDN cache için)

### Problem: 404 Hatası Alıyorum

**Çözüm:**
1. Vercel dashboard'da build log'larını kontrol edin
2. Build başarılı mı kontrol edin
3. Environment variables doğru mu kontrol edin
4. Yeniden deploy edin

### Problem: Subdomain Çalışmıyor

**Çözüm:**
1. Vercel otomatik olarak wildcard subdomain destekler
2. DNS propagation bekleyin (24 saat)
3. Custom domain kullanıyorsanız wildcard CNAME ekleyin

---

## 📊 Test Sonuçları

Test sonuçlarınızı işaretleyin:

- [ ] Ana sayfa (Landing) çalışıyor
- [ ] `/panel/login` çalışıyor
- [ ] `/panel/register` çalışıyor
- [ ] `/admin/login` çalışıyor
- [ ] `panel.` subdomain çalışıyor
- [ ] `admin.` subdomain çalışıyor
- [ ] Restoran subdomain çalışıyor (not found mesajı normal)

---

## 🎉 Başarı Kriterleri

Tüm testler başarılı ise:

✅ Ana sayfa landing page gösteriyor  
✅ Panel ve admin sayfaları erişilebilir  
✅ Hem path-based hem subdomain erişim çalışıyor  
✅ Middleware doğru çalışıyor  
✅ Routing sorunları çözüldü  

**Proje production'a hazır!** 🚀

---

## 📞 Destek

Sorun devam ederse:
1. Vercel deployment log'larını kontrol edin
2. Browser console'da hata var mı bakın
3. Network tab'de request'leri inceleyin
4. `MIDDLEWARE_FIX.md` dosyasını okuyun

---

**Son güncelleme:** Middleware düzeltildi, GitHub'a push edildi, Vercel otomatik deploy ediyor.

**Beklenen süre:** 1-2 dakika (Vercel build + deploy)

**Test zamanı:** Deployment tamamlandıktan sonra yukarıdaki URL'leri test edin!
