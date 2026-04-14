
import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Define intrinsic elements as any to bypass JSX type errors in environments where Three.js elements are not globally registered in JSX.IntrinsicElements
const Mesh = 'mesh' as any;
const TorusGeometry = 'torusGeometry' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const AmbientLight = 'ambientLight' as any;
const SpotLight = 'spotLight' as any;
const PointLight = 'pointLight' as any;

const AnimatedShape = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(time / 4);
    meshRef.current.rotation.y = Math.cos(time / 2);
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={1.5}>
        <MeshDistortMaterial
          color="#1e1e1e"
          attach="material"
          distort={0.4}
          speed={4}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  );
};

const LightRing = ({ color, position, rotation }: { color: string, position: [number, number, number], rotation: [number, number, number] }) => {
  return (
    // Fixed: Using aliased Mesh component to resolve JSX intrinsic element error
    <Mesh position={position} rotation={rotation}>
      {/* Fixed: Using aliased TorusGeometry component */}
      <TorusGeometry args={[2.5, 0.02, 16, 100]} />
      {/* Fixed: Using aliased MeshStandardMaterial component */}
      <MeshStandardMaterial color={color} emissive={color} emissiveIntensity={5} />
    </Mesh>
  );
};

const Hero3D: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 h-screen w-full">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        
        {/* Fixed: Using aliased light components to resolve JSX intrinsic element errors */}
        <AmbientLight intensity={0.5} />
        <SpotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <PointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0000" />
        <PointLight position={[10, 5, 5]} intensity={0.5} color="#ff00ff" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <Suspense fallback={null}>
          <AnimatedShape />
          <LightRing color="#ff0000" position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} />
          <LightRing color="#ff00ff" position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero3D;
