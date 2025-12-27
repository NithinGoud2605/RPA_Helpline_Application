import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ClientDashboard } from './ClientDashboard';
import { FreelancerDashboard } from './FreelancerDashboard';
import { DeveloperDashboard } from './DeveloperDashboard';
import { TrainerDashboard } from './TrainerDashboard';
import { JobSeekerDashboard } from './JobSeekerDashboard';
import { initializeMockData } from '../../mock/data';

export const Dashboard = () => {
  const { role } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        initializeMockData();
        // Simulate data loading
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error) {
        console.error('Failed to initialize dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  if (loading) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="flex items-center justify-center py-20">
          <LoadingSpinner size="xl" />
        </div>
      </DashboardLayout>
    );
  }

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

