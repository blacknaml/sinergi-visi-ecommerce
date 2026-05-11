import { Link } from '@inertiajs/react';

export default function ProductCard({ product }) {
    return (
        <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-gray-800">
            <div className="aspect-square overflow-hidden">
                <img
                    src={product.main_image ? `/storage/${product.main_image}` : 'https://via.placeholder.com/400'}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <div className="p-5">
                <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-900 dark:text-blue-200">
                        {product.category?.name}
                    </span>
                    <div className="flex items-center text-yellow-400">
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <span className="ml-1 text-sm font-semibold text-gray-600 dark:text-gray-300">{product.rating}</span>
                    </div>
                </div>
                <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">{product.name}</h3>
                <p className="mb-4 text-sm text-gray-500 line-clamp-2 dark:text-gray-400">
                    {product.description}
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-xl font-extrabold text-gray-900 dark:text-white">
                        Rp {new Intl.NumberFormat('id-ID').format(product.price)}
                    </span>
                    <Link
                        href={route('products.show', product.id)}
                        className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                    >
                        Detail
                    </Link>
                </div>
            </div>
        </div>
    );
}
