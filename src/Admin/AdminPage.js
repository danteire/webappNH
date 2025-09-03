import styled from 'styled-components';
import GlobalStyles from '../components/GlobalStyles';
import Dashboard from './Dashboard/Dashboard';

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

function AdminPage() {
  return (
    <>
      <GlobalStyles/>
      <AppContainer>
      <Dashboard>
      </Dashboard>
      </AppContainer>
    </>
  );
}

export default AdminPage;