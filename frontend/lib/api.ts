import { Case, User, Assignment } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

function buildUrl(endpoint: string) {
    if (endpoint.startsWith("http")) return endpoint;
    return `${API_URL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;
}

function getAuthHeaders(): Record<string, string> {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
}

async function fetchJson<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const res = await fetch(buildUrl(endpoint), {
        headers: {
            ...getAuthHeaders(),
            ...options?.headers,
        },
        ...options,
    });

    if (res.status === 401) {
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        throw new Error("Unauthorized");
    }

    if (!res.ok) {
        let message = "An error occurred";
        try {
            const error = await res.json();
            message = error.message || message;
        } catch {
        }
        throw new Error(message);
    }

    return res.json();
}

export const api = {
    get: <T>(endpoint: string) => fetchJson<T>(endpoint),
    post: <T, B = unknown>(endpoint: string, body: B) =>
        fetchJson<T>(endpoint, {
            method: "POST",
            body: JSON.stringify(body),
        }),
    patch: <T, B = unknown>(endpoint: string, body: B) =>
        fetchJson<T>(endpoint, {
            method: "PATCH",
            body: JSON.stringify(body),
        }),
    delete: <T>(endpoint: string) =>
        fetchJson<T>(endpoint, {
            method: "DELETE",
        }),
};

export const fetchCases = async ():Promise<Case[]> => api.get<Case[]>("/case");

export const fetchUsers = async ():Promise<User[]> => api.get<User[]>("/user");

export const fetchAssignment = async ():Promise<Assignment[]> => api.get<Assignment[]>("/assignment");
