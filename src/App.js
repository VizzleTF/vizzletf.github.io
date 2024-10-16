import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Projects from './components/Projects/Projects';
import HomeLabStatus from './components/HomeLabStatus/HomeLabStatus';
import Footer from './components/Footer/Footer';
import Popup from './components/Popup/Popup';
import { lightTheme, darkTheme } from './theme';
import GlobalStyle from './GlobalStyle';

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
    const [currentTheme, setCurrentTheme] = useState('light');
    const [themeLoaded, setThemeLoaded] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setCurrentTheme(savedTheme);
        } else {
            const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            setCurrentTheme(prefersDarkMode ? 'dark' : 'light');
        }
        setThemeLoaded(true);
    }, []);

    const toggleTheme = () => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setCurrentTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const openPopup = (url) => {
        setPopupUrl(url);
    };

    const closePopup = () => {
        setPopupUrl(null);
    };

    if (!themeLoaded) {
        return null; // или можете отрендерить загрузочный индикатор
    }

    return (
        <ThemeProvider theme={currentTheme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyle />
            <AppContainer>
                <Header toggleTheme={toggleTheme} currentTheme={currentTheme} />
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
        </ThemeProvider>
    );
}

export default App;