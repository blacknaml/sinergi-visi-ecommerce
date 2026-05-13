import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, products, categories }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const { data, setData, post, processing, reset, errors, clearErrors } = useForm({
        name: '',
        price: '',
        stock: '',
        category_id: '',
        description: '',
        image: null,
        _method: 'post'
    });

    const openCreateModal = () => {
        setEditingProduct(null);
        reset();
        setData('_method', 'post');
        clearErrors();
        setIsModalOpen(true);
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setData({
            name: product.name,
            price: product.price,
            stock: product.stock,
            category_id: product.category_id || '',
            description: product.description || '',
            image: null,
            _method: 'patch'
        });
        clearErrors();
        setIsModalOpen(true);
    };

    const submit = (e) => {
        e.preventDefault();
        
        if (editingProduct) {
            post(route('admin.products.update', editingProduct.id), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    setEditingProduct(null);
                    reset();
                }
            });
        } else {
            post(route('admin.products.store'), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                }
            });
        }
    };

    const deleteProduct = (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            router.delete(route('admin.products.destroy', id));
        }
    };

    const deleteImage = (imageId) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus gambar ini?')) {
            router.delete(route('admin.products.images.destroy', imageId), {
                onSuccess: () => {
                    // Update editingProduct state to remove the deleted image from UI
                    if (editingProduct) {
                        setEditingProduct({
                            ...editingProduct,
                            images: editingProduct.images.filter(img => img.id !== imageId)
                        });
                    }
                }
            });
        }
    };

    return (
        <AdminLayout auth={auth}>
            <Head title="Manajemen Produk" />

            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white">Manajemen Produk</h1>
                    <p className="text-gray-500">Kelola katalog produk Sinergi Visi Ecommerce.</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700"
                >
                    + Tambah Produk
                </button>
            </div>

            <div className="overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-gray-900">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                    <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        <tr>
                            <th className="px-6 py-4">Gambar</th>
                            <th className="px-6 py-4">Nama Produk</th>
                            <th className="px-6 py-4">Kategori</th>
                            <th className="px-6 py-4">Harga</th>
                            <th className="px-6 py-4">Stok</th>
                            <th className="px-6 py-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {products && products.length > 0 ? products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <td className="px-6 py-4">
                                    {product.main_image ? (
                                        <img src={`/storage/${product.main_image}`} alt={product.name} className="h-12 w-12 rounded object-cover" />
                                    ) : (
                                        <div className="h-12 w-12 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-400">No Img</div>
                                    )}
                                </td>
                                <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{product.name}</td>
                                <td className="px-6 py-4">{product.category ? product.category.name : '-'}</td>
                                <td className="px-6 py-4">Rp {product.price}</td>
                                <td className="px-6 py-4">{product.stock}</td>
                                <td className="px-6 py-4">
                                    <button 
                                        onClick={() => openEditModal(product)}
                                        className="text-blue-600 hover:underline mr-3 font-medium"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => deleteProduct(product.id)}
                                        className="text-red-600 hover:underline font-medium"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center">Belum ada produk.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm overflow-y-auto pt-24 pb-12">
                    <div className="w-full max-w-md rounded-3xl bg-white p-8 dark:bg-gray-900 my-auto">
                        <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                            {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
                        </h2>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Upload Gambar Baru (Bisa lebih dari satu)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => setData('images', Array.from(e.target.files))}
                                    className="mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                {errors.images && <p className="mt-1 text-xs text-red-500">{errors.images}</p>}
                                
                                {/* New Uploads Preview & Main Select */}
                                {data.images && data.images.length > 0 && !editingProduct && (
                                    <div className="mt-4 grid grid-cols-3 gap-4">
                                        {Array.from(data.images).map((file, idx) => (
                                            <div key={idx} className={`relative rounded-xl border-2 p-2 ${data.main_image_index === idx ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                                                <img src={URL.createObjectURL(file)} className="h-24 w-full object-cover rounded-lg" alt="preview" />
                                                <label className="mt-2 flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                                                    <input 
                                                        type="radio" 
                                                        name="main_image_new" 
                                                        checked={data.main_image_index === idx}
                                                        onChange={() => setData('main_image_index', idx)}
                                                        className="text-blue-600 focus:ring-blue-500"
                                                    />
                                                    Jadikan Utama
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                
                                {/* Existing Images Management (Edit Mode) */}
                                {editingProduct && editingProduct.images && editingProduct.images.length > 0 && (
                                    <div className="mt-6">
                                        <p className="text-sm font-bold text-gray-700 mb-2">Gambar Saat Ini:</p>
                                        <div className="grid grid-cols-4 gap-4">
                                            {editingProduct.images.map(img => (
                                                <div key={img.id} className={`relative rounded-xl border-2 p-2 ${data.main_image_id === img.id || (img.is_main && !data.main_image_id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                                                    <img src={`/storage/${img.image_path}`} className="h-20 w-full object-cover rounded-lg" alt="saved" />
                                                    <label className="mt-2 flex items-center gap-1 text-[10px] font-bold text-gray-700 cursor-pointer">
                                                        <input 
                                                            type="radio" 
                                                            name="main_image_exist" 
                                                            checked={data.main_image_id === img.id || (img.is_main && !data.main_image_id)}
                                                            onChange={() => setData('main_image_id', img.id)}
                                                            className="text-blue-600 focus:ring-blue-500"
                                                        />
                                                        Utama
                                                    </label>
                                                    <button 
                                                        type="button"
                                                        onClick={() => deleteImage(img.id)}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs shadow hover:bg-red-600"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Produk</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 w-full rounded-xl border-gray-200 dark:border-gray-800 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-blue-500"
                                />
                                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Harga</label>
                                    <input
                                        type="number"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        className="mt-1 w-full rounded-xl border-gray-200 dark:border-gray-800 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stok</label>
                                    <input
                                        type="number"
                                        value={data.stock}
                                        onChange={(e) => setData('stock', e.target.value)}
                                        className="mt-1 w-full rounded-xl border-gray-200 dark:border-gray-800 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errors.stock && <p className="mt-1 text-xs text-red-500">{errors.stock}</p>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Kategori</label>
                                <select
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    className="mt-1 w-full rounded-xl border-gray-200 dark:border-gray-800 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="">Pilih Kategori</option>
                                    {categories && categories.length > 0 ? categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    )) : null}
                                </select>
                                {errors.category_id && <p className="mt-1 text-xs text-red-500">{errors.category_id}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows="3"
                                    className="mt-1 w-full rounded-xl border-gray-200 dark:border-gray-800 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Tulis deskripsi produk di sini..."
                                ></textarea>
                                {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingProduct(null);
                                    }}
                                    className="rounded-xl px-4 py-2 text-sm font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-xl bg-blue-600 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-blue-200"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
