import { Canvas } from "@react-three/fiber";
import {
  Float,
  OrbitControls,
} from "@react-three/drei";

import FloatingSphere from "./FloatingSphere";
import Lights from "./Lights";

export default function SphereCanvas() {
  return (
    <div className="h-[600px] w-full">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <Lights />

        <Float
          speed={2}
          rotationIntensity={1.5}
          floatIntensity={2}
        >
          <FloatingSphere />
        </Float>

        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  );
}