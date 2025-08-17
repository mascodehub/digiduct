import { apiFetch } from "@/services/api";

export async function login(data) {
    try {
        const response = await apiFetch(`/auth`, {
            method: "POST",
            data: data,
        });

        return response;
    } catch (error) {
        throw error;
    }
}