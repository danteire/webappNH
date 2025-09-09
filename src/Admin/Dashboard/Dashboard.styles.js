// src/Admin/Dashboard.styles.js
import styled from "styled-components";
import { media } from './breakpoints.js';

export const MainContainer = styled.main`
  flex-grow: 1;
  padding: 20px;
  background-color: #1A1A1D;
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  
  ${media.tablet} {
    padding: 15px;
    flex-direction: column;
  }
  
  ${media.mobile} {
    padding: 10px;
    flex-direction: column;
  }
  
  @media (max-width: 360px) {
    padding: 5px;
  }
`;

export const RightColumn = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 0;
  
  ${media.tablet} {
    min-height: 0;
    align-items: center;
  }
  
  ${media.mobile} {
    min-height: 0;
    align-items: center;
  }
  
  @media (max-width: 360px) {
    min-height: 0;
    align-items: center;
  }
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;

  svg {
    font-size: 1.4rem;
    color: #B0B0B0;
    margin-left: 20px;
    cursor: pointer;
    transition: color 0.2s ease;
    
    &:hover {
      color: #E0E0E0;
    }
  }
  
  ${media.tablet} {
    margin-bottom: 15px;
    justify-content: flex-end;
    
    svg {
      font-size: 1.2rem;
      margin-left: 15px;
    }
  }
  
  ${media.mobile} {
    margin-bottom: 10px;
    justify-content: flex-end;
    
    svg {
      font-size: 1.1rem;
      margin-left: 10px;
    }
  }
  
  @media (max-width: 360px) {
    margin-bottom: 8px;
    justify-content: flex-end;
    
    svg {
      font-size: 1rem;
      margin-left: 8px;
    }
  }
`;

export const Title = styled.h3`
  color: #E0E0E0;
  margin-top: 0;
  margin-bottom: 30px;
  text-align: center;
  font-size: 32px;
  width: 100%;
  
  ${media.tablet} {
    font-size: 28px;
    margin-bottom: 20px;
    text-align: center;
  }
  
  ${media.mobile} {
    font-size: 24px;
    margin-bottom: 15px;
    text-align: center;
  }
  
  @media (max-width: 360px) {
    font-size: 20px;
    margin-bottom: 10px;
    text-align: center;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  flex-shrink: 0;
  
  ${media.tablet} {
    grid-template-columns: 1fr;
    gap: 15px;
    max-width: 600px;
  }
  
  ${media.mobile} {
    gap: 10px;
    max-width: 100%;
    padding: 0 10px;
  }
  
  @media (max-width: 360px) {
    gap: 8px;
    padding: 0 5px;
  }
`;

export const Card = styled.div`
  background-color: #2A2A2E;
  border: 1px solid #4A4A52;
  border-radius: 12px;
  padding: 25px;
  color: #E0E0E0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: background-color 0.2s, transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  min-height: 120px;
  max-height: 200px;

  &:hover {
    background-color: #3A3A40;
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(-2px);
    background-color: #4A4A52;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  }

  svg {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: #7FB3D3;
  }
  
  ${media.tablet} {
    padding: 20px;
    min-height: 100px;
    max-height: 180px;
    
    svg {
      font-size: 2.2rem;
      margin-bottom: 12px;
    }
  }
  
  ${media.mobile} {
    padding: 15px;
    min-height: 90px;
    max-height: 160px;
    
    svg {
      font-size: 2rem;
      margin-bottom: 10px;
    }
  }
  
  @media (max-width: 360px) {
    padding: 12px;
    min-height: 80px;
    max-height: 140px;
    
    svg {
      font-size: 1.8rem;
      margin-bottom: 8px;
    }
  }
`;

export const CardTitle = styled.h4`
  font-size: 1.2rem;
  margin: 0;
  margin-bottom: 10px;
  text-align: center;
  
  ${media.tablet} {
    font-size: 1.1rem;
    margin-bottom: 8px;
  }
  
  ${media.mobile} {
    font-size: 1rem;
    margin-bottom: 6px;
  }
  
  @media (max-width: 360px) {
    font-size: 0.9rem;
    margin-bottom: 4px;
  }
`;

export const CardValue = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0;
  color: #E0E0E0;
  text-align: center;
  
  ${media.tablet} {
    font-size: 1.6rem;
  }
  
  ${media.mobile} {
    font-size: 1.4rem;
  }
  
  @media (max-width: 360px) {
    font-size: 1.2rem;
  }
`;

export const AppContainer = styled.div`
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
  
  @media (max-width: 360px) {
    min-height: 350px;
    border-radius: 5px;
  }
`;

export const ErrorMessage = styled.p`
  color: orange;
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  
  ${media.tablet} {
    margin-top: 15px;
    font-size: 13px;
  }
  
  ${media.mobile} {
    margin-top: 10px;
    font-size: 12px;
  }
  
  @media (max-width: 360px) {
    margin-top: 8px;
    font-size: 11px;
  }
`;

export const LoadingMessage = styled.p`
  color: white;
  margin: auto;
  font-size: 16px;
  
  ${media.tablet} {
    font-size: 15px;
  }
  
  ${media.mobile} {
    font-size: 14px;
  }
  
  @media (max-width: 360px) {
    font-size: 13px;
  }
`;

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
    background-color: #3A3A3E;
  }

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }

  &:only-child {
    border-radius: 8px;
  }
`;

