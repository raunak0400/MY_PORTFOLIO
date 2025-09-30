import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CursorState {
  isHovering: boolean;
  isClicking: boolean;
  cursorType: 'default' | 'hover' | 'click' | 'text' | 'button' | 'magnetic' | 'view' | 'drag';
  text?: string;
  color?: string;
}

interface MagneticElement {
  element: HTMLElement;
  rect: DOMRect;
  magneticStrength: number;
}

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    isHovering: false,
    isClicking: false,
    cursorType: 'default'
  });
  const [isVisible, setIsVisible] = useState(false);
  const [magneticElements, setMagneticElements] = useState<MagneticElement[]>([]);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });

  // Enhanced cursor position tracking
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const prevX = useMotionValue(0);
  const prevY = useMotionValue(0);
  
  // Multiple spring configs for different elements
  const mainSpringConfig = { damping: 25, stiffness: 600, mass: 0.5 };
  const trailSpringConfig = { damping: 35, stiffness: 200, mass: 1.2 };
  
  const cursorXSpring = useSpring(cursorX, mainSpringConfig);
  const cursorYSpring = useSpring(cursorY, mainSpringConfig);
  
  // Trail cursors
  const trailX1 = useSpring(cursorX, { ...trailSpringConfig, mass: 1.5 });
  const trailY1 = useSpring(cursorY, { ...trailSpringConfig, mass: 1.5 });
  const trailX2 = useSpring(cursorX, { ...trailSpringConfig, mass: 2.0 });
  const trailY2 = useSpring(cursorY, { ...trailSpringConfig, mass: 2.0 });

  // Magnetic attraction calculation
  const calculateMagneticForce = useCallback((mouseX: number, mouseY: number) => {
    let magneticX = mouseX;
    let magneticY = mouseY;
    let maxAttraction = 0;

    magneticElements.forEach(({ rect, magneticStrength }) => {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
      );

      if (distance < magneticStrength) {
        const attraction = (magneticStrength - distance) / magneticStrength;
        if (attraction > maxAttraction) {
          maxAttraction = attraction;
          const pullStrength = attraction * 0.3;
          magneticX = mouseX + (centerX - mouseX) * pullStrength;
          magneticY = mouseY + (centerY - mouseY) * pullStrength;
        }
      }
    });

    return { x: magneticX, y: magneticY, attraction: maxAttraction };
  }, [magneticElements]);

  useEffect(() => {
    let lastTime = 0;
    
    const updateCursor = (e: MouseEvent) => {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime;
      
      // Calculate velocity
      if (deltaTime > 0) {
        const newVelX = (e.clientX - prevX.get()) / deltaTime * 16.67; // Normalize to 60fps
        const newVelY = (e.clientY - prevY.get()) / deltaTime * 16.67;
        setVelocity({ x: newVelX, y: newVelY });
      }

      prevX.set(cursorX.get());
      prevY.set(cursorY.get());

      // Apply magnetic force
      const magnetic = calculateMagneticForce(e.clientX, e.clientY);
      cursorX.set(magnetic.x);
      cursorY.set(magnetic.y);
      
      setIsVisible(true);
      lastTime = currentTime;
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseDown = () => {
      setCursorState(prev => ({ ...prev, isClicking: true }));
    };

    const handleMouseUp = () => {
      setCursorState(prev => ({ ...prev, isClicking: false }));
    };

    // Enhanced event listeners for interactive elements
    const addHoverListeners = () => {
      // Buttons and clickable elements
      const buttons = document.querySelectorAll('button, a, [role="button"]');
      buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
          const text = button.getAttribute('data-cursor-text') || 'Click';
          const color = button.getAttribute('data-cursor-color') || '#f59e0b';
          setCursorState(prev => ({ 
            ...prev, 
            isHovering: true, 
            cursorType: 'button',
            text,
            color
          }));
        });
        button.addEventListener('mouseleave', () => {
          setCursorState(prev => ({ 
            ...prev, 
            isHovering: false, 
            cursorType: 'default',
            text: undefined,
            color: undefined
          }));
        });
      });

      // Text elements
      const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div[contenteditable], input, textarea');
      textElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          setCursorState(prev => ({ ...prev, cursorType: 'text' }));
        });
        element.addEventListener('mouseleave', () => {
          setCursorState(prev => ({ ...prev, cursorType: 'default' }));
        });
      });

      // Hover elements with enhanced interactions
      const hoverElements = document.querySelectorAll('[data-cursor-hover]');
      hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          const text = element.getAttribute('data-cursor-text') || 'View';
          setCursorState(prev => ({ 
            ...prev, 
            isHovering: true, 
            cursorType: 'hover',
            text
          }));
        });
        element.addEventListener('mouseleave', () => {
          setCursorState(prev => ({ 
            ...prev, 
            isHovering: false, 
            cursorType: 'default',
            text: undefined
          }));
        });
      });

      // Magnetic elements
      const magneticElements = document.querySelectorAll('[data-cursor-magnetic]');
      const magneticData: MagneticElement[] = [];
      
      magneticElements.forEach(element => {
        const htmlElement = element as HTMLElement;
        const strength = parseInt(htmlElement.getAttribute('data-magnetic-strength') || '100');
        const rect = htmlElement.getBoundingClientRect();
        
        magneticData.push({
          element: htmlElement,
          rect,
          magneticStrength: strength
        });

        element.addEventListener('mouseenter', () => {
          setCursorState(prev => ({ ...prev, cursorType: 'magnetic' }));
        });
        element.addEventListener('mouseleave', () => {
          setCursorState(prev => ({ ...prev, cursorType: 'default' }));
        });
      });

      setMagneticElements(magneticData);

      // View/drag elements
      const viewElements = document.querySelectorAll('[data-cursor-view]');
      viewElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          setCursorState(prev => ({ ...prev, cursorType: 'view', text: 'View' }));
        });
        element.addEventListener('mouseleave', () => {
          setCursorState(prev => ({ ...prev, cursorType: 'default', text: undefined }));
        });
      });
    };

    // Initial setup
    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Add listeners with a delay to ensure DOM is ready
    setTimeout(addHoverListeners, 100);

    // Re-add listeners when content changes (for dynamic content)
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (!isVisible) return null;

  const getCursorSize = () => {
    switch (cursorState.cursorType) {
      case 'button': return cursorState.isClicking ? 8 : 12;
      case 'text': return 2;
      case 'hover': return 16;
      case 'magnetic': return 20;
      case 'view': return 24;
      case 'drag': return 14;
      default: return 6;
    }
  };

  const getCursorColor = () => {
    if (cursorState.color) return cursorState.color;
    switch (cursorState.cursorType) {
      case 'button': return '#f59e0b';
      case 'text': return '#3b82f6';
      case 'hover': return '#8b5cf6';
      case 'magnetic': return '#ec4899';
      case 'view': return '#10b981';
      case 'drag': return '#f97316';
      default: return '#ffffff';
    }
  };

  return (
    <>
      {/* Trail Cursors */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9995]"
        style={{ x: trailX2, y: trailY2 }}
      >
        <div 
          className="w-3 h-3 rounded-full opacity-10"
          style={{
            transform: 'translate(-50%, -50%)',
            backgroundColor: getCursorColor(),
          }}
        />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9996]"
        style={{ x: trailX1, y: trailY1 }}
      >
        <div 
          className="w-4 h-4 rounded-full opacity-20"
          style={{
            transform: 'translate(-50%, -50%)',
            backgroundColor: getCursorColor(),
          }}
        />
      </motion.div>

      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: cursorXSpring, y: cursorYSpring }}
        animate={{
          scale: cursorState.isClicking ? 0.7 : 1,
          rotate: cursorState.cursorType === 'drag' ? 45 : 0,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 400 }}
      >
        <div 
          className="rounded-full border-2 transition-all duration-200"
          style={{
            width: getCursorSize(),
            height: getCursorSize(),
            borderColor: getCursorColor(),
            backgroundColor: cursorState.isHovering ? `${getCursorColor()}20` : 'transparent',
            transform: 'translate(-50%, -50%)',
            boxShadow: cursorState.isHovering ? `0 0 20px ${getCursorColor()}40` : 'none',
          }}
        />
      </motion.div>

      {/* Cursor Glow Effect */}
      {cursorState.isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{ x: cursorXSpring, y: cursorYSpring }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: cursorState.cursorType === 'magnetic' ? 4 : 2.5,
            opacity: 0.15
          }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div 
            className="w-16 h-16 rounded-full blur-xl"
            style={{
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, ${getCursorColor()}40 0%, transparent 70%)`,
            }}
          />
        </motion.div>
      )}

      {/* Cursor Text */}
      {cursorState.text && cursorState.isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9997]"
          style={{ x: cursorXSpring, y: cursorYSpring }}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div 
            className="text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-md border"
            style={{
              transform: 'translate(-50%, -200%)',
              backgroundColor: `${getCursorColor()}20`,
              borderColor: `${getCursorColor()}40`,
            }}
          >
            {cursorState.text}
          </div>
        </motion.div>
      )}

      {/* Velocity Lines */}
      {Math.abs(velocity.x) > 2 || Math.abs(velocity.y) > 2 ? (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9994]"
          style={{ x: cursorXSpring, y: cursorYSpring }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute w-8 h-0.5 rounded-full"
            style={{
              transform: `translate(-50%, -50%) rotate(${Math.atan2(velocity.y, velocity.x) * (180 / Math.PI)}deg)`,
              backgroundColor: getCursorColor(),
              opacity: Math.min(Math.abs(velocity.x + velocity.y) * 0.1, 1),
            }}
          />
        </motion.div>
      ) : null}

      {/* Click Ripple Effect */}
      {cursorState.isClicking && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9993]"
          style={{ x: cursorXSpring, y: cursorYSpring }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div 
            className="w-8 h-8 rounded-full border-2"
            style={{
              transform: 'translate(-50%, -50%)',
              borderColor: getCursorColor(),
            }}
          />
        </motion.div>
      )}
    </>
  );
}
