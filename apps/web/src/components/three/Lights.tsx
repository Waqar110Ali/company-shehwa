export default function Lights() {
  return (
    <>
      {/* Main ambient illumination */}
      <ambientLight intensity={1.5} />

      {/* Main directional light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={3}
      />

      {/* Secondary fill light */}
      <directionalLight
        position={[-5, 3, -5]}
        intensity={1.5}
      />

      {/* Blue accent light */}
      <pointLight
        position={[-5, -5, -5]}
        intensity={2}
        color="#2563eb"
      />

      {/* Cyan accent light */}
      <pointLight
        position={[5, 2, 3]}
        intensity={1.5}
        color="#06b6d4"
      />
    </>
  );
}