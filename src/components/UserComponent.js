// components/UserComponent.js
// Przykład komponentu do uploadu obrazów z obsługą JWT

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiUpload, FiLogOut, FiUser, FiClock } from 'react-icons/fi';
import AuthService from '../Login/AuthService';

const Container = styled.div`
    min-height: 100vh;
    background-color: #1A1A1D;
    padding: 20px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #25252A;
    padding: 15px 25px;
    border-radius: 10px;
    margin-bottom: 30px;
    border: 1px solid #3A3A40;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    color: #E0E0E0;
    
    .username {
        font-weight: 500;
        font-size: 1.1rem;
    }
    
    .status {
        color: #A0A0A0;
        font-size: 0.9rem;
    }
`;

const LogoutButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 15px;
    background-color: #ff6b6b;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    
    &:hover {
        background-color: #fa5252;
    }
`;

const UploadArea = styled.div`
    background-color: #25252A;
    border: 2px dashed #4A4A52;
    border-radius: 10px;
    padding: 40px;
    text-align: center;
    margin-bottom: 30px;
    cursor: pointer;
    transition: border-color 0.2s;
    
    &:hover {
        border-color: #6A6A72;
    }
    
    &.dragover {
        border-color: #7FB3D3;
        background-color: #7FB3D320;
    }
`;

const UploadText = styled.p`
    color: #A0A0A0;
    font-size: 1.1rem;
    margin-bottom: 15px;
`;

const FileInput = styled.input`
    display: none;
`;

const UploadButton = styled.button`
    padding: 12px 20px;
    background-color: #3A3A40;
    color: #E0E0E0;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 auto;
    
    &:hover {
        background-color: #505057;
    }
    
    &:disabled {
        background-color: #2A2A2F;
        color: #666;
        cursor: not-allowed;
    }
`;

const ResultsArea = styled.div`
    background-color: #25252A;
    border-radius: 10px;
    padding: 25px;
    border: 1px solid #3A3A40;
`;

const ResultTitle = styled.h3`
    color: #E0E0E0;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
`;

const ModelResult = styled.div`
    margin-bottom: 15px;
    padding: 15px;
    background-color: #1A1A1D;
    border-radius: 6px;
    border: 1px solid #3A3A40;
`;

const ModelName = styled.span`
    color: #7FB3D3;
    font-weight: 500;
    margin-right: 10px;
`;

const Prediction = styled.span`
    color: #E0E0E0;
    font-size: 1.1rem;
`;

const ErrorMessage = styled.div`
    color: #ff6b6b;
    background-color: #ff6b6b20;
    border: 1px solid #ff6b6b40;
    border-radius: 6px;
    padding: 15px;
    margin-bottom: 20px;
    text-align: center;
`;

export default function UserComponent() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Pobierz dane z navigacji lub localStorage
    const [userData, setUserData] = useState(() => {
        const stateData = location.state;
        const storedData = AuthService.getUserData();
        
        if (stateData) {
            return {
                userId: stateData.userId,
                username: stateData.username,
                isGuest: stateData.isGuest,
                token: stateData.token
            };
        }
        
        if (storedData && AuthService.isAuthenticated()) {
            return storedData;
        }
        
        // Jeśli brak danych, przekieruj do logowania
        return null;
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        // Jeśli brak danych użytkownika, przekieruj do autoryzacji
        if (!userData) {
            navigate('/auth');
            return;
        }

        // Jeśli użytkownik jest zalogowany, sprawdź token
        if (!userData.isGuest && AuthService.isAuthenticated()) {
            validateAndRefreshUserData();
        }
    }, [userData, navigate]);

    const validateAndRefreshUserData = async () => {
        try {
            const currentUser = await AuthService.getCurrentUser();
            setUserData(prev => ({
                ...prev,
                userId: currentUser.user_id,
                username: currentUser.username
            }));
        } catch (error) {
            console.error("Token validation failed:", error);
            handleLogout();
        }
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            setError("");
        } else {
            setError("Proszę wybrać plik obrazu!");
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError("Proszę wybrać obraz!");
            return;
        }

        setIsUploading(true);
        setError("");

        try {
            // Konwertuj obraz do base64
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const imageBase64 = e.target.result;
                    
                    let uploadResults;
                    if (userData.isGuest) {
                        // Upload jako gość
                        uploadResults = await AuthService.uploadImageAsGuest(imageBase64);
                    } else {
                        // Upload jako zalogowany użytkownik
                        uploadResults = await AuthService.uploadImage(imageBase64);
                    }
                    
                    setResults(uploadResults);
                    console.log("Upload successful:", uploadResults);
                    
                } catch (error) {
                    console.error("Upload error:", error);
                    setError(error.message || "Błąd podczas uploadu!");
                } finally {
                    setIsUploading(false);
                }
            };
            
            reader.readAsDataURL(selectedFile);
            
        } catch (error) {
            console.error("File reading error:", error);
            setError("Błąd podczas odczytu pliku!");
            setIsUploading(false);
        }
    };

    const handleLogout = () => {
        AuthService.logout();
        navigate('/auth');
    };

    const handleViewHistory = async () => {
        if (userData.isGuest) {
            setError("Historia dostępna tylko dla zalogowanych użytkowników!");
            return;
        }

        try {
            const history = await AuthService.getHistory();
            console.log("User history:", history);
            // Tu możesz przekierować do komponentu historii lub pokazać modal
        } catch (error) {
            setError("Błąd podczas pobierania historii!");
        }
    };

    if (!userData) {
        return null; // Komponent się przekieruje w useEffect
    }

    return (
        <Container>
            <Header>
                <UserInfo>
                    <FiUser />
                    <div>
                        <div className="username">{userData.username}</div>
                        <div className="status">
                            {userData.isGuest ? "Tryb gościa" : `ID: ${userData.userId}`}
                        </div>
                    </div>
                </UserInfo>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                    {!userData.isGuest && (
                        <UploadButton onClick={handleViewHistory}>
                            <FiClock />
                            Historia
                        </UploadButton>
                    )}
                    
                    {!userData.isGuest && (
                        <LogoutButton onClick={handleLogout}>
                            <FiLogOut />
                            Wyloguj
                        </LogoutButton>
                    )}
                </div>
            </Header>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <UploadArea onClick={() => document.getElementById('fileInput').click()}>
                <UploadText>
                    {selectedFile 
                        ? `Wybrany plik: ${selectedFile.name}` 
                        : "Kliknij tutaj lub przeciągnij obraz"}
                </UploadText>
                
                <FileInput 
                    id="fileInput"
                    type="file" 
                    accept="image/*"
                    onChange={handleFileSelect}
                />
                
                <UploadButton 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleUpload();
                    }}
                    disabled={!selectedFile || isUploading}
                >
                    <FiUpload />
                    {isUploading ? "Przetwarzanie..." : "Analizuj obraz"}
                </UploadButton>
            </UploadArea>

            {results && (
                <ResultsArea>
                    <ResultTitle>
                        <FiClock />
                        Wyniki klasyfikacji:
                    </ResultTitle>
                    
                    <ModelResult>
                        <ModelName>K-NN:</ModelName>
                        <Prediction>{results.knn.pred}</Prediction>
                    </ModelResult>
                    
                    <ModelResult>
                        <ModelName>Random Forest:</ModelName>
                        <Prediction>{results.rf.pred}</Prediction>
                    </ModelResult>
                    
                    <ModelResult>
                        <ModelName>SVM:</ModelName>
                        <Prediction>{results.svm.pred}</Prediction>
                    </ModelResult>
                </ResultsArea>
            )}
        </Container>
    );
}