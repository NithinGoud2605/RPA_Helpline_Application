import { Navbar } from '../components/layout/Navbar';
import { Container } from '../components/layout/Container';

export const DashboardLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-dark-bg bg-starfield">
      <Navbar />
      <Container className="py-8">
        {title && (
          <h1 className="text-3xl font-bold text-white mb-8">{title}</h1>
        )}
        {children}
      </Container>
    </div>
  );
};

