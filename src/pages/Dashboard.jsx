import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../admin/AuthContext';
import authService from '../services/authService';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

  if (!currentUser) {
    return (
      <PageContainer>
        <LoadingCard>
          <LoadingSpinner />
          <LoadingText>Loading your dashboard...</LoadingText>
        </LoadingCard>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <DashboardCard>
        <Header>
          <WelcomeSection>
            <Avatar>
              {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
            </Avatar>
            <div>
              <WelcomeTitle>Welcome back, {currentUser.name}!</WelcomeTitle>
              <UserEmail>{currentUser.email}</UserEmail>
              <UserBadge role={currentUser.role}>
                {currentUser.role === 'admin' ? '👑 Admin' : '👤 Member'}
              </UserBadge>
            </div>
          </WelcomeSection>
        </Header>

        <ContentSection>
          <SectionTitle>Your Profile</SectionTitle>
          <ProfileGrid>
            <ProfileCard>
              <CardIcon>👤</CardIcon>
              <CardLabel>Full Name</CardLabel>
              <CardValue>{currentUser.name}</CardValue>
            </ProfileCard>

            <ProfileCard>
              <CardIcon>📧</CardIcon>
              <CardLabel>Email</CardLabel>
              <CardValue>{currentUser.email}</CardValue>
            </ProfileCard>

            <ProfileCard>
              <CardIcon>🎭</CardIcon>
              <CardLabel>Role</CardLabel>
              <CardValue>{currentUser.role}</CardValue>
            </ProfileCard>

            <ProfileCard>
              <CardIcon>📅</CardIcon>
              <CardLabel>Member Since</CardLabel>
              <CardValue>
                {currentUser.createdAt
                  ? new Date(currentUser.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : 'N/A'}
              </CardValue>
            </ProfileCard>
          </ProfileGrid>

          <SectionTitle>Quick Actions</SectionTitle>
          <ActionsGrid>
            <ActionButton onClick={handleNavigateHome}>
              <ActionIcon>🏠</ActionIcon>
              <ActionLabel>Go to Homepage</ActionLabel>
            </ActionButton>

            {currentUser.role === 'admin' && (
              <ActionButton onClick={() => navigate('/admin')}>
                <ActionIcon>⚙️</ActionIcon>
                <ActionLabel>Admin Panel</ActionLabel>
              </ActionButton>
            )}

            <ActionButton onClick={() => navigate('/about')}>
              <ActionIcon>ℹ️</ActionIcon>
              <ActionLabel>About GDG</ActionLabel>
            </ActionButton>

            <ActionButton onClick={handleLogout} disabled={loading}>
              <ActionIcon>🚪</ActionIcon>
              <ActionLabel>{loading ? 'Logging out...' : 'Logout'}</ActionLabel>
            </ActionButton>
          </ActionsGrid>
        </ContentSection>

        <InfoSection>
          <InfoCard>
            <InfoTitle>🎉 Welcome to GDG ITER!</InfoTitle>
            <InfoText>
              You're now part of a vibrant community of developers, designers, and tech
              enthusiasts. Explore our events, workshops, and connect with fellow members.
            </InfoText>
          </InfoCard>
        </InfoSection>
      </DashboardCard>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #4338ca 100%);
  padding: 2rem;
`;

const DashboardCard = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  animation: slideUp 0.5s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const LoadingCard = styled.div`
  max-width: 400px;
  margin: 0 auto;
  background: white;
  border-radius: 1.5rem;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid var(--color-grey-200);
  border-top-color: var(--color-brand-600);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  color: var(--color-grey-600);
  font-size: 1rem;
`;

const Header = styled.div`
  background: linear-gradient(135deg, var(--color-brand-600), var(--color-brand-700));
  padding: 3rem;
  color: white;
`;

const WelcomeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  background: white;
  color: var(--color-brand-600);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const WelcomeTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const UserEmail = styled.p`
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 0.5rem;
`;

const UserBadge = styled.span`
  display: inline-block;
  padding: 0.375rem 0.75rem;
  background: ${(props) =>
    props.role === 'admin'
      ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
      : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: 0.5rem;
`;

const ContentSection = styled.div`
  padding: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-grey-900);
  margin-bottom: 1.5rem;
  margin-top: 2rem;

  &:first-child {
    margin-top: 0;
  }
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ProfileCard = styled.div`
  background: var(--color-grey-50);
  padding: 1.5rem;
  border-radius: 1rem;
  border: 2px solid var(--color-grey-200);
  transition: all 0.2s;

  &:hover {
    border-color: var(--color-brand-500);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(99, 102, 241, 0.1);
  }
`;

const CardIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const CardLabel = styled.div`
  font-size: 0.875rem;
  color: var(--color-grey-600);
  margin-bottom: 0.25rem;
`;

const CardValue = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-grey-900);
  word-break: break-word;
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ActionButton = styled.button`
  background: white;
  border: 2px solid var(--color-grey-300);
  padding: 1.5rem;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  &:hover:not(:disabled) {
    border-color: var(--color-brand-500);
    background: var(--color-brand-50);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(99, 102, 241, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ActionIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const ActionLabel = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-grey-900);
`;

const InfoSection = styled.div`
  padding: 3rem;
  background: var(--color-grey-50);
`;

const InfoCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  border-left: 4px solid var(--color-brand-600);
`;

const InfoTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-grey-900);
  margin-bottom: 0.75rem;
`;

const InfoText = styled.p`
  color: var(--color-grey-700);
  line-height: 1.6;
`;

export default Dashboard;
