import React from 'react';

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="profile-container">
                <div className="profile-image-name">
                    <img src="/profile.jpg" alt="Ivan K" className="profile-image" />
                    <h2>Ivan K</h2>
                </div>
                <div className="contact-info">
                    <p>
                        <i className="fas fa-map-marker-alt"></i> Moscow, Russia
                    </p>
                    <p>
                        <i className="fas fa-envelope"></i> <a href="mailto:vizzlef@gmail.com">vizzlef@gmail.com</a>
                    </p>
                    <p>
                        <i className="fab fa-telegram"></i> <a href="https://t.me/vakaf" target="_blank" rel="noopener noreferrer">VakaF</a>
                    </p>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;