import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiSearch, FiUser, FiLoader } from 'react-icons/fi';
import HistoryPanel from './History/HistoryPage';
import {
  MainContainer,
  LeftColumn,
  RightColumn,
  TopBar,
  ContentWrapper,
  Title,
  UploadBox,
  UploadIconWrapper,
  UploadFooter,
  UploadButton,
  BackButton,
  ErrorMessage,
  WarningMessage,
  FileName,
  StorageInfo,
  ClearStorageButton,
  DetailsContainer,
  Thumbnail,
  DetailText,
  LoadingContainer,
  Tooltip,
  TooltipImage,
  TooltipText
} from './MainContent.styles';

// Import funkcji obsługi historii
import {
  checkStorageQuota,
  loadHistory,
  removeFromHistory,
  getItemDetails,
  getItemPreview,
  clearAllHistory
} from './History/HistoryUtils';

// Import funkcji obsługi uploadu
import {
  handleImageUpload,
  validateFile
} from './uploadutils';

const MainContent = ({ userId }) => {
  // Stan komponentu
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);
  const navigate = useNavigate();
  
  // Historia
  const [history, setHistory] = useState([]);
  
  // Szczegóły
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  
  // Tooltip hover
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredItemDetails, setHoveredItemDetails] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isLoadingTooltip, setIsLoadingTooltip] = useState(false);
  
  // Storage info
  const [storageInfo, setStorageInfo] = useState(null);

  // Sprawdź storage przy załadowaniu
  useEffect(() => {
    if (!userId) {
      const info = checkStorageQuota();
      setStorageInfo(info);
    }
  }, [userId]);

  // Ładowanie historii
  useEffect(() => {
    const loadHistoryData = async () => {
      const result = await loadHistory(userId);
      if (result.success) {
        setHistory(result.history);
      } else {
        setError(result.error);
      }
    };
    
    loadHistoryData();
  }, [userId]);

  // Funkcja czyszczenia całego storage
  const handleClearStorage = () => {
    if (window.confirm('Czy na pewno chcesz usunąć całą historię? Ta operacja jest nieodwracalna.')) {
      const result = clearAllHistory();
      if (result.success) {
        setHistory([]);
        setSelectedDetails(null);
        setHoveredItem(null);
        setHoveredItemDetails(null);
        setStorageInfo(checkStorageQuota());
        setError(null);
        setWarning(null);
      } else {
        setError(result.error);
      }
    }
  };

  // Usuwanie z historii
  const removeHistoryItem = async (index) => {
    const itemToRemoveId = history[index];
    
    const result = await removeFromHistory(itemToRemoveId, index, userId, history);
    
    if (result.success) {
      setHistory(result.newHistory);
      
      // Reset stanów jeśli usunięto aktualnie wyświetlany element
      if (selectedDetails && selectedDetails.id === itemToRemoveId) {
        setSelectedDetails(null);
      }
      if (hoveredItem === itemToRemoveId) {
        setHoveredItem(null);
        setHoveredItemDetails(null);
      }
      
      // Odśwież info o storage dla gości
      if (!userId) {
        setStorageInfo(checkStorageQuota());
      }
    } else {
      setError(result.error);
    }
  };

  // Obsługa zmiany pliku
  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    
    if (file) {
      const validation = validateFile(file);
      if (!validation.isValid) {
        setError(validation.errors.join(' '));
        return;
      }
    }
    
    setSelectedFile(file);
    setError(null);
    setWarning(null);
  }, []);

  // Upload pliku
  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Proszę wybrać plik.');
      return;
    }
    
    setUploading(true);
    setError(null);
    setWarning(null);

    const result = await handleImageUpload(selectedFile, userId, history, navigate);
    
    if (result.success) {
      if (result.newHistory) {
        setHistory(result.newHistory);
      }
      if (result.warning) {
        setWarning(result.warning);
      }
      // navigate jest wywołane w handleImageUpload
    } else {
      setError(result.errors.join(' '));
    }
    
    setUploading(false);
  };

  // Kliknięcie w element historii
  const handleHistoryItemClick = async (itemId) => {
    setIsLoadingDetails(true);
    setError(null);
    setSelectedDetails(null);

    const result = await getItemDetails(itemId, userId);
    
    if (result.success) {
      // Symulujemy opóźnienie dla lepszego UX
      if (!userId) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      setSelectedDetails(result.details);
    } else {
      setError(result.error);
    }
    
    setIsLoadingDetails(false);
  };

  // Hover na elemencie historii
  const handleHistoryItemHover = async (itemId, event) => {
    if (hoveredItem === itemId || isLoadingTooltip) return;
    
    setIsLoadingTooltip(true);
    setHoveredItem(itemId);
    
    // Pozycja tooltip
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

  // Opuszczenie elementu historii
  const handleHistoryItemLeave = () => {
    setHoveredItem(null);
    setHoveredItemDetails(null);
    setIsLoadingTooltip(false);
  };

  // Renderowanie zawartości prawej kolumny
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
          <Thumbnail 
            src={`data:image/jpeg;base64,${selectedDetails.imageBase64}`} 
            alt="Miniatura banknotu"
          />
          <DetailText>
            Przewidziany banknot: <span>{selectedDetails.predictedBanknote}</span>
          </DetailText>
          {selectedDetails.date && (
            <DetailText>
              Data: <span>{new Date(selectedDetails.date).toLocaleDateString('pl-PL')}</span>
            </DetailText>
          )}
          <BackButton onClick={() => setSelectedDetails(null)}>
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
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {warning && <WarningMessage>{warning}</WarningMessage>}
        
        {/* Informacje o storage dla gości */}
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
          <FiSearch />
          <FiUser />
        </TopBar>
        {renderRightColumnContent()}
      </RightColumn>
      
      {/* Tooltip dla hover */}
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
  );
};

export default MainContent;