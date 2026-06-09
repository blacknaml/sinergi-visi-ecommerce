import { Head, Link, useForm, router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function Index({ auth, cartItems }) {
    const total = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return;
        router.patch(route('cart.update', id), { quantity });
    };

    const removeItem = (id) => {
        router.delete(route('cart.destroy', id));
    };

    return (
        <div className="min-h-screen bg-brand-ivory dark:bg-brand-charcoal">
            <Head title="Keranjang Belanja" />
            <Navbar auth={auth} />

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="mb-8 font-serif text-3xl font-bold text-brand-charcoal dark:text-brand-ivory">Keranjang Belanja</h1>

                {cartItems.length > 0 ? (
                    <div className="flex flex-col gap-8 lg:flex-row">
                        <div className="flex-1 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 rounded-2xl bg-white border border-brand-border p-4 shadow-sm dark:bg-[#252523] dark:border-brand-stone/30">
                                    <img src={item.product.main_image ? `/storage/${item.product.main_image}` : 'https://via.placeholder.com/150'} alt={item.product.name} className="h-24 w-24 rounded-xl object-cover border border-brand-border dark:border-brand-charcoal/30" />
                                    <div className="flex-1">
                                        <h3 className="font-bold text-brand-charcoal dark:text-brand-ivory">{item.product.name}</h3>
                                        <p className="text-xs text-brand-stone dark:text-brand-ivory/50 mt-0.5">{item.product.category?.name}</p>
                                        <p className="mt-2 font-extrabold text-brand-gold">Rp {new Intl.NumberFormat('id-ID').format(item.product.price)}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center rounded-xl border border-brand-border bg-brand-sand p-1 dark:border-brand-charcoal/50 dark:bg-brand-charcoal/80">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8 rounded-lg hover:bg-white dark:hover:bg-brand-charcoal transition-colors font-bold text-brand-charcoal dark:text-brand-ivory">-</button>
                                            <span className="w-8 text-center font-bold text-brand-charcoal dark:text-brand-ivory">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 rounded-lg hover:bg-white dark:hover:bg-brand-charcoal transition-colors font-bold text-brand-charcoal dark:text-brand-ivory">+</button>
                                        </div>
                                        <button onClick={() => removeItem(item.id)} className="rounded-xl p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors">
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="w-full lg:w-96">
                            <div className="rounded-3xl bg-white border border-brand-border p-6 shadow-xl dark:bg-[#252523] dark:border-brand-stone/30">
                                <h3 className="mb-6 font-serif text-xl font-bold text-brand-charcoal dark:text-brand-ivory">Ringkasan Pesanan</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-brand-stone dark:text-brand-ivory/70 font-semibold">
                                        <span>Subtotal</span>
                                        <span className="text-brand-charcoal dark:text-brand-ivory">Rp {new Intl.NumberFormat('id-ID').format(total)}</span>
                                    </div>
                                    <div className="flex justify-between text-brand-stone dark:text-brand-ivory/70 font-semibold">
                                        <span>Pengiriman</span>
                                        <span className="font-bold text-emerald-600 dark:text-emerald-400">Gratis</span>
                                    </div>
                                    <div className="border-t border-brand-border pt-4 dark:border-brand-charcoal/50">
                                        <div className="flex justify-between text-xl font-extrabold text-brand-charcoal dark:text-brand-ivory">
                                            <span>Total</span>
                                            <span>Rp {new Intl.NumberFormat('id-ID').format(total)}</span>
                                        </div>
                                    </div>
                                    <Link
                                        href={route('checkout.index')}
                                        className="mt-6 flex w-full items-center justify-center rounded-xl bg-brand-gold py-4 font-bold text-white shadow-md shadow-brand-gold/20 transition-all hover:bg-brand-gold-dark active:scale-[0.98]"
                                    >
                                        Lanjut ke Checkout
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="mb-4 rounded-full bg-brand-sand p-6 dark:bg-brand-charcoal/50">
                            <svg className="h-12 w-12 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-brand-charcoal dark:text-brand-ivory">Keranjang Anda kosong</h3>
                        <p className="mt-2 text-sm text-brand-stone dark:text-brand-ivory/50">Mulailah berbelanja dan temukan produk terbaik kami.</p>
                        <Link href={route('products.index')} className="mt-6 inline-block font-bold text-brand-gold hover:text-brand-gold-dark transition-colors">Lihat Produk →</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
