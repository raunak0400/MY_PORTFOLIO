import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  lazy?: boolean;
}

const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PC9zdmc+';

export default function OptimizedImage({
  src,
  alt,
  className = '',
  lazy = true,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [lazy]);

  useEffect(() => {
    if (isInView && containerRef.current) {
      const img = new Image();
      img.src = src;
      
      const handleLoad = () => setIsLoaded(true);
      const handleError = () => setError(true);
      
      img.addEventListener('load', handleLoad);
      img.addEventListener('error', handleError);
      
      return () => {
        img.removeEventListener('load', handleLoad);
        img.removeEventListener('error', handleError);
      };
    }
  }, [isInView, src]);

  return (
    <div className={`relative overflow-hidden ${className}`} ref={containerRef}>
      {/* Placeholder */}
      {!isLoaded && !error && (
        <motion.div
          className="absolute inset-0 bg-gray-800 flex items-center justify-center"
          animate={{ opacity: isInView ? [1, 0.7, 1] : 1 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
        </motion.div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">Image not available</div>
          </div>
        </div>
      )}

      {/* Actual image */}
      {isInView && (
        <motion.img
          src={error ? placeholderImage : src}
          alt={alt}
          className={`block w-full h-auto transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          loading={lazy ? 'lazy' : 'eager'}
          decoding="async"
          style={{
            contentVisibility: 'auto',
          }}
          initial={false}
          animate={{ scale: isLoaded ? 1 : 1.1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}
    </div>
  );
}
