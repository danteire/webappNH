// src/components/MenuPage.js
import React from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import RecognitionPanel from './RecognitionPanel';
import GlobalStyles from '../../components/GlobalStyles';
import authService from '../../services/authService';
import { media } from './breakpoints.js';

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
    padding: 0;
  }
  
  @media (max-width: 480px) {
    padding: 0;
  }
  
  @media (max-width: 360px) {
    padding: 0;
  }
`;

const AppContainer = styled.div`
  display: flex;
  width: 1400px;
  height: 700px;
  background-color: #1A1A1D;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  
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

function MenuPage() {
  const user = authService.getUser();
  const userId = user ? user.id : null;

  return (
    <>
      <GlobalStyles/>
      <PageWrapper>
        <AppContainer>
          <MainContent userId={userId} />
        </AppContainer>
      </PageWrapper>
    </>
  );
}

export default MenuPage;