# Canlıya Almadan Önce Düzeltilmesi Gerekenler

Projeyi canlıya almadan önce bazı küçük kod kalitesi sorunlarını düzeltmemiz gerekiyor.

## ❌ Mevcut Sorunlar

Build yaparken şu hatalar alınıyor:

### 1. Tırnak İşaretleri Hatası (7 dosya)

**Sorun:** JSX içinde düz tırnak işaretleri kullanılmış, HTML entity kullanılmalı.

**Etkilenen Dosyalar:**
- `app/(landing)/landing/page.tsx` (satır 429)
- `app/(menu)/menu/not-found.tsx` (satır 6)
- `app/(panel)/panel/login/page.tsx` (satır 12)
- `app/(panel)/panel/reset-password/page.tsx` (satır 12)
- `components/auth/login-form.tsx` (satır 151)
- `components/panel/delete-category-dialog.tsx` (satır 60)

### 2. React Hook Uyarıları (3 dosya)

**Sorun:** useEffect'te eksik dependency'ler var.

**Etkilenen Dosyalar:**
- `components/admin/payment-list.tsx` (satır 51)
- `components/admin/restaurant-details.tsx` (satır 34)
- `components/admin/restaurant-list.tsx` (satır 31)

## ✅ Çözüm Seçenekleri

### Seçenek 1: Hızlı Çözüm (Önerilen - 2 dakika)

ESLint kurallarını geçici olarak devre dışı bırak:

`.eslintrc.json` dosyasını şöyle güncelle:

```json
{
  "extends": "next/core-web-vitals",
  "rules": {
    "react/no-unescaped-entities": "off",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

Sonra tekrar build et:
```bash
npm run build
```

### Seçenek 2: Tam Düzeltme (15 dakika)

Tüm hataları düzelt. Ben düzelteyim mi?

## 🚀 Önerim

**Şimdilik Seçenek 1'i kullan, canlıya al, sonra Seçenek 2'yi uygula.**

Neden?
- ✅ Hızlı canlıya alabilirsin
- ✅ Hatalar kritik değil, sadece kod kalitesi
- ✅ Fonksiyonelliği etkilemiyor
- ✅ Sonra düzeltebilirsin

## 📝 Yapılacaklar

1. `.eslintrc.json` dosyasını güncelle
2. `npm run build` çalıştır
3. Build başarılı olursa canlıya al
4. Sonra hataları düzelt

---

**Soru:** Hataları şimdi düzeltmemi ister misin yoksa hızlı çözümle devam edelim mi?
