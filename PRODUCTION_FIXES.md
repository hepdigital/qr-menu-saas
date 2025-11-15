# Production Sorunları ve Çözümleri

## Tespit Edilen Sorunlar

### 1. ✅ Product Ekleme Hatası
**Hata:** "Application error: a client-side exception has occurred"

**Sebep:**
- `productSchema` validation'da `image_url` alanı eksikti
- `nullable()` desteği yoktu
- API endpoint'i `image_url` alanını işlemiyordu

**Çözüm:**
- ✅ `lib/validations.ts` - `productSchema` ve `updateProductSchema` güncellendi
- ✅ `app/api/products/route.ts` - `image_url` desteği eklendi
- ✅ Tüm optional alanlar için `nullable()` eklendi

### 2. ✅ Customization Upload Hatası
**Hata:** 
```
POST /api/upload 500 (Internal Server Error)
PATCH /api/theme 400 (Bad Request) - Validation failed
```

**Sebep:**
- Supabase Storage bucket'ları production'da oluşturulmamış
- `updateThemeSchema` validation'da `logo_url` ve `cover_image_url` için `nullable()` eksikti
- Boş string değerleri URL validation'dan geçemiyordu

**Çözüm:**
- ✅ `lib/validations.ts` - `updateThemeSchema` güncellendi
- ✅ `logo_url` ve `cover_image_url` için `nullable()` eklendi
- 📋 `scripts/setup-storage.sql` - Storage bucket setup script'i oluşturuldu
- 📋 `STORAGE_SETUP.md` - Detaylı kurulum rehberi oluşturuldu

## Yapılan Değişiklikler

### Kod Değişiklikleri

#### 1. lib/validations.ts
```typescript
// Product Schema - image_url ve nullable desteği eklendi
export const productSchema = z.object({
  // ... diğer alanlar
  image_url: z.string()
    .url('Invalid image URL')
    .nullable()
    .optional(),
  allergens: z.array(z.string())
    .nullable()
    .optional(),
  // ...
})

// Update Product Schema - nullable desteği eklendi
export const updateProductSchema = z.object({
  // ... tüm optional alanlara nullable() eklendi
})

// Update Theme Schema - nullable desteği eklendi
export const updateThemeSchema = z.object({
  logo_url: z.string()
    .url('Invalid logo URL')
    .nullable()
    .optional(),
  cover_image_url: z.string()
    .url('Invalid cover image URL')
    .nullable()
    .optional(),
  // ...
})
```

#### 2. app/api/products/route.ts
```typescript
// POST endpoint - image_url desteği eklendi
const { 
  name, 
  name_en, 
  description, 
  description_en, 
  price, 
  category_id,
  image_url,  // ✅ Eklendi
  allergens, 
  is_available, 
  display_order 
} = validationResult.data

// Insert query - image_url eklendi
const { data: product, error } = await supabase
  .from('products')
  .insert({
    restaurant_id: restaurant.id,
    name,
    name_en: name_en || null,
    description: description || null,
    description_en: description_en || null,
    price,
    category_id: category_id || null,
    image_url: image_url || null,  // ✅ Eklendi
    allergens: allergens || null,
    is_available: is_available ?? true,
    display_order: display_order ?? 0,
  })
  .select()
  .single()
```

### Yeni Dosyalar

1. **scripts/setup-storage.sql**
   - Supabase Storage bucket'larını oluşturan SQL script
   - Storage policies'i ayarlayan komutlar
   - Production'da çalıştırılması gereken

2. **STORAGE_SETUP.md**
   - Detaylı storage kurulum rehberi
   - Manuel ve otomatik kurulum adımları
   - Troubleshooting bilgileri

3. **PRODUCTION_FIXES.md** (bu dosya)
   - Tüm sorunların özeti
   - Yapılan değişikliklerin listesi
   - Deploy adımları

## Deployment Adımları

### 1. Kod Değişikliklerini GitHub'a Push Edin

```bash
git add .
git commit -m "fix: Add storage support and fix validation schemas

- Add nullable() support to validation schemas
- Add image_url support to product API
- Fix theme validation for logo and cover images
- Add storage setup script and documentation"
git push origin main
```

### 2. Supabase Storage'ı Kurun

**Seçenek A: SQL Editor (Önerilen)**
1. Supabase Dashboard → SQL Editor
2. `scripts/setup-storage.sql` içeriğini yapıştırın
3. Run butonuna tıklayın

**Seçenek B: Manuel**
1. `STORAGE_SETUP.md` dosyasındaki adımları takip edin
2. Her bucket'ı manuel olarak oluşturun
3. Policies'i manuel olarak ekleyin

### 3. Vercel Deploy'u Bekleyin

Vercel otomatik olarak yeni versiyonu deploy edecektir. Deploy tamamlandığında:

1. https://qr-menu-saas-sepia.vercel.app adresine gidin
2. Admin paneline giriş yapın
3. Aşağıdaki testleri yapın

### 4. Test Edin

#### Product Ekleme Testi
1. Products sayfasına gidin
2. "Add Product" butonuna tıklayın
3. Ürün bilgilerini doldurun
4. Resim yükleyin (opsiyonel)
5. "Create" butonuna tıklayın
6. ✅ Ürün başarıyla oluşturulmalı

#### Customization Testi
1. Customization sayfasına gidin
2. Logo yükleyin
3. Cover image yükleyin
4. Renkleri değiştirin
5. "Save Changes" butonuna tıklayın
6. ✅ Değişiklikler başarıyla kaydedilmeli

## Kontrol Listesi

### Kod Değişiklikleri
- [x] `lib/validations.ts` güncellendi
- [x] `app/api/products/route.ts` güncellendi
- [x] Diagnostics kontrol edildi (hata yok)
- [x] Setup script'i oluşturuldu
- [x] Dokümantasyon oluşturuldu

### Deployment
- [ ] Kod GitHub'a push edildi
- [ ] Vercel deploy tamamlandı
- [ ] Supabase Storage bucket'ları oluşturuldu
- [ ] Storage policies ayarlandı

### Test
- [ ] Product ekleme test edildi
- [ ] Product resim yükleme test edildi
- [ ] Logo yükleme test edildi
- [ ] Cover image yükleme test edildi
- [ ] Theme kaydetme test edildi

## Notlar

- Storage bucket'ları oluşturulmadan upload işlemleri çalışmayacaktır
- Validation hataları düzeltildi, artık boş değerler kabul ediliyor
- Tüm image upload işlemleri için 5MB limit var
- Sadece JPEG, PNG ve WebP formatları destekleniyor

## Sonraki Adımlar

1. ✅ Kodu GitHub'a push edin
2. ⏳ Vercel deploy'u bekleyin
3. 📋 Supabase Storage'ı kurun (`STORAGE_SETUP.md` rehberini takip edin)
4. ✅ Testleri yapın
5. 🎉 Production hazır!
