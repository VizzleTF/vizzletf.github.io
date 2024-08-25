import React from 'react';

function Projects({ openPopup }) {
    const projects = [
        {
            title: "GeminiCommit",
            description: "VS Code extension. Uses Google's Gemini AI to auto-generate commit messages.",
            url: "https://vizzletf.github.io/GeminiCommit/",
            repo_url: "https://github.com/VizzleTF/GeminiCommit",
            tools: ["TypeScript", "VS Code API"]
        },
        {
            title: "Home Lab",
            description: "Setup home lab. Manages VMs, K8s cluster, helm charts and deployments.",
            url: "https://vizzletf.github.io/home_proxmox/",
            repo_url: "https://github.com/VizzleTF/home_proxmox",
            tools: ["Terraform", "Ansible", "Kubernetes", "Helm", "Kubectl"]
        },
        {
            title: "Web App for Home Lab",
            description: "Small-scale web app for home lab.",
            url: "https://vizzletf.github.io/home_lab/",
            repo_url: "https://github.com/VizzleTF/home_lab",
            tools: ["Python", "Flask", "HTML", "CSS"]
        },
        {
            title: "VPN Installation Script",
            description: "Automates secure StrongSwan VPN server setup with IKEv2.",
            url: "https://vizzletf.github.io/StrongSwan_VPN/",
            repo_url: "https://github.com/VizzleTF/StrongSwan_VPN",
            tools: ["Shell", "StrongSwan", "IKEv2"]
        },
        {
            title: "This page",
            description: "Github hosted page.",
            url: "https://vizzletf.github.io",
            repo_url: "https://github.com/VizzleTF/vizzletf.github.io",
            tools: ["React", "CSS", "GitHub Pages"]
        }
    ];

    return (
        <section className="projects">
            <h2>Projects</h2>
            <div className="project-grid">
                {projects.map((project, index) => (
                    <div key={index} className="project-card" onClick={() => openPopup(project.url)}>
                        <div className="project-header">
                            <h3 className="project-title">{project.title}</h3>
                            <span className="public-label">Public</span>
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
                                View Repository
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Projects;