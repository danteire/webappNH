import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ResultsPage from './User/Result/ResultPage';
import UserPage from "./User/UserPage";
import LoginPage from './Login/LoginPage';
import AdminPage from './Admin/AdminPage';
import UserListPage from './Admin/UserList/UserListPage';
import BanknoteListPage from './Admin/BanknoteList/BanknoteListPage';
import HistoryListPage from './Admin/HistoryList/HistoryListPage';
import UserBanknoteListPage from './User/BanknoteList/BanknoteListPage';
import BanknoteDetailPage from './User/BanknoteDetail/BanknoteDetailPage';
import GuestPage from './Guest/GuestPage';
import GuestResultsPage from './Guest/GuestResultsPage';
import authService from './services/authService';
import GlobalStyles from './components/GlobalStyles';

// Komponent chroniony - wymaga logowania
const ProtectedRoute = ({ children }) => {
  return authService.isAuthenticated() ? children : <Navigate to="/" />;
};

// Komponent chroniony - wymaga uprawnień administratora
const AdminRoute = ({ children }) => {
  const user = authService.getUser();
  return (authService.isAuthenticated() && user && user.admin) ? children : <Navigate to="/user" />;
};

function App() {
  return (
      <Router>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/user" element={
            <ProtectedRoute>
              <UserPage/>
            </ProtectedRoute>
          } />
          <Route path="/results" element={
            <ProtectedRoute>
              <ResultsPage />
            </ProtectedRoute>
          } />
          <Route path="/user/banknotes" element={
            <ProtectedRoute>
              <UserBanknoteListPage />
            </ProtectedRoute>
          } />
          <Route path="/user/banknote/:banknoteId" element={
            <ProtectedRoute>
              <BanknoteDetailPage />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          } />
          <Route path="/admin/userlist" element={
            <AdminRoute>
              <UserListPage />
            </AdminRoute>
          } />
          <Route path="/admin/banknotelist" element={
            <AdminRoute>
              <BanknoteListPage />
            </AdminRoute>
          } />
          <Route path="/admin/history" element={
            <AdminRoute>
              <HistoryListPage />
            </AdminRoute>
          } />
          <Route path="/guest" element={<GuestPage />} />
          <Route path="/guest-results" element={<GuestResultsPage />} />
        </Routes>
      </Router>
  );
}

export default App;