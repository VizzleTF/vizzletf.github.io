import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(27, 31, 35, 0.5);
    z-index: 999;
`;

const PopupContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 90%;
    max-width: 1100px;
    max-height: 750px;
    background: ${props => props.theme.colors.primaryBg};
    border: 1px solid ${props => props.theme.colors.borderColor};
    box-shadow: 0 8px 24px rgba(149, 157, 165, 0.2);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    overflow: hidden;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 24px;
    cursor: pointer;
    color: ${props => props.theme.colors.textSecondary};
    background: none;
    border: none;
    padding: 4px 8px;
    z-index: 1001;
    transition: color 0.2s ease;

    &:hover {
        color: ${props => props.theme.colors.textPrimary};
    }
`;

const PopupContent = styled.iframe`
    width: 100%;
    height: 100%;
    border: none;
    flex-grow: 1;
`;

function Popup({ url, onClose }) {
    return (
        <>
            <Overlay onClick={onClose} />
            <PopupContainer>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <PopupContent src={url} title="Project Details" />
            </PopupContainer>
        </>
    );
}

export default Popup;