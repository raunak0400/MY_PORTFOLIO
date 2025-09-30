import type { Variants, Transition } from 'framer-motion';

// Check if user prefers reduced motion
const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get device performance tier
const getPerformanceTier = (): 'low' | 'medium' | 'high' => {
  if (typeof window === 'undefined') return 'medium';
  
  const memory = (navigator as any).deviceMemory;
  const cores = navigator.hardwareConcurrency;
  
  if (memory && memory < 4) return 'low';
  if (cores && cores < 4) return 'low';
  if (memory && memory >= 8 && cores && cores >= 8) return 'high';
  return 'medium';
};

// Performance-aware transition configs
export const transitionConfigs: Record<'low' | 'medium' | 'high', Transition> = {
  low: {
    duration: 0.2,
    ease: 'easeOut' as const
  },
  medium: {
    duration: 0.4,
    ease: 'easeOut' as const
  },
  high: {
    duration: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94] as const
  }
};

// Adaptive motion variants
export const createAdaptiveVariants = (baseVariants: Variants): Variants => {
  const tier = getPerformanceTier();
  const reducedMotion = prefersReducedMotion();
  
  if (reducedMotion) {
    // Disable animations for users who prefer reduced motion
    return Object.keys(baseVariants).reduce((acc, key) => {
      acc[key] = { opacity: 1, scale: 1, x: 0, y: 0 };
      return acc;
    }, {} as Variants);
  }
  
  // Adjust animation complexity based on performance tier
  return Object.keys(baseVariants).reduce((acc, key) => {
    const variant = baseVariants[key];
    if (typeof variant === 'object' && variant !== null) {
      acc[key] = {
        ...variant,
        transition: {
          ...((variant as any).transition || {}),
          ...transitionConfigs[tier]
        }
      };
    } else {
      acc[key] = variant;
    }
    return acc;
  }, {} as Variants);
};

// Common optimized variants
export const fadeInVariants = createAdaptiveVariants({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
});

export const slideInVariants = createAdaptiveVariants({
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
});

export const scaleInVariants = createAdaptiveVariants({
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
});

export const staggerContainerVariants = createAdaptiveVariants({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: getPerformanceTier() === 'low' ? 0.05 : 0.1
    }
  }
});

// Optimized spring configs
import type { Spring } from 'framer-motion';

type SpringConfig = Omit<Spring, 'type'> & { type: 'spring' };

const springConfigs: Record<'low' | 'medium' | 'high', SpringConfig> = {
  low: {
    type: 'spring',
    damping: 40,
    stiffness: 200,
    restDelta: 0.001,
    restSpeed: 10
  },
  medium: {
    type: 'spring',
    damping: 30,
    stiffness: 400,
    restDelta: 0.001,
    restSpeed: 10
  },
  high: {
    type: 'spring',
    damping: 25,
    stiffness: 700,
    restDelta: 0.001,
    restSpeed: 10
  }
};

export const getOptimizedSpring = () => {
  return springConfigs[getPerformanceTier()];
};

// Performance-aware transition configuration
export const getOptimizedTransition = (customTransition?: Transition): Transition => {
  if (customTransition) return customTransition;
  
  const performanceTier = getPerformanceTier();
  const baseTransition = transitionConfigs[performanceTier];
  
  if (performanceTier === 'low' || prefersReducedMotion()) {
    return {
      ...baseTransition,
      type: 'tween' as const,
      ease: 'linear' as const
    };
  }
  
  return baseTransition;
};
