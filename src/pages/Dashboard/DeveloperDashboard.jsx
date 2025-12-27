import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { FaRocket, FaAward, FaChartLine } from 'react-icons/fa';

export const DeveloperDashboard = () => {
  const activeMissions = 3;
  const certifications = 4;
  const successRate = 98;

  const missions = [
    { id: 1, name: 'Invoice Automation', status: 'in-progress', progress: 75 },
    { id: 2, name: 'Data Migration', status: 'in-progress', progress: 45 },
    { id: 3, name: 'Report Generation', status: 'pending', progress: 0 },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="elevated">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Active Missions</p>
              <p className="text-3xl font-bold text-white">{activeMissions}</p>
            </div>
            <FaRocket className="text-4xl text-primary-blue opacity-50" />
          </div>
        </Card>
        
        <Card variant="elevated">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Certifications</p>
              <p className="text-3xl font-bold text-white">{certifications}</p>
            </div>
            <FaAward className="text-4xl text-primary-blue opacity-50" />
          </div>
        </Card>
        
        <Card variant="elevated">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Success Rate</p>
              <p className="text-3xl font-bold text-white">{successRate}%</p>
            </div>
            <FaChartLine className="text-4xl text-primary-blue opacity-50" />
          </div>
        </Card>
      </div>

      {/* Active Missions */}
      <Card variant="elevated">
        <h2 className="text-2xl font-bold text-white mb-6">Active Missions</h2>
        <div className="space-y-4">
          {missions.map((mission) => (
            <div key={mission.id} className="p-4 bg-dark-surface rounded-lg border border-dark-border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold">{mission.name}</h3>
                <Badge variant={mission.status === 'in-progress' ? 'info' : 'default'}>
                  {mission.status}
                </Badge>
              </div>
              {mission.status === 'in-progress' && (
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{mission.progress}%</span>
                  </div>
                  <div className="w-full bg-dark-border rounded-full h-2">
                    <div
                      className="bg-primary-blue h-2 rounded-full transition-all"
                      style={{ width: `${mission.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Skills & Certifications */}
      <Card variant="elevated">
        <h2 className="text-2xl font-bold text-white mb-6">Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['UiPath Advanced RPA Developer', 'Blue Prism Certified Developer', 'Automation Anywhere Certified', 'Python Automation Specialist'].map((cert, index) => (
            <div key={index} className="p-4 bg-dark-surface rounded-lg border border-primary-blue/20">
              <div className="flex items-center gap-3">
                <FaAward className="text-primary-blue" />
                <span className="text-white">{cert}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

