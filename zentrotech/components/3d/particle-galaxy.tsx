"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

function makePositions(count: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const r = 5 + Math.random() * 8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

function Particles({ count = 5000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  // Lazy useState initializer keeps Math.random() out of render. React 19's
  // `react-hooks/purity` flags Math.random in useMemo because Strict-mode
  // re-renders would yield two different clouds; lazy init runs exactly once.
  const [positions] = useState(() => makePositions(count));

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.04;
    ref.current.rotation.x = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#a78bfa" transparent opacity={0.7} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

export function ParticleGalaxy({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true" tabIndex={-1}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
        <Particles />
      </Canvas>
    </div>
  );
}
