"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

// "Agent Constellation" — a quiet 3D metaphor for the hero. A bright core
// (your business) sits at the centre, six satellite "agents" orbit at
// different radii and speeds, thin connection lines tether each agent back
// to the core, and small light pulses travel down those lines to represent
// data/leads flowing inward. Three torus rings rotate gently on the XZ
// plane for parallax. Whole group drifts on Y. Indigo + white only;
// decorative (aria-hidden), no interaction.

const SAT_COUNT = 6;
const ORBIT_RADII = [1.3, 1.5, 1.7, 1.4, 1.6, 1.8] as const;
const ORBIT_SPEEDS = [0.15, -0.12, 0.18, -0.1, 0.16, -0.14] as const;
const SAT_PHASES = [0, 1.05, 2.1, 3.14, 4.18, 5.23] as const;
const SAT_Y_AMPS = [0.08, -0.05, 0.06, -0.07, 0.04, -0.06] as const;
const SAT_Y_FREQS = [0.4, 0.5, 0.35, 0.45, 0.55, 0.42] as const;

const RING_RADII = [1.4, 1.6, 1.75] as const;
const RING_SPEEDS = [0.04, -0.05, 0.03] as const;

const PULSE_COUNT = 3;
const PULSE_DURATION = 2.0; // seconds for one pulse to traverse satellite → core

interface SatelliteState {
  x: number;
  y: number;
  z: number;
}

interface PulseState {
  satellite: number;
  startTime: number;
}

// Shared satellite positions, computed once per frame and read by lines + pulses.
const satellitePositions: SatelliteState[] = Array.from(
  { length: SAT_COUNT },
  () => ({ x: 0, y: 0, z: 0 })
);

function computeSatellitePosition(i: number, t: number, out: SatelliteState) {
  const r = ORBIT_RADII[i];
  const angle = SAT_PHASES[i] + t * ORBIT_SPEEDS[i];
  out.x = Math.cos(angle) * r;
  out.z = Math.sin(angle) * r;
  out.y = Math.sin(t * SAT_Y_FREQS[i] + SAT_PHASES[i]) * SAT_Y_AMPS[i];
}

function CoreSphere() {
  // Bright white core. Tiny breathing scale keeps it from looking dead
  // without strobing.
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.04);
  });
  return (
    <>
      <mesh ref={ref}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Soft halo around the core for that "glow" feel without post-fx. */}
      <mesh>
        <sphereGeometry args={[0.42, 16, 16]} />
        <meshBasicMaterial color="#a5b4fc" transparent opacity={0.18} />
      </mesh>
    </>
  );
}

function Satellites() {
  // 6 indigo agent nodes via instancedMesh — one geometry, one material,
  // six matrix updates per frame. Positions are written to a module-level
  // array so ConnectionLines + Pulses can read them without recomputing.
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < SAT_COUNT; i++) {
      computeSatellitePosition(i, t, satellitePositions[i]);
      const p = satellitePositions[i];
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, SAT_COUNT]}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshBasicMaterial color="#818cf8" />
    </instancedMesh>
  );
}

function OrbitRings() {
  // Three thin torus rings on the XZ plane, low-opacity indigo, slowly
  // counter-rotating for parallax depth.
  const refs = [
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
  ];
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    for (let i = 0; i < 3; i++) {
      const r = refs[i].current;
      // Rings sit on XZ plane (rotation.x = π/2). We spin them around
      // their own normal by writing to rotation.z (post-X-rotation that
      // looks like Y-spin to the viewer).
      if (r) r.rotation.z = t * RING_SPEEDS[i];
    }
  });
  return (
    <>
      {RING_RADII.map((radius, i) => (
        <mesh
          key={radius}
          ref={refs[i]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[radius, 0.008, 8, 96]} />
          <meshBasicMaterial color="#6366f1" transparent opacity={0.2} />
        </mesh>
      ))}
    </>
  );
}

function ConnectionLines() {
  // Six independent line segments, satellite → core. We hold a single
  // shared Float32Array per line and mutate its first 3 entries (the
  // satellite end) each frame. The second endpoint stays at origin.
  // Lines + geometries + material are all built once in useMemo so React
  // re-renders don't churn THREE objects.
  const groupRef = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    const material = new THREE.LineBasicMaterial({
      color: "#a5b4fc",
      transparent: true,
      opacity: 0.4,
    });
    return Array.from({ length: SAT_COUNT }, () => {
      const geom = new THREE.BufferGeometry();
      // Two vertices: [satX, satY, satZ, 0, 0, 0]
      const positions = new Float32Array(6);
      geom.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      return new THREE.Line(geom, material);
    });
  }, []);

  useFrame(() => {
    for (let i = 0; i < SAT_COUNT; i++) {
      const p = satellitePositions[i];
      const geom = lines[i].geometry as THREE.BufferGeometry;
      const attr = geom.getAttribute("position") as THREE.BufferAttribute;
      const arr = attr.array as Float32Array;
      arr[0] = p.x;
      arr[1] = p.y;
      arr[2] = p.z;
      // arr[3..5] stays (0,0,0) — the core endpoint.
      attr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {lines.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
    </group>
  );
}

function Pulses() {
  // 3 small bright dots, each riding a randomly-chosen connection line from
  // its satellite to the core. When one completes its trip it re-arms onto
  // another random satellite. Rendered as instancedMesh so the GPU draws
  // them in a single call.
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const pulses = useRef<PulseState[]>(
    Array.from({ length: PULSE_COUNT }, (_, i) => ({
      satellite: Math.floor(Math.random() * SAT_COUNT),
      // Stagger initial start times so they don't all arrive together.
      startTime: -((i * PULSE_DURATION) / PULSE_COUNT),
    }))
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < PULSE_COUNT; i++) {
      const pulse = pulses.current[i];
      let progress = (t - pulse.startTime) / PULSE_DURATION;
      if (progress >= 1) {
        // Re-arm onto a new random satellite.
        pulse.satellite = Math.floor(Math.random() * SAT_COUNT);
        pulse.startTime = t;
        progress = 0;
      }
      const sat = satellitePositions[pulse.satellite];
      // Ease-in toward core so pulses appear to "fall" into the centre.
      const eased = progress * progress;
      const k = 1 - eased; // 1 = at satellite, 0 = at core
      dummy.position.set(sat.x * k, sat.y * k, sat.z * k);
      // Slight grow as it nears the core, then snap back at reset.
      const scale = 0.7 + eased * 0.6;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PULSE_COUNT]}>
      <sphereGeometry args={[0.05, 12, 12]} />
      <meshBasicMaterial color="#ffffff" />
    </instancedMesh>
  );
}

function ConstellationGroup() {
  // Whole-scene slow Y drift gives the constellation a calm "alive" feel.
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_state, dt) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += dt * 0.05;
  });
  return (
    <group ref={groupRef}>
      <CoreSphere />
      <OrbitRings />
      <Satellites />
      <ConnectionLines />
      <Pulses />
    </group>
  );
}

export function AgentConstellation3D({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true" tabIndex={-1}>
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 35 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ConstellationGroup />
        </Suspense>
      </Canvas>
    </div>
  );
}
