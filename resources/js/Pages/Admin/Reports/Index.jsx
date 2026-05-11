import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth, orders, claims }) {
    return (
        <AdminLayout auth={auth}>
            <Head title="Laporan" />

            <div className="mb-8">
                <h1 className="text-2xl font-black text-gray-900 dark:text-white">Laporan & Transaksi</h1>
                <p className="text-gray-500">Pantau transaksi, pengiriman, dan klaim pelanggan.</p>
            </div>

            <div className="space-y-12">
                {/* Orders Report */}
                <div>
                    <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Daftar Transaksi</h2>
                    <div className="overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-gray-900">
                        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                            <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                <tr>
                                    <th className="px-6 py-4">Nomor Order</th>
                                    <th className="px-6 py-4">Pelanggan</th>
                                    <th className="px-6 py-4">Total</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Tanggal</th>
                                    <th className="px-6 py-4">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                        <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{order.order_number}</td>
                                        <td className="px-6 py-4">{order.user.name}</td>
                                        <td className="px-6 py-4 font-black text-blue-600">Rp {new Intl.NumberFormat('id-ID').format(order.total_price)}</td>
                                        <td className="px-6 py-4">
                                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold uppercase dark:bg-gray-800">
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{new Date(order.created_at).toLocaleDateString('id-ID')}</td>
                                        <td className="px-6 py-4">
                                            <a href={route('admin.orders.show', order.id)} className="text-blue-600 font-bold hover:underline">Detail</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Claims Report */}
                <div>
                    <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Laporan Refund & Klaim</h2>
                    <div className="overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-gray-900">
                        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                            <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                <tr>
                                    <th className="px-6 py-4">Order #</th>
                                    <th className="px-6 py-4">Jenis</th>
                                    <th className="px-6 py-4">Alasan</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {claims.length > 0 ? claims.map((claim) => (
                                    <tr key={claim.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                        <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{claim.order.order_number}</td>
                                        <td className="px-6 py-4 uppercase font-bold text-red-500">{claim.type}</td>
                                        <td className="px-6 py-4">{claim.reason}</td>
                                        <td className="px-6 py-4">
                                            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-600 dark:bg-yellow-900/20">
                                                {claim.status}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center text-gray-400 italic">Belum ada laporan klaim atau refund.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
