import { memo, useMemo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { freelancerApi, jobApi } from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import {
  Briefcase, DollarSign, Clock, Star, ArrowRight, MapPin, Building2,
  CheckCircle, Calendar, Eye, Users, Target, BookmarkPlus, FileText,
  Award, TrendingUp, ExternalLink, BookOpen, Send, XCircle, AlertCircle
} from 'lucide-react';

// Helper function to get relative time
const getTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
};

// ============================================================================
// JOB CARD COMPONENT
// ============================================================================
const JobCard = memo(({ job, saved = false }) => (
  <Card className="tech-panel border-border bg-card/50 hover-lift transition-all duration-300 group">
    <CardContent className="p-3 md:p-5">
      <div className="flex items-start justify-between gap-3 md:gap-4 mb-3 md:mb-4">
        <div className="flex items-start gap-2.5 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
            <Building2 className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground" />
          </div>
          <div className="min-w-0">
            <h4 className="font-display font-bold text-foreground tracking-wider mb-1 text-sm md:text-base group-hover:text-primary transition-colors truncate">
              {job.title}
            </h4>
            <p className="text-xs md:text-sm text-muted-foreground truncate">{job.company}</p>
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-1.5 md:mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {job.type}
              </span>
            </div>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0 min-w-[32px] min-h-[32px] flex items-center justify-center">
          <BookmarkPlus className={`w-4 h-4 md:w-5 md:h-5 ${saved ? 'fill-primary text-primary' : ''}`} />
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
        {job.skills.slice(0, 3).map((skill, i) => (
          <span key={i} className="px-2 py-0.5 md:py-1 rounded-lg bg-muted text-muted-foreground text-[10px] md:text-xs font-mono">
            {skill}
          </span>
        ))}
        {job.skills.length > 3 && (
          <span className="px-2 py-0.5 md:py-1 rounded-lg bg-muted/50 text-muted-foreground text-[10px] md:text-xs font-mono">
            +{job.skills.length - 3}
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 pt-3 md:pt-4 border-t border-border/50">
        <div className="flex items-center gap-2 md:gap-4">
          <span className="text-base md:text-lg font-display font-bold text-secondary">{job.salary}</span>
          <span className={`px-2 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-mono ${job.urgency === 'URGENT' ? 'bg-primary/20 text-primary' :
            job.urgency === 'HOT' ? 'bg-accent/20 text-accent' :
              'bg-secondary/20 text-secondary'
            }`}>
            {job.urgency}
          </span>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-muted-foreground">{job.posted}</span>
          <Link to={`/jobs/${job.id}`} className="flex-1 sm:flex-none">
            <Button variant="outline" size="sm" className="font-mono text-xs tracking-wider min-h-[36px] w-full sm:w-auto">
              APPLY NOW
            </Button>
          </Link>
        </div>
      </div>
    </CardContent>
  </Card>
));
JobCard.displayName = 'JobCard';

// ============================================================================
// APPLICATION CARD COMPONENT
// ============================================================================
const ApplicationCard = memo(({ application }) => {
  const navigate = useNavigate();

  const getStatusConfig = (status) => {
    switch (status) {
      case 'INTERVIEW':
      case 'SHORTLISTED':
        return { color: 'bg-green-500/20 text-green-500', icon: CheckCircle };
      case 'REVIEWED':
        return { color: 'bg-blue-500/20 text-blue-500', icon: Eye };
      case 'PENDING':
        return { color: 'bg-yellow-500/20 text-yellow-500', icon: Clock };
      case 'REJECTED':
        return { color: 'bg-destructive/20 text-destructive', icon: XCircle };
      default:
        return { color: 'bg-muted text-muted-foreground', icon: AlertCircle };
    }
  };

  const statusConfig = getStatusConfig(application.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Card
      className="tech-panel border-border bg-card/50 hover-lift transition-all duration-300 cursor-pointer"
      onClick={() => navigate(application.type === 'job' ? `/jobs/${application.itemId}` : `/projects/${application.itemId}`)}
    >
      <CardContent className="p-3 md:p-4">
        <div className="flex items-start justify-between gap-3 md:gap-4 mb-2.5 md:mb-3">
          <div className="flex-1 min-w-0">
            <h4 className="font-display font-bold text-foreground tracking-wider mb-1 text-sm md:text-base truncate">
              {application.position}
            </h4>
            <p className="text-xs text-muted-foreground font-mono flex items-center gap-1.5 md:gap-2">
              <Building2 className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{application.company}</span>
            </p>
          </div>
          <Badge className={`${statusConfig.color} font-mono text-[10px] md:text-xs flex-shrink-0`}>
            <StatusIcon className="w-2.5 h-2.5 md:w-3 md:h-3 mr-1" />
            {application.status}
          </Badge>
        </div>

        <div className="space-y-1.5 md:space-y-2 mb-2.5 md:mb-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Application Progress</span>
            <span className="text-primary font-mono">{application.progress}%</span>
          </div>
          <div className="h-1 md:h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${application.status === 'INTERVIEW' || application.status === 'SHORTLISTED' ? 'bg-green-500' :
                application.status === 'REVIEWED' ? 'bg-blue-500' :
                  application.status === 'REJECTED' ? 'bg-destructive' :
                    'bg-gradient-to-r from-primary to-secondary'
                }`}
              style={{ width: `${application.progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Applied: {application.applied}
          </span>
          {application.nextStep && (
            <span className="text-primary">{application.nextStep}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
});
ApplicationCard.displayName = 'ApplicationCard';

// ============================================================================
// MAIN JOB SEEKER DASHBOARD COMPONENT
// ============================================================================
export const JobSeekerDashboard = memo(() => {
  // State for real applications data
  const [applications, setApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(true);

  // State for real jobs data
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);

  // Fetch real applications
  useEffect(() => {
    const fetchApplications = async () => {
      setApplicationsLoading(true);
      try {
        const response = await freelancerApi.getMyApplications({ limit: 10 });
        const apps = response.applications || [];
        // Transform to match component expectations
        const transformed = apps.map(app => ({
          id: app.id,
          position: app.job?.title || app.project?.title || 'Untitled',
          company: app.job?.employer?.company_name || app.job?.employer?.full_name || app.project?.client?.company_name || 'Company',
          status: app.status?.toUpperCase() || 'PENDING',
          progress: app.status === 'pending' ? 25 : app.status === 'reviewed' ? 50 : app.status === 'shortlisted' ? 75 : app.status === 'rejected' ? 100 : 50,
          applied: app.created_at ? new Date(app.created_at).toLocaleDateString() : 'Recently',
          nextStep: app.status === 'shortlisted' ? 'Awaiting interview' : app.status === 'reviewed' ? 'Under review' : null,
          type: app.job_id ? 'job' : 'project',
          itemId: app.job_id || app.project_id
        }));
        setApplications(transformed);
      } catch (error) {
        console.error('Failed to fetch applications:', error);
        setApplications([]);
      } finally {
        setApplicationsLoading(false);
      }
    };
    fetchApplications();
  }, []);

  // Fetch real recommended jobs
  useEffect(() => {
    const fetchJobs = async () => {
      setJobsLoading(true);
      try {
        const response = await jobApi.getAll({ limit: 3, sort: 'created_at', order: 'desc' });
        const jobs = response.jobs || [];
        // Transform to match component expectations
        const transformed = jobs.map(job => ({
          id: job.id,
          title: job.title,
          company: job.employer?.company_name || job.employer?.full_name || 'Company',
          location: job.locations?.[0]?.city || (job.work_arrangement === 'remote' ? 'Remote' : 'On-site'),
          type: job.employment_type === 'full_time' ? 'Full-time' : job.employment_type === 'part_time' ? 'Part-time' : job.employment_type === 'contract' ? 'Contract' : 'Full-time',
          salary: job.salary_min && job.salary_max ? `₹${Math.round(job.salary_min / 100000)}L - ₹${Math.round(job.salary_max / 100000)}L` : 'Competitive',
          skills: job.technologies || [],
          urgency: job.created_at && new Date(job.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000) ? 'NEW' : 'OPEN',
          posted: job.created_at ? getTimeAgo(job.created_at) : 'Recently',
        }));
        setRecommendedJobs(transformed);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
        setRecommendedJobs([]);
      } finally {
        setJobsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Calculate stats from real data
  const stats = useMemo(() => ({
    totalApplications: applications.length,
    interviews: applications.filter(a => a.status === 'INTERVIEW' || a.status === 'SHORTLISTED').length,
    pending: applications.filter(a => a.status === 'PENDING').length,
    profileViews: 0, // Would need separate API
  }), [applications]);

  return (
    <div className="space-y-8">
      {/* Section: Application Stats */}
      <section>
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="tech-panel border-border bg-card/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <CardContent className="p-4">
              <p className="text-xs font-mono text-muted-foreground mb-1">APPLICATIONS</p>
              <p className="text-2xl font-display font-bold text-primary">{stats.totalApplications}</p>
              <p className="text-xs text-muted-foreground mt-1">Total submitted</p>
            </CardContent>
          </Card>
          <Card className="tech-panel border-border bg-card/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />
            <CardContent className="p-4">
              <p className="text-xs font-mono text-muted-foreground mb-1">INTERVIEWS</p>
              <p className="text-2xl font-display font-bold text-green-500">{stats.interviews}</p>
              <p className="text-xs text-muted-foreground mt-1">Shortlisted</p>
            </CardContent>
          </Card>
          <Card className="tech-panel border-border bg-card/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-secondary" />
            <CardContent className="p-4">
              <p className="text-xs font-mono text-muted-foreground mb-1">PROFILE VIEWS</p>
              <p className="text-2xl font-display font-bold text-secondary">{stats.profileViews}</p>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </CardContent>
          </Card>
          <Card className="tech-panel border-border bg-card/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500" />
            <CardContent className="p-4">
              <p className="text-xs font-mono text-muted-foreground mb-1">PENDING</p>
              <p className="text-2xl font-display font-bold text-yellow-500">{stats.pending}</p>
              <p className="text-xs text-muted-foreground mt-1">Awaiting response</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section: My Applications */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-display font-bold text-foreground tracking-wider flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            MY APPLICATIONS
          </h2>
          <Link to="/applications">
            <Button variant="ghost" className="font-mono text-xs tracking-wider text-secondary">
              VIEW ALL <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>

        {applicationsLoading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : applications.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {applications.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>
        ) : (
          <Card className="tech-panel border-border bg-card/50">
            <CardContent className="p-8 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No applications yet</p>
              <Link to="/jobs">
                <Button className="font-mono text-xs">
                  BROWSE JOBS <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Section: Recommended Jobs */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-display font-bold text-foreground tracking-wider flex items-center gap-2">
            <Target className="w-5 h-5 text-secondary" />
            RECOMMENDED FOR YOU
          </h2>
          <Link to="/jobs">
            <Button variant="ghost" className="font-mono text-xs tracking-wider text-secondary">
              BROWSE ALL JOBS <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>

        {jobsLoading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : recommendedJobs.length > 0 ? (
          <div className="space-y-4">
            {recommendedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <Card className="tech-panel border-border bg-card/50">
            <CardContent className="p-8 text-center">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No jobs available yet</p>
              <Link to="/jobs">
                <Button className="font-mono text-xs">
                  BROWSE JOBS <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Section: Career Resources */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-display font-bold text-foreground tracking-wider flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-accent" />
            CAREER RESOURCES
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="tech-panel border-border bg-card/50 hover-lift cursor-pointer group">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-foreground tracking-wider group-hover:text-primary transition-colors">
                  RESUME BUILDER
                </h3>
                <p className="text-sm text-muted-foreground">Create ATS-friendly resume</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardContent>
          </Card>

          <Card className="tech-panel border-border bg-card/50 hover-lift cursor-pointer group">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <Award className="w-6 h-6 text-secondary" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-foreground tracking-wider group-hover:text-secondary transition-colors">
                  SKILL ASSESSMENTS
                </h3>
                <p className="text-sm text-muted-foreground">Verify your expertise</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-secondary transition-colors" />
            </CardContent>
          </Card>

          <Card className="tech-panel border-border bg-card/50 hover-lift cursor-pointer group">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-foreground tracking-wider group-hover:text-accent transition-colors">
                  INTERVIEW PREP
                </h3>
                <p className="text-sm text-muted-foreground">Practice RPA interviews</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
});

JobSeekerDashboard.displayName = 'JobSeekerDashboard';
