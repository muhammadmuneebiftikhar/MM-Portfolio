'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ count = 50 }) {
  const points = useMemo(() => {
    const p = new Array(count).fill(0).map(() => (
      new THREE.Vector3().set(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      )
    ));
    return p;
  }, [count]);

  return (
    <group>
      {points.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#ff6d00" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function CoreScene() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.cos(t / 4) / 4;
      meshRef.current.rotation.y = Math.sin(t / 4) / 4;
      meshRef.current.rotation.z = Math.sin(t / 2) / 6;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ff6d00" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />

      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.5, 1]} />
          <MeshDistortMaterial
            color="#ff6d00"
            speed={2}
            distort={0.4}
            radius={1}
            transparent
            opacity={0.3}
            wireframe
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.2, 2]} />
          <meshStandardMaterial 
            color="#ff6d00" 
            transparent 
            opacity={0.1} 
            metalness={0.9} 
            roughness={0.1} 
            emissive="#ff6d00"
            emissiveIntensity={0.5}
          />
          <Particles count={60} />
        </mesh>
      </Float>
    </>
  );
}

export default function DigitalCore() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="w-full h-full min-h-[400px] relative flex items-center justify-center border border-white/5 bg-white/[0.01]">
       <div className="text-[10px] tracking-widest uppercase opacity-20">Initializing System...</div>
    </div>
  );

  return (
    <div className="w-full h-full min-h-[400px] relative">
      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange/40 z-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange/40 z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange/40 z-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange/40 z-20 pointer-events-none" />
      
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <CoreScene />
      </Canvas>
    </div>
  );
}
