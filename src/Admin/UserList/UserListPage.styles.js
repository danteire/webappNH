import styled from 'styled-components';

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
  font-size: 14px;
  color: #c5d0dbff;
`;

export const StatusIndicator = styled.span`
  background: ${props => props.active 
    ? 'linear-gradient(135deg, #f39c12, #e67e22)' 
    : 'linear-gradient(135deg, #95a5a6, #7f8c8d)'
  };
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const AdminToggleButton = styled.button`
  background: ${props => props.isAdmin 
    ? 'linear-gradient(135deg, #ff6b6b, #ee5a24)' 
    : 'linear-gradient(135deg, #4ecdc4, #44a08d)'
  };
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  margin-right: 8px;
  min-width: 100px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    background: ${props => props.isAdmin 
      ? 'linear-gradient(135deg, #ee5a24, #ff6b6b)' 
      : 'linear-gradient(135deg, #44a08d, #4ecdc4)'
    };
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  &:disabled {
    background: #95a5a6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const ActionCell = styled(TableCell)`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
  min-width: 200px;
`;

export const DeleteButton = styled.button`
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #c0392b, #e74c3c);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  &:disabled {
    background: #95a5a6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const SuccessMessage = styled.div`
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(46, 204, 113, 0.3);
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ErrorMessage = styled.div`
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const AddUserButton = styled.button`
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: #2b333aff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  margin-top: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
  width: 100%;
  max-width: 300px;

  &:hover {
    background: linear-gradient(135deg, #2980b9, #3498db);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(52, 152, 219, 0.4);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
  }
`;

export const AddUserForm = styled.form`
  background: linear-gradient(135deg, #1e242bff, #2b333aff);
  border: 2px solid #dee2e6;
  border-radius: 12px;
  padding: 24px;
  margin-top: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  
  h3 {
    margin: 0 0 20px 0;
    color: #dee2e6;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 16px;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 6px;
  color: #dee2e6;
  font-weight: 500;
  font-size: 14px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: white;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
  
  &:disabled {
    background: #f8f9fa;
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  &::placeholder {
    color: #3f586dff;
  }
`;

export const FormCheckbox = styled.input`
  margin-right: 8px;
  transform: scale(1.2);
  cursor: pointer;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  color: #bdc3c7;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    color: #3498db;
  }
`;

export const FormActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 24px;
`;

export const FormButton = styled.button`
  background: ${props => props.primary 
    ? 'linear-gradient(135deg, #27ae60, #2ecc71)' 
    : 'linear-gradient(135deg, #95a5a6, #7f8c8d)'
  };
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  min-width: 140px;

  &:hover:not(:disabled) {
    background: ${props => props.primary 
      ? 'linear-gradient(135deg, #2ecc71, #27ae60)' 
      : 'linear-gradient(135deg, #7f8c8d, #95a5a6)'
    };
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;