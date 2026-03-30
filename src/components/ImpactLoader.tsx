'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ImpactLoader() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ clipPath: 'inset(0 0 0 0)' }}
          exit={{ 
            clipPath: 'inset(50% 0 50% 0)',
            transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#080808] flex items-center justify-center overflow-hidden"
        >
          {/* Scanline Effect in Loader */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent bg-[length:100%_4px] pointer-events-none" />
          
          <div className="relative flex flex-col items-center">
            {/* Main Logo Text */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-6xl md:text-8xl font-black tracking-tighter mb-4"
            >
              MU<span className="text-orange">.</span>
            </motion.div>
            
            {/* Progress Information */}
            <div className="flex flex-col items-center w-64">
              <div className="flex justify-between w-full mb-2 text-[10px] tracking-[0.3em] uppercase opacity-40 font-mono">
                <span>Loading Experience</span>
                <span>{progress}%</span>
              </div>
              
              {/* Progress Bar Container */}
              <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-orange"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: progress > 10 ? 0.3 : 0 }}
                className="mt-4 text-[8px] tracking-[0.5em] uppercase font-mono"
              >
                Full-Stack Developer
              </motion.div>
            </div>
          </div>

          {/* Corner Accents */}
          <div className="absolute top-10 left-10 w-8 h-8 border-t border-l border-orange/30" />
          <div className="absolute top-10 right-10 w-8 h-8 border-t border-r border-orange/30" />
          <div className="absolute bottom-10 left-10 w-8 h-8 border-b border-l border-orange/30" />
          <div className="absolute bottom-10 right-10 w-8 h-8 border-b border-r border-orange/30" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
