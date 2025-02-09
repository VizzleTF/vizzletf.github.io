import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
    padding: 20px;
    margin: 20px;
    border: 1px solid ${props => props.theme.colors.borderColor};
    border-radius: 8px;
    background-color: ${props => props.theme.colors.secondaryBg};
`;

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <ErrorContainer>
                    <h2>Something went wrong.</h2>
                    <button onClick={() => window.location.reload()}>
                        Refresh Page
                    </button>
                </ErrorContainer>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary; 