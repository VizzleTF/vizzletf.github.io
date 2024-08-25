import React, { useEffect, useState, useMemo } from 'react';

function Projects({ openPopup }) {
    const [visibleProjects, setVisibleProjects] = useState([]);
    const [visiblePublicLabels, setVisiblePublicLabels] = useState([]);

    const projects = useMemo(() => [
        {
            title: "GeminiCommit",
            description: "VS Code extension. Uses Google's Gemini AI to auto-generate commit messages.",
            url: "https://vizzletf.github.io/GeminiCommit/",
            repo_url: "https://github.com/VizzleTF/GeminiCommit",
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
            title: "This page",
            description: "Github hosted page.",
            url: "https://vizzletf.github.io",
            repo_url: "https://github.com/VizzleTF/vizzletf.github.io",
            tools: ["React", "CSS", "GitHub Pages", "GitHub Actions"],
            icon: "fa-user-circle"
        }
    ], []); // Пустой массив зависимостей, так как проекты не меняются

    useEffect(() => {
        projects.forEach((_, index) => {
            setTimeout(() => {
                setVisibleProjects(prev => [...prev, index]);
            }, index * 200);

            setTimeout(() => {
                setVisiblePublicLabels(prev => [...prev, index]);
            }, index * 200 + 1000);
        });
    }, [projects]);

    return (
        <section className="projects">
            <h2>Projects</h2>
            <div className="project-grid">
                {projects.map((project, index) => (
                    <div key={index} className={`project-card ${visibleProjects.includes(index) ? 'visible' : ''}`} onClick={() => openPopup(project.url)}>
                        <div className="project-header">
                            <h3 className="project-title">
                                <i className={`fas ${project.icon} project-icon`}></i>
                                {project.title}
                            </h3>
                            <span className={`public-label ${visiblePublicLabels.includes(index) ? 'visible' : ''}`}>Public</span>
                        </div>
                        <p>{project.description}</p>
                        <div className="project-footer">
                            <div className="tool-list">
                                {project.tools.map((tool, toolIndex) => (
                                    <span key={toolIndex} className="tool">
                                        <span className={`tool-color ${tool.toLowerCase().replace(/\s+/g, '-').replace('.', '')}`}></span>
                                        {tool}
                                    </span>
                                ))}
                            </div>
                            <a
                                href={project.repo_url}
                                className="repo-link"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                            >
                                Open Repository
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Projects;