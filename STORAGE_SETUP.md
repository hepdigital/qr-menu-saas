# Storage Setup Guide

## Problem
Upload işlemleri sırasında 500 hatası alınıyor. Bu, Supabase Storage bucket'larının production ortamında oluşturulmamış olmasından kaynaklanıyor.

## Çözüm

### 1. Supabase Dashboard'a Giriş Yapın
1. https://supabase.com adresine gidin
2. Projenizi seçin

### 2. Storage Bucket'larını Oluşturun

#### Yöntem 1: SQL Editor Kullanarak (Önerilen)
1. Sol menüden **SQL Editor** seçin
2. **New Query** butonuna tıklayın
3. `scripts/setup-storage.sql` dosyasının içeriğini kopyalayıp yapıştırın
4. **Run** butonuna tıklayın

#### Yöntem 2: Manuel Oluşturma
1. Sol menüden **Storage** seçin
2. **Create a new bucket** butonuna tıklayın
3. Aşağıdaki bucket'ları oluşturun:

**Bucket 1: restaurant-logos**
- Name: `restaurant-logos`
- Public: ✅ Yes
- File size limit: 5 MB
- Allowed MIME types: `image/jpeg, image/jpg, image/png, image/webp`

**Bucket 2: restaurant-covers**
- Name: `restaurant-covers`
- Public: ✅ Yes
- File size limit: 5 MB
- Allowed MIME types: `image/jpeg, image/jpg, image/png, image/webp`

**Bucket 3: product-images**
- Name: `product-images`
- Public: ✅ Yes
- File size limit: 5 MB
- Allowed MIME types: `image/jpeg, image/jpg, image/png, image/webp`

### 3. Storage Policies'i Ayarlayın

Her bucket için aşağıdaki policies'i oluşturun:

1. Storage sayfasında bucket'ı seçin
2. **Policies** tab'ına gidin
3. **New Policy** butonuna tıklayın
4. `scripts/setup-storage.sql` dosyasındaki policy'leri ekleyin

### 4. Değişiklikleri Test Edin

1. Uygulamanızda **Customization** sayfasına gidin
2. Logo veya cover image yüklemeyi deneyin
3. **Products** sayfasında yeni ürün eklemeyi deneyin

## Yapılan Düzeltmeler

### 1. Validation Schema Güncellemeleri
- `lib/validations.ts` dosyasında `nullable()` desteği eklendi
- `productSchema` ve `updateProductSchema` için `image_url` alanı eklendi
- `updateThemeSchema` için `logo_url` ve `cover_image_url` alanlarına `nullable()` eklendi

### 2. Product API Güncellemesi
- `app/api/products/route.ts` dosyasında `image_url` desteği eklendi
- POST endpoint'i artık ürün resimlerini kaydediyor

## Hata Ayıklama

### Upload 500 Hatası
**Sebep:** Storage bucket'ları oluşturulmamış
**Çözüm:** Yukarıdaki adımları takip ederek bucket'ları oluşturun

### Theme 400 Hatası (Validation Failed)
**Sebep:** Boş string değerleri URL validation'dan geçemiyor
**Çözüm:** ✅ Düzeltildi - `nullable()` eklendi

### Product Ekleme Hatası
**Sebep:** `image_url` alanı schema'da eksikti
**Çözüm:** ✅ Düzeltildi - Schema ve API güncellendi

## Vercel'e Deploy

Değişiklikleri GitHub'a push edin:

```bash
git add .
git commit -m "fix: Add storage support and fix validation schemas"
git push origin main
```

Vercel otomatik olarak yeni versiyonu deploy edecektir.

## Kontrol Listesi

- [ ] Supabase Storage bucket'ları oluşturuldu
- [ ] Storage policies ayarlandı
- [ ] Kod değişiklikleri GitHub'a push edildi
- [ ] Vercel deploy tamamlandı
- [ ] Logo upload test edildi
- [ ] Cover image upload test edildi
- [ ] Product image upload test edildi
- [ ] Theme kaydetme test edildi
- [ ] Product ekleme test edildi
