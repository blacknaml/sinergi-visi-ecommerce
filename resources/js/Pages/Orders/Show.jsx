import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, order }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-bold leading-tight text-gray-800 dark:text-gray-200">Detail Pesanan #{order.order_number}</h2>}
        >
            <Head title={`Order ${order.order_number}`} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-xl sm:rounded-3xl dark:bg-gray-800">
                        <div className="p-8">
                            <div className="mb-8 flex items-center justify-between border-b border-gray-100 pb-8 dark:border-gray-700">
                                <div>
                                    <p className="text-sm font-bold text-gray-500 uppercase">Status Pesanan</p>
                                    <p className="text-2xl font-black text-blue-600 uppercase">{order.status}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-gray-500 uppercase">Metode Pembayaran</p>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">{order.payment_method}</p>
                                </div>
                            </div>

                            <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                                <div>
                                    <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-gray-900 dark:text-white">Alamat Pengiriman</h3>
                                    <div className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-900">
                                        <p className="font-bold text-gray-900 dark:text-white">{auth.user.name}</p>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{order.address.address_line}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{order.address.city}, {order.address.state} {order.address.postal_code}</p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-gray-900 dark:text-white">Ringkasan Waktu</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Tanggal Pesan</span>
                                            <span className="font-bold dark:text-white">{new Date(order.created_at).toLocaleString('id-ID')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-gray-900 dark:text-white">Produk yang Dibeli</h3>
                            <div className="space-y-4">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-gray-100 p-4 dark:border-gray-700">
                                        <img src={item.product.main_image ? `/storage/${item.product.main_image}` : 'https://via.placeholder.com/150'} alt={item.product.name} className="h-20 w-20 rounded-xl object-cover" />
                                        <div className="flex-1">
                                            <p className="font-bold text-gray-900 dark:text-white">{item.product.name}</p>
                                            <p className="text-sm text-gray-500">{item.quantity} x Rp {new Intl.NumberFormat('id-ID').format(item.price)}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-black text-gray-900 dark:text-white">Rp {new Intl.NumberFormat('id-ID').format(item.price * item.quantity)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 border-t border-gray-100 pt-8 dark:border-gray-700">
                                <div className="flex justify-between text-2xl font-black text-gray-900 dark:text-white">
                                    <span>Total Pembayaran</span>
                                    <span className="text-blue-600">Rp {new Intl.NumberFormat('id-ID').format(order.total_price)}</span>
                                </div>
                            </div>

                            <div className="mt-8 border-t border-gray-100 pt-8 dark:border-gray-700">
                                <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-gray-900 dark:text-white">Riwayat Perjalanan Pesanan</h3>
                                <div className="relative border-l-2 border-gray-200 ml-3 mt-4 space-y-6 dark:border-gray-700">
                                    {order.histories && order.histories.length > 0 ? (
                                        order.histories.map((history, idx) => (
                                            <div key={history.id} className="relative pl-6">
                                                <div className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white dark:border-gray-800 ${
                                                    idx === order.histories.length - 1 ? 'bg-blue-600 ring-4 ring-blue-100 dark:ring-blue-900/30' : 'bg-gray-300 dark:bg-gray-600'
                                                }`}></div>
                                                <p className="font-bold text-gray-900 uppercase text-sm dark:text-white">{history.status}</p>
                                                <p className="text-xs text-gray-500">{new Date(history.created_at).toLocaleString('id-ID')}</p>
                                                {history.notes && (
                                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{history.notes}</p>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500 pl-6">Belum ada riwayat tercatat.</p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-10 flex gap-4">
                                <Link href={route('orders.index')} className="flex-1 rounded-2xl bg-gray-100 py-4 text-center font-bold text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-white">
                                    Kembali ke Daftar
                                </Link>
                                {order.status === 'done' && (
                                    <button className="flex-1 rounded-2xl bg-orange-100 py-4 font-bold text-orange-600 hover:bg-orange-200">
                                        Ajukan Komplain
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
