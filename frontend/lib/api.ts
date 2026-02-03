const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const normalizedEndpoint = endpoint.startsWith("http")
        ? endpoint
        : `${API_URL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

    const res = await fetch(normalizedEndpoint, {
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
        ...options,
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "An error occurred");
    }

    return res.json();
}

export const api = {
    get: <T>(endpoint: string) => fetcher<T>(endpoint),
    post: <T, B = unknown>(endpoint: string, body: B) =>
        fetcher<T>(endpoint, {
            method: "POST",
            body: JSON.stringify(body),
        }),
    patch: <T, B = unknown>(endpoint: string, body: B) =>
        fetcher<T>(endpoint, {
            method: "PATCH",
            body: JSON.stringify(body),
        }),
    delete: <T>(endpoint: string) =>
        fetcher<T>(endpoint, {
            method: "DELETE",
        }),
};
