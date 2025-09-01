import React from 'react';
import styled from 'styled-components';
import { FiTrash2, FiClock } from 'react-icons/fi';

const HistoryContainer = styled.div`
  background-color: #2A2A2E;
  border-radius: 8px;
  padding: 16px;
  height: fit-content;
  min-height: 100%;
`;

const HistoryTitle = styled.h3`
  color: #E0E0E0;
  margin-bottom: 16px;
  font-size: 1.1rem;
  font-weight: 600;
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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

const HistoryPanel = ({ 
  history, 
  onRemove, 
  onClickItem, 
  onHoverItem, 
  onLeaveItem 
}) => {
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
              <ItemId>#{String(item).slice(-8)}</ItemId>
              <DeleteButton
                onClick={(e) => handleDeleteClick(e, index)}
                title="Usuń wpis"
              >
                <FiTrash2 size={14} />
              </DeleteButton>
            </ItemHeader>
            <ItemDate>
              <FiClock size={10} />
              {formatDate(item)}
            </ItemDate>
          </HistoryItem>
        ))}
      </HistoryList>
    </HistoryContainer>
  );
};

export default HistoryPanel;