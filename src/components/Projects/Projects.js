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
        Terraform: '#7B42BC',
        Ansible: '#EE0000',
        Kubernetes: '#326CE5',
        Helm: '#277A9F',
        Kubectl: '#326CE5',
        Python: '#3572A5',
        Flask: '#000000',
        HTML: '#e34c26',
        CSS: '#563d7c',
        Shell: '#89e051',
        StrongSwan: '#4A154B',
        IKEv2: '#FFA500',
        React: '#61DAFB',
        'GitHub Pages': '#222222',
        'GitHub Actions': '#2088FF',
        'Gemini AI': '#663333',
        Git: '#F05032',
        Go: '#00ADD8',
        'Proxmox API': '#E57000',
        'REST API': '#0096D6',
        Redis: '#E5197E',
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
            title: "Commit Sage",
            description: "VS Code extension. Uses Google's Gemini AI to auto-generate commit messages.",
            url: "https://github.com/VizzleTF/CommitSage",
            repo_url: "https://github.com/VizzleTF/CommitSage",
            tools: ["TypeScript", "VS Code API", "Gemini AI", "Git"],
            icon: "fa-code-commit"
        },
        {
            title: "Home Lab",
            description: "Setup home lab. Manages VMs, K8s cluster, helm charts and deployments.",
            url: "https://vizzletf.github.io/home_proxmox/",
            repo_url: "https://github.com/VizzleTF/home_proxmox",
            tools: ["Terraform", "Ansible", "Kubernetes", "Helm", "Kubectl"],
            icon: "fa-server"
        },
        {
            title: "Web App for Home Lab",
            description: "Small-scale web app for home lab.",
            url: "https://vizzletf.github.io/home_lab/",
            repo_url: "https://github.com/VizzleTF/home_lab",
            tools: ["Python", "Flask", "HTML", "CSS"],
            icon: "fa-chart-line"
        },
        {
            title: "VPN Installation Script",
            description: "Automates VPN server setup with IKEv2.",
            url: "https://vizzletf.github.io/StrongSwan_VPN/",
            repo_url: "https://github.com/VizzleTF/StrongSwan_VPN",
            tools: ["Shell", "StrongSwan", "IKEv2"],
            icon: "fa-shield-alt"
        },
        {
            title: "React Web Page",
            description: "React application hosted on GitHub Pages.",
            url: "https://vizzletf.github.io",
            repo_url: "https://github.com/VizzleTF/vizzletf.github.io",
            tools: ["React", "CSS", "GitHub Pages", "GitHub Actions"],
            icon: "fa-user-circle"
        },
        {
            "title": "Cluster Status App",
            "description": "A Kubernetes and Proxmox cluster monitoring application that provides real-time status updates via a RESTful API.",
            "url": "https://status.vakaf.space",
            "repo_url": "https://github.com/VizzleTF/cluster-status-app",
            "tools": ["Go", "Redis", "REST API", "Proxmox API", "Helm", "GitHub Actions"],
            "icon": "fa-brands fa-golang"
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