# QR Menu SaaS - Canlıya Alma Rehberi

Bu rehber, projenizi adım adım canlıya almanız için hazırlanmıştır.

## 📋 Ön Hazırlık

### Gerekli Hesaplar
- ✅ GitHub hesabı (kodunuzu yüklemek için)
- ✅ Supabase hesabı (veritabanı için) - https://supabase.com
- ✅ Vercel hesabı (hosting için) - https://vercel.com
- ✅ Domain adı (örn: qrmenu.app) - opsiyonel, Vercel ücretsiz subdomain verir

### Gerekli Yazılımlar
- ✅ Node.js 18+ yüklü
- ✅ Git yüklü

---

## 🚀 Adım 1: Kodu GitHub'a Yükleyin (5 dakika)

### 1.1 GitHub Repository Oluşturun

1. https://github.com adresine gidin
2. Sağ üstten "New repository" tıklayın
3. Repository adı: `qr-menu-saas`
4. Private seçin (önerilir)
5. "Create repository" tıklayın

### 1.2 Kodu Yükleyin

Terminal'de proje klasöründe:

```bash
# Git başlat (eğer başlatılmamışsa)
git init

# Tüm dosyaları ekle
git add .

# Commit yap
git commit -m "Initial commit - QR Menu SaaS"

# GitHub'a bağlan (YOUR-USERNAME yerine kendi kullanıcı adınızı yazın)
git remote add origin https://github.com/YOUR-USERNAME/qr-menu-saas.git

# Yükle
git branch -M main
git push -u origin main
```

✅ **Kontrol:** GitHub'da kodlarınızı görebiliyor musunuz?

---

## 🗄️ Adım 2: Supabase Kurulumu (15 dakika)

### 2.1 Supabase Projesi Oluşturun

1. https://supabase.com/dashboard adresine gidin
2. "New Project" tıklayın
3. Bilgileri doldurun:
   - **Name:** QR Menu Production
   - **Database Password:** Güçlü bir şifre oluşturun (kaydedin!)
   - **Region:** Europe West (Frankfurt) - Türkiye'ye en yakın
   - **Pricing Plan:** Free (başlangıç için yeterli)
4. "Create new project" tıklayın
5. 2-3 dakika bekleyin (proje hazırlanıyor)

### 2.2 API Bilgilerini Kopyalayın

1. Sol menüden "Settings" → "API" tıklayın
2. Şu bilgileri bir yere kaydedin:
   - **Project URL:** `https://xxxxx.supabase.co`
   - **anon/public key:** `eyJhbGc...` (uzun bir key)
   - **service_role key:** `eyJhbGc...` (başka bir uzun key)

⚠️ **ÖNEMLİ:** Bu bilgileri güvenli bir yere kaydedin!

### 2.3 Veritabanı Tablolarını Oluşturun

1. Sol menüden "SQL Editor" tıklayın
2. "New Query" tıklayın
3. `supabase/migrations/001_initial_schema.sql` dosyasını açın
4. İçeriği kopyalayıp SQL Editor'e yapıştırın
5. "Run" tıklayın
6. Aynı işlemi şu dosyalar için tekrarlayın:
   - `supabase/migrations/002_rls_policies.sql`
   - `supabase/migrations/003_storage_buckets.sql`

✅ **Kontrol:** Sol menüden "Table Editor" → Tablolar görünüyor mu?

### 2.4 Storage (Depolama) Ayarları

1. Sol menüden "Storage" tıklayın
2. "Create bucket" tıklayın
3. Şu bucket'ları oluşturun:

**Bucket 1: restaurant-logos**
- Name: `restaurant-logos`
- Public bucket: ✅ İşaretle
- File size limit: 5 MB
- Allowed MIME types: `image/jpeg,image/png,image/webp`

**Bucket 2: restaurant-covers**
- Name: `restaurant-covers`
- Public bucket: ✅ İşaretle
- File size limit: 5 MB
- Allowed MIME types: `image/jpeg,image/png,image/webp`

**Bucket 3: product-images**
- Name: `product-images`
- Public bucket: ✅ İşaretle
- File size limit: 5 MB
- Allowed MIME types: `image/jpeg,image/png,image/webp`

### 2.5 Authentication (Kimlik Doğrulama) Ayarları

1. Sol menüden "Authentication" → "Providers" tıklayın
2. "Email" provider'ı aktif edin
3. "Authentication" → "URL Configuration" tıklayın
4. **Site URL:** `https://panel.vercel.app` (şimdilik böyle, sonra değiştireceksiniz)
5. **Redirect URLs:** Şunları ekleyin:
   ```
   https://panel.vercel.app/auth/callback
   https://panel.vercel.app/reset-password/confirm
   ```

✅ **Supabase Hazır!**

---

## 🌐 Adım 3: Vercel'de Deploy (10 dakika)

### 3.1 Vercel Hesabı ve Proje Oluşturma

1. https://vercel.com adresine gidin
2. "Sign Up" ile GitHub hesabınızla giriş yapın
3. "Add New" → "Project" tıklayın
4. GitHub repository'nizi seçin (`qr-menu-saas`)
5. "Import" tıklayın

### 3.2 Environment Variables (Çevre Değişkenleri) Ekleyin

"Environment Variables" bölümünde şunları ekleyin:

```
NEXT_PUBLIC_SUPABASE_URL
Değer: [Supabase'den kopyaladığınız Project URL]

NEXT_PUBLIC_SUPABASE_ANON_KEY
Değer: [Supabase'den kopyaladığınız anon key]

SUPABASE_SERVICE_ROLE_KEY
Değer: [Supabase'den kopyaladığınız service_role key]

NEXT_PUBLIC_APP_URL
Değer: https://your-project.vercel.app (şimdilik böyle)
```

⚠️ **DİKKAT:** Her değişkeni eklerken "Production" seçili olsun!

### 3.3 Deploy Edin

1. "Deploy" butonuna tıklayın
2. 2-3 dakika bekleyin
3. "Congratulations!" mesajını görünce tamamdır!

✅ **Kontrol:** Vercel'in verdiği URL'yi açın (örn: `your-project.vercel.app`)

---

## 🔧 Adım 4: Domain Ayarları (Opsiyonel - 20 dakika)

### Eğer Kendi Domain'iniz Varsa

#### 4.1 Vercel'de Domain Ekleyin

1. Vercel projenizde "Settings" → "Domains" tıklayın
2. Domain'inizi ekleyin (örn: `qrmenu.app`)
3. Şu subdomain'leri de ekleyin:
   - `www.qrmenu.app`
   - `panel.qrmenu.app`
   - `admin.qrmenu.app`

#### 4.2 DNS Ayarları

Domain sağlayıcınızda (GoDaddy, Namecheap, vs.) şu kayıtları ekleyin:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: CNAME
Name: panel
Value: cname.vercel-dns.com

Type: CNAME
Name: admin
Value: cname.vercel-dns.com

Type: CNAME
Name: *
Value: cname.vercel-dns.com
```

⏰ **Not:** DNS değişiklikleri 1-48 saat sürebilir.

#### 4.3 Supabase URL'lerini Güncelleyin

1. Supabase → Authentication → URL Configuration
2. **Site URL:** `https://panel.qrmenu.app` (kendi domain'iniz)
3. **Redirect URLs:** Güncelleyin:
   ```
   https://panel.qrmenu.app/auth/callback
   https://panel.qrmenu.app/reset-password/confirm
   ```

#### 4.4 Vercel Environment Variable Güncelleyin

1. Vercel → Settings → Environment Variables
2. `NEXT_PUBLIC_APP_URL` değerini güncelleyin: `https://qrmenu.app`
3. "Save" tıklayın
4. "Redeploy" yapın

### Eğer Domain'iniz Yoksa

Vercel'in verdiği ücretsiz subdomain'i kullanabilirsiniz:
- Ana site: `your-project.vercel.app`
- Panel: `your-project.vercel.app?subdomain=panel`
- Admin: `your-project.vercel.app?subdomain=admin`
- Menü: `your-project.vercel.app?subdomain=restaurant-slug`

---

## ✅ Adım 5: Test Edin (15 dakika)

### 5.1 Ana Siteyi Test Edin

1. `https://qrmenu.app` (veya Vercel URL'iniz) açın
2. Sayfa yükleniyor mu?
3. "Register" ve "Login" butonları çalışıyor mu?

### 5.2 Panel'i Test Edin

1. `https://panel.qrmenu.app/register` açın
2. Yeni bir restoran kaydı oluşturun:
   - Restoran Adı: Test Restaurant
   - Email: test@example.com
   - Şifre: Test1234
3. Email onayı geldi mi? (Spam klasörünü kontrol edin)
4. Giriş yapın
5. Dashboard açılıyor mu?

### 5.3 Kategori ve Ürün Ekleyin

1. "Menu Management" tıklayın
2. "Add Category" ile kategori ekleyin
3. "Add Product" ile ürün ekleyin
4. Resim yükleme çalışıyor mu?

### 5.4 QR Kod Oluşturun

1. "QR Codes" tıklayın
2. Masa numarası girin: 1
3. "Generate QR Code" tıklayın
4. QR kodu indirin

### 5.5 Dijital Menüyü Test Edin

1. Restoran slug'ınızı öğrenin (Settings'den)
2. `https://[slug].qrmenu.app` açın
3. Menü görünüyor mu?
4. Ürünler listeleniyor mu?
5. QR kodu telefonla tarayın - çalışıyor mu?

---

## 🎉 Tamamlandı!

Projeniz artık canlıda! 

### Sonraki Adımlar

1. **Admin Kullanıcısı Oluşturun:**
   - Supabase → SQL Editor
   ```sql
   INSERT INTO admin_users (user_id, role)
   VALUES ('user-uuid-buraya', 'super_admin');
   ```

2. **Tema Özelleştirin:**
   - Panel → Customization
   - Logo ve kapak resmi yükleyin
   - Renkleri ayarlayın

3. **QR Kodları Yazdırın:**
   - QR kodları indirin
   - Yazdırın ve masalara yerleştirin

4. **Müşterilerinize Tanıtın:**
   - Restoranlara demo gösterin
   - Fiyatlandırma planınızı belirleyin

---

## 🆘 Sorun mu Yaşıyorsunuz?

### Sık Karşılaşılan Sorunlar

**1. "Failed to connect to database" hatası**
- Environment variables'ları kontrol edin
- Supabase project'in aktif olduğundan emin olun

**2. Resim yüklenmiyor**
- Storage bucket'ların oluşturulduğunu kontrol edin
- Bucket'ların "public" olduğundan emin olun

**3. Email gelmiyor**
- Spam klasörünü kontrol edin
- Supabase → Authentication → Email Templates kontrol edin

**4. Subdomain çalışmıyor**
- DNS ayarlarını kontrol edin
- 24-48 saat bekleyin (DNS propagation)

### Detaylı Yardım

- `TROUBLESHOOTING.md` dosyasına bakın
- `DEPLOYMENT.md` dosyasında detaylı açıklamalar var

---

## 📞 İletişim

Sorunlarınız için:
1. `TROUBLESHOOTING.md` dosyasını kontrol edin
2. Vercel Support: https://vercel.com/support
3. Supabase Support: https://supabase.com/support

---

## 🎯 Hızlı Kontrol Listesi

Canlıya almadan önce:

- [ ] GitHub'a kod yüklendi
- [ ] Supabase projesi oluşturuldu
- [ ] Veritabanı migration'ları çalıştırıldı
- [ ] Storage bucket'lar oluşturuldu
- [ ] Vercel'de deploy edildi
- [ ] Environment variables eklendi
- [ ] Domain ayarları yapıldı (varsa)
- [ ] Test edildi ve çalışıyor

**Hepsi tamamsa, projeniz canlıda! 🚀**
