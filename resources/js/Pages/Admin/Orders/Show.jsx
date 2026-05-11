import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ auth, order }) {
    return (
        <AdminLayout auth={auth}>
            <Head title={`Detail Pesanan #${order.order_number}`} />
            
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white">Detail Pesanan</h1>
                    <p className="text-gray-500">#{order.order_number}</p>
                </div>
                <Link href={route('dashboard')} className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-gray-700 shadow-sm transition hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                    Kembali
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-8">
                    {/* Items */}
                    <div className="overflow-hidden rounded-3xl bg-white p-6 shadow-sm dark:bg-gray-900">
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">Produk yang Dipesan</h3>
                        <div className="space-y-4">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-gray-100 p-4 dark:border-gray-800">
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
                    </div>

                    {/* Summary */}
                    <div className="overflow-hidden rounded-3xl bg-white p-6 shadow-sm dark:bg-gray-900">
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-gray-900 dark:text-white">Total Pembayaran</span>
                            <span className="text-3xl font-black text-blue-600">Rp {new Intl.NumberFormat('id-ID').format(order.total_price)}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Customer Info */}
                    <div className="overflow-hidden rounded-3xl bg-white p-6 shadow-sm dark:bg-gray-900">
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">Informasi Pembeli</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-bold text-gray-400">NAMA</p>
                                <p className="font-bold text-gray-900 dark:text-white">{order.user.name}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400">EMAIL</p>
                                <p className="font-bold text-gray-900 dark:text-white">{order.user.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="overflow-hidden rounded-3xl bg-white p-6 shadow-sm dark:bg-gray-900">
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">Alamat Pengiriman</h3>
                        <p className="font-bold text-gray-900 dark:text-white">{order.user.name}</p>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{order.address.address_line}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{order.address.city}, {order.address.state} {order.address.postal_code}</p>
                    </div>

                    {/* Order Status Info */}
                    <div className="overflow-hidden rounded-3xl bg-white p-6 shadow-sm dark:bg-gray-900">
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">Status Pesanan</h3>
                        <div className="mb-4">
                            <select
                                value={order.status}
                                onChange={(e) => {
                                    if (confirm('Apakah Anda yakin ingin mengubah status pesanan?')) {
                                        router.patch(route('admin.orders.updateStatus', order.id), { status: e.target.value }, { preserveScroll: true });
                                    }
                                }}
                                className={`block w-full rounded-xl border-gray-200 font-bold uppercase tracking-wider focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white ${
                                    order.status === 'pending' ? 'text-yellow-600' :
                                    order.status === 'shipped' ? 'text-blue-600' :
                                    order.status === 'done' ? 'text-green-600' :
                                    'text-gray-600'
                                }`}
                            >
                                <option value="pending">PENDING (Menunggu)</option>
                                <option value="shipped">SHIPPED (Dikirim)</option>
                                <option value="done">DONE (Selesai)</option>
                                <option value="cancelled">CANCELLED (Dibatalkan)</option>
                            </select>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400">TANGGAL PEMESANAN</p>
                            <p className="font-bold text-gray-900 dark:text-white">{new Date(order.created_at).toLocaleString('id-ID')}</p>
                        </div>
                    </div>

                    {/* Order History Timeline */}
                    <div className="overflow-hidden rounded-3xl bg-white p-6 shadow-sm dark:bg-gray-900">
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">Riwayat Perjalanan</h3>
                        <div className="relative border-l-2 border-gray-200 ml-3 mt-4 space-y-6 dark:border-gray-700">
                            {order.histories && order.histories.length > 0 ? (
                                order.histories.map((history, idx) => (
                                    <div key={history.id} className="relative pl-6">
                                        <div className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white dark:border-gray-900 ${
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
                </div>
            </div>
        </AdminLayout>
    );
}
