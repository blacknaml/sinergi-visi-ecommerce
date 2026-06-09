import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, orders }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-serif text-2xl font-bold leading-tight text-brand-charcoal dark:text-brand-ivory">Riwayat Pesanan</h2>}
        >
            <Head title="Riwayat Pesanan" />

            <div className="py-12 bg-brand-ivory dark:bg-brand-charcoal min-h-[calc(100vh-65px)]">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        {orders.length > 0 ? orders.map((order) => (
                            <div key={order.id} className="overflow-hidden bg-white border border-brand-border shadow-sm sm:rounded-3xl dark:bg-brand-charcoal dark:border-brand-charcoal/50">
                                <div className="p-6">
                                    <div className="mb-4 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-bold text-brand-stone uppercase tracking-wider dark:text-brand-ivory/40">Nomor Order</p>
                                            <p className="text-lg font-extrabold text-brand-charcoal dark:text-brand-ivory mt-0.5">{order.order_number}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                                                order.status === 'pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400' :
                                                order.status === 'shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                                                order.status === 'done' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400' :
                                                'bg-brand-sand text-brand-stone dark:bg-brand-charcoal/50 dark:text-brand-ivory/60'
                                            }`}>
                                                {order.status === 'pending' ? 'Menunggu' :
                                                 order.status === 'shipped' ? 'Dikirim' :
                                                 order.status === 'done' ? 'Selesai' :
                                                 order.status}
                                            </span>
                                            <p className="mt-1.5 text-xs font-semibold text-brand-stone dark:text-brand-ivory/40">{new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col gap-4 border-t border-brand-border pt-4 dark:border-brand-charcoal/30">
                                        {order.items.map((item) => (
                                            <div key={item.id} className="flex items-center gap-4">
                                                <img src={item.product.main_image ? `/storage/${item.product.main_image}` : 'https://via.placeholder.com/150'} alt={item.product.name} className="h-16 w-16 rounded-xl object-cover border border-brand-border dark:border-brand-charcoal/30" />
                                                <div className="flex-1">
                                                    <p className="font-bold text-brand-charcoal dark:text-brand-ivory">{item.product.name}</p>
                                                    <p className="text-sm text-brand-stone dark:text-brand-ivory/60">{item.quantity} x Rp {new Intl.NumberFormat('id-ID').format(item.price)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 flex items-center justify-between border-t border-brand-border pt-6 dark:border-brand-charcoal/30">
                                        <div>
                                            <p className="text-xs text-brand-stone uppercase font-bold dark:text-brand-ivory/40">Total Pembayaran</p>
                                            <p className="text-xl font-extrabold text-brand-gold mt-1">Rp {new Intl.NumberFormat('id-ID').format(order.total_price)}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Link
                                                href={route('orders.show', order.id)}
                                                className="rounded-xl border border-brand-gold/20 bg-brand-sand px-6 py-2.5 text-xs font-bold text-brand-gold transition-colors hover:bg-brand-gold hover:text-white dark:bg-brand-charcoal/50 dark:hover:bg-brand-gold"
                                            >
                                                Detail
                                            </Link>
                                            {order.status === 'pending' && (
                                                <Link
                                                    href={route('orders.cancel', order.id)}
                                                    method="post"
                                                    as="button"
                                                    className="rounded-xl bg-red-50 dark:bg-red-950/20 px-6 py-2.5 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-100 transition-colors"
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
                                <p className="text-brand-stone dark:text-brand-ivory/50">Belum ada pesanan.</p>
                                <Link href={route('products.index')} className="mt-4 inline-block font-bold text-brand-gold hover:text-brand-gold-dark transition-colors">Mulai Belanja →</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
