import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Popup from './components/Popup';
import './App.css';

function App() {
    const [popupUrl, setPopupUrl] = React.useState(null);

    const openPopup = (url) => {
        setPopupUrl(url);
    };

    const closePopup = () => {
        setPopupUrl(null);
    };

    return (
        <div className="App">
            <Header />
            <main className="container">
                <About />
                <Projects openPopup={openPopup} />
            </main>
            <Footer />
            {popupUrl && <Popup url={popupUrl} onClose={closePopup} />}
        </div>
    );
}

export default App;