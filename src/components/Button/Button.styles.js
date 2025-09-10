import styled from 'styled-components';
import { media } from '../../Login/breakpoints.js';

const getVariantStyles = (variant) => {
  switch (variant) {
    case 'primary':
      return `
        background-color: #3A3A40;
        color: #E0E0E0;
        border: none;

        &:hover:not(:disabled) {
          background-color: #505057;
        }
      `;
    
    case 'secondary':
      return `
        background-color: transparent;
        border: 1px solid #4A4A52;
        color: #B0B0B0;

        &:hover:not(:disabled) {
          background-color: #3A3A40;
          border-color: #3A3A40;
          color: #E0E0E0;
        }
      `;
    
    case 'success':
      return `
        background-color: #28a745;
        color: white;
        border: none;

        &:hover:not(:disabled) {
          background-color: #218838;
        }
      `;
    
    case 'danger':
      return `
        background-color: #dc3545;
        color: white;
        border: none;

        &:hover:not(:disabled) {
          background-color: #c82333;
        }
      `;
    
    case 'warning':
      return `
        background-color: #ffc107;
        color: #212529;
        border: none;

        &:hover:not(:disabled) {
          background-color: #e0a800;
        }
      `;
    
    case 'info':
      return `
        background-color: #17a2b8;
        color: white;
        border: none;

        &:hover:not(:disabled) {
          background-color: #138496;
        }
      `;
    
    case 'ghost':
      return `
        background-color: transparent;
        color: #B0B0B0;
        border: none;

        &:hover:not(:disabled) {
          background-color: rgba(255, 255, 255, 0.1);
          color: #E0E0E0;
        }
      `;
    
    default:
      return `
        background-color: #3A3A40;
        color: #E0E0E0;
        border: none;

        &:hover:not(:disabled) {
          background-color: #505057;
        }
      `;
  }
};

const getSizeStyles = (size) => {
  switch (size) {
    case 'small':
      return `
        padding: 8px 16px;
        font-size: 0.9rem;
        border-radius: 4px;
        gap: 6px;
      `;
    
    case 'medium':
      return `
        padding: 12px 20px;
        font-size: 1rem;
        border-radius: 6px;
        gap: 8px;
      `;
    
    case 'large':
      return `
        padding: 15px 25px;
        font-size: 1.1rem;
        border-radius: 8px;
        gap: 10px;
      `;
    
    default:
      return `
        padding: 12px 20px;
        font-size: 1rem;
        border-radius: 6px;
        gap: 8px;
      `;
  }
};

export const ButtonContainer = styled.button`
  /* Base styles */
  cursor: pointer;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  user-select: none;
  white-space: nowrap;
  
  /* Disabled state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  /* Focus state */
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
  }
  
  /* Variant styles */
  ${props => getVariantStyles(props.variant)}
  
  /* Size styles */
  ${props => getSizeStyles(props.size)}
  
  /* Responsive styles */
  ${media.tablet} {
    ${props => props.size === 'medium' && `
      padding: 11px 18px;
      font-size: 0.95rem;
      gap: 7px;
    `}
    ${props => props.size === 'large' && `
      padding: 14px 23px;
      font-size: 1.05rem;
      gap: 9px;
    `}
  }
  
  ${media.mobile} {
    ${props => props.size === 'medium' && `
      padding: 12px 20px;
      font-size: 1rem;
      gap: 8px;
    `}
    ${props => props.size === 'large' && `
      padding: 15px 25px;
      font-size: 1.1rem;
      gap: 10px;
    `}
  }
  
  ${media.smallMobile} {
    ${props => props.size === 'medium' && `
      padding: 11px 18px;
      font-size: 0.95rem;
      gap: 7px;
    `}
    ${props => props.size === 'large' && `
      padding: 14px 23px;
      font-size: 1.05rem;
      gap: 9px;
    `}
  }
  
  ${media.verySmallMobile} {
    ${props => props.size === 'medium' && `
      padding: 10px 16px;
      font-size: 0.9rem;
      gap: 6px;
    `}
    ${props => props.size === 'large' && `
      padding: 13px 21px;
      font-size: 1rem;
      gap: 8px;
    `}
  }
`;
