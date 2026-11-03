import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Student } from '../types';
import { recordGameXp } from '../services/storage';

// -----------------------------------------------------------------------------
// MODULE-SCOPE PRE-ALLOCATED HELPERS (Zero per-frame GC allocations)
// -----------------------------------------------------------------------------
const _tmpVecA = new THREE.Vector3();
const _tmpVecB = new THREE.Vector3();
const _tmpVecC = new THREE.Vector3();
const _tmpCamPos = new THREE.Vector3();
const _tmpLookAt = new THREE.Vector3();
const _tmpDummy = new THREE.Object3D();
const _tmpColor = new THREE.Color();

export type GameStateMode = 'title' | 'playing' | 'paused' | 'victory' | 'gameover';
export type CameraPresetMode = 'chase' | 'tactical' | 'orbit';
export type ArenaPresetMode = 'cyber_night' | 'solar_gold' | 'studio_quartz';

interface CyberCode3DGameProps {
  student: Student | null;
  onExit: () => void;
  onXpEarned?: (xp: number) => void;
}

// -----------------------------------------------------------------------------
// PROCEDURAL WEB AUDIO SYNTHESIZER (Zero external audio files / zero 404s)
// -----------------------------------------------------------------------------
class CyberAudioSynth {
  private ctx: AudioContext | null = null;
  public muted = false;

  private ensureContext(): AudioContext | null {
    if (this.muted) return null;
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  playLaser() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(760, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.11);
    gain.gain.setValueAtTime(0.11, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  playDash() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(640, now + 0.16);
    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.17);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  }

  playCrystalCollect() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const freqs = [587.33, 880, 1174.66];
    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + idx * 0.045);
      gain.gain.setValueAtTime(0.12, now + idx * 0.045);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.045 + 0.16);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + idx * 0.045);
      osc.stop(now + idx * 0.045 + 0.17);
    });
  }

  playEnemyDestroy() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(190, now);
    osc.frequency.exponentialRampToValueAtTime(48, now + 0.22);
    gain.gain.setValueAtTime(0.16, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.23);
  }

  playPlayerDamage() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(130, now);
    osc.frequency.linearRampToValueAtTime(65, now + 0.25);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.27);
  }

  playWaveClear() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((n, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n, now + i * 0.07);
      gain.gain.setValueAtTime(0.13, now + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.25);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + i * 0.07);
      osc.stop(now + i * 0.07 + 0.26);
    });
  }
}

// -----------------------------------------------------------------------------
// PROCEDURAL CANVAS TEXTURES (100% self-contained, zero network texture loads)
// -----------------------------------------------------------------------------
function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createRadialGradient(64, 64, 6, 64, 64, 60);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0.55)');
  grad.addColorStop(0.6, 'rgba(0, 0, 0, 0.22)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createArenaFloorTexture(renderer: THREE.WebGLRenderer): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#070d19';
  ctx.fillRect(0, 0, 512, 512);

  // Subtle sub-grid
  ctx.strokeStyle = 'rgba(14, 165, 233, 0.09)';
  ctx.lineWidth = 2;
  const step = 64;
  for (let i = 0; i <= 512; i += step) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }

  // Primary tile border
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.24)';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, 508, 508);

  // Corner tech crosshairs
  ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
  ctx.fillRect(0, 0, 14, 4);
  ctx.fillRect(0, 0, 4, 14);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(24, 24);
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return tex;
}

// -----------------------------------------------------------------------------
// COMPOSITE 3–12 PART PROCEDURAL 3D MODELS (THREE.Group)
// -----------------------------------------------------------------------------

/**
 * Hero Cyber-Interceptor (10 distinct parts across 3 hierarchy levels):
 * 1. Beveled Delta Fuselage (ExtrudeGeometry)
 * 2. Translucent Physical Glass Canopy (MeshPhysicalMaterial)
 * 3 & 4. Port & Starboard Vector Thruster Nacelles (LatheGeometry)
 * 5 & 6. Swept Aero Wings (BoxGeometry)
 * 7 & 8. Twin Plasma Railguns (CylinderGeometry)
 * 9. Dorsal Stabilizer Fin & Glowing Reactor Core (OctahedronGeometry)
 * 10. Ground Contact Shadow Plane
 */
function buildHeroInterceptor(shadowTex: THREE.Texture): {
  root: THREE.Group;
  bodyTiltGroup: THREE.Group;
  coreMesh: THREE.Mesh;
  thrusterRings: THREE.Mesh[];
} {
  const root = new THREE.Group();
  const bodyTiltGroup = new THREE.Group();
  bodyTiltGroup.position.y = 0.75;
  root.add(bodyTiltGroup);

  // Materials with intentional roughness/metalness contrast
  const hullMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.78,
    roughness: 0.26,
  });
  const wingArmorMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.62,
    roughness: 0.38,
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.92,
    roughness: 0.14,
  });
  const glassCanopyMat = new THREE.MeshPhysicalMaterial({
    color: 0x38bdf8,
    metalness: 0.05,
    roughness: 0.08,
    transmission: 0.65,
    ior: 1.45,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
  });
  const neonCyanMat = new THREE.MeshStandardMaterial({
    color: 0x06b6d4,
    emissive: 0x06b6d4,
    emissiveIntensity: 1.6,
    roughness: 0.2,
    metalness: 0.1,
  });

  // Part 1: Beveled Delta Hull via ExtrudeGeometry
  const hullShape = new THREE.Shape();
  hullShape.moveTo(0, 1.55); // Nose tip
  hullShape.lineTo(0.68, 0.25);
  hullShape.lineTo(0.85, -1.05);
  hullShape.lineTo(0.35, -1.35);
  hullShape.lineTo(-0.35, -1.35);
  hullShape.lineTo(-0.85, -1.05);
  hullShape.lineTo(-0.68, 0.25);
  hullShape.closePath();

  const hullGeo = new THREE.ExtrudeGeometry(hullShape, {
    steps: 1,
    depth: 0.28,
    bevelEnabled: true,
    bevelThickness: 0.09,
    bevelSize: 0.08,
    bevelSegments: 2,
  });
  hullGeo.rotateX(Math.PI / 2);
  hullGeo.center();
  const hullMesh = new THREE.Mesh(hullGeo, hullMat);
  hullMesh.castShadow = true;
  hullMesh.receiveShadow = true;
  bodyTiltGroup.add(hullMesh);

  // Part 2: Cockpit Canopy (Physical Glass)
  const canopyGeo = new THREE.CapsuleGeometry(0.28, 0.62, 6, 12);
  canopyGeo.rotateX(Math.PI / 2);
  const canopyMesh = new THREE.Mesh(canopyGeo, glassCanopyMat);
  canopyMesh.position.set(0, 0.22, -0.08);
  canopyMesh.scale.set(1, 0.68, 1);
  bodyTiltGroup.add(canopyMesh);

  // Parts 3 & 4: Twin Vector Thruster Nacelles via LatheGeometry
  const lathePoints = [
    new THREE.Vector2(0.12, 0),
    new THREE.Vector2(0.24, 0.15),
    new THREE.Vector2(0.26, 0.65),
    new THREE.Vector2(0.21, 1.05),
    new THREE.Vector2(0.15, 1.25),
  ];
  const nacelleGeo = new THREE.LatheGeometry(lathePoints, 14);
  nacelleGeo.rotateX(Math.PI / 2);

  const leftNacelle = new THREE.Mesh(nacelleGeo, wingArmorMat);
  leftNacelle.position.set(-0.78, -0.02, 0.15);
  leftNacelle.castShadow = true;
  bodyTiltGroup.add(leftNacelle);

  const rightNacelle = new THREE.Mesh(nacelleGeo, wingArmorMat);
  rightNacelle.position.set(0.78, -0.02, 0.15);
  rightNacelle.castShadow = true;
  bodyTiltGroup.add(rightNacelle);

  // Parts 5 & 6: Swept Aero Wings
  const wingGeo = new THREE.BoxGeometry(1.15, 0.08, 0.72);
  const leftWing = new THREE.Mesh(wingGeo, wingArmorMat);
  leftWing.position.set(-1.12, 0.0, 0.35);
  leftWing.rotation.y = 0.28;
  leftWing.rotation.z = -0.08;
  leftWing.castShadow = true;
  bodyTiltGroup.add(leftWing);

  const rightWing = new THREE.Mesh(wingGeo, wingArmorMat);
  rightWing.position.set(1.12, 0.0, 0.35);
  rightWing.rotation.y = -0.28;
  rightWing.rotation.z = 0.08;
  rightWing.castShadow = true;
  bodyTiltGroup.add(rightWing);

  // Parts 7 & 8: Twin Plasma Railguns
  const gunGeo = new THREE.CylinderGeometry(0.055, 0.075, 1.15, 10);
  gunGeo.rotateX(Math.PI / 2);
  const leftGun = new THREE.Mesh(gunGeo, chromeMat);
  leftGun.position.set(-0.56, 0.06, -0.65);
  bodyTiltGroup.add(leftGun);

  const rightGun = new THREE.Mesh(gunGeo, chromeMat);
  rightGun.position.set(0.56, 0.06, -0.65);
  bodyTiltGroup.add(rightGun);

  // Part 9: Dorsal Fin + Glowing Cyan Reactor Core
  const finGeo = new THREE.BoxGeometry(0.08, 0.46, 0.68);
  const dorsalFin = new THREE.Mesh(finGeo, chromeMat);
  dorsalFin.position.set(0, 0.34, 0.62);
  dorsalFin.rotation.x = -0.25;
  bodyTiltGroup.add(dorsalFin);

  const coreGeo = new THREE.OctahedronGeometry(0.22, 0);
  const coreMesh = new THREE.Mesh(coreGeo, neonCyanMat);
  coreMesh.position.set(0, 0.28, 0.42);
  bodyTiltGroup.add(coreMesh);

  // Afterburner Glow Rings
  const ringGeo = new THREE.TorusGeometry(0.18, 0.045, 8, 16);
  const leftRing = new THREE.Mesh(ringGeo, neonCyanMat);
  leftRing.position.set(-0.78, -0.02, 1.38);
  bodyTiltGroup.add(leftRing);

  const rightRing = new THREE.Mesh(ringGeo, neonCyanMat);
  rightRing.position.set(0.78, -0.02, 1.38);
  bodyTiltGroup.add(rightRing);

  // Part 10: Bottom-Anchored Radial Contact Shadow Plane
  const shadowGeo = new THREE.PlaneGeometry(3.4, 3.4);
  shadowGeo.rotateX(-Math.PI / 2);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: shadowTex,
    transparent: true,
    opacity: 0.75,
    depthWrite: false,
  });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.position.y = 0.02;
  root.add(shadowMesh);

  return {
    root,
    bodyTiltGroup,
    coreMesh,
    thrusterRings: [leftRing, rightRing],
  };
}

/**
 * Enemy Glitch/Bug Drone (6 distinct parts):
 * 1. Armored Carapace (OctahedronGeometry)
 * 2. Spinning Hazard Ring (TorusGeometry)
 * 3. Glowing Sensor Eye (SphereGeometry)
 * 4 & 5. Twin Mandible Pincers (ConeGeometry)
 * 6. Ground Contact Shadow Plane
 */
function buildEnemyDrone(shadowTex: THREE.Texture): {
  root: THREE.Group;
  carapaceMat: THREE.MeshStandardMaterial;
  eyeMat: THREE.MeshStandardMaterial;
  ringMesh: THREE.Mesh;
} {
  const root = new THREE.Group();

  const carapaceMat = new THREE.MeshStandardMaterial({
    color: 0x3b0764,
    metalness: 0.72,
    roughness: 0.28,
    emissive: 0x000000,
    emissiveIntensity: 0,
  });

  const eyeMat = new THREE.MeshStandardMaterial({
    color: 0xf43f5e,
    emissive: 0xf43f5e,
    emissiveIntensity: 1.5,
    roughness: 0.2,
  });

  const ringMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.85,
    roughness: 0.2,
    emissive: 0xd97706,
    emissiveIntensity: 0.4,
  });

  // 1. Carapace
  const bodyMesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.75, 0), carapaceMat);
  bodyMesh.position.y = 0.95;
  bodyMesh.castShadow = true;
  root.add(bodyMesh);

  // 2. Spinning Hazard Ring
  const ringMesh = new THREE.Mesh(new THREE.TorusGeometry(0.98, 0.07, 8, 20), ringMat);
  ringMesh.position.y = 0.95;
  ringMesh.rotation.x = Math.PI / 2;
  root.add(ringMesh);

  // 3. Glowing Sensor Eye
  const eyeMesh = new THREE.Mesh(new THREE.SphereGeometry(0.26, 12, 12), eyeMat);
  eyeMesh.position.set(0, 0.95, 0.58);
  root.add(eyeMesh);

  // 4 & 5. Twin Mandible Pincers
  const pincerGeo = new THREE.ConeGeometry(0.14, 0.55, 6);
  pincerGeo.rotateX(Math.PI / 2);
  const leftPincer = new THREE.Mesh(pincerGeo, ringMat);
  leftPincer.position.set(-0.45, 0.78, 0.65);
  root.add(leftPincer);

  const rightPincer = new THREE.Mesh(pincerGeo, ringMat);
  rightPincer.position.set(0.45, 0.78, 0.65);
  root.add(rightPincer);

  // 6. Contact Shadow
  const shadowGeo = new THREE.PlaneGeometry(2.3, 2.3);
  shadowGeo.rotateX(-Math.PI / 2);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: shadowTex,
    transparent: true,
    opacity: 0.6,
    depthWrite: false,
  });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.position.y = 0.02;
  root.add(shadowMesh);

  return { root, carapaceMat, eyeMat, ringMesh };
}

/**
 * Collectible Code Crystal (4 distinct parts):
 * 1. Floating Crystal Gem (OctahedronGeometry)
 * 2. Orbital Holo Ring (TorusGeometry)
 * 3. Base Pedestal Ring (CylinderGeometry)
 * 4. Contact Shadow
 */
function buildCodeCrystal(shadowTex: THREE.Texture): {
  root: THREE.Group;
  gemMesh: THREE.Mesh;
  haloMesh: THREE.Mesh;
} {
  const root = new THREE.Group();

  const gemMat = new THREE.MeshPhysicalMaterial({
    color: 0x10b981,
    emissive: 0x059669,
    emissiveIntensity: 1.1,
    metalness: 0.15,
    roughness: 0.1,
    clearcoat: 1.0,
  });

  const haloMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x38bdf8,
    emissiveIntensity: 0.9,
    roughness: 0.25,
    metalness: 0.8,
  });

  const gemMesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.52, 0), gemMat);
  gemMesh.position.y = 1.05;
  gemMesh.scale.set(0.85, 1.35, 0.85);
  root.add(gemMesh);

  const haloMesh = new THREE.Mesh(new THREE.TorusGeometry(0.74, 0.045, 8, 20), haloMat);
  haloMesh.position.y = 1.05;
  haloMesh.rotation.x = Math.PI / 3;
  root.add(haloMesh);

  const pedestalMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.45, 0.58, 0.12, 12),
    new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.3 })
  );
  pedestalMesh.position.y = 0.06;
  root.add(pedestalMesh);

  const shadowGeo = new THREE.PlaneGeometry(1.8, 1.8);
  shadowGeo.rotateX(-Math.PI / 2);
  const shadowMesh = new THREE.Mesh(
    shadowGeo,
    new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0.55, depthWrite: false })
  );
  shadowMesh.position.y = 0.015;
  root.add(shadowMesh);

  return { root, gemMesh, haloMesh };
}

export const CyberCode3DGame: React.FC<CyberCode3DGameProps> = ({
  student,
  onExit,
  onXpEarned,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const synthRef = useRef<CyberAudioSynth | null>(null);
  if (!synthRef.current) {
    synthRef.current = new CyberAudioSynth();
  }

  // UI HUD States
  const [gameState, setGameState] = useState<GameStateMode>('title');
  const [score, setScore] = useState<number>(0);
  const [wave, setWave] = useState<number>(1);
  const [shield, setShield] = useState<number>(100);
  const [crystalsCollected, setCrystalsCollected] = useState<number>(0);
  const [earnedXpTotal, setEarnedXpTotal] = useState<number>(0);
  const [cameraPreset, setCameraPreset] = useState<CameraPresetMode>('chase');
  const [arenaPreset, setArenaPreset] = useState<ArenaPresetMode>('cyber_night');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [controlsDockOpen, setControlsDockOpen] = useState<boolean>(true);
  const [waveBanner, setWaveBanner] = useState<string | null>(null);

  // Refs synced with the 60fps simulation loop
  const gameStateRef = useRef<GameStateMode>('title');
  const cameraPresetRef = useRef<CameraPresetMode>('chase');
  const arenaPresetRef = useRef<ArenaPresetMode>('cyber_night');
  const resetTriggerRef = useRef<(() => void) | null>(null);

  const syncGameState = useCallback((next: GameStateMode) => {
    gameStateRef.current = next;
    setGameState(next);
  }, []);

  const awardStudentXp = useCallback(
    (xpAmount: number) => {
      if (xpAmount <= 0) return;
      setEarnedXpTotal((prev) => prev + xpAmount);
      if (student && student.id && student.id !== 'guest') {
        recordGameXp(student.id, 'Cyber Code 3D Arena', xpAmount);
      }
      if (onXpEarned) {
        onXpEarned(xpAmount);
      }
    },
    [student, onXpEarned]
  );

  const handleStartOrResume = useCallback(() => {
    if (gameStateRef.current === 'title' || gameStateRef.current === 'gameover' || gameStateRef.current === 'victory') {
      if (resetTriggerRef.current) {
        resetTriggerRef.current();
      }
      syncGameState('playing');
    } else if (gameStateRef.current === 'paused') {
      syncGameState('playing');
    }
  }, [syncGameState]);

  const handleToggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (synthRef.current) {
        synthRef.current.muted = next;
      }
      return next;
    });
  }, []);

  useEffect(() => {
    cameraPresetRef.current = cameraPreset;
  }, [cameraPreset]);

  useEffect(() => {
    arenaPresetRef.current = arenaPreset;
  }, [arenaPreset]);

  // Lock body scroll while in full-viewport 3D Game Shell
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Main Three.js Scene & 60fps Simulation Loop
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Renderer & Software WebGL Detection
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });

    const gl = renderer.getContext();
    const dbg = gl.getExtension('WEBGL_debug_renderer_info');
    const rendererStr = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : '';
    const isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Microsoft Basic Render Driver/i.test(rendererStr);

    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // WebGL Context Safety Listeners
    const handleContextLost = (e: Event) => {
      e.preventDefault();
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);

    // 2. Scene, Fog & Studio PMREM Environment
    const scene = new THREE.Scene();
    const skyColor = new THREE.Color(0x050b16);
    scene.background = skyColor;
    scene.fog = new THREE.FogExp2(0x050b16, 0.015);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTex = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    scene.environment = envTex;
    roomEnv.dispose();

    // 3. Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 180);
    camera.position.set(0, 9, 14);
    camera.lookAt(0, 0.8, 0);

    // 4. Studio 3-Point Lighting (Warm Key + Cool Hemisphere Fill + Rim Accent)
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x0f172a, 0.75);
    hemiLight.position.set(0, 40, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff3e0, 2.2);
    keyLight.position.set(18, 28, 16);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      const d = 28;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 75;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x06b6d4, 1.1);
    rimLight.position.set(-16, 12, -20);
    scene.add(rimLight);

    // 5. Procedural Textures & Arena Floor
    const contactShadowTex = createContactShadowTexture();
    const floorTex = createArenaFloorTexture(renderer);

    const ARENA_RADIUS = 26;
    const floorGeo = new THREE.CircleGeometry(ARENA_RADIUS + 8, 64);
    floorGeo.rotateX(-Math.PI / 2);
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTex,
      roughness: 0.45,
      metalness: 0.35,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Arena Boundary Ring
    const boundaryGeo = new THREE.RingGeometry(ARENA_RADIUS - 0.25, ARENA_RADIUS + 0.25, 64);
    boundaryGeo.rotateX(-Math.PI / 2);
    const boundaryMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
    });
    const boundaryRing = new THREE.Mesh(boundaryGeo, boundaryMat);
    boundaryRing.position.y = 0.03;
    scene.add(boundaryRing);

    // 6. InstancedMesh Perimeter Cyber Monoliths (36 instances with ±15% scale & tint variation)
    const MONOLITH_COUNT = 36;
    const monolithGeo = new THREE.CylinderGeometry(0.45, 0.72, 4.2, 6);
    monolithGeo.translate(0, 2.1, 0);
    const monolithMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.32,
      metalness: 0.75,
    });
    const monolithInstanced = new THREE.InstancedMesh(monolithGeo, monolithMat, MONOLITH_COUNT);
    monolithInstanced.castShadow = !isSoftwareGl;
    monolithInstanced.receiveShadow = !isSoftwareGl;

    for (let i = 0; i < MONOLITH_COUNT; i++) {
      const angle = (i / MONOLITH_COUNT) * Math.PI * 2;
      const dist = ARENA_RADIUS + 2.2 + (i % 2) * 1.6;
      const scaleVar = 0.85 + ((i * 37) % 30) / 100; // ±15% natural variation
      _tmpDummy.position.set(Math.cos(angle) * dist, 0, Math.sin(angle) * dist);
      _tmpDummy.rotation.set(0, angle + (i % 3) * 0.4, 0);
      _tmpDummy.scale.set(scaleVar, scaleVar * (0.9 + (i % 4) * 0.22), scaleVar);
      _tmpDummy.updateMatrix();
      monolithInstanced.setMatrixAt(i, _tmpDummy.matrix);

      _tmpColor.setHSL(0.54 + (i % 5) * 0.02, 0.65, 0.25 + (i % 3) * 0.06);
      monolithInstanced.setColorAt(i, _tmpColor);
    }
    monolithInstanced.instanceMatrix.needsUpdate = true;
    if (monolithInstanced.instanceColor) monolithInstanced.instanceColor.needsUpdate = true;
    monolithInstanced.computeBoundingSphere();
    scene.add(monolithInstanced);

    // 7. Build Hero Cyber-Interceptor (10-part composite THREE.Group)
    const hero = buildHeroInterceptor(contactShadowTex);
    scene.add(hero.root);

    // 8. Pooled Projectiles, Enemies, Crystals, and 3D Burst Particles
    interface PlasmaBolt {
      mesh: THREE.Mesh;
      vel: THREE.Vector3;
      life: number;
      active: boolean;
    }
    const boltGeo = new THREE.CapsuleGeometry(0.09, 0.55, 4, 8);
    boltGeo.rotateX(Math.PI / 2);
    const boltMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const bolts: PlasmaBolt[] = [];
    for (let i = 0; i < 24; i++) {
      const m = new THREE.Mesh(boltGeo, boltMat);
      m.visible = false;
      scene.add(m);
      bolts.push({ mesh: m, vel: new THREE.Vector3(), life: 0, active: false });
    }

    interface EnemyEntity {
      drone: ReturnType<typeof buildEnemyDrone>;
      hp: number;
      maxHp: number;
      speed: number;
      flashTimer: number;
      windupTimer: number;
      active: boolean;
    }
    const enemies: EnemyEntity[] = [];
    for (let i = 0; i < 12; i++) {
      const drone = buildEnemyDrone(contactShadowTex);
      drone.root.visible = false;
      scene.add(drone.root);
      enemies.push({
        drone,
        hp: 2,
        maxHp: 2,
        speed: 4.5,
        flashTimer: 0,
        windupTimer: 0,
        active: false,
      });
    }

    interface CrystalEntity {
      crystal: ReturnType<typeof buildCodeCrystal>;
      active: boolean;
      phase: number;
    }
    const crystals: CrystalEntity[] = [];
    for (let i = 0; i < 6; i++) {
      const c = buildCodeCrystal(contactShadowTex);
      c.root.visible = false;
      scene.add(c.root);
      crystals.push({ crystal: c, active: false, phase: i * 1.1 });
    }

    // Pooled 3D Burst Particles (28 small octahedrons)
    interface BurstParticle {
      mesh: THREE.Mesh;
      vel: THREE.Vector3;
      life: number;
      maxLife: number;
      active: boolean;
    }
    const particleGeo = new THREE.OctahedronGeometry(0.14, 0);
    const particles: BurstParticle[] = [];
    for (let i = 0; i < 28; i++) {
      const pMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const pMesh = new THREE.Mesh(particleGeo, pMat);
      pMesh.visible = false;
      scene.add(pMesh);
      particles.push({
        mesh: pMesh,
        vel: new THREE.Vector3(),
        life: 0,
        maxLife: 0.45,
        active: false,
      });
    }

    const spawnBurst = (pos: THREE.Vector3, hexColor: number, count = 8) => {
      let spawned = 0;
      for (let i = 0; i < particles.length && spawned < count; i++) {
        const p = particles[i];
        if (!p.active) {
          p.active = true;
          p.life = 0.42;
          p.maxLife = 0.42;
          p.mesh.visible = true;
          p.mesh.position.copy(pos);
          (p.mesh.material as THREE.MeshBasicMaterial).color.setHex(hexColor);
          const angle = Math.random() * Math.PI * 2;
          const spd = 3 + Math.random() * 6;
          p.vel.set(Math.cos(angle) * spd, 2 + Math.random() * 4, Math.sin(angle) * spd);
          spawned++;
        }
      }
    };

    // Simulation state variables
    const playerPos = new THREE.Vector3(0, 0, 0);
    const playerVel = new THREE.Vector3(0, 0, 0);
    let playerYaw = 0;
    let playerBank = 0;
    let fireCooldown = 0;
    let dashCooldown = 0;
    let hitstopTimer = 0;
    let cameraShake = 0;
    let currentScore = 0;
    let currentWave = 1;
    let currentShield = 100;
    let currentCrystals = 0;
    let enemiesRemainingInWave = 0;

    const spawnWave = (waveNum: number) => {
      const count = Math.min(enemies.length, 3 + waveNum * 2);
      enemiesRemainingInWave = count;
      for (let i = 0; i < enemies.length; i++) {
        const e = enemies[i];
        if (i < count) {
          const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
          const radius = ARENA_RADIUS - 3;
          e.drone.root.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
          e.drone.root.visible = true;
          e.maxHp = 2 + Math.floor(waveNum / 2);
          e.hp = e.maxHp;
          e.speed = 4.2 + waveNum * 0.55;
          e.flashTimer = 0;
          e.windupTimer = 0;
          e.active = true;
        } else {
          e.active = false;
          e.drone.root.visible = false;
        }
      }

      // Spawn collectible W3Schools code crystals
      for (let i = 0; i < crystals.length; i++) {
        const c = crystals[i];
        const ang = (i / crystals.length) * Math.PI * 2 + waveNum * 0.5;
        const r = 7 + (i % 3) * 5.5;
        c.crystal.root.position.set(Math.cos(ang) * r, 0, Math.sin(ang) * r);
        c.crystal.root.visible = true;
        c.active = true;
      }

      setWaveBanner(`TO'LQIN ${waveNum} BOSHLANDI`);
      setTimeout(() => setWaveBanner(null), 1800);
    };

    const resetSimulation = () => {
      playerPos.set(0, 0, 0);
      playerVel.set(0, 0, 0);
      playerYaw = 0;
      playerBank = 0;
      hero.root.position.set(0, 0, 0);
      hero.root.rotation.set(0, 0, 0);
      currentScore = 0;
      currentWave = 1;
      currentShield = 100;
      currentCrystals = 0;
      setScore(0);
      setWave(1);
      setShield(100);
      setCrystalsCollected(0);
      bolts.forEach((b) => {
        b.active = false;
        b.mesh.visible = false;
      });
      spawnWave(1);
    };

    resetTriggerRef.current = resetSimulation;
    spawnWave(1);

    // 9. Input Polling (Held state vs Edge-triggered justPressed + Window Blur Reset)
    const heldKeys = new Set<string>();
    const justPressed = new Set<string>();

    const onKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        if (document.activeElement?.tagName !== 'INPUT') {
          e.preventDefault();
        }
      }
      if (!heldKeys.has(e.code)) {
        justPressed.add(e.code);
      }
      heldKeys.add(e.code);

      if (e.code === 'Enter' || e.code === 'Space') {
        if (gameStateRef.current === 'title') {
          resetSimulation();
          syncGameState('playing');
        }
      }
      if (e.code === 'Escape' || e.code === 'KeyP') {
        if (gameStateRef.current === 'playing') {
          syncGameState('paused');
        } else if (gameStateRef.current === 'paused') {
          syncGameState('playing');
        }
      }
      if (e.code === 'KeyH') {
        setControlsDockOpen((prev) => !prev);
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      heldKeys.delete(e.code);
    };

    const onWindowBlur = () => {
      heldKeys.clear();
      justPressed.clear();
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onWindowBlur);

    // 10. Frame Pacing Helper (afterDraw for Software GL, rAF for Hardware GPU)
    let disposed = false;
    let rafId = 0;
    const msgChannel = new MessageChannel();

    const scheduleNextFrame = (cb: () => void) => {
      if (disposed) return;
      if (isSoftwareGl) {
        rafId = requestAnimationFrame(() => {
          msgChannel.port1.onmessage = () => {
            if (!disposed) cb();
          };
          msgChannel.port2.postMessage(null);
        });
      } else {
        rafId = requestAnimationFrame(cb);
      }
    };

    let lastTime = performance.now();
    let elapsedTotal = 0;

    const firePlasmaPair = () => {
      let fired = 0;
      const offsets = [-0.55, 0.55];
      for (let i = 0; i < bolts.length && fired < 2; i++) {
        const b = bolts[i];
        if (!b.active) {
          b.active = true;
          b.life = 1.35;
          b.mesh.visible = true;
          const sideOffset = offsets[fired];
          _tmpVecA.set(sideOffset, 0.8, -0.9).applyAxisAngle(_tmpVecB.set(0, 1, 0), playerYaw);
          b.mesh.position.copy(playerPos).add(_tmpVecA);
          b.mesh.rotation.y = playerYaw;
          b.vel.set(-Math.sin(playerYaw) * 32, 0, -Math.cos(playerYaw) * 32);
          fired++;
        }
      }
      if (fired > 0) {
        synthRef.current?.playLaser();
      }
    };

    // 11. Main 60fps Tick Loop
    const tick = () => {
      if (disposed) return;
      const now = performance.now();
      const rawDt = (now - lastTime) * 0.001;
      lastTime = now;
      const dt = Math.min(rawDt, 0.05);
      elapsedTotal += dt;

      // Update Arena Lighting Preset dynamically
      if (arenaPresetRef.current === 'cyber_night') {
        skyColor.setHex(0x050b16);
        keyLight.color.setHex(0xfff3e0);
        hemiLight.color.setHex(0x38bdf8);
      } else if (arenaPresetRef.current === 'solar_gold') {
        skyColor.setHex(0x160f09);
        keyLight.color.setHex(0xfde68a);
        hemiLight.color.setHex(0xf59e0b);
      } else {
        skyColor.setHex(0x0f172a);
        keyLight.color.setHex(0xffffff);
        hemiLight.color.setHex(0x94a3b8);
      }
      scene.background = skyColor;
      if (scene.fog instanceof THREE.FogExp2) {
        scene.fog.color.copy(skyColor);
      }

      // Animate Hero Reactor Core
      hero.coreMesh.rotation.y += dt * 2.5;
      hero.coreMesh.rotation.x += dt * 1.4;

      // Hitstop pause on heavy impact (30-60ms)
      if (hitstopTimer > 0) {
        hitstopTimer -= dt;
        renderer.render(scene, camera);
        justPressed.clear();
        scheduleNextFrame(tick);
        return;
      }

      const mode = gameStateRef.current;

      if (mode === 'title' || mode === 'paused' || mode === 'victory' || mode === 'gameover') {
        // Atmospheric Live-World Camera Pan on Title / Modal Screens
        const orbitAngle = elapsedTotal * 0.32;
        _tmpCamPos.set(Math.sin(orbitAngle) * 14, 7.5, Math.cos(orbitAngle) * 14);
        camera.position.lerp(_tmpCamPos, 0.06);
        camera.lookAt(playerPos.x, 0.9, playerPos.z);

        // Gentle idle hover for hero craft
        hero.bodyTiltGroup.position.y = 0.75 + Math.sin(elapsedTotal * 2.6) * 0.08;
        renderer.render(scene, camera);
        justPressed.clear();
        scheduleNextFrame(tick);
        return;
      }

      // ---------------- PLAYING STATE SIMULATION ----------------
      let moveX = 0;
      let moveZ = 0;
      if (heldKeys.has('KeyA') || heldKeys.has('ArrowLeft')) moveX -= 1;
      if (heldKeys.has('KeyD') || heldKeys.has('ArrowRight')) moveX += 1;
      if (heldKeys.has('KeyW') || heldKeys.has('ArrowUp')) moveZ -= 1;
      if (heldKeys.has('KeyS') || heldKeys.has('ArrowDown')) moveZ += 1;

      const isMoving = moveX !== 0 || moveZ !== 0;
      if (isMoving) {
        const len = Math.hypot(moveX, moveZ);
        moveX /= len;
        moveZ /= len;

        // Smoothly rotate craft toward movement vector
        const targetYaw = Math.atan2(-moveX, -moveZ);
        let diff = targetYaw - playerYaw;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        playerYaw += diff * Math.min(1, dt * 10);
      }

      // Dash Impulse (Shift)
      dashCooldown = Math.max(0, dashCooldown - dt);
      if ((justPressed.has('ShiftLeft') || justPressed.has('ShiftRight')) && dashCooldown <= 0) {
        dashCooldown = 1.2;
        playerVel.x += -Math.sin(playerYaw) * 20;
        playerVel.z += -Math.cos(playerYaw) * 20;
        synthRef.current?.playDash();
        spawnBurst(playerPos, 0x06b6d4, 6);
      }

      const maxSpeed = 13.5;
      playerVel.x = THREE.MathUtils.damp(playerVel.x, moveX * maxSpeed, 7.5, dt);
      playerVel.z = THREE.MathUtils.damp(playerVel.z, moveZ * maxSpeed, 7.5, dt);

      playerPos.x += playerVel.x * dt;
      playerPos.z += playerVel.z * dt;

      // Clamp to Circular Arena Boundary
      const distFromCenter = Math.hypot(playerPos.x, playerPos.z);
      if (distFromCenter > ARENA_RADIUS - 1.2) {
        const clampRatio = (ARENA_RADIUS - 1.2) / distFromCenter;
        playerPos.x *= clampRatio;
        playerPos.z *= clampRatio;
      }

      hero.root.position.copy(playerPos);
      hero.root.rotation.y = playerYaw;

      // Banking roll & pitch tilt
      playerBank = THREE.MathUtils.damp(playerBank, -moveX * 0.32, 8, dt);
      hero.bodyTiltGroup.rotation.z = playerBank;
      hero.bodyTiltGroup.rotation.x = THREE.MathUtils.damp(
        hero.bodyTiltGroup.rotation.x,
        moveZ * 0.16,
        8,
        dt
      );
      hero.bodyTiltGroup.position.y = 0.75 + Math.sin(elapsedTotal * 5) * 0.05;

      // Weapon Firing (Spacebar held or edge-triggered)
      fireCooldown = Math.max(0, fireCooldown - dt);
      if ((heldKeys.has('Space') || justPressed.has('Space')) && fireCooldown <= 0) {
        fireCooldown = 0.18;
        firePlasmaPair();
      }

      // Update Plasma Bolts
      for (let i = 0; i < bolts.length; i++) {
        const b = bolts[i];
        if (!b.active) continue;
        b.life -= dt;
        if (b.life <= 0) {
          b.active = false;
          b.mesh.visible = false;
          continue;
        }
        b.mesh.position.addScaledVector(b.vel, dt);

        // Check Bolt -> Enemy Collision
        for (let j = 0; j < enemies.length; j++) {
          const e = enemies[j];
          if (!e.active) continue;
          const dx = b.mesh.position.x - e.drone.root.position.x;
          const dz = b.mesh.position.z - e.drone.root.position.z;
          if (dx * dx + dz * dz < 1.15 * 1.15) {
            b.active = false;
            b.mesh.visible = false;
            e.hp -= 1;
            e.flashTimer = 0.12;
            e.drone.carapaceMat.emissive.setHex(0xffffff);
            e.drone.carapaceMat.emissiveIntensity = 1.2;

            if (e.hp <= 0) {
              e.active = false;
              e.drone.root.visible = false;
              enemiesRemainingInWave = Math.max(0, enemiesRemainingInWave - 1);
              currentScore += 150;
              setScore(currentScore);
              synthRef.current?.playEnemyDestroy();
              _tmpVecC.copy(e.drone.root.position).setY(1.0);
              spawnBurst(_tmpVecC, 0xf43f5e, 10);
              hitstopTimer = 0.045; // 45ms impact hitstop
              cameraShake = 0.35;
              awardStudentXp(15);

              if (enemiesRemainingInWave <= 0) {
                synthRef.current?.playWaveClear();
                awardStudentXp(40);
                if (currentWave >= 5) {
                  syncGameState('victory');
                } else {
                  currentWave += 1;
                  setWave(currentWave);
                  spawnWave(currentWave);
                }
              }
            }
            break;
          }
        }
      }

      // Update Collectible Code Crystals
      for (let i = 0; i < crystals.length; i++) {
        const c = crystals[i];
        if (!c.active) continue;
        c.crystal.gemMesh.rotation.y += dt * 2.2;
        c.crystal.haloMesh.rotation.z += dt * 1.8;
        c.crystal.gemMesh.position.y = 1.05 + Math.sin(elapsedTotal * 3 + c.phase) * 0.14;

        const dx = playerPos.x - c.crystal.root.position.x;
        const dz = playerPos.z - c.crystal.root.position.z;
        if (dx * dx + dz * dz < 1.65 * 1.65) {
          c.active = false;
          c.crystal.root.visible = false;
          currentCrystals += 1;
          currentScore += 100;
          setCrystalsCollected(currentCrystals);
          setScore(currentScore);
          synthRef.current?.playCrystalCollect();
          _tmpVecC.copy(c.crystal.root.position).setY(1.0);
          spawnBurst(_tmpVecC, 0x10b981, 8);
          awardStudentXp(10);
        }
      }

      // Update Enemy Glitch Drones + Visible Windup Telegraph
      for (let i = 0; i < enemies.length; i++) {
        const e = enemies[i];
        if (!e.active) continue;

        e.drone.ringMesh.rotation.z += dt * 3.2;

        if (e.flashTimer > 0) {
          e.flashTimer -= dt;
          if (e.flashTimer <= 0) {
            e.drone.carapaceMat.emissive.setHex(0x000000);
            e.drone.carapaceMat.emissiveIntensity = 0;
          }
        }

        const dx = playerPos.x - e.drone.root.position.x;
        const dz = playerPos.z - e.drone.root.position.z;
        const dist = Math.hypot(dx, dz);

        if (dist > 0.01) {
          // Visible windup telegraph when close to player (scale pulse + amber glow)
          if (dist < 4.2) {
            e.windupTimer += dt;
            const pulse = 1 + Math.sin(e.windupTimer * 18) * 0.12;
            e.drone.root.scale.setScalar(pulse);
            if (e.flashTimer <= 0) {
              e.drone.carapaceMat.emissive.setHex(0xf59e0b);
              e.drone.carapaceMat.emissiveIntensity = 0.7;
            }
          } else {
            e.windupTimer = 0;
            e.drone.root.scale.setScalar(1);
          }

          e.drone.root.position.x += (dx / dist) * e.speed * dt;
          e.drone.root.position.z += (dz / dist) * e.speed * dt;
          e.drone.root.rotation.y = Math.atan2(dx, dz);
        }

        // Player collision check
        if (dist < 1.45) {
          // Knockback drone slightly
          e.drone.root.position.x -= (dx / Math.max(dist, 0.1)) * 3.2;
          e.drone.root.position.z -= (dz / Math.max(dist, 0.1)) * 3.2;
          currentShield = Math.max(0, currentShield - 20);
          setShield(currentShield);
          cameraShake = 0.55;
          synthRef.current?.playPlayerDamage();
          spawnBurst(playerPos, 0xf59e0b, 8);

          if (currentShield <= 0) {
            syncGameState('gameover');
          }
        }
      }

      // Update Pooled Burst Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p.active) continue;
        p.life -= dt;
        if (p.life <= 0) {
          p.active = false;
          p.mesh.visible = false;
          continue;
        }
        p.mesh.position.addScaledVector(p.vel, dt);
        p.vel.y -= 9.8 * dt;
        const s = Math.max(0.01, p.life / p.maxLife);
        p.mesh.scale.setScalar(s);
      }

      // Camera Choreography (Chase, Tactical Top-Down, or Orbit) + Decaying Camera Shake
      const preset = cameraPresetRef.current;
      if (preset === 'chase') {
        _tmpCamPos.set(playerPos.x * 0.7, 9.5, playerPos.z + 13.5);
      } else if (preset === 'tactical') {
        _tmpCamPos.set(playerPos.x * 0.4, 21.0, playerPos.z + 7.5);
      } else {
        const ang = elapsedTotal * 0.45;
        _tmpCamPos.set(
          playerPos.x + Math.sin(ang) * 14,
          10.5,
          playerPos.z + Math.cos(ang) * 14
        );
      }

      if (cameraShake > 0) {
        cameraShake = Math.max(0, cameraShake - dt * 2.2);
        _tmpCamPos.x += (Math.random() - 0.5) * cameraShake;
        _tmpCamPos.y += (Math.random() - 0.5) * cameraShake;
      }

      camera.position.x = THREE.MathUtils.damp(camera.position.x, _tmpCamPos.x, 6, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, _tmpCamPos.y, 6, dt);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, _tmpCamPos.z, 6, dt);

      _tmpLookAt.set(playerPos.x, 0.6, playerPos.z - 1.5);
      camera.lookAt(_tmpLookAt);

      renderer.render(scene, camera);
      justPressed.clear();
      scheduleNextFrame(tick);
    };

    scheduleNextFrame(tick);

    // ResizeObserver for Responsive Viewport
    const onResize = () => {
      if (!container || disposed) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);
    window.addEventListener('resize', onResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onWindowBlur);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const m = obj as THREE.Mesh;
          m.geometry?.dispose();
          if (Array.isArray(m.material)) {
            m.material.forEach((mat) => mat.dispose());
          } else {
            m.material?.dispose();
          }
        }
      });
      contactShadowTex.dispose();
      floorTex.dispose();
      envTex.dispose();
      pmremGenerator.dispose();
      renderer.dispose();
    };
  }, [awardStudentXp, syncGameState]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0a0912] select-none">
      {/* Dedicated Isolated WebGL Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Low-Occlusion Semantic HUD Overlay Wrapper */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 sm:p-6 z-10">
        {/* TOP PERIMETER BAR: Exit + Telemetry Readouts */}
        <div className="flex items-start justify-between gap-4">
          {/* Left: Return to Academy & Pause */}
          <div className="pointer-events-auto flex items-center gap-2">
            <button
              type="button"
              onClick={onExit}
              className="duo-btn duo-btn-surface px-4 py-2 text-xs flex items-center gap-2 whitespace-nowrap"
            >
              <svg className="w-4 h-4 text-[#3ee6c4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Akademiyaga Qaytish</span>
            </button>

            {gameState === 'playing' && (
              <button
                type="button"
                onClick={() => syncGameState('paused')}
                className="duo-btn duo-btn-surface px-4 py-2 text-xs whitespace-nowrap"
              >
                Pauza (Esc)
              </button>
            )}
          </div>

          {/* Right: World-Matched Tabular Telemetry Cluster */}
          <div className="pointer-events-auto flex items-center gap-3 sm:gap-5 px-4 py-2.5 rounded-2xl bg-[#0a0912]/90 border-2 border-white/15 text-xs shadow-xl">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#ffd23f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="12 2 15 8.5 22 9.3 17 14 18.2 21 12 17.8 5.8 21 7 14 2 9.3 9 8.5 12 2" />
              </svg>
              <span className="text-white/60 font-bold">Ball:</span>
              <span className="font-mono font-black text-white tabular-nums">{score}</span>
            </div>

            <span className="text-white/20" aria-hidden="true">·</span>

            <div className="flex items-center gap-1.5">
              <span className="text-white/60 font-bold">To&apos;lqin:</span>
              <span className="font-mono font-black text-[#ff6b86] tabular-nums">{wave} / 5</span>
            </div>

            <span className="text-white/20" aria-hidden="true">·</span>

            <div className="flex items-center gap-1.5">
              <span className="text-white/60 font-bold">Kristal:</span>
              <span className="font-mono font-black text-[#3ee6c4] tabular-nums">{crystalsCollected}</span>
            </div>

            <span className="text-white/20" aria-hidden="true">·</span>

            <div className="flex items-center gap-1.5">
              <span className="text-white/60 font-bold">Qalqon:</span>
              <span
                className={`font-mono font-black tabular-nums ${
                  shield > 50 ? 'text-[#3ee6c4]' : shield > 25 ? 'text-[#ffd23f]' : 'text-[#ff5263]'
                }`}
              >
                {shield}%
              </span>
            </div>

            <span className="text-white/20 hidden sm:inline" aria-hidden="true">·</span>

            <div className="hidden sm:flex items-center gap-1">
              <span className="text-white/60 font-bold">Mukofot:</span>
              <span className="font-mono font-black text-[#ffd23f] tabular-nums">+{earnedXpTotal} XP</span>
            </div>
          </div>
        </div>

        {/* CENTER STATE OVERLAYS (Title Screen / Wave Banner / Pause / Victory / Game Over) */}
        <div className="flex-1 flex items-center justify-center">
          {waveBanner && gameState === 'playing' && (
            <div className="px-6 py-2.5 rounded-2xl bg-[#0a0912]/90 border-2 border-[#ff6b86]/50 text-[#ffd23f] font-mono text-sm font-black tracking-widest">
              {waveBanner}
            </div>
          )}

          {/* TITLE SCREEN OVER LIVE 3D WORLD */}
          {gameState === 'title' && (
            <div className="pointer-events-auto max-w-lg w-full mx-auto text-center px-6 py-8 rounded-[2rem] bg-[#0a0912]/95 border-2 border-[#ff6b86]/40 shadow-2xl space-y-5">
              <div className="flex flex-col items-center gap-3">
                <svg className="w-16 h-16 text-[#ff6b86]" viewBox="0 0 64 64" fill="none">
                  <polygon
                    points="32,4 58,20 48,56 16,56 6,20"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    fill="rgba(255,107,134,0.15)"
                  />
                  <polygon
                    points="32,14 46,28 32,50 18,28"
                    stroke="#3ee6c4"
                    strokeWidth="2"
                    fill="rgba(62,230,196,0.25)"
                  />
                  <circle cx="32" cy="30" r="4" fill="#ffd23f" />
                </svg>

                <div className="space-y-1">
                  <p className="text-xs font-mono font-black text-[#3ee6c4] tracking-widest">
                    DEVMASTER 3D WEBGL SIMULYATORI
                  </p>
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
                    Cyber Code Defender 3D
                  </h1>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Three.js PBR sahnasida 10 qismli kiber-kemani boshqaring, xato (Bug) dronlarini plazma nurlari bilan yo&apos;q qiling va kod kristallarini yig&apos;ib haqiqiy <strong className="text-[#ffd23f]">XP hamda Tangalar</strong> ishlab oling!
              </p>

              <div>
                <button
                  type="button"
                  onClick={handleStartOrResume}
                  className="duo-btn duo-btn-coral px-7 py-3.5 text-sm whitespace-nowrap"
                >
                  O&apos;yinni Boshlash (Enter / Space)
                </button>
              </div>

              <p className="text-xs font-mono text-white/60">
                WASD Harakat · Space Plazma O&apos;qi · Shift Impuls · Esc Pauza
              </p>
            </div>
          )}

          {/* PAUSE / VICTORY / GAMEOVER MODAL */}
          {(gameState === 'paused' || gameState === 'victory' || gameState === 'gameover') && (
            <div className="pointer-events-auto max-w-md w-full mx-auto text-center px-6 py-7 rounded-[2rem] bg-[#0a0912]/95 border-2 border-[#ff6b86]/40 shadow-2xl space-y-5">
              <h2 className="text-2xl font-black text-white font-display">
                {gameState === 'paused'
                  ? "O'yin To'xtatildi"
                  : gameState === 'victory'
                  ? "G'alaba! Barcha To'lqinlar Tozalandi!"
                  : 'Qalqon Quvvati Tugadi'}
              </h2>

              <div className="flex items-center justify-center gap-4 text-xs text-white/80 font-mono font-bold">
                <span>Ball: {score}</span>
                <span aria-hidden="true">·</span>
                <span>To&apos;lqin: {wave}/5</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#ffd23f]">+{earnedXpTotal} XP</span>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleStartOrResume}
                  className="duo-btn duo-btn-mint px-5 py-2.5 text-xs sm:text-sm whitespace-nowrap"
                >
                  {gameState === 'paused' ? 'Davom Etish' : 'Qaytadan Boshlash'}
                </button>
                <button
                  type="button"
                  onClick={onExit}
                  className="duo-btn duo-btn-surface px-5 py-2.5 text-xs sm:text-sm whitespace-nowrap"
                >
                  Akademiyaga Chiqish
                </button>
              </div>
            </div>
          )}
        </div>

        {/* COLLAPSIBLE BOTTOM CONTROL DOCK */}
        <div className="pointer-events-auto flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => setControlsDockOpen((prev) => !prev)}
            className="px-3.5 py-1.5 rounded-xl bg-[#0a0912]/90 border border-white/15 text-[11px] font-mono font-bold text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            {controlsDockOpen ? '▾ Boshqaruvni Yashirish (H)' : "▴ Boshqaruvni Ko'rsatish (H)"}
          </button>

          {controlsDockOpen && (
            <div className="px-4 py-2.5 rounded-2xl bg-[#0a0912]/90 border border-white/15 flex flex-wrap items-center justify-center gap-3 text-xs">
              <div className="flex items-center gap-1">
                <span className="text-white/60 font-bold mr-1">Kamera:</span>
                {(
                  [
                    { id: 'chase', label: "Ta'qib" },
                    { id: 'tactical', label: 'Yuqoridan' },
                    { id: 'orbit', label: 'Orbit' },
                  ] as Array<{ id: CameraPresetMode; label: string }>
                ).map((cam) => (
                  <button
                    key={cam.id}
                    type="button"
                    onClick={() => setCameraPreset(cam.id)}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer whitespace-nowrap ${
                      cameraPreset === cam.id
                        ? 'bg-[#ff6b86] text-[#0a0912]'
                        : 'bg-white/10 text-white/75 hover:text-white'
                    }`}
                  >
                    {cam.label}
                  </button>
                ))}
              </div>

              <span className="text-white/20" aria-hidden="true">|</span>

              <div className="flex items-center gap-1">
                <span className="text-white/60 font-bold mr-1">Muhit:</span>
                {(
                  [
                    { id: 'cyber_night', label: 'Kiber Tun' },
                    { id: 'solar_gold', label: 'Oltin Quyosh' },
                    { id: 'studio_quartz', label: 'Kvars Studiya' },
                  ] as Array<{ id: ArenaPresetMode; label: string }>
                ).map((env) => (
                  <button
                    key={env.id}
                    type="button"
                    onClick={() => setArenaPreset(env.id)}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer whitespace-nowrap ${
                      arenaPreset === env.id
                        ? 'bg-[#3ee6c4] text-[#0a0912]'
                        : 'bg-white/10 text-white/75 hover:text-white'
                    }`}
                  >
                    {env.label}
                  </button>
                ))}
              </div>

              <span className="text-white/20" aria-hidden="true">|</span>

              <button
                type="button"
                onClick={handleToggleMute}
                className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-colors cursor-pointer whitespace-nowrap"
              >
                {isMuted ? "Ovoz: O'chiq" : 'Ovoz: Yoqiq'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
