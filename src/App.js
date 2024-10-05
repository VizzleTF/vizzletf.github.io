import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Projects from './components/Projects';
import HomeLabStatus from './components/HomeLabStatus';
import Footer from './components/Footer';
import Popup from './components/Popup';
import './App.css';

function App() {
    const [popupUrl, setPopupUrl] = useState(null);

    const openPopup = (url) => {
        setPopupUrl(url);
    };

    const closePopup = () => {
        setPopupUrl(null);
    };

    return (
        <div className="App">
            <Header />
            <div className="main-content container">
                <Sidebar />
                <main>
                    <Projects openPopup={openPopup} />
                    <HomeLabStatus />
                </main>
            </div>
            <Footer />
            {popupUrl && <Popup url={popupUrl} onClose={closePopup} />}
        </div>
    );
}

export default App;