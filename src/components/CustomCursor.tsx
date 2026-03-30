'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hoverType, setHoverType] = useState<'none' | 'default' | 'project'>('none');

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Outer circle position (spring-based for smooth delay)
  const cursorX = useSpring(useMotionValue(0), { damping: 25, stiffness: 200 });
  const cursorY = useSpring(useMotionValue(0), { damping: 25, stiffness: 200 });

  // Inner dot position (direct mouse movement)
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);

  useEffect(() => {
    if (!mounted) return;
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      dotX.set(clientX);
      dotY.set(clientY);
      cursorX.set(clientX);
      cursorY.set(clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isProject = target.closest('#projects a');
      const isInteractive = target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('button') || target.classList.contains('interactive');

      if (isProject) {
        setHoverType('project');
      } else if (isInteractive) {
        setHoverType('default');
      } else {
        setHoverType('none');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mounted, cursorX, cursorY, dotX, dotY]);

  if (!mounted) return null;

  const isHovered = hoverType !== 'none';

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 border border-white/20 rounded-full pointer-events-none z-[10000] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 overflow-hidden"
        style={{
          x: cursorX,
          y: cursorY,
          width: hoverType === 'project' ? 80 : 40,
          height: hoverType === 'project' ? 80 : 40,
        }}
        animate={{
          scale: isHovered ? 1.2 : 1,
          backgroundColor: isHovered ? 'rgba(255, 109, 0, 0.1)' : 'transparent',
          borderColor: isHovered ? 'rgba(255, 109, 0, 0.5)' : 'rgba(255, 255, 255, 0.2)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
      >
        {hoverType === 'project' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[8px] font-black uppercase tracking-widest text-orange"
          >
            Explore
          </motion.span>
        )}
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-orange rounded-full pointer-events-none z-[10001] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: dotX,
          y: dotY,
        }}
        animate={{
          scale: isHovered ? 0 : 1,
        }}
      />
    </>
  );
}
