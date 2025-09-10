import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiTrash2, FiClock, FiInfo } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { media } from './breakpoints.js';
import banknoteService from '../../../services/banknoteService';
import { mapBanknoteName } from '../../../utils/banknoteMapper';

const HistoryContainer = styled.div`
  background-color: #2A2A2E;
  border-radius: 10px;
  padding: 16px;
  height: 70%;
  max-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  ${media.tablet} {
    max-height: calc(100vh - 60px);
    padding: 12px;
  }
  
  ${media.mobile} {
    max-height: 180px;
    padding: 10px;
  }
  
  @media (max-width: 360px) {
    max-height: 150px;
    padding: 8px;
  }
`;

const HistoryTitle = styled.h3`
  color: #E0E0E0;
  margin-bottom: 16px;
  font-size: 1.1rem;
  font-weight: 600;
  
  ${media.mobile} {
    font-size: 1rem;
    margin-bottom: 12px;
  }
  
  @media (max-width: 360px) {
    font-size: 0.9rem;
    margin-bottom: 8px;
  }
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  flex: 1;
  padding-right: 4px;
  margin: -4px -4px -4px 0;
  padding-left: 4px;
  padding-top: 4px;
  padding-bottom: 4px;
  
  /* Stylowanie scrollbara */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #4A4A52;
    border-radius: 3px;
    transition: background 0.2s ease;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #6A6A72;
  }
  
  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: #4A4A52 transparent;
`;

const HistoryItem = styled.div`
  background-color: #3A3A40;
  border-radius: 6px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  position: relative;

  &:hover {
    background-color: #454550;
    border-color: #6A6A72;
    transform: translateX(2px);
  }

  &:active {
    transform: translateX(1px);
  }
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 4px;
`;

const ItemId = styled.span`
  color: #B0B0B0;
  font-size: 0.85rem;
  font-family: monospace;
  flex-grow: 1;
`;

const ItemDate = styled.div`
  display: flex;
  align-items: center;
  color: #888;
  font-size: 0.75rem;
  margin-top: 4px;
  
  svg {
    margin-right: 4px;
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #B0B0B0;
  cursor: pointer;
  padding: 2px;
  border-radius: 3px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #ff6b6b;
    background-color: rgba(255, 107, 107, 0.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  color: #B0B0B0;
  font-style: italic;
  padding: 20px;
`;

const InfoButton = styled.button`
  background: linear-gradient(135deg, #17a2b8, #138496);
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
  box-shadow: 0 2px 8px rgba(23, 162, 184, 0.3);

  &:hover {
    background: linear-gradient(135deg, #138496, #0f6674);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(23, 162, 184, 0.4);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(23, 162, 184, 0.3);
  }

  ${media.mobile} {
    padding: 4px 8px;
    font-size: 0.75rem;
  }
`;

const HistoryPanel = ({ 
  history, 
  onRemove, 
  onClickItem, 
  onHoverItem, 
  onLeaveItem,
  userId 
}) => {
  const navigate = useNavigate();
  const [banknotes, setBanknotes] = useState([]);
  const [matchingBanknotes, setMatchingBanknotes] = useState({});

  // Pobierz banknoty z bazy
  useEffect(() => {
    const loadBanknotes = async () => {
      try {
        const banknotesData = await banknoteService.getBanknotes();
        setBanknotes(banknotesData);
        
        // Sprawdź dopasowania dla każdego elementu historii
        const matches = {};
        history.forEach((item, index) => {
          if (typeof item === 'object' && item.knn_pred) {
            const prediction = item.knn_pred || item.rf_pred || item.svm_pred || 'NONOTE0';
            const mappedPrediction = mapBanknoteName(prediction);
            
            const matching = banknotesData.find(banknote => 
              banknote.denomination === mappedPrediction || 
              banknote.currency === mappedPrediction || 
              banknote.country === mappedPrediction ||
              `${banknote.country} ${banknote.currency}` === mappedPrediction
            );
            
            if (matching) {
              matches[index] = matching;
            }
          }
        });
        
        setMatchingBanknotes(matches);
      } catch (error) {
        console.error('Błąd pobierania banknotów:', error);
      }
    };

    if (history.length > 0) {
      loadBanknotes();
    }
  }, [history]);

  // history to tablica obiektów (dla zalogowanych) lub ID (dla gości)
  const getPredictionText = (item) => {
    if (!item) return 'Nieznany wynik';
    
    // Jeśli to obiekt z danymi (zalogowany użytkownik)
    if (typeof item === 'object' && item.knn_pred) {
      const prediction = item.knn_pred || item.rf_pred || item.svm_pred || 'NONOTE0';
      return mapBanknoteName(prediction);
    }
    
    // Jeśli to ID (gość) - zwróć placeholder
    return 'Wynik niedostępny';
  };
  const handleItemClick = (e, itemId) => {
    // Nie klikaj, jeśli kliknięto w przycisk usuń
    if (e.target.closest('button')) return;
    onClickItem(itemId);
  };

  const handleItemHover = (e, itemId) => {
    onHoverItem(itemId, e);
  };

  const handleItemLeave = () => {
    onLeaveItem();
  };

  const handleDeleteClick = (e, index) => {
    e.stopPropagation();
    onRemove(index);
  };

  const formatDate = (timestamp) => {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        // Jeśli timestamp to nie data, sprawdź czy to ID z timestampem
        const numTimestamp = parseInt(timestamp);
        if (!isNaN(numTimestamp)) {
          return new Date(numTimestamp).toLocaleDateString('pl-PL', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          });
        }
        return 'Nieznana data';
      }
      return date.toLocaleDateString('pl-PL', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Nieznana data';
    }
  };

  if (!history || history.length === 0) {
    return (
      <HistoryContainer>
        <HistoryTitle>Historia</HistoryTitle>
        <EmptyState>Brak wpisów w historii</EmptyState>
      </HistoryContainer>
    );
  }

  return (
    <HistoryContainer>
      <HistoryTitle>Historia ({history.length})</HistoryTitle>
      <HistoryList>
        {history.map((item, index) => (
          <HistoryItem
            key={item}
            onClick={(e) => handleItemClick(e, item)}
            onMouseEnter={(e) => handleItemHover(e, item)}
            onMouseLeave={handleItemLeave}
            title="Kliknij, aby zobaczyć szczegóły, najedź aby zobaczyć podgląd"
          >
            <ItemHeader>
              <ItemId>{getPredictionText(item)}</ItemId>
              <DeleteButton
                onClick={(e) => handleDeleteClick(e, index)}
                title="Usuń wpis"
              >
                <FiTrash2 size={14} />
              </DeleteButton>
            </ItemHeader>
            <ItemDate>
              <FiClock size={10} />
              {typeof item === 'object' && item.timestamp ? formatDate(item.timestamp) : 'Data niedostępna'}
            </ItemDate>
            {/* Przycisk "Więcej informacji o banknocie" */}
            {matchingBanknotes[index] && (
              <InfoButton
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/user/banknote/${matchingBanknotes[index].id}`);
                }}
                title="Więcej informacji o banknocie"
              >
                <FiInfo size={12} />
                Więcej informacji
              </InfoButton>
            )}
          </HistoryItem>
        ))}
      </HistoryList>
    </HistoryContainer>
  );
};

export default HistoryPanel;