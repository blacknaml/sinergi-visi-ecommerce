import { Head, Link, useForm } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function Index({ auth, cartItems, addresses, total }) {
    const { data, setData, post, processing, errors } = useForm({
        address_id: addresses.find(a => a.is_default)?.id || addresses[0]?.id || '',
        payment_method: 'Transfer Bank'
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('checkout.store'));
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <Head title="Checkout" />
            <Navbar auth={auth} />

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <h1 className="mb-8 text-3xl font-black text-gray-900 dark:text-white">Checkout</h1>

                <form onSubmit={submit} className="flex flex-col gap-8 lg:flex-row">
                    <div className="flex-1 space-y-8">
                        {/* Address Selection */}
                        <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-gray-800">
                            <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Alamat Pengiriman</h3>
                            {addresses.length > 0 ? (
                                <div className="grid gap-4">
                                    {addresses.map((address) => (
                                        <label key={address.id} className={`relative flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition-all ${data.address_id === address.id ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600 dark:bg-blue-900/20' : 'border-gray-100'}`}>
                                            <input
                                                type="radio"
                                                name="address"
                                                value={address.id}
                                                checked={data.address_id === address.id}
                                                onChange={() => setData('address_id', address.id)}
                                                className="mt-1 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-gray-900 dark:text-white">{address.address_line}</span>
                                                    {address.is_default && <span className="rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-600 dark:bg-blue-900 dark:text-blue-200">Default</span>}
                                                </div>
                                                <p className="text-sm text-gray-500">{address.city}, {address.state} {address.postal_code}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6">
                                    <p className="text-gray-500 mb-4">Anda belum memiliki alamat pengiriman.</p>
                                    <Link href={route('profile.edit')} className="font-bold text-blue-600 underline">Tambah Alamat Baru</Link>
                                </div>
                            )}
                            {errors.address_id && <p className="mt-2 text-sm text-red-600">{errors.address_id}</p>}
                        </div>

                        {/* Payment Method */}
                        <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-gray-800">
                            <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Metode Pembayaran</h3>
                            <div className="grid gap-4">
                                <label className={`relative flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-all ${data.payment_method === 'Transfer Bank' ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600 dark:bg-blue-900/20' : 'border-gray-100'}`}>
                                    <input
                                        type="radio"
                                        checked={data.payment_method === 'Transfer Bank'}
                                        onChange={() => setData('payment_method', 'Transfer Bank')}
                                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                                    />
                                    <span className="font-bold text-gray-900 dark:text-white">Transfer Bank</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-96">
                        <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-xl dark:bg-gray-800">
                            <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Detail Pesanan</h3>
                            <div className="mb-6 space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">{item.product.name} x {item.quantity}</span>
                                        <span className="font-medium">Rp {new Intl.NumberFormat('id-ID').format(item.product.price * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-gray-100 pt-4 dark:border-gray-700">
                                <div className="flex justify-between text-xl font-black text-gray-900 dark:text-white">
                                    <span>Total</span>
                                    <span>Rp {new Intl.NumberFormat('id-ID').format(total)}</span>
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={processing || !data.address_id}
                                className="mt-6 flex w-full items-center justify-center rounded-2xl bg-blue-600 py-4 font-black text-white shadow-xl shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300 disabled:opacity-50 active:scale-95"
                            >
                                Konfirmasi Checkout
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
