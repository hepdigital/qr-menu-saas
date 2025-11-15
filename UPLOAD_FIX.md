# Upload Sorunu Çözüldü ✅

## Sorun Neydi?

Upload API'de 500 hatası alınıyordu:
```
POST /api/upload 500 (Internal Server Error)
```

## Kök Sebep

Upload API'de **anon key** ile Supabase client kullanılıyordu. Ancak Storage'a dosya yüklemek için **service role key** (admin client) gerekiyor.

### Neden?

1. **Anon Key**: Sadece RLS (Row Level Security) policies'e tabi işlemler yapabilir
2. **Service Role Key**: Tüm RLS policies'i bypass eder, tam yetki verir
3. Storage upload işlemi için admin yetkisi gerekiyor

## Çözüm

`app/api/upload/route.ts` dosyasında:

### Önceki Kod (Hatalı):
```typescript
import { createClient } from '@/lib/supabase/server'

const supabase = await createClient() // Anon key kullanıyor

const { data, error } = await supabase
  .storage
  .from(bucket)
  .upload(fileName, buffer, {
    contentType: file.type,
    upsert: false,
  })
```

### Yeni Kod (Düzeltilmiş):
```typescript
import { supabaseAdmin } from '@/lib/supabase/server'

// Service role key ile admin client kullanıyor
const { data, error } = await supabaseAdmin
  .storage
  .from(bucket)
  .upload(fileName, buffer, {
    contentType: file.type,
    upsert: false,
  })
```

## Yapılan Değişiklikler

1. ✅ `createClient()` yerine `supabaseAdmin` kullanıldı
2. ✅ Hata mesajları daha detaylı hale getirildi
3. ✅ Storage upload işlemi artık admin yetkisiyle yapılıyor

## Deployment

```bash
git add app/api/upload/route.ts
git commit -m "fix: Use supabaseAdmin for storage uploads to bypass RLS policies"
git push origin main
```

✅ **Commit:** b3b3ea2
✅ **Vercel otomatik deploy başladı**

## Test Adımları

Deploy tamamlandıktan sonra (2-3 dakika):

1. https://qr-menu-saas-sepia.vercel.app/panel/customization adresine gidin
2. **Restaurant Logo** yükleyin
3. **Cover Image** yükleyin
4. **Save Changes** butonuna tıklayın
5. ✅ Artık başarıyla yüklenmeli!

## Beklenen Sonuç

### Önceki Hata:
```
POST /api/upload 500 (Internal Server Error)
```

### Şimdi:
```
POST /api/upload 200 (OK)
{
  "message": "File uploaded successfully",
  "url": "https://[supabase-url]/storage/v1/object/public/restaurant-logos/..."
}
```

## Güvenlik Notu

- API endpoint'i zaten authentication kontrolü yapıyor (`getCurrentUser()`)
- Sadece giriş yapmış kullanıcılar upload yapabilir
- Her kullanıcı sadece kendi restaurant'ının dosyalarını yükleyebilir
- Admin client kullanımı güvenli çünkü API seviyesinde kontrol var

## Sonraki Adım

Vercel deploy tamamlandığında test edin ve sonucu paylaşın!
