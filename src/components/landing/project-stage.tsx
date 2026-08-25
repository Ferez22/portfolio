"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group, Mesh } from "three";

/**
 * The 3D half of a project card: the screenshot floating as a lit plane with a
 * hard cartoon shadow behind it, tilting toward the pointer.
 *
 * Rendered only for the card currently in view (see ProjectDeck), so at most
 * one or two WebGL contexts exist at a time.
 */
function Plaque({ src }: { src: string }) {
  const texture = useTexture(src);
  const group = useRef<Group>(null);
  const { viewport } = useThree();

  // Fit the plane to the canvas while preserving the screenshot's aspect ratio.
  const image = texture.image as { width: number; height: number } | undefined;
  const aspect = image && image.height ? image.width / image.height : 16 / 9;
  const width = Math.min(viewport.width * 0.86, viewport.height * 0.86 * aspect);
  const height = width / aspect;

  useFrame((state, delta) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    const targetY = x * 0.35;
    const targetX = -y * 0.22;
    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(1, delta * 3);
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(1, delta * 3);
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.06;
  });

  return (
    <group ref={group}>
      {/* hard cartoon shadow */}
      <mesh position={[0.12, -0.14, -0.05]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color="#2b1d16" />
      </mesh>
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      <Frame width={width} height={height} />
    </group>
  );
}

/** Chunky outline around the plaque, drawn as four thin bars. */
function Frame({ width, height }: { width: number; height: number }) {
  const t = 0.035;
  const bars: Array<[number, number, number, number]> = [
    [0, height / 2, width + t, t],
    [0, -height / 2, width + t, t],
    [-width / 2, 0, t, height + t],
    [width / 2, 0, t, height + t],
  ];
  return (
    <>
      {bars.map(([x, y, w, h]) => (
        <mesh key={`${x}-${y}`} position={[x, y, 0.01]}>
          <planeGeometry args={[w, h]} />
          <meshBasicMaterial color="#2b1d16" />
        </mesh>
      ))}
    </>
  );
}

function Shards() {
  const group = useRef<Mesh>(null);
  useFrame((state) => {
    if (group.current) group.current.rotation.z = state.clock.elapsedTime * 0.05;
  });
  return (
    <mesh ref={group} position={[0, 0, -1.2]}>
      <torusGeometry args={[1.6, 0.02, 8, 4]} />
      <meshBasicMaterial color="#b45309" transparent opacity={0.35} />
    </mesh>
  );
}

export default function ProjectStage({ src }: { src: string }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 2.6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <Shards />
        <Plaque src={src} />
      </Suspense>
    </Canvas>
  );
}
