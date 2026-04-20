"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Core() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.15;
      ref.current.rotation.y += delta * 0.2;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.04;
      ref.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <Sphere ref={ref} args={[1.2, 64, 64]}>
      <MeshDistortMaterial
        color="#d97757"
        attach="material"
        distort={0.35}
        speed={1.8}
        roughness={0.2}
        metalness={0.6}
      />
    </Sphere>
  );
}

function Ring({
  radius,
  thickness,
  color,
  speed,
  axis,
}: {
  radius: number;
  thickness: number;
  color: string;
  speed: number;
  axis: "x" | "y" | "z";
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation[axis] += delta * speed;
    }
  });

  return (
    <Torus ref={ref} args={[radius, thickness, 16, 100]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        roughness={0.3}
        metalness={0.8}
      />
    </Torus>
  );
}

function Particles({ count = 60 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.5 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
      ref.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#f1a377"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#fff5ec" />
      <directionalLight position={[-5, -3, 3]} intensity={0.5} color="#f1a377" />
      <pointLight position={[0, 0, 3]} intensity={1} color="#d97757" />

      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <Core />
      </Float>

      <Ring radius={1.8} thickness={0.02} color="#d97757" speed={0.4} axis="x" />
      <Ring radius={2.1} thickness={0.015} color="#ea8657" speed={-0.3} axis="y" />
      <Ring radius={2.4} thickness={0.012} color="#f1a377" speed={0.25} axis="z" />

      <Particles count={80} />
    </Canvas>
  );
}
