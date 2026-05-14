import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import ProductCard from '@/Components/ProductCard';

export default function Welcome({ auth, products, categories, cs_endpoint }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <Head title="Welcome" />
            
            <Navbar auth={auth} />

            {/* Hero Section */}
            <div className="relative overflow-hidden pt-16 pb-32">
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
                                className="rounded-2xl bg-blue-600 px-8 py-4 text-lg font-black text-white transition-all hover:bg-blue-700 active:scale-95"
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

            {/* Featured Products */}
            <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                <div className="mb-12 flex items-end justify-between">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white">Produk Unggulan</h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">Pilihan terbaik untuk melengkapi dapur Anda.</p>
                    </div>
                    <Link
                        href={route('products.index')}
                        className="text-sm font-bold text-blue-600 hover:text-blue-700"
                    >
                        Lihat Semua →
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
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
