import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: #121212;
    color: #E0E0E0;
    min-height: 100vh;
  }

  /* Style dla głównych stron aplikacji (nie ResultPage) */
  body:not(.result-page) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  /* Responsywność */
  @media (max-width: 768px) {
    body:not(.result-page) {
      align-items: flex-start;
      padding: 10px;
    }
  }

  @media (max-width: 480px) {
    body:not(.result-page) {
      padding: 5px;
    }
  }
`;

export default GlobalStyles;