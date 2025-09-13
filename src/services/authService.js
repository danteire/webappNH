import { getApiBaseUrl } from '../config/api';

const API_BASE_URL = getApiBaseUrl();

class AuthService {
    constructor() {
        this.token = localStorage.getItem('token');
        this.user = JSON.parse(localStorage.getItem('user') || 'null');
    }

    // Loguję użytkownika
    async login(username, password) {
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            const response = await fetch(`${API_BASE_URL}/api/token`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Błąd logowania');
            }

            const data = await response.json();
            this.token = data.access_token;
            localStorage.setItem('token', this.token);

            // Pobieram informacje o użytkowniku
            await this.getCurrentUser();
            
            return { success: true, user: this.user };
        } catch (error) {
            console.error('Błąd logowania:', error);
            return { success: false, error: error.message };
        }
    }

    // Rejestruję użytkownika
    async register(username, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Błąd rejestracji');
            }

            const user = await response.json();
            return { success: true, user };
        } catch (error) {
            console.error('Błąd rejestracji:', error);
            return { success: false, error: error.message };
        }
    }

    // Pobieram informacje o aktualnym użytkowniku
    async getCurrentUser() {
        if (!this.token) return null;

        try {
            const response = await fetch(`${API_BASE_URL}/api/me`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Nieprawidłowy token');
            }

            const user = await response.json();
            this.user = user;
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error) {
            console.error('Błąd pobierania użytkownika:', error);
            this.logout();
            return null;
        }
    }

    // Wylogowuję użytkownika
    logout() {
        this.token = null;
        this.user = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    // Sprawdzam czy użytkownik jest zalogowany
    isAuthenticated() {
        return !!this.token && !!this.user;
    }

    // Pobieram token
    getToken() {
        return this.token;
    }

    // Pobieram użytkownika
    getUser() {
        return this.user;
    }

    // Pobieram bazowy URL API
    getApiBaseUrl() {
        return API_BASE_URL;
    }

    // Wykonuję autoryzowane żądanie
    async authenticatedRequest(url, options = {}) {
        if (!this.token) {
            throw new Error('Brak tokenu autoryzacji');
        }

        const defaultOptions = {
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json',
                ...options.headers,
            },
        };

        return fetch(url, { ...options, ...defaultOptions });
    }
}

// Eksportuję instancję singleton
export default new AuthService();
