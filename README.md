# DRN Moda Tekstil Web Sitesi

DRN Moda Tekstil için modernvekullanıcı dostu kurumsal web sitesi. Video banner ve interaktif komponentler içeren, responsive tasarımlı bir web uygulaması.

## Referans Siteler

1. [Aster Textile](https://www.astertextile.com/tr) - Kurumsal yapı ve içerik organizasyonu
2. [Yurteks Tekstil](http://www.yurtekstekstil.com.tr/) - Video banner/hero bölümü

## Kullanılan Teknolojiler

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
- React Icons

## Özellikler

- Modern, responsive tasarım
- Video banner hero bölümü
- Kategori showcase
- Animasyonlu bileşenler
- Çoklu dil desteği (TR/EN)
- SEO optimizasyonu

## Çalıştırma

Geliştirme modunda projeyi çalıştırmak için:

```bash
npm run dev
# veya
yarn dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine giderek sonucu görebilirsiniz.

## Yapı

Proje aşağıdaki ana bölümleri içermektedir:

- **Header**: Navigasyon ve dil seçimi
- **Video Banner**: Ana sayfa üst bölümü
- **Hakkımızda**: Şirket bilgisi
- **Kategori Showcase**: Ürün kategorileri
- **İstatistikler**: Sayılarla firma
- **Footer**: İletişim bilgileri ve hızlı linkler

## Proje Klasör Yapısı

```
drn-moda-site/
│
├── public/              # Statik dosyalar (görseller, videolar)
├── src/
│   ├── app/             # Sayfa bileşenleri
│   │   ├── page.tsx     # Ana Sayfa
│   │   ├── hakkimizda/  # Hakkımızda sayfası
│   │   ├── ...          # Diğer sayfalar
│   │
│   ├── components/      # Yeniden kullanılabilir bileşenler
│   │   ├── layout/      # Layout bileşenleri (Header, Footer)
│   │   ├── home/        # Ana sayfa bileşenleri
│   │   └── ui/          # UI bileşenleri
│   │
│   └── styles/          # Stil dosyaları
│
├── next.config.js       # Next.js yapılandırması
├── tailwind.config.js   # Tailwind CSS yapılandırması
└── tsconfig.json        # TypeScript yapılandırması
```

## Kullanılması Gereken Görseller ve Videolar

Sitenin tam olarak çalışması için aşağıdaki dosyaların ilgili konumlarda olması gerekir:

- `public/videos/textile-production.mp4` - Ana banner videosu
- `public/images/textile-production-mobile.jpg` - Mobil cihazlarda banner görseli
- `public/images/about-textile-factory.jpg` - Hakkımızda bölümü görseli
- `public/images/categories/fitness.jpg` - Fitness kategori görseli
- `public/images/categories/basic.jpg` - Basic kategori görseli
- `public/images/categories/teams.jpg` - Takım Sporları kategori görseli
- `public/images/categories/casual.jpg` - Günlük Giyim kategori görseli

## Demo

Sistemi çalıştırmak için önce gerekli paketleri yükleyin:

```bash
npm install
# veya
yarn install
```

Ardından geliştirme sunucusunu başlatın:

```bash
npm run dev
# veya
yarn dev
```

## Lisans

Bu proje özel kullanım içindir. 