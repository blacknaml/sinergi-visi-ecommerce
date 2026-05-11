import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth, claims }) {
    return (
        <AdminLayout auth={auth}>
            <Head title="Laporan Claim" />

            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white">Laporan Claim (AI-Integrated)</h1>
                    <p className="text-gray-500">Daftar klaim yang masuk dan dianalisis melalui sistem Sinergi Visi AI.</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.989-2.386l-.548-.547z" />
                    </svg>
                </div>
            </div>

            <div className="overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                    <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        <tr>
                            <th className="px-6 py-4">ID Klaim</th>
                            <th className="px-6 py-4">Nomor Order</th>
                            <th className="px-6 py-4">Pelanggan</th>
                            <th className="px-6 py-4">Jenis & Alasan</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Tanggal Masuk</th>
                            <th className="px-6 py-4">Analisis AI</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {claims.length > 0 ? claims.map((claim) => (
                            <tr key={claim.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4 font-mono text-xs">#CLM-{claim.id.toString().padStart(4, '0')}</td>
                                <td className="px-6 py-4">
                                    <div className="font-bold text-gray-900 dark:text-white">{claim.order.order_number}</div>
                                    <div className="text-xs text-gray-400">Rp {new Intl.NumberFormat('id-ID').format(claim.order.total_price)}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900 dark:text-white">{claim.order.user.name}</div>
                                    <div className="text-xs text-gray-400">{claim.order.user.email}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-black uppercase mb-1 ${
                                        claim.type === 'refund' ? 'bg-red-100 text-red-600 dark:bg-red-900/20' : 'bg-orange-100 text-orange-600 dark:bg-orange-900/20'
                                    }`}>
                                        {claim.type}
                                    </span>
                                    <p className="line-clamp-2 max-w-xs">{claim.reason}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                                        claim.status === 'pending' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20' :
                                        claim.status === 'approved' ? 'bg-green-100 text-green-600 dark:bg-green-900/20' :
                                        'bg-gray-100 text-gray-600 dark:bg-gray-800'
                                    }`}>
                                        {claim.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {new Date(claim.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                        <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></div>
                                        <span className="text-xs font-bold">Terintegrasi AI</span>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="7" className="px-6 py-20 text-center">
                                    <div className="flex flex-col items-center justify-center text-gray-400">
                                        <svg className="h-12 w-12 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p className="italic">Belum ada data klaim yang diproses oleh AI.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
