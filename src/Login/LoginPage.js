// src/components/LoginPage.js

import styled from 'styled-components';
import GlobalStyles from '../components/GlobalStyles';
import InputPanel from './InputPanel';

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
`;

function LoginPage() {
  return (
    <>
      <GlobalStyles/>
      <AppContainer>
      <InputPanel>
      </InputPanel>
      </AppContainer>
    </>
  );
}

export default LoginPage;