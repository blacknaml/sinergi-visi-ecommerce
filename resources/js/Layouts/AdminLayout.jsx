import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminLayout({ auth, children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const navItems = [
        { name: 'Dashboard', routeName: 'dashboard', href: route('dashboard'), icon: 'layout-dashboard' },
        { name: 'Manajemen User', routeName: 'admin.users', href: route('admin.users'), icon: 'users' },
        { name: 'Manajemen Produk', routeName: 'admin.products', href: route('admin.products'), icon: 'package' },
        { name: 'Laporan', routeName: 'admin.reports', href: route('admin.reports'), icon: 'file-text' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Sidebar */}
            <aside className={`fixed left-0 top-0 z-40 h-screen w-64 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900`}>
                <div className="flex h-16 items-center border-b border-gray-100 px-6 dark:border-gray-800">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <span className="text-lg font-black tracking-tight text-gray-900 dark:text-white">ADMIN<span className="text-blue-600">SV</span></span>
                    </Link>
                </div>
                <div className="mt-6 px-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                                route().current(item.routeName)
                                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
                            }`}
                        >
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </div>
                <div className="absolute bottom-0 w-full border-t border-gray-100 p-4 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900"></div>
                        <div className="flex-1 overflow-hidden">
                            <p className="truncate text-sm font-bold text-gray-900 dark:text-white">{auth.user.name}</p>
                            <Link href={route('logout')} method="post" as="button" className="text-xs text-red-500 hover:underline">Keluar</Link>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`transition-all duration-300 ${isSidebarOpen ? 'pl-64' : 'pl-0'}`}>
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-100 bg-white/80 px-8 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-500">Sinergi Visi Ecommerce</span>
                    </div>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
