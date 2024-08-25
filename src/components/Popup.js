import React from 'react';

function Popup({ url, onClose }) {
    return (
        <>
            <div className="overlay" onClick={onClose}></div>
            <div className="popup">
                <button className="close-btn" onClick={onClose}>&times;</button>
                <iframe className="popup-content" src={url} title="Project Details"></iframe>
            </div>
        </>
    );
}

export default Popup;