import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const TargetingCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth mouse follow using Framer Motion springs
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 16); // offset half of cursor width
      mouseY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // Track hovered elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive') ||
        target.closest('.interactive')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[9999] hidden md:block"
      style={{
        left: cursorX,
        top: cursorY,
      }}
    >
      {/* Outer spinning targeting ticks */}
      <motion.div
        className="w-8 h-8 rounded-full border border-dashed border-accent-blue/40 flex items-center justify-center relative"
        animate={{
          rotate: isHovered ? 180 : 360,
          scale: isHovered ? 1.5 : isClicked ? 0.8 : 1,
          borderColor: isHovered ? '#00ffd2' : '#00e5ff',
        }}
        transition={{
          rotate: { duration: isHovered ? 2 : 10, repeat: Infinity, ease: 'linear' },
          scale: { duration: 0.15 },
          borderColor: { duration: 0.2 },
        }}
      >
        {/* Core target dot */}
        <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${isHovered ? 'bg-accent-teal shadow-[0_0_8px_#00ffd2]' : 'bg-accent-blue shadow-[0_0_8px_#00e5ff]'}`} />

        {/* Reticle vertical crosshair */}
        <div className="absolute top-0 bottom-0 w-[1px] bg-accent-blue/20 scale-y-125 pointer-events-none" />
        
        {/* Reticle horizontal crosshair */}
        <div className="absolute left-0 right-0 h-[1px] bg-accent-blue/20 scale-x-125 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
};

export default TargetingCursor;
