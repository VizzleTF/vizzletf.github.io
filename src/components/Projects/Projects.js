import React, { useEffect, useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';

const ProjectsSection = styled.section`
    margin-bottom: 32px;
`;

const ProjectGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-top: 16px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const ProjectCard = styled.div`
    background-color: ${props => props.theme.colors.primaryBg};
    border: 1px solid ${props => props.theme.colors.borderColor};
    border-radius: 6px;
    padding: 12px;
    transition: all 0.3s ease;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    position: relative;
    opacity: ${props => props.$visible ? 1 : 0};
    transform: translateY(${props => props.$visible ? 0 : '20px'});
    transition: opacity 0.5s ease, transform 0.5s ease;

    &:hover {
        background-color: ${props => props.theme.colors.hoverColor};
        transform: translateY(-2px);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    }

    &:focus {
        outline: 2px solid ${props => props.theme.colors.accentPrimary};
        outline-offset: 2px;
    }
`;

const ProjectHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
`;

const ProjectTitle = styled.h3`
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: ${props => props.theme.colors.accentPrimary};
    display: flex;
    align-items: center;
`;

const ProjectIcon = styled.i`
    margin-right: 8px;
    font-size: 18px;
    animation: pulse 2s infinite;

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
`;

const PublicLabel = styled.span`
    font-size: 11px;
    font-weight: 500;
    color: ${props => props.theme.colors.textSecondary};
    border: 1px solid ${props => props.theme.colors.borderColor};
    border-radius: 2em;
    padding: 0 7px;
    line-height: 18px;
`;

const ProjectDescription = styled.p`
    margin-top: 0;
    margin-bottom: 8px;
    line-height: 1.3;
`;

const ProjectFooter = styled.div`
    margin-top: auto;
    padding-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ToolList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
`;

const Tool = styled.span`
    display: inline-flex;
    align-items: center;
    font-size: 11px;
    color: ${props => props.theme.colors.textSecondary};
    background-color: ${props => props.theme.colors.secondaryBg};
    padding: 1px 5px;
    border-radius: 8px;
`;

const ToolColor = styled.span`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 4px;
    background-color: ${props => props.color};
`;

const getToolColor = (tool) => {
    const colors = {
        TypeScript: '#2b7489',
        'VS Code API': '#0078D7',
        OpenAI: '#10A37F',
        Anthropic: '#D97706',
        'Gemini AI': '#663333',
        Git: '#F05032',
        Kotlin: '#7F52FF',
        'Android SDK': '#3DDC84',
        'Material Design 3': '#6750A4',
        WebView: '#4285F4',
        MVVM: '#FF6F00',
        Terraform: '#7B42BC',
        Ansible: '#EE0000',
        Kubernetes: '#326CE5',
        Helm: '#277A9F',
        Proxmox: '#E57000',
        ArgoCD: '#EF7B4D',
        JavaScript: '#F7DF1E',
        HTML5: '#E34F26',
        CSS3: '#1572B6',
        'QR Code': '#000000',
        TOTP: '#4CAF50',
        Crypto: '#FF9800',
        React: '#61DAFB',
        'Styled Components': '#DB7093',
        'GitHub Pages': '#222222',
        Docker: '#2496ED',
        'GitHub Actions': '#2088FF',
        Go: '#00ADD8',
        Redis: '#DC382D',
        'Kubernetes API': '#326CE5',
        'Proxmox API': '#E57000',
        Python: '#3572A5',
        Flask: '#000000',
        HTML: '#e34c26',
        CSS: '#563d7c',
        Shell: '#89e051',
        StrongSwan: '#4A154B',
        IKEv2: '#FFA500',
        Kubectl: '#326CE5',
        'REST API': '#0096D6',
    };
    return colors[tool] || '#000000';
};

const RepoLink = styled.a`
    display: inline-block;
    color: ${props => props.theme.colors.accentPrimary};
    text-decoration: none;
    padding: 4px 10px;
    border: 1px solid ${props => props.theme.colors.accentPrimary};
    border-radius: 4px;
    transition: all 0.3s ease;
    font-size: 12px;
    white-space: nowrap;

    &:hover {
        color: ${props => props.theme.colors.primaryBg};
        background-color: ${props => props.theme.colors.accentPrimary};
        text-decoration: none;
        transform: translateY(-1px);
    }
`;

function Projects({ openPopup, onLoad }) {
    const [visibleProjects, setVisibleProjects] = useState([]);

    const projects = useMemo(() => [
        {
            title: "CommitSage",
            description: "AI-powered VS Code extension that generates intelligent commit messages using multiple AI providers including OpenAI, Anthropic, and Google Gemini.",
            url: "https://github.com/VizzleTF/CommitSage",
            repo_url: "https://github.com/VizzleTF/CommitSage",
            tools: ["TypeScript", "VS Code API", "OpenAI", "Anthropic", "Gemini AI", "Git"],
            icon: "fa-code-commit"
        },
        {
            title: "MovieTorr",
            description: "Android torrent search application with integrated web browser, supporting multiple trackers and Material Design 3 UI.",
            url: "https://github.com/VizzleTF/MovieTorr",
            repo_url: "https://github.com/VizzleTF/MovieTorr",
            tools: ["Kotlin", "Android SDK", "Material Design 3", "WebView", "MVVM"],
            icon: "fa-mobile-alt"
        },
        {
            title: "Home Proxmox",
            description: "Infrastructure as Code for home lab built on Proxmox with Kubernetes cluster, automated deployments, and comprehensive monitoring.",
            url: "https://github.com/VizzleTF/home_proxmox",
            repo_url: "https://github.com/VizzleTF/home_proxmox",
            tools: ["Terraform", "Ansible", "Kubernetes", "Helm", "Proxmox", "ArgoCD"],
            icon: "fa-server"
        },
        {
            title: "TOTP Decoder",
            description: "Secure client-side TOTP QR code decoder with real-time code generation, supporting multiple formats without server communication.",
            url: "https://github.com/VizzleTF/TOTP_decoder",
            repo_url: "https://github.com/VizzleTF/TOTP_decoder",
            tools: ["JavaScript", "HTML5", "CSS3", "QR Code", "TOTP", "Crypto"],
            icon: "fa-qrcode"
        },
        {
            title: "Portfolio Website",
            description: "Modern React-based personal portfolio with automated CI/CD, containerization, and multi-target deployment to GitHub Pages and Kubernetes.",
            url: "https://vizzletf.github.io",
            repo_url: "https://github.com/VizzleTF/vizzletf.github.io",
            tools: ["React", "Styled Components", "GitHub Pages", "Docker", "Helm", "GitHub Actions"],
            icon: "fa-user-circle"
        },
        {
            title: "Cluster Status App",
            description: "Go-based monitoring service that aggregates status from Kubernetes clusters and Proxmox environments via unified HTTP API with Redis caching.",
            url: "https://status.vakaf.space",
            repo_url: "https://github.com/VizzleTF/cluster-status-app",
            tools: ["Go", "Redis", "Kubernetes API", "Proxmox API", "Helm", "Docker"],
            icon: "fa-chart-line"
        }
    ], []);

    const animateProjects = useCallback(() => {
        const animationDuration = projects.length * 100;

        projects.forEach((_, index) => {
            setTimeout(() => {
                setVisibleProjects(prev => [...prev, index]);
            }, index * 50);
        });

        setTimeout(() => {
            onLoad();
        }, animationDuration);
    }, [projects, onLoad]);

    useEffect(() => {
        animateProjects();
    }, [animateProjects]);

    return (
        <ProjectsSection>
            <h2 id="projects-heading">Projects</h2>
            <ProjectGrid role="list" aria-labelledby="projects-heading">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        role="listitem"
                        tabIndex={0}
                        onClick={() => openPopup(project.url)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') openPopup(project.url);
                        }}
                        aria-label={`${project.title} project`}
                        $visible={visibleProjects.includes(index)}
                    >
                        <ProjectHeader>
                            <ProjectTitle>
                                <ProjectIcon className={`fas ${project.icon}`} />
                                {project.title}
                            </ProjectTitle>
                            <PublicLabel>Public</PublicLabel>
                        </ProjectHeader>
                        <ProjectDescription>{project.description}</ProjectDescription>
                        <ProjectFooter>
                            <ToolList>
                                {project.tools.map((tool, toolIndex) => (
                                    <Tool key={toolIndex}>
                                        <ToolColor color={getToolColor(tool)} />
                                        {tool}
                                    </Tool>
                                ))}
                            </ToolList>
                            <RepoLink
                                href={project.repo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                            >
                                Open Repository
                            </RepoLink>
                        </ProjectFooter>
                    </ProjectCard>
                ))}
            </ProjectGrid>
        </ProjectsSection>
    );
}

export default Projects;