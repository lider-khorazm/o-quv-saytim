import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Gift,
  X,
  Sparkles,
  CheckCircle2,
  Download,
  Copy,
  Check,
  AlertCircle,
  RotateCw,
} from 'lucide-react';
import { StudentAccount } from '../data/learningCurriculum';
import { AuroraMascot } from './AuroraMascot';

interface ThreeGiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentAccount?: StudentAccount | null;
  onOpenRegister?: () => void;
  studentName?: string;
  studentEmail?: string;
}

interface ClaimedGiftData {
  studentName: string;
  studentEmail: string;
  giftCode: string;
  giftTitle: string;
  claimedAt?: string;
}

export function ThreeGiftModal({
  isOpen,
  onClose,
  studentAccount,
}: ThreeGiftModalProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isClaimed, setIsClaimed] = useState<boolean>(false);
  const [giftData, setGiftData] = useState<ClaimedGiftData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [claimError, setClaimError] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const currentEmail = studentAccount?.email || 'talaba@student.uz';
  const currentName = studentAccount?.name || "Hurmatli O'quvchi";

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/gifts/status?email=${encodeURIComponent(currentEmail)}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            if (data.claimed && data.gift) {
              setIsClaimed(true);
              setGiftData({
                studentName: data.gift.student_name || currentName,
                studentEmail: data.gift.student_email || currentEmail,
                giftCode: data.gift.gift_code || 'VIP-3D-GOLD',
                giftTitle: data.gift.gift_title || "Admin Maxsus Sovg'asi",
                claimedAt: data.gift.claimed_at,
              });
            } else {
              const localClaim = localStorage.getItem(`tanishuv_gift_claimed_${currentEmail}`);
              if (localClaim) {
                setIsClaimed(true);
                setGiftData(JSON.parse(localClaim));
              } else {
                setIsClaimed(false);
              }
            }
          }
        }
      } catch (e) {
        console.warn('Gift status check fallback to local:', e);
        const localClaim = localStorage.getItem(`tanishuv_gift_claimed_${currentEmail}`);
        if (localClaim && isMounted) {
          setIsClaimed(true);
          setGiftData(JSON.parse(localClaim));
        }
      }
    };

    checkStatus();
    return () => {
      isMounted = false;
    };
  }, [isOpen, currentEmail, currentName]);

  // Three.js 3D Scene setup (Aurora Sunset palette)
  useEffect(() => {
    if (!isOpen || !mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth || 400;
    const height = 280;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0912); // Aurora Sunset deep night

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 4.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xff6b86, 2.8); // Coral light
    dirLight1.position.set(3, 4, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x3ee6c4, 2.6); // Mint light
    dirLight2.position.set(-3, -2, -2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffd23f, 3.2, 10); // Gold glow
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    const giftGroup = new THREE.Group();

    const gemGeo = new THREE.OctahedronGeometry(1.0, 0);
    const gemMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.85,
      ior: 1.7,
      thickness: 1.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const gemMesh = new THREE.Mesh(gemGeo, gemMat);
    giftGroup.add(gemMesh);

    const coreGeo = new THREE.IcosahedronGeometry(0.45, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xffd23f,
      metalness: 0.95,
      roughness: 0.2,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    giftGroup.add(coreMesh);

    const ringGeo = new THREE.TorusGeometry(1.4, 0.04, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xff8a3d,
      metalness: 0.9,
      roughness: 0.25,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    giftGroup.add(ringMesh);

    const ring2Geo = new THREE.TorusGeometry(1.6, 0.03, 16, 64);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x3ee6c4,
      metalness: 0.85,
      roughness: 0.2,
    });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.y = Math.PI / 4;
    giftGroup.add(ring2Mesh);

    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 4.5;
      positions[i + 1] = (Math.random() - 0.5) * 3.5;
      positions[i + 2] = (Math.random() - 0.5) * 4.5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffd23f,
      size: 0.06,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    giftGroup.add(particles);

    scene.add(giftGroup);

    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      giftGroup.rotation.y += deltaX * 0.01;
      giftGroup.rotation.x += deltaY * 0.01;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (!isDragging) {
        giftGroup.rotation.y += delta * 0.6;
        gemMesh.rotation.y += delta * 0.4;
        gemMesh.rotation.x += delta * 0.2;
        ringMesh.rotation.z += delta * 0.5;
        ring2Mesh.rotation.x -= delta * 0.4;
        coreMesh.rotation.y -= delta * 1.0;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      renderer.dispose();
      gemGeo.dispose();
      gemMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClaimGift = async () => {
    setLoading(true);
    setClaimError('');

    try {
      const res = await fetch('/api/gifts/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: currentName,
          studentEmail: currentEmail,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const giftObj: ClaimedGiftData = {
          studentName: data.gift.student_name || currentName,
          studentEmail: data.gift.student_email || currentEmail,
          giftCode: data.gift.gift_code,
          giftTitle: data.gift.gift_title,
          claimedAt: data.gift.claimed_at,
        };
        setIsClaimed(true);
        setGiftData(giftObj);
        localStorage.setItem(`tanishuv_gift_claimed_${currentEmail}`, JSON.stringify(giftObj));
      } else {
        setClaimError(data.error || "Sovg'ani qabul qilishda xatolik yuz berdi");
        if (data.gift) {
          setIsClaimed(true);
          setGiftData({
            studentName: data.gift.student_name,
            studentEmail: data.gift.student_email,
            giftCode: data.gift.gift_code,
            giftTitle: data.gift.gift_title,
            claimedAt: data.gift.claimed_at,
          });
        }
      }
    } catch (e: unknown) {
      console.warn('API error, using local storage fallback for 1-time gift:', e);
      const giftCode = 'VIP-3D-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      const giftObj: ClaimedGiftData = {
        studentName: currentName,
        studentEmail: currentEmail,
        giftCode: giftCode,
        giftTitle: "Admin Maxsus Sovg'asi: 3D Dasturchi Oltin To'plami",
        claimedAt: 'Hozirgina',
      };
      setIsClaimed(true);
      setGiftData(giftObj);
      localStorage.setItem(`tanishuv_gift_claimed_${currentEmail}`, JSON.stringify(giftObj));
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (!giftData?.giftCode) return;
    navigator.clipboard.writeText(giftData.giftCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadGiftTemplate = () => {
    const standaloneHtml = `<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin 3D Sovg'asi | ${currentName}</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { background:#0a0912; color:#fff; font-family:sans-serif; overflow:hidden; }
    #canvas-container { width:100vw; height:100vh; position:absolute; top:0; left:0; }
    .overlay { position:absolute; bottom:30px; left:50%; transform:translateX(-50%); background:rgba(21,18,38,0.9); backdrop-filter:blur(12px); border:2px solid rgba(255,210,63,0.4); padding:20px 30px; border-radius:24px; text-align:center; box-shadow:0 15px 40px rgba(0,0,0,0.6); max-width:90vw; }
    .title { font-size:18px; font-weight:bold; color:#ffd23f; margin-bottom:6px; }
    .badge { font-family:monospace; background:rgba(255,107,134,0.2); color:#ff6b86; padding:4px 12px; border-radius:10px; font-size:13px; display:inline-block; margin-bottom:10px; font-weight:bold; }
    .desc { font-size:12px; color:#b8b2cc; line-height:1.4; }
  </style>
</head>
<body>
  <div id="canvas-container"></div>
  <div class="overlay">
    <div class="title">🎁 Admin 3D Eksklyuziv Sovg'asi</div>
    <div class="badge">Ega: ${currentName} (${giftData?.giftCode || 'VIP-3D-GOLD'})</div>
    <div class="desc">Ushbu 3D interaktiv sayt Akademiya Admini tomonidan maxsus 1 marta taqdim etildi. Sichqoncha bilan aylantirib ko'ring!</div>
  </div>
  <script>
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0912);
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1, 4.5);
    const renderer = new THREE.WebGLRenderer({ antialias:true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const light1 = new THREE.DirectionalLight(0xff6b86, 2.5);
    light1.position.set(2, 4, 2);
    scene.add(light1);
    const light2 = new THREE.DirectionalLight(0x3ee6c4, 2.5);
    light2.position.set(-2, -3, -2);
    scene.add(light2);
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));

    const group = new THREE.Group();
    const geo = new THREE.OctahedronGeometry(1.2, 0);
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.3, roughness: 0.1 });
    const mesh = new THREE.Mesh(geo, mat);
    group.add(mesh);

    const wireMat = new THREE.MeshBasicMaterial({ color: 0xffd23f, wireframe: true });
    const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(0.7, 0), wireMat);
    group.add(wire);

    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.04, 16, 64), new THREE.MeshStandardMaterial({ color: 0xff8a3d, metalness: 0.8 }));
    ring.rotation.x = Math.PI / 3;
    group.add(ring);
    scene.add(group);

    function animate() {
      requestAnimationFrame(animate);
      group.rotation.y += 0.01;
      mesh.rotation.x += 0.005;
      ring.rotation.z += 0.008;
      renderer.render(scene, camera);
    }
    animate();
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  </script>
</body>
</html>`;

    const blob = new Blob([standaloneHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admin_3d_sovga_${currentName.toLowerCase().replace(/\s+/g, '_')}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xl overflow-y-auto animate-pop-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="three-gift-title"
    >
      <div className="aurora-card rounded-[2rem] max-w-lg w-full shadow-[0_25px_70px_rgba(255,107,134,0.25)] border-2 border-[#ffd23f]/40 overflow-hidden my-auto flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[var(--aurora-border)] bg-gradient-to-r from-[#ff6b86]/15 via-[#ff8a3d]/15 to-[#ffd23f]/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#ffd23f] via-[#ff8a3d] to-[#ff6b86] flex items-center justify-center text-[#0a0912] shadow-lg">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 id="three-gift-title" className="text-base font-black text-[var(--aurora-text)] font-display">
                  Admindan Eksklyuziv 3D Sovg&apos;a
                </h3>
                <span className="text-[10px] font-black text-[#0a0912] bg-[#ffd23f] px-2.5 py-0.5 rounded-full">
                  1 marta beriladi
                </span>
              </div>
              <p className="text-xs text-[var(--aurora-text-muted)] font-semibold">
                WebGL &amp; Three.js asosidagi maxsus interaktiv mukofot
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Sovg'a oynasini yopish"
            className="w-10 h-10 text-[var(--aurora-text-muted)] hover:text-[#ff5263] rounded-xl hover:bg-[#ff5263]/15 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3D WebGL Canvas Viewer */}
        <div className="relative bg-[#0a0912] flex flex-col items-center justify-center select-none border-b border-white/10">
          <div ref={mountRef} className="w-full h-70 cursor-grab active:cursor-grabbing" />
          <div className="absolute top-3 right-3 text-[10px] font-mono font-bold text-[#ffd23f] bg-black/50 border border-[#ffd23f]/30 px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center gap-1.5">
            <RotateCw className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Sichqoncha bilan aylantiring</span>
          </div>
        </div>

        {/* Body & Claim Status */}
        <div className="p-5 sm:p-6 space-y-4">
          {isClaimed ? (
            <div className="p-4 bg-[#3ee6c4]/10 border-2 border-[#3ee6c4]/40 rounded-2xl space-y-3.5">
              <div className="flex items-center gap-3">
                <AuroraMascot mood="excited" size={48} />
                <div>
                  <h4 className="text-sm font-black text-[var(--aurora-text)] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#3ee6c4] shrink-0" />
                    <span>Siz ushbu 3D sovg&apos;ani qabul qilgansiz!</span>
                  </h4>
                  <p className="text-xs text-[var(--aurora-text-muted)]">
                    Sovg&apos;a barcha o&apos;quvchilarga faqat 1 marta taqdim etiladi.
                  </p>
                </div>
              </div>

              {/* VIP Code Box */}
              <div className="p-3.5 bg-[var(--aurora-surface-2)] border border-[var(--aurora-border)] rounded-xl flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-black uppercase text-[var(--aurora-text-muted)] block">
                    Shaxsiy VIP Token Kodi:
                  </span>
                  <span className="text-sm font-mono font-black text-[#ffd23f]">
                    {giftData?.giftCode || 'VIP-3D-GOLD'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="duo-btn duo-btn-surface px-3.5 py-2 text-xs flex items-center gap-1.5"
                >
                  {copiedCode ? (
                    <Check className="w-3.5 h-3.5 text-[#3ee6c4]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedCode ? 'Nusxalandi' : 'Nusxa'}</span>
                </button>
              </div>

              {/* Download standalone 3D gift website */}
              <button
                type="button"
                onClick={handleDownloadGiftTemplate}
                className="duo-btn duo-btn-mint w-full py-3 text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>O&apos;zingizning 3D sayt faylingizni yuklab oling (.html)</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <AuroraMascot mood="happy" size={52} className="shrink-0" />
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-[var(--aurora-text)] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#ffd23f]" />
                    <span>Admin Shaxsiy Sovg&apos;asi: 3D Dasturchi Oltin To&apos;plami</span>
                  </h4>
                  <p className="text-xs text-[var(--aurora-text-muted)] leading-relaxed">
                    Ushbu interaktiv 3D WebGL sovg&apos;asi barcha o&apos;quvchilar uchun Admindan maxsus rag&apos;bat sifatida beriladi. Uni qabul qilib, mustaqil 3D veb-sayt fayliga ega bo&apos;lasiz!
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-[#ffd23f]/10 border border-[#ffd23f]/40 rounded-2xl text-xs text-[var(--aurora-text)] flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#ffd23f] shrink-0" />
                <span>
                  <strong>Eslatma:</strong> Sovg&apos;a har bir o&apos;quvchiga bazada qayd etilib,{' '}
                  <strong className="text-[#ffd23f]">faqat 1 marta</strong> beriladi!
                </span>
              </div>

              {claimError && (
                <div className="p-3 bg-[#ff5263]/15 border border-[#ff5263]/40 rounded-xl text-xs text-[#ff5263] font-bold">
                  {claimError}
                </div>
              )}

              <button
                type="button"
                onClick={handleClaimGift}
                disabled={loading}
                className="duo-btn duo-btn-gold w-full py-3.5 text-xs sm:text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Gift className="w-4 h-4" />
                <span>
                  {loading
                    ? "Sovg'a rasmiylashtirilmoqda..."
                    : "3D Sovg'ani Qabul Qilish (1 marta)"}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
