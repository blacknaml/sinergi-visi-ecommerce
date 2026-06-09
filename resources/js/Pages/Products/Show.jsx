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
        <div className="min-h-screen bg-brand-ivory dark:bg-brand-charcoal">
            <Head title={product.name} />
            <Navbar auth={auth} />

            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-8" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2 text-sm text-brand-stone dark:text-brand-ivory/60">
                        <li><Link href={route('home')} className="hover:text-brand-gold transition-colors">Home</Link></li>
                        <li><span>/</span></li>
                        <li><Link href={route('products.index')} className="hover:text-brand-gold transition-colors">Produk</Link></li>
                        <li><span>/</span></li>
                        <li className="font-bold text-brand-charcoal dark:text-brand-ivory">{product.name}</li>
                    </ol>
                </nav>

                <div className="flex flex-col gap-12 lg:flex-row">
                    {/* Product Image */}
                    <div className="flex-1">
                        <div className="sticky top-24">
                            <div className="overflow-hidden rounded-3xl bg-white border border-brand-border dark:border-brand-charcoal/50 dark:bg-brand-charcoal shadow-lg shadow-brand-gold/5">
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
                                        <div key={img.id} className="overflow-hidden rounded-xl border-2 border-transparent hover:border-brand-gold cursor-pointer transition-all aspect-square">
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
                            <div className="mb-4">
                                <span className="rounded-full bg-brand-sand px-4 py-1.5 text-xs font-semibold tracking-wide uppercase text-brand-gold dark:bg-brand-charcoal/50 dark:text-brand-gold">
                                    {product.category?.name}
                                </span>
                            </div>
                            
                            <h1 className="font-serif text-4xl font-bold text-brand-charcoal dark:text-brand-ivory leading-tight">{product.name}</h1>
                            
                            <div className="mt-4 flex items-center gap-4">
                                <div className="flex items-center text-brand-gold">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className={`h-5 w-5 fill-current ${i < Math.floor(product.rating) ? 'text-brand-gold' : 'text-brand-sand dark:text-brand-charcoal/50'}`} viewBox="0 0 20 20">
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                        </svg>
                                    ))}
                                    <span className="ml-2 text-sm font-semibold text-brand-stone dark:text-brand-ivory/60">{product.rating}</span>
                                </div>
                                <span className="text-brand-border dark:text-brand-charcoal/30">|</span>
                                <span className="text-sm font-semibold text-brand-gold">Stok: {product.stock}</span>
                            </div>

                            <div className="mt-8">
                                <span className="text-3xl font-extrabold text-brand-charcoal dark:text-brand-ivory">
                                    Rp {new Intl.NumberFormat('id-ID').format(product.price)}
                                </span>
                            </div>

                            <div className="mt-8 border-t border-brand-border pt-8 dark:border-brand-charcoal/30">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-charcoal dark:text-brand-ivory mb-3">Deskripsi</h3>
                                <p className="text-brand-stone leading-relaxed dark:text-brand-ivory/60">
                                    {product.description}
                                </p>
                            </div>

                            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="flex h-14 items-center rounded-2xl border border-brand-border bg-white px-2 dark:border-brand-charcoal/50 dark:bg-brand-charcoal">
                                    <button 
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="flex h-10 w-10 items-center justify-center rounded-xl text-brand-stone hover:bg-brand-sand hover:text-brand-gold dark:hover:bg-brand-charcoal/80 transition-colors"
                                    >
                                        -
                                    </button>
                                    <input 
                                        type="number" 
                                        value={quantity} 
                                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                        className="w-16 border-none bg-transparent text-center font-bold focus:ring-0 dark:text-brand-ivory"
                                    />
                                    <button 
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        className="flex h-10 w-10 items-center justify-center rounded-xl text-brand-stone hover:bg-brand-sand hover:text-brand-gold dark:hover:bg-brand-charcoal/80 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={addToCart}
                                    disabled={processing || product.stock === 0}
                                    className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-brand-gold px-8 font-bold text-white transition-all hover:bg-brand-gold-dark disabled:opacity-50 active:scale-[0.98] shadow-lg shadow-brand-gold/20"
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
