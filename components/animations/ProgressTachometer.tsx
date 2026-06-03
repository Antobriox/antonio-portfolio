"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import CountUp from "react-countup";
import { useMemo, useRef } from "react";
import type { Group } from "three";

import { useScrollProgress } from "@/hooks/use-scroll-progress";

const START_ANGLE = 2.25;
const SWEEP_ANGLE = 4.5;

function angleForProgress(progress: number) {
  return START_ANGLE - progress * SWEEP_ANGLE;
}

function Needle({ progress }: { progress: number }) {
  const group = useRef<Group>(null);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.z = angleForProgress(progress);
    }
  });

  return (
    <group ref={group}>
      <mesh position={[0, 0.68, 0]}>
        <boxGeometry args={[0.035, 1.35, 0.035]} />
        <meshStandardMaterial color="#DC2626" emissive="#DC2626" emissiveIntensity={0.9} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshStandardMaterial color="#F5F5F5" emissive="#F59E0B" emissiveIntensity={0.25} />
      </mesh>
    </group>
  );
}

function Dial({ progress }: { progress: number }) {
  const ticks = useMemo(() => Array.from({ length: 18 }, (_, index) => index), []);

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.16}>
      <ambientLight intensity={1.1} />
      <pointLight position={[0, 0, 4]} intensity={2.2} color="#F59E0B" />
      <group rotation={[0, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.45, 0.035, 12, 96, Math.PI * 1.45]} />
          <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.5} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[1.62, 0.018, 8, 96, Math.PI * 1.3]} />
          <meshStandardMaterial color="#1E293B" emissive="#1E293B" emissiveIntensity={0.55} />
        </mesh>
        {ticks.map((tick) => {
          const progress = tick / 17;
          const angle = angleForProgress(progress);
          const isRedline = tick >= 14;

          return (
            <mesh key={tick} rotation={[0, 0, angle]} position={[-Math.sin(angle) * 1.2, Math.cos(angle) * 1.2, 0]}>
              <boxGeometry args={[0.025, tick % 3 === 0 ? 0.22 : 0.13, 0.025]} />
              <meshStandardMaterial
                color={isRedline ? "#DC2626" : "#F5F5F5"}
                emissive={isRedline ? "#DC2626" : "#F5F5F5"}
                emissiveIntensity={isRedline ? 0.55 : 0.12}
              />
            </mesh>
          );
        })}
        <Needle progress={progress} />
        <Html center position={[0, -0.72, 0]}>
          <div className="select-none text-center font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-300">
            <span className="block text-xl font-semibold text-zinc-50">
              <CountUp end={Math.round(progress * 9000)} duration={0.35} separator="." />
            </span>
            RPM
          </div>
        </Html>
      </group>
    </Float>
  );
}

export function ProgressTachometer() {
  const progress = useScrollProgress();

  return (
    <div className="fixed bottom-4 right-4 z-50 hidden h-28 w-28 rounded-lg border border-zinc-800/80 bg-zinc-950/70 shadow-[0_0_30px_rgba(245,158,11,0.12)] backdrop-blur md:block">
      <Canvas camera={{ position: [0, 0, 4], fov: 42 }}>
        <Dial progress={progress} />
      </Canvas>
    </div>
  );
}
