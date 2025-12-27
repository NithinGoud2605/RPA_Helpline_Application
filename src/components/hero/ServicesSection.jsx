import { useNavigate } from 'react-router-dom';
import { FaCode, FaUserTie, FaChalkboardTeacher, FaProjectDiagram } from 'react-icons/fa';
import { Container } from '../layout/Container';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const ServicesSection = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: FaCode,
      title: 'Hire Developers',
      description: 'Connect with certified RPA developers for your automation projects.',
      route: '/register/developer',
      color: 'primary-blue',
    },
    {
      icon: FaUserTie,
      title: 'Find Freelancers',
      description: 'Access a pool of skilled freelance RPA experts on-demand.',
      route: '/register/freelancer',
      color: 'primary-blue',
    },
    {
      icon: FaChalkboardTeacher,
      title: 'Training Programs',
      description: 'Comprehensive RPA training from certified instructors.',
      route: '/register/trainer',
      color: 'primary-blue',
    },
    {
      icon: FaProjectDiagram,
      title: 'Post Projects',
      description: 'Post your automation projects and get matched with experts.',
      route: '/register/project',
      color: 'primary-blue',
    },
  ];

  return (
    <section className="py-20 bg-dark-surface/30">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Our Services</h2>
          <p className="text-gray-400">Everything you need for RPA success</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              variant="elevated"
              className="hover:border-primary-blue/50 transition-colors cursor-pointer group"
              onClick={() => navigate(service.route)}
            >
              <div className={`${service.color === 'primary-blue' ? 'text-primary-blue' : 'text-primary-blue'} mb-4 text-3xl group-hover:scale-110 transition-transform`}>
                <service.icon />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
              <p className="text-gray-400 mb-4">{service.description}</p>
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
              >
                Get Started
              </Button>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

