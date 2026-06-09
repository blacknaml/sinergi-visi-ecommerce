import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

function StatCard({ title, value, color }) {
    const colors = {
        gold: 'bg-brand-sand text-brand-gold dark:bg-brand-charcoal/50 dark:text-brand-gold border border-brand-gold/20',
        charcoal: 'bg-brand-charcoal text-brand-ivory border border-brand-charcoal/50',
        stone: 'bg-brand-sand text-brand-stone dark:bg-brand-charcoal/50 dark:text-brand-ivory/60 border border-brand-border',
        border: 'bg-brand-ivory text-brand-gold dark:bg-brand-charcoal border border-brand-border',
    };

    return (
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-brand-border dark:bg-brand-charcoal dark:border-brand-charcoal/50">
            <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${colors[color] || colors.gold}`}>
                    {/* Simplified icon placeholder */}
                    <div className="h-6 w-6 border-2 border-current rounded-lg"></div>
                </div>
                <div>
                    <p className="text-xs font-bold text-brand-stone uppercase tracking-wider dark:text-brand-ivory/40">{title}</p>
                    <p className="text-2xl font-extrabold text-brand-charcoal dark:text-brand-ivory mt-1">{value}</p>
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
                <h1 className="font-serif text-3xl font-bold text-brand-charcoal dark:text-brand-ivory">Statistik Toko</h1>
                <p className="text-sm text-brand-stone dark:text-brand-ivory/50">Ringkasan performa Sinergi Visi Ecommerce hari ini.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total User" value={stats.users} color="stone" />
                <StatCard title="Total Produk" value={stats.products} color="gold" />
                <StatCard title="Total Pesanan" value={stats.orders} color="charcoal" />
                <StatCard title="Total Klaim" value={stats.claims} color="border" />
            </div>

            <div className="mt-12">
                <div className="flex items-center justify-between mb-6 border-b border-brand-border pb-4 dark:border-brand-charcoal/30">
                    <h2 className="text-xl font-bold text-brand-charcoal dark:text-brand-ivory">Pesanan Terbaru</h2>
                    <Link href={route('admin.reports')} className="text-xs font-bold text-brand-gold hover:text-brand-gold-dark border-b border-brand-gold/30 hover:border-brand-gold transition-all">Lihat Semua →</Link>
                </div>
                <div className="overflow-hidden rounded-3xl bg-white border border-brand-border shadow-sm dark:bg-brand-charcoal dark:border-brand-charcoal/50">
                    <table className="w-full text-left text-sm text-brand-stone dark:text-brand-ivory/60">
                        <thead className="bg-brand-sand text-xs font-bold uppercase tracking-wider text-brand-charcoal dark:bg-brand-charcoal/75 dark:text-brand-ivory">
                            <tr>
                                <th className="px-6 py-4">ID Pesanan</th>
                                <th className="px-6 py-4">Pembeli</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border dark:divide-brand-charcoal/30">
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-brand-sand/30 dark:hover:bg-brand-charcoal/30 transition-colors">
                                    <td className="px-6 py-4 font-bold text-brand-charcoal dark:text-brand-ivory">{order.order_number}</td>
                                    <td className="px-6 py-4">{order.user.name}</td>
                                    <td className="px-6 py-4 font-extrabold text-brand-charcoal dark:text-brand-ivory">Rp {new Intl.NumberFormat('id-ID').format(order.total_price)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
                                            order.status === 'pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400' :
                                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                                            order.status === 'done' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400' :
                                            'bg-brand-sand text-brand-stone'
                                        }`}>
                                            {order.status === 'pending' ? 'Menunggu' :
                                             order.status === 'shipped' ? 'Dikirim' :
                                             order.status === 'done' ? 'Selesai' :
                                             order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link href={route('admin.orders.show', order.id)} className="text-brand-gold font-bold hover:text-brand-gold-dark transition-colors">Detail</Link>
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
