import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useProjectStore } from '../../store/projectStore';
import { useEffect } from 'react';
import { FaProjectDiagram, FaComments, FaUserCheck, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const ClientDashboard = () => {
  const navigate = useNavigate();
  const { projects, loadProjects } = useProjectStore();

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const activeProjects = projects.filter(p => p.status === 'open' || p.status === 'in-progress');
  const matchedDevelopers = 12; // Mock data

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="elevated">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Active Projects</p>
              <p className="text-3xl font-bold text-white">{activeProjects.length}</p>
            </div>
            <FaProjectDiagram className="text-4xl text-primary-blue opacity-50" />
          </div>
        </Card>
        
        <Card variant="elevated">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Messages</p>
              <p className="text-3xl font-bold text-white">8</p>
            </div>
            <FaComments className="text-4xl text-primary-blue opacity-50" />
          </div>
        </Card>
        
        <Card variant="elevated">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Matched Developers</p>
              <p className="text-3xl font-bold text-white">{matchedDevelopers}</p>
            </div>
            <FaUserCheck className="text-4xl text-primary-blue opacity-50" />
          </div>
        </Card>
      </div>

      {/* Projects Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Your Projects</h2>
          <Button
            variant="primary"
            onClick={() => navigate('/register/project')}
          >
            <FaPlus className="mr-2" />
            New Project
          </Button>
        </div>

        {projects.length === 0 ? (
          <Card>
            <p className="text-gray-400 text-center py-8">No projects yet. Create your first project!</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card key={project.id} variant="elevated">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <Badge variant={project.status === 'open' ? 'success' : 'default'}>
                    {project.status}
                  </Badge>
                </div>
                <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="info">{project.automationType}</Badge>
                  <Button variant="secondary" size="sm">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

