import styled from 'styled-components';
import { media } from './breakpoints.js';

// Istniejące style
export const LoadingOrError = styled.div`
  text-align: center;
  padding: 40px 20px;
  font-size: 16px;
  color: #666;
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
  margin-top: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  ${media.tablet} {
    margin-top: 15px;
  }
  
  ${media.mobile} {
    margin-top: 10px;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #2b333aff;
  border-radius: 12px;
  overflow: hidden;
`;

export const TableHeader = styled.th`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 16px 12px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  ${media.tablet} {
    padding: 12px 8px;
    font-size: 13px;
  }
  
  ${media.mobile} {
    padding: 10px 6px;
    font-size: 12px;
  }
  
  @media (max-width: 360px) {
    padding: 8px 4px;
    font-size: 11px;
  }
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #1e242bff;
  }
  
  &:hover {
    background-color: #4c5c68ff;
    transition: background-color 0.2s ease;
  }
`;

export const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #424950ff;
  color: #e0e0e0;
  font-size: 14px;
  
  ${media.tablet} {
    padding: 10px 8px;
    font-size: 13px;
  }
  
  ${media.mobile} {
    padding: 8px 6px;
    font-size: 12px;
  }
  
  @media (max-width: 360px) {
    padding: 6px 4px;
    font-size: 11px;
  }
`;

export const StatusIndicator = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background-color: ${props => props.active ? '#4CAF50' : '#FF9800'};
  color: white;
`;

export const ActionCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #424950ff;
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const DeleteButton = styled.button`
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background: linear-gradient(135deg, #ff5252, #e53935);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(255, 107, 107, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  ${media.mobile} {
    padding: 4px 8px;
    font-size: 11px;
  }
  
  @media (max-width: 360px) {
    padding: 3px 6px;
    font-size: 10px;
  }
`;

export const AdminToggleButton = styled.button`
  background: ${props => props.isAdmin 
    ? 'linear-gradient(135deg, #ff9800, #f57c00)' 
    : 'linear-gradient(135deg, #4CAF50, #388e3c)'
  };
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background: ${props => props.isAdmin 
      ? 'linear-gradient(135deg, #f57c00, #ef6c00)' 
      : 'linear-gradient(135deg, #388e3c, #2e7d32)'
    };
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  ${media.mobile} {
    padding: 4px 8px;
    font-size: 11px;
  }
  
  @media (max-width: 360px) {
    padding: 3px 6px;
    font-size: 10px;
  }
`;

export const SuccessMessage = styled.div`
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  margin: 16px 0;
  font-weight: 600;
  box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);
`;

export const ErrorMessage = styled.div`
  background: linear-gradient(135deg, #f44336, #d32f2f);
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  margin: 16px 0;
  font-weight: 600;
  box-shadow: 0 4px 8px rgba(244, 67, 54, 0.3);
`;

export const AddUserButton = styled.button`
  background: linear-gradient(135deg, #2196F3, #1976D2);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  margin: 20px 0;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: linear-gradient(135deg, #1976D2, #1565C0);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(33, 150, 243, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const AddUserForm = styled.form`
  background: #2b333aff;
  padding: 24px;
  border-radius: 12px;
  margin: 20px 0;
  border: 1px solid #424950ff;

  h3 {
    color: #e0e0e0;
    margin-bottom: 20px;
    font-size: 18px;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 16px;
`;

export const FormLabel = styled.label`
  display: block;
  color: #e0e0e0;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 14px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #424950ff;
  border-radius: 6px;
  background: #1e242bff;
  color: #e0e0e0;
  font-size: 14px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const FormCheckbox = styled.input`
  margin-right: 8px;
  transform: scale(1.2);
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  color: #e0e0e0;
  font-size: 14px;
  cursor: pointer;
`;

export const FormActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

export const FormButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  ${props => props.primary ? `
    background: linear-gradient(135deg, #4CAF50, #45a049);
    color: white;
    
    &:hover {
      background: linear-gradient(135deg, #45a049, #388e3c);
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);
    }
  ` : `
    background: #424950ff;
    color: #e0e0e0;
    
    &:hover {
      background: #4c5c68ff;
      transform: translateY(-1px);
    }
  `}

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

