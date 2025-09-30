import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage?: number;
  renderTime: number;
}

export function usePerformanceMonitor(onMetricsUpdate?: (metrics: PerformanceMetrics) => void) {
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const fpsRef = useRef(0);
  const renderStartTime = useRef(0);

  useEffect(() => {
    let animationId: number;

    const measurePerformance = () => {
      const now = performance.now();
      frameCount.current++;

      // Calculate FPS every second
      if (now - lastTime.current >= 1000) {
        fpsRef.current = Math.round((frameCount.current * 1000) / (now - lastTime.current));
        frameCount.current = 0;
        lastTime.current = now;

        // Get memory usage if available
        const memoryUsage = (performance as any).memory?.usedJSHeapSize;
        
        const metrics: PerformanceMetrics = {
          fps: fpsRef.current,
          memoryUsage: memoryUsage ? Math.round(memoryUsage / 1024 / 1024) : undefined,
          renderTime: now - renderStartTime.current
        };

        onMetricsUpdate?.(metrics);

        // Log performance warnings
        if (fpsRef.current < 30) {
          console.warn(`Low FPS detected: ${fpsRef.current}fps`);
        }
        
        if (memoryUsage && memoryUsage > 100 * 1024 * 1024) { // 100MB
          console.warn(`High memory usage: ${Math.round(memoryUsage / 1024 / 1024)}MB`);
        }
      }

      renderStartTime.current = now;
      animationId = requestAnimationFrame(measurePerformance);
    };

    measurePerformance();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [onMetricsUpdate]);

  return { fps: fpsRef.current };
}

// Performance optimization utilities
export const performanceUtils = {
  // Debounce function for expensive operations
  debounce: <T extends (...args: any[]) => any>(func: T, wait: number): T => {
    let timeout: number;
    return ((...args: any[]) => {
      clearTimeout(timeout);
      timeout = window.setTimeout(() => func.apply(null, args), wait);
    }) as T;
  },

  // Throttle function for frequent events
  throttle: <T extends (...args: any[]) => any>(func: T, limit: number): T => {
    let inThrottle: boolean;
    return ((...args: any[]) => {
      if (!inThrottle) {
        func.apply(null, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }) as T;
  },

  // Check if user prefers reduced motion
  prefersReducedMotion: (): boolean => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Get device performance tier
  getPerformanceTier: (): 'low' | 'medium' | 'high' => {
    const memory = (navigator as any).deviceMemory;
    const cores = navigator.hardwareConcurrency;
    
    if (memory && memory < 4) return 'low';
    if (cores && cores < 4) return 'low';
    if (memory && memory >= 8 && cores && cores >= 8) return 'high';
    return 'medium';
  }
};
