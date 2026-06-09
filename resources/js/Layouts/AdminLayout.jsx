import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminLayout({ auth, children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const navItems = [
        { name: 'Dashboard', routeName: 'dashboard', href: route('dashboard'), icon: 'layout-dashboard' },
        { name: 'Manajemen User', routeName: 'admin.users', href: route('admin.users'), icon: 'users' },
        { name: 'Manajemen Produk', routeName: 'admin.products', href: route('admin.products'), icon: 'package' },
        { name: 'Laporan', routeName: 'admin.reports', href: route('admin.reports'), icon: 'file-text' },
        { name: 'Laporan Claim', routeName: 'admin.claims', href: route('admin.claims'), icon: 'alert-circle' },
    ];

    return (
        <div className="min-h-screen bg-brand-ivory dark:bg-brand-charcoal">
            {/* Sidebar */}
            <aside className={`fixed left-0 top-0 z-40 h-screen w-64 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} border-r border-brand-border bg-white dark:border-brand-charcoal/30 dark:bg-brand-charcoal`}>
                <div className="flex h-16 items-center border-b border-brand-border px-6 dark:border-brand-charcoal/30">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/logo.png" alt="Sinergi Visi" className="h-8 w-auto" />
                        <span className="text-lg font-black tracking-tight text-brand-charcoal dark:text-brand-ivory">ADMIN<span className="text-brand-gold">SV</span></span>
                    </Link>
                </div>
                <div className="mt-6 px-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                                route().current(item.routeName)
                                ? 'bg-brand-sand text-brand-gold dark:bg-brand-charcoal/50 dark:text-brand-gold'
                                : 'text-brand-stone hover:bg-brand-sand dark:text-brand-ivory/60 dark:hover:bg-brand-charcoal/50'
                            }`}
                        >
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </div>
                <div className="absolute bottom-0 w-full border-t border-brand-border p-4 dark:border-brand-charcoal/30">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-brand-sand dark:bg-brand-charcoal/50 border border-brand-gold/30 flex items-center justify-center font-bold text-brand-gold text-xs">
                            {auth.user.name[0]}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="truncate text-sm font-bold text-brand-charcoal dark:text-brand-ivory">{auth.user.name}</p>
                            <Link href={route('logout')} method="post" as="button" className="text-xs text-red-500 hover:underline">Keluar</Link>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`transition-all duration-300 ${isSidebarOpen ? 'pl-64' : 'pl-0'}`}>
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-brand-border bg-brand-ivory/80 px-8 backdrop-blur-md dark:border-brand-charcoal/30 dark:bg-brand-charcoal/90">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-brand-stone hover:text-brand-gold transition-colors">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-semibold tracking-wider text-brand-stone dark:text-brand-ivory/60 uppercase">Sinergi Visi Ecommerce</span>
                    </div>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
