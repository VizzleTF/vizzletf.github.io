import React from 'react';

function Projects({ openPopup }) {
    const projects = [
        {
            title: "GeminiCommit",
            description: "VS Code extension. Uses Google's Gemini AI to auto-generate commit messages. Saves time, improves version control.",
            url: "https://vizzletf.github.io/GeminiCommit/"
        },
        {
            title: "Home Lab",
            description: "Custom configs and scripts for home lab. Manages VMs (terraform + ansible), K8s cluster (kubespray), helms (helmfile) and deployments (kubectl).",
            url: "https://vizzletf.github.io/home_proxmox/"
        },
        {
            title: "Web App for Homelab",
            description: "Small-scale Python/Flask web app for home lab. Dynamic interface with HTML/CSS. Demonstrates custom website building.",
            url: "https://vizzletf.github.io/home_lab/"
        },
        {
            title: "VPN Installation Script",
            description: "Automates secure StrongSwan VPN server setup with IKEv2. Quick, seamless installation and configuration.",
            url: "https://vizzletf.github.io/StrongSwan_VPN/"
        }
    ];

    return (
        <section id="projects">
            <h2>My Projects</h2>
            <div className="project-grid">
                {projects.map((project, index) => (
                    <div key={index} className="project-card" onClick={() => openPopup(project.url)}>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Projects;