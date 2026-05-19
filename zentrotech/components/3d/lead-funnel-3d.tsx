"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

// A 3D "lead funnel" visualization for the /services index hero. Abstract,
// minimal, business-relevant — small spheres flow downward through three
// stacked rings (top of funnel → middle → conversion), looping. Single
// indigo accent. Low poly count, single canvas. Aria-hidden so it's pure
// decoration; content carries the page.

const TOP_R = 1.6;
const MID_R = 1.0;
const BOT_R = 0.5;
const TOP_Y = 1.6;
const MID_Y = 0.0;
const BOT_Y = -1.6;
const SPEED = 0.4;

interface Lead {
  ring: number; // 0=top, 1=mid, 2=bot
  angle: number;
  progress: number; // 0..1 for vertical descent
  jitter: number;
}

function FunnelRings() {
  // Three torus rings stacked, narrowing. Each rotates slowly on its own
  // axis — gives quiet life without dominating.
  const top = useRef<THREE.Mesh>(null);
  const mid = useRef<THREE.Mesh>(null);
  const bot = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (top.current) top.current.rotation.z = t * 0.1;
    if (mid.current) mid.current.rotation.z = -t * 0.15;
    if (bot.current) bot.current.rotation.z = t * 0.2;
  });

  return (
    <>
      <mesh ref={top} position={[0, TOP_Y, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[TOP_R, 0.04, 12, 80]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.6} />
      </mesh>
      <mesh ref={mid} position={[0, MID_Y, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[MID_R, 0.04, 12, 64]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.7} />
      </mesh>
      <mesh ref={bot} position={[0, BOT_Y, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[BOT_R, 0.04, 12, 48]} />
        <meshBasicMaterial color="#a5b4fc" transparent opacity={0.85} />
      </mesh>
    </>
  );
}

function LeadParticles() {
  // 24 small spheres ("leads") looping from the top ring down to the bottom.
  // Each sphere holds an angle around the funnel axis, descends with a
  // speed-modulated by ring radius, and resets to the top with a phase
  // jitter so they don't sync.
  const groupRef = useRef<THREE.Group>(null);
  const leads = useMemo<Lead[]>(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        ring: 0,
        angle: (i / 24) * Math.PI * 2,
        progress: i / 24,
        jitter: Math.random() * 0.4,
      })),
    []
  );

  // Pre-allocated dummy for instanced positioning — cheaper than mounting
  // 24 mesh nodes and updating each transform every frame.
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useFrame((state, dt) => {
    if (!meshRef.current) return;
    for (let i = 0; i < leads.length; i++) {
      const l = leads[i];
      l.progress += dt * SPEED * (1 + l.jitter);
      if (l.progress > 3) l.progress -= 3;

      let y: number;
      let r: number;
      if (l.progress < 1) {
        y = THREE.MathUtils.lerp(TOP_Y, MID_Y, l.progress);
        r = THREE.MathUtils.lerp(TOP_R, MID_R, l.progress);
      } else if (l.progress < 2) {
        y = THREE.MathUtils.lerp(MID_Y, BOT_Y, l.progress - 1);
        r = THREE.MathUtils.lerp(MID_R, BOT_R, l.progress - 1);
      } else {
        // Brief pause at the conversion outlet, then off-screen for reset.
        y = BOT_Y - (l.progress - 2) * 0.6;
        r = BOT_R * (1 - (l.progress - 2) * 0.6);
      }

      const angle = l.angle + state.clock.elapsedTime * 0.3;
      dummy.position.set(Math.cos(angle) * r, y, Math.sin(angle) * r);
      dummy.scale.setScalar(0.06 + l.jitter * 0.03);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, leads.length]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </instancedMesh>
    </group>
  );
}

function ConversionGlow() {
  // Soft pulse at the funnel base — visualizes "conversion happening here."
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const s = 0.6 + Math.sin(t * 2) * 0.15;
    ref.current.scale.setScalar(s);
  });
  return (
    <mesh ref={ref} position={[0, BOT_Y - 0.4, 0]}>
      <sphereGeometry args={[0.45, 24, 24]} />
      <meshBasicMaterial color="#818cf8" transparent opacity={0.4} />
    </mesh>
  );
}

export function LeadFunnel3D({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true" tabIndex={-1}>
      <Canvas
        camera={{ position: [0, 0.2, 5], fov: 35 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <FunnelRings />
          <LeadParticles />
          <ConversionGlow />
        </Suspense>
      </Canvas>
    </div>
  );
}
