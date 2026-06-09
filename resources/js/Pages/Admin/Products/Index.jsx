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

            <div className="mb-8 flex items-center justify-between border-b border-brand-border pb-4 dark:border-brand-charcoal/30">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-brand-charcoal dark:text-brand-ivory">Manajemen Produk</h1>
                    <p className="text-sm text-brand-stone dark:text-brand-ivory/50">Kelola katalog produk Sinergi Visi Ecommerce.</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="inline-flex items-center justify-center rounded-xl bg-brand-gold px-5 py-3 text-xs font-bold text-white shadow-md shadow-brand-gold/20 transition-all hover:bg-brand-gold-dark active:scale-[0.98]"
                >
                    + Tambah Produk
                </button>
            </div>

            <div className="overflow-hidden rounded-3xl bg-white border border-brand-border shadow-sm dark:bg-[#252523] dark:border-brand-stone/30">
                <table className="w-full text-left text-sm text-brand-stone dark:text-brand-ivory/60">
                    <thead className="bg-brand-sand text-xs font-bold uppercase tracking-wider text-brand-charcoal dark:bg-brand-charcoal/75 dark:text-brand-ivory">
                        <tr>
                            <th className="px-6 py-4">Gambar</th>
                            <th className="px-6 py-4">Nama Produk</th>
                            <th className="px-6 py-4">Kategori</th>
                            <th className="px-6 py-4">Harga</th>
                            <th className="px-6 py-4">Stok</th>
                            <th className="px-6 py-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border dark:divide-brand-charcoal/30">
                        {products && products.length > 0 ? products.map((product) => (
                            <tr key={product.id} className="hover:bg-brand-sand/30 dark:hover:bg-brand-charcoal/30 transition-colors">
                                <td className="px-6 py-4">
                                    {product.main_image ? (
                                        <img src={`/storage/${product.main_image}`} alt={product.name} className="h-12 w-12 rounded object-cover border border-brand-border dark:border-brand-charcoal/30" />
                                    ) : (
                                        <div className="h-12 w-12 rounded bg-brand-sand flex items-center justify-center text-xs text-brand-gold font-bold">No Img</div>
                                    )}
                                </td>
                                <td className="px-6 py-4 font-bold text-brand-charcoal dark:text-brand-ivory">{product.name}</td>
                                <td className="px-6 py-4">{product.category ? product.category.name : '-'}</td>
                                <td className="px-6 py-4 font-semibold text-brand-charcoal dark:text-brand-ivory">Rp {new Intl.NumberFormat('id-ID').format(product.price)}</td>
                                <td className="px-6 py-4">{product.stock}</td>
                                <td className="px-6 py-4">
                                    <button 
                                        onClick={() => openEditModal(product)}
                                        className="text-brand-gold hover:text-brand-gold-dark mr-4 font-bold transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => deleteProduct(product.id)}
                                        className="text-red-600 hover:text-red-800 font-bold transition-colors"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-8 text-center text-brand-stone dark:text-brand-ivory/50">Belum ada produk.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-charcoal/50 p-4 backdrop-blur-sm overflow-y-auto pt-24 pb-12">
                    <div className="w-full max-w-lg rounded-3xl bg-white border border-brand-border p-8 dark:bg-brand-charcoal dark:border-brand-charcoal/50 shadow-2xl my-auto">
                        <h2 className="mb-6 font-serif text-2xl font-bold text-brand-charcoal dark:text-brand-ivory">
                            {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
                        </h2>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-stone dark:text-brand-ivory/60 mb-2">Upload Gambar Baru (Bisa lebih dari satu)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => setData('images', Array.from(e.target.files))}
                                    className="mt-1 w-full text-xs text-brand-stone file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-brand-sand file:text-brand-gold hover:file:bg-brand-gold hover:file:text-white transition-all cursor-pointer"
                                />
                                {errors.images && <p className="mt-1 text-xs text-red-500">{errors.images}</p>}
                                
                                {/* New Uploads Preview & Main Select */}
                                {data.images && data.images.length > 0 && !editingProduct && (
                                    <div className="mt-4 grid grid-cols-3 gap-4">
                                        {Array.from(data.images).map((file, idx) => (
                                            <div key={idx} className={`relative rounded-xl border-2 p-2 ${data.main_image_index === idx ? 'border-brand-gold bg-brand-sand/30' : 'border-brand-border dark:border-brand-charcoal/30'}`}>
                                                <img src={URL.createObjectURL(file)} className="h-24 w-full object-cover rounded-lg" alt="preview" />
                                                <label className="mt-2 flex items-center gap-2 text-[10px] font-bold text-brand-stone dark:text-brand-ivory/60 cursor-pointer">
                                                    <input 
                                                        type="radio" 
                                                        name="main_image_new" 
                                                        checked={data.main_image_index === idx}
                                                        onChange={() => setData('main_image_index', idx)}
                                                        className="text-brand-gold focus:ring-brand-gold"
                                                    />
                                                    Utama
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                
                                {/* Existing Images Management (Edit Mode) */}
                                {editingProduct && editingProduct.images && editingProduct.images.length > 0 && (
                                    <div className="mt-6">
                                        <p className="text-xs font-bold uppercase tracking-wider text-brand-stone dark:text-brand-ivory/60 mb-3">Gambar Saat Ini:</p>
                                        <div className="grid grid-cols-4 gap-4">
                                            {editingProduct.images.map(img => (
                                                <div key={img.id} className={`relative rounded-xl border-2 p-2 ${data.main_image_id === img.id || (img.is_main && !data.main_image_id) ? 'border-brand-gold bg-brand-sand/30' : 'border-brand-border dark:border-brand-charcoal/30'}`}>
                                                    <img src={`/storage/${img.image_path}`} className="h-20 w-full object-cover rounded-lg" alt="saved" />
                                                    <label className="mt-2 flex items-center gap-1 text-[10px] font-bold text-brand-stone dark:text-brand-ivory/60 cursor-pointer">
                                                        <input 
                                                            type="radio" 
                                                            name="main_image_exist" 
                                                            checked={data.main_image_id === img.id || (img.is_main && !data.main_image_id)}
                                                            onChange={() => setData('main_image_id', img.id)}
                                                            className="text-brand-gold focus:ring-brand-gold"
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
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-stone dark:text-brand-ivory/60">Nama Produk</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1.5 w-full rounded-xl border-brand-border dark:border-brand-charcoal/50 dark:bg-brand-charcoal dark:text-brand-ivory focus:border-brand-gold focus:ring-brand-gold"
                                />
                                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-stone dark:text-brand-ivory/60">Harga</label>
                                    <input
                                        type="number"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        className="mt-1.5 w-full rounded-xl border-brand-border dark:border-brand-charcoal/50 dark:bg-brand-charcoal dark:text-brand-ivory focus:border-brand-gold focus:ring-brand-gold"
                                    />
                                    {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-stone dark:text-brand-ivory/60">Stok</label>
                                    <input
                                        type="number"
                                        value={data.stock}
                                        onChange={(e) => setData('stock', e.target.value)}
                                        className="mt-1.5 w-full rounded-xl border-brand-border dark:border-brand-charcoal/50 dark:bg-brand-charcoal dark:text-brand-ivory focus:border-brand-gold focus:ring-brand-gold"
                                    />
                                    {errors.stock && <p className="mt-1 text-xs text-red-500">{errors.stock}</p>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-stone dark:text-brand-ivory/60">Kategori</label>
                                <select
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    className="mt-1.5 w-full rounded-xl border-brand-border dark:border-brand-charcoal/50 dark:bg-brand-charcoal dark:text-brand-ivory focus:border-brand-gold focus:ring-brand-gold"
                                >
                                    <option value="">Pilih Kategori</option>
                                    {categories && categories.length > 0 ? categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    )) : null}
                                </select>
                                {errors.category_id && <p className="mt-1 text-xs text-red-500">{errors.category_id}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-stone dark:text-brand-ivory/60">Deskripsi</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows="3"
                                    className="mt-1.5 w-full rounded-xl border-brand-border dark:border-brand-charcoal/50 dark:bg-brand-charcoal dark:text-brand-ivory focus:border-brand-gold focus:ring-brand-gold"
                                    placeholder="Tulis deskripsi produk di sini..."
                                ></textarea>
                                {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-brand-border dark:border-brand-charcoal/30">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingProduct(null);
                                    }}
                                    className="rounded-xl px-5 py-2.5 text-xs font-bold text-brand-stone hover:bg-brand-sand dark:hover:bg-brand-charcoal/80 dark:text-brand-ivory/60 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-xl bg-brand-gold px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-brand-gold/20 hover:bg-brand-gold-dark transition-colors"
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
