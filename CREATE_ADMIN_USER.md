# Admin Kullanıcı Oluşturma Rehberi

## 🎯 Hızlı Başlangıç

Admin paneline giriş yapmak için bir admin kullanıcı oluşturmanız gerekiyor.

---

## 📝 Adım 1: Supabase Dashboard'a Giriş

1. Supabase Dashboard'a gidin: https://supabase.com/dashboard
2. Projenizi seçin
3. Sol menüden **Authentication** → **Users** seçin

---

## 👤 Adım 2: Auth User Oluştur

1. **"Add User"** butonuna tıklayın
2. Aşağıdaki bilgileri girin:

   ```
   Email: admin@qrmenu.app
   Password: Admin123!
   ```

3. **"Create User"** butonuna tıklayın
4. Oluşturulan kullanıcının **User ID**'sini kopyalayın (UUID formatında)

---

## 🗄️ Adım 3: Admin User Kaydı Oluştur

1. Sol menüden **SQL Editor** seçin
2. **"New Query"** butonuna tıklayın
3. Aşağıdaki SQL kodunu yapıştırın:

```sql
-- Admin user kaydı oluştur
-- 'YOUR_USER_ID_HERE' yerine Adım 2'de kopyaladığınız User ID'yi yapıştırın

INSERT INTO admin_users (user_id, role)
VALUES (
  'YOUR_USER_ID_HERE'::uuid,
  'super_admin'
)
ON CONFLICT (user_id) DO NOTHING;

-- Kontrol et
SELECT 
  au.id,
  au.user_id,
  au.role,
  au.created_at,
  u.email
FROM admin_users au
JOIN auth.users u ON au.user_id = u.id;
```

4. `'YOUR_USER_ID_HERE'` yerine kopyaladığınız User ID'yi yapıştırın
5. **"Run"** butonuna tıklayın

---

## ✅ Adım 4: Giriş Yap

1. Admin login sayfasına gidin:
   ```
   https://qr-menu-saas-sepia.vercel.app/admin/login
   ```

2. Giriş bilgilerini girin:
   ```
   Email: admin@qrmenu.app
   Password: Admin123!
   ```

3. **"Sign In"** butonuna tıklayın

---

## 🔐 Alternatif: Kendi Email ve Şifrenizi Kullanın

Kendi email ve şifrenizi kullanmak isterseniz:

### Adım 1: Auth User Oluştur
```
Email: sizin@email.com
Password: GüçlüŞifre123!
```

### Adım 2: SQL Script
```sql
-- Kendi user ID'nizi kullanın
INSERT INTO admin_users (user_id, role)
VALUES (
  'KENDI_USER_ID_BURAYA'::uuid,
  'super_admin'
);
```

---

## 🛠️ Sorun Giderme

### Problem: "User already exists" hatası

**Çözüm:** Email zaten kullanılıyor. Farklı bir email deneyin veya mevcut kullanıcıyı silin.

### Problem: "Invalid UUID" hatası

**Çözüm:** User ID'yi doğru kopyaladığınızdan emin olun. UUID formatı: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

### Problem: "Foreign key violation" hatası

**Çözüm:** Önce auth.users tablosunda kullanıcı oluşturulmalı, sonra admin_users'a eklenebilir.

### Problem: Giriş yapamıyorum

**Çözüm:** 
1. Email ve şifrenin doğru olduğundan emin olun
2. Supabase Dashboard'da kullanıcının "Email Confirmed" olduğunu kontrol edin
3. admin_users tablosunda kaydın olduğunu kontrol edin

---

## 📊 Kontrol SQL'leri

### Tüm admin kullanıcıları listele:
```sql
SELECT 
  au.id,
  au.user_id,
  au.role,
  au.created_at,
  u.email,
  u.email_confirmed_at
FROM admin_users au
JOIN auth.users u ON au.user_id = u.id;
```

### Belirli bir email'in admin olup olmadığını kontrol et:
```sql
SELECT 
  au.id,
  au.role,
  u.email
FROM admin_users au
JOIN auth.users u ON au.user_id = u.id
WHERE u.email = 'admin@qrmenu.app';
```

### Admin kullanıcı sil:
```sql
-- Önce admin_users'dan sil
DELETE FROM admin_users WHERE user_id = 'USER_ID_BURAYA'::uuid;

-- Sonra auth.users'dan sil (opsiyonel)
-- Bu işlem Supabase Dashboard'dan yapılmalı
```

---

## 🎉 Başarılı!

Admin kullanıcı oluşturulduktan sonra:

✅ Admin paneline giriş yapabilirsiniz  
✅ Tüm restoranları görebilirsiniz  
✅ Ödeme kayıtlarını yönetebilirsiniz  
✅ İstatistikleri görüntüleyebilirsiniz  

---

## 🔒 Güvenlik Notları

⚠️ **ÖNEMLİ:** Production ortamında:

1. Güçlü şifreler kullanın
2. Test email'lerini değiştirin
3. 2FA (Two-Factor Authentication) aktif edin
4. Admin kullanıcı sayısını minimum tutun
5. Düzenli olarak admin kullanıcıları gözden geçirin

---

## 📞 Destek

Sorun yaşarsanız:
1. Supabase Dashboard'da SQL Editor'deki hata mesajlarını kontrol edin
2. Browser console'da JavaScript hataları olup olmadığına bakın
3. Network tab'de API request'leri inceleyin

---

**Test Bilgileri (Development):**
```
Email: admin@qrmenu.app
Password: Admin123!
```

**Production'da bu bilgileri değiştirmeyi unutmayın!** 🔐
