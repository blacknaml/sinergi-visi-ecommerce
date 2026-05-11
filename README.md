# SinergiVisi Ecommerce

Platform e-commerce premium untuk penjualan produk pecah belah, dilengkapi dengan sistem manajemen pesanan, multi-gambar produk, dan integrasi MCP API untuk AI Customer Support.

## 🧱 Tech Stack

| Layer | Teknologi |
|---|---|
| Backend | Laravel 11 (PHP) |
| Frontend | React 19 + Inertia.js |
| Styling | Tailwind CSS (Glassmorphism design) |
| Database | SQLite / MySQL |
| Auth | Laravel Breeze + Session-based |
| File Storage | Laravel Local Storage (`storage/app/public`) |
| API | Laravel REST API (MCP endpoints) |

## ✨ Fitur Utama

### 🛍️ Pembeli (Buyer)
- **Katalog Produk** — Tampilan kartu produk dengan gambar utama, harga, dan kategori.
- **Detail Produk** — Galeri multi-gambar dengan thumbnail yang bisa diklik, deskripsi, dan tombol "Tambah ke Keranjang".
- **Keranjang Belanja** — Manajemen item sebelum checkout, dapat diakses dari Navbar.
- **Checkout** — Pilih alamat pengiriman dan metode pembayaran.
- **Riwayat Pesanan** — Daftar seluruh pesanan beserta status terkini.
- **Detail Pesanan** — Rincian produk, total, alamat, dan **Timeline Riwayat Status** (Pending → Shipped → Done).

### 🔧 Admin / Seller
- **Dashboard Admin** — Statistik toko (pengguna, produk, pesanan, klaim) + daftar pesanan terbaru.
- **Manajemen Produk** — CRUD produk dengan dukungan **upload multi-gambar** dan pemilihan gambar utama.
- **Manajemen Pengguna** — Daftar akun buyer terdaftar.
- **Detail Pesanan Admin** — Lihat rincian pesanan milik pembeli mana pun + **ubah status** secara langsung via dropdown.
- **Laporan & Transaksi** — Ringkasan semua transaksi dan klaim refund.
- **Riwayat Status Pesanan** — Setiap perubahan status tercatat otomatis dengan waktu dan catatan.

### 🔌 MCP API (untuk AI Customer Support)
Endpoint publik untuk dikonsumsi oleh sistem AI eksternal (`sinergi-visi-ai`):

| Endpoint | Deskripsi |
|---|---|
| `GET /api/mcp/products` | Daftar semua produk beserta gambar dan kategori |
| `GET /api/mcp/orders` | Daftar semua pesanan beserta item, pembeli, dan riwayat |
| `GET /api/mcp/orders/{orderNumber}` | Detail pesanan spesifik berdasarkan nomor order (format: `ORD-XXXX`) |

**URL Storage Gambar:** `http://127.0.0.1:8001/storage/{image_path}`

## 🚀 Cara Menjalankan

### Prasyarat
- PHP >= 8.2
- Composer
- Node.js >= 18 + npm/pnpm
- SQLite atau MySQL

### Instalasi

```bash
# 1. Clone & masuk ke direktori
cd sinergi-visi-ecommerce

# 2. Install dependensi PHP
composer install

# 3. Salin file konfigurasi
cp .env.example .env

# 4. Generate app key
php artisan key:generate

# 5. Setup database (SQLite)
touch database/database.sqlite
php artisan migrate --seed

# 6. Buat symlink storage (agar gambar bisa diakses publik)
php artisan storage:link

# 7. Install dependensi JavaScript
npm install
```

### Menjalankan Server

```bash
# Terminal 1 — Laravel Backend
php artisan serve --port=8001

# Terminal 2 — Vite Dev Server (React/Inertia)
npm run dev
```

Akses aplikasi di: **http://127.0.0.1:8001**

## 👤 Akun Default (Setelah Seeding)

| Role | Email | Password |
|---|---|---|
| Seller/Admin | admin@sinergivisi.com | password |
| Buyer | buyer@sinergivisi.com | password |

> Sesuaikan dengan konfigurasi seeder yang digunakan di `database/seeders/`.

## 📁 Struktur Direktori Penting

```
app/
├── Http/Controllers/
│   ├── AdminController.php      # Manajemen admin (produk, user, pesanan)
│   ├── CartController.php       # Keranjang belanja
│   ├── CheckoutController.php   # Proses checkout & pembuatan pesanan
│   ├── OrderController.php      # Pesanan pembeli + pembatalan
│   ├── DashboardController.php  # Dashboard buyer & seller
│   └── Api/McpController.php   # MCP API endpoints
├── Models/
│   ├── Product.php              # Produk + relasi images + accessor main_image
│   ├── Order.php                # Pesanan + relasi histories
│   └── OrderHistory.php        # Log riwayat status pesanan

resources/js/
├── Pages/
│   ├── Auth/                   # Login & Register (Glassmorphism design)
│   ├── Dashboard.jsx            # Dashboard pembeli
│   ├── Products/               # Katalog & detail produk
│   ├── Cart/                   # Keranjang belanja
│   ├── Orders/                 # Daftar & detail pesanan pembeli
│   └── Admin/                  # Halaman-halaman panel admin
├── Layouts/
│   ├── AuthenticatedLayout.jsx  # Layout utama buyer (navbar + cart icon)
│   ├── GuestLayout.jsx          # Layout halaman login/register
│   └── AdminLayout.jsx          # Layout panel admin
└── Components/
    ├── Navbar.jsx               # Navigasi publik
    └── ProductCard.jsx          # Kartu produk di katalog

database/migrations/
├── ...orders_table.php
├── ...order_items_table.php
├── ...product_images_table.php  # Multi-gambar produk
└── ...order_histories_table.php # Riwayat status pesanan
```

## 🗂️ Database Schema (Tabel Utama)

- **users** — Akun pembeli & penjual (`role`: buyer / seller)
- **products** — Data produk (nama, harga, stok, kategori)
- **product_images** — Galeri gambar produk (relasi ke products, flag `is_main`)
- **orders** — Data pesanan (`status`: pending / shipped / done / cancelled)
- **order_items** — Item-item dalam pesanan
- **order_histories** — Log riwayat perubahan status pesanan
- **addresses** — Alamat pengiriman milik pembeli
- **cart_items** — Item keranjang belanja
- **claims** — Klaim kerusakan barang

## 🔗 Integrasi dengan SinergiVisi AI

Proyek ini terhubung dengan sistem AI di `sinergi-visi-ai` yang berjalan di port berbeda. Sistem AI mengonsumsi MCP API di atas untuk:
- Memvalidasi nomor pesanan saat pelanggan mengajukan komplain.
- Mengambil foto produk asli dari `/storage/` untuk dianalisis via Gemini Vision API.
- Mencatat dan mengelola klaim kerusakan barang.

## 📄 Lisensi

Proyek ini dikembangkan untuk kebutuhan internal SinergiVisi.
