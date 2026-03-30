'use client';

import { Canvas } from '@react-three/fiber';
import { Preload, ScrollControls, Scroll } from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';
import MorphingSphere from './MorphingSphere';

export default function BackgroundScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#ff6d00" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#ff0000" />

          <MorphingSphere />

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
