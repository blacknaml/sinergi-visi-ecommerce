import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, stats, recentOrders }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-serif text-2xl font-bold leading-tight text-brand-charcoal dark:text-brand-ivory">
                    Dashboard Pembeli
                </h2>
            }
        >
            <Head title="Dashboard Pembeli" />

            <div className="relative py-12 min-h-[calc(100vh-65px)] bg-brand-ivory dark:bg-brand-charcoal overflow-hidden">
                {/* Luxury Ambient Background Elements */}
                <div className="absolute top-0 -left-4 w-96 h-96 bg-brand-gold/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-96 h-96 bg-brand-sand rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-brand-gold/5 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 transform -translate-x-1/2"></div>

                <div className="relative mx-auto max-w-7xl sm:px-6 lg:px-8 z-10">
                    {/* Welcome Banner */}
                    <div className="mb-8 overflow-hidden rounded-3xl bg-brand-charcoal border border-brand-border dark:border-brand-charcoal/50 shadow-xl shadow-brand-gold/10">
                        <div className="px-8 py-10 sm:px-12 relative isolate">
                            {/* Decorative Background glow */}
                            <div className="absolute right-0 top-0 -z-10 h-full w-1/2 bg-gradient-to-l from-brand-gold/10 to-transparent"></div>
                            
                            <h3 className="font-serif text-3xl font-bold text-brand-ivory">Selamat Datang, {auth.user.name}! 👋</h3>
                            <p className="mt-2 text-brand-ivory/70 font-medium text-lg">Siap untuk menemukan barang impian Anda hari ini?</p>
                            <div className="mt-6">
                                <Link
                                    href={route('products.index')}
                                    className="inline-flex items-center justify-center rounded-xl bg-brand-gold px-6 py-3 text-sm font-bold text-white transition-all hover:bg-brand-gold-dark active:scale-[0.98] shadow-md shadow-brand-gold/20"
                                >
                                    Mulai Belanja Sekarang
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
                        {/* Stat Cards with Glassmorphism */}
                        <div className="rounded-3xl bg-white/70 backdrop-blur-xl p-8 shadow-lg shadow-brand-gold/5 border border-brand-border dark:bg-brand-charcoal dark:border-brand-charcoal/50 transition-all hover:-translate-y-1">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-sand text-brand-gold dark:bg-brand-charcoal/50">
                                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-brand-stone uppercase tracking-wider dark:text-brand-ivory/40">Total Pesanan</p>
                                    <p className="text-4xl font-extrabold text-brand-charcoal dark:text-brand-ivory mt-1">{stats?.orders || 0}</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-3xl bg-white/70 backdrop-blur-xl p-8 shadow-lg shadow-brand-gold/5 border border-brand-border dark:bg-brand-charcoal dark:border-brand-charcoal/50 transition-all hover:-translate-y-1">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-sand text-brand-gold dark:bg-brand-charcoal/50">
                                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-brand-stone uppercase tracking-wider dark:text-brand-ivory/40">Menunggu Diproses</p>
                                    <p className="text-4xl font-extrabold text-brand-charcoal dark:text-brand-ivory mt-1">{stats?.pendingOrders || 0}</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-3xl bg-white/70 backdrop-blur-xl p-8 shadow-lg shadow-brand-gold/5 border border-brand-border dark:bg-brand-charcoal dark:border-brand-charcoal/50 transition-all hover:-translate-y-1">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-sand text-brand-gold dark:bg-brand-charcoal/50">
                                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-brand-stone uppercase tracking-wider dark:text-brand-ivory/40">Selesai</p>
                                    <p className="text-4xl font-extrabold text-brand-charcoal dark:text-brand-ivory mt-1">{stats?.completedOrders || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white/80 dark:bg-brand-charcoal backdrop-blur-xl shadow-xl shadow-brand-gold/5 border border-brand-border dark:border-brand-charcoal/50 sm:rounded-3xl">
                        <div className="p-8">
                            <div className="mb-6 flex items-center justify-between border-b border-brand-border pb-4 dark:border-brand-charcoal/30">
                                <h3 className="text-lg font-bold text-brand-charcoal dark:text-brand-ivory flex items-center gap-2">
                                    <svg className="h-6 w-6 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    Pesanan Terakhir Anda
                                </h3>
                                <Link href={route('orders.index')} className="rounded-xl bg-brand-sand px-4 py-2 text-xs font-bold text-brand-gold transition-colors hover:bg-brand-gold hover:text-white dark:bg-brand-charcoal/50 dark:hover:bg-brand-gold">
                                    Lihat Semua →
                                </Link>
                            </div>

                            {recentOrders && recentOrders.length > 0 ? (
                                <div className="space-y-4">
                                    {recentOrders.map((order) => (
                                        <div key={order.id} className="group flex items-center justify-between rounded-2xl border border-brand-border bg-white p-5 transition-all hover:border-brand-gold/50 hover:shadow-md dark:border-brand-charcoal/50 dark:bg-brand-charcoal/30">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-sand text-brand-gold group-hover:bg-brand-gold group-hover:text-white dark:bg-brand-charcoal/50 dark:group-hover:bg-brand-gold transition-colors">
                                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <Link href={route('orders.show', order.id)} className="font-bold text-brand-charcoal hover:text-brand-gold dark:text-brand-ivory transition-colors">
                                                        {order.order_number}
                                                    </Link>
                                                    <p className="text-xs font-semibold text-brand-stone dark:text-brand-ivory/50 mt-0.5">{new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-extrabold text-brand-charcoal dark:text-brand-ivory">Rp {new Intl.NumberFormat('id-ID').format(order.total_price)}</p>
                                                <span className={`mt-1.5 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
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
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-16 text-center">
                                    <div className="mb-4 rounded-full bg-brand-sand p-6 dark:bg-brand-charcoal/50">
                                        <svg className="h-12 w-12 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-lg font-bold text-brand-charcoal dark:text-brand-ivory">Belum ada pesanan</h4>
                                    <p className="mt-1 text-sm text-brand-stone dark:text-brand-ivory/50">Anda belum pernah melakukan pemesanan.</p>
                                    <Link href={route('products.index')} className="mt-6 rounded-xl bg-brand-gold px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-gold/20 transition-all hover:bg-brand-gold-dark active:scale-[0.98]">
                                        Mulai Belanja
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
