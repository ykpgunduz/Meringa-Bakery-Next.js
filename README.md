# Meringa QR Menü — Next.js Sürümü

Laravel (Blade + jQuery/vanilla JS) ile yazılmış **Meringa-QR-Menu** projesinin
Next.js 16 (App Router, React 19, TypeScript) karşılığıdır. Tüm sayfalar, tasarım,
metinler ve davranışlar birebir korunmuş; veri katmanı ve render stratejisi
performans için yeniden kurgulanmıştır.

## Kurulum

```bash
npm install
cp .env.example .env.local   # yönetim paneli bilgilerini düzenleyin
npm run dev
```

Üretim:

```bash
npm run build
npm start
```

Docker:

```bash
docker compose up --build   # http://localhost:8022
```

## Sayfa eşlemesi (Laravel → Next.js)

| Laravel rotası | Next.js dosyası | Render |
| --- | --- | --- |
| `/` → `welcome` | [src/app/page.tsx](src/app/page.tsx) | yönlendirme |
| `/qr-menu` (`welcome.blade.php`) | [src/app/qr-menu/page.tsx](src/app/qr-menu/page.tsx) | statik |
| `/categories` (`category.blade.php`) | [src/app/categories/page.tsx](src/app/categories/page.tsx) | statik |
| `/category/{key}` (`category_products.blade.php`) | [src/app/category/[key]/page.tsx](src/app/category/%5Bkey%5D/page.tsx) | statik (SSG, kategori başına) |
| `/admin/login` | [src/app/admin/login/page.tsx](src/app/admin/login/page.tsx) | dinamik |
| `/admin` (dashboard) | [src/app/admin/(panel)/page.tsx](src/app/admin/(panel)/page.tsx) | dinamik |
| `/admin/products` | [src/app/admin/(panel)/products/page.tsx](src/app/admin/(panel)/products/page.tsx) | dinamik |
| `/admin/products/create` | [.../products/create/page.tsx](src/app/admin/(panel)/products/create/page.tsx) | dinamik |
| `/admin/products/{category}/{id}/edit` | [.../products/[category]/[id]/edit/page.tsx](<src/app/admin/(panel)/products/[category]/[id]/edit/page.tsx>) | dinamik |
| `/admin/categories` | [.../categories/page.tsx](src/app/admin/(panel)/categories/page.tsx) | dinamik |
| `/admin/categories/create` | [.../categories/create/page.tsx](src/app/admin/(panel)/categories/create/page.tsx) | dinamik |
| `/admin/categories/{key}/edit` | [.../categories/[key]/edit/page.tsx](<src/app/admin/(panel)/categories/[key]/edit/page.tsx>) | dinamik |

Laravel'de POST/PUT/DELETE ile yapılan tüm işlemler (ürün/kategori ekleme,
güncelleme, silme, aktiflik değiştirme, sürükle-bırak sıralama) **Server Action**
olarak [src/app/admin/actions.ts](src/app/admin/actions.ts) içinde toplanmıştır.

## Katmanlar

| Laravel | Next.js |
| --- | --- |
| `AdminController` JSON okuma/yazma | [src/lib/products.ts](src/lib/products.ts) |
| `AuthController` + statik kullanıcı | [src/lib/auth.ts](src/lib/auth.ts), [src/lib/session.ts](src/lib/session.ts) |
| `AdminAuth` middleware | [src/proxy.ts](src/proxy.ts) (Next 16 proxy dosyası) |
| `unique_category_key` doğrulaması | `storeCategoryAction` içinde |
| Resim yükleme (`$image->move(...)`) | [src/lib/uploads.ts](src/lib/uploads.ts) |
| `session('success')` flash mesajları | `flash` çerezi + [src/components/AdminPage.tsx](src/components/AdminPage.tsx) |
| Blade `<style>` blokları | [src/styles/](src/styles) (birebir CSS, sayfa sınıfına kapsanmış) |

Veri kaynağı Laravel'deki ile aynı JSON dosyasıdır; sadece yeri değişti:
`public/js/products.json` → **`data/products.json`**. Böylece menü verisi dışarıdan
doğrudan indirilemez, sayfalara sunucuda gömülür.

## Performans için yapılanlar

- **Kategori ve ürün sayfaları derleme anında statik HTML'e dönüşür.** Laravel
  sürümünde tarayıcı önce boş sayfayı, sonra `products.json`'u indirip DOM'u JS ile
  kuruyordu; burada içerik ilk HTML'de hazır gelir (`x-nextjs-cache: HIT`).
- Yönetim panelinden yapılan her değişiklik `revalidatePath` ile ilgili statik
  sayfaları anında yeniler — hem statik hız hem anlık güncellik.
- Görsellerin varlığı **sunucuda** kontrol edilir; Laravel'deki `new Image()` /
  `onerror` ile yapılan ikinci istek ortadan kalkar.
- Yazı tipleri (Montserrat, Inter) `next/font` ile kendi sunucumuzdan servis edilir;
  Google Fonts'a giden istek ve render engelleme yoktur.
- Bootstrap ve Font Awesome CDN yerine paketten gelir ve yalnızca yönetim panelinde
  yüklenir; genel menü sayfaları bu CSS'leri hiç indirmez.
- **Bootstrap JS bundle'ı hiç yüklenmez.** Uyarı kapatma, toast ve mobil menü React
  ile yeniden yazıldı (görünüm aynı, ~80 KB daha az JS).
- Ürün listesinde `console.log` üreten hata ayıklama kodu kaldırıldı; sıralamada
  Laravel sürümündeki `location.reload()` yerine anlık state güncellemesi kullanılır.
- Görsellere uzun süreli cache başlığı eklendi ([next.config.ts](next.config.ts)).

## Kalori bilgisi

Laravel sürümünde bulunmayan, sonradan eklenen alandır.

- Yönetim panelinde **Yeni Ürün Ekle** ve **Ürün Düzenle** formlarında "Kalori (kcal)"
  alanı vardır. **İsteğe bağlıdır**: boş bırakılan üründe `calories` alanı JSON'a hiç
  yazılmaz ve menüde kalori satırı görünmez.
- Yönetim panelindeki ürün tablosunda "Kalori" sütunu, mobil kartlarda ise fiyatın
  yanında rozet olarak gösterilir; değeri olmayan üründe "—" görünür.
- Müşteri menüsünde üç yerde görünür: ürün listesinde açıklamanın altındaki rozet,
  ürün detay modalında fiyatın yanındaki "Kalori / Calories" kutusu ve arama
  sonuçlarında fiyatın yanındaki küçük rozet. Etiketler dil seçimine göre değişir.
- Doğrulama: sayı olmalı ve 0'dan küçük olamaz (`calories alanı en az 0 olmalıdır.`).
- Menüdeki 101 ürünün tamamına, internetteki genel besin değerlerinden türetilmiş
  **tahmini** porsiyon kalorileri girilmiştir. Hangi değerin hangi porsiyon varsayımıyla
  girildiği ve kaynaklar [docs/kalori-referansi.md](docs/kalori-referansi.md) içindedir;
  yayına almadan önce kendi tarif ve gramajlarınızla doğrulayın.

## Alerjen bilgisi

Laravel sürümünde bulunmayan, sonradan eklenen alandır. Alerjen listesi tek bir yerde,
[src/lib/allergens.ts](src/lib/allergens.ts) içinde tanımlıdır (13 alerjen, üç grup:
temel gıdalar / yemek ve sos odaklı / gizli ve yardımcı).

- Yönetim panelindeki ürün formlarında, her alerjen için açıklamasıyla birlikte bir
  seçim kutusu vardır; kaç tanesinin seçildiği üstte görünür ve "Seçimi temizle" ile
  tamamı kaldırılabilir.
- Seçim `data/products.json` içine `allergens: ["gluten", "sut", ...]` olarak yazılır.
  Hiçbiri seçilmezse alan ürüne hiç eklenmez.
- Ürün listesinde ürün adının altında küçük etiketler halinde görünür.
- Her alerjenin kendi ikonu vardır: [src/components/AllergenIcon.tsx](src/components/AllergenIcon.tsx)
  içinde elle çizilmiş satır içi SVG'lerdir (menüde dış ikon kütüphanesi yüklenmez).
- Müşteri menüsünde ürün satırı üç satırdır: 1) ürün adı, 2) açıklama — ikisinin
  hizasında en sağda fiyat, 3) solda kalori rozeti, sağa yaslı alerjen ikonları.
  İkonun üzerine gelince (veya uzun basınca) alerjen adı görünür.
- Ürün detayında "Alerjenler / Allergens" bölümünde ikon + ad etiketleri gösterilir.
  Adlar dile göre değişir.
- Arama sonuçları da aynı satır düzenini kullanır; arama açıldığında imleç doğrudan
  arama kutusuna gider.
- Menüdeki 101 ürünün tamamı, **klasik tariflerine göre** işaretlenmiştir (78 üründe
  alerjen var, 23 sade içecekte yok). Hangi ürüne neden hangi alerjenin işaretlendiği
  [docs/alerjen-referansi.md](docs/alerjen-referansi.md) içindedir; hazır ürün etiketleri
  ve çapraz bulaşı durumu bilinmeden kesinleşmez, mutfakla teyit edilmelidir.
- **Alerjen seçilmemiş ürünlerde menüde hiçbir şey gösterilmez.** Bu bilinçlidir:
  boş bir alerjen bölümü, ürünün alerjensiz olduğu izlenimi vermemelidir.

## Bilinçli farklar

- **Instagram ikonu**: Menü sayfasında yalnızca bu ikon için Font Awesome yüklemek
  yerine aynı görünümde satır içi SVG kullanıldı.
- **Sıralamayı sıfırlama**: Laravel'de üçüncü tıklamada sayfa yenileniyordu; burada
  liste anında ilk sırasına döner.
- **Ürün arama kutusunun yeri**: Laravel'de ürün listesinin üstünde ayrı bir kart
  içindeydi; burada sayfa başlığının içine, "Ürünler" başlığı ile "Ürün Ekle"
  düğmesinin arasına taşındı (dar ekranlarda başlığın altına iner). Arama metni
  `ProductSearchContext` ile ürün listesiyle paylaşılır.
- **Kategori listesi mobil kartı**: Laravel'de masaüstü satırı `image` alanını,
  mobil kart ise sabit `{key}.jpg` yolunu kullanıyordu. İkisi de `image` alanını
  kullanacak şekilde birleştirildi.
- **Oturum**: Laravel session yerine HMAC ile imzalanmış `httpOnly` çerez kullanılır.
  Kullanıcı adı/şifre `.env` üzerinden verilir (varsayılanlar Laravel'deki ile aynı).

## Yönetim paneli girişi

Varsayılan bilgiler Laravel sürümüyle aynıdır (`admin` / `meringa123`) ve
`.env.local` içindeki `ADMIN_USERNAME`, `ADMIN_PASSWORD` ile değiştirilir.
Üretimde `SESSION_SECRET` değerini mutlaka değiştirin.

## Dizin yapısı

```
data/products.json          menü verisi (kategoriler + ürünler)
public/img/                 logo, arka plan, kategori ve ürün görselleri
src/app/                    sayfalar ve server action'lar
src/components/             paylaşılan arayüz parçaları
src/lib/                    veri, oturum, yükleme yardımcıları
src/styles/                 Blade şablonlarından birebir taşınan CSS
```
