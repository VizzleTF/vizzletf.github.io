import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
    background-color: ${props => props.theme.colors.secondaryBg};
    color: ${props => props.theme.colors.textPrimary};
    padding: 16px 0;
    border-bottom: 1px solid ${props => props.theme.colors.borderColor};

    @media (max-width: 768px) {
        padding: 8px 0;
    }
`;

const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 32px;

    @media (max-width: 768px) {
        padding: 0 16px;
    }
`;

const Logo = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: ${props => props.theme.colors.textPrimary};
    margin: 0;
    padding: 0 16px;

    @media (max-width: 768px) {
        padding: 0;
    }
`;

function Header() {
    return (
        <HeaderContainer>
            <HeaderContent>
                <Logo>
                    <i className="fab fa-github"></i> VizzleTF
                </Logo>
            </HeaderContent>
        </HeaderContainer>
    );
}

export default Header;