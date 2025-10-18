import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AdminNav from './AdminNav';
import mongoDBService from '../services/mongoDBService';
import { useSocket } from '../hooks/useSocket';
import { useNotification } from '../components/NotificationProvider';

const AdminDashboardEnhanced = () => {
  const [stats, setStats] = useState({
    events: 0,
    teamMembers: 0,
    polls: 0,
    planOfAction: 0,
    notices: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const { showSuccess, showInfo } = useNotification();

  // Connect to Socket.IO and listen for updates
  const { isConnected: socketConnected } = useSocket((update) => {
    showInfo(`Real-time update: ${update.collection} ${update.action}`, 2000);
    fetchStats(); // Refresh stats when data changes
  });

  useEffect(() => {
    setIsConnected(socketConnected);
  }, [socketConnected]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await mongoDBService.getStats();
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  const sections = [
    {
      title: 'Events',
      count: stats.events,
      link: '/admin/events',
      icon: '📅',
      color: '#3b82f6',
      bgColor: '#eff6ff',
    },
    {
      title: 'Team Members',
      count: stats.teamMembers,
      link: '/admin/team-management',
      icon: '👥',
      color: '#8b5cf6',
      bgColor: '#f5f3ff',
    },
    {
      title: 'Polls',
      count: stats.polls,
      link: '/admin/polls',
      icon: '📊',
      color: '#10b981',
      bgColor: '#f0fdf4',
    },
    {
      title: 'Plan of Action',
      count: stats.planOfAction,
      link: '/admin/plan-of-action-manager',
      icon: '📋',
      color: '#f59e0b',
      bgColor: '#fffbeb',
    },
    {
      title: 'Notices',
      count: stats.notices,
      link: '/admin/notices',
      icon: '📢',
      color: '#ef4444',
      bgColor: '#fef2f2',
    },
  ];

  return (
    <Container>
      <AdminNav />
      <Content>
        <Header>
          <div>
            <Title>Admin Dashboard</Title>
            <Subtitle>Manage your website content in real-time</Subtitle>
          </div>
          <ConnectionStatus connected={isConnected}>
            <StatusDot connected={isConnected} />
            {isConnected ? 'Live Updates Active' : 'Connecting...'}
          </ConnectionStatus>
        </Header>

        {loading ? (
          <LoadingMessage>Loading dashboard...</LoadingMessage>
        ) : (
          <>
            <StatsGrid>
              {sections.map((section) => (
                <StatCard key={section.title} to={section.link} $bgColor={section.bgColor}>
                  <StatIcon style={{ color: section.color }}>{section.icon}</StatIcon>
                  <StatInfo>
                    <StatCount>{section.count}</StatCount>
                    <StatLabel>{section.title}</StatLabel>
                  </StatInfo>
                </StatCard>
              ))}
              <StatCard $bgColor="#f3f4f6" $total>
                <StatIcon style={{ color: '#6b7280' }}>📦</StatIcon>
                <StatInfo>
                  <StatCount>{stats.total}</StatCount>
                  <StatLabel>Total Items</StatLabel>
                </StatInfo>
              </StatCard>
            </StatsGrid>

            <QuickActions>
              <SectionTitle>Quick Actions</SectionTitle>
              <ActionGrid>
                <ActionButton to="/admin/events" $color="#3b82f6">
                  ➕ Add Event
                </ActionButton>
                <ActionButton to="/admin/team-management" $color="#8b5cf6">
                  ➕ Add Team Member
                </ActionButton>
                <ActionButton to="/admin/polls" $color="#10b981">
                  ➕ Create Poll
                </ActionButton>
                <ActionButton to="/admin/notices" $color="#ef4444">
                  ➕ Post Notice
                </ActionButton>
              </ActionGrid>
            </QuickActions>

            <InfoSection>
              <SectionTitle>Real-time Features</SectionTitle>
              <FeatureList>
                <Feature>✓ Instant updates across all pages</Feature>
                <Feature>✓ MongoDB integration for persistent storage</Feature>
                <Feature>✓ Socket.IO for real-time synchronization</Feature>
                <Feature>✓ Admin authentication & authorization</Feature>
                <Feature>✓ CRUD operations with validation</Feature>
                <Feature>✓ Bulk operations support</Feature>
              </FeatureList>
            </InfoSection>
          </>
        )}
      </Content>
    </Container>
  );
};

export default AdminDashboardEnhanced;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: #f9fafb;
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #6b7280;
`;

const ConnectionStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  border-radius: 20px;
  background: ${(props) => (props.connected ? '#d1fae5' : '#fee2e2')};
  color: ${(props) => (props.connected ? '#065f46' : '#991b1b')};
  font-weight: 600;
  font-size: 14px;
`;

const StatusDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) => (props.connected ? '#10b981' : '#ef4444')};
  animation: ${(props) => (props.connected ? 'pulse 2s infinite' : 'none')};

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const StatCard = styled(Link)`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 30px;
  background: ${(props) => props.$bgColor};
  border-radius: 12px;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  border: ${(props) => (props.$total ? '2px solid #e5e7eb' : 'none')};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }
`;

const StatIcon = styled.div`
  font-size: 48px;
`;

const StatInfo = styled.div`
  flex: 1;
`;

const StatCount = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #1f2937;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #6b7280;
  margin-top: 4px;
`;

const QuickActions = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 20px;
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
`;

const ActionButton = styled(Link)`
  padding: 20px;
  background: white;
  border-radius: 10px;
  text-decoration: none;
  color: ${(props) => props.$color};
  font-weight: 600;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  border: 2px solid ${(props) => props.$color}33;

  &:hover {
    background: ${(props) => props.$color};
    color: white;
    transform: scale(1.05);
  }
`;

const InfoSection = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const FeatureList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
`;

const Feature = styled.div`
  padding: 15px;
  background: #f9fafb;
  border-radius: 8px;
  color: #374151;
  font-size: 14px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 80px 20px;
  font-size: 18px;
  color: #6b7280;
`;
