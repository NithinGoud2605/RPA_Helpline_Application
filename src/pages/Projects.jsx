import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { useProjectStore } from '../store/projectStore';
import { useDebounce } from '../hooks/useDebounce';
import { LoadingSpinner, SkeletonLoader } from '../components/common/LoadingSpinner';
import { FaClock, FaDollarSign, FaIndustry, FaSearch, FaFilter } from 'react-icons/fa';

export const Projects = () => {
  const { projects, loadProjects } = useProjectStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUrgency, setFilterUrgency] = useState('all');
  const [filterIndustry, setFilterIndustry] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;

  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await loadProjects();
      setLoading(false);
    };
    load();
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

  // Get unique industries for filter
  const industries = useMemo(() => {
    const unique = [...new Set(projects.map((p) => p.industry))];
    return unique.filter(Boolean).sort();
  }, [projects]);

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        !debouncedSearch ||
        project.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        project.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        project.automationType.toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchesUrgency = filterUrgency === 'all' || project.urgency?.toLowerCase() === filterUrgency.toLowerCase();
      const matchesIndustry = filterIndustry === 'all' || project.industry === filterIndustry;
      const matchesStatus = filterStatus === 'all' || project.status === filterStatus;

      return matchesSearch && matchesUrgency && matchesIndustry && matchesStatus;
    });
  }, [projects, debouncedSearch, filterUrgency, filterIndustry, filterStatus]);

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(start, start + itemsPerPage);
  }, [filteredProjects, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, filterUrgency, filterIndustry, filterStatus]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilterUrgency('all');
    setFilterIndustry('all');
    setFilterStatus('all');
  };

  if (loading) {
    return (
      <Container className="py-12">
        <div className="mb-8">
          <SkeletonLoader lines={2} className="mb-4" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} variant="elevated">
              <SkeletonLoader lines={5} />
            </Card>
          ))}
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Available Projects</h1>
        <p className="text-gray-400">Browse and apply to automation projects</p>
      </div>

      {/* Search and Filters */}
      <Card variant="elevated" className="mb-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects by title, description, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-dark-bg border border-primary-blue/30 rounded-lg text-white placeholder-gray-500 font-mono tracking-wide focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-white font-mono uppercase tracking-wider text-xs mb-2">
                <FaFilter className="inline mr-1" />
                URGENCY
              </label>
              <Select
                value={filterUrgency}
                onChange={(e) => setFilterUrgency(e.target.value)}
                options={[
                  { value: 'all', label: 'All Urgencies' },
                  { value: 'critical', label: 'Critical' },
                  { value: 'high', label: 'High' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'low', label: 'Low' },
                ]}
              />
            </div>
            <div>
              <label className="block text-white font-mono uppercase tracking-wider text-xs mb-2">
                INDUSTRY
              </label>
              <Select
                value={filterIndustry}
                onChange={(e) => setFilterIndustry(e.target.value)}
                options={[
                  { value: 'all', label: 'All Industries' },
                  ...industries.map((ind) => ({ value: ind, label: ind })),
                ]}
              />
            </div>
            <div>
              <label className="block text-white font-mono uppercase tracking-wider text-xs mb-2">
                STATUS
              </label>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                options={[
                  { value: 'all', label: 'All Statuses' },
                  { value: 'open', label: 'Open' },
                  { value: 'in-progress', label: 'In Progress' },
                  { value: 'closed', label: 'Closed' },
                ]}
              />
            </div>
            <div className="flex items-end">
              <Button
                variant="ghost"
                onClick={handleResetFilters}
                className="w-full font-mono uppercase tracking-wider"
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Results Count */}
      <div className="mb-4 text-gray-400 font-mono text-sm">
        Showing {paginatedProjects.length} of {filteredProjects.length} projects
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <Card>
          <p className="text-gray-400 text-center py-8">
            {projects.length === 0
              ? 'No projects available at the moment.'
              : 'No projects match your filters. Try adjusting your search criteria.'}
          </p>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {paginatedProjects.map((project) => (
              <Card
                key={project.id}
                variant="elevated"
                className="hover:border-primary-blue/50 transition-colors cursor-pointer"
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <Badge variant={getUrgencyColor(project.urgency)}>{project.urgency}</Badge>
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
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/projects/${project.id}`);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-white font-mono px-4">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

