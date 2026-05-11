import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth, users }) {
    return (
        <AdminLayout auth={auth}>
            <Head title="Manajemen User" />

            <div className="mb-8">
                <h1 className="text-2xl font-black text-gray-900 dark:text-white">Manajemen User</h1>
                <p className="text-gray-500">Kelola pembeli yang terdaftar di Sinergi Visi Ecommerce.</p>
            </div>

            <div className="overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-gray-900">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                    <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        <tr>
                            <th className="px-6 py-4">Nama</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Telepon</th>
                            <th className="px-6 py-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.phone || '-'}</td>
                                <td className="px-6 py-4">
                                    <button className="text-blue-600 hover:underline mr-3">Profil</button>
                                    <button className="text-red-600 hover:underline">Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
