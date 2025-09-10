import { useState, useEffect } from 'react';
import {
  MainContainer,
  RightColumn,
  TopBar,
  Title,
} from "../Dashboard/Dashboard.styles";
import GlobalStyles from '../../components/GlobalStyles';
import authService from '../../services/authService';

import { FaUserCircle } from "react-icons/fa";
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
  StatusIndicator,
  DeleteButton,
  AdminToggleButton,
  ActionCell,
  SuccessMessage,
  ErrorMessage,
  AddUserButton,
  AddUserForm,
  FormGroup,
  FormLabel,
  FormInput,
  FormCheckbox,
  FormActions,
  FormButton,
  CheckboxLabel
} from './UserListPage.styles'

const UserListPage = () => {
  const navigate = useNavigate();

  // Stany do przechowywania danych i komunikatów
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [updatingUsers, setUpdatingUsers] = useState(new Set());
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    admin: false
  });
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  // useEffect do pobrania danych po zamontowaniu komponentu
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await authService.authenticatedRequest('/api/admin/users');
        
        if (!response.ok) {
          throw new Error(`Błąd HTTP! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setUsers(data);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Funkcja do przełączania uprawnień administratora
  const handleAdminToggle = async (userID, currentAdminStatus) => {
    const newAdminStatus = !currentAdminStatus;
    
    if (!window.confirm(`Czy na pewno chcesz ${newAdminStatus ? 'nadać' : 'odebrać'} uprawnienia administratora użytkownikowi o ID ${userID}?`)) {
      return;
    }

    // Dodaj użytkownika do listy aktualizowanych
    setUpdatingUsers(prev => new Set(prev).add(userID));

    try {
      const response = await authService.authenticatedRequest(`/api/admin/users/${userID}/admin`, {
        method: 'PUT'
      });

      if (!response.ok) {
        let errorMessage = `Błąd serwera (${response.status})`;
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorMessage;
        } catch {
          // Jeśli nie da się sparsować JSON, użyj ogólnego komunikatu
        }
        
        throw new Error(errorMessage);
      }

      const responseData = await response.json();

      // Zaktualizuj lokalny stan
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userID 
            ? { ...user, admin: newAdminStatus }
            : user
        )
      );

      // Pokaż komunikat o sukcesie
      setSuccessMessage(`Pomyślnie ${newAdminStatus ? 'nadano' : 'odebrano'} uprawnienia administratora użytkownikowi ${responseData.username || userID}`);
      setError(null);
      
      // Wyczyść komunikat po 5 sekundach
      setTimeout(() => setSuccessMessage(''), 5000);
      
    } catch (error) {
      console.error(`Error updating admin privileges for user ${userID}:`, error);
      setError(`Nie udało się zaktualizować uprawnień: ${error.message}`);
    } finally {
      // Usuń użytkownika z listy aktualizowanych
      setUpdatingUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(userID);
        return newSet;
      });
    }
  };

  // Funkcja do dodawania nowego użytkownika
  const handleAddUser = async (e) => {
    e.preventDefault();
    
    // Walidacja
    if (!newUser.username.trim() || !newUser.password.trim()) {
      setError('Nazwa użytkownika i hasło są wymagane');
      return;
    }

    if (newUser.username.length < 3) {
      setError('Nazwa użytkownika musi mieć co najmniej 3 znaki');
      return;
    }

    if (newUser.password.length < 6) {
      setError('Hasło musi mieć co najmniej 6 znaków');
      return;
    }

    setIsCreatingUser(true);
    setError(null);

    try {
      const response = await authService.authenticatedRequest('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: newUser.username,
          password: newUser.password
        })
      });

      if (!response.ok) {
        let errorMessage = `Błąd serwera (${response.status})`;
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorMessage;
        } catch {
          // Jeśli nie da się sparsować JSON, użyj ogólnego komunikatu
        }
        
        throw new Error(errorMessage);
      }

      const createdUser = await response.json();

      // Dodaj nowego użytkownika do lokalnego stanu
      setUsers(prevUsers => [...prevUsers, createdUser]);
      
      // Reset formularza
      setNewUser({
        username: '',
        password: '',
        admin: false
      });
      setShowAddUserForm(false);
      
      // Pokaż komunikat o sukcesie
      setSuccessMessage(`Użytkownik '${createdUser.username}' został pomyślnie utworzony`);
      setTimeout(() => setSuccessMessage(''), 5000);
      
    } catch (error) {
      console.error('Error creating user:', error);
      setError(`Nie udało się utworzyć użytkownika: ${error.message}`);
    } finally {
      setIsCreatingUser(false);
    }
  };

  // Funkcja do anulowania dodawania użytkownika
  const handleCancelAddUser = () => {
    setNewUser({
      username: '',
      password: '',
      admin: false
    });
    setShowAddUserForm(false);
    setError(null);
  };

  // Funkcja do usuwania użytkownika
  const handleDeleteClick = async (userID) => {
    if (!window.confirm('Czy na pewno chcesz usunąć tego użytkownika?\n\nUwaga: Historia użytkownika zostanie zachowana, ale powiązanie z użytkownikiem zostanie usunięte.')) {
      return;
    }

    try {
      const response = await authService.authenticatedRequest(`/api/admin/users/${userID}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        let errorMessage = `Błąd serwera (${response.status})`;
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorMessage;
        } catch {
          // Jeśli nie da się sparsować JSON, użyj ogólnego komunikatu
        }
        
        throw new Error(errorMessage);
      }

      // Usuń użytkownika z lokalnego stanu po udanym usunięciu
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userID));
      
      // Pokaż komunikat o sukcesie
      setSuccessMessage(`Użytkownik o ID ${userID} został pomyślnie usunięty.`);
      
      setError(null);
      setTimeout(() => setSuccessMessage(''), 5000);
      
    } catch (error) {
      console.error(`Error deleting user ${userID}:`, error);
      setError(`Nie udało się usunąć użytkownika: ${error.message}`);
    }
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingOrError>Ładowanie danych...</LoadingOrError>;
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
              <TableHeader>UserName</TableHeader>
              <TableHeader>Admin Privilege</TableHeader>
              <TableHeader>Creation Time</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <StatusIndicator active={user.admin}>
                    {user.admin ? 'Admin' : 'User'}
                  </StatusIndicator>
                </TableCell>
                <TableCell>{new Date(user.created_at).toLocaleString('pl-PL')}</TableCell>
                <ActionCell>
                  <AdminToggleButton
                    onClick={() => handleAdminToggle(user.id, user.admin)}
                    disabled={updatingUsers.has(user.id)}
                    isAdmin={user.admin}
                  >
                    {updatingUsers.has(user.id) 
                      ? '...' 
                      : user.admin 
                        ? '↓ Usuń Admin' 
                        : '↑ Nadaj Admin'
                    }
                  </AdminToggleButton>
                  <DeleteButton 
                    onClick={() => handleDeleteClick(user.id)}
                    disabled={updatingUsers.has(user.id)}
                  >
                    🗑️ Usuń
                  </DeleteButton>
                </ActionCell>
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
          <Title>Lista Użytkowników</Title>
          
          {/* Komunikaty */}
          {successMessage && (
            <SuccessMessage>
              ✅ {successMessage}
            </SuccessMessage>
          )}
          
          {error && (
            <ErrorMessage>
              ❌ {error}
            </ErrorMessage>
          )}
          
          {renderContent()}

          {/* Przycisk dodania użytkownika */}
          {!showAddUserForm && (
            <AddUserButton onClick={() => setShowAddUserForm(true)}>
              ➕ Dodaj Nowego Użytkownika
            </AddUserButton>
          )}

          {/* Formularz dodania użytkownika */}
          {showAddUserForm && (
            <AddUserForm onSubmit={handleAddUser}>
              <h3>Dodaj Nowego Użytkownika</h3>
              
              <FormGroup>
                <FormLabel htmlFor="username">Nazwa użytkownika:</FormLabel>
                <FormInput
                  type="text"
                  id="username"
                  value={newUser.username}
                  onChange={(e) => setNewUser(prev => ({...prev, username: e.target.value}))}
                  placeholder="Wprowadź nazwę użytkownika"
                  required
                  minLength={3}
                  disabled={isCreatingUser}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="password">Hasło:</FormLabel>
                <FormInput
                  type="password"
                  id="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser(prev => ({...prev, password: e.target.value}))}
                  placeholder="Wprowadź hasło (min. 6 znaków)"
                  required
                  minLength={6}
                  disabled={isCreatingUser}
                />
              </FormGroup>

              <FormActions>
                <FormButton 
                  type="submit" 
                  primary
                  disabled={isCreatingUser}
                >
                  {isCreatingUser ? '⏳ Tworzenie...' : '✅ Utwórz Użytkownika'}
                </FormButton>
                <FormButton 
                  type="button" 
                  onClick={handleCancelAddUser}
                  disabled={isCreatingUser}
                >
                  ❌ Anuluj
                </FormButton>
              </FormActions>
            </AddUserForm>
          )}

        </RightColumn>
      </MainContainer>
    </>
  );
}

export default UserListPage;

