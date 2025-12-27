import { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { SkeletonLoader } from './LoadingSpinner';

export const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = null,
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageRef, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    if (isIntersecting && !imageSrc) {
      const img = new Image();
      img.src = src;
      img.onload = () => setImageSrc(src);
      img.onerror = () => setImageSrc(null);
    }
  }, [isIntersecting, src, imageSrc]);

  return (
    <div ref={imageRef} className={className}>
      {imageSrc ? (
        <img 
          src={imageSrc} 
          alt={alt} 
          className="w-full h-full object-cover"
          loading="lazy"
          {...props}
        />
      ) : (
        placeholder || <SkeletonLoader className="w-full h-full" />
      )}
    </div>
  );
};

