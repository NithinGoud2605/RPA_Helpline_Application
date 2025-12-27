import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { ClientDashboard } from './ClientDashboard';
import { FreelancerDashboard } from './FreelancerDashboard';
import { DeveloperDashboard } from './DeveloperDashboard';
import { TrainerDashboard } from './TrainerDashboard';
import { JobSeekerDashboard } from './JobSeekerDashboard';
import { initializeMockData } from '../../mock/data';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { role, isAuthenticated } = useAuthStore();

  useEffect(() => {
    initializeMockData();
    
    if (!isAuthenticated) {
      navigate('/sign-in');
      return;
    }

    if (!role) {
      navigate('/');
      return;
    }
  }, [isAuthenticated, role, navigate]);

  const renderDashboard = () => {
    switch (role) {
      case 'client':
        return <ClientDashboard />;
      case 'freelancer':
        return <FreelancerDashboard />;
      case 'developer':
        return <DeveloperDashboard />;
      case 'trainer':
        return <TrainerDashboard />;
      case 'jobseeker':
        return <JobSeekerDashboard />;
      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-400">Please select a role to view your dashboard.</p>
          </div>
        );
    }
  };

  return (
    <DashboardLayout title="Dashboard">
      {renderDashboard()}
    </DashboardLayout>
  );
};

