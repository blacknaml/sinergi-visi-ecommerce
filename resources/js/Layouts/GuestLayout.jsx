import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function GuestLayout({ children }) {
    return (
        <div className="relative flex min-h-screen items-center justify-center bg-brand-ivory dark:bg-brand-charcoal overflow-hidden">
            {/* Luxury Ambient Background Elements */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-brand-gold/20 dark:bg-brand-gold/5 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-brand-sand/50 dark:bg-brand-gold/5 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-brand-gold/10 dark:bg-brand-gold/5 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

            <div className="relative w-full max-w-md px-6 z-10">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex flex-col items-center gap-2">
                        <ApplicationLogo className="h-16 w-16" />
                        <span className="text-xs font-semibold tracking-widest uppercase text-brand-stone dark:text-brand-ivory/60">Fine Glassware & Ceramics</span>
                    </Link>
                </div>

                {/* Luxury Glass Container */}
                <div className="overflow-hidden bg-white/80 dark:bg-brand-charcoal/90 backdrop-blur-xl border border-brand-border dark:border-brand-charcoal/50 shadow-xl shadow-brand-gold/5 sm:rounded-3xl p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
