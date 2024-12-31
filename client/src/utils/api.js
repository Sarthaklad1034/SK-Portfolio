import axios from 'axios';

// Define base URL with fallback
const baseURL =
    import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000, // 10 second timeout
    withCredentials: true // Enable credentials for CORS
});

// Request interceptor with enhanced error handling
api.interceptors.request.use(
    (config) => {
        // Add auth token if it exists
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Log outgoing requests in development
        if (
            import.meta.env.DEV) {
            console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
        }

        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor with comprehensive error handling
api.interceptors.response.use(
    (response) => {
        // Log successful responses in development
        if (
            import.meta.env.DEV) {
            console.log(`API Response: ${response.status} ${response.config.url}`);
        }
        return response;
    },
    (error) => {
        // Network errors
        if (error.code === 'ERR_NETWORK') {
            console.error('Network Error - Please check your connection and if the backend server is running');
            // You could dispatch a notification here
        }

        // Handle specific error responses
        if (error.response) {
            const { status, data } = error.response;

            switch (status) {
                case 400:
                    console.error('Bad Request:', data.message || 'Validation error');
                    break;
                case 401:
                    console.error('Unauthorized - Redirecting to login');
                    localStorage.removeItem('token');
                    window.location.href = '/admin/login';
                    break;
                case 403:
                    console.error('Forbidden - You do not have permission to access this resource');
                    break;
                case 404:
                    console.error('Resource not found:', error.config.url);
                    break;
                case 422:
                    console.error('Validation Error:', data.message || 'Invalid data provided');
                    break;
                case 429:
                    console.error('Too many requests - Please try again later');
                    break;
                case 500:
                    console.error('Server Error:', data.message || 'Internal server error');
                    break;
                default:
                    console.error(`Error ${status}:`, data.message || 'An unexpected error occurred');
            }
        }

        // Timeout errors
        if (error.code === 'ECONNABORTED') {
            console.error('Request timed out - Please try again');
        }

        return Promise.reject(error);
    }
);

export default api;