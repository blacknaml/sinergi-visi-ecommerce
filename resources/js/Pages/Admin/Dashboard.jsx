import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

function StatCard({ title, value, icon, color }) {
    const colors = {
        blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
        indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400',
        green: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
        red: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    };

    return (
        <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-gray-900">
            <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${colors[color]}`}>
                    {/* Simplified icon placeholder */}
                    <div className="h-6 w-6 border-2 border-current rounded"></div>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">{value}</p>
                </div>
            </div>
        </div>
    );
}

export default function Dashboard({ auth, stats, recentOrders }) {
    return (
        <AdminLayout auth={auth}>
            <Head title="Admin Dashboard" />
            
            <div className="mb-8">
                <h1 className="text-2xl font-black text-gray-900 dark:text-white">Statistik Toko</h1>
                <p className="text-gray-500">Ringkasan performa Sinergi Visi Ecommerce hari ini.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total User" value={stats.users} icon="users" color="blue" />
                <StatCard title="Total Produk" value={stats.products} icon="products" color="indigo" />
                <StatCard title="Total Pesanan" value={stats.orders} icon="orders" color="green" />
                <StatCard title="Total Klaim" value={stats.claims} icon="claims" color="red" />
            </div>

            <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Pesanan Terbaru</h2>
                    <Link href={route('admin.reports')} className="text-sm font-bold text-blue-600 hover:underline">Lihat Semua →</Link>
                </div>
                <div className="overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-gray-900">
                    <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                        <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                            <tr>
                                <th className="px-6 py-4">ID Pesanan</th>
                                <th className="px-6 py-4">Pembeli</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{order.order_number}</td>
                                    <td className="px-6 py-4">{order.user.name}</td>
                                    <td className="px-6 py-4 font-black">Rp {new Intl.NumberFormat('id-ID').format(order.total_price)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                                            order.status === 'shipped' ? 'bg-blue-100 text-blue-600' :
                                            order.status === 'done' ? 'bg-green-100 text-green-600' :
                                            'bg-gray-100 text-gray-600'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link href={route('admin.orders.show', order.id)} className="text-blue-600 font-bold hover:underline">Detail</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
