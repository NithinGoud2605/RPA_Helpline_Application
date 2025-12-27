import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { SkeletonLoader } from './LoadingSpinner';

export const LazyComponent = ({ 
  children, 
  fallback = null,
  className = '',
  threshold = 0.1 
}) => {
  const [elementRef, , hasIntersected] = useIntersectionObserver({ 
    threshold,
    rootMargin: '100px' 
  });

  return (
    <div ref={elementRef} className={className}>
      {hasIntersected ? (
        children
      ) : (
        fallback || <SkeletonLoader lines={3} />
      )}
    </div>
  );
};

