import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth, claims }) {
    return (
        <AdminLayout auth={auth}>
            <Head title="Laporan Claim" />

            <div className="mb-8 flex items-center justify-between border-b border-brand-border pb-4 dark:border-brand-charcoal/30">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-brand-charcoal dark:text-brand-ivory">Laporan Claim (AI-Integrated)</h1>
                    <p className="text-sm text-brand-stone dark:text-brand-ivory/50">Daftar klaim yang masuk dan dianalisis melalui sistem Sinergi Visi AI.</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-sand text-brand-gold dark:bg-brand-charcoal/50">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.989-2.386l-.548-.547z" />
                    </svg>
                </div>
            </div>

            <div className="overflow-hidden rounded-3xl bg-white border border-brand-border shadow-sm dark:bg-[#252523] dark:border-brand-stone/30">
                <table className="w-full text-left text-sm text-brand-stone dark:text-brand-ivory/60">
                    <thead className="bg-brand-sand text-xs font-bold uppercase tracking-wider text-brand-charcoal dark:bg-brand-charcoal/75 dark:text-brand-ivory">
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
                    <tbody className="divide-y divide-brand-border dark:divide-brand-charcoal/30">
                        {claims.length > 0 ? claims.map((claim) => (
                            <tr key={claim.id} className="hover:bg-brand-sand/30 dark:hover:bg-brand-charcoal/30 transition-colors">
                                <td className="px-6 py-4 font-mono text-xs text-brand-stone dark:text-brand-ivory/60">#CLM-{claim.id.toString().padStart(4, '0')}</td>
                                <td className="px-6 py-4">
                                    <div className="font-bold text-brand-charcoal dark:text-brand-ivory">{claim.order.order_number}</div>
                                    <div className="text-xs text-brand-stone dark:text-brand-ivory/40 mt-0.5">Rp {new Intl.NumberFormat('id-ID').format(claim.order.total_price)}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-semibold text-brand-charcoal dark:text-brand-ivory">{claim.order.user.name}</div>
                                    <div className="text-xs text-brand-stone dark:text-brand-ivory/40 mt-0.5">{claim.order.user.email}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-block rounded px-2.5 py-0.5 text-[10px] font-bold uppercase mb-1.5 ${
                                        claim.type === 'refund' ? 'bg-red-100 text-red-700 dark:bg-red-950/20 dark:text-red-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400'
                                    }`}>
                                        {claim.type}
                                    </span>
                                    <p className="line-clamp-2 max-w-xs text-xs leading-relaxed">{claim.reason}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
                                        claim.status === 'pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400' :
                                        claim.status === 'approved' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400' :
                                        'bg-brand-sand text-brand-stone dark:bg-brand-charcoal/50'
                                    }`}>
                                        {claim.status === 'pending' ? 'Menunggu' :
                                         claim.status === 'approved' ? 'Disetujui' :
                                         claim.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-xs">
                                    {new Date(claim.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-brand-gold">
                                        <div className="h-2 w-2 rounded-full bg-brand-gold animate-pulse"></div>
                                        <span className="text-xs font-bold uppercase tracking-wider">Terintegrasi AI</span>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="7" className="px-6 py-20 text-center">
                                    <div className="flex flex-col items-center justify-center text-brand-stone dark:text-brand-ivory/40">
                                        <svg className="h-12 w-12 mb-4 opacity-30 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p className="italic text-sm">Belum ada data klaim yang diproses oleh AI.</p>
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
