import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResultsPage from './User/Result/ResultPage';
import UserPage from "./User/UserPage";
import LoginPage from './Login/LoginPage';
import AuthPanel from './Login/AuthPanel';
import ProtectedRoute from './components/ProtectedRoute';
import UserComponent from './components/UserComponent';
function App() {
  return (
      <Router>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Routes>
            {/*<Route path="/" element={<UploadPage />} />*/}
            <Route path="/results" element={<ResultsPage />} />
            {/* <Route path="/" element={<LoginPage />} /> */}
            <Route path="/user" element={<UserPage/>} />
            <Route path="/auth" element={<AuthPanel />} />
            <Route path="/user" element={
              <ProtectedRoute>
                <UserComponent />
              </ProtectedRoute>
            } />
            <Route path="/" element={<AuthPanel />} /></Routes>
        </div>
      </Router>
  );
}

export default App;