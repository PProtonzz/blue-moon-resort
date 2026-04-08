import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sparkles, MeshReflectorMaterial, Float, useTexture, Trail } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

// Camera Rig for subtle parallax effect
const CameraRig = () => {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();

  useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, 2 + mouse.y * 1, 8), 0.05);
    camera.lookAt(0, 2, 0);
  });
  
  return null;
};

// Realistic textured Moon (Shadowless & Perfect Circle)
const Moon = () => {
  const moonRef = useRef();

  // Load realistic moon diffuse map
  const [colorMap] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg'
  ]);

  useFrame((state) => {
    if (moonRef.current) {
      moonRef.current.rotation.y = state.clock.elapsedTime * 0.04;
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.1}>
      <mesh ref={moonRef} position={[6.5, 2.5, -6]}>
        <sphereGeometry args={[3.2, 128, 128]} />
        {/* Shadowless Blue Moon */}
        <meshBasicMaterial 
          map={colorMap}
          color="#93c5fd" 
          toneMapped={false}
        />
      </mesh>
    </Float>
  );
};

// Custom Hyper-Dense Starfield using Points for better randomness
const StarField = ({ count = 60000 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      // Spherical distribution with random depth
      const r = 100 + Math.random() * 150;
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = 2 * Math.PI * Math.random();
      
      p[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      p[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      p[i * 3 + 2] = r * Math.cos(theta);

      // Random space colors for depth (Pure White, Blueish, Pale Gold)
      const type = Math.random();
      if (type > 0.8) color.set('#93c5fd');
      else if (type > 0.7) color.set('#fef08a');
      else color.set('#ffffff');
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { p, colors };
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={points.p.length / 3} 
          array={points.p} 
          itemSize={3} 
        />
        <bufferAttribute 
          attach="attributes-color" 
          count={points.colors.length / 3} 
          array={points.colors} 
          itemSize={3} 
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.15} 
        vertexColors 
        transparent 
        opacity={0.8} 
        sizeAttenuation={true} 
      />
    </points>
  );
};

// Shooting Star Component (Randomized)
const ShootingStar = () => {
  const ref = useRef();
  const [active, setActive] = useState(false);
  const startTime = useRef(0);
  const velocity = useRef(new THREE.Vector3());
  const duration = 0.6; 

  const spawnStar = () => {
    if (active || !ref.current) return;
    
    // Pick side to spawn from
    const side = Math.floor(Math.random() * 3);
    let start = new THREE.Vector3();
    let target = new THREE.Vector3();

    if (side === 0) { // Top
      start.set(Math.random() * 20 - 10, 15, -10);
      target.set(start.x + (Math.random() * 10 - 5), -15, -10);
    } else if (side === 1) { // Left
      start.set(-20, Math.random() * 15, -10);
      target.set(20, start.y - (Math.random() * 5), -10);
    } else { // Right
      start.set(20, Math.random() * 15, -10);
      target.set(-20, start.y - (Math.random() * 5), -10);
    }
    
    ref.current.position.copy(start);
    velocity.current.subVectors(target, start).normalize().multiplyScalar(45); 
    
    startTime.current = performance.now() / 1000;
    setActive(true);
  };

  useEffect(() => {
    const timeout = setTimeout(spawnStar, 3000 + Math.random() * 4000);
    return () => clearTimeout(timeout);
  }, [active]);

  useFrame((state, delta) => {
    if (!active || !ref.current) return;
    
    const elapsed = state.clock.elapsedTime - startTime.current;
    if (elapsed > duration) {
      setActive(false);
      return;
    }

    ref.current.position.addScaledVector(velocity.current, delta);
  });

  return (
    <Trail
      width={0.4}
      length={14}
      color={new THREE.Color('#ffffff')}
      attenuation={(t) => t * t}
    >
      <mesh ref={ref} visible={active}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </Trail>
  );
};

const Scene = () => {
  return (
    <>
      <color attach="background" args={['#000103']} />
      {/* Fog distance pushed way out to ensure background stars are bright */}
      <fog attach="fog" args={['#000103', 10, 180]} />

      <ambientLight intensity={0.6} color="#ffffff" />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />

      <Moon />
      <ShootingStar />

      {/* Hyper-Dense Particle Systems */}
      <StarField count={80000} />
      <Sparkles count={2000} size={1.2} color="#ffffff" position={[0, -2, 0]} scale={[100, 60, 40]} speed={0.4} opacity={0.6} />

      {/* Reflective Ground Plane (Lowered and expanded) */}
      <mesh position={[0, -8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[400, 400]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={100}
          roughness={1}
          depthScale={1.5}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#000103"
          metalness={0.9}
          mirror={1}
        />
      </mesh>

      <CameraRig />

      <EffectComposer disableNormalPass multisampling={4}>
        <Bloom luminanceThreshold={0.8} mipmapBlur intensity={1.5} radius={0.6} />
        <Vignette eskil={false} offset={0.1} darkness={1.3} />
      </EffectComposer>
    </>
  );
};

export default Scene;
