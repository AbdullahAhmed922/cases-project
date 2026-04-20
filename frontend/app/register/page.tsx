'use client';

import { useRouter } from 'next/navigation';
import { useRegister } from '../hooks/useRegister';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
    const router = useRouter();
    const mutation = useRegister();
    const [error, setError] = useState('');
    const { login, isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.push('/');
        }
    }, [isLoading, isAuthenticated, router]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const form = e.target as HTMLFormElement;
        const name = (form.elements.namedItem('name') as HTMLInputElement).value;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;
        const role = (form.elements.namedItem('role') as HTMLSelectElement).value;
        const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;

        try {
            const data = await mutation.mutateAsync({ name, email, password, role, phone });
            login(data.access_token);
            router.push('/');
        } catch (err) {
            console.error('Registration failed', err);
            setError('Registration failed. Please try again.');
        }
    };

    const inputClass = "w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 p-4">
            <div className="w-full max-w-md">
                {/* Branding */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-200/50">
                            <span className="text-white font-bold text-xl">CM</span>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">CaseManager</h1>
                    <p className="text-muted-foreground mt-1 text-sm">Create your account</p>
                </div>

                {/* Card */}
                <div className="glass border border-border/50 rounded-2xl shadow-xl p-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-foreground">Sign Up</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Fill in your details to get started
                        </p>
                    </div>

                    {error && (
                        <div className="bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded-lg mb-6 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                                Name
                            </label>
                            <input id="name" name="name" type="text" required placeholder="John Doe" className={inputClass} />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                Email
                            </label>
                            <input id="email" name="email" type="email" required placeholder="you@example.com" className={inputClass} />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                                Password
                            </label>
                            <input id="password" name="password" type="password" required placeholder="••••••••" className={inputClass} />
                        </div>
                        
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-foreground mb-2">
                                Role
                            </label>
                            <select id="role" name="role" required className={inputClass}>
                                <option value="user">User</option>
                                <option value="judge">Judge</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                                Phone
                            </label>
                            <input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" className={inputClass} />
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
                                    Creating account...
                                </span>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <p className="text-muted-foreground text-sm text-center mt-6">
                        Already have an account?{' '}
                        <button
                            onClick={() => router.push('/login')}
                            className="text-primary hover:text-primary/80 font-medium transition"
                        >
                            Sign In
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