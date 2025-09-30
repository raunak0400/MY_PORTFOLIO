import { Suspense, useRef, useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LazySectionProps {
  component: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ReactNode;
  threshold?: number;
}

export default function LazySection({ 
  component, 
  fallback = <LoadingSpinner />, 
  threshold = 0.1 
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [LazyComponent, setLazyComponent] = useState<ComponentType<any> | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !LazyComponent) {
          setIsVisible(true);
          // Load component when it comes into view
          component().then((module) => {
            setLazyComponent(() => module.default);
          });
        }
      },
      { threshold, rootMargin: '100px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [component, threshold, LazyComponent]);

  return (
    <div ref={ref} className="min-h-screen">
      {LazyComponent ? (
        <Suspense fallback={fallback}>
          <LazyComponent />
        </Suspense>
      ) : isVisible ? (
        fallback
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
