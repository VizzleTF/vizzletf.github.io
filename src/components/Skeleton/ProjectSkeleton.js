import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
`;

const SkeletonCard = styled.div`
    background: ${props => props.theme.colors.secondaryBg};
    border-radius: 6px;
    padding: 12px;
    height: 200px;
    position: relative;
    overflow: hidden;
    
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
        );
        background-size: 200% 100%;
        animation: ${shimmer} 1.5s infinite;
    }
`;

export default function ProjectSkeleton() {
    return (
        <SkeletonCard />
    );
} 