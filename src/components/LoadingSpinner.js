import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
    width: 40px;
    height: 40px;
    border: 4px solid ${props => props.theme.colors.borderColor};
    border-top: 4px solid ${props => props.theme.colors.accentPrimary};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
    margin: 20px auto;
`;

export default Spinner; 