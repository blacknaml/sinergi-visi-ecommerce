import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-brand-gold">
                    {status}
                </div>
            )}

            <div className="mb-6 text-center">
                <h2 className="font-serif text-3xl font-bold text-brand-charcoal dark:text-brand-ivory">Selamat Datang Kembali</h2>
                <p className="text-sm text-brand-stone dark:text-brand-ivory/50 mt-1">Silakan masuk ke akun Anda untuk melanjutkan</p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="email" value="Email" className="font-bold text-brand-charcoal dark:text-brand-ivory/80" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-xl border-brand-border focus:border-brand-gold focus:ring-brand-gold bg-white/50 dark:bg-brand-charcoal/50 dark:border-brand-charcoal/30 dark:text-brand-ivory backdrop-blur-sm transition-all"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="nama@email.com"
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password" className="font-bold text-brand-charcoal dark:text-brand-ivory/80" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full rounded-xl border-brand-border focus:border-brand-gold focus:ring-brand-gold bg-white/50 dark:bg-brand-charcoal/50 dark:border-brand-charcoal/30 dark:text-brand-ivory backdrop-blur-sm transition-all"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="••••••••"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                            className="rounded border-brand-border text-brand-gold focus:ring-brand-gold dark:bg-brand-charcoal/50"
                        />
                        <span className="ms-2 text-sm text-brand-stone dark:text-brand-ivory/70 font-medium">
                            Ingat saya
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-brand-gold font-bold hover:text-brand-gold-dark transition-all"
                        >
                            Lupa password?
                        </Link>
                    )}
                </div>

                <div className="mt-6">
                    <button
                        className={`w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-brand-gold/10 text-sm font-bold text-white bg-brand-gold hover:bg-brand-gold-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold transition-all transform active:scale-[0.98] ${
                            processing && 'opacity-75 cursor-not-allowed'
                        }`}
                        disabled={processing}
                    >
                        {processing ? 'Memproses...' : 'Masuk Sekarang'}
                    </button>
                </div>

                <div className="mt-6 text-center text-sm text-brand-stone dark:text-brand-ivory/60">
                    Belum punya akun?{' '}
                    <Link href={route('register')} className="font-bold text-brand-gold hover:text-brand-gold-dark transition-all">
                        Daftar di sini
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
