import { Head, Link, router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { useState } from 'react';

export default function Show({ auth, product }) {
    const [quantity, setQuantity] = useState(1);
    const [processing, setProcessing] = useState(false);

    const addToCart = () => {
        if (!auth.user) {
            window.location.href = route('login');
            return;
        }
        setProcessing(true);
        router.post(route('cart.store'), {
            product_id: product.id,
            quantity: quantity
        }, {
            preserveScroll: true,
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <Head title={product.name} />
            <Navbar auth={auth} />

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-12 lg:flex-row">
                    {/* Product Image */}
                    <div className="flex-1">
                        <div className="sticky top-24">
                            <div className="overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-gray-800">
                                <img
                                    src={product.main_image ? `/storage/${product.main_image}` : 'https://via.placeholder.com/800'}
                                    alt={product.name}
                                    className="h-full w-full object-cover aspect-square"
                                />
                            </div>
                            
                            {/* Image Gallery */}
                            {product.images && product.images.length > 1 && (
                                <div className="mt-4 grid grid-cols-4 gap-4">
                                    {product.images.map((img) => (
                                        <div key={img.id} className="overflow-hidden rounded-xl border-2 border-transparent hover:border-blue-500 cursor-pointer transition-all aspect-square">
                                            <img 
                                                src={`/storage/${img.image_path}`} 
                                                alt={`${product.name} thumbnail`} 
                                                className="h-full w-full object-cover" 
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                        <div className="sticky top-24">
                            <nav className="mb-4 flex" aria-label="Breadcrumb">
                                <ol className="flex items-center space-x-2 text-sm text-gray-500">
                                    <li><Link href={route('home')} className="hover:text-blue-600">Home</Link></li>
                                    <li><span>/</span></li>
                                    <li><Link href={route('products.index')} className="hover:text-blue-600">Produk</Link></li>
                                    <li><span>/</span></li>
                                    <li className="font-bold text-gray-900 dark:text-white">{product.name}</li>
                                </ol>
                            </nav>

                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-600 dark:bg-blue-900 dark:text-blue-200">
                                {product.category?.name}
                            </span>
                            
                            <h1 className="mt-4 text-4xl font-black text-gray-900 dark:text-white">{product.name}</h1>
                            
                            <div className="mt-4 flex items-center gap-4">
                                <div className="flex items-center text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className={`h-5 w-5 fill-current ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20">
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                        </svg>
                                    ))}
                                    <span className="ml-2 text-sm font-bold text-gray-600 dark:text-gray-400">{product.rating}</span>
                                </div>
                                <span className="text-sm text-gray-400">|</span>
                                <span className="text-sm font-medium text-green-600">Stok: {product.stock}</span>
                            </div>

                            <div className="mt-8">
                                <span className="text-3xl font-black text-gray-900 dark:text-white">
                                    Rp {new Intl.NumberFormat('id-ID').format(product.price)}
                                </span>
                            </div>

                            <div className="mt-8 border-t border-gray-100 pt-8 dark:border-gray-800">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">Deskripsi</h3>
                                <p className="mt-4 text-gray-600 leading-relaxed dark:text-gray-400">
                                    {product.description}
                                </p>
                            </div>

                            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="flex h-14 items-center rounded-2xl border border-gray-200 bg-white px-2 dark:border-gray-800 dark:bg-gray-900">
                                    <button 
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        -
                                    </button>
                                    <input 
                                        type="number" 
                                        value={quantity} 
                                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                        className="w-16 border-none bg-transparent text-center font-bold focus:ring-0 dark:text-white"
                                    />
                                    <button 
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={addToCart}
                                    disabled={processing || product.stock === 0}
                                    className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 font-black text-white transition-all hover:bg-blue-700 disabled:opacity-50 active:scale-95"
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Tambah ke Keranjang
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
