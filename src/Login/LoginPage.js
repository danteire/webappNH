import styled from 'styled-components';
import GlobalStyles from '../components/GlobalStyles';
import AuthPanel from './AuthPanel';
import { media } from './breakpoints.js';

const PageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    background-color: #0F0F0F;
    
    ${media.tablet} {
        padding: 15px;
    }
    
    ${media.mobile} {
        padding: 10px;
    }
    
    ${media.smallMobile} {
        padding: 5px;
    }
    
    ${media.verySmallMobile} {
        padding: 0;
    }
`;

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
    
    ${media.smallMobile} {
        width: 100%;
        height: auto;
        min-height: 350px;
        border-radius: 5px;
    }
    
    ${media.verySmallMobile} {
        width: 100%;
        height: auto;
        min-height: 300px;
        border-radius: 5px;
    }
`;

function LoginPage() {
    return (
        <>
            <GlobalStyles/>
            <PageWrapper>
                <AppContainer>
                    <AuthPanel /> 
                </AppContainer>
            </PageWrapper>
        </>
    );
}

export default LoginPage;