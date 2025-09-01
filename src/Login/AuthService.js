// utils/AuthService.js
// Oddzielny plik z serwisem autoryzacji do użycia w całej aplikacji

class AuthService {
    static API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

    // --- Zarządzanie tokenami ---
    static setToken(token) {
        localStorage.setItem('access_token', token);
    }

    static getToken() {
        return localStorage.getItem('access_token');
    }

    static removeToken() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_data');
    }

    static setUserData(userData) {
        localStorage.setItem('user_data', JSON.stringify(userData));
    }

    static getUserData() {
        const userData = localStorage.getItem('user_data');
        return userData ? JSON.parse(userData) : null;
    }

    static isAuthenticated() {
        return !!this.getToken();
    }

    static getAuthHeaders() {
        const token = this.getToken();
        return token ? {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        } : {
            'Content-Type': 'application/json'
        };
    }

    // --- API Calls ---
    static async register(username, password) {
        const response = await fetch(`${this.API_BASE_URL}/api/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Registration failed');
        }

        const tokenData = await response.json();
        
        // Automatycznie zapisz token i dane użytkownika
        this.setToken(tokenData.access_token);
        this.setUserData({
            userId: tokenData.user_id,
            username: tokenData.username,
            isGuest: false
        });

        return tokenData;
    }

    static async login(username, password) {
        const response = await fetch(`${this.API_BASE_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Login failed');
        }

        const tokenData = await response.json();
        
        // Automatycznie zapisz token i dane użytkownika
        this.setToken(tokenData.access_token);
        this.setUserData({
            userId: tokenData.user_id,
            username: tokenData.username,
            isGuest: false
        });

        return tokenData;
    }

    static async getCurrentUser() {
        const response = await fetch(`${this.API_BASE_URL}/api/me`, {
            headers: this.getAuthHeaders()
        });

        if (!response.ok) {
            // Token prawdopodobnie wygasł
            this.logout();
            throw new Error('Session expired');
        }

        return await response.json();
    }

    static async uploadImage(imageBase64) {
        const response = await fetch(`${this.API_BASE_URL}/api/upload`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify({ image: imageBase64 })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Upload failed');
        }

        return await response.json();
    }

    static async getHistory() {
        const response = await fetch(`${this.API_BASE_URL}/api/history`, {
            headers: this.getAuthHeaders()
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to fetch history');
        }

        return await response.json();
    }

    static async uploadImageAsGuest(imageBase64) {
        const response = await fetch(`${this.API_BASE_URL}/api/upload`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: imageBase64 })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Upload failed');
        }

        return await response.json();
    }

    static logout() {
        this.removeToken();
        // Opcjonalnie: przekieruj na stronę logowania
        window.location.href = '/auth';
    }

    // --- Walidacja tokenu ---
    static async validateToken() {
        try {
            await this.getCurrentUser();
            return true;
        } catch (error) {
            return false;
        }
    }
}

export default AuthService;