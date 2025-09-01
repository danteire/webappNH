import styled, { keyframes } from 'styled-components';

// Animacje
export const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Główne kontenery
export const MainContainer = styled.main`
  flex-grow: 1;
  padding: 20px;
  background-color: #1A1A1D;
  display: flex;
  position: relative;
`;

export const LeftColumn = styled.div`
  width: 300px;
  margin-right: 20px;
`;

export const RightColumn = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 60px;

  svg {
    font-size: 1.4rem;
    color: #B0B0B0;
    margin-left: 20px;
    cursor: pointer;
  }
`;

export const ContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

// Typografia
export const Title = styled.h3`
  color: #E0E0E0;
  margin-bottom: 20px;
  text-align: center;
  font-size: 35px;
`;

// Upload komponenty
export const UploadBox = styled.label`
  width: 350px;
  height: 180px;
  border: 2px dashed #4A4A52;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
  cursor: pointer;
  transition: border-color 0.2s;
  margin-top: 60px;

  &:hover {
    border-color: #6A6A72;
  }

  input {
    display: none;
  }
`;

export const UploadIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

export const UploadFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;

  p {
    margin-top: 80px;
    color: #B0B0B0;
  }
`;

// Przyciski
export const UploadButton = styled.button`
  margin-top: 40px;
  padding: 10px 20px;
  background-color: #3A3A40;
  color: #E0E0E0;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #505057;
  }

  &:disabled {
    background-color: #2e2e33;
    cursor: not-allowed;
  }
`;

export const BackButton = styled(UploadButton)`
  margin-top: 30px;
`;

export const ClearStorageButton = styled.button`
  margin-top: 10px;
  padding: 6px 12px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #ff5252;
  }
`;

// Komunikaty
export const ErrorMessage = styled.p`
  color: #ff6b6b;
  margin-top: 20px;
  font-weight: 500;
`;

export const WarningMessage = styled.p`
  color: #ffa500;
  margin-top: 10px;
  font-weight: 500;
  font-size: 0.9rem;
`;

export const FileName = styled.p`
  margin-top: 20px;
  color: #B0B0B0;
  font-weight: 500;
`;

export const StorageInfo = styled.div`
  color: #B0B0B0;
  font-size: 0.8rem;
  margin-top: 10px;
  text-align: center;
`;

// Szczegóły
export const DetailsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #E0E0E0;
`;

export const Thumbnail = styled.img`
  max-width: 400px;
  max-height: 250px;
  border-radius: 10px;
  margin: 20px 0;
  border: 2px solid #4A4A52;
  background-color: #2e2e33;
`;

export const DetailText = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: #B0B0B0;

  span {
    font-weight: bold;
    color: #E0E0E0;
  }
`;

// Loading
export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

export const LoadingSpinner = styled.div`
  animation: ${spin} 1s linear infinite;
  display: block;
  margin: 50px auto;
`;

// Tooltip
export const Tooltip = styled.div`
  position: absolute;
  background-color: #2A2A2E;
  border: 1px solid #4A4A52;
  border-radius: 8px;
  padding: 12px;
  color: #E0E0E0;
  font-size: 0.85rem;
  z-index: 1000;
  max-width: 250px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  pointer-events: none;
  opacity: ${props => props.visible ? 1 : 0};
  transform: ${props => props.visible ? 'translateY(0)' : 'translateY(5px)'};
  transition: opacity 0.2s ease, transform 0.2s ease;
  
  &:before {
    content: '';
    position: absolute;
    top: -6px;
    left: 20px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #2A2A2E;
  }
`;

export const TooltipImage = styled.img`
  width: 80px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 8px;
  border: 1px solid #4A4A52;
`;

export const TooltipText = styled.div`
  line-height: 1.4;
  
  .banknote {
    font-weight: bold;
    color: #7FB3D3;
    margin-bottom: 4px;
  }
  
  .date {
    color: #B0B0B0;
    font-size: 0.8rem;
  }
`;

// Kolory i zmienne (opcjonalne)
export const colors = {
  background: '#1A1A1D',
  surface: '#2A2A2E',
  surfaceHover: '#3A3A40',
  border: '#4A4A52',
  borderHover: '#6A6A72',
  text: '#E0E0E0',
  textSecondary: '#B0B0B0',
  textMuted: '#888',
  accent: '#7FB3D3',
  error: '#ff6b6b',
  warning: '#ffa500'
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  xxl: '40px'
};