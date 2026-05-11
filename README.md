# SinergiVisi Ecommerce

Platform e-commerce untuk penjualan produk pecah belah, dilengkapi dengan sistem manajemen pesanan, multi-gambar produk, dan integrasi MCP API untuk AI Customer Support.

Premium e-commerce platform for glassware sales, featuring an order management system, product multi-image support, and MCP API integration for AI Customer Support.

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

---

# English Version

Premium e-commerce platform for glassware sales, featuring an order management system, product multi-image support, and MCP API integration for AI Customer Support.

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 11 (PHP) |
| Frontend | React 19 + Inertia.js |
| Styling | Tailwind CSS (Glassmorphism design) |
| Database | SQLite / MySQL |
| Auth | Laravel Breeze + Session-based |
| File Storage | Laravel Local Storage (`storage/app/public`) |
| API | Laravel REST API (MCP endpoints) |

## ✨ Main Features

### 🛍️ Buyer
- **Product Catalog** — Card view of products with main image, price, and category.
- **Product Detail** — Multi-image gallery with clickable thumbnails, description, and "Add to Cart" button.
- **Shopping Cart** — Item management before checkout, accessible from the Navbar.
- **Checkout** — Select shipping address and payment method.
- **Order History** — List of all orders with current status.
- **Order Detail** — Product details, total, address, and **Status History Timeline** (Pending → Shipped → Done).

### 🔧 Admin / Seller
- **Admin Dashboard** — Store statistics (users, products, orders, claims) + latest orders list.
- **Product Management** — Product CRUD with **multi-image upload** support and main image selection.
- **User Management** — List of registered buyer accounts.
- **Admin Order Detail** — View details of any buyer's order + **update status** directly via dropdown.
- **Reports & Transactions** — Summary of all transactions and refund claims.
- **Order Status History** — Every status change is automatically recorded with time and notes.

### 🔌 MCP API (for AI Customer Support)
Public endpoints consumed by external AI systems (`sinergi-visi-ai`):

| Endpoint | Description |
|---|---|
| `GET /api/mcp/products` | List all products with images and categories |
| `GET /api/mcp/orders` | List all orders with items, buyers, and history |
| `GET /api/mcp/orders/{orderNumber}` | Specific order detail by order number (format: `ORD-XXXX`) |

**Image Storage URL:** `http://127.0.0.1:8001/storage/{image_path}`

## 🚀 How to Run

### Prerequisites
- PHP >= 8.2
- Composer
- Node.js >= 18 + npm/pnpm
- SQLite or MySQL

### Installation

```bash
# 1. Clone & enter directory
cd sinergi-visi-ecommerce

# 2. Install PHP dependencies
composer install

# 3. Copy configuration file
cp .env.example .env

# 4. Generate app key
php artisan key:generate

# 5. Setup database (SQLite)
touch database/database.sqlite
php artisan migrate --seed

# 6. Create storage symlink
php artisan storage:link

# 7. Install JavaScript dependencies
npm install
```

### Running the Server

```bash
# Terminal 1 — Laravel Backend
php artisan serve --port=8001

# Terminal 2 — Vite Dev Server (React/Inertia)
npm run dev
```

Access the application at: **http://127.0.0.1:8001**

## 👤 Default Accounts

| Role | Email | Password |
|---|---|---|
| Seller/Admin | admin@sinergivisi.com | password |
| Buyer | buyer@sinergivisi.com | password |

## 📁 Key Directory Structure

```
app/
├── Http/Controllers/
│   ├── AdminController.php      # Admin management (products, users, orders)
│   ├── CartController.php       # Shopping cart
│   ├── CheckoutController.php   # Checkout process & order creation
│   ├── OrderController.php      # Buyer orders + cancellation
│   ├── DashboardController.php  # Buyer & seller dashboards
│   └── Api/McpController.php   # MCP API endpoints
├── Models/
│   ├── Product.php              # Product + images relation + main_image accessor
│   ├── Order.php                # Order + histories relation
│   └── OrderHistory.php        # Order status history log

resources/js/
├── Pages/
│   ├── Auth/                   # Login & Register (Glassmorphism design)
│   ├── Dashboard.jsx            # Buyer dashboard
│   ├── Products/               # Product catalog & details
│   ├── Cart/                   # Shopping cart
│   ├── Orders/                 # Buyer order list & details
│   └── Admin/                  # Admin panel pages
├── Layouts/
│   ├── AuthenticatedLayout.jsx  # Main buyer layout
│   ├── GuestLayout.jsx          # Guest layout
│   └── AdminLayout.jsx          # Admin panel layout
└── Components/
    ├── Navbar.jsx               # Navigation
    └── ProductCard.jsx          # Product card
```

## 🗂️ Database Schema

- **users** — Buyer & seller accounts
- **products** — Product data
- **product_images** — Product images
- **orders** — Order data
- **order_items** — Order items
- **order_histories** — Order status history
- **addresses** — Shipping addresses
- **cart_items** — Shopping cart items
- **claims** — Item damage claims

## 🔗 Integration with SinergiVisi AI

This project is connected to the AI system in `sinergi-visi-ai`. The AI system consumes the MCP API to:
- Validate order numbers.
- Fetch original product photos for analysis.
- Manage item damage claims.

## 📄 License

Developed for SinergiVisi internal needs.
