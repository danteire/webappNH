import { useState, useEffect } from 'react';
import {
  MainContainer,
  RightColumn,
  TopBar,
  Title,
} from "../Dashboard/Dashboard.styles";
import GlobalStyles from '../../components/GlobalStyles';
import authService from '../../services/authService';
import banknoteService from '../../services/banknoteService';
import BanknoteEditModal from '../BanknoteEdit/BanknoteEditModal';

import { FaFlag, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import {
  LoadingOrError,
  BanknoteGrid,
  BanknoteCard,
  BanknoteImage,
  BanknoteName,
  BanknoteCode,
  BanknoteActions,
  EditButton,
  DeleteButton
} from './BanknoteListPage.styles'

const BanknoteListPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBanknote, setEditingBanknote] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [banknotes, setBanknotes] = useState([]);

  useEffect(() => {
    loadBanknotes();
  }, []);

  const loadBanknotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await banknoteService.getBanknotes();
      setBanknotes(data);
    } catch (err) {
      setError('Nie udało się załadować banknotów');
      console.error('Error loading banknotes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditBanknote = (banknote) => {
    setEditingBanknote(banknote);
    setIsEditModalOpen(true);
  };

  const handleSaveBanknote = async (updatedBanknote) => {
    try {
      if (updatedBanknote.id) {
        // Aktualizacja istniejącego banknotu
        await banknoteService.updateBanknote(updatedBanknote.id, {
          country: updatedBanknote.country,
          currency: updatedBanknote.currency,
          denomination: updatedBanknote.denomination,
          effigy: updatedBanknote.effigy,
          dimensions: updatedBanknote.dimensions,
          description: updatedBanknote.description,
          image_avers: updatedBanknote.image_avers,
          image_rewers: updatedBanknote.image_rewers
        });
      } else {
        // Tworzenie nowego banknotu
        await banknoteService.createBanknote({
          country: updatedBanknote.country,
          currency: updatedBanknote.currency,
          denomination: updatedBanknote.denomination,
          effigy: updatedBanknote.effigy,
          dimensions: updatedBanknote.dimensions,
          description: updatedBanknote.description,
          image_avers: updatedBanknote.image_avers,
          image_rewers: updatedBanknote.image_rewers
        });
      }
      
      // Przeładuj listę banknotów
      await loadBanknotes();
      setEditingBanknote(null);
      setIsEditModalOpen(false);
    } catch (err) {
      console.error('Error saving banknote:', err);
      setError('Nie udało się zapisać banknotu');
    }
  };

  const handleCloseModal = () => {
    setEditingBanknote(null);
    setIsEditModalOpen(false);
  };

  const handleAddBanknote = () => {
    setEditingBanknote({
      country: '',
      currency: '',
      denomination: '',
      effigy: '',
      dimensions: '',
      description: '',
      image_avers: '',
      image_rewers: ''
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteBanknote = async (banknote) => {
    if (window.confirm(`Czy na pewno chcesz usunąć banknot "${banknote.denomination}"?`)) {
      try {
        await banknoteService.deleteBanknote(banknote.id);
        await loadBanknotes();
      } catch (err) {
        console.error('Error deleting banknote:', err);
        setError('Nie udało się usunąć banknotu');
      }
    }
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingOrError>Ładowanie banknotów...</LoadingOrError>;
    }

    if (error) {
      return <LoadingOrError>Wystąpił błąd: {error}</LoadingOrError>;
    }

    return (
      <BanknoteGrid>
        {banknotes.map((banknote) => (
          <BanknoteCard key={banknote.id}>
            <BanknoteImage 
              src={banknoteService.getImageUrl(banknote.image_avers)} 
              alt={banknote.denomination}
              onError={(e) => {
                console.error('Error loading admin banknote image:', e.target.src);
                e.target.src = '/resources/nieznany_banknot.png';
              }}
              onLoad={() => {
                console.log('Admin banknote image loaded successfully:', banknoteService.getImageUrl(banknote.image_avers));
              }}
            />
            <BanknoteName>{banknote.denomination}</BanknoteName>
            <BanknoteCode>{banknote.country} - {banknote.currency}</BanknoteCode>
            {banknote.effigy && (
              <div style={{ color: '#B0B0B0', fontSize: '12px', marginTop: '4px' }}>
                Wizerunek: {banknote.effigy}
              </div>
            )}
            {banknote.dimensions && (
              <div style={{ color: '#B0B0B0', fontSize: '12px' }}>
                Wymiary: {banknote.dimensions}
              </div>
            )}
            <BanknoteActions>
              <EditButton onClick={() => handleEditBanknote(banknote)}>
                <FaEdit />
                Edytuj
              </EditButton>
              <DeleteButton onClick={() => handleDeleteBanknote(banknote)}>
                <FaTrash />
                Usuń
              </DeleteButton>
            </BanknoteActions>
          </BanknoteCard>
        ))}
      </BanknoteGrid>
    );
  };
  
  return (
    <>
      <GlobalStyles />
      <MainContainer>
        <RightColumn>
          <TopBar>
            <FaFlag onClick={() =>{
                navigate('/admin')
            }}/>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <EditButton onClick={handleAddBanknote}>
                <FaPlus />
                Dodaj banknot
              </EditButton>
            </div>
          </TopBar>
          <Title>Banknoty w Bazie Danych</Title>
          
          {renderContent()}
        </RightColumn>
      </MainContainer>
      
      <BanknoteEditModal
        banknote={editingBanknote}
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveBanknote}
      />
    </>
  );
}

export default BanknoteListPage;

