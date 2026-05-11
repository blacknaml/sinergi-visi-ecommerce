import { useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function AddressManagement({ addresses }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        address_line: '',
        city: '',
        state: '',
        postal_code: ''
    });

    const [isAdding, setIsAdding] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('profile.address.store'), {
            onSuccess: () => {
                setIsAdding(false);
                reset();
            }
        });
    };

    return (
        <section className="space-y-6">
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Alamat Pengiriman</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Kelola alamat pengiriman Anda.</p>
            </header>

            <div className="space-y-4">
                {addresses.map((address) => (
                    <div key={address.id} className={`p-4 rounded-xl border ${address.is_default ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'} flex justify-between items-center`}>
                        <div>
                            <p className="font-bold text-gray-900 dark:text-white">{address.address_line}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{address.city}, {address.state} {address.postal_code}</p>
                            {address.is_default && <span className="text-xs font-bold text-blue-600 uppercase mt-1 inline-block">Default</span>}
                        </div>
                        <div className="flex gap-2">
                            {!address.is_default && (
                                <button onClick={() => router.patch(route('profile.address.default', address.id))} className="text-sm font-medium text-blue-600 hover:underline">Set Default</button>
                            )}
                            <button onClick={() => router.delete(route('profile.address.destroy', address.id))} className="text-sm font-medium text-red-600 hover:underline">Hapus</button>
                        </div>
                    </div>
                ))}

                {!isAdding ? (
                    <button onClick={() => setIsAdding(true)} className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
                        Tambah Alamat Baru
                    </button>
                ) : (
                    <form onSubmit={submit} className="mt-6 space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                        <div>
                            <label className="block font-medium text-sm text-gray-700 dark:text-gray-300">Alamat Lengkap</label>
                            <input type="text" value={data.address_line} onChange={(e) => setData('address_line', e.target.value)} className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm mt-1 block w-full" />
                            {errors.address_line && <p className="text-sm text-red-600 mt-2">{errors.address_line}</p>}
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block font-medium text-sm text-gray-700 dark:text-gray-300">Kota</label>
                                <input type="text" value={data.city} onChange={(e) => setData('city', e.target.value)} className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm mt-1 block w-full" />
                                {errors.city && <p className="text-sm text-red-600 mt-2">{errors.city}</p>}
                            </div>
                            <div>
                                <label className="block font-medium text-sm text-gray-700 dark:text-gray-300">Provinsi</label>
                                <input type="text" value={data.state} onChange={(e) => setData('state', e.target.value)} className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm mt-1 block w-full" />
                                {errors.state && <p className="text-sm text-red-600 mt-2">{errors.state}</p>}
                            </div>
                            <div>
                                <label className="block font-medium text-sm text-gray-700 dark:text-gray-300">Kode Pos</label>
                                <input type="text" value={data.postal_code} onChange={(e) => setData('postal_code', e.target.value)} className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm mt-1 block w-full" />
                                {errors.postal_code && <p className="text-sm text-red-600 mt-2">{errors.postal_code}</p>}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button type="submit" disabled={processing} className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
                                Simpan Alamat
                            </button>
                            <button type="button" onClick={() => setIsAdding(false)} className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150">
                                Batal
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
}
