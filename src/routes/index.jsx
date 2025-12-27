import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { ProtectedRoute } from '../components/common/ProtectedRoute';
import { Home } from '../pages/Home';
import { SignIn } from '../pages/SignIn';
import { Projects } from '../pages/Projects';
import { ProjectDetail } from '../pages/ProjectDetail';
import { HowItWorks } from '../pages/HowItWorks';
import { Dashboard } from '../pages/Dashboard';
import { Register } from '../pages/Register';
import { RegisterClient } from '../pages/Register/RegisterClient';
import { RegisterFreelancer } from '../pages/Register/RegisterFreelancer';
import { RegisterDeveloper } from '../pages/Register/RegisterDeveloper';
import { RegisterTrainer } from '../pages/Register/RegisterTrainer';
import { RegisterJobSeeker } from '../pages/Register/RegisterJobSeeker';
import { RegisterProject } from '../pages/Register/RegisterProject';
import { NotFound } from '../pages/NotFound';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/sign-in" element={<MainLayout><SignIn /></MainLayout>} />
      <Route path="/projects" element={<MainLayout><Projects /></MainLayout>} />
      <Route path="/projects/:id" element={<MainLayout><ProjectDetail /></MainLayout>} />
      <Route path="/how-it-works" element={<MainLayout><HowItWorks /></MainLayout>} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
      <Route path="/register/client" element={<MainLayout><RegisterClient /></MainLayout>} />
      <Route path="/register/freelancer" element={<MainLayout><RegisterFreelancer /></MainLayout>} />
      <Route path="/register/developer" element={<MainLayout><RegisterDeveloper /></MainLayout>} />
      <Route path="/register/trainer" element={<MainLayout><RegisterTrainer /></MainLayout>} />
      <Route path="/register/jobseeker" element={<MainLayout><RegisterJobSeeker /></MainLayout>} />
      <Route
        path="/register/project"
        element={
          <ProtectedRoute allowedRoles={['client']}>
            <MainLayout><RegisterProject /></MainLayout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
    </Routes>
  );
};

