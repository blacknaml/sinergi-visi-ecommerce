import { Link } from '@inertiajs/react';

export default function ProductCard({ product }) {
    return (
        <div className="group relative overflow-hidden rounded-2xl bg-white border border-brand-border shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-brand-gold/10 dark:bg-brand-charcoal dark:border-brand-charcoal/50">
            <div className="aspect-square overflow-hidden">
                <img
                    src={product.main_image ? `/storage/${product.main_image}` : 'https://via.placeholder.com/400'}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>
            <div className="p-5">
                <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-full bg-brand-sand px-3 py-1 text-xs font-semibold tracking-wide uppercase text-brand-gold dark:bg-brand-charcoal/50 dark:text-brand-gold">
                        {product.category?.name}
                    </span>
                    <div className="flex items-center text-brand-gold">
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <span className="ml-1 text-sm font-semibold text-brand-stone dark:text-brand-ivory/60">{product.rating}</span>
                    </div>
                </div>
                <h3 className="mb-1 text-lg font-bold text-brand-charcoal dark:text-brand-ivory">{product.name}</h3>
                <p className="mb-4 text-sm text-brand-stone line-clamp-2 dark:text-brand-ivory/50">
                    {product.description}
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-xl font-extrabold text-brand-charcoal dark:text-brand-ivory">
                        Rp {new Intl.NumberFormat('id-ID').format(product.price)}
                    </span>
                    <Link
                        href={route('products.show', product.id)}
                        className="inline-flex items-center justify-center rounded-xl bg-brand-gold px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-gold-dark active:scale-[0.98]"
                    >
                        Detail
                    </Link>
                </div>
            </div>
        </div>
    );
}
