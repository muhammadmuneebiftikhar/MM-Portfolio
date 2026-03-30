'use client';

import { motion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface SkewContainerProps {
  children: ReactNode;
}

export default function SkewContainer({ children }: SkewContainerProps) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Create a spring-smoothed version of the velocity
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Transform velocity into a skew value (max +/- 5 degrees)
  const skew = useTransform(smoothVelocity, [-2000, 2000], [-5, 5]);

  return (
    <motion.div style={{ skewY: skew }} className="origin-center">
      {children}
    </motion.div>
  );
}
