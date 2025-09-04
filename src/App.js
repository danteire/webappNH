import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResultsPage from './User/Result/ResultPage';
import UserPage from "./User/UserPage";
import LoginPage from './Login/LoginPage';
import AdminPage from './Admin/AdminPage';
import UserListPage from './Admin/UserList/UserListPage'
import BanknoteListPage from './Admin/BanknoteList/BanknoteListPage'

function App() {
  return (
      <Router>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Routes>
            {/*<Route path="/" element={<UploadPage />} />*/}
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/user" element={<UserPage/>} />
            <Route path="/admin" element={<AdminPage/>} />
            <Route path="/admin/userlist" element={< UserListPage/>} />
            <Route path="/admin/banknotelist" element={< BanknoteListPage/>} />

          </Routes>
        </div>
      </Router>
  );
}

export default App;