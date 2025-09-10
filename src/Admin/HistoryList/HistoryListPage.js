import { useState, useEffect } from 'react';
import {
  MainContainer,
  RightColumn,
  TopBar,
  Title,
} from "../Dashboard/Dashboard.styles";
import GlobalStyles from '../../components/GlobalStyles';
import authService from '../../services/authService';

import { FaDatabase } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

import {
  LoadingOrError,
  TableWrapper,
  StyledTable,
  TableHeader,
  TableRow,
  TableCell,
  PredictionBadge,
  DateCell
} from './HistoryListPage.styles'

const HistoryListPage = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await authService.authenticatedRequest('/api/admin/history');
        
        if (!response.ok) {
          throw new Error(`Błąd HTTP! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setHistory(data);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const getPredictionColor = (prediction) => {
    if (prediction === 'Nie rozpoznano') return '#f44336';
    if (prediction.includes('PLN')) return '#4CAF50';
    if (prediction.includes('EUR')) return '#2196F3';
    if (prediction.includes('USD')) return '#FF9800';
    if (prediction.includes('TRY')) return '#9C27B0';
    return '#757575';
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingOrError>Ładowanie historii...</LoadingOrError>;
    }

    if (error) {
      return <LoadingOrError>Wystąpił błąd: {error}</LoadingOrError>;
    }

    return (
      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              <TableHeader>ID</TableHeader>
              <TableHeader>Użytkownik</TableHeader>
              <TableHeader>Przewidywanie</TableHeader>
              <TableHeader>Data</TableHeader>
            </tr>
          </thead>
          <tbody>
            {history.map(entry => (
              <TableRow key={entry.id}>
                <TableCell>{entry.id}</TableCell>
                <TableCell>{entry.username}</TableCell>
                <TableCell>
                  <PredictionBadge color={getPredictionColor(entry.prediction)}>
                    {entry.prediction}
                  </PredictionBadge>
                </TableCell>
                <DateCell>{new Date(entry.timestamp).toLocaleString('pl-PL')}</DateCell>
              </TableRow>
            ))}
          </tbody>
        </StyledTable>
      </TableWrapper>
    );
  };
  
  return (
    <>
      <GlobalStyles />
      <MainContainer>
        <RightColumn>
          <TopBar>
            <Button 
              variant="secondary" 
              size="medium" 
              onClick={() => navigate('/admin')}
            >
              <FiArrowLeft />
              Powrót
            </Button>
          </TopBar>
          <Title>Historia Wszystkich Użytkowników</Title>
          
          {renderContent()}
        </RightColumn>
      </MainContainer>
    </>
  );
}

export default HistoryListPage;

