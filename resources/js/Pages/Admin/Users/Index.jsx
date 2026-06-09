import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth, users }) {
    return (
        <AdminLayout auth={auth}>
            <Head title="Manajemen User" />

            <div className="mb-8 border-b border-brand-border pb-4 dark:border-brand-charcoal/30">
                <h1 className="font-serif text-3xl font-bold text-brand-charcoal dark:text-brand-ivory">Manajemen User</h1>
                <p className="text-sm text-brand-stone dark:text-brand-ivory/50">Kelola pembeli yang terdaftar di Sinergi Visi Ecommerce.</p>
            </div>

            <div className="overflow-hidden rounded-3xl bg-white border border-brand-border shadow-sm dark:bg-[#252523] dark:border-brand-stone/30">
                <table className="w-full text-left text-sm text-brand-stone dark:text-brand-ivory/60">
                    <thead className="bg-brand-sand text-xs font-bold uppercase tracking-wider text-brand-charcoal dark:bg-brand-charcoal/75 dark:text-brand-ivory">
                        <tr>
                            <th className="px-6 py-4">Nama</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Telepon</th>
                            <th className="px-6 py-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border dark:divide-brand-charcoal/30">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-brand-sand/30 dark:hover:bg-brand-charcoal/30 transition-colors">
                                <td className="px-6 py-4 font-bold text-brand-charcoal dark:text-brand-ivory">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.phone || '-'}</td>
                                <td className="px-6 py-4">
                                    <button className="text-brand-gold hover:text-brand-gold-dark font-bold mr-4 transition-colors">Profil</button>
                                    <button className="text-red-600 hover:text-red-800 font-bold transition-colors">Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
