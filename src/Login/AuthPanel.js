import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiLogIn, FiUserPlus, FiSmile } from 'react-icons/fi';
import logo from '../assets/logo_najshajs.png';
import authService from '../services/authService';
import { media } from './breakpoints.js'; 

// ### STYLED COMPONENTS ###
// Wszystkie style są dopasowane do Twojej aplikacji

const AuthBox = styled.div`
    width: 420px;
    padding: 40px;
    background-color: #25252A;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #3A3A40;
    
    ${media.tablet} {
        width: 380px;
        padding: 35px;
        border-radius: 8px;
    }
    
    ${media.mobile} {
        width: 100%;
        max-width: 420px;
        padding: 40px;
        border-radius: 6px;
    }
    
    ${media.smallMobile} {
        width: 100%;
        max-width: 400px;
        padding: 35px;
        border-radius: 5px;
    }
    
    ${media.verySmallMobile} {
        width: 100%;
        max-width: 380px;
        padding: 30px;
        border-radius: 5px;
    }
`;

const LogoImg = styled.img`
    width: 150px;
    margin-bottom: 20px;
    
    ${media.tablet} {
        width: 140px;
        margin-bottom: 18px;
    }
    
    ${media.mobile} {
        width: 150px;
        margin-bottom: 20px;
    }
    
    ${media.smallMobile} {
        width: 140px;
        margin-bottom: 18px;
    }
    
    ${media.verySmallMobile} {
        width: 130px;
        margin-bottom: 15px;
    }
`;

const Title = styled.h1`
    font-size: 2rem;
    color: #E0E0E0;
    margin-bottom: 10px;
    font-weight: 500;
    text-align: center;
    
    ${media.tablet} {
        font-size: 1.8rem;
        margin-bottom: 8px;
    }
    
    ${media.mobile} {
        font-size: 1.8rem;
        margin-bottom: 8px;
    }
    
    ${media.smallMobile} {
        font-size: 1.6rem;
        margin-bottom: 6px;
    }
    
    ${media.verySmallMobile} {
        font-size: 1.4rem;
        margin-bottom: 5px;
    }
`;

const Subtitle = styled.p`
    color: #A0A0A0;
    margin-bottom: 40px;
    font-size: 0.9rem;
    text-align: center;
    
    ${media.tablet} {
        margin-bottom: 35px;
        font-size: 0.85rem;
    }
    
    ${media.mobile} {
        margin-bottom: 35px;
        font-size: 0.9rem;
    }
    
    ${media.smallMobile} {
        margin-bottom: 30px;
        font-size: 0.85rem;
    }
    
    ${media.verySmallMobile} {
        margin-bottom: 25px;
        font-size: 0.8rem;
    }
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
    
    ${media.tablet} {
        padding: 11px 14px;
        font-size: 0.95rem;
        margin-bottom: 18px;
    }
    
    ${media.mobile} {
        padding: 12px 15px;
        font-size: 1rem;
        margin-bottom: 20px;
    }
    
    ${media.smallMobile} {
        padding: 11px 14px;
        font-size: 0.95rem;
        margin-bottom: 18px;
    }
    
    ${media.verySmallMobile} {
        padding: 10px 13px;
        font-size: 0.9rem;
        margin-bottom: 16px;
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
    
    ${media.tablet} {
        padding: 11px 18px;
        font-size: 0.95rem;
        gap: 7px;
    }
    
    ${media.mobile} {
        padding: 12px 20px;
        font-size: 1rem;
        gap: 8px;
    }
    
    ${media.smallMobile} {
        padding: 11px 18px;
        font-size: 0.95rem;
        gap: 7px;
    }
    
    ${media.verySmallMobile} {
        padding: 10px 16px;
        font-size: 0.9rem;
        gap: 6px;
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
    font-size: 0.9rem;

    &::before, &::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid #4A4A52;
    }
    &:not(:empty)::before { margin-right: .5em; }
    &:not(:empty)::after { margin-left: .5em; }
    
    ${media.tablet} {
        margin: 22px 0;
        font-size: 0.85rem;
    }
    
    ${media.mobile} {
        margin: 20px 0;
        font-size: 0.8rem;
    }
    
    ${media.smallMobile} {
        margin: 18px 0;
        font-size: 0.75rem;
    }
    
    ${media.verySmallMobile} {
        margin: 15px 0;
        font-size: 0.7rem;
    }
`;

const SwitchAuthText = styled.p`
    color: #A0A0A0;
    font-size: 0.9rem;
    margin-top: 25px;
    cursor: pointer;
    text-align: center;

    span {
        color: #7FB3D3;
        text-decoration: none;
        font-weight: 500;
        &:hover { text-decoration: underline; }
    }
    
    ${media.tablet} {
        font-size: 0.85rem;
        margin-top: 22px;
    }
    
    ${media.mobile} {
        font-size: 0.8rem;
        margin-top: 20px;
    }
    
    ${media.smallMobile} {
        font-size: 0.75rem;
        margin-top: 18px;
    }
    
    ${media.verySmallMobile} {
        font-size: 0.7rem;
        margin-top: 15px;
    }
`;

const ErrorMessage = styled.div`
    background-color: #4A1A1A;
    border: 1px solid #8B0000;
    color: #FF6B6B;
    padding: 10px;
    border-radius: 6px;
    margin-bottom: 20px;
    font-size: 0.9rem;
    text-align: center;
    
    ${media.tablet} {
        padding: 9px;
        font-size: 0.85rem;
        margin-bottom: 18px;
    }
    
    ${media.mobile} {
        padding: 8px;
        font-size: 0.8rem;
        margin-bottom: 16px;
    }
    
    ${media.smallMobile} {
        padding: 7px;
        font-size: 0.75rem;
        margin-bottom: 14px;
    }
    
    ${media.verySmallMobile} {
        padding: 6px;
        font-size: 0.7rem;
        margin-bottom: 12px;
    }
`;

const SuccessMessage = styled.div`
    background-color: #1A4A1A;
    border: 1px solid #008B00;
    color: #6BFF6B;
    padding: 10px;
    border-radius: 6px;
    margin-bottom: 20px;
    font-size: 0.9rem;
    text-align: center;
    
    ${media.tablet} {
        padding: 9px;
        font-size: 0.85rem;
        margin-bottom: 18px;
    }
    
    ${media.mobile} {
        padding: 8px;
        font-size: 0.8rem;
        margin-bottom: 16px;
    }
    
    ${media.smallMobile} {
        padding: 7px;
        font-size: 0.75rem;
        margin-bottom: 14px;
    }
    
    ${media.verySmallMobile} {
        padding: 6px;
        font-size: 0.7rem;
        margin-bottom: 12px;
    }
`;

const LoadingSpinner = styled.div`
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #E0E0E0;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    ${media.tablet} {
        width: 15px;
        height: 15px;
    }
    
    ${media.mobile} {
        width: 14px;
        height: 14px;
    }
    
    ${media.smallMobile} {
        width: 13px;
        height: 13px;
    }
    
    ${media.verySmallMobile} {
        width: 12px;
        height: 12px;
    }
`;

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
                // Logika rejestracji
                if (password !== confirmPassword) {
                    setError("Hasła nie są zgodne!");
                    return;
                }
                
                const result = await authService.register(username, password);
                if (result.success) {
                    setSuccess("Konto zostało utworzone! Możesz się teraz zalogować.");
                    setIsRegistering(false);
                    setUsername("");
                    setPassword("");
                    setConfirmPassword("");
                } else {
                    setError(result.error);
                }
            } else {
                // Logika logowania
                const result = await authService.login(username, password);
                if (result.success) {
                    setSuccess("Zalogowano pomyślnie!");
                    setTimeout(() => {
                        navigate('/user');
                    }, 1000);
                } else {
                    setError(result.error);
                }
            }
        } catch (error) {
            setError("Wystąpił nieoczekiwany błąd. Spróbuj ponownie.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleGuestContinue = () => {
        console.log("Kontynuacja jako gość...");
        navigate('/guest'); // Przekierowanie do trybu gościa
    };

    const toggleAuthMode = () => {
        setIsRegistering(!isRegistering);
        setError("");
        setSuccess("");
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
                />
                <Input 
                    type="password" 
                    placeholder="Hasło"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
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
                    {isLoading ? <LoadingSpinner /> : (isRegistering ? <FiUserPlus /> : <FiLogIn />)}
                    {isLoading ? "Przetwarzanie..." : (isRegistering ? "Zarejestruj się" : "Zaloguj się")}
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