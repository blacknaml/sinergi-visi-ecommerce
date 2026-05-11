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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <Head title="Keranjang Belanja" />
            <Navbar auth={auth} />

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="mb-8 text-3xl font-black text-gray-900 dark:text-white">Keranjang Belanja</h1>

                {cartItems.length > 0 ? (
                    <div className="flex flex-col gap-8 lg:flex-row">
                        <div className="flex-1 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
                                    <img src={item.product.main_image ? `/storage/${item.product.main_image}` : 'https://via.placeholder.com/150'} alt={item.product.name} className="h-24 w-24 rounded-xl object-cover" />
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 dark:text-white">{item.product.name}</h3>
                                        <p className="text-sm text-gray-500">{item.product.category?.name}</p>
                                        <p className="mt-1 font-black text-blue-600">Rp {new Intl.NumberFormat('id-ID').format(item.product.price)}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center rounded-xl border border-gray-100 bg-gray-50 p-1 dark:border-gray-700 dark:bg-gray-900">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800">-</button>
                                            <span className="w-8 text-center font-bold">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800">+</button>
                                        </div>
                                        <button onClick={() => removeItem(item.id)} className="rounded-xl p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="w-full lg:w-96">
                            <div className="rounded-3xl bg-white p-6 shadow-xl dark:bg-gray-800">
                                <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Ringkasan Pesanan</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Subtotal</span>
                                        <span>Rp {new Intl.NumberFormat('id-ID').format(total)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Pengiriman</span>
                                        <span className="font-bold text-green-600">Gratis</span>
                                    </div>
                                    <div className="border-t border-gray-100 pt-4 dark:border-gray-700">
                                        <div className="flex justify-between text-xl font-black text-gray-900 dark:text-white">
                                            <span>Total</span>
                                            <span>Rp {new Intl.NumberFormat('id-ID').format(total)}</span>
                                        </div>
                                    </div>
                                    <Link
                                        href={route('checkout.index')}
                                        className="mt-6 flex w-full items-center justify-center rounded-2xl bg-blue-600 py-4 font-black text-white shadow-xl shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300 active:scale-95"
                                    >
                                        Lanjut ke Checkout
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="mb-4 rounded-full bg-gray-100 p-6 dark:bg-gray-900">
                            <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Keranjang Anda kosong</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">Mulailah berbelanja dan temukan produk terbaik kami.</p>
                        <Link href={route('products.index')} className="mt-6 font-bold text-blue-600">Lihat Produk →</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
