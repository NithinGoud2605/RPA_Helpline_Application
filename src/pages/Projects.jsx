import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useProjectStore } from '../store/projectStore';
import { useEffect } from 'react';
import { FaClock, FaDollarSign, FaIndustry } from 'react-icons/fa';

export const Projects = () => {
  const { projects, loadProjects } = useProjectStore();

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const getUrgencyColor = (urgency) => {
    switch (urgency?.toLowerCase()) {
      case 'critical':
        return 'danger';
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Container className="py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Available Projects</h1>
        <p className="text-gray-400">Browse and apply to automation projects</p>
      </div>

      {projects.length === 0 ? (
        <Card>
          <p className="text-gray-400 text-center py-8">No projects available at the moment.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project.id} variant="elevated" className="hover:border-primary-blue/50 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <Badge variant={getUrgencyColor(project.urgency)}>
                  {project.urgency}
                </Badge>
              </div>
              
              <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-4 text-sm">
                <div className="flex items-center text-gray-400">
                  <FaIndustry className="mr-2 text-primary-blue" />
                  {project.industry}
                </div>
                <div className="flex items-center text-gray-400">
                  <FaClock className="mr-2 text-primary-blue" />
                  {project.timeline}
                </div>
                <div className="flex items-center text-gray-400">
                  <FaDollarSign className="mr-2 text-primary-blue" />
                  {project.budget}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge variant="info">{project.automationType}</Badge>
                <Button variant="primary" size="sm">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

