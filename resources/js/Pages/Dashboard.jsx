import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, stats, recentOrders }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-2xl font-black leading-tight text-gray-900 dark:text-white">
                    Dashboard Pembeli
                </h2>
            }
        >
            <Head title="Dashboard Pembeli" />

            <div className="relative py-12 min-h-[calc(100vh-65px)] bg-gray-50 dark:bg-gray-950 overflow-hidden">
                {/* Dynamic Background Elements */}
                <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 transform -translate-x-1/2"></div>

                <div className="relative mx-auto max-w-7xl sm:px-6 lg:px-8 z-10">
                    {/* Welcome Banner */}
                    <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-xl shadow-blue-500/20">
                        <div className="px-8 py-10 sm:px-12">
                            <h3 className="text-3xl font-black text-white">Selamat Datang, {auth.user.name}! 👋</h3>
                            <p className="mt-2 text-blue-100 font-medium text-lg">Siap untuk menemukan barang impian Anda hari ini?</p>
                            <div className="mt-6">
                                <Link
                                    href={route('products.index')}
                                    className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-blue-600 shadow-lg transition-all hover:bg-gray-50 hover:scale-105"
                                >
                                    Mulai Belanja Sekarang
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
                        {/* Stat Cards with Glassmorphism */}
                        <div className="rounded-3xl bg-white/70 backdrop-blur-xl p-8 shadow-lg shadow-gray-200/50 border border-white/50 dark:bg-gray-900/70 dark:border-gray-800 transition-all hover:-translate-y-1">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Pesanan</p>
                                    <p className="text-4xl font-black text-gray-900 dark:text-white">{stats?.orders || 0}</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-3xl bg-white/70 backdrop-blur-xl p-8 shadow-lg shadow-gray-200/50 border border-white/50 dark:bg-gray-900/70 dark:border-gray-800 transition-all hover:-translate-y-1">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-400">
                                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Menunggu Diproses</p>
                                    <p className="text-4xl font-black text-gray-900 dark:text-white">{stats?.pendingOrders || 0}</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-3xl bg-white/70 backdrop-blur-xl p-8 shadow-lg shadow-gray-200/50 border border-white/50 dark:bg-gray-900/70 dark:border-gray-800 transition-all hover:-translate-y-1">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
                                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Selesai</p>
                                    <p className="text-4xl font-black text-gray-900 dark:text-white">{stats?.completedOrders || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white/80 backdrop-blur-xl shadow-xl shadow-gray-200/50 border border-white/50 sm:rounded-3xl dark:bg-gray-900/80 dark:border-gray-800">
                        <div className="p-8">
                            <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
                                <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                                    <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    Pesanan Terakhir Anda
                                </h3>
                                <Link href={route('orders.index')} className="rounded-xl bg-gray-50 px-4 py-2 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                    Lihat Semua →
                                </Link>
                            </div>

                            {recentOrders && recentOrders.length > 0 ? (
                                <div className="space-y-4">
                                    {recentOrders.map((order) => (
                                        <div key={order.id} className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 transition-all hover:border-blue-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 dark:bg-gray-700">
                                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <Link href={route('orders.show', order.id)} className="font-bold text-gray-900 hover:text-blue-600 dark:text-white">
                                                        {order.order_number}
                                                    </Link>
                                                    <p className="text-sm font-medium text-gray-500">{new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-black text-gray-900 dark:text-white">Rp {new Intl.NumberFormat('id-ID').format(order.total_price)}</p>
                                                <span className={`mt-1 inline-block rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${
                                                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                                                    order.status === 'done' ? 'bg-green-100 text-green-700' :
                                                    'bg-gray-100 text-gray-700'
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
                                    <div className="mb-4 rounded-full bg-gray-50 p-6 dark:bg-gray-800">
                                        <svg className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">Belum ada pesanan</h4>
                                    <p className="mt-1 text-gray-500">Anda belum pernah melakukan pemesanan.</p>
                                    <Link href={route('products.index')} className="mt-6 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300">
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
