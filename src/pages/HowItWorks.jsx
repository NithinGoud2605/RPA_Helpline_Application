import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { FaRocket, FaSearch, FaHandshake, FaCheckCircle } from 'react-icons/fa';

export const HowItWorks = () => {
  const steps = [
    {
      icon: FaRocket,
      title: 'Launch Your Mission',
      description: 'Post your project or search for RPA talent. Our AI matches you with the perfect candidates.',
      color: 'primary-blue',
    },
    {
      icon: FaSearch,
      title: 'Browse & Filter',
      description: 'Explore profiles, portfolios, and reviews. Filter by skills, experience, and availability.',
      color: 'primary-blue',
    },
    {
      icon: FaHandshake,
      title: 'Connect & Collaborate',
      description: 'Communicate directly with developers, freelancers, or trainers. Discuss requirements and timelines.',
      color: 'primary-blue',
    },
    {
      icon: FaCheckCircle,
      title: 'Complete & Review',
      description: 'Work together to deliver results. Rate and review your experience to help others.',
      color: 'primary-blue',
    },
  ];

  return (
    <Container className="py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">How It Works</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Simple, fast, and efficient. Get your RPA projects off the ground in minutes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {steps.map((step, index) => (
          <Card key={index} variant="elevated" className="text-center">
            <div className={`text-${step.color} mb-4 text-4xl flex justify-center`}>
              <step.icon />
            </div>
            <div className="text-2xl font-bold text-white mb-2">{index + 1}</div>
            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
            <p className="text-gray-400">{step.description}</p>
          </Card>
        ))}
      </div>

      <Card variant="elevated" className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Why Choose RPA Helpline?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-primary-blue mb-2">Expert Talent Pool</h3>
            <p className="text-gray-400">
              Access to certified RPA developers, freelancers, and trainers with proven track records.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-primary-blue mb-2">Fast Matching</h3>
            <p className="text-gray-400">
              Our AI-powered system connects you with the right talent in minutes, not days.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-primary-blue mb-2">24/7 Support</h3>
            <p className="text-gray-400">
              Round-the-clock assistance to ensure your projects run smoothly from start to finish.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-primary-blue mb-2">Transparent Process</h3>
            <p className="text-gray-400">
              Clear communication, detailed profiles, and honest reviews help you make informed decisions.
            </p>
          </div>
        </div>
      </Card>
    </Container>
  );
};

