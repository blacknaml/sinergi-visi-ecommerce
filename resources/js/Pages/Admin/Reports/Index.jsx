import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth, orders, claims }) {
    return (
        <AdminLayout auth={auth}>
            <Head title="Laporan" />

            <div className="mb-8 border-b border-brand-border pb-4 dark:border-brand-charcoal/30">
                <h1 className="font-serif text-3xl font-bold text-brand-charcoal dark:text-brand-ivory">Laporan & Transaksi</h1>
                <p className="text-sm text-brand-stone dark:text-brand-ivory/50">Pantau transaksi, pengiriman, dan klaim pelanggan.</p>
            </div>

            <div className="space-y-12">
                {/* Orders Report */}
                <div>
                    <h2 className="mb-6 font-serif text-xl font-bold text-brand-charcoal dark:text-brand-ivory">Daftar Transaksi</h2>
                    <div className="overflow-hidden rounded-3xl bg-white border border-brand-border shadow-sm dark:bg-[#252523] dark:border-brand-stone/30">
                        <table className="w-full text-left text-sm text-brand-stone dark:text-brand-ivory/60">
                            <thead className="bg-brand-sand text-xs font-bold uppercase tracking-wider text-brand-charcoal dark:bg-brand-charcoal/75 dark:text-brand-ivory">
                                <tr>
                                    <th className="px-6 py-4">Nomor Order</th>
                                    <th className="px-6 py-4">Pelanggan</th>
                                    <th className="px-6 py-4">Total</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Tanggal</th>
                                    <th className="px-6 py-4">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-border dark:divide-brand-charcoal/30">
                                {orders.map((order) => (
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
                                        <td className="px-6 py-4">{new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                                        <td className="px-6 py-4">
                                            <a href={route('admin.orders.show', order.id)} className="text-brand-gold font-bold hover:text-brand-gold-dark transition-colors">Detail</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Claims Report */}
                <div>
                    <h2 className="mb-6 font-serif text-xl font-bold text-brand-charcoal dark:text-brand-ivory">Laporan Refund & Klaim</h2>
                    <div className="overflow-hidden rounded-3xl bg-white border border-brand-border shadow-sm dark:bg-[#252523] dark:border-brand-stone/30">
                        <table className="w-full text-left text-sm text-brand-stone dark:text-brand-ivory/60">
                            <thead className="bg-brand-sand text-xs font-bold uppercase tracking-wider text-brand-charcoal dark:bg-brand-charcoal/75 dark:text-brand-ivory">
                                <tr>
                                    <th className="px-6 py-4">Order #</th>
                                    <th className="px-6 py-4">Jenis</th>
                                    <th className="px-6 py-4">Alasan</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-border dark:divide-brand-charcoal/30">
                                {claims.length > 0 ? claims.map((claim) => (
                                    <tr key={claim.id} className="hover:bg-brand-sand/30 dark:hover:bg-brand-charcoal/30 transition-colors">
                                        <td className="px-6 py-4 font-bold text-brand-charcoal dark:text-brand-ivory">{claim.order.order_number}</td>
                                        <td className="px-6 py-4 uppercase font-bold text-red-600 dark:text-red-400">{claim.type}</td>
                                        <td className="px-6 py-4">{claim.reason}</td>
                                        <td className="px-6 py-4">
                                            <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
                                                claim.status === 'pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400' :
                                                claim.status === 'approved' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400' :
                                                'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                            }`}>
                                                {claim.status === 'pending' ? 'Menunggu' :
                                                 claim.status === 'approved' ? 'Disetujui' :
                                                 claim.status}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center text-brand-stone dark:text-brand-ivory/50 italic">Belum ada laporan klaim atau refund.</td>
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
