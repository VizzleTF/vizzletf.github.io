import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Projects from './components/Projects/Projects';
import HomeLabStatus from './components/HomeLabStatus/HomeLabStatus';
import Footer from './components/Footer/Footer';
import Popup from './components/Popup/Popup';

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const MainContent = styled.div`
    display: flex;
    padding-top: 32px;
    margin-bottom: 16px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 32px;

    @media (max-width: 768px) {
        flex-direction: column;
        padding: 0 16px;
    }
`;

function App() {
    const [popupUrl, setPopupUrl] = useState(null);
    const [projectsLoaded, setProjectsLoaded] = useState(false);

    const openPopup = (url) => {
        setPopupUrl(url);
    };

    const closePopup = () => {
        setPopupUrl(null);
    };

    return (
        <AppContainer>
            <Header />
            <MainContent>
                <Sidebar />
                <main>
                    <Projects openPopup={openPopup} onLoad={() => setProjectsLoaded(true)} />
                    <HomeLabStatus showAnimation={projectsLoaded} />
                </main>
            </MainContent>
            <Footer />
            {popupUrl && <Popup url={popupUrl} onClose={closePopup} />}
        </AppContainer>
    );
}

export default App;