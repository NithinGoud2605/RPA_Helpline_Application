import { useState, useEffect, useMemo, useCallback } from 'react';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useProjectStore } from '../store/projectStore';
import { useDebounce } from '../hooks/useDebounce';
import { LoadingSpinner, SkeletonLoader } from '../components/common/LoadingSpinner';
import { LazyComponent } from '../components/common/LazyComponent';
import { ProjectCard } from '../components/common/ProjectCard';

export const Projects = () => {
  const { projects, loadProjects } = useProjectStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const itemsPerPage = 6;

  // Filters are disabled to match image design - uncomment to enable
  const searchTerm = '';
  const filterUrgency = 'all';
  const filterIndustry = 'all';
  const filterStatus = 'all';
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await loadProjects();
      setLoading(false);
    };
    load();
  }, [loadProjects]);

  const getUrgencyBgColor = useCallback((urgency) => {
    switch (urgency?.toUpperCase()) {
      case 'CRITICAL':
        return 'bg-primary-red';
      case 'HIGH':
        return 'bg-accent-yellow';
      case 'MEDIUM':
        return 'bg-primary-blue';
      case 'LOW':
        return 'bg-gray-600';
      default:
        return 'bg-gray-600';
    }
  }, []);


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
    if (showAll) {
      return filteredProjects;
    }
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(start, start + itemsPerPage);
  }, [filteredProjects, currentPage, showAll]);

  // Reset to page 1 when filters change (disabled for now)
  // useEffect(() => {
  //   if (currentPage !== 1) {
  //     setTimeout(() => setCurrentPage(1), 0);
  //   }
  // }, [debouncedSearch, filterUrgency, filterIndustry, filterStatus, currentPage]);

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
      {/* Header matching the image */}
      <div className="mb-12">
        <p className="text-primary-blue font-mono uppercase tracking-wider text-sm mb-2">
          // ACTIVE ASSIGNMENTS
        </p>
        <h1 className="text-6xl font-black text-white mb-4 font-display uppercase tracking-tight">
          <span className="text-white">MISSION</span>{' '}
          <span className="text-primary-red">BRIEFINGS</span>
        </h1>
      </div>

      {/* Optional: Collapsible Search and Filters - Hidden by default to match image */}
      {/* Uncomment to enable search/filter functionality */}
      {/* 
      <Card variant="elevated" className="mb-6">
        <div className="space-y-4">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-dark-bg border border-primary-blue/30 rounded-lg text-white placeholder-gray-500 font-mono tracking-wide focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
            />
          </div>
        </div>
      </Card>
      */}

      {/* Projects Grid - Matching image design */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedProjects.map((project) => (
              <LazyComponent
                key={project.id}
                threshold={0.1}
                fallback={<SkeletonLoader lines={5} className="h-48" />}
              >
                <ProjectCard 
                  project={project} 
                  getUrgencyBgColor={getUrgencyBgColor}
                />
              </LazyComponent>
            ))}
          </div>

          {/* View All Missions Button */}
          {!showAll && filteredProjects.length > itemsPerPage && (
            <div className="text-center mb-6">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => setShowAll(true)}
                className="font-mono uppercase tracking-wider border border-primary-blue/30 hover:border-primary-blue"
              >
                VIEW ALL MISSIONS →
              </Button>
            </div>
          )}

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

