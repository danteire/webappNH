import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import GlobalStyles from '../components/GlobalStyles';
import Dashboard from './Dashboard/Dashboard';

import styled from 'styled-components';
import { media } from './Dashboard/breakpoints.js';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #0F0F0F;
  
  ${media.tablet} {
    padding: 15px;
  }
  
  ${media.mobile} {
    padding: 10px;
  }
  
  @media (max-width: 480px) {
    padding: 5px;
  }
  
  @media (max-width: 360px) {
    padding: 0;
  }
`;

const AppContainer = styled.div`
  display: flex;
  width: 1200px;
  height: 700px;
  background-color: #1A1A1D;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  
  ${media.tablet} {
    width: 100%;
    height: auto;
    min-height: 500px;
    border-radius: 10px;
  }
  
  ${media.mobile} {
    width: 100%;
    height: auto;
    min-height: 400px;
    border-radius: 8px;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    height: auto;
    min-height: 350px;
    border-radius: 5px;
  }
  
  @media (max-width: 360px) {
    width: 100%;
    height: auto;
    min-height: 300px;
    border-radius: 5px;
  }
`;

function AdminPage() {
  const navigate = useNavigate();
  
  // Sprawdzenie czy użytkownik ma uprawnienia administratora
  useEffect(() => {
    const user = authService.getUser();
    if (!user || !user.admin) {
      navigate('/user');
      return;
    }
  }, [navigate]);

  return (
    <>
      <GlobalStyles/>
      <PageWrapper>
        <AppContainer>
          <Dashboard />
        </AppContainer>
      </PageWrapper>
    </>
  );
}

export default AdminPage;
