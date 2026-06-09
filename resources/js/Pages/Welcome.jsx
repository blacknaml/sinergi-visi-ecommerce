import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import ProductCard from '@/Components/ProductCard';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Welcome({ auth, products, categories, cs_endpoint }) {
    return (
        <div className="min-h-screen bg-brand-ivory dark:bg-brand-charcoal">
            <Head title="Sinergi Visi — Fine Glassware & Ceramics" />

            <Navbar auth={auth} />

            {/* Hero Section */}
            <div className="relative overflow-hidden pt-20 pb-28">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-brand-gold/10 dark:bg-brand-gold/5 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/4"></div>
                    <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-brand-sand/30 dark:bg-brand-gold/5 rounded-full blur-3xl translate-x-1/4 translate-y-1/4"></div>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center">
                        <p className="text-xs font-semibold tracking-widest uppercase text-brand-gold mb-4">Fine Glassware & Ceramics</p>
                        <h1 className="font-serif text-4xl font-bold tracking-tight text-brand-charcoal sm:text-7xl dark:text-brand-ivory leading-tight">
                            Seni Meja Makan <br />
                            <span className="italic text-brand-gold">yang Sesungguhnya</span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-brand-stone dark:text-brand-ivory/60">
                            Temukan koleksi pecah belah premium — dari glassware kristal jernih hingga ceramicware kerajinan tangan. Setiap produk adalah karya seni untuk meja makan Anda.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                href={route('products.index')}
                                className="rounded-xl bg-brand-gold px-8 py-4 text-base font-bold text-white transition-all hover:bg-brand-gold-dark active:scale-[0.98] shadow-lg shadow-brand-gold/20"
                            >
                                Lihat Koleksi
                            </Link>
                            {!auth.user && (
                                <Link
                                    href={route('register')}
                                    className="text-base font-semibold leading-6 text-brand-charcoal/70 dark:text-brand-ivory/70 border-b border-brand-stone/30 hover:border-brand-gold hover:text-brand-gold transition-all"
                                >
                                    Bergabung Sekarang <span aria-hidden="true">→</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust Bar Section */}
            <div className="bg-white dark:bg-brand-charcoal/50 border-y border-brand-border dark:border-brand-charcoal/30">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        {[
                            {
                                title: 'Pengiriman Cepat',
                                desc: 'Dikemas dengan standar packing premium.',
                                icon: (
                                    <svg className="w-7 h-7 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Pembayaran Aman',
                                desc: 'Transaksi terenkripsi & terpercaya.',
                                icon: (
                                    <svg className="w-7 h-7 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Dukungan 24/7',
                                desc: 'Tim ahli kami siap melayani Anda.',
                                icon: (
                                    <svg className="w-7 h-7 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Kualitas Terjamin',
                                desc: 'Setiap produk dikurasi dengan ketat.',
                                icon: (
                                    <svg className="w-7 h-7 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                ),
                            },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center">
                                <div className="mb-4 rounded-2xl bg-brand-sand p-3 dark:bg-brand-charcoal/50">{item.icon}</div>
                                <h3 className="text-base font-bold text-brand-charcoal dark:text-brand-ivory">{item.title}</h3>
                                <p className="text-sm text-brand-stone dark:text-brand-ivory/50">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured Categories */}
            <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <p className="text-xs font-semibold tracking-widest uppercase text-brand-gold mb-3">Koleksi Kami</p>
                    <h2 className="font-serif text-3xl font-bold text-brand-charcoal dark:text-brand-ivory sm:text-4xl">Kategori Pilihan</h2>
                    <p className="mt-4 text-base text-brand-stone dark:text-brand-ivory/50">Jelajahi berbagai koleksi eksklusif kami untuk memperindah meja makan Anda.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { name: 'Peralatan Dapur', image: '/images/landing/cat-kitchenware.png', count: '120+ Produk' },
                        { name: 'Keramik', image: '/images/landing/cat-ceramicware.png', count: '80+ Produk' },
                        { name: 'Peralatan Kaca', image: '/images/landing/cat-glassware.png', count: '60+ Produk' },
                        { name: 'Alat Makan', image: '/images/landing/cat-cutlery.png', count: '150+ Produk' },
                    ].map((cat, i) => (
                        <div key={i} className="group relative overflow-hidden rounded-2xl bg-white border border-brand-border shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:shadow-brand-gold/10">
                            <div className="h-64 overflow-hidden">
                                <img src={cat.image} alt={cat.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/70 to-transparent" />
                            </div>
                            <div className="absolute bottom-0 p-5">
                                <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                                <p className="text-xs font-semibold tracking-wider uppercase text-brand-gold/80">{cat.count}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Featured Products */}
            <div className="bg-brand-sand dark:bg-brand-charcoal/30 py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 flex items-end justify-between">
                        <div>
                            <p className="text-xs font-semibold tracking-widest uppercase text-brand-gold mb-2">Pilihan Editor</p>
                            <h2 className="font-serif text-3xl font-bold text-brand-charcoal dark:text-brand-ivory">Produk Unggulan</h2>
                            <p className="mt-2 text-brand-stone dark:text-brand-ivory/50">Kurasi terbaik untuk melengkapi dapur Anda.</p>
                        </div>
                        <Link
                            href={route('products.index')}
                            className="text-sm font-bold text-brand-gold hover:text-brand-gold-dark border-b border-brand-gold/30 hover:border-brand-gold transition-all"
                        >
                            Lihat Semua →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:items-center lg:gap-x-20">
                        <div>
                            <p className="text-xs font-semibold tracking-widest uppercase text-brand-gold mb-4">Panduan Berbelanja</p>
                            <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-charcoal dark:text-brand-ivory sm:text-4xl">
                                Belanja di Sinergi Visi, <br />
                                <span className="italic text-brand-gold">semudah menikmati makan malam.</span>
                            </h2>
                            <p className="mt-6 text-base leading-8 text-brand-stone dark:text-brand-ivory/50">
                                Pengalaman berbelanja yang elegan dan mudah dari kurasi koleksi pilihan kami hingga produk tiba di tangan Anda.
                            </p>
                            <div className="mt-10 space-y-8">
                                {[
                                    { title: 'Pilih Produk', desc: 'Telusuri koleksi eksklusif kami dan temukan produk yang sempurna.' },
                                    { title: 'Masukkan Keranjang', desc: 'Pilih variasi dan jumlah yang Anda inginkan dengan mudah.' },
                                    { title: 'Pembayaran Aman', desc: 'Selesaikan transaksi dengan metode pembayaran pilihan Anda.' },
                                    { title: 'Terima Barang', desc: 'Pesanan dikemas premium dan diantarkan langsung ke pintu Anda.' },
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-x-6">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-brand-gold text-brand-gold font-bold text-sm">
                                            {String(i + 1).padStart(2, '0')}
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-brand-charcoal dark:text-brand-ivory">{step.title}</h3>
                                            <p className="mt-1 text-sm text-brand-stone dark:text-brand-ivory/50">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src="/images/landing/how-it-works.png"
                                alt="Shopping Experience"
                                className="w-full rounded-2xl shadow-xl shadow-brand-gold/10 ring-1 ring-brand-border"
                            />
                            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-3xl bg-brand-gold/10 blur-3xl" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="bg-white dark:bg-brand-charcoal/50 py-24 sm:py-32 border-y border-brand-border dark:border-brand-charcoal/30">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-xs font-semibold tracking-widest uppercase text-brand-gold mb-3">Ulasan Pelanggan</p>
                        <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-charcoal dark:text-brand-ivory sm:text-4xl">Apa Kata Mereka?</h2>
                        <p className="mt-4 text-base text-brand-stone dark:text-brand-ivory/50">Kepuasan Anda adalah standar kualitas kami.</p>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {[
                            { name: 'Andi P.', role: 'Home Chef', text: 'Kualitas barang sangat memuaskan, desainnya sangat elegan dan modern. Tiap tamu yang datang pasti memuji koleksi meja makan saya.', stars: 5 },
                            { name: 'Siska W.', role: 'Ibu Rumah Tangga', text: 'Packing sangat aman untuk barang pecah belah. Pengiriman juga tepat waktu! Sangat merekomendasikan kepada siapapun.', stars: 5 },
                            { name: 'Rudi H.', role: 'Interior Designer', text: 'Sebagai desainer interior, saya sangat selektif. Sinergi Visi adalah satu-satunya pilihan untuk klien premium saya.', stars: 5 },
                        ].map((rev, i) => (
                            <div key={i} className="flex flex-col justify-between rounded-2xl border border-brand-border bg-brand-ivory p-8 dark:bg-brand-charcoal dark:border-brand-charcoal/50 transition-all hover:shadow-lg hover:shadow-brand-gold/5">
                                <div>
                                    <div className="flex gap-x-1 text-brand-gold mb-4">
                                        {[...Array(rev.stars)].map((_, idx) => (
                                            <svg key={idx} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-brand-stone dark:text-brand-ivory/60 italic text-sm leading-relaxed">"{rev.text}"</p>
                                </div>
                                <div className="mt-8 flex items-center gap-x-4">
                                    <div className="h-10 w-10 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center font-bold text-brand-gold text-sm">{rev.name[0]}</div>
                                    <div>
                                        <div className="font-bold text-brand-charcoal dark:text-brand-ivory text-sm">{rev.name}</div>
                                        <div className="text-xs font-medium tracking-wider uppercase text-brand-stone">{rev.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Customer Service Section */}
            <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                <div className="relative isolate overflow-hidden bg-brand-charcoal px-6 py-16 shadow-xl rounded-2xl sm:px-16 md:py-24 lg:flex lg:items-center lg:gap-x-20 lg:px-24">
                    <div className="absolute top-0 left-0 -z-10 h-full w-full opacity-20">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-brand-gold rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-gold/50 rounded-full blur-3xl"></div>
                    </div>

                    <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:text-left">
                        <p className="text-xs font-semibold tracking-widest uppercase text-brand-gold mb-4">Layanan Premium</p>
                        <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-ivory sm:text-4xl">
                            Butuh Bantuan? <br />
                            <span className="italic text-brand-gold">Konsultan kami siap membantu.</span>
                        </h2>
                        <p className="mt-6 text-base leading-8 text-brand-ivory/60">
                            Kami di sini untuk menjawab pertanyaan Anda tentang produk, pesanan, atau pengiriman. Dapatkan bantuan langsung dari tim profesional kami.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                            <a
                                href={cs_endpoint}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-xl bg-brand-gold px-8 py-4 text-base font-bold text-white transition-all hover:bg-brand-gold-dark active:scale-[0.98] shadow-lg shadow-brand-gold/30"
                            >
                                Chat Konsultan Kami <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                    <div className="relative mt-16 h-80 lg:mt-0 lg:h-auto lg:flex-1">
                        <img
                            src="/images/customer-service.png"
                            alt="Customer Service Team"
                            className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl ring-1 ring-brand-ivory/10 object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-brand-border bg-white dark:border-brand-charcoal/30 dark:bg-brand-charcoal">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <div>
                            <ApplicationLogo className="h-12 w-12 mb-4" />
                            <p className="text-sm text-brand-stone dark:text-brand-ivory/50 leading-relaxed">
                                Kurator utama perlengkapan meja makan premium di Indonesia. Kualitas terjamin, keindahan terpilih.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8 lg:col-span-2">
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-charcoal dark:text-brand-ivory mb-4">Navigasi</h3>
                                <ul className="space-y-2">
                                    <li><Link href={route('home')} className="text-sm text-brand-stone hover:text-brand-gold dark:text-brand-ivory/50 dark:hover:text-brand-gold transition-colors">Home</Link></li>
                                    <li><Link href={route('products.index')} className="text-sm text-brand-stone hover:text-brand-gold dark:text-brand-ivory/50 dark:hover:text-brand-gold transition-colors">Koleksi Produk</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-charcoal dark:text-brand-ivory mb-4">Kontak</h3>
                                <ul className="space-y-2 text-sm text-brand-stone dark:text-brand-ivory/50">
                                    <li>Email: info@sinergivisi.com</li>
                                    <li>Telp: +62 812 3456 7890</li>
                                    <li>Surabaya, Jawa Timur</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 border-t border-brand-border pt-8 dark:border-brand-charcoal/30">
                        <p className="text-center text-xs text-brand-stone dark:text-brand-ivory/30">
                            &copy; 2026 Sinergi Visi. Fine Glassware & Ceramics. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
