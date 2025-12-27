import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { ProtectedRoute } from '../components/common/ProtectedRoute';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

// Helper function to lazy load named exports
const lazyLoad = (importFunc, exportName) => {
  return lazy(() => 
    importFunc().then(module => {
      const component = module[exportName];
      if (!component) {
        const error = new Error(`Component ${exportName} not found in module`);
        console.error(`Error loading component ${exportName}:`, error.message);
        throw error;
      }
      return { default: component };
    }).catch(error => {
      // Safely log error without trying to convert object to string
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`Error loading component ${exportName}:`, errorMessage);
      throw error;
    })
  );
};

// Lazy load all pages for better performance
const Home = lazyLoad(() => import('../pages/Home'), 'Home');
const SignIn = lazyLoad(() => import('../pages/SignIn'), 'SignIn');
const Projects = lazyLoad(() => import('../pages/Projects'), 'Projects');
const ProjectDetail = lazyLoad(() => import('../pages/ProjectDetail'), 'ProjectDetail');
const HowItWorks = lazyLoad(() => import('../pages/HowItWorks'), 'HowItWorks');
const Dashboard = lazyLoad(() => import('../pages/Dashboard'), 'Dashboard');
const Register = lazyLoad(() => import('../pages/Register'), 'Register');
const RegisterClient = lazyLoad(() => import('../pages/Register/RegisterClient'), 'RegisterClient');
const RegisterFreelancer = lazyLoad(() => import('../pages/Register/RegisterFreelancer'), 'RegisterFreelancer');
const RegisterDeveloper = lazyLoad(() => import('../pages/Register/RegisterDeveloper'), 'RegisterDeveloper');
const RegisterTrainer = lazyLoad(() => import('../pages/Register/RegisterTrainer'), 'RegisterTrainer');
const RegisterJobSeeker = lazyLoad(() => import('../pages/Register/RegisterJobSeeker'), 'RegisterJobSeeker');
const RegisterProject = lazyLoad(() => import('../pages/Register/RegisterProject'), 'RegisterProject');
const NotFound = lazyLoad(() => import('../pages/NotFound'), 'NotFound');

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-dark-bg bg-starfield">
    <div className="text-center">
      <LoadingSpinner size="xl" className="mb-4" />
      <p className="text-white font-mono uppercase tracking-wider text-sm">LOADING MISSION DATA...</p>
    </div>
  </div>
);

export const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route 
          path="/" 
          element={
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <Home />
              </Suspense>
            </MainLayout>
          } 
        />
        <Route 
          path="/sign-in" 
          element={
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <SignIn />
              </Suspense>
            </MainLayout>
          } 
        />
        <Route 
          path="/projects" 
          element={
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <Projects />
              </Suspense>
            </MainLayout>
          } 
        />
        <Route 
          path="/projects/:id" 
          element={
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <ProjectDetail />
              </Suspense>
            </MainLayout>
          } 
        />
        <Route 
          path="/how-it-works" 
          element={
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <HowItWorks />
              </Suspense>
            </MainLayout>
          } 
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoader />}>
                <Dashboard />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/register" 
          element={
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <Register />
              </Suspense>
            </MainLayout>
          } 
        />
        <Route 
          path="/register/client" 
          element={
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <RegisterClient />
              </Suspense>
            </MainLayout>
          } 
        />
        <Route 
          path="/register/freelancer" 
          element={
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <RegisterFreelancer />
              </Suspense>
            </MainLayout>
          } 
        />
        <Route 
          path="/register/developer" 
          element={
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <RegisterDeveloper />
              </Suspense>
            </MainLayout>
          } 
        />
        <Route 
          path="/register/trainer" 
          element={
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <RegisterTrainer />
              </Suspense>
            </MainLayout>
          } 
        />
        <Route 
          path="/register/jobseeker" 
          element={
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <RegisterJobSeeker />
              </Suspense>
            </MainLayout>
          } 
        />
        <Route
          path="/register/project"
          element={
            <ProtectedRoute allowedRoles={['client']}>
              <MainLayout>
                <Suspense fallback={<PageLoader />}>
                  <RegisterProject />
                </Suspense>
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route 
          path="*" 
          element={
            <MainLayout>
              <Suspense fallback={<PageLoader />}>
                <NotFound />
              </Suspense>
            </MainLayout>
          } 
        />
      </Routes>
    </Suspense>
  );
};

