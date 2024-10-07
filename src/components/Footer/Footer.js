import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
    background-color: ${props => props.theme.colors.secondaryBg};
    color: ${props => props.theme.colors.textSecondary};
    padding: 8px 0;
    margin-top: auto;
    font-size: 12px;
    border-top: 1px solid ${props => props.theme.colors.borderColor};
`;

const FooterContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 32px;

    @media (max-width: 768px) {
        padding: 0 16px;
    }
`;

function Footer() {
    return (
        <FooterContainer>
            <FooterContent>
                <p>&copy; 2024 Ivan K. All rights reserved.</p>
            </FooterContent>
        </FooterContainer>
    );
}

export default Footer;