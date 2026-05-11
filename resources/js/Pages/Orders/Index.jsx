import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, orders }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-bold leading-tight text-gray-800 dark:text-gray-200">Riwayat Pesanan</h2>}
        >
            <Head title="Riwayat Pesanan" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        {orders.length > 0 ? orders.map((order) => (
                            <div key={order.id} className="overflow-hidden bg-white shadow-sm sm:rounded-2xl dark:bg-gray-800">
                                <div className="p-6">
                                    <div className="mb-4 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Nomor Order</p>
                                            <p className="text-lg font-black text-gray-900 dark:text-white">{order.order_number}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`rounded-full px-4 py-1 text-xs font-black uppercase ${
                                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                                                order.status === 'shipped' ? 'bg-blue-100 text-blue-600' :
                                                order.status === 'done' ? 'bg-green-100 text-green-600' :
                                                'bg-gray-100 text-gray-600'
                                            }`}>
                                                {order.status}
                                            </span>
                                            <p className="mt-1 text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString('id-ID')}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col gap-4 border-t border-gray-100 pt-4 dark:border-gray-700">
                                        {order.items.map((item) => (
                                            <div key={item.id} className="flex items-center gap-4">
                                                <img src={item.product.main_image ? `/storage/${item.product.main_image}` : 'https://via.placeholder.com/150'} alt={item.product.name} className="h-16 w-16 rounded-xl object-cover" />
                                                <div className="flex-1">
                                                    <p className="font-bold text-gray-900 dark:text-white">{item.product.name}</p>
                                                    <p className="text-sm text-gray-500">{item.quantity} x Rp {new Intl.NumberFormat('id-ID').format(item.price)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-6 dark:border-gray-700">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold">Total Pembayaran</p>
                                            <p className="text-xl font-black text-blue-600">Rp {new Intl.NumberFormat('id-ID').format(order.total_price)}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Link
                                                href={route('orders.show', order.id)}
                                                className="rounded-xl border border-gray-200 px-6 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:bg-gray-900"
                                            >
                                                Detail
                                            </Link>
                                            {order.status === 'pending' && (
                                                <Link
                                                    href={route('orders.cancel', order.id)}
                                                    method="post"
                                                    as="button"
                                                    className="rounded-xl bg-red-50 px-6 py-2 text-sm font-bold text-red-600 hover:bg-red-100"
                                                >
                                                    Batalkan
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="py-24 text-center">
                                <p className="text-gray-500">Belum ada pesanan.</p>
                                <Link href={route('products.index')} className="mt-4 font-bold text-blue-600">Mulai Belanja →</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
