import { Suspense, useEffect } from 'react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import AestheticBackground from './components/AestheticBackground';
import LoadingSpinner from './components/LoadingSpinner';
import { 
  LazyHero, 
  LazyAbout, 
  LazyEducation, 
  LazySkills, 
  LazyProjects, 
  LazyContributionGraph, 
  LazyContact, 
  LazyFooter,
  preloadCriticalComponents,
  preloadRemainingComponents
} from './components/LazyComponents';

function App() {
  useEffect(() => {
    // Preload critical components immediately
    preloadCriticalComponents();
    
    // Preload remaining components after a short delay
    const timer = setTimeout(() => {
      preloadRemainingComponents();
    }, 1000);

    // Preload on user interaction
    const handleUserInteraction = () => {
      preloadRemainingComponents();
      document.removeEventListener('mousedown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };

    document.addEventListener('mousedown', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  return (
    <>
      <AestheticBackground />
      <CustomCursor />
      <div className="relative min-h-screen overflow-x-hidden">
        <Navbar />
        
        <Suspense fallback={<LoadingSpinner />}>
          <LazyHero />
        </Suspense>
        
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" /></div>}>
          <LazyAbout />
        </Suspense>
        
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" /></div>}>
          <LazyEducation />
        </Suspense>
        
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" /></div>}>
          <LazySkills />
        </Suspense>
        
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" /></div>}>
          <LazyContributionGraph />
        </Suspense>
        
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" /></div>}>
          <LazyProjects />
        </Suspense>
        
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" /></div>}>
          <LazyContact />
        </Suspense>
        
        <Suspense fallback={<div className="h-20 flex items-center justify-center"><div className="w-4 h-4 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" /></div>}>
          <LazyFooter />
        </Suspense>
      </div>
    </>
  );
}

export default App;
