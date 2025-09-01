import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiLogIn, FiUserPlus, FiSmile } from 'react-icons/fi';
import logo from '../assets/logo_najshajs.png'; 

// ### STYLED COMPONENTS ###

const AuthBox = styled.div`
    width: 420px;
    padding: 40px;
    background-color: #25252A;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #3A3A40;
`;

const LogoImg = styled.img`
    width: 150px;
    margin-bottom: 20px;
`;

const Title = styled.h1`
    font-size: 2rem;
    color: #E0E0E0;
    margin-bottom: 10px;
    font-weight: 500;
`;

const Subtitle = styled.p`
    color: #A0A0A0;
    margin-bottom: 40px;
    font-size: 0.9rem;
`;

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    background-color: #1A1A1D;
    border: 1px solid #4A4A52;
    border-radius: 6px;
    padding: 12px 15px;
    color: #E0E0E0;
    font-size: 1rem;
    margin-bottom: 20px;
    transition: border-color 0.2s;

    &::placeholder {
        color: #888;
    }

    &:focus {
        outline: none;
        border-color: #6A6A72;
    }
`;

const Button = styled.button`
    padding: 12px 20px;
    background-color: #3A3A40;
    color: #E0E0E0;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    &:hover {
        background-color: #505057;
    }

    &:disabled {
        background-color: #2A2A2F;
        color: #666;
        cursor: not-allowed;
    }
`;

const GuestButton = styled(Button)`
    background-color: transparent;
    border: 1px solid #4A4A52;
    color: #B0B0B0;

    &:hover {
        background-color: #3A3A40;
        border-color: #3A3A40;
    }
`;

const Separator = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    color: #888;
    width: 100%;
    margin: 25px 0;

    &::before, &::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid #4A4A52;
    }
    &:not(:empty)::before { margin-right: .5em; }
    &:not(:empty)::after { margin-left: .5em; }
`;

const SwitchAuthText = styled.p`
    color: #A0A0A0;
    font-size: 0.9rem;
    margin-top: 25px;
    cursor: pointer;

    span {
        color: #7FB3D3;
        text-decoration: none;
        font-weight: 500;
        &:hover { text-decoration: underline; }
    }
`;

const ErrorMessage = styled.div`
    color: #ff6b6b;
    background-color: #ff6b6b20;
    border: 1px solid #ff6b6b40;
    border-radius: 6px;
    padding: 10px;
    margin-bottom: 20px;
    font-size: 0.9rem;
    text-align: center;
`;

const SuccessMessage = styled.div`
    color: #51cf66;
    background-color: #51cf6620;
    border: 1px solid #51cf6640;
    border-radius: 6px;
    padding: 10px;
    margin-bottom: 20px;
    font-size: 0.9rem;
    text-align: center;
`;

// ### AUTH SERVICE ###
class AuthService {
    static API_BASE_URL = 'http://localhost:8000'; // Zmień na swój adres API

    static setToken(token) {
        localStorage.setItem('access_token', token);
    }

    static getToken() {
        return localStorage.getItem('access_token');
    }

    static removeToken() {
        localStorage.removeItem('access_token');
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

        return await response.json();
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

        return await response.json();
    }

    static async getCurrentUser() {
        const response = await fetch(`${this.API_BASE_URL}/api/me`, {
            headers: this.getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error('Failed to get user info');
        }

        return await response.json();
    }
}

// ### KOMPONENT ###

export default function AuthPanel() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            if (isRegistering) {
                // Rejestracja
                if (password !== confirmPassword) {
                    setError("Hasła nie są zgodne!");
                    setIsLoading(false);
                    return;
                }
                
                if (password.length < 6) {
                    setError("Hasło musi mieć co najmniej 6 znaków!");
                    setIsLoading(false);
                    return;
                }

                const tokenData = await AuthService.register(username, password);
                
                // Zapisz token
                AuthService.setToken(tokenData.access_token);
                
                setSuccess("Konto zostało utworzone!");
                
                // Przekierowanie z danymi użytkownika
                setTimeout(() => {
                    navigate('/user', { 
                        state: { 
                            userId: tokenData.user_id, 
                            username: tokenData.username,
                            isGuest: false,
                            token: tokenData.access_token
                        } 
                    });
                }, 1000);
                
            } else {
                // Logowanie
                const tokenData = await AuthService.login(username, password);
                
                // Zapisz token
                AuthService.setToken(tokenData.access_token);
                
                console.log("Zalogowany użytkownik:", tokenData);
                
                // Przekierowanie z danymi użytkownika
                navigate('/user', { 
                    state: { 
                        userId: tokenData.user_id, 
                        username: tokenData.username,
                        isGuest: false,
                        token: tokenData.access_token
                    } 
                });
            }
        } catch (error) {
            console.error("Błąd uwierzytelniania:", error);
            setError(error.message || "Wystąpił nieoczekiwany błąd!");
        }
        
        setIsLoading(false);
    };
    
    const handleGuestContinue = () => {
        console.log("Kontynuacja jako gość...");
        // Usuń token jeśli istnieje
        AuthService.removeToken();
        
        navigate('/user', { 
            state: { 
                userId: null, 
                username: "Gość",
                isGuest: true,
                token: null
            } 
        });
    };

    const toggleAuthMode = () => {
        setIsRegistering(!isRegistering);
        setError("");
        setSuccess("");
        // Wyczyść pola przy przełączaniu
        setUsername("");
        setPassword("");
        setConfirmPassword("");
    };

    return (
        <AuthBox>
            <LogoImg src={logo} alt="Logo Najshajs" />
            <Title>{isRegistering ? "Stwórz konto" : "Witaj ponownie!"}</Title>
            <Subtitle>
                {isRegistering ? "Wypełnij formularz, aby do nas dołączyć" : "Zaloguj się, aby kontynuować"}
            </Subtitle>

            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}

            <Form onSubmit={handleSubmit}>
                <Input 
                    type="text" 
                    placeholder="Nazwa użytkownika"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                    minLength={3}
                />
                <Input 
                    type="password" 
                    placeholder="Hasło"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    minLength={6}
                />
                
                {isRegistering && (
                    <Input 
                        type="password" 
                        placeholder="Powtórz hasło" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required 
                    />
                )}
                
                <Button type="submit" disabled={isLoading}>
                    {isRegistering ? <FiUserPlus /> : <FiLogIn />}
                    {isLoading 
                        ? "Ładowanie..." 
                        : (isRegistering ? "Zarejestruj się" : "Zaloguj się")
                    }
                </Button>
            </Form>

            <SwitchAuthText onClick={toggleAuthMode}>
                {isRegistering 
                    ? "Masz już konto? " 
                    : "Nie masz konta? "}
                <span>
                    {isRegistering ? "Zaloguj się" : "Zarejestruj się"}
                </span>
            </SwitchAuthText>

            <Separator>lub</Separator>

            <GuestButton onClick={handleGuestContinue}>
                <FiSmile />
                Kontynuuj jako gość
            </GuestButton>
        </AuthBox>
    );
}