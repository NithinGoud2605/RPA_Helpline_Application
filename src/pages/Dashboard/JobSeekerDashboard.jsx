import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { FaBriefcase, FaFileAlt, FaChartLine } from 'react-icons/fa';

export const JobSeekerDashboard = () => {
  const jobMatches = 12;
  const appliedJobs = 5;
  const profileComplete = 85;

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="elevated">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Job Matches</p>
              <p className="text-3xl font-bold text-white">{jobMatches}</p>
            </div>
            <FaBriefcase className="text-4xl text-primary-blue opacity-50" />
          </div>
        </Card>
        
        <Card variant="elevated">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Applications</p>
              <p className="text-3xl font-bold text-white">{appliedJobs}</p>
            </div>
            <FaFileAlt className="text-4xl text-primary-blue opacity-50" />
          </div>
        </Card>
        
        <Card variant="elevated">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Profile Complete</p>
              <p className="text-3xl font-bold text-white">{profileComplete}%</p>
            </div>
            <FaChartLine className="text-4xl text-primary-blue opacity-50" />
          </div>
        </Card>
      </div>

      {/* Job Matches */}
      <Card variant="elevated">
        <h2 className="text-2xl font-bold text-white mb-6">Recommended Jobs</h2>
        <div className="space-y-4">
          {[
            { title: 'Senior RPA Developer', company: 'Tech Corp', location: 'Remote', match: 95 },
            { title: 'UiPath Consultant', company: 'Automation Inc', location: 'Hybrid', match: 88 },
            { title: 'RPA Engineer', company: 'Finance Solutions', location: 'On-site', match: 82 },
          ].map((job, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-dark-surface rounded-lg border border-dark-border">
              <div>
                <h3 className="text-white font-semibold">{job.title}</h3>
                <p className="text-gray-400 text-sm">{job.company} • {job.location}</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="info">{job.match}% Match</Badge>
                <Button variant="primary" size="sm">
                  Apply
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Applied Positions */}
      <Card variant="elevated">
        <h2 className="text-2xl font-bold text-white mb-6">Applied Positions</h2>
        <div className="space-y-4">
          {[
            { title: 'RPA Developer', company: 'StartupXYZ', status: 'under-review' },
            { title: 'Automation Specialist', company: 'BigCorp', status: 'interview' },
          ].map((application, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-dark-surface rounded-lg border border-dark-border">
              <div>
                <h3 className="text-white font-semibold">{application.title}</h3>
                <p className="text-gray-400 text-sm">{application.company}</p>
              </div>
              <Badge variant={application.status === 'interview' ? 'success' : 'warning'}>
                {application.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

