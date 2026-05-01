"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

const PINS = [
  { name: "Bangalore", lat: 12.9716, lng: 77.5946, primary: true },
  { name: "Dubai", lat: 25.2048, lng: 55.2708 },
  { name: "London", lat: 51.5074, lng: -0.1278 },
  { name: "New York", lat: 40.7128, lng: -74.006 },
  { name: "Singapore", lat: 1.3521, lng: 103.8198 },
];

function latLngToVec3(lat: number, lng: number, radius = 1.01) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function Globe() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.08;
  });
  return (
    <group ref={ref}>
      <Sphere args={[1, 64, 64]}>
        <meshStandardMaterial color="#1a0f2e" emissive="#6366f1" emissiveIntensity={0.05} wireframe />
      </Sphere>
      {PINS.map((pin) => {
        const pos = latLngToVec3(pin.lat, pin.lng);
        return (
          <mesh key={pin.name} position={pos}>
            <sphereGeometry args={[pin.primary ? 0.04 : 0.025, 16, 16]} />
            <meshBasicMaterial color={pin.primary ? "#ec4899" : "#06b6d4"} />
          </mesh>
        );
      })}
    </group>
  );
}

export function GlobeScene({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true" tabIndex={-1}>
      <Canvas camera={{ position: [0, 0, 2.6], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[3, 3, 3]} intensity={2} color="#6366f1" />
          <Globe />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
        </Suspense>
      </Canvas>
    </div>
  );
}
