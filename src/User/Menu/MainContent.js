import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiUser, FiLoader, FiLogOut, FiSettings, FiInfo } from 'react-icons/fi';
import HistoryPanel from './History/HistoryPage';

import {
  MainContainer,
  LeftColumn,
  RightColumn,
  TopBar,
  UserMenuContainer,
  DropdownMenu,
  DropdownItem,
  ContentWrapper,
  Title,
  UploadBox,
  UploadIconWrapper,
  UploadFooter,
  UploadButton,
  BackButton,
  FileName,
  StorageInfo,
  ClearStorageButton,
  DetailsContainer,
  Thumbnail,
  ThumbnailPlaceholder,
  DetailText,
  LoadingContainer,
  Tooltip,
  TooltipImage,
  TooltipText,
  AlertBox,
  WarningMessage
} from './MainContent.styles';

import {
  checkStorageQuota,
  loadHistory,
  removeFromHistory,
  getItemDetails,
  getItemPreview,
  clearAllHistory
} from './History/HistoryUtils';

import {
  handleImageUpload,
  validateFile
} from './uploadutils';
import authService from '../../services/authService';

const MainContent = ({ userId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredItemDetails, setHoveredItemDetails] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isLoadingTooltip, setIsLoadingTooltip] = useState(false);
  const [storageInfo, setStorageInfo] = useState(null);

  const handleLogout = () => {
    authService.logout();
    console.log("Wylogowano...");
    navigate('/');
  };

  const handleAdminPanel = () => {
    navigate('/admin');
  };

  useEffect(() => {
    if (!userId) {
      const info = checkStorageQuota();
      setStorageInfo(info);
    }
  }, [userId]);

  useEffect(() => {
    const loadHistoryData = async () => {
      const result = await loadHistory(userId);
      if (result.success) {
        // Dla zalogowanych użytkowników historia to tablica obiektów z bazy danych
        // Dla gości to tablica ID z localStorage
        if (userId) {
          // Historia z bazy danych - używamy ID obiektów
          const historyIds = result.history.map(item => item.id);
          setHistory(historyIds);
        } else {
          // Historia z localStorage - już jest tablicą ID
          setHistory(result.history);
        }
      } else {
        setAlert({ message: result.error, type: 'error' });
      }
    };
    
    loadHistoryData();
  }, [userId]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleClearStorage = () => {
    if (window.confirm('Czy na pewno chcesz usunąć całą historię? Ta operacja jest nieodwracalna.')) {
      const result = clearAllHistory();
      if (result.success) {
        setHistory([]);
        setSelectedDetails(null);
        setHoveredItem(null);
        setHoveredItemDetails(null);
        setStorageInfo(checkStorageQuota());
        setAlert({ message: 'Cała historia została wyczyszczona.', type: 'success' });
      } else {
        setAlert({ message: result.error, type: 'error' });
      }
    }
  };

  const removeHistoryItem = async (index) => {
    const itemToRemoveId = history[index];
    
    const result = await removeFromHistory(itemToRemoveId, index, userId, history);
    
    if (result.success) {
      setHistory(result.newHistory);
      
      if (selectedDetails && selectedDetails.id === itemToRemoveId) {
        setSelectedDetails(null);
      }
      if (hoveredItem === itemToRemoveId) {
        setHoveredItem(null);
        setHoveredItemDetails(null);
      }
      
      if (!userId) {
        setStorageInfo(checkStorageQuota());
      }
      setAlert({ message: 'Element został usunięty z historii.', type: 'success' });
    } else {
      setAlert({ message: result.error, type: 'error' });
    }
  };

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    
    setSelectedFile(null);
    setAlert(null);

    if (file) {
      const validation = validateFile(file);
      if (!validation.isValid) {
        setAlert({ message: validation.errors.join(' '), type: 'error' });
        return;
      }
      
      setSelectedFile(file);
      setAlert({ message: 'Plik został poprawnie wybrany.', type: 'success' }); 
    } else {
      setAlert({ message: 'Wybór pliku został anulowany.', type: 'error' });
    }
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) {
      setAlert({ message: 'Proszę wybrać plik.', type: 'error' });
      return;
    }
    
    setUploading(true);
    setAlert(null);

    const result = await handleImageUpload(selectedFile, history, navigate);
    
    setUploading(false);
    
    if (result.success) {
      // Odśwież historię po udanym uploadzie
      const historyResult = await loadHistory(userId);
      if (historyResult.success) {
        if (userId) {
          const historyIds = historyResult.history.map(item => item.id);
          setHistory(historyIds);
        } else {
          setHistory(historyResult.history);
        }
      }
      
      setSelectedFile(null);
      if (result.warning) {
        setAlert({ message: result.warning, type: 'warning' });
      } else {
        setAlert({ message: 'Plik został pomyślnie wysłany!', type: 'success' });
      }
    } else {
      setAlert({ message: result.errors.join(' '), type: 'error' });
    }
  };

  const handleHistoryItemClick = async (itemId) => {
    setIsLoadingDetails(true);
    setAlert(null);
    setSelectedDetails(null);

    const result = await getItemDetails(itemId, userId);
    
    if (result.success) {
      if (!userId) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      setSelectedDetails(result.details);
      setAlert({ message: 'Szczegóły banknotu zostały wczytane.', type: 'success' });
    } else {
      setAlert({ message: result.error, type: 'error' });
    }
    
    setIsLoadingDetails(false);
  };

  const handleHistoryItemHover = async (itemId, event) => {
    if (hoveredItem === itemId || isLoadingTooltip) return;
    
    setIsLoadingTooltip(true);
    setHoveredItem(itemId);
    
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.right + 10,
      y: rect.top
    });

    const result = await getItemPreview(itemId, userId);
    
    if (result.success) {
      setHoveredItemDetails(result.preview);
    } else {
      console.error('Błąd pobierania podglądu:', result.error);
    }
    
    setIsLoadingTooltip(false);
  };

  const handleHistoryItemLeave = () => {
    setHoveredItem(null);
    setHoveredItemDetails(null);
    setIsLoadingTooltip(false);
  };

  const renderRightColumnContent = () => {
    if (isLoadingDetails) {
      return (
        <LoadingContainer>
          <FiLoader style={{ animation: 'spin 1s linear infinite' }} size={48} color="#B0B0B0" />
        </LoadingContainer>
      );
    }
    
    if (selectedDetails) {
      return (
        <DetailsContainer>
          <Title>Szczegóły wpisu</Title>
          {selectedDetails.image ? (
            <Thumbnail 
              src={selectedDetails.image} 
              alt="Miniatura banknotu"
              onError={(e) => {
                console.error('Error loading image:', e.target.src);
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <ThumbnailPlaceholder>
              Brak miniatury
            </ThumbnailPlaceholder>
          )}
          <DetailText>
            Przewidziany banknot: <span>{selectedDetails.predictedBanknote}</span>
          </DetailText>
          {selectedDetails.date && (
            <DetailText>
              Data: <span>{new Date(selectedDetails.date).toLocaleDateString('pl-PL')}</span>
            </DetailText>
          )}
          <BackButton onClick={() => { setSelectedDetails(null); setAlert(null); }}>
            Powrót
          </BackButton>
        </DetailsContainer>
      );
    }
    
    return (
      <ContentWrapper>
        <Title>Prześlij zdjęcie banknotu</Title>
        <UploadBox>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <UploadIconWrapper><FiUpload size={28} color="#B0B0B0" /></UploadIconWrapper>
          <UploadFooter><p>Kliknij, aby wybrać plik</p></UploadFooter>
        </UploadBox>
        
        {selectedFile && <FileName>Wybrany plik: {selectedFile.name}</FileName>}
        
        {!userId && storageInfo && (
          <StorageInfo>
            Wykorzystano: {storageInfo.used}KB / ~5MB
            {storageInfo.remaining < 1000 && (
              <>
                <WarningMessage>
                  Mało miejsca w pamięci przeglądarki ({storageInfo.remaining}KB)
                </WarningMessage>
                <ClearStorageButton onClick={handleClearStorage}>
                  Wyczyść historię
                </ClearStorageButton>
              </>
            )}
          </StorageInfo>
        )}
        
        <UploadButton onClick={handleUpload} disabled={uploading}>
          {uploading ? 'Wysyłanie...' : 'Wyślij'}
        </UploadButton>
      </ContentWrapper>
    );
  };

  return (
    <>
      {alert && (
        <AlertBox type={alert.type}>
          {alert.message}
        </AlertBox>
      )}
      <MainContainer>
        <LeftColumn>
          <HistoryPanel 
            history={history} 
            onRemove={removeHistoryItem}
            onClickItem={handleHistoryItemClick}
            onHoverItem={handleHistoryItemHover}
            onLeaveItem={handleHistoryItemLeave}
          />
        </LeftColumn>
        <RightColumn>
          <TopBar>
            <UserMenuContainer>
              <FiUser onClick={() => setIsMenuOpen(!isMenuOpen)} />
              {isMenuOpen && (
                <DropdownMenu>
                  <DropdownItem onClick={() => navigate('/user/banknotes')}>
                    <FiInfo />
                    Lista banknotów
                  </DropdownItem>
                  {authService.getUser()?.admin && (
                    <DropdownItem onClick={handleAdminPanel}>
                      <FiSettings />
                      Panel administratora
                    </DropdownItem>
                  )}
                  <DropdownItem onClick={handleLogout}>
                    <FiLogOut />
                    Wyloguj się
                  </DropdownItem>
                </DropdownMenu>
              )}
            </UserMenuContainer>
          </TopBar>
          {renderRightColumnContent()}
        </RightColumn>
        
        <Tooltip 
          visible={hoveredItem && hoveredItemDetails && !isLoadingTooltip}
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y
          }}
        >
          {hoveredItemDetails && (
            <>
              <TooltipImage 
                src={`data:image/jpeg;base64,${hoveredItemDetails.imageBase64}`}
                alt="Podgląd banknotu"
              />
              <TooltipText>
                <div className="banknote">{hoveredItemDetails.predictedBanknote}</div>
                <div className="date">{hoveredItemDetails.date}</div>
              </TooltipText>
            </>
          )}
        </Tooltip>
      </MainContainer>
    </>
  );
};

export default MainContent;