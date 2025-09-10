import styled, { keyframes } from 'styled-components';
import { media, breakpoints } from './breakpoints.js';

export const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const MainContainer = styled.main`
  flex-grow: 1;
  padding: 20px;
  background-color: #1A1A1D;
  display: flex;
  position: relative;
  min-height: 100vh;
  width: 100%;
  
  ${media.tablet} {
    padding: 15px;
    flex-direction: row;
    min-height: auto;
  }
  
  ${media.mobile} {
    padding: 10px;
    flex-direction: column;
    min-height: auto;
  }
  
  @media (max-width: 480px) {
    padding: 8px;
    flex-direction: column;
  }
  
  @media (max-width: 360px) {
    padding: 5px;
    flex-direction: column;
  }
`;

export const LeftColumn = styled.div`
  width: 300px;
  margin-right: 20px;
  height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  
  ${media.tablet} {
    width: 280px;
    height: calc(100vh - 30px);
    margin-right: 15px;
    margin-bottom: 0;
    flex-shrink: 0;
  }
  
  ${media.mobile} {
    width: 100%;
    height: auto;
    max-height: 250px;
    margin-right: 0;
    margin-bottom: 0;
    margin-top: 15px;
    order: 2;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    height: auto;
    max-height: 220px;
    margin-right: 0;
    margin-bottom: 0;
    margin-top: 10px;
    order: 2;
  }
  
  @media (max-width: 360px) {
    width: 100%;
    height: auto;
    max-height: 200px;
    margin-right: 0;
    margin-bottom: 0;
    margin-top: 8px;
    order: 2;
  }
`;

export const RightColumn = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  
  ${media.tablet} {
    min-height: calc(100vh - 30px);
  }
  
  ${media.mobile} {
    min-height: calc(100vh - 250px);
    order: 1;
  }
  
  @media (max-width: 480px) {
    min-height: calc(100vh - 230px);
    order: 1;
  }
  
  @media (max-width: 360px) {
    min-height: calc(100vh - 210px);
    order: 1;
  }
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

export const Title = styled.h3`
  color: #E0E0E0;
  margin-bottom: 20px;
  text-align: center;
  font-size: 35px;
  
  ${media.tablet} {
    font-size: 28px;
    margin-bottom: 15px;
  }
  
  ${media.mobile} {
    font-size: 24px;
    margin-bottom: 10px;
  }
`;

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
  
  ${media.tablet} {
    width: 100%;
    max-width: 500px;
    height: 160px;
    margin-top: 20px;
  }
  
  ${media.mobile} {
    width: 100%;
    height: 140px;
    margin-top: 15px;
    padding-bottom: 20px;
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

export const UploadButton = styled.button`
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #0056b3, #004085);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
  }

  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
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

export const WarningMessage = styled.p`
  color: #ffa500;
  margin-top: 10px;
  font-weight: 500;
  font-size: 0.9rem;
  text-align: center;
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

export const AlertBox = styled.div`
  position: absolute; /* Zmieniono z 'fixed' na 'absolute' */
  top: 0; /* Zmieniono z 20px, aby był na samej górze */
  left: 50%; 
  transform: translateX(-50%);
  padding: 15px 25px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  animation: ${fadeIn} 0.5s ease-out;
  color: white;
  font-weight: bold;
  font-size: 0.95rem;
  text-align: center;
  min-width: 250px;
  max-width: 90%;
  
  background-color: ${props => {
    switch(props.type) {
      case 'success':
        return '#4CAF50';
      case 'error':
        return '#ff6b6b';
      case 'warning':
        return '#ffa500';
      default:
        return '#444';
    }
  }};
`;

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

export const ThumbnailPlaceholder = styled.div`
  max-width: 400px;
  max-height: 250px;
  border-radius: 10px;
  margin: 20px 0;
  border: 2px solid #4A4A52;
  background-color: #2e2e33;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 1rem;
  min-height: 100px;
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
  warning: '#ffa500',
  success: '#32CD32'
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  xxl: '40px'
};

export const UserMenuContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #2A2A2E; 
  border: 1px solid #4A4A52;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  width: 160px;
  margin-top: 8px;
  overflow: hidden;
`;

export const DropdownItem = styled.div`
  padding: 10px 15px;
  color: #E0E0E0;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3A3A40; 
  }

  svg {
    font-size: 1.1rem;
    color: #B0B0B0;
  }
`;

// Nowe komponenty dla panelu uploadu jak u gościa
export const UploadSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const UploadArea = styled.div`
  border: 2px dashed #444;
  border-radius: 10px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #222;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: #007bff;
    background: #2a2a2a;
  }
`;

export const UploadPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  color: #B0B0B0;

  svg {
    font-size: 3rem;
    color: #007bff;
  }

  h3 {
    margin: 0;
    font-size: 1.3rem;
    color: #fff;
  }

  p {
    margin: 0;
    font-size: 1rem;
  }

  .upload-info {
    font-size: 0.9rem !important;
    color: #888 !important;
  }
`;

export const PreviewContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
`;

export const PreviewOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #fff;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 8px;

  ${PreviewContainer}:hover & {
    opacity: 1;
  }

  svg {
    font-size: 2rem;
  }
`;

export const FileInfo = styled.div`
  background: #222;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #333;

  p {
    margin: 5px 0;
    color: #B0B0B0;
    font-size: 0.9rem;
  }
`;

export const ErrorMessage = styled.div`
  background: #4a1a1a;
  color: #ff6b6b;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #6b2c2c;
  font-size: 0.9rem;
`;