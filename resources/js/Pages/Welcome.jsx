import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import ProductCard from '@/Components/ProductCard';

export default function Welcome({ auth, products, categories, cs_endpoint }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <Head title="Welcome" />
            
            <Navbar auth={auth} />

            {/* Hero Section */}
            <div className="relative overflow-hidden pt-16 pb-20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-20 pointer-events-none">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full blur-3xl animate-pulse delay-700"></div>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center">
                        <h1 className="text-5xl font-black tracking-tight text-gray-900 sm:text-7xl dark:text-white">
                            Sinergi Visi <br />
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Pecah Belah Dapur</span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
                            Temukan koleksi perlengkapan dapur berkualitas tinggi dari Kitchenware hingga Ceramicware. 
                            Desain elegan untuk melengkapi estetika rumah Anda.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                href={route('products.index')}
                                className="rounded-2xl bg-blue-600 px-8 py-4 text-lg font-black text-white transition-all hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-500/30"
                            >
                                Lihat Produk
                            </Link>
                            {!auth.user && (
                                <Link
                                    href={route('register')}
                                    className="text-lg font-bold leading-6 text-gray-900 dark:text-white"
                                >
                                    Gabung Sekarang <span aria-hidden="true">→</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust Bar Section */}
            <div className="bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        {[
                            {
                                title: 'Pengiriman Cepat',
                                desc: 'Kurir terpercaya untuk Anda.',
                                icon: (
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Pembayaran Aman',
                                desc: 'Transaksi terenkripsi & aman.',
                                icon: (
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Dukungan 24/7',
                                desc: 'Kami siap membantu Anda.',
                                icon: (
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Produk Original',
                                desc: 'Kualitas 100% terjamin asli.',
                                icon: (
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                ),
                            },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center">
                                <div className="mb-4 rounded-2xl bg-blue-50 p-3 dark:bg-blue-900/20">{item.icon}</div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured Categories */}
            <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white sm:text-4xl">Kategori Pilihan</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Jelajahi berbagai koleksi terbaik kami untuk kebutuhan Anda.</p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { name: 'Peralatan Dapur', image: '/images/landing/cat-kitchenware.png', count: '120+ Produk' },
                        { name: 'Keramik', image: '/images/landing/cat-ceramicware.png', count: '80+ Produk' },
                        { name: 'Peralatan Kaca', image: '/images/landing/cat-glassware.png', count: '60+ Produk' },
                        { name: 'Alat Makan', image: '/images/landing/cat-cutlery.png', count: '150+ Produk' },
                    ].map((cat, i) => (
                        <div key={i} className="group relative overflow-hidden rounded-3xl bg-white shadow-lg transition-all hover:-translate-y-2 dark:bg-gray-900">
                            <div className="aspect-h-1 aspect-w-1 h-64 overflow-hidden">
                                <img src={cat.image} alt={cat.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                            <div className="absolute bottom-0 p-6">
                                <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                                <p className="text-sm text-gray-300">{cat.count}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Featured Products */}
            <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950 rounded-[3rem]">
                <div className="mb-12 flex items-end justify-between px-4">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white">Produk Unggulan</h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">Pilihan terbaik untuk melengkapi dapur Anda.</p>
                    </div>
                    <Link
                        href={route('products.index')}
                        className="text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full"
                    >
                        Lihat Semua →
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 px-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>

            {/* How It Works Section */}
            <div className="relative overflow-hidden py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:items-center lg:gap-x-16">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                Bagaimana Cara Berbelanja di <span className="text-blue-600">Sinergi Visi?</span>
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                                Proses belanja yang mudah dan transparan untuk memastikan Anda mendapatkan produk terbaik dengan pengalaman terbaik.
                            </p>
                            <div className="mt-10 space-y-8">
                                {[
                                    { title: 'Pilih Produk', desc: 'Telusuri katalog lengkap kami dan temukan produk favorit Anda.' },
                                    { title: 'Masukkan Keranjang', desc: 'Pilih variasi produk dan masukkan ke dalam keranjang belanja.' },
                                    { title: 'Pembayaran Aman', desc: 'Selesaikan transaksi dengan berbagai metode pembayaran yang tersedia.' },
                                    { title: 'Terima Barang', desc: 'Duduk santai, pesanan Anda akan segera sampai di depan pintu.' },
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-x-6">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-black">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{step.title}</h3>
                                            <p className="mt-1 text-gray-600 dark:text-gray-400">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src="/images/landing/how-it-works.png"
                                alt="Shopping Experience"
                                className="w-full rounded-3xl shadow-2xl ring-1 ring-gray-900/10 dark:ring-white/10"
                            />
                            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-3xl bg-blue-600/10 blur-3xl" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl">Apa Kata Pelanggan Kami?</h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Kepuasan Anda adalah prioritas utama kami.</p>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {[
                            { name: 'Andi P.', role: 'Home Chef', text: 'Kualitas barang sangat memuaskan, desainnya sangat elegan dan modern.', stars: 5 },
                            { name: 'Siska W.', role: 'Ibu Rumah Tangga', text: 'Packing sangat aman untuk barang pecah belah. Pengiriman juga tepat waktu!', stars: 5 },
                            { name: 'Rudi H.', role: 'Interior Designer', text: 'Dapur saya jadi terlihat lebih mewah dengan produk dari Sinergi Visi. Sangat estetik.', stars: 5 },
                        ].map((rev, i) => (
                            <div key={i} className="flex flex-col justify-between rounded-3xl bg-gray-50 p-8 dark:bg-gray-800 transition-all hover:shadow-xl">
                                <div>
                                    <div className="flex gap-x-1 text-yellow-400 mb-4">
                                        {[...Array(rev.stars)].map((_, i) => (
                                            <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                        ))}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 italic">"{rev.text}"</p>
                                </div>
                                <div className="mt-8 flex items-center gap-x-4">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center font-bold text-blue-600">{rev.name[0]}</div>
                                    <div>
                                        <div className="font-bold text-gray-900 dark:text-white">{rev.name}</div>
                                        <div className="text-sm text-gray-500">{rev.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Customer Service Section */}
            <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                <div className="relative isolate overflow-hidden bg-white dark:bg-gray-900 px-6 py-16 shadow-2xl rounded-3xl sm:px-16 md:py-24 lg:flex lg:items-center lg:gap-x-20 lg:px-24">
                    <div className="absolute top-0 left-0 -z-10 h-full w-full opacity-10">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl"></div>
                    </div>
                    
                    <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:text-left">
                        <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Butuh Bantuan? <br />
                            <span className="text-blue-600">Customer Service Kami Siap Membantu</span>
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                            Kami di sini untuk menjawab pertanyaan Anda tentang produk, pesanan, atau pengiriman. 
                            Dapatkan bantuan langsung dari tim profesional kami.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                            <a
                                href={cs_endpoint}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-2xl bg-blue-600 px-8 py-4 text-lg font-black text-white transition-all hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-500/30"
                            >
                                Chat Customer Service <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                    <div className="relative mt-16 h-80 lg:mt-0 lg:h-auto lg:flex-1">
                        <img
                            src="/images/customer-service.png"
                            alt="Customer Service Team"
                            className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl ring-1 ring-gray-400/10 dark:ring-white/10 object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <div>
                            <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
                                SINERGI<span className="text-blue-600">VISI</span>
                            </span>
                            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                Penyedia perlengkapan pecah belah dapur terbaik di Indonesia.
                                Kualitas terjamin, harga bersaing.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8 lg:col-span-2">
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">Navigasi</h3>
                                <ul className="mt-4 space-y-2">
                                    <li><Link href={route('home')} className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400">Home</Link></li>
                                    <li><Link href={route('products.index')} className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400">Produk</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">Kontak</h3>
                                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <li>Email: info@sinergivisi.com</li>
                                    <li>Telp: +62 812 3456 7890</li>
                                    <li>Alamat: Surabaya, Jawa Timur</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 border-t border-gray-100 pt-8 dark:border-gray-800">
                        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                            &copy; 2026 Sinergi Visi Ecommerce. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
