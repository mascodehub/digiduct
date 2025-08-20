import router from '@/router';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor permintaan untuk secara otomatis menambahkan token
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem("digitoken");

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Interceptor respons untuk menangani error dan token
apiClient.interceptors.response.use(
    response => {
        // Cek token tidak valid jika respons mengandung pesan tersebut
        if (response.data && response.data.message === "Token tidak valid") {
            localStorage.clear();
            // Anda mungkin ingin mengalihkan pengguna ke halaman login di sini
        }
        return response;
    },
    error => {
        // Axios otomatis melemparkan kesalahan untuk status non-2xx
        // Kita bisa mengekstrak pesan kesalahan dari respons
        console.log(error.response.data);
        
        if (error.response.data.rd === 'Invalid or expired token') {
            localStorage.clear();
            router.push({ name: 'admin-login' });

            return;
        }

        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        // Tangani kesalahan jaringan atau lainnya
        throw new Error("Terjadi kesalahan.");
    }
);

/**
 * Wrapper untuk Axios API
 * @param {string} path - path endpoint, misal "/invoices"
 * @param {object} options - opsi Axios seperti method, headers, data
 */
export async function apiFetch(path, options = {}) {
    try {
        const { data, ...rest } = options;

        const config = {
            url: path,
            ...rest,
        };

        if ((rest.method || "GET").toUpperCase() === "GET" && data) {
            config.params = data;
        } else if (data) {
            config.data = data;
        }

        const response = await apiClient.request(config);
        return response.data; // Axios otomatis mengurai JSON ke .data
    } catch (error) {
        throw error;
    }
}