import { apiFetch } from "@/services/api";

export async function list(data) {
    try {
        const response = await apiFetch(`/category`, {
            method: "GET",
            data: { limit: 10, offset: 0 },
        });

        return response;
    } catch (error) {
        throw error;
    }
}

export async function add(data) {
    try {
        const response = await apiFetch(`/category`, {
            method: "POST",
            data: { name: data.name },
        });

        return response;
    } catch (error) {
        throw error;
    }
}