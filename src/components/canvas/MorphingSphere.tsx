'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural Shader for Morphing Particles
const vertexShader = `
  uniform float uTime;
  uniform float uDistortion;
  uniform vec2 uMouse;
  varying vec3 vColor;
  
  // Simplex Noise 
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) { 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i); 
    vec4 p = permute( permute( permute( 
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 0.142857142857; 
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z); 
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                   dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    float noise = snoise(position + uTime * 0.2);
    vec3 newPosition = position + normal * noise * uDistortion;
    
    // Mouse Interaction: Magnetic liquid effect
    vec3 mousePos = vec3(uMouse.x * 4.5, uMouse.y * 4.5, 0.0);
    float distToMouse = distance(position, mousePos);
    
    // Smooth magnetic influence
    float mouseInfluence = smoothstep(6.0, 0.0, distToMouse);
    
    // 1. Bulge out towards mouse
    newPosition += normal * mouseInfluence * 2.5;
    
    // 2. Liquid lean towards mouse coordinate
    newPosition += (mousePos - position) * mouseInfluence * 0.2;

    // 3. Size pulse near mouse
    float pulse = sin(uTime * 3.0 - distToMouse * 2.0) * 0.15;
    gl_PointSize = (8.0 + noise * 3.0 + mouseInfluence * 12.0 + pulse * mouseInfluence) * (1.0 / - (modelViewMatrix * vec4(newPosition, 1.0)).z);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    
    // Color shift: Vibrant Orange to Gold
    vColor = mix(vec3(1.0, 0.3, 0.0), vec3(1.0, 0.6, 0.1), noise * 0.5 + 0.5);
    
    // Mouse influence: Brighten & Add a glowing warm core
    vColor = mix(vColor, vec3(1.0, 0.95, 0.7), mouseInfluence * 0.7);
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  void main() {
    // Create soft round points
    float dist = distance(gl_PointCoord, vec2(0.5));
    if (dist > 0.5) discard;
    float alpha = 1.0 - smoothstep(0.4, 0.5, dist);
    gl_FragColor = vec4(vColor, alpha * 0.8);
  }
`;

export default function MorphingSphere() {
  const pointsRef = useRef<THREE.Points>(null!);
  const { mouse } = useThree();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uDistortion: { value: 0.8 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), []);

  // Use a dense icosahedron for high-quality particle grouping
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(3, 45); // Optimized detail level for smooth performance
    return geo;
  }, []);

  useFrame((state, delta) => {
    const { clock, mouse } = state;
    if (pointsRef.current) {
      const material = pointsRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = clock.getElapsedTime();
      
      // Use stable damping for the shader mouse uniform
      material.uniforms.uMouse.value.x = THREE.MathUtils.damp(material.uniforms.uMouse.value.x, mouse.x, 10, delta);
      material.uniforms.uMouse.value.y = THREE.MathUtils.damp(material.uniforms.uMouse.value.y, mouse.y, 10, delta);

      // Continuous gentle rotation
      pointsRef.current.rotation.y += 0.003;
      pointsRef.current.rotation.x += 0.001;

      // Stable Magnetic follow: uses damp for frame-rate independence
      const targetPulseX = mouse.x * 2.0;
      const targetPulseY = mouse.y * 2.0;
      
      pointsRef.current.position.x = THREE.MathUtils.damp(pointsRef.current.position.x, targetPulseX, 4, delta);
      pointsRef.current.position.y = THREE.MathUtils.damp(pointsRef.current.position.y, targetPulseY, 4, delta);
      
      // Damped tilt towards mouse
      pointsRef.current.rotation.x = THREE.MathUtils.damp(pointsRef.current.rotation.x, -mouse.y * 0.3, 4, delta);
      pointsRef.current.rotation.z = THREE.MathUtils.damp(pointsRef.current.rotation.z, -mouse.x * 0.2, 4, delta);
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        transparent
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
