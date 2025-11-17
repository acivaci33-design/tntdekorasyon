"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame, type RootState } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import { useMotionValueEvent } from "framer-motion";

type HeroThreeSceneProps = {
  scrollProgress: MotionValue<number>;
};

function FloatingTiles({ scrollProgress }: HeroThreeSceneProps) {
  const groupRef = React.useRef<THREE.Group | null>(null);
  const scrollRef = React.useRef(0);

  useMotionValueEvent(scrollProgress, "change", (latest) => {
    scrollRef.current = latest;
  });

  const tiles = React.useMemo(
    () =>
      new Array(12).fill(0).map((_, index) => {
        const row = Math.floor(index / 6);
        const col = index % 6;
        return {
          position: new THREE.Vector3((col - 2.5) * 0.9, (row - 1.5) * 0.7, (Math.random() - 0.5) * 2.5),
          rotation: new THREE.Euler(0, 0, (Math.random() - 0.5) * 0.6),
          scale: 0.65 + Math.random() * 0.35,
        };
      }),
    [],
  );

  useFrame((state: RootState) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const scroll = scrollRef.current;

    groupRef.current.rotation.x = t * 0.12 + scroll * 0.9;
    groupRef.current.rotation.y = t * 0.18;
    groupRef.current.position.y = -0.4 + scroll * 0.9;
  });

  return (
    <group ref={groupRef}>
      {tiles.map((tile, index) => (
        <mesh
          key={index}
          position={tile.position}
          rotation={tile.rotation}
          scale={tile.scale}
        >
          <boxGeometry args={[1.4, 0.08, 1.4]} />
          <meshStandardMaterial
            color={index % 3 === 0 ? "#0f766e" : index % 3 === 1 ? "#0d9488" : "#f97316"}
            roughness={0.35}
            metalness={0.35}
            emissive={index % 3 === 2 ? "#ea580c" : "#0f766e"}
            emissiveIntensity={index % 3 === 2 ? 0.45 : 0.25}
          />
        </mesh>
      ))}
    </group>
  );
}

export function HeroThreeScene({ scrollProgress }: HeroThreeSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.25]}
      camera={{ position: [0, 0, 12], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <color attach="background" args={["transparent"]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 4]} intensity={1.1} color="#f97316" />
      <directionalLight position={[-5, -6, -4]} intensity={0.7} color="#0f766e" />
      <FloatingTiles scrollProgress={scrollProgress} />
    </Canvas>
  );
}
