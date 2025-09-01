// components/ProtectedRoute.js
// Komponent do ochrony tras wymagających autoryzacji

import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../Login/AuthService';

const ProtectedRoute = ({ children, requireAuth = false }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const userData = AuthService.getUserData();
            const hasToken = AuthService.isAuthenticated();

            if (!hasToken || !userData) {
                setIsAuthenticated(false);
                setIsLoading(false);
                return;
            }

            // Sprawdź czy token jest nadal ważny
            const isValid = await AuthService.validateToken();
            
            if (isValid) {
                setIsAuthenticated(true);
                setUserData(userData);
            } else {
                setIsAuthenticated(false);
                AuthService.logout(); // Wyczyść nieprawidłowy token
            }
            
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    if (isLoading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#1A1A1D',
                color: '#E0E0E0'
            }}>
                Ładowanie...
            </div>
        );
    }

    // Jeśli trasa wymaga autoryzacji, ale użytkownik nie jest zalogowany
    if (requireAuth && !isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    // Przekaż dane użytkownika do komponentów potomnych
    return React.cloneElement(children, { 
        userData, 
        isAuthenticated,
        isGuest: !isAuthenticated 
    });
};

export default ProtectedRoute;