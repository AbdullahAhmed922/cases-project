import { useMutation } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

const loginUser = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || 'Invalid email or password');
    }
    return res.json();
}

export const useLogin = () => {
    return useMutation({
        mutationFn: ({ email, password }: { email: string, password: string }) => loginUser(email, password),
    });
}