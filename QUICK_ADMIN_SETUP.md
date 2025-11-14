# 🚀 Hızlı Admin Kurulumu

## 3 Adımda Admin Paneline Giriş

### 1️⃣ Supabase'de User Oluştur

**Supabase Dashboard** → **Authentication** → **Users** → **Add User**

```
Email: admin@qrmenu.app
Password: Admin123!
```

**User ID'yi kopyala** (örn: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

---

### 2️⃣ SQL Çalıştır

**Supabase Dashboard** → **SQL Editor** → **New Query**

```sql
-- User ID'yi aşağıya yapıştır
INSERT INTO admin_users (user_id, role)
VALUES (
  'BURAYA_USER_ID_YAPIŞTIR'::uuid,
  'super_admin'
);
```

**Run** butonuna tıkla.

---

### 3️⃣ Giriş Yap

**URL:** https://qr-menu-saas-sepia.vercel.app/admin/login

```
Email: admin@qrmenu.app
Password: Admin123!
```

---

## ✅ Tamamlandı!

Artık admin paneline giriş yapabilirsiniz.

**Detaylı rehber:** `CREATE_ADMIN_USER.md` dosyasına bakın.

---

## 🔍 Kontrol

Admin kullanıcının oluşturulduğunu kontrol etmek için:

```sql
SELECT 
  au.role,
  u.email
FROM admin_users au
JOIN auth.users u ON au.user_id = u.id;
```

Sonuç:
```
role: super_admin
email: admin@qrmenu.app
```

---

## ⚠️ Önemli

Production'da:
- ✅ Güçlü şifre kullanın
- ✅ Gerçek email adresi kullanın
- ✅ Test bilgilerini değiştirin
