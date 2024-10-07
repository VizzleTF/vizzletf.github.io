import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const HomeLabSection = styled.section`
    margin-bottom: 32px;
`;

const HomeLabHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StatusControls = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-width: 200px;
`;

const DynamicLabel = styled.span`
    font-size: 12px;
    color: ${props => props.theme.colors.textSecondary};
    margin-right: 4px;
`;

const LiveUpdatesToggle = styled.label`
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
    margin-right: 4px;
`;

const ToggleInput = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
`;

const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;

    &:before {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
    }

    ${ToggleInput}:checked + & {
        background-color: ${props => props.theme.colors.accentPrimary};
    }

    ${ToggleInput}:checked + &:before {
        transform: translateX(20px);
    }
`;

const StatusGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const StatusCard = styled.div`
    background-color: ${props => props.theme.colors.primaryBg};
    border: 1px solid ${props => props.theme.colors.borderColor};
    border-radius: 6px;
    padding: 12px;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${props => props.theme.colors.hoverColor};
        transform: translateY(-2px);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    }
`;

const StatusHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
`;

const StatusTitle = styled.h3`
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: ${props => props.theme.colors.accentPrimary};
    display: flex;
    align-items: center;
`;

const StatusIcon = styled.i`
    margin-right: 8px;
    font-size: 18px;
    animation: pulse 2s infinite;

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
`;

const StatusItemGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
`;

const StatusItem = styled.div`
    background-color: ${props => props.theme.colors.primaryBg};
    border: 1px solid ${props => props.theme.colors.borderColor};
    border-radius: 6px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
    }
`;

const StatusLabel = styled.span`
    position: absolute;
    top: 4px;
    right: 4px;
    font-size: 11px;
    font-weight: 500;
    color: ${props => props.status === 'deployed' || props.status === 'online' || props.status === 'Ready'
        ? '#28a745'
        : props.theme.colors.textSecondary};
    border: 1px solid ${props => props.status === 'deployed' || props.status === 'online' || props.status === 'Ready'
        ? '#28a745'
        : props.theme.colors.borderColor};
    border-radius: 2em;
    padding: 0 7px;
    line-height: 18px;
`;

const ItemName = styled.span`
    font-weight: 600;
    margin-bottom: 4px;
`;

const ItemVersion = styled.span`
    font-size: 12px;
    color: ${props => props.theme.colors.textSecondary};
    margin-bottom: 4px;
`;

const Uptime = styled.span`
    font-size: 12px;
    color: ${props => props.theme.colors.textSecondary};
    margin-top: 4px;
`;

const PodStatusGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: space-between;
`;

const PodStatusItem = styled.div`
    flex: 1;
    min-width: 80px;
    height: 60px;
    background-color: ${props => props.theme.colors.primaryBg};
    border: 1px solid ${props => props.theme.colors.borderColor};
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 14px;
    color: ${props => props.theme.colors.textPrimary};
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
    }
`;

const PodStatus = styled.span`
    font-size: 12px;
    color: ${props => props.theme.colors.textSecondary};
    margin-bottom: 4px;
`;

const PodCount = styled.span`
    font-size: 18px;
`;

const HomeLabStatus = () => {
    const [statusData, setStatusData] = useState(null);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [liveUpdates, setLiveUpdates] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch('https://status.vakaf.space/status');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setStatusData(data);
            setLastUpdated(new Date());
            setError(null);
        } catch (e) {
            console.error("Could not fetch status data:", e);
            setError("Failed to load status data. Please try again later.");
        }
    }, []);

    useEffect(() => {
        fetchData();
        let intervalId;
        if (liveUpdates) {
            intervalId = setInterval(fetchData, 1000);
        }
        return () => clearInterval(intervalId);
    }, [fetchData, liveUpdates]);

    const toggleLiveUpdates = () => {
        setLiveUpdates(!liveUpdates);
    };

    if (error) {
        return <StatusCard>{error}</StatusCard>;
    }

    if (!statusData) {
        return <StatusCard>Loading homelab status...</StatusCard>;
    }

    return (
        <HomeLabSection>
            <HomeLabHeader>
                <h2>Home Lab Status</h2>
                <StatusControls>
                    <DynamicLabel>
                        {liveUpdates
                            ? `Last updated: ${lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`
                            : 'Live Updates'}
                    </DynamicLabel>
                    <LiveUpdatesToggle>
                        <ToggleInput
                            type="checkbox"
                            checked={liveUpdates}
                            onChange={toggleLiveUpdates}
                        />
                        <Slider />
                    </LiveUpdatesToggle>
                </StatusControls>
            </HomeLabHeader>
            <StatusGrid>
                <StatusCard>
                    <StatusHeader>
                        <StatusTitle>
                            <StatusIcon className="fas fa-dharmachakra" />
                            Helm Releases
                        </StatusTitle>
                    </StatusHeader>
                    <StatusItemGrid>
                        {statusData.helm_releases.map((release, index) => (
                            <StatusItem key={index}>
                                <StatusLabel status={release.status}>{release.status}</StatusLabel>
                                <ItemName>{release.name}</ItemName>
                                <ItemVersion>v{release.version}</ItemVersion>
                            </StatusItem>
                        ))}
                    </StatusItemGrid>
                </StatusCard>

                <StatusCard>
                    <StatusHeader>
                        <StatusTitle>
                            <StatusIcon className="fas fa-server" />
                            Kubernetes Nodes
                        </StatusTitle>
                    </StatusHeader>
                    <StatusItemGrid>
                        {statusData.node_statuses.map((node, index) => (
                            <StatusItem key={index}>
                                <StatusLabel status={node.status}>{node.status}</StatusLabel>
                                <ItemName>{node.name}</ItemName>
                                <ItemVersion>{node.version}</ItemVersion>
                                <Uptime>Uptime: {node.uptime}</Uptime>
                            </StatusItem>
                        ))}
                    </StatusItemGrid>
                </StatusCard>

                <StatusCard>
                    <StatusHeader>
                        <StatusTitle>
                            <StatusIcon className="fas fa-database" />
                            Proxmox Nodes
                        </StatusTitle>
                    </StatusHeader>
                    <StatusItemGrid>
                        {statusData.proxmox_nodes.map((node, index) => (
                            <StatusItem key={index}>
                                <StatusLabel status={node.status}>{node.status}</StatusLabel>
                                <ItemName>{node.name}</ItemName>
                                <Uptime>Uptime: {node.uptime}</Uptime>
                            </StatusItem>
                        ))}
                    </StatusItemGrid>
                </StatusCard>

                <StatusCard>
                    <StatusHeader>
                        <StatusTitle>
                            <StatusIcon className="fas fa-cubes" />
                            Pod Statuses
                        </StatusTitle>
                    </StatusHeader>
                    <PodStatusGrid>
                        {Object.entries(statusData.pod_statuses).map(([status, count]) => (
                            <PodStatusItem key={status}>
                                <PodStatus>{status}</PodStatus>
                                <PodCount>{count}</PodCount>
                            </PodStatusItem>
                        ))}
                    </PodStatusGrid>
                </StatusCard>
            </StatusGrid>
        </HomeLabSection>
    );
};

export default HomeLabStatus;