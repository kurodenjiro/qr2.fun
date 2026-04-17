"use client";

import { Suspense, useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { easing } from "maath";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Center,
  Decal,
  Environment,
  RandomizedLight,
  AccumulativeShadows,
  useGLTF,
  useTexture,
} from "@react-three/drei";

type TShirtPreviewStageProps = {
  type: "t-shirt" | "hoodie";
  baseMockupSrc: string;
  artworkSrc?: string | null;
  fallbackArtworkSrc?: string | null;
  profileImageUrl?: string | null;
  title?: string;
  subtitle?: string;
  compact?: boolean;
  showMetadata?: boolean;
  className?: string;
};

type ShirtGLTF = {
  nodes: {
    T_Shirt_male: {
      geometry: THREE.BufferGeometry;
    };
  };
  materials: {
    lambert1: THREE.MeshLambertMaterial;
  };
};

const shirtColorByType: Record<TShirtPreviewStageProps["type"], string> = {
  "t-shirt": "#d9d2c6",
  hoodie: "#232830",
};

const chestPrintLayout: Record<
  TShirtPreviewStageProps["type"],
  {
    position: [number, number, number];
    scale: number;
  }
> = {
  "t-shirt": {
    position: [0, 0.03, 0.15],
    scale: 0.28,
  },
  hoodie: {
    position: [0, 0.02, 0.15],
    scale: 0.31,
  },
};

function ShirtModel({
  type,
  artworkSrc,
  fallbackArtworkSrc,
}: Pick<TShirtPreviewStageProps, "type" | "artworkSrc" | "fallbackArtworkSrc">) {
  const { nodes, materials } = useGLTF("/shirt_baked.glb") as unknown as ShirtGLTF;
  const artworkTexture = useTexture(artworkSrc || fallbackArtworkSrc || "/images/dna/example-reference.jpg");
  const shirtColor = shirtColorByType[type];
  const shirtMaterial = useMemo(() => materials.lambert1.clone(), [materials.lambert1]);
  const chestPrint = chestPrintLayout[type];

  useFrame((_, delta) => {
    easing.dampC(shirtMaterial.color, shirtColor, 0.25, delta);
  });

  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={shirtMaterial}
        material-roughness={1}
        scale={2}
      >
        {(artworkSrc || fallbackArtworkSrc) && (
          <Decal
            position={chestPrint.position}
            rotation={[0, 0, 0]}
            scale={chestPrint.scale}
            map={artworkTexture}
            depthTest={false}
          />
        )}
      </mesh>
    </group>
  );
}

function CameraRig({ children, compact = false }: { children: ReactNode; compact?: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const isMobile = window.innerWidth <= 600;
    const targetPosition: [number, number, number] = compact
      ? isMobile
        ? [0, 0.12, 5.0]
        : [0, 0.06, 4.5]
      : isMobile
        ? [0, 0.05, 4.5]
        : [0, 0.0, 4.0];

    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    if (group.current) {
      easing.dampE(
        group.current.rotation,
        [state.pointer.y / 10, -state.pointer.x / 3.5, 0],
        0.2,
        delta,
      );
    }
  });

  return <group ref={group}>{children}</group>;
}

function Scene({
  type,
  artworkSrc,
  fallbackArtworkSrc,
  compact,
}: Pick<
  TShirtPreviewStageProps,
  "type" | "artworkSrc" | "fallbackArtworkSrc" | "compact"
>) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true, antialias: true }}
      dpr={[1, 1.75]}
      className="h-full w-full"
    >
      <ambientLight intensity={0.6} />
      <Environment preset="city" background={false} />

      <Suspense fallback={null}>
        <CameraRig compact={compact}>
          <AccumulativeShadows
            temporal
            frames={60}
            alphaTest={0.85}
            scale={10}
            position={[0, -1.25, -0.14]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <RandomizedLight amount={4} radius={9} intensity={0.55} ambient={0.25} position={[5, 5, -10]} />
            <RandomizedLight amount={4} radius={5} intensity={0.25} ambient={0.55} position={[-5, 5, -9]} />
          </AccumulativeShadows>

          <Center>
            <group
              position={compact ? [0, -0.36, 0] : [0, -0.25, 0]}
              rotation={[0, -0.1, 0]}
              scale={compact ? 0.65 : 0.8}
            >
              <ShirtModel
                type={type}
                artworkSrc={artworkSrc}
                fallbackArtworkSrc={fallbackArtworkSrc}
              />
            </group>
          </Center>
        </CameraRig>
      </Suspense>
    </Canvas>
  );
}

export default function TShirtPreviewStage({
  type,
  artworkSrc,
  fallbackArtworkSrc,
  title = "3D Preview",
  subtitle = "three.js shirt stage",
  compact = false,
  showMetadata = true,
  className = "",
}: TShirtPreviewStageProps) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#05070b] shadow-[0_30px_120px_rgba(0,0,0,0.45)] ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(143,245,255,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(69,107,255,0.16),_transparent_34%),linear-gradient(180deg,_rgba(255,255,255,0.04),_transparent_26%)]" />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute inset-x-10 bottom-6 h-14 rounded-full bg-primary/20 blur-3xl" />

      <div className="absolute inset-0">
        <Scene
          type={type}
          artworkSrc={artworkSrc}
          fallbackArtworkSrc={fallbackArtworkSrc}
          compact={compact}
        />
      </div>

      <div className="pointer-events-none absolute left-4 top-4 z-20 hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-primary/90 backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-secondary shadow-[0_0_12px_rgba(69,107,255,0.8)]" />
        {title}
      </div>
      <div className="pointer-events-none absolute right-4 top-4 z-20 hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-zinc-300 backdrop-blur-md">
        {subtitle}
      </div>

      {showMetadata && (
        <div className={`pointer-events-none absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between gap-4 ${compact ? "sm:right-8" : ""}`}>
          <div className="rounded-2xl border border-white/10 bg-black/45 px-3 py-2 backdrop-blur-md">
            <div className="text-[8px] uppercase tracking-[0.32em] text-zinc-500">Render Channel</div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              Projection Locked
            </div>
          </div>
          <div className="hidden sm:block rounded-2xl border border-white/10 bg-black/45 px-3 py-2 text-right backdrop-blur-md">
            <div className="text-[8px] uppercase tracking-[0.32em] text-zinc-500">Surface</div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary">
              {type === "hoodie" ? "Heavyweight fleece" : "Technical cotton"}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

useGLTF.preload("/shirt_baked.glb");
