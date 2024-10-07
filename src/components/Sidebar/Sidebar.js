import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.aside`
    width: 250px;
    margin-right: 32px;

    @media (max-width: 768px) {
        width: 100%;
        margin-right: 0;
        margin-bottom: 0;
        margin-top: 16px;
    }
`;

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }
`;

const ProfileImageName = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: row;
        align-items: center;
    }
`;

const ProfileImage = styled.img`
    width: 100%;
    max-width: 200px;
    border-radius: 50%;
    margin-bottom: 16px;

    @media (max-width: 768px) {
        width: 80px;
        height: 80px;
        margin-right: 16px;
        margin-bottom: 0;
    }
`;

const ProfileName = styled.h2`
    margin-top: 0;
    margin-bottom: 16px;
    text-align: center;

    @media (max-width: 768px) {
        margin-bottom: 0;
        text-align: left;
    }
`;

const ContactInfo = styled.div`
    margin-top: 16px;
    width: 100%;

    @media (max-width: 768px) {
        margin-top: 0;
        text-align: right;
        padding-left: 16px;
    }
`;

const ContactItem = styled.p`
    margin: 8px 0;

    @media (max-width: 768px) {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        justify-content: flex-start;
    }

    i {
        margin-right: 8px;
        color: ${props => props.theme.colors.textSecondary};

        @media (max-width: 768px) {
            margin-right: 0;
            margin-left: 8px;
        }
    }
`;

function Sidebar() {
    return (
        <SidebarContainer>
            <ProfileContainer>
                <ProfileImageName>
                    <ProfileImage src="/profile.jpg" alt="Ivan K" />
                    <ProfileName>Ivan K</ProfileName>
                </ProfileImageName>
                <ContactInfo>
                    <ContactItem>
                        <i className="fas fa-map-marker-alt"></i> Moscow, Russia
                    </ContactItem>
                    <ContactItem>
                        <i className="fas fa-envelope"></i> <a href="mailto:vizzlef@gmail.com">vizzlef@gmail.com</a>
                    </ContactItem>
                    <ContactItem>
                        <i className="fab fa-telegram"></i> <a href="https://t.me/vakaf" target="_blank" rel="noopener noreferrer">VakaF</a>
                    </ContactItem>
                </ContactInfo>
            </ProfileContainer>
        </SidebarContainer>
    );
}

export default Sidebar;