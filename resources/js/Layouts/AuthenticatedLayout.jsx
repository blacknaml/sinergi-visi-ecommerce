import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-brand-ivory dark:bg-brand-charcoal">
            <nav className="sticky top-0 z-50 border-b border-brand-border bg-brand-ivory/80 backdrop-blur-md dark:border-brand-charcoal/30 dark:bg-brand-charcoal/90 shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="flex items-center gap-2">
                                    <ApplicationLogo className="h-9 w-9" />
                                    <span className="hidden sm:block text-xl font-black tracking-tight text-brand-charcoal dark:text-brand-ivory">
                                        SINERGI<span className="text-brand-gold">VISI</span>
                                    </span>
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                    className="font-bold hover:text-brand-gold transition-colors"
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    href={route('products.index')}
                                    active={route().current('products.*')}
                                    className="font-bold hover:text-brand-gold transition-colors"
                                >
                                    Katalog Produk
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            {/* Cart Icon */}
                            <Link
                                href={route('cart.index')}
                                className="mr-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-sand text-brand-stone transition-all hover:bg-brand-gold hover:text-white dark:bg-brand-charcoal/50 dark:text-brand-ivory/60 dark:hover:bg-brand-gold dark:hover:text-white"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </Link>

                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-xl border border-brand-border bg-brand-sand/60 px-4 py-2 text-sm font-bold leading-4 text-brand-charcoal transition duration-150 ease-in-out hover:bg-brand-sand hover:text-brand-gold focus:outline-none dark:border-brand-charcoal/30 dark:bg-brand-charcoal/50 dark:text-brand-ivory dark:hover:text-brand-gold"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                            className="font-bold text-gray-700"
                                        >
                                            Profil Saya
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('orders.index')}
                                            className="font-bold text-gray-700"
                                        >
                                            Pesanan Saya
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="font-bold text-red-600 hover:text-red-700"
                                        >
                                            Keluar
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center gap-2 sm:hidden">
                            <Link
                                href={route('cart.index')}
                                className="flex h-10 w-10 items-center justify-center rounded-md text-brand-stone hover:bg-brand-sand hover:text-brand-gold"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </Link>

                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden border-t border-brand-border bg-brand-ivory'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                            className="font-bold"
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('products.index')}
                            active={route().current('products.*')}
                            className="font-bold"
                        >
                            Katalog Produk
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-bold text-gray-800">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')} className="font-bold text-gray-700">
                                Profil Saya
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('orders.index')} className="font-bold text-gray-700">
                                Pesanan Saya
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                                className="font-bold text-red-600"
                            >
                                Keluar
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-brand-sand/50 backdrop-blur-sm border-b border-brand-border shadow-sm dark:bg-brand-charcoal/50 dark:border-brand-charcoal/30">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
