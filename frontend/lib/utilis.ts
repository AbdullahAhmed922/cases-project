import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs:ClassValue[]){
    return twMerge(clsx(inputs));   
}

export const fetchWithToken = async ( url:string, options:RequestInit = {})=>{
    const token = localStorage.getItem('token');
    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
    }
    const res = await fetch (url, { ...options, headers})
    if (!res.ok)   {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || 'An error occurred');
    }
    return res.json()
}
