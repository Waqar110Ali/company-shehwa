import { MeshDistortMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function FloatingSphere() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current) return;

    mesh.current.rotation.y += 0.003;

    mesh.current.position.y =
      Math.sin(clock.elapsedTime) * 0.2;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[2.2, 18]} />

      <MeshDistortMaterial
        speed={2}
        distort={0.45}
        color="#2563eb"
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
}