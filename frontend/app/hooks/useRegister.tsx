import { useMutation } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

const registerUser = async (name: string , email: string, password: string, role?: string, phone?: string) => {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role ,phone }),
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || 'Invalid registration data');
    }
    return res.json();
}

export const useRegister = () => {
    return useMutation({
        mutationFn: ({ name, email, password, role, phone } : { email: string, password: string, role?: string, name: string, phone?: string }) => registerUser(name, email, password, role, phone),
    });
}