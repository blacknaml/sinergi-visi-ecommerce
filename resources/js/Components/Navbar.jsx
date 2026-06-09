import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Navbar({ auth }) {
    return (
        <nav className="sticky top-0 z-50 border-b border-brand-border bg-brand-ivory/80 backdrop-blur-md dark:border-brand-charcoal/30 dark:bg-brand-charcoal/90">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-3">
                            <ApplicationLogo className="h-9 w-9" />
                            <span className="hidden sm:block text-xl font-black tracking-tight text-brand-charcoal dark:text-brand-ivory">
                                SINERGI<span className="text-brand-gold">VISI</span>
                            </span>
                        </Link>
                        <div className="hidden md:ml-10 md:flex md:space-x-8">
                            <Link href={route('home')} className="text-sm font-medium text-brand-charcoal/70 hover:text-brand-gold dark:text-brand-ivory/70 dark:hover:text-brand-gold transition-colors">Home</Link>
                            <Link href={route('products.index')} className="text-sm font-medium text-brand-charcoal/70 hover:text-brand-gold dark:text-brand-ivory/70 dark:hover:text-brand-gold transition-colors">Produk</Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <div className="flex items-center gap-4">
                                <Link
                                    href={route('cart.index')}
                                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-sand text-brand-stone transition-all hover:bg-brand-gold hover:text-white dark:bg-brand-charcoal/50 dark:text-brand-ivory/60 dark:hover:bg-brand-gold dark:hover:text-white"
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </Link>
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center justify-center rounded-xl bg-brand-sand px-5 py-2 text-sm font-bold text-brand-charcoal transition-all hover:bg-brand-gold hover:text-white dark:bg-brand-charcoal/50 dark:text-brand-ivory dark:hover:bg-brand-gold"
                                >
                                    Dashboard
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="text-sm font-bold text-brand-charcoal/70 hover:text-brand-gold dark:text-brand-ivory/70 dark:hover:text-brand-gold transition-colors"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center justify-center rounded-xl bg-brand-gold px-5 py-2 text-sm font-bold text-white transition-all hover:bg-brand-gold-dark active:scale-[0.98] shadow-sm shadow-brand-gold/20"
                                >
                                    Daftar
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
