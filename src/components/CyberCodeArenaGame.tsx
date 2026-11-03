import React, { useEffect, useRef, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface CyberCodeArenaGameProps {
  studentName: string;
  onClose: () => void;
  onAwardRewards: (xpEarned: number, coinsEarned: number, score: number) => void;
}

type GameState = 'title' | 'playing' | 'paused' | 'victory' | 'gameover';

interface HudSnapshot {
  score: number;
  wave: number;
  maxWaves: number;
  shield: number;
  maxShield: number;
  combo: number;
  xpEarned: number;
  coinsEarned: number;
  dashReady: boolean;
  waveProgress: number;
  announcement: string;
}

interface Particle {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  label?: string;
}

interface Bullet {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  fromPlayer: boolean;
  color: string;
  damage: number;
}

type EnemyKind = 'drone' | 'sniper' | 'crusher';

interface Enemy {
  active: boolean;
  kind: EnemyKind;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hp: number;
  maxHp: number;
  state: 'move' | 'windup' | 'attack';
  timer: number;
  windupDuration: number;
  aimAngle: number;
  hitFlash: number;
  squashX: number;
  squashY: number;
  label: string;
  color: string;
}

interface CrystalPickup {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  tag: string;
  color: string;
  xpValue: number;
  coinValue: number;
  life: number;
}

const CODE_TAGS = ['<section>', 'flex: 1', 'async/await', 'const fn', 'grid', '<canvas>', 'Promise', 'useState'];

export const CyberCodeArenaGame: React.FC<CyberCodeArenaGameProps> = ({
  studentName,
  onClose,
  onAwardRewards,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<GameState>('title');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [endlessMode, setEndlessMode] = useState<boolean>(false);
  const [hud, setHud] = useState<HudSnapshot>({
    score: 0,
    wave: 1,
    maxWaves: 5,
    shield: 5,
    maxShield: 5,
    combo: 1,
    xpEarned: 0,
    coinsEarned: 0,
    dashReady: true,
    waveProgress: 0,
    announcement: '',
  });

  // Refs synced with game loop without causing React re-renders
  const gameStateRef = useRef<GameState>('title');
  const isMutedRef = useRef<boolean>(false);
  const endlessRef = useRef<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const rewardsCommittedRef = useRef<boolean>(false);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    endlessRef.current = endlessMode;
  }, [endlessMode]);

  // Procedural Web Audio Synthesizer
  const playSynth = useCallback(
    (type: 'shoot' | 'hit' | 'heavy' | 'pickup' | 'damage' | 'wave' | 'victory') => {
      if (isMutedRef.current) return;
      try {
        if (!audioCtxRef.current) {
          const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          audioCtxRef.current = new AudioCtx();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'shoot') {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(620, now);
          osc.frequency.exponentialRampToValueAtTime(190, now + 0.08);
          gain.gain.setValueAtTime(0.09, now);
          gain.gain.linearRampToValueAtTime(0.001, now + 0.08);
          osc.start(now);
          osc.stop(now + 0.085);
        } else if (type === 'hit') {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(280, now);
          osc.frequency.exponentialRampToValueAtTime(95, now + 0.07);
          gain.gain.setValueAtTime(0.11, now);
          gain.gain.linearRampToValueAtTime(0.001, now + 0.075);
          osc.start(now);
          osc.stop(now + 0.08);
        } else if (type === 'heavy') {
          osc.type = 'square';
          osc.frequency.setValueAtTime(150, now);
          osc.frequency.exponentialRampToValueAtTime(42, now + 0.22);
          gain.gain.setValueAtTime(0.18, now);
          gain.gain.linearRampToValueAtTime(0.001, now + 0.23);
          osc.start(now);
          osc.stop(now + 0.24);
        } else if (type === 'pickup') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(520, now);
          osc.frequency.exponentialRampToValueAtTime(980, now + 0.14);
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.linearRampToValueAtTime(0.001, now + 0.15);
          osc.start(now);
          osc.stop(now + 0.16);
        } else if (type === 'damage') {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(120, now);
          osc.frequency.linearRampToValueAtTime(55, now + 0.26);
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.linearRampToValueAtTime(0.001, now + 0.27);
          osc.start(now);
          osc.stop(now + 0.28);
        } else if (type === 'wave') {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(330, now);
          osc.frequency.setValueAtTime(440, now + 0.08);
          osc.frequency.setValueAtTime(660, now + 0.16);
          gain.gain.setValueAtTime(0.13, now);
          gain.gain.linearRampToValueAtTime(0.001, now + 0.32);
          osc.start(now);
          osc.stop(now + 0.33);
        } else if (type === 'victory') {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.setValueAtTime(554, now + 0.1);
          osc.frequency.setValueAtTime(659, now + 0.2);
          osc.frequency.setValueAtTime(880, now + 0.3);
          gain.gain.setValueAtTime(0.16, now);
          gain.gain.linearRampToValueAtTime(0.001, now + 0.55);
          osc.start(now);
          osc.stop(now + 0.56);
        }
      } catch {
        // Ignore audio errors on restricted devices
      }
    },
    []
  );

  // Reference to reset/start simulation inside the isolated canvas loop
  const startOrResetRunRef = useRef<(keepEndless?: boolean) => void>(() => {});

  const commitSessionRewards = useCallback(
    (xp: number, coins: number, score: number) => {
      if (rewardsCommittedRef.current) return;
      if (xp > 0 || coins > 0) {
        rewardsCommittedRef.current = true;
        onAwardRewards(xp, coins, score);
      }
    },
    [onAwardRewards]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Input State: Continuous held vs Edge-triggered justPressed + Input Buffer
    const heldKeys = new Set<string>();
    const justPressed = new Set<string>();
    let dashBufferTimer = 0;
    const mouse = { x: width * 0.5, y: height * 0.35, down: false };

    const handleKeyDown = (e: KeyboardEvent) => {
      const code = e.code;
      if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Space'].includes(code)) {
        e.preventDefault();
      }
      if (!heldKeys.has(code)) {
        justPressed.add(code);
        if (code === 'ShiftLeft' || code === 'ShiftRight' || code === 'KeyE') {
          dashBufferTimer = 0.14;
        }
      }
      heldKeys.add(code);

      if (code === 'Enter' || code === 'Space') {
        if (gameStateRef.current === 'title') {
          startOrResetRunRef.current(false);
        } else if (gameStateRef.current === 'gameover') {
          startOrResetRunRef.current(false);
        }
      } else if (code === 'Escape') {
        if (gameStateRef.current === 'playing') {
          setGameState('paused');
        } else if (gameStateRef.current === 'paused') {
          setGameState('playing');
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      heldKeys.delete(e.code);
    };

    const handleWindowBlur = () => {
      heldKeys.clear();
      justPressed.clear();
      mouse.down = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        mouse.down = true;
      } else if (e.button === 2) {
        dashBufferTimer = 0.14;
      }
    };

    const handleMouseUp = () => {
      mouse.down = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleWindowBlur);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Simulation World State
    const player = {
      x: width * 0.5,
      y: height * 0.55,
      vx: 0,
      vy: 0,
      speed: 360,
      radius: 18,
      angle: -Math.PI / 2,
      shield: 5,
      maxShield: 5,
      fireCooldown: 0,
      dashCooldown: 0,
      dashActiveTimer: 0,
      invulnTimer: 0,
      squashX: 1,
      squashY: 1,
      hitFlash: 0,
    };

    let score = 0;
    let wave = 1;
    const maxWaves = 5;
    let waveKills = 0;
    let waveRequiredKills = 8;
    let combo = 1;
    let comboTimer = 0;
    let xpEarned = 0;
    let coinsEarned = 0;
    let spawnTimer = 0.8;
    let hitstopTimer = 0;
    let shakeTrauma = 0;
    let cameraPanTime = 0;
    let bannerText = '1-TO\'LQIN: HTML BUG DRONLARI';
    let bannerTimer = 2.4;

    // Pooled Arrays (zero GC spikes during 60fps loop)
    const particles: Particle[] = Array.from({ length: 180 }, () => ({
      active: false,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      life: 0,
      maxLife: 1,
      size: 3,
      color: '#3ee6c4',
    }));

    const bullets: Bullet[] = Array.from({ length: 120 }, () => ({
      active: false,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      radius: 5,
      fromPlayer: true,
      color: '#3ee6c4',
      damage: 1,
    }));

    const enemies: Enemy[] = Array.from({ length: 40 }, () => ({
      active: false,
      kind: 'drone',
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      radius: 18,
      hp: 2,
      maxHp: 2,
      state: 'move',
      timer: 0,
      windupDuration: 0.45,
      aimAngle: 0,
      hitFlash: 0,
      squashX: 1,
      squashY: 1,
      label: 'BUG',
      color: '#ff6b86',
    }));

    const crystals: CrystalPickup[] = Array.from({ length: 35 }, () => ({
      active: false,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      tag: '<html/>',
      color: '#ffd23f',
      xpValue: 15,
      coinValue: 2,
      life: 10,
    }));

    const spawnParticles = (
      x: number,
      y: number,
      color: string,
      count: number,
      speedSpread = 220,
      label?: string
    ) => {
      let spawned = 0;
      for (let i = 0; i < particles.length && spawned < count; i++) {
        const p = particles[i];
        if (!p.active) {
          const ang = Math.random() * Math.PI * 2;
          const spd = 40 + Math.random() * speedSpread;
          p.active = true;
          p.x = x;
          p.y = y;
          p.vx = Math.cos(ang) * spd;
          p.vy = Math.sin(ang) * spd;
          p.life = 0;
          p.maxLife = label && spawned === 0 ? 0.95 : 0.35 + Math.random() * 0.35;
          p.size = label && spawned === 0 ? 12 : 2.5 + Math.random() * 4;
          p.color = color;
          p.label = spawned === 0 ? label : undefined;
          spawned++;
        }
      }
    };

    const spawnBullet = (
      x: number,
      y: number,
      angle: number,
      speed: number,
      fromPlayer: boolean,
      color: string,
      damage = 1
    ) => {
      for (let i = 0; i < bullets.length; i++) {
        const b = bullets[i];
        if (!b.active) {
          b.active = true;
          b.x = x;
          b.y = y;
          b.vx = Math.cos(angle) * speed;
          b.vy = Math.sin(angle) * speed;
          b.radius = fromPlayer ? 5.5 : 6.5;
          b.fromPlayer = fromPlayer;
          b.color = color;
          b.damage = damage;
          break;
        }
      }
    };

    const spawnCrystal = (x: number, y: number, xpVal: number, coinVal: number) => {
      for (let i = 0; i < crystals.length; i++) {
        const c = crystals[i];
        if (!c.active) {
          const ang = Math.random() * Math.PI * 2;
          c.active = true;
          c.x = x;
          c.y = y;
          c.vx = Math.cos(ang) * 90;
          c.vy = Math.sin(ang) * 90;
          c.tag = CODE_TAGS[Math.floor(Math.random() * CODE_TAGS.length)];
          c.color = '#ffd23f';
          c.xpValue = xpVal;
          c.coinValue = coinVal;
          c.life = 11;
          break;
        }
      }
    };

    const spawnEnemy = () => {
      for (let i = 0; i < enemies.length; i++) {
        const e = enemies[i];
        if (!e.active) {
          const edge = Math.floor(Math.random() * 4);
          const margin = 50;
          if (edge === 0) {
            e.x = Math.random() * width;
            e.y = -margin;
          } else if (edge === 1) {
            e.x = width + margin;
            e.y = Math.random() * height;
          } else if (edge === 2) {
            e.x = Math.random() * width;
            e.y = height + margin;
          } else {
            e.x = -margin;
            e.y = Math.random() * height;
          }

          const roll = Math.random();
          if (wave >= 3 && roll < 0.24) {
            e.kind = 'crusher';
            e.radius = 25;
            e.maxHp = 5 + Math.floor(wave * 0.8);
            e.hp = e.maxHp;
            e.windupDuration = 0.65;
            e.label = 'LOOP()';
            e.color = '#ff8a3d';
          } else if (wave >= 2 && roll < 0.56) {
            e.kind = 'sniper';
            e.radius = 19;
            e.maxHp = 3 + Math.floor(wave * 0.5);
            e.hp = e.maxHp;
            e.windupDuration = 0.55;
            e.label = '404';
            e.color = '#ffd23f';
          } else {
            e.kind = 'drone';
            e.radius = 16;
            e.maxHp = 2 + Math.floor(wave * 0.4);
            e.hp = e.maxHp;
            e.windupDuration = 0.42;
            e.label = 'NaN';
            e.color = '#ff6b86';
          }

          e.active = true;
          e.vx = 0;
          e.vy = 0;
          e.state = 'move';
          e.timer = 1.1 + Math.random() * 1.2;
          e.aimAngle = 0;
          e.hitFlash = 0;
          e.squashX = 1;
          e.squashY = 1;
          break;
        }
      }
    };

    startOrResetRunRef.current = (keepEndless = false) => {
      player.x = width * 0.5;
      player.y = height * 0.55;
      player.vx = 0;
      player.vy = 0;
      player.shield = 5;
      player.maxShield = 5;
      player.fireCooldown = 0;
      player.dashCooldown = 0;
      player.dashActiveTimer = 0;
      player.invulnTimer = 0.8;
      player.squashX = 1;
      player.squashY = 1;

      if (!keepEndless) {
        score = 0;
        wave = 1;
        waveKills = 0;
        waveRequiredKills = 8;
        combo = 1;
        comboTimer = 0;
        xpEarned = 0;
        coinsEarned = 0;
        rewardsCommittedRef.current = false;
        setEndlessMode(false);
      } else {
        setEndlessMode(true);
      }

      enemies.forEach((e) => (e.active = false));
      bullets.forEach((b) => (b.active = false));
      crystals.forEach((c) => (c.active = false));
      particles.forEach((p) => (p.active = false));

      bannerText = `${wave}-TO'LQIN: SYNTAX HIMOYASI BOSHLANDI!`;
      bannerTimer = 2.2;
      setGameState('playing');
      playSynth('wave');
    };

    let lastHudSync = 0;
    let prevTime = performance.now();
    let rafId = 0;

    const stepSimulation = (now: number) => {
      rafId = requestAnimationFrame(stepSimulation);
      const rawDt = (now - prevTime) / 1000;
      prevTime = now;
      // Strict delta clamping per game craft rules
      const dt = Math.min(Math.max(rawDt, 0.001), 0.05);

      cameraPanTime += dt;

      // Hitstop freeze for heavy impact feel
      if (hitstopTimer > 0) {
        hitstopTimer -= dt;
        justPressed.clear();
        return;
      }

      // Camera shake decay
      shakeTrauma = Math.max(0, shakeTrauma - dt * 2.6);
      const shakeMag = shakeTrauma * shakeTrauma * 14;
      const shakeX = (Math.random() * 2 - 1) * shakeMag;
      const shakeY = (Math.random() * 2 - 1) * shakeMag;

      // Update active gameplay only when in 'playing' state
      if (gameStateRef.current === 'playing') {
        if (bannerTimer > 0) bannerTimer = Math.max(0, bannerTimer - dt);
        if (comboTimer > 0) {
          comboTimer -= dt;
          if (comboTimer <= 0) combo = 1;
        }
        if (dashBufferTimer > 0) dashBufferTimer -= dt;
        if (player.fireCooldown > 0) player.fireCooldown -= dt;
        if (player.dashCooldown > 0) player.dashCooldown -= dt;
        if (player.dashActiveTimer > 0) player.dashActiveTimer -= dt;
        if (player.invulnTimer > 0) player.invulnTimer -= dt;
        if (player.hitFlash > 0) player.hitFlash -= dt;

        // Smoothly recover squash & stretch
        player.squashX += (1 - player.squashX) * Math.min(1, dt * 14);
        player.squashY += (1 - player.squashY) * Math.min(1, dt * 14);

        // Player Movement (WASD / Arrows)
        let moveX = 0;
        let moveY = 0;
        if (heldKeys.has('KeyA') || heldKeys.has('ArrowLeft')) moveX -= 1;
        if (heldKeys.has('KeyD') || heldKeys.has('ArrowRight')) moveX += 1;
        if (heldKeys.has('KeyW') || heldKeys.has('ArrowUp')) moveY -= 1;
        if (heldKeys.has('KeyS') || heldKeys.has('ArrowDown')) moveY += 1;

        if (moveX !== 0 || moveY !== 0) {
          const len = Math.hypot(moveX, moveY);
          moveX /= len;
          moveY /= len;
        }

        // Buffered Dash (Shift / E / Right-click)
        if (dashBufferTimer > 0 && player.dashCooldown <= 0) {
          dashBufferTimer = 0;
          player.dashCooldown = 1.6;
          player.dashActiveTimer = 0.18;
          player.invulnTimer = 0.26;
          const dashDirX = moveX !== 0 || moveY !== 0 ? moveX : Math.cos(player.angle);
          const dashDirY = moveX !== 0 || moveY !== 0 ? moveY : Math.sin(player.angle);
          player.vx = dashDirX * 920;
          player.vy = dashDirY * 920;
          player.squashX = 1.42;
          player.squashY = 0.68;
          spawnParticles(player.x, player.y, '#3ee6c4', 16, 260, 'DASH()');
          playSynth('shoot');
        }

        if (player.dashActiveTimer <= 0) {
          const targetVx = moveX * player.speed;
          const targetVy = moveY * player.speed;
          player.vx += (targetVx - player.vx) * Math.min(1, dt * 14);
          player.vy += (targetVy - player.vy) * Math.min(1, dt * 14);
        }

        player.x = Math.max(30, Math.min(width - 30, player.x + player.vx * dt));
        player.y = Math.max(70, Math.min(height - 30, player.y + player.vy * dt));

        // Aim towards mouse cursor
        player.angle = Math.atan2(mouse.y - player.y, mouse.x - player.x);

        // Shooting (Space or Left Mouse)
        const wantsFire = heldKeys.has('Space') || mouse.down || justPressed.has('Space');
        if (wantsFire && player.fireCooldown <= 0) {
          player.fireCooldown = 0.14;
          const muzzleX = player.x + Math.cos(player.angle) * 22;
          const muzzleY = player.y + Math.sin(player.angle) * 22;
          spawnBullet(muzzleX, muzzleY, player.angle, 760, true, '#3ee6c4', 1);
          if (combo >= 4) {
            spawnBullet(muzzleX, muzzleY, player.angle - 0.14, 740, true, '#b6f03c', 1);
            spawnBullet(muzzleX, muzzleY, player.angle + 0.14, 740, true, '#b6f03c', 1);
          }
          player.squashX = 0.84;
          player.squashY = 1.18;
          playSynth('shoot');
        }

        // Enemy Spawning with smooth difficulty ramp
        spawnTimer -= dt;
        const activeEnemyCount = enemies.filter((e) => e.active).length;
        const maxConcurrent = Math.min(14, 4 + wave * 2);
        if (spawnTimer <= 0 && activeEnemyCount < maxConcurrent) {
          spawnEnemy();
          spawnTimer = Math.max(0.45, 1.45 - wave * 0.14);
        }

        // Update Bullets
        for (let i = 0; i < bullets.length; i++) {
          const b = bullets[i];
          if (!b.active) continue;
          b.x += b.vx * dt;
          b.y += b.vy * dt;

          if (b.x < -40 || b.x > width + 40 || b.y < -40 || b.y > height + 40) {
            b.active = false;
            continue;
          }

          if (b.fromPlayer) {
            for (let j = 0; j < enemies.length; j++) {
              const e = enemies[j];
              if (!e.active) continue;
              const dist = Math.hypot(b.x - e.x, b.y - e.y);
              if (dist < b.radius + e.radius) {
                b.active = false;
                e.hp -= b.damage;
                e.hitFlash = 0.12;
                e.squashX = 1.28;
                e.squashY = 0.76;
                spawnParticles(b.x, b.y, e.color, 6, 160);

                if (e.hp <= 0) {
                  e.active = false;
                  waveKills++;
                  combo = Math.min(8, combo + 1);
                  comboTimer = 3.8;
                  const pts = (e.kind === 'crusher' ? 150 : e.kind === 'sniper' ? 90 : 50) * combo;
                  score += pts;

                  // Heavy impact hitstop & camera shake
                  if (e.kind === 'crusher') {
                    hitstopTimer = 0.055;
                    shakeTrauma = Math.min(1, shakeTrauma + 0.55);
                    playSynth('heavy');
                  } else {
                    hitstopTimer = 0.025;
                    shakeTrauma = Math.min(1, shakeTrauma + 0.25);
                    playSynth('hit');
                  }

                  spawnParticles(
                    e.x,
                    e.y,
                    e.color,
                    18,
                    290,
                    `+${pts}`
                  );
                  spawnCrystal(
                    e.x,
                    e.y,
                    e.kind === 'crusher' ? 25 : 12,
                    e.kind === 'crusher' ? 3 : 1
                  );

                  // Check Wave Progression
                  if (waveKills >= waveRequiredKills) {
                    if (wave >= maxWaves && !endlessRef.current) {
                      playSynth('victory');
                      commitSessionRewards(xpEarned + 80, coinsEarned + 15, score);
                      xpEarned += 80;
                      coinsEarned += 15;
                      try {
                        confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
                      } catch {
                        // ignore
                      }
                      setGameState('victory');
                    } else {
                      wave++;
                      waveKills = 0;
                      waveRequiredKills = 8 + wave * 3;
                      player.shield = Math.min(player.maxShield, player.shield + 1);
                      bannerText = `${wave}-TO'LQIN BOSHLANDI! (+1 QALQON)`;
                      bannerTimer = 2.4;
                      playSynth('wave');
                    }
                  }
                } else {
                  playSynth('hit');
                }
                break;
              }
            }
          } else {
            // Enemy projectile vs Player
            const distToPlayer = Math.hypot(b.x - player.x, b.y - player.y);
            if (distToPlayer < b.radius + player.radius && player.invulnTimer <= 0) {
              b.active = false;
              player.shield -= 1;
              player.invulnTimer = 1.0;
              player.hitFlash = 0.25;
              combo = 1;
              hitstopTimer = 0.06;
              shakeTrauma = Math.min(1, shakeTrauma + 0.65);
              spawnParticles(player.x, player.y, '#ff5263', 20, 300, 'XATO!');
              playSynth('damage');

              if (player.shield <= 0) {
                commitSessionRewards(xpEarned, coinsEarned, score);
                setGameState('gameover');
              }
            }
          }
        }

        // Update Enemies (with explicit windup telegraphs)
        for (let i = 0; i < enemies.length; i++) {
          const e = enemies[i];
          if (!e.active) continue;
          if (e.hitFlash > 0) e.hitFlash -= dt;
          e.squashX += (1 - e.squashX) * Math.min(1, dt * 10);
          e.squashY += (1 - e.squashY) * Math.min(1, dt * 10);

          const dx = player.x - e.x;
          const dy = player.y - e.y;
          const dist = Math.hypot(dx, dy) || 1;
          const angleToPlayer = Math.atan2(dy, dx);

          if (e.state === 'move') {
            e.timer -= dt;
            if (e.kind === 'drone') {
              const spd = 115 + wave * 10;
              e.vx = Math.cos(angleToPlayer) * spd;
              e.vy = Math.sin(angleToPlayer) * spd;
              if (dist < 175 || e.timer <= 0) {
                e.state = 'windup';
                e.timer = e.windupDuration;
                e.aimAngle = angleToPlayer;
                e.vx *= 0.15;
                e.vy *= 0.15;
              }
            } else if (e.kind === 'sniper') {
              const desiredDist = 270;
              const spd = dist > desiredDist ? 110 : -70;
              e.vx = Math.cos(angleToPlayer) * spd;
              e.vy = Math.sin(angleToPlayer) * spd;
              if (e.timer <= 0) {
                e.state = 'windup';
                e.timer = e.windupDuration;
                e.aimAngle = angleToPlayer;
                e.vx = 0;
                e.vy = 0;
              }
            } else if (e.kind === 'crusher') {
              const spd = 85 + wave * 6;
              e.vx = Math.cos(angleToPlayer) * spd;
              e.vy = Math.sin(angleToPlayer) * spd;
              if (e.timer <= 0 || dist < 240) {
                e.state = 'windup';
                e.timer = e.windupDuration;
                e.aimAngle = angleToPlayer;
                e.vx = 0;
                e.vy = 0;
              }
            }
          } else if (e.state === 'windup') {
            // Visible telegraph windup phase before attack
            e.timer -= dt;
            e.squashX = 1.25;
            e.squashY = 0.78;
            if (e.kind === 'sniper') {
              e.aimAngle = angleToPlayer;
            }
            if (e.timer <= 0) {
              e.state = 'attack';
              if (e.kind === 'drone') {
                e.timer = 0.36;
                e.vx = Math.cos(e.aimAngle) * 430;
                e.vy = Math.sin(e.aimAngle) * 430;
                e.squashX = 0.74;
                e.squashY = 1.35;
              } else if (e.kind === 'sniper') {
                e.timer = 0.25;
                spawnBullet(e.x, e.y, e.aimAngle, 460, false, '#ffd23f', 1);
                playSynth('shoot');
              } else if (e.kind === 'crusher') {
                e.timer = 0.52;
                e.vx = Math.cos(e.aimAngle) * 520;
                e.vy = Math.sin(e.aimAngle) * 520;
                e.squashX = 0.68;
                e.squashY = 1.42;
              }
            }
          } else if (e.state === 'attack') {
            e.timer -= dt;
            if (e.timer <= 0) {
              e.state = 'move';
              e.timer = 1.2 + Math.random() * 1.1;
            }
          }

          e.x += e.vx * dt;
          e.y += e.vy * dt;

          // Collision with Player
          if (dist < e.radius + player.radius && player.invulnTimer <= 0) {
            player.shield -= 1;
            player.invulnTimer = 1.1;
            player.hitFlash = 0.25;
            combo = 1;
            hitstopTimer = 0.065;
            shakeTrauma = Math.min(1, shakeTrauma + 0.7);
            spawnParticles(player.x, player.y, '#ff5263', 22, 310, '-1 QALQON');
            playSynth('damage');

            if (player.shield <= 0) {
              commitSessionRewards(xpEarned, coinsEarned, score);
              setGameState('gameover');
            }
          }
        }

        // Update Crystal Pickups (Magnet + Collect for real XP & Coins)
        for (let i = 0; i < crystals.length; i++) {
          const c = crystals[i];
          if (!c.active) continue;
          c.life -= dt;
          if (c.life <= 0) {
            c.active = false;
            continue;
          }
          c.vx *= 0.92;
          c.vy *= 0.92;

          const dx = player.x - c.x;
          const dy = player.y - c.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < 170) {
            c.vx += (dx / dist) * 620 * dt;
            c.vy += (dy / dist) * 620 * dt;
          }
          c.x += c.vx * dt;
          c.y += c.vy * dt;

          if (dist < player.radius + 16) {
            c.active = false;
            xpEarned += c.xpValue;
            coinsEarned += c.coinValue;
            score += 35 * combo;
            spawnParticles(c.x, c.y, '#b6f03c', 10, 170, `+${c.xpValue} XP · +${c.coinValue}🪙`);
            playSynth('pickup');
          }
        }
      }

      // Update Particles (always active for atmospheric Title & Playing states)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p.active) continue;
        p.life += dt;
        if (p.life >= p.maxLife) {
          p.active = false;
          continue;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.96;
        p.vy *= 0.96;
      }

      justPressed.clear();

      // ==================== RENDER PASS ====================
      ctx.save();
      ctx.fillStyle = '#0a0912';
      ctx.fillRect(0, 0, width, height);

      ctx.translate(shakeX, shakeY);

      // Atmospheric Panning Cyber Grid
      const gridSpacing = 56;
      const offsetX = (cameraPanTime * 28) % gridSpacing;
      const offsetY = (cameraPanTime * 18) % gridSpacing;
      ctx.strokeStyle = 'rgba(62, 230, 196, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let gx = -gridSpacing + offsetX; gx < width + gridSpacing; gx += gridSpacing) {
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height);
      }
      for (let gy = -gridSpacing + offsetY; gy < height + gridSpacing; gy += gridSpacing) {
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
      }
      ctx.stroke();

      // Ambient Aurora Glow Orbs in World Space
      const grad1 = ctx.createRadialGradient(
        width * 0.25 + Math.sin(cameraPanTime * 0.7) * 90,
        height * 0.3,
        10,
        width * 0.25,
        height * 0.3,
        360
      );
      grad1.addColorStop(0, 'rgba(255, 107, 134, 0.14)');
      grad1.addColorStop(1, 'rgba(10, 9, 18, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.75 + Math.cos(cameraPanTime * 0.5) * 90,
        height * 0.68,
        10,
        width * 0.75,
        height * 0.68,
        380
      );
      grad2.addColorStop(0, 'rgba(62, 230, 196, 0.13)');
      grad2.addColorStop(1, 'rgba(10, 9, 18, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Title Screen Autonomous Hero Showcase
      if (gameStateRef.current === 'title') {
        const orbitCX = width * 0.5;
        const orbitCY = height * 0.52;
        for (let k = 0; k < 6; k++) {
          const ang = cameraPanTime * 0.65 + (k * Math.PI) / 3;
          const rx = orbitCX + Math.cos(ang) * 240;
          const ry = orbitCY + Math.sin(ang * 1.2) * 115;
          ctx.save();
          ctx.translate(rx, ry);
          ctx.fillStyle = k % 2 === 0 ? '#3ee6c4' : '#ff6b86';
          ctx.beginPath();
          ctx.arc(0, 0, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.font = '700 12px "JetBrains Mono", monospace';
          ctx.fillStyle = 'rgba(255, 248, 243, 0.75)';
          ctx.fillText(CODE_TAGS[k % CODE_TAGS.length], 14, 4);
          ctx.restore();
        }
      }

      // Draw Crystal Pickups
      for (let i = 0; i < crystals.length; i++) {
        const c = crystals[i];
        if (!c.active) continue;
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.fillStyle = '#ffd23f';
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(10, 0);
        ctx.lineTo(0, 10);
        ctx.lineTo(-10, 0);
        ctx.closePath();
        ctx.fill();
        ctx.font = '700 11px "JetBrains Mono", monospace';
        ctx.fillStyle = '#b6f03c';
        ctx.textAlign = 'center';
        ctx.fillText(c.tag, 0, -14);
        ctx.restore();
      }

      // Draw Bullets
      for (let i = 0; i < bullets.length; i++) {
        const b = bullets[i];
        if (!b.active) continue;
        ctx.save();
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw Enemies & Windup Telegraphs
      for (let i = 0; i < enemies.length; i++) {
        const e = enemies[i];
        if (!e.active) continue;
        ctx.save();

        // Visible Windup Telegraph Line / Halo
        if (e.state === 'windup') {
          const pct = Math.max(0, 1 - e.timer / e.windupDuration);
          if (e.kind === 'sniper') {
            ctx.strokeStyle = `rgba(255, 210, 63, ${0.35 + pct * 0.6})`;
            ctx.lineWidth = 2;
            ctx.setLineDash([6, 6]);
            ctx.beginPath();
            ctx.moveTo(e.x, e.y);
            ctx.lineTo(e.x + Math.cos(e.aimAngle) * 520, e.y + Math.sin(e.aimAngle) * 520);
            ctx.stroke();
            ctx.setLineDash([]);
          } else {
            ctx.strokeStyle = `rgba(255, 82, 99, ${0.4 + pct * 0.6})`;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(e.x, e.y, e.radius + 8 + (1 - pct) * 16, 0, Math.PI * 2);
            ctx.stroke();
          }
        }

        ctx.translate(e.x, e.y);
        ctx.scale(e.squashX, e.squashY);

        ctx.fillStyle = e.hitFlash > 0 ? '#ffffff' : e.color;
        ctx.beginPath();
        if (e.kind === 'crusher') {
          for (let s = 0; s < 6; s++) {
            const a = (s * Math.PI) / 3 + cameraPanTime * 2;
            const px = Math.cos(a) * e.radius;
            const py = Math.sin(a) * e.radius;
            if (s === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
        } else {
          ctx.arc(0, 0, e.radius, 0, Math.PI * 2);
        }
        ctx.fill();

        ctx.fillStyle = '#0a0912';
        ctx.font = '800 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(e.label, 0, 0);
        ctx.restore();
      }

      // Draw Player Defender Ship
      if (gameStateRef.current !== 'title') {
        ctx.save();
        ctx.translate(player.x, player.y);
        ctx.rotate(player.angle);
        ctx.scale(player.squashX, player.squashY);

        if (player.invulnTimer > 0) {
          ctx.strokeStyle = 'rgba(62, 230, 196, 0.75)';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(0, 0, player.radius + 9, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.fillStyle = player.hitFlash > 0 ? '#ffffff' : '#3ee6c4';
        ctx.beginPath();
        ctx.moveTo(22, 0);
        ctx.lineTo(-15, -14);
        ctx.lineTo(-9, 0);
        ctx.lineTo(-15, 14);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ffd23f';
        ctx.beginPath();
        ctx.arc(4, 0, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw Pooled Particles & Floating Combat Text
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p.active) continue;
        const alpha = Math.max(0, 1 - p.life / p.maxLife);
        ctx.save();
        ctx.globalAlpha = alpha;
        if (p.label) {
          ctx.font = '800 13px "JetBrains Mono", monospace';
          ctx.fillStyle = p.color;
          ctx.textAlign = 'center';
          ctx.fillText(p.label, p.x, p.y);
        } else {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      ctx.restore();

      // Sync lightweight HUD snapshot every ~80ms
      if (now - lastHudSync > 80) {
        lastHudSync = now;
        setHud({
          score,
          wave,
          maxWaves,
          shield: Math.max(0, player.shield),
          maxShield: player.maxShield,
          combo,
          xpEarned,
          coinsEarned,
          dashReady: player.dashCooldown <= 0,
          waveProgress: Math.min(100, Math.round((waveKills / waveRequiredKills) * 100)),
          announcement: bannerTimer > 0 ? bannerText : '',
        });
      }
    };

    rafId = requestAnimationFrame(stepSimulation);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleWindowBlur);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [commitSessionRewards, playSynth]);

  const handleExitAndSave = () => {
    commitSessionRewards(hud.xpEarned, hud.coinsEarned, hud.score);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] w-screen h-screen overflow-hidden bg-[#0a0912] select-none">
      {/* Isolated 60fps Canvas Viewport */}
      <canvas ref={canvasRef} className="block w-full h-full cursor-crosshair" />

      {/* ==================== PERIMETER HUD OVERLAY (>85% UNOBSTRUCTED, NO BACKDROP-FILTER) ==================== */}
      {gameState === 'playing' && (
        <div className="fixed inset-0 pointer-events-none flex flex-col justify-between p-4 sm:p-6">
          {/* Top Perimeter Bar */}
          <div className="flex items-start justify-between gap-4">
            {/* Top-Left Cluster: Shield Integrity, Wave & Combo */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#141225]/90 border border-[#3ee6c4]/35">
                {/* Custom SVG Shield Icon */}
                <svg className="w-5 h-5 text-[#3ee6c4] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" />
                </svg>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: hud.maxShield }).map((_, idx) => (
                    <span
                      key={idx}
                      className={`w-5 h-2.5 rounded-sm transition-colors ${
                        idx < hud.shield ? 'bg-[#3ee6c4]' : 'bg-white/15'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-mono text-xs font-extrabold text-[#fff8f3] tabular-nums ml-1">
                  {hud.shield}/{hud.maxShield}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="px-3.5 py-1.5 rounded-xl bg-[#141225]/90 border border-[#ff8a3d]/40 font-mono text-xs font-bold text-[#ffd23f] tabular-nums">
                  TO&apos;LQIN {hud.wave}/{endlessMode ? '∞' : hud.maxWaves} · {hud.waveProgress}%
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-[#141225]/90 border border-[#ff6b86]/40 font-mono text-xs font-extrabold text-[#ff6b86] tabular-nums">
                  COMBO x{hud.combo}
                </div>
                <div
                  className={`px-3 py-1.5 rounded-xl bg-[#141225]/90 border font-mono text-xs font-bold ${
                    hud.dashReady
                      ? 'border-[#b6f03c]/50 text-[#b6f03c]'
                      : 'border-white/15 text-white/40'
                  }`}
                >
                  {hud.dashReady ? '⚡ DASH TAYYOR (SHIFT/E)' : '⚡ DASH...'}
                </div>
              </div>
            </div>

            {/* Top-Right Cluster: Score, Earned XP/Coins & Controls */}
            <div className="flex items-center gap-2.5 flex-wrap justify-end">
              <div className="px-4 py-2 rounded-2xl bg-[#141225]/90 border border-[#ffd23f]/40 text-right font-mono tabular-nums">
                <span className="text-[10px] text-[#c9bee0] block">HISOB / BALL</span>
                <span className="text-base font-extrabold text-[#ffd23f]">{hud.score}</span>
              </div>

              <div className="px-4 py-2 rounded-2xl bg-[#141225]/90 border border-[#b6f03c]/40 text-right font-mono tabular-nums">
                <span className="text-[10px] text-[#c9bee0] block">YUTUQ MUKOFOTI</span>
                <span className="text-sm font-extrabold text-[#b6f03c]">
                  +{hud.xpEarned} XP · +{hud.coinsEarned} 🪙
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsMuted((m) => !m)}
                className="pointer-events-auto px-3.5 py-2.5 rounded-2xl bg-[#141225]/90 border border-white/20 text-xs font-mono font-bold text-[#fff8f3] hover:border-[#3ee6c4] cursor-pointer"
              >
                {isMuted ? '🔇 Ovoz O‘chiq' : '🔊 Ovoz Yoqiq'}
              </button>

              <button
                type="button"
                onClick={() => setGameState('paused')}
                className="pointer-events-auto px-3.5 py-2.5 rounded-2xl bg-[#141225]/90 border border-white/20 text-xs font-mono font-bold text-[#ffd23f] hover:border-[#ffd23f] cursor-pointer"
              >
                ⏸ Pauza (Esc)
              </button>

              <button
                type="button"
                onClick={handleExitAndSave}
                className="pointer-events-auto px-3.5 py-2.5 rounded-2xl bg-[#141225]/90 border border-[#ff6b86]/40 text-xs font-mono font-bold text-[#ff6b86] hover:bg-[#ff6b86] hover:text-[#0a0912] cursor-pointer"
              >
                ✕ Chiqish
              </button>
            </div>
          </div>

          {/* Center Wave Banner */}
          {hud.announcement && (
            <div className="self-center px-6 py-2.5 rounded-2xl bg-[#141225]/95 border-2 border-[#ffd23f] font-display text-sm sm:text-base font-extrabold text-[#ffd23f] tracking-wider uppercase">
              {hud.announcement}
            </div>
          )}

          {/* Bottom Control Hint Line */}
          <div className="self-center px-4 py-1.5 rounded-xl bg-[#141225]/85 border border-white/10 font-mono text-[11px] text-[#c9bee0]">
            WASD Harakat · Sichqoncha / Space Otish · Shift / E Tezkor Dash · Esc Pauza
          </div>
        </div>
      )}

      {/* ==================== 1. TITLE SCREEN OVERLAY ==================== */}
      {gameState === 'title' && (
        <div className="fixed inset-0 flex flex-col items-center justify-between p-6 sm:p-12 pointer-events-none">
          {/* Top Bar */}
          <div className="w-full max-w-5xl flex items-center justify-between">
            <span className="px-3.5 py-1.5 rounded-xl bg-[#141225]/90 border border-[#3ee6c4]/40 font-mono text-xs font-bold text-[#3ee6c4]">
              DEVMASTER ARCADE · {studentName.toUpperCase()}
            </span>
            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                type="button"
                onClick={() => setIsMuted((m) => !m)}
                className="duo-btn duo-btn-surface text-xs !py-2 !px-3.5"
              >
                {isMuted ? '🔇 Ovoz O‘chiq' : '🔊 Ovoz Yoqiq'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="duo-btn duo-btn-coral text-xs !py-2 !px-4"
              >
                ← O&apos;quvchi Sahifasiga Qaytish
              </button>
            </div>
          </div>

          {/* Center Hero Title Lockup over 35%+ Negative Space */}
          <div className="max-w-2xl text-center space-y-6 my-auto pointer-events-auto">
            {/* Bespoke Inline SVG Title Lockup */}
            <svg
              viewBox="0 0 680 150"
              className="w-full max-w-xl mx-auto drop-shadow-[0_10px_28px_rgba(255,107,134,0.35)]"
              role="img"
              aria-label="Cyber Code Arena"
            >
              <defs>
                <linearGradient id="cyberTitleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff6b86" />
                  <stop offset="50%" stopColor="#ffd23f" />
                  <stop offset="100%" stopColor="#3ee6c4" />
                </linearGradient>
              </defs>
              <polygon
                points="30,22 650,22 630,128 10,128"
                fill="rgba(20, 18, 37, 0.88)"
                stroke="url(#cyberTitleGrad)"
                strokeWidth="3"
              />
              <text
                x="340"
                y="74"
                textAnchor="middle"
                fill="url(#cyberTitleGrad)"
                fontFamily="Fredoka, sans-serif"
                fontWeight="800"
                fontSize="44"
                letterSpacing="3"
              >
                CYBER CODE ARENA
              </text>
              <text
                x="340"
                y="108"
                textAnchor="middle"
                fill="#b6f03c"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="700"
                fontSize="16"
                letterSpacing="4"
              >
                &lt;SYNTAX DEFENDER · XP &amp; TANGA O&apos;YINI/&gt;
              </text>
            </svg>

            <p className="text-xs sm:text-sm text-[#c9bee0] max-w-lg mx-auto leading-relaxed">
              Dasturlash xatolarini (<code className="text-[#ff6b86]">NaN</code>,{' '}
              <code className="text-[#ffd23f]">404</code>,{' '}
              <code className="text-[#ff8a3d]">LOOP()</code>) yo&apos;q qiling va yerga tushgan{' '}
              <strong className="text-[#b6f03c]">HTML · CSS · JS kristallarini</strong> terib,
              profilingizga haqiqiy <strong>XP</strong> hamda <strong>🪙 Tanga</strong> yig&apos;ing!
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => startOrResetRunRef.current(false)}
                className="duo-btn duo-btn-mint text-base sm:text-lg !py-4 !px-10 mx-auto"
              >
                <span>🚀 O&apos;YINNI BOSHLASH (ENTER / SPACE)</span>
              </button>
            </div>
          </div>

          {/* Single Flat Control-Hint Line */}
          <div className="px-5 py-2 rounded-2xl bg-[#141225]/90 border border-white/15 font-mono text-xs text-[#ffd23f]">
            WASD Move · Space Action · Shift Dash · Esc Pause
          </div>
        </div>
      )}

      {/* ==================== 2. PAUSE MODAL ==================== */}
      {gameState === 'paused' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/75 p-4">
          <div className="aurora-card max-w-md w-full p-7 text-center space-y-5 border-2 border-[#ffd23f]">
            <span className="font-mono text-xs font-bold text-[#ffd23f] uppercase">
              O&apos;YIN TO&apos;XTATILDI
            </span>
            <h2 className="font-display text-2xl font-bold">Pauza Rejimi</h2>
            <div className="p-4 rounded-2xl aurora-surface-2 font-mono text-xs space-y-1 tabular-nums">
              <p>Joriy Ball: <strong className="text-[#ffd23f]">{hud.score}</strong></p>
              <p>To&apos;plangan Mukofot: <strong className="text-[#b6f03c]">+{hud.xpEarned} XP · +{hud.coinsEarned} 🪙</strong></p>
            </div>
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => setGameState('playing')}
                className="duo-btn duo-btn-mint w-full justify-center"
              >
                ▶ Davom Etish (Esc)
              </button>
              <button
                type="button"
                onClick={() => startOrResetRunRef.current(false)}
                className="duo-btn duo-btn-gold w-full justify-center"
              >
                ↻ Qaytadan Boshlash
              </button>
              <button
                type="button"
                onClick={handleExitAndSave}
                className="duo-btn duo-btn-coral w-full justify-center"
              >
                ✓ Mukofotni Saqlab Chiqish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 3. VICTORY MODAL ==================== */}
      {gameState === 'victory' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 p-4">
          <div className="aurora-card max-w-md w-full p-8 text-center space-y-5 border-2 border-[#b6f03c]">
            <div className="text-4xl">🏆</div>
            <span className="font-mono text-xs font-extrabold text-[#b6f03c] uppercase">
              BARCHA 5 TO&apos;LQIN YAKUNLANDI!
            </span>
            <h2 className="font-display text-3xl font-bold">G&apos;alaba! Syntax Ustasi!</h2>
            <div className="p-4 rounded-2xl aurora-surface-2 font-mono text-sm space-y-1.5 tabular-nums">
              <p>Yakuniy Hisob: <strong className="text-[#ffd23f]">{hud.score}</strong></p>
              <p className="text-[#b6f03c] font-bold">
                Profilingizga qo&apos;shildi: +{hud.xpEarned} XP · +{hud.coinsEarned} 🪙 Tanga!
              </p>
            </div>
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => startOrResetRunRef.current(true)}
                className="duo-btn duo-btn-mint w-full justify-center"
              >
                🔥 Cheksiz Rejimda Davom Etish (Endless)
              </button>
              <button
                type="button"
                onClick={() => startOrResetRunRef.current(false)}
                className="duo-btn duo-btn-gold w-full justify-center"
              >
                ↻ Yangi O&apos;yin Boshlash
              </button>
              <button
                type="button"
                onClick={handleExitAndSave}
                className="duo-btn duo-btn-surface w-full justify-center"
              >
                ← O&apos;quvchi Sahifasiga Qaytish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 4. GAME OVER MODAL ==================== */}
      {gameState === 'gameover' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 p-4">
          <div className="aurora-card max-w-md w-full p-8 text-center space-y-5 border-2 border-[#ff6b86]">
            <div className="text-4xl">💥</div>
            <span className="font-mono text-xs font-extrabold text-[#ff6b86] uppercase">
              QALQON TUGADI · {hud.wave}-TO&apos;LQIN
            </span>
            <h2 className="font-display text-2xl font-bold">O&apos;yin Tugadi!</h2>
            <div className="p-4 rounded-2xl aurora-surface-2 font-mono text-sm space-y-1.5 tabular-nums">
              <p>To&apos;plangan Ball: <strong className="text-[#ffd23f]">{hud.score}</strong></p>
              <p className="text-[#3ee6c4] font-bold">
                Saqlangan Mukofot: +{hud.xpEarned} XP · +{hud.coinsEarned} 🪙 Tanga
              </p>
            </div>
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => startOrResetRunRef.current(false)}
                className="duo-btn duo-btn-coral w-full justify-center"
              >
                ↻ Qayta Urinish (Enter / Space)
              </button>
              <button
                type="button"
                onClick={handleExitAndSave}
                className="duo-btn duo-btn-surface w-full justify-center"
              >
                ← O&apos;quvchi Sahifasiga Qaytish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
