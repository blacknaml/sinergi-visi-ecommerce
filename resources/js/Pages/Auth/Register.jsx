import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="mb-6 text-center">
                <h2 className="font-serif text-3xl font-bold text-brand-charcoal dark:text-brand-ivory">Buat Akun Baru</h2>
                <p className="text-sm text-brand-stone dark:text-brand-ivory/50 mt-1">Daftar untuk mulai berbelanja di Sinergi Visi</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap" className="font-bold text-brand-charcoal dark:text-brand-ivory/80" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full rounded-xl border-brand-border focus:border-brand-gold focus:ring-brand-gold bg-white/50 dark:bg-brand-charcoal/50 dark:border-brand-charcoal/30 dark:text-brand-ivory backdrop-blur-sm transition-all"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        placeholder="John Doe"
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" className="font-bold text-brand-charcoal dark:text-brand-ivory/80" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-xl border-brand-border focus:border-brand-gold focus:ring-brand-gold bg-white/50 dark:bg-brand-charcoal/50 dark:border-brand-charcoal/30 dark:text-brand-ivory backdrop-blur-sm transition-all"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
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
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        placeholder="Minimal 8 karakter"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Konfirmasi Password"
                        className="font-bold text-brand-charcoal dark:text-brand-ivory/80"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full rounded-xl border-brand-border focus:border-brand-gold focus:ring-brand-gold bg-white/50 dark:bg-brand-charcoal/50 dark:border-brand-charcoal/30 dark:text-brand-ivory backdrop-blur-sm transition-all"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                        placeholder="Ulangi password Anda"
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-6">
                    <button
                        className={`w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-brand-gold/10 text-sm font-bold text-white bg-brand-gold hover:bg-brand-gold-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold transition-all transform active:scale-[0.98] ${
                            processing && 'opacity-75 cursor-not-allowed'
                        }`}
                        disabled={processing}
                    >
                        {processing ? 'Memproses...' : 'Daftar Sekarang'}
                    </button>
                </div>

                <div className="mt-6 text-center text-sm text-brand-stone dark:text-brand-ivory/60">
                    Sudah punya akun?{' '}
                    <Link
                        href={route('login')}
                        className="font-bold text-brand-gold hover:text-brand-gold-dark transition-all"
                    >
                        Masuk di sini
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
