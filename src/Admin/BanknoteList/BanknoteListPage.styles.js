import styled from 'styled-components';

export const LoadingOrError = styled.div`
  text-align: center;
  padding: 40px 20px;
  font-size: 16px;
  color: #666;
`;

export const BanknoteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
  padding: 20px 0;
`;

export const BanknoteCard = styled.div`
  background: #2b333aff;
  border: 1px solid #424950ff;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: #4c5c68ff;
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(-2px);
  }
`;

export const BanknoteImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
  border: 2px solid #424950ff;
  transition: border-color 0.2s ease;

  ${BanknoteCard}:hover & {
    border-color: #667eea;
  }
`;

export const BanknoteName = styled.div`
  color: #e0e0e0;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
`;

export const BanknoteCode = styled.div`
  color: #B0B0B0;
  font-size: 12px;
  font-family: monospace;
  background: #1e242bff;
  padding: 4px 8px;
  border-radius: 4px;
  margin-bottom: 8px;
  display: inline-block;
`;

export const BanknoteActions = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
`;

export const EditButton = styled.button`
  background: #00aaff;
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;

  &:hover {
    background: #0088cc;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const DeleteButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;

  &:hover {
    background: #c82333;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

