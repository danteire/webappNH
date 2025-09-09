import styled from 'styled-components';

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
  color: #e0e0e0;
  font-size: 14px;
`;

export const PredictionBadge = styled.span`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background-color: ${props => props.color};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const DateCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #424950ff;
  color: #B0B0B0;
  font-size: 12px;
  font-family: monospace;
`;

