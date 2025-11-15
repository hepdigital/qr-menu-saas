# Dinamik Domain Sistemi ✅

## 🎯 Ne Değişti?

Artık sistem **dinamik domain** desteğine sahip! Sabit `qrmenu.app` yerine, hangi domain'de çalışıyorsanız otomatik olarak o domain'i kullanır.

## 📋 Nasıl Çalışıyor?

### 1. Vercel Domain (Şu Anki Durum)
```
Ana Site: qr-menu-saas-sepia.vercel.app
Panel: panel.qr-menu-saas-sepia.vercel.app
Admin: admin.qr-menu-saas-sepia.vercel.app
Restoran: ozturk.qr-menu-saas-sepia.vercel.app
```

### 2. Özel Domain (Gelecekte)
```
Ana Site: qrmenu.app
Panel: panel.qrmenu.app
Admin: admin.qrmenu.app
Restoran: ozturk.qrmenu.app
```

## 🔧 Yapılan Değişiklikler

### 1. Yeni Utility Fonksiyonlar
**Dosya:** `lib/domain.ts`

```typescript
getBaseDomain()           // Temel domain'i döner
getRestaurantUrl()        // Restoran URL'i oluşturur
getPanelUrl()             // Panel URL'i döner
getAdminUrl()             // Admin URL'i döner
formatRestaurantDomain()  // Domain'i formatlar
```

### 2. React Hook
**Dosya:** `hooks/use-domain.ts`

```typescript
useBaseDomain()           // Client-side domain hook
useRestaurantUrl()        // Restoran URL hook
useRestaurantDomain()     // Domain formatı hook
```

### 3. Güncellenen Dosyalar
- ✅ `components/panel/header.tsx` - Dinamik domain gösterimi
- ✅ `app/api/qr-codes/route.ts` - Dinamik QR kod URL'leri
- ✅ `app/api/qr-codes/batch/route.ts` - Batch QR kod URL'leri

## 🚀 Vercel Environment Variable Ayarı

### Şu Anki Durum (Vercel Domain)
Vercel'de `NEXT_PUBLIC_APP_URL` değişkenini ayarlayın:

1. Vercel Dashboard → Projeniz → Settings → Environment Variables
2. `NEXT_PUBLIC_APP_URL` ekleyin veya güncelleyin:
   ```
   https://qr-menu-saas-sepia.vercel.app
   ```
3. **Save** tıklayın
4. **Redeploy** yapın

### Gelecekte (Özel Domain)
Domain'inizi Vercel'e ekledikten sonra:

1. Vercel Dashboard → Projeniz → Settings → Environment Variables
2. `NEXT_PUBLIC_APP_URL` güncelleyin:
   ```
   https://qrmenu.app
   ```
3. **Save** tıklayın
4. **Redeploy** yapın

## 📱 Özellikler

### ✅ Otomatik Domain Algılama
- Client-side: `window.location.hostname` kullanır
- Server-side: `NEXT_PUBLIC_APP_URL` kullanır
- Fallback: Vercel domain

### ✅ Subdomain Desteği
- Panel: `panel.{domain}`
- Admin: `admin.{domain}`
- Restoran: `{slug}.{domain}`

### ✅ QR Kod URL'leri
- Otomatik olarak doğru domain kullanır
- Table number parametresi destekler
- Yüksek çözünürlük (512x512)

### ✅ Localhost Desteği
- Development'ta `localhost:3000` kullanır
- Production'da gerçek domain kullanır

## 🧪 Test

### 1. Header'da Domain Kontrolü
1. Panel'e giriş yapın
2. Sağ üstte restoran adının altında domain görünmeli
3. Şu anda: `ozturk.qr-menu-saas-sepia.vercel.app`
4. Gelecekte: `ozturk.qrmenu.app`

### 2. QR Kod URL Kontrolü
1. QR Codes sayfasına gidin
2. Yeni QR kod oluşturun
3. QR kodu tarayın veya URL'i kontrol edin
4. URL doğru domain'i göstermeli

### 3. Menü Erişimi
1. Restoran URL'ini açın: `https://ozturk.qr-menu-saas-sepia.vercel.app`
2. Menü görünmeli
3. Ürünler listelenmeli

## 🔄 Domain Değiştirme Süreci

### Adım 1: Vercel'de Domain Ekleyin
1. Vercel Dashboard → Settings → Domains
2. `qrmenu.app` ekleyin
3. DNS kayıtlarını güncelleyin

### Adım 2: Wildcard Subdomain Ekleyin
1. DNS'de wildcard CNAME ekleyin:
   ```
   *.qrmenu.app → cname.vercel-dns.com
   ```

### Adım 3: Environment Variable Güncelleyin
1. `NEXT_PUBLIC_APP_URL` → `https://qrmenu.app`
2. Redeploy yapın

### Adım 4: Supabase URL'lerini Güncelleyin
1. Supabase → Authentication → URL Configuration
2. Site URL: `https://panel.qrmenu.app`
3. Redirect URLs:
   ```
   https://panel.qrmenu.app/auth/callback
   https://panel.qrmenu.app/reset-password/confirm
   ```

### Adım 5: Test Edin
1. Tüm subdomain'leri test edin
2. QR kodları yeniden oluşturun (eski URL'ler eski domain'i gösterir)
3. Yeni kayıtlar otomatik olarak yeni domain kullanır

## 💡 Önemli Notlar

### QR Kodlar
- **Mevcut QR kodlar:** Eski domain'i gösterir (database'de kayıtlı)
- **Yeni QR kodlar:** Yeni domain'i otomatik kullanır
- **Çözüm:** Domain değiştirince QR kodları yeniden oluşturun

### Environment Variable
- `NEXT_PUBLIC_APP_URL` **mutlaka** ayarlanmalı
- Ayarlanmazsa Vercel domain kullanılır
- Her değişiklikten sonra redeploy gerekir

### Subdomain Routing
- Middleware otomatik çalışır
- Domain değişikliği middleware'i etkilemez
- Tüm subdomain'ler otomatik yönlendirilir

## 🎉 Avantajlar

1. **Esneklik:** İstediğiniz domain'de çalışır
2. **Kolay Geçiş:** Tek environment variable değişikliği
3. **Otomatik:** Kod değişikliği gerektirmez
4. **Test Dostu:** Development ve production ayrı domain'ler
5. **Ölçeklenebilir:** Birden fazla domain desteklenebilir

## 📝 Deployment

```bash
git add .
git commit -m "feat: Add dynamic domain support for multi-tenant system"
git push origin main
```

Vercel otomatik deploy edecek. Deploy sonrası:
1. Environment variable'ı ayarlayın
2. Redeploy yapın
3. Test edin!
