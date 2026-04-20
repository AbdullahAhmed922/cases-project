'use client';

import { useRouter } from 'next/navigation';
import { useLogin } from '../hooks/useLogin';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
    const router = useRouter();
    const mutation = useLogin();
    const [error, setError] = useState('');
    const { login, isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.push('/');
        }
    }, [isLoading, isAuthenticated, router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const form = e.target as HTMLFormElement;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const data = await mutation.mutateAsync({ email, password });
            login(data.access_token);
            router.push('/');
        } catch (err) {
            console.error('Login failed', err);
            setError('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <div className="w-full max-w-md">
                {/* Branding */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-200/50">
                            <span className="text-white font-bold text-xl">CM</span>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">CaseManager</h1>
                    <p className="text-muted-foreground mt-1 text-sm">Legal Management System</p>
                </div>

                {/* Card */}
                <div className="glass border border-border/50 rounded-2xl shadow-xl p-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-foreground">Sign in</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Enter your credentials to access your account
                        </p>
                    </div>

                    {error && (
                        <div className="bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded-lg mb-6 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition duration-200 shadow-md shadow-indigo-200/50"
                        >
                            {mutation.isPending ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <p className="text-muted-foreground text-sm text-center mt-6">
                        Don&apos;t have an account?{' '}
                        <button
                            onClick={() => router.push('/register')}
                            className="text-primary hover:text-primary/80 font-medium transition"
                        >
                            Register
                        </button>
                    </p>
                </div>

                <div className="text-center mt-6 text-sm text-muted-foreground">
                    © 2024 CaseManager. All rights reserved.
                </div>
            </div>
        </div>
    );
}