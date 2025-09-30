import { lazy } from 'react';

// Lazy load all sections for better performance
export const LazyHero = lazy(() => import('../sections/Hero'));
export const LazyAbout = lazy(() => import('../sections/About'));
export const LazyEducation = lazy(() => import('../sections/Education'));
export const LazySkills = lazy(() => import('../sections/Skills'));
export const LazyProjects = lazy(() => import('../sections/Projects'));
export const LazyContributionGraph = lazy(() => import('../sections/ContributionGraph'));
export const LazyContact = lazy(() => import('../sections/Contact'));
export const LazyFooter = lazy(() => import('../components/Footer'));

// Preload critical components
export const preloadCriticalComponents = () => {
  // Preload Hero and About sections as they're above the fold
  import('../sections/Hero');
  import('../sections/About');
};

// Preload remaining components on user interaction
export const preloadRemainingComponents = () => {
  import('../sections/Education');
  import('../sections/Skills');
  import('../sections/Projects');
  import('../sections/ContributionGraph');
  import('../sections/Contact');
  import('../components/Footer');
};
