"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Orb() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <Sphere ref={meshRef} args={[1.4, 100, 200]}>
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.55}
          speed={1.8}
          roughness={0.1}
          metalness={0.6}
          emissive="#8b5cf6"
          emissiveIntensity={0.4}
        />
      </Sphere>
    </Float>
  );
}

function CoreLight() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#ec4899" />
      <pointLight position={[-5, -5, -5]} intensity={1.5} color="#06b6d4" />
      <pointLight position={[0, 0, 5]} intensity={1} color="#8b5cf6" />
    </>
  );
}

export function NeuralOrb({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <CoreLight />
          <Stars radius={50} depth={50} count={1500} factor={3} saturation={0} fade speed={1} />
          <Orb />
        </Suspense>
      </Canvas>
    </div>
  );
}
