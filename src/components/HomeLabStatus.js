import React, { useState, useEffect } from 'react';

const HomeLabStatus = () => {
    const [statusData, setStatusData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://status.vakaf.space/status');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setStatusData(data);
            } catch (e) {
                console.error("Could not fetch status data:", e);
                setError("Failed to load status data. Please try again later.");
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 300000);
        return () => clearInterval(intervalId);
    }, []);

    if (error) {
        return <div className="error project-card">{error}</div>;
    }

    if (!statusData) {
        return <div className="loading project-card">Loading homelab status...</div>;
    }

    return (
        <section className="homelab-status">
            <h2>Home Lab Status</h2>
            <div className="project-grid">
                <div className="project-card">
                    <div className="project-header">
                        <h3 className="project-title">
                            <i className="fas fa-dharmachakra project-icon"></i>
                            Helm Releases
                        </h3>
                    </div>
                    <div className="status-grid helm-grid">
                        {statusData.helmReleases.map((release, index) => (
                            <div key={index} className="status-item">
                                <span className={`status-label ${release.status}`}>{release.status}</span>
                                <span className="item-name">{release.name}</span>
                                <span className="item-version">v{release.version}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="project-card">
                    <div className="project-header">
                        <h3 className="project-title">
                            <i className="fas fa-server project-icon"></i>
                            Kubernetes Nodes
                        </h3>
                    </div>
                    <div className="status-grid">
                        {statusData.nodeStatuses.map((node, index) => (
                            <div key={index} className="status-item">
                                <span className={`status-label ${node.status}`}>{node.status}</span>
                                <span className="item-name">{node.name}</span>
                                <span className="item-version">{node.version}</span>
                                <span className="uptime">Uptime: {node.uptime}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="project-card">
                    <div className="project-header">
                        <h3 className="project-title">
                            <i className="fas fa-database project-icon"></i>
                            Proxmox Nodes
                        </h3>
                    </div>
                    <div className="status-grid">
                        {statusData.proxmoxNodes.map((node, index) => (
                            <div key={index} className="status-item">
                                <span className={`status-label ${node.status}`}>{node.status}</span>
                                <span className="item-name">{node.name}</span>
                                <span className="uptime">Uptime: {node.uptime}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="project-card">
                    <div className="project-header">
                        <h3 className="project-title">
                            <i className="fas fa-cubes project-icon"></i>
                            Pod Statuses
                        </h3>
                    </div>
                    <div className="pod-status-grid">
                        {Object.entries(statusData.podStatuses).map(([status, count]) => (
                            <div key={status} className="pod-status-item">
                                <span className="pod-status">{status}</span>
                                <span className="pod-count">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeLabStatus;