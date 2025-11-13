# QR Menu SaaS Platformu

Restoranların QR kod tabanlı dijital menüler oluşturmasını, yönetmesini ve yayınlamasını sağlayan çok kiracılı SaaS platformu.

## 🌟 Özellikler

- **Çok Kiracılı Mimari**: Her restoran kendine özel subdomain alır
- **Dijital Menü Yönetimi**: Kategori ve ürün oluşturma ve düzenleme
- **QR Kod Üretimi**: Masa numaralı QR kodlar ve takip sistemi
- **Tema Özelleştirme**: Logo, renk ve marka özelleştirme
- **Çoklu Dil Desteği**: Türkçe ve İngilizce içerik
- **Analitik Dashboard**: Menü görüntüleme ve etkileşim takibi
- **Süper Admin Paneli**: Platform geneli yönetim ve izleme
- **Responsive Tasarım**: Mobil öncelikli optimum görüntüleme

## 🏗️ Teknoloji Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Stil**: Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Supabase
- **Veritabanı**: PostgreSQL (Supabase)
- **Kimlik Doğrulama**: Supabase Auth
- **Depolama**: Supabase Storage
- **Deployment**: Vercel
- **Validasyon**: Zod

## 📋 Gereksinimler

- Node.js 18+ 
- npm veya yarn
- Supabase hesabı
- Vercel hesabı (deployment için)
- Wildcard subdomain destekli domain adı

## 🚀 Hızlı Başlangıç

### Yerel Geliştirme

```bash
# Projeyi klonlayın
git clone <repository-url>
cd qr-menu-saas

# Bağımlılıkları yükleyin
npm install

# Environment dosyasını oluşturun
cp .env.example .env.local

# Supabase bilgilerinizi .env.local'e ekleyin
# Geliştirme sunucusunu başlatın
npm run dev
```

http://localhost:3000 adresini açın

### Subdomain Testi (Yerel)

Query parametreleri ile subdomain test edin:
- Ana sayfa: `http://localhost:3000`
- Panel: `http://localhost:3000?subdomain=panel`
- Admin: `http://localhost:3000?subdomain=admin`
- Menü: `http://localhost:3000?subdomain=test-restaurant`

## 🌐 Subdomain Yapısı

- **Ana Domain** (`qrmenu.app`) - Landing sayfası
- **Panel** (`panel.qrmenu.app`) - Restoran yönetim paneli
- **Admin** (`admin.qrmenu.app`) - Süper admin paneli
- **Restoran** (`[slug].qrmenu.app`) - Dijital menü görüntüleme

## 🚢 Canlıya Alma

### Hızlı Canlıya Alma (5 Adım)

[HIZLI-BASLANGIC.md](HIZLI-BASLANGIC.md) dosyasına bakın.

### Detaylı Türkçe Rehber

[CANLI-ALMA-REHBERI.md](CANLI-ALMA-REHBERI.md) dosyasında adım adım anlatım.

### İngilizce Dokümantasyon

- [DEPLOYMENT.md](DEPLOYMENT.md) - Kapsamlı deployment rehberi
- [QUICK-START.md](QUICK-START.md) - Hızlı başlangıç
- [PRODUCTION-CHECKLIST.md](PRODUCTION-CHECKLIST.md) - Canlıya alma kontrol listesi

## 🧪 Test

### Otomatik Testler

```bash
# Subdomain routing testi (Windows)
.\scripts\test-subdomains.ps1 -Domain "qrmenu.app"

# Subdomain routing testi (Linux/Mac)
./scripts/test-subdomains.sh qrmenu.app
```

### Manuel Test

[TESTING-GUIDE.md](TESTING-GUIDE.md) dosyasında kapsamlı test prosedürleri.

## 📚 Dokümantasyon

### Türkçe
- [HIZLI-BASLANGIC.md](HIZLI-BASLANGIC.md) - 5 adımda canlıya alma
- [CANLI-ALMA-REHBERI.md](CANLI-ALMA-REHBERI.md) - Detaylı Türkçe rehber

### İngilizce
- [README.md](README.md) - Proje genel bakış
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment rehberi
- [PRODUCTION-CHECKLIST.md](PRODUCTION-CHECKLIST.md) - Canlıya alma kontrol listesi
- [TESTING-GUIDE.md](TESTING-GUIDE.md) - Test prosedürleri
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Sorun giderme
- [DOCUMENTATION-INDEX.md](DOCUMENTATION-INDEX.md) - Tüm dokümantasyon indeksi

### Teknik Dokümantasyon
- [scripts/vercel-setup.md](scripts/vercel-setup.md) - Vercel yapılandırma
- [scripts/supabase-setup.md](scripts/supabase-setup.md) - Supabase kurulum
- [supabase/README.md](supabase/README.md) - Veritabanı migration'ları

## 📁 Proje Yapısı

```
qr-menu-saas/
├── app/                    # Next.js app dizini
│   ├── (landing)/         # Landing site route'ları
│   ├── (panel)/           # Restoran panel route'ları
│   ├── (admin)/           # Admin panel route'ları
│   ├── (menu)/            # Dijital menü route'ları
│   └── api/               # API route'ları
├── components/            # React bileşenleri
│   ├── auth/             # Kimlik doğrulama bileşenleri
│   ├── panel/            # Panel bileşenleri
│   ├── admin/            # Admin bileşenleri
│   ├── menu/             # Menü bileşenleri
│   └── ui/               # UI bileşenleri (shadcn)
├── lib/                   # Yardımcı fonksiyonlar
├── types/                 # TypeScript tipleri
├── supabase/             # Veritabanı migration'ları
│   └── migrations/       # SQL migration dosyaları
├── scripts/              # Deployment scriptleri
└── public/               # Statik dosyalar
```

## 🔒 Güvenlik

- Tüm veritabanı tablolarında Row Level Security (RLS)
- JWT tabanlı kimlik doğrulama
- Tip/boyut validasyonu ile güvenli dosya yükleme
- Production'da HTTPS zorunluluğu
- Hassas veriler için environment variables

## 🛠️ Geliştirme

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Type Check

```bash
npx tsc --noEmit
```

## 🆘 Yardım

### Sorun mu Yaşıyorsunuz?

1. [TROUBLESHOOTING.md](TROUBLESHOOTING.md) dosyasını kontrol edin
2. İlgili kurulum rehberini inceleyin
3. Platform durum sayfalarını kontrol edin
4. Gerekirse destek ile iletişime geçin

### Destek Kaynakları

- **Vercel**: https://vercel.com/support
- **Supabase**: https://supabase.com/support
- **Next.js**: https://nextjs.org/docs

## 📞 İletişim

- Dokümantasyon: Docs klasörüne bakın
- Issues: [GitHub Issues]
- Email: [Destek email]

## 🙏 Teşekkürler

- Next.js ekibi
- Supabase ekibi
- shadcn/ui
- Vercel

---

**Not:** Bu proje Türkiye'deki restoranlar için geliştirilmiştir ve Türkçe dil desteği içerir.
