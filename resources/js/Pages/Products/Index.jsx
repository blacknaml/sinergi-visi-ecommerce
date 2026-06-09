import { Head, Link, router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import ProductCard from '@/Components/ProductCard';
import { useState } from 'react';

export default function Index({ auth, products, categories, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('products.index'), { search, category }, { preserveState: true });
    };

    const handleCategoryChange = (catName) => {
        const newCat = category === catName ? '' : catName;
        setCategory(newCat);
        router.get(route('products.index'), { search, category: newCat }, { preserveState: true });
    };

    return (
        <div className="min-h-screen bg-brand-ivory dark:bg-brand-charcoal">
            <Head title="Katalog Produk" />
            
            <Navbar auth={auth} />

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-12 border-b border-brand-border pb-6 dark:border-brand-charcoal/30">
                    <h1 className="font-serif text-4xl font-bold text-brand-charcoal dark:text-brand-ivory">Katalog Produk</h1>
                    <p className="mt-2 text-sm text-brand-stone dark:text-brand-ivory/50">Temukan perlengkapan dapur impian Anda.</p>
                </div>

                <div className="flex flex-col gap-8 lg:flex-row">
                    {/* Filters */}
                    <div className="w-full lg:w-64 shrink-0">
                        <div className="sticky top-24 space-y-8">
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-charcoal dark:text-brand-ivory">Cari Produk</h3>
                                <form onSubmit={handleSearch} className="mt-4">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder="Nama produk..."
                                            className="w-full rounded-xl border-brand-border bg-white/50 backdrop-blur-sm py-2.5 pl-4 pr-10 text-sm focus:border-brand-gold focus:ring-brand-gold dark:border-brand-charcoal/50 dark:bg-brand-charcoal dark:text-brand-ivory"
                                        />
                                        <button type="submit" className="absolute right-3 top-3 text-brand-stone hover:text-brand-gold transition-colors">
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-charcoal dark:text-brand-ivory">Kategori</h3>
                                <div className="mt-4 space-y-2">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => handleCategoryChange(cat.name)}
                                            className={`block w-full text-left rounded-xl px-4 py-3 text-sm transition-all ${
                                                category === cat.name
                                                    ? 'bg-brand-gold font-bold text-white shadow-md shadow-brand-gold/25'
                                                    : 'text-brand-stone hover:bg-brand-sand dark:text-brand-ivory/60 dark:hover:bg-brand-charcoal/50'
                                            }`}
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {products.length > 0 ? (
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                <div className="mb-4 rounded-full bg-brand-sand p-6 dark:bg-brand-charcoal/50">
                                    <svg className="h-12 w-12 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-brand-charcoal dark:text-brand-ivory">Produk tidak ditemukan</h3>
                                <p className="text-sm text-brand-stone dark:text-brand-ivory/50 mt-1">Coba gunakan kata kunci atau kategori lain.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
