// src/components/AuthPanel.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiLogIn, FiUserPlus, FiSmile } from 'react-icons/fi';

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

// ### KOMPONENT ###

export default function AuthPanel() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      // Logika rejestracji
      if (password !== confirmPassword) {
        alert("Hasła nie są zgodne!");
        return;
      }
      console.log("Rejestracja:", { email, password });
      navigate('/user'); // lub gdziekolwiek chcesz przekierować po rejestracji
    } else {
      // Logika logowania
      console.log("Logowanie:", { email, password });
      navigate('/user');
    }
  };
  
  const handleGuestContinue = () => {
    console.log("Kontynuacja jako gość...");
    navigate('/guest'); // Przekierowanie dla gościa
  };

  const toggleAuthMode = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <AuthBox>
      <Title>{isRegistering ? "Stwórz konto" : "Witaj ponownie!"}</Title>
      <Subtitle>
        {isRegistering ? "Wypełnij formularz, aby do nas dołączyć" : "Zaloguj się, aby kontynuować"}
      </Subtitle>

      <Form onSubmit={handleSubmit}>
        <Input 
          type="email" 
          placeholder="Adres email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        
        <Button type="submit">
          {isRegistering ? <FiUserPlus /> : <FiLogIn />}
          {isRegistering ? "Zarejestruj się" : "Zaloguj się"}
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