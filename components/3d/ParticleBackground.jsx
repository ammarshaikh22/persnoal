"use client";

import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";

function Particles() {
  const particleCount = 500;

  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 2000;
    }
    return arr;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={3}
        color="#3b82f6"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 w-full h-full z-0">
      
      {/* ✅ Canvas correct usage */}
      <Canvas camera={{ position: [0, 0, 800], fov: 75 }}>
        <Particles />
      </Canvas>

      {/* ✅ Overlay bahar hona chahiye */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
    </div>
  );
}