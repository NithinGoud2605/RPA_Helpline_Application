import { memo, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { projectApi, freelancerApi } from '../../services/api';
import {
  Target, DollarSign, Clock, Star, ArrowRight, Users,
  CheckCircle, Calendar, Eye, TrendingUp, Briefcase, BarChart3,
  Award, ExternalLink, FileText, MessageSquare, Building2
} from 'lucide-react';

// ============================================================================
// PROJECT CARD COMPONENT
// ============================================================================
const ProjectCard = memo(({ project }) => (
  <Card className="tech-panel border-border bg-card/50 hover-lift transition-all duration-300 group">
    <CardContent className="p-3 md:p-5">
      <div className="flex items-start justify-between gap-3 md:gap-4 mb-3 md:mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
            <span className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-mono ${project.status === 'IN_PROGRESS' ? 'bg-secondary/20 text-secondary' :
              project.status === 'PLANNING' ? 'bg-accent/20 text-accent' :
                project.status === 'COMPLETED' ? 'bg-green-500/20 text-green-500' :
                  'bg-primary/20 text-primary'
              }`}>
              {project.status.replace('_', ' ')}
            </span>
            {project.priority === 'HIGH' && (
              <span className="text-[10px] md:text-xs text-primary font-mono">HIGH PRIORITY</span>
            )}
          </div>
          <h4 className="font-display font-bold text-foreground tracking-wider mb-1 text-sm md:text-base group-hover:text-primary transition-colors truncate">
            {project.title}
          </h4>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5 md:gap-2 truncate">
            <Building2 className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{project.client}</span>
          </p>
        </div>
      </div>

      <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-2">{project.description}</p>

      <div className="flex items-center gap-3 md:gap-4 text-xs text-muted-foreground mb-3 md:mb-4">
        <span className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          {project.teamSize} applicants
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {project.deadline}
        </span>
      </div>

      <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-border/50">
        <span className="text-base md:text-lg font-display font-bold text-secondary">{project.budget}</span>
        <Link to={`/projects/${project.id}`}>
          <Button variant="outline" size="sm" className="font-mono text-xs tracking-wider min-h-[36px]">
            VIEW DETAILS
          </Button>
        </Link>
      </div>
    </CardContent>
  </Card>
));
ProjectCard.displayName = 'ProjectCard';

// ============================================================================
// MAIN DEVELOPER (BA/PM) DASHBOARD COMPONENT
// ============================================================================
export const DeveloperDashboard = memo(() => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeProjects: 0,
    totalApplications: 0,
    profileViews: 0,
    completedThisYear: 0,
  });
  const fetchRef = useRef(false);

  useEffect(() => {
    if (fetchRef.current) return;
    fetchRef.current = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch available projects
        const response = await projectApi.getAll({ limit: 6, status: 'open' });
        const projectsList = response.projects || [];

        // Transform to match component expectations
        const transformed = projectsList.map(p => ({
          id: p.id,
          title: p.title,
          client: p.client?.full_name || p.client?.company_name || 'Client',
          status: p.status?.toUpperCase().replace('-', '_') || 'OPEN',
          priority: p.urgency === 'high' ? 'HIGH' : p.urgency === 'medium' ? 'MEDIUM' : 'LOW',
          teamSize: p.application_count || 0,
          deadline: p.deadline ? new Date(p.deadline).toLocaleDateString() : 'Flexible',
          budget: p.budget_min && p.budget_max
            ? `₹${(p.budget_min / 100000).toFixed(1)}L - ₹${(p.budget_max / 100000).toFixed(1)}L`
            : 'Negotiable',
          description: p.description || '',
        }));

        setProjects(transformed);

        // Calculate stats
        setStats({
          activeProjects: projectsList.filter(p => p.status === 'open' || p.status === 'in_progress').length,
          totalApplications: projectsList.reduce((sum, p) => sum + (p.application_count || 0), 0),
          profileViews: 0, // Would need separate API
          completedThisYear: projectsList.filter(p => p.status === 'completed').length,
        });
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Section: Overview Stats */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Card className="tech-panel border-border bg-card/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <CardContent className="p-3 md:p-4">
              <p className="text-[10px] md:text-xs font-mono text-muted-foreground mb-1">ACTIVE PROJECTS</p>
              <p className="text-xl md:text-2xl font-display font-bold text-primary">{stats.activeProjects}</p>
              <p className="text-[10px] md:text-xs text-muted-foreground mt-1 hidden sm:block">Currently managing</p>
            </CardContent>
          </Card>
          <Card className="tech-panel border-border bg-card/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-secondary" />
            <CardContent className="p-3 md:p-4">
              <p className="text-[10px] md:text-xs font-mono text-muted-foreground mb-1">TOTAL APPLICATIONS</p>
              <p className="text-xl md:text-2xl font-display font-bold text-secondary">{stats.totalApplications}</p>
              <p className="text-[10px] md:text-xs text-muted-foreground mt-1 hidden sm:block">Across all projects</p>
            </CardContent>
          </Card>
          <Card className="tech-panel border-border bg-card/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
            <CardContent className="p-3 md:p-4">
              <p className="text-[10px] md:text-xs font-mono text-muted-foreground mb-1">PROFILE VIEWS</p>
              <p className="text-xl md:text-2xl font-display font-bold text-accent">{stats.profileViews}</p>
              <p className="text-[10px] md:text-xs text-muted-foreground mt-1 hidden sm:block">This month</p>
            </CardContent>
          </Card>
          <Card className="tech-panel border-border bg-card/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />
            <CardContent className="p-3 md:p-4">
              <p className="text-[10px] md:text-xs font-mono text-muted-foreground mb-1">COMPLETED THIS YEAR</p>
              <p className="text-xl md:text-2xl font-display font-bold text-green-500">{stats.completedThisYear}</p>
              <p className="text-[10px] md:text-xs text-muted-foreground mt-1 hidden sm:block">Projects delivered</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section: Current Projects */}
      <section>
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h2 className="text-lg md:text-xl font-display font-bold text-foreground tracking-wider flex items-center gap-1.5 md:gap-2">
            <Target className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            CURRENT PROJECTS
          </h2>
          <Link to="/projects">
            <Button variant="ghost" className="font-mono text-xs tracking-wider text-secondary min-h-[36px]">
              VIEW ALL <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>

        {projects.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <Card className="tech-panel border-border bg-card/50">
            <CardContent className="p-8 text-center">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No projects available at the moment</p>
              <Link to="/projects">
                <Button className="font-mono text-xs">BROWSE ALL PROJECTS</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Section: Quick Actions */}
      <section>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <Card className="tech-panel border-border bg-card/50 hover-lift cursor-pointer group">
            <CardContent className="p-4 md:p-6 flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold text-foreground tracking-wider group-hover:text-primary transition-colors text-sm md:text-base truncate">
                  PROJECT ANALYTICS
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">View performance</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            </CardContent>
          </Card>

          <Card className="tech-panel border-border bg-card/50 hover-lift cursor-pointer group">
            <CardContent className="p-4 md:p-6 flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center justify-center group-hover:bg-secondary/20 transition-colors flex-shrink-0">
                <FileText className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold text-foreground tracking-wider group-hover:text-secondary transition-colors text-sm md:text-base truncate">
                  DOCUMENTATION
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">Project templates</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-secondary transition-colors flex-shrink-0" />
            </CardContent>
          </Card>

          <Card className="tech-panel border-border bg-card/50 hover-lift cursor-pointer group">
            <CardContent className="p-4 md:p-6 flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center group-hover:bg-accent/20 transition-colors flex-shrink-0">
                <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold text-foreground tracking-wider group-hover:text-accent transition-colors text-sm md:text-base truncate">
                  TEAM CHAT
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">Collaborate</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
});

DeveloperDashboard.displayName = 'DeveloperDashboard';
