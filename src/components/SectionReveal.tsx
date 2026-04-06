'use client';

import { ReactNode, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export default function SectionReveal({ children, className, delay = 0, id }: SectionRevealProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      const elements = gsap.utils.toArray(container.current.children);

      gsap.set(elements, {
        y: 100,
        opacity: 0,
      });

      ScrollTrigger.create({
        trigger: container.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
        animation: gsap.to(elements, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          delay: delay,
          ease: 'power3.out',
        }),
      });
    },
    { scope: container }
  );

  return (
    <div id={id} ref={container} className={className}>
      {children}
    </div>
  );
}
